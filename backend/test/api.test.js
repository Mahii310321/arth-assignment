import assert from "node:assert/strict";
import { after, before, test } from "node:test";

import app from "../src/app.js";
import { prisma } from "../src/lib/prisma.js";

let server;
let baseUrl;
const email = `api-test-${Date.now()}@example.com`;
const password = "Password@123";

async function request(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const contentType = response.headers.get("content-type") || "";
  const body = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  return { response, body };
}

async function seedTransactions(userId) {
  await prisma.transaction.createMany({
    data: Array.from({ length: 11 }, (_, index) => ({
      userId,
      title: `Test transaction ${index + 1}`,
      category: index % 2 === 0 ? "shopping" : "food",
      amount: -(1000 + index),
      type: "expense",
      date: new Date(`2020-03-${String(25 - index).padStart(2, "0")}T10:00:00.000Z`),
      merchant: `Merchant ${index + 1}`,
      icon: "shopping-cart"
    }))
  });

  await prisma.spendCategory.createMany({
    data: [
      {
        userId,
        name: "Shopping",
        amount: 5500,
        percentage: 55,
        color: "#31bca3"
      },
      {
        userId,
        name: "Food and Drinks",
        amount: 4500,
        percentage: 45,
        color: "#31bca3"
      }
    ]
  });
}

before(async () => {
  server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  const { port } = server.address();
  baseUrl = `http://127.0.0.1:${port}`;
  await prisma.user.deleteMany({ where: { email } });
});

after(async () => {
  await prisma.user.deleteMany({ where: { email } });
  await prisma.$disconnect();
  await new Promise((resolve) => server.close(resolve));
});

test("health endpoint returns ok", async () => {
  const { response, body } = await request("/health");

  assert.equal(response.status, 200);
  assert.equal(body.status, "ok");
});

test("register validates weak passwords", async () => {
  const { response, body } = await request("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({
      name: "API Test",
      email,
      password: "weak",
      profileImageUrl: "https://example.com/avatar.png"
    })
  });

  assert.equal(response.status, 400);
  assert.equal(body.message, "Validation failed.");
  assert.ok(body.errors.password.length > 0);
});

test("register, login, dashboard, pagination, csv, sse and logout flow", async () => {
  const registerResult = await request("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({
      name: "API Test",
      email,
      password,
      profileImageUrl: "https://example.com/avatar.png"
    })
  });

  assert.equal(registerResult.response.status, 201);
  assert.ok(registerResult.body.token);

  await seedTransactions(registerResult.body.user.id);

  const badLogin = await request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password: "WrongPassword@123"
    })
  });

  assert.equal(badLogin.response.status, 401);
  assert.equal(badLogin.body.message, "Invalid email or password.");

  const loginResult = await request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });

  assert.equal(loginResult.response.status, 200);
  assert.ok(loginResult.body.token);

  const token = loginResult.body.token;
  const authHeaders = {
    Authorization: `Bearer ${token}`
  };

  const meResult = await request("/api/auth/me", { headers: authHeaders });
  assert.equal(meResult.response.status, 200);
  assert.equal(meResult.body.user.email, email);

  const dashboardResult = await request("/api/dashboard", { headers: authHeaders });
  assert.equal(dashboardResult.response.status, 200);
  assert.equal(dashboardResult.body.recentTransactions.length, 10);
  assert.equal(dashboardResult.body.transactionsPagination.total, 11);
  assert.equal(dashboardResult.body.spendStatistics.length, 2);

  const pageTwoResult = await request("/api/transactions?page=2&limit=10", {
    headers: authHeaders
  });
  assert.equal(pageTwoResult.response.status, 200);
  assert.equal(pageTwoResult.body.data.length, 1);
  assert.equal(pageTwoResult.body.pagination.page, 2);

  const csvResult = await request("/api/export/transactions.csv", {
    headers: authHeaders
  });
  assert.equal(csvResult.response.status, 200);
  assert.match(csvResult.body, /id,title,category,amount/);

  const streamController = new AbortController();
  const streamResponse = await fetch(
    `${baseUrl}/api/dashboard/stream?token=${encodeURIComponent(token)}`,
    { signal: streamController.signal }
  );
  assert.equal(streamResponse.status, 200);
  const reader = streamResponse.body.getReader();
  const firstChunk = await reader.read();
  streamController.abort();
  const streamText = new TextDecoder().decode(firstChunk.value);
  assert.match(streamText, /event: dashboard/);

  const logoutResult = await request("/api/auth/logout", {
    method: "POST",
    headers: authHeaders
  });
  assert.equal(logoutResult.response.status, 200);

  const afterLogout = await request("/api/dashboard", { headers: authHeaders });
  assert.equal(afterLogout.response.status, 401);
  assert.equal(afterLogout.body.message, "Token has been logged out.");
});

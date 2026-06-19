import assert from "node:assert/strict";
import { test } from "node:test";

import { loginSchema, registerSchema } from "../src/lib/authSchemas.js";

test("login schema rejects invalid email", () => {
  const result = loginSchema.safeParse({
    email: "not-an-email",
    password: "Password@123"
  });

  assert.equal(result.success, false);
  assert.ok(result.error.flatten().fieldErrors.email.length > 0);
});

test("login schema requires password", () => {
  const result = loginSchema.safeParse({
    email: "user@example.com",
    password: ""
  });

  assert.equal(result.success, false);
  assert.ok(result.error.flatten().fieldErrors.password.length > 0);
});

test("register schema accepts strong password and profile image URL", () => {
  const result = registerSchema.safeParse({
    name: "Test User",
    email: "test@example.com",
    password: "Password@123",
    profileImageUrl: "https://example.com/avatar.png"
  });

  assert.equal(result.success, true);
});

test("register schema rejects weak password", () => {
  const result = registerSchema.safeParse({
    name: "Test User",
    email: "test@example.com",
    password: "password",
    profileImageUrl: ""
  });

  assert.equal(result.success, false);
  assert.ok(result.error.flatten().fieldErrors.password.length > 0);
});

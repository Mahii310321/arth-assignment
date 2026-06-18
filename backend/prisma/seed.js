import "../src/config/env.js";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const demoUser = {
  name: "Samantha",
  email: "samantha@email.com",
  password: "Password@123",
  profileImageUrl:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces"
};

const extraDemoUsers = [
  {
    name: "Hi, User",
    email: "user@gmail.com",
    password: "Password@123",
    profileImageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces"
  }
];

const transactions = [
  ["Grocery", "grocery", -326800, "expense", "2020-03-24T17:12:00.000Z", "Belanja di pasar", "shopping-cart"],
  ["Transportation", "transportation", -15000, "expense", "2020-03-24T17:12:00.000Z", "Naik bus umum", "bus"],
  ["Housing", "housing", -185750, "expense", "2020-03-23T17:12:00.000Z", "Bayar Listrik", "home"],
  ["Food and Drink", "food", -156000, "expense", "2020-03-22T17:12:00.000Z", "Makan Steak", "utensils"],
  ["Entertainment", "entertainment", -35200, "expense", "2020-03-21T17:12:00.000Z", "Nonton Bioskop", "play"],
  ["Coffee", "food", -28000, "expense", "2020-03-20T08:30:00.000Z", "Kopi pagi", "coffee"],
  ["Shopping", "shopping", -430000, "expense", "2020-03-18T14:15:00.000Z", "Weekend outfit", "shopping-bag"],
  ["Vehicle", "vehicle", -520000, "expense", "2020-03-17T09:00:00.000Z", "Car service", "car"],
  ["Salary", "income", 7500000, "income", "2020-03-15T09:00:00.000Z", "Monthly salary", "wallet"],
  ["Travel", "transportation", -210000, "expense", "2020-03-14T10:45:00.000Z", "Train tickets", "plane"],
  ["Utilities", "housing", -140000, "expense", "2020-03-12T11:30:00.000Z", "Water bill", "zap"],
  ["Groceries", "grocery", -184000, "expense", "2020-03-07T16:00:00.000Z", "Weekly supplies", "shopping-cart"]
];

const userTransactions = [
  ["Office Lunch", "food", -82000, "expense", "2020-03-25T13:10:00.000Z", "Cafe Central", "utensils"],
  ["Metro Card", "transportation", -50000, "expense", "2020-03-24T09:20:00.000Z", "Transit recharge", "bus"],
  ["Internet Bill", "housing", -125000, "expense", "2020-03-23T10:00:00.000Z", "Monthly broadband", "zap"],
  ["Sneakers", "shopping", -690000, "expense", "2020-03-22T16:40:00.000Z", "Sports store", "shopping-bag"],
  ["Movie Night", "entertainment", -76000, "expense", "2020-03-21T20:15:00.000Z", "Cinema tickets", "play"],
  ["Fuel", "vehicle", -210000, "expense", "2020-03-20T08:50:00.000Z", "Petrol station", "car"],
  ["Coffee", "food", -24000, "expense", "2020-03-19T08:30:00.000Z", "Morning coffee", "coffee"],
  ["Freelance", "income", 1850000, "income", "2020-03-18T11:00:00.000Z", "Design project", "wallet"],
  ["Groceries", "grocery", -245000, "expense", "2020-03-17T18:45:00.000Z", "Weekly grocery", "shopping-cart"],
  ["Cab Ride", "transportation", -64000, "expense", "2020-03-16T22:30:00.000Z", "Airport ride", "bus"],
  ["Electricity", "housing", -97000, "expense", "2020-03-15T12:00:00.000Z", "Power bill", "zap"]
];

const spendCategories = [
  ["Food and Drinks", 872400, 28, "#31bca3"],
  ["Shopping", 1378200, 44, "#31bca3"],
  ["Housing", 928500, 30, "#31bca3"],
  ["Transportation", 420700, 14, "#31bca3"],
  ["Vehicle", 520000, 17, "#31bca3"]
];

const userSpendCategories = [
  ["Shopping", 690000, 35, "#31bca3"],
  ["Food and Drinks", 351000, 18, "#31bca3"],
  ["Transportation", 114000, 12, "#31bca3"],
  ["Housing", 222000, 20, "#31bca3"],
  ["Vehicle", 210000, 15, "#31bca3"]
];

async function seedDashboardData(userId, transactionRows, spendCategoryRows) {
  await prisma.transaction.deleteMany({ where: { userId } });
  await prisma.spendCategory.deleteMany({ where: { userId } });

  await prisma.transaction.createMany({
    data: transactionRows.map(([title, category, amount, type, date, merchant, icon]) => ({
      userId,
      title,
      category,
      amount,
      type,
      date: new Date(date),
      merchant,
      icon
    }))
  });

  await prisma.spendCategory.createMany({
    data: spendCategoryRows.map(([name, amount, percentage, color]) => ({
      userId,
      name,
      amount,
      percentage,
      color
    }))
  });
}

async function main() {
  const passwordHash = await bcrypt.hash(demoUser.password, 12);

  const user = await prisma.user.upsert({
    where: { email: demoUser.email },
    update: {
      name: demoUser.name,
      passwordHash,
      profileImageUrl: demoUser.profileImageUrl
    },
    create: {
      name: demoUser.name,
      email: demoUser.email,
      passwordHash,
      profileImageUrl: demoUser.profileImageUrl
    }
  });

  await seedDashboardData(user.id, transactions, spendCategories);

  for (const extraUser of extraDemoUsers) {
    const extraPasswordHash = await bcrypt.hash(extraUser.password, 12);
    const createdExtraUser = await prisma.user.upsert({
      where: { email: extraUser.email },
      update: {
        name: extraUser.name,
        passwordHash: extraPasswordHash,
        profileImageUrl: extraUser.profileImageUrl
      },
      create: {
        name: extraUser.name,
        email: extraUser.email,
        passwordHash: extraPasswordHash,
        profileImageUrl: extraUser.profileImageUrl
      }
    });

    await seedDashboardData(createdExtraUser.id, userTransactions, userSpendCategories);
  }

  console.log(`Seeded demo user ${demoUser.email} with password ${demoUser.password}`);
  console.log("Additional demo login: user@gmail.com / Password@123");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

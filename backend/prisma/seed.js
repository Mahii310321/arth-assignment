import "dotenv/config";
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

const spendCategories = [
  ["Food and Drinks", 872400, 28, "#31bca3"],
  ["Shopping", 1378200, 44, "#31bca3"],
  ["Housing", 928500, 30, "#31bca3"],
  ["Transportation", 420700, 14, "#31bca3"],
  ["Vehicle", 520000, 17, "#31bca3"]
];

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

  await prisma.transaction.deleteMany({ where: { userId: user.id } });
  await prisma.spendCategory.deleteMany({ where: { userId: user.id } });

  await prisma.transaction.createMany({
    data: transactions.map(([title, category, amount, type, date, merchant, icon]) => ({
      userId: user.id,
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
    data: spendCategories.map(([name, amount, percentage, color]) => ({
      userId: user.id,
      name,
      amount,
      percentage,
      color
    }))
  });

  console.log(`Seeded demo user ${demoUser.email} with password ${demoUser.password}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import express from "express";

import { requireAuth } from "../middleware/auth.js";
import { prisma } from "../lib/prisma.js";

const router = express.Router();

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
}

function transactionDto(transaction) {
  return {
    id: transaction.id,
    title: transaction.title,
    category: transaction.category,
    amount: transaction.amount,
    type: transaction.type,
    date: transaction.date,
    merchant: transaction.merchant,
    icon: transaction.icon,
    createdAt: transaction.createdAt,
    updatedAt: transaction.updatedAt
  };
}

function spendCategoryDto(category) {
  return {
    id: category.id,
    name: category.name,
    amount: category.amount,
    percentage: category.percentage,
    color: category.color,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt
  };
}

function dashboardCards() {
  return [
    {
      id: "save-more-money",
      title: "Save more money",
      description:
        "Review recurring spending and compare categories before your next purchase.",
      actionLabel: "VIEW TIPS"
    }
  ];
}

function buildChartData(transactions) {
  const dailySpend = new Map();

  transactions.forEach((transaction) => {
    if (transaction.type !== "expense") return;

    const day = String(transaction.date.getDate());
    dailySpend.set(day, (dailySpend.get(day) || 0) + Math.abs(transaction.amount));
  });

  return Array.from({ length: 25 }, (_, index) => {
    const day = String(index + 1);

    return {
      day,
      amount: dailySpend.get(day) || 0,
      highlight: day === "24"
    };
  });
}

function escapeCsvValue(value) {
  if (value === null || value === undefined) return "";

  const stringValue = String(value);

  if (/[",\n]/.test(stringValue)) {
    return `"${stringValue.replaceAll('"', '""')}"`;
  }

  return stringValue;
}

function transactionsToCsv(transactions) {
  const headers = [
    "id",
    "title",
    "category",
    "amount",
    "type",
    "date",
    "merchant",
    "icon",
    "createdAt",
    "updatedAt"
  ];

  const rows = transactions.map((transaction) =>
    headers
      .map((header) => {
        const value = transaction[header];
        return escapeCsvValue(value instanceof Date ? value.toISOString() : value);
      })
      .join(",")
  );

  return [headers.join(","), ...rows].join("\n");
}

router.get("/dashboard", requireAuth, async (req, res, next) => {
  try {
    const [transactions, totalTransactions, spendCategories] = await Promise.all([
      prisma.transaction.findMany({
        where: { userId: req.user.id },
        orderBy: { date: "desc" },
        take: 25
      }),
      prisma.transaction.count({
        where: { userId: req.user.id }
      }),
      prisma.spendCategory.findMany({
        where: { userId: req.user.id },
        orderBy: { amount: "desc" }
      })
    ]);

    return res.status(200).json({
      user: publicUser(req.user),
      recentTransactions: transactions.slice(0, 10).map(transactionDto),
      transactionsPagination: {
        page: 1,
        limit: 10,
        total: totalTransactions,
        totalPages: Math.ceil(totalTransactions / 10)
      },
      spendStatistics: spendCategories.map(spendCategoryDto),
      chartData: buildChartData(transactions),
      cardsData: dashboardCards()
    });
  } catch (error) {
    return next(error);
  }
});

router.get("/transactions", requireAuth, async (req, res, next) => {
  try {
    const page = Math.max(Number.parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(Math.max(Number.parseInt(req.query.limit || "10", 10), 1), 50);
    const skip = (page - 1) * limit;

    const [total, transactions] = await Promise.all([
      prisma.transaction.count({
        where: { userId: req.user.id }
      }),
      prisma.transaction.findMany({
        where: { userId: req.user.id },
        orderBy: { date: "desc" },
        skip,
        take: limit
      })
    ]);

    return res.status(200).json({
      data: transactions.map(transactionDto),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    return next(error);
  }
});

router.get("/export/transactions.csv", requireAuth, async (req, res, next) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId: req.user.id },
      orderBy: { date: "desc" }
    });

    const csv = transactionsToCsv(transactions);

    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", "attachment; filename=\"transactions.csv\"");

    return res.status(200).send(csv);
  } catch (error) {
    return next(error);
  }
});

export default router;

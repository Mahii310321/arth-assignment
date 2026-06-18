import {
  Bus,
  Car,
  Coffee,
  CreditCard,
  Home,
  LayoutDashboard,
  PieChart,
  Plane,
  PlayCircle,
  Receipt,
  Settings,
  ShoppingCart,
  Utensils,
  Wallet,
  Zap
} from "lucide-react";

// Fallback/demo UI data. Authenticated dashboard screens use backend API data when available.
export const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, key: "dashboard" },
  { label: "Expenses", icon: Receipt, key: "expenses" },
  { label: "Wallets", icon: Wallet, key: "wallets" },
  { label: "Summary", icon: PieChart, key: "summary" },
  { label: "Accounts", icon: CreditCard, key: "accounts" },
  { label: "Settings", icon: Settings, key: "settings" }
];

export const user = {
  name: "Samantha",
  email: "samantha@email.com",
  notifications: 4,
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces"
};

export const authedUser = {
  name: "Hi, User",
  email: "user@gmail.com",
  notifications: 9,
  avatar:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces"
};

export const teamMembers = [
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop&crop=faces"
];

export const chartData = [
  { day: "1", amount: 220 },
  { day: "2", amount: 380 },
  { day: "3", amount: 290 },
  { day: "4", amount: 340 },
  { day: "5", amount: 260 },
  { day: "6", amount: 310 },
  { day: "7", amount: 420 },
  { day: "8", amount: 360 },
  { day: "9", amount: 280 },
  { day: "10", amount: 330 },
  { day: "11", amount: 380 },
  { day: "12", amount: 290 },
  { day: "13", amount: 340 },
  { day: "14", amount: 360 },
  { day: "15", amount: 310 },
  { day: "16", amount: 390 },
  { day: "17", amount: 410 },
  { day: "18", amount: 350 },
  { day: "19", amount: 320 },
  { day: "20", amount: 280 },
  { day: "21", amount: 360 },
  { day: "22", amount: 400 },
  { day: "23", amount: 380 },
  { day: "24", amount: 580, highlight: true },
  { day: "25", amount: 320 }
];

export const categoryStyles = {
  grocery: { bg: "bg-sky-500", icon: ShoppingCart },
  transport: { bg: "bg-purple-500", icon: Bus },
  transportation: { bg: "bg-purple-500", icon: Bus },
  housing: { bg: "bg-orange-500", icon: Home },
  food: { bg: "bg-rose-500", icon: Utensils },
  entertainment: { bg: "bg-emerald-500", icon: PlayCircle },
  coffee: { bg: "bg-amber-600", icon: Coffee },
  shopping: { bg: "bg-sky-500", icon: ShoppingCart },
  travel: { bg: "bg-indigo-500", icon: Plane },
  vehicle: { bg: "bg-slate-500", icon: Car },
  income: { bg: "bg-emerald-500", icon: Wallet },
  utilities: { bg: "bg-yellow-500", icon: Zap }
};

export const transactions = [
  {
    id: "1",
    title: "Grocery",
    note: "Belanja di pasar",
    time: "5:12 pm",
    amount: -326800,
    category: "grocery",
    date: "today"
  },
  {
    id: "2",
    title: "Transportation",
    note: "Naik bus umum",
    time: "5:12 pm",
    amount: -15000,
    category: "transport",
    date: "today"
  },
  {
    id: "3",
    title: "Housing",
    note: "Bayar Listrik",
    time: "5:12 pm",
    amount: -185750,
    category: "housing",
    date: "today"
  },
  {
    id: "4",
    title: "Food and Drink",
    note: "Makan Steak",
    time: "5:12 pm",
    amount: -156000,
    category: "food",
    date: "monday"
  },
  {
    id: "5",
    title: "Entertainment",
    note: "Nonton Bioskop",
    time: "5:12 pm",
    amount: -35200,
    category: "entertainment",
    date: "monday"
  },
  {
    id: "6",
    title: "Coffee",
    note: "Kopi pagi",
    time: "8:30 am",
    amount: -28000,
    category: "coffee",
    date: "monday"
  }
];

export const spendStats = [
  { label: "Food and Drinks", amount: 872400, percent: 28 },
  { label: "Shopping", amount: 1378200, percent: 44 },
  { label: "Housing", amount: 928500, percent: 30 },
  { label: "Transportation", amount: 420700, percent: 14 },
  { label: "Vehicle", amount: 520000, percent: 17 }
];

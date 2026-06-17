import React from "react";

import { chartData } from "@/data/mockData";

function ExpensesChart() {
  const maxAmount = Math.max(...chartData.map((item) => item.amount));

  return (
    <div
      aria-label="Expense chart for March 1 through March 25"
      className="flex h-[150px] w-full animate-[fade-up_.45s_ease-out] items-end gap-1 sm:h-[180px] sm:gap-2"
    >
      {chartData.map((item) => (
        <div key={item.day} className="group relative flex h-full flex-1 items-end">
          <span
            className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-950 px-2 py-1 text-xs text-white shadow-lg group-hover:block"
          >
            Day {item.day}: Rp {(item.amount * 1000).toLocaleString("id-ID")}
          </span>
          <span
            className="w-full min-w-[4px] rounded-md transition group-hover:scale-y-105 sm:min-w-[7px]"
            style={{
              height: `${Math.max(18, (item.amount / maxAmount) * 100)}%`,
              background: item.highlight ? "var(--chart-accent)" : "var(--chart-muted)"
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default ExpensesChart;

import React from "react";
import { MoreHorizontal } from "lucide-react";

import { categoryStyles, transactions } from "@/data/mockData";

function formatAmount(amount) {
  return `${amount < 0 ? "-" : ""}${Math.abs(amount).toLocaleString("id-ID")}`;
}

function Group({ title, items, delay = 0 }) {
  return (
    <section className="space-y-2" aria-labelledby={title.toLowerCase().replaceAll(" ", "-")}>
      <div className="flex items-center justify-between border-b border-[var(--panel-border)] pb-3">
        <h3
          id={title.toLowerCase().replaceAll(" ", "-")}
          className="text-base font-bold text-[var(--panel-fg)] sm:text-lg"
        >
          {title}
        </h3>
        <button
          aria-label={`More options for ${title}`}
          className="text-[var(--muted-fg)] transition hover:text-[var(--panel-fg)]"
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      <ul className="divide-y divide-[var(--panel-border)]">
        {items.map((transaction, index) => {
          const category = categoryStyles[transaction.category];
          const Icon = category.icon;

          return (
            <li
              key={transaction.id}
              style={{ animationDelay: `${delay + index * 0.08}s` }}
              title={`${transaction.title}: ${formatAmount(transaction.amount)}`}
              className="group flex animate-[slide-in_.35s_ease-out_both] items-center gap-3 py-4 transition hover:bg-black/[0.02] dark:hover:bg-white/[0.03] sm:gap-4"
            >
              <div
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-white sm:h-12 sm:w-12 ${category.bg} transition group-hover:scale-110`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-[var(--panel-fg)] sm:text-base">
                  {transaction.title}
                </p>
                <p className="truncate text-xs text-[var(--muted-fg)] sm:text-sm">
                  {transaction.time} <span className="px-1">•</span> {transaction.note}
                </p>
              </div>
              <p className="shrink-0 text-sm font-bold tabular-nums text-[var(--panel-fg)] sm:text-base">
                {formatAmount(transaction.amount)}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function TransactionList() {
  const today = transactions.filter((transaction) => transaction.date === "today");
  const monday = transactions.filter((transaction) => transaction.date === "monday");

  return (
    <div className="space-y-8">
      <Group title="Today" items={today} delay={0.4} />
      <Group title="Monday, 23 March 2020" items={monday} delay={0.6} />
    </div>
  );
}

export default TransactionList;

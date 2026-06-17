import React from "react";
import { Plus } from "lucide-react";

import ExpensesChart from "@/components/dashboard/ExpensesChart";
import TransactionList from "@/components/dashboard/TransactionList";
import { teamMembers } from "@/data/mockData";

function DashboardContent() {
  return (
    <section className="flex-1 overflow-y-auto bg-[var(--content-bg)] p-8 lg:p-12 xl:p-[60px]">
      <header className="grid animate-[fade-in_.35s_ease-out] grid-cols-[minmax(0,1fr)_auto] items-start gap-6">
        <div className="min-w-0">
          <h1 className="text-5xl font-black text-[var(--content-fg)]">Expenses</h1>
          <p className="mt-3 text-sm font-medium text-[var(--muted-fg)]">
            01 - 25 March, 2020
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="flex -space-x-2">
            {teamMembers.map((src, index) => (
              <img
                key={src}
                src={src}
                alt={`Team member ${index + 1}`}
                loading="lazy"
                className="h-9 w-9 rounded-full border-2 border-[var(--content-bg)] object-cover"
              />
            ))}
          </div>
          <button
            aria-label="Add member"
            className="grid h-9 w-9 place-items-center rounded-full border border-dashed border-[var(--muted-fg)]/40 text-[var(--muted-fg)] transition hover:scale-105 hover:border-[var(--content-fg)] hover:text-[var(--content-fg)]"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="mt-10">
        <ExpensesChart />
      </div>

      <div className="mt-10">
        <TransactionList />
      </div>
    </section>
  );
}

export default DashboardContent;

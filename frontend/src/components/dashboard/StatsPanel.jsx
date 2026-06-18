import React from "react";

import { Button } from "@/components/ui/button";
import { spendStats as fallbackSpendStats } from "@/data/mockData";
import { useCounter } from "@/hooks/useCounter";

function StatRow({ stat, index }) {
  const value = useCounter(stat.amount, 1400);

  return (
    <div
      className="animate-[fade-up_.35s_ease-out_both] space-y-3"
      style={{ animationDelay: `${0.1 + index * 0.06}s` }}
    >
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className="font-bold text-[var(--panel-fg)]">{stat.label}</span>
        <span className="font-semibold tabular-nums text-[var(--panel-fg)]">
          {value.toLocaleString("id-ID")}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--panel-border)]">
        <div
          className="h-full rounded-full bg-emerald-400"
          style={{
            width: `${stat.percent ?? stat.percentage}%`,
            background: stat.color || undefined,
            transition: "width 900ms ease-out"
          }}
        />
      </div>
    </div>
  );
}

function TipsGraphic() {
  return (
    <div className="mb-6 flex h-24 items-end gap-3" aria-hidden="true">
      <div className="h-16 w-12 rounded-md bg-gradient-to-b from-sky-400 to-sky-600 shadow-sm" />
      <div className="h-11 w-14 rounded-md bg-gradient-to-b from-orange-300 to-orange-500 shadow-sm" />
      <div className="ml-auto flex items-end gap-1">
        <div className="h-12 w-5 rounded-full bg-emerald-200" />
        <div className="h-20 w-6 rounded-full bg-sky-200" />
        <div className="h-10 w-5 rounded-full bg-emerald-100" />
      </div>
    </div>
  );
}

function StatsPanel({ dashboardData }) {
  const spendStats =
    dashboardData?.spendStatistics?.map((stat) => ({
      label: stat.name,
      amount: stat.amount,
      percent: stat.percentage,
      color: stat.color
    })) || fallbackSpendStats;

  return (
    <aside className="flex w-full shrink-0 animate-[fade-in_.4s_ease-out] flex-col gap-7 bg-[var(--panel-bg)] p-5 sm:p-8 xl:w-[350px] xl:gap-8 xl:p-[50px]">
      <h3 className="text-xl font-bold text-[var(--panel-fg)] sm:text-2xl">
        Where your money go?
      </h3>

      <div className="space-y-6 sm:space-y-8">
        {spendStats.map((stat, index) => (
          <StatRow key={stat.label} stat={stat} index={index} />
        ))}
      </div>

      <div className="mt-auto animate-[fade-up_.45s_ease-out] rounded-2xl bg-[var(--tip-bg)] p-6 shadow-sm sm:p-7">
        <TipsGraphic />
        <h4 className="text-xl font-bold text-[var(--panel-fg)]">Save more money</h4>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted-fg)]">
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.
        </p>
        <Button className="mt-6 h-12 w-full rounded-md bg-slate-950 text-xs font-bold text-white hover:bg-slate-800">
          VIEW TIPS
        </Button>
      </div>
    </aside>
  );
}

export default StatsPanel;

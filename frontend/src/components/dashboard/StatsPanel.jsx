import React from "react";

import { Button } from "@/components/ui/button";
import tipsPlant from "@/assets/dashboard/tips-plant.png";
import tipsDrawer from "@/assets/dashboard/tips-drawer.png";
import { dashboardCards, spendStats as fallbackSpendStats } from "@/data/mockData";
import { useCounter } from "@/hooks/useCounter";

function StatRow({ stat, index }) {
  const value = useCounter(stat.amount, 1400);

  return (
    <div
      className="group relative animate-[fade-up_.35s_ease-out_both] space-y-3"
      style={{ animationDelay: `${0.1 + index * 0.06}s` }}
    >
      <div className="pointer-events-none absolute -top-9 right-0 z-20 hidden rounded-md bg-slate-950 px-3 py-2 text-xs font-medium text-white shadow-xl group-hover:block">
        {stat.label}: {value.toLocaleString("id-ID")} ({stat.percent ?? stat.percentage}%)
      </div>
      <div className="font-poppins flex items-center justify-between gap-4 text-[13px] font-semibold leading-[24px] tracking-[0.46px]">
        <span className="text-[var(--panel-fg)]">{stat.label}</span>
        <span className="tabular-nums text-[var(--panel-fg)]">
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
    <div className="relative h-[118px] w-full" aria-hidden="true">
      <img
        src={tipsDrawer}
        alt=""
        loading="lazy"
        className="absolute left-[25px] top-[19px] h-[72px] w-[84px] object-contain"
      />
      <img
        src={tipsPlant}
        alt=""
        loading="lazy"
        className="absolute left-[164px] top-0 h-[90px] w-[53px] object-contain"
      />
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} className="animate-pulse space-y-3">
          <div className="flex items-center justify-between gap-4">
            <div className="h-4 w-32 rounded bg-slate-200 dark:bg-white/10" />
            <div className="h-4 w-16 rounded bg-slate-200 dark:bg-white/10" />
          </div>
          <div className="h-1.5 rounded-full bg-slate-200 dark:bg-white/10" />
        </div>
      ))}
    </div>
  );
}

function StatsPanel({ dashboardData, isAuthed }) {
  const spendStats =
    dashboardData?.spendStatistics?.map((stat) => ({
      label: stat.name,
      amount: stat.amount,
      percent: stat.percentage,
      color: stat.color
    })) || fallbackSpendStats;
  const tipCard = dashboardData?.cardsData?.[0] || dashboardCards[0];

  return (
    <aside className="flex min-h-0 w-full shrink-0 animate-[fade-in_.4s_ease-out] flex-col gap-7 bg-[var(--panel-bg)] p-5 sm:p-8 xl:w-[350px] xl:gap-8 xl:overflow-y-auto xl:p-[50px]">
      <h3 className="font-avenir text-[20px] font-medium leading-[30px] tracking-[0.33px] text-[var(--panel-fg)]">
        Where your money go?
      </h3>

      {!isAuthed ? (
        <StatsSkeleton />
      ) : (
        <div className="space-y-6 sm:space-y-8">
          {spendStats.map((stat, index) => (
            <StatRow key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      )}

      <div className="mx-auto mt-auto flex h-[292px] w-full max-w-[250px] animate-[fade-up_.45s_ease-out] flex-col rounded-[30px] bg-[#edf1f5] px-[25px] pb-[18px] pt-0 shadow-sm dark:bg-[var(--tip-bg)]">
        <TipsGraphic />
        <h4 className="font-poppins text-[18px] font-semibold leading-[24px] tracking-[0.2px] text-[var(--panel-fg)]">
          {tipCard.title}
        </h4>
        <p className="font-avenir mt-2 text-[13px] font-normal leading-[20px] tracking-[0.2px] text-[#7b808a] dark:text-[var(--muted-fg)]">
          {tipCard.description}
        </p>
        <Button className="font-poppins mt-auto h-[52px] w-full rounded-[10px] bg-[#0f0f10] text-[12px] font-semibold tracking-[3px] text-white hover:bg-slate-800">
          {tipCard.actionLabel}
        </Button>
      </div>
    </aside>
  );
}

export default StatsPanel;

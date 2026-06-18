import React, { useState } from "react";
import { AlertCircle, Download, Plus, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import ExpensesChart from "@/components/dashboard/ExpensesChart";
import TransactionList from "@/components/dashboard/TransactionList";
import { teamMembers } from "@/data/mockData";
import { downloadTransactionsCsv } from "@/lib/exportTransactions";

function LoadingRows() {
  return (
    <div className="mt-8 space-y-4">
      {[1, 2, 3].map((item) => (
        <div key={item} className="flex animate-pulse items-center gap-4">
          <div className="h-11 w-11 rounded-full bg-slate-200 dark:bg-white/10" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/3 rounded bg-slate-200 dark:bg-white/10" />
            <div className="h-3 w-1/2 rounded bg-slate-200 dark:bg-white/10" />
          </div>
          <div className="h-4 w-20 rounded bg-slate-200 dark:bg-white/10" />
        </div>
      ))}
    </div>
  );
}

function DashboardContent({
  dashboardData,
  error,
  isAuthed,
  isCheckingAuth,
  isError,
  isLoading,
  onRetry
}) {
  const [exportError, setExportError] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  async function handleExport() {
    if (!isAuthed) {
      setExportError("Login first to export your transactions.");
      return;
    }

    setIsExporting(true);
    setExportError("");

    try {
      await downloadTransactionsCsv();
    } catch (requestError) {
      setExportError(
        requestError.response?.data?.message ||
          "Unable to export transactions. Please try again."
      );
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <section className="flex-1 overflow-y-auto bg-[var(--content-bg)] p-5 sm:p-8 lg:p-12 xl:p-[60px]">
      <header className="grid animate-[fade-in_.35s_ease-out] grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:gap-6">
        <div className="min-w-0">
          <h1 className="truncate text-3xl font-black text-[var(--content-fg)] sm:text-4xl lg:text-5xl">
            Expenses
          </h1>
          <p className="mt-2 text-sm font-medium text-[var(--muted-fg)] sm:mt-3">
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
          <button
            type="button"
            aria-label="Export transactions as CSV"
            title="Export transactions as CSV"
            onClick={handleExport}
            disabled={isExporting}
            className="grid h-9 w-9 place-items-center rounded-full border border-[var(--muted-fg)]/30 text-[var(--muted-fg)] transition hover:border-[var(--content-fg)] hover:text-[var(--content-fg)] disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </header>

      {exportError && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
          {exportError}
        </div>
      )}

      {isCheckingAuth || isLoading ? (
        <LoadingRows />
      ) : isAuthed && isError ? (
        <div className="mt-8 rounded-xl border border-rose-200 bg-rose-50 p-5 text-rose-800">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="font-bold">Could not load dashboard data</p>
              <p className="mt-1 text-sm">{error}</p>
              <Button
                type="button"
                onClick={onRetry}
                className="mt-4 h-9 rounded-md bg-rose-700 px-3 text-sm text-white hover:bg-rose-800"
              >
                <RefreshCcw className="mr-2 h-4 w-4" />
                Retry
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-8 sm:mt-10">
            <ExpensesChart chartData={dashboardData?.chartData} />
          </div>

          <div className="mt-8 sm:mt-10">
            <TransactionList transactions={dashboardData?.recentTransactions} />
          </div>
        </>
      )}
    </section>
  );
}

export default DashboardContent;

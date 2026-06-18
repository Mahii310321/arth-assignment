import React from "react";
import { Clock3 } from "lucide-react";

function ComingSoonPage({ title }) {
  return (
    <section className="flex min-h-[640px] flex-1 items-center justify-center bg-[var(--content-bg)] p-6 sm:p-10 xl:p-[60px]">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
          <Clock3 className="h-7 w-7" />
        </div>
        <h1 className="mt-6 text-3xl font-black text-[var(--content-fg)] sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-lg font-semibold text-[var(--muted-fg)]">Coming soon</p>
      </div>
    </section>
  );
}

export default ComingSoonPage;

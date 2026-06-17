import React, { useState } from "react";
import { Menu, X } from "lucide-react";

import DashboardContent from "@/components/dashboard/DashboardContent";
import LoginDialog from "@/components/dashboard/LoginDialog";
import Sidebar from "@/components/dashboard/Sidebar";
import StatsPanel from "@/components/dashboard/StatsPanel";
import { user } from "@/data/mockData";
import { useAuth } from "@/hooks/useAuth";

function App() {
  const [active, setActive] = useState("expenses");
  const [loginOpen, setLoginOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const { currentUser, isAuthed, login, logout } = useAuth();
  const visibleUser = isAuthed ? currentUser : user;

  function handleSelect(key) {
    setActive(key);
    setNavOpen(false);
  }

  function handleMobileLogin() {
    setNavOpen(false);
    setLoginOpen(true);
  }

  function handleMobileLogout() {
    setNavOpen(false);
    logout();
  }

  return (
    <main className="min-h-screen w-full bg-[var(--app-bg)] lg:p-6">
      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-white/5 bg-[var(--sidebar-bg)] px-4 py-3 text-white lg:hidden">
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={visibleUser.avatar}
            alt={visibleUser.name}
            className="h-9 w-9 shrink-0 rounded-lg object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">{visibleUser.name}</p>
            <p className="truncate text-xs text-white/40">Expenses</p>
          </div>
        </div>
        <button
          aria-label="Open menu"
          onClick={() => setNavOpen(true)}
          className="rounded-md p-2 text-white/70 transition hover:bg-white/5 hover:text-white"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {navOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <button
            aria-label="Close menu overlay"
            className="absolute inset-0 bg-black/60"
            onClick={() => setNavOpen(false)}
          />
          <div className="relative h-full w-[280px] max-w-[86vw] bg-[var(--sidebar-bg)] shadow-2xl">
            <button
              aria-label="Close menu"
              onClick={() => setNavOpen(false)}
              className="absolute right-3 top-3 z-10 rounded-md p-2 text-white/60 transition hover:bg-white/5 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <Sidebar
              active={active}
              currentUser={currentUser}
              onSelect={handleSelect}
              isAuthed={isAuthed}
              onLoginClick={handleMobileLogin}
              onLogout={handleMobileLogout}
            />
          </div>
        </div>
      )}

      <section
        aria-label="Expenses dashboard"
        className="mx-auto flex w-full max-w-[1440px] flex-col overflow-hidden bg-[var(--sidebar-bg)] lg:h-[calc(100vh-3rem)] lg:flex-row lg:rounded-[30px] lg:shadow-2xl xl:h-[900px]"
      >
        <div className="hidden lg:flex lg:h-full lg:w-[280px] lg:shrink-0 xl:w-[360px]">
          <Sidebar
            active={active}
            currentUser={currentUser}
            onSelect={setActive}
            isAuthed={isAuthed}
            onLoginClick={() => setLoginOpen(true)}
            onLogout={logout}
          />
        </div>

        <div className="flex flex-1 flex-col overflow-hidden xl:flex-row">
          <DashboardContent />
          <StatsPanel />
        </div>
      </section>

      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} onLogin={login} />
    </main>
  );
}

export default App;

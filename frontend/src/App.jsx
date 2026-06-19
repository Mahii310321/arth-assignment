import React, { useEffect, useMemo, useRef, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

import ComingSoonPage from "@/components/dashboard/ComingSoonPage";
import DashboardContent from "@/components/dashboard/DashboardContent";
import LoginDialog from "@/components/dashboard/LoginDialog";
import Sidebar from "@/components/dashboard/Sidebar";
import StatsPanel from "@/components/dashboard/StatsPanel";
import { navItems, user } from "@/data/mockData";
import { useAuth } from "@/hooks/useAuth";
import { useDashboardData } from "@/hooks/useDashboardData";

function App() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const hasOpenedLogin = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, isAuthed, isCheckingAuth, login, logout, register } = useAuth();
  const {
    data: dashboardData,
    error: dashboardError,
    isError: isDashboardError,
    isLoading: isDashboardLoading,
    refetch: refetchDashboard
  } = useDashboardData(isAuthed);
  const visibleUser = isAuthed ? currentUser : user;
  const showGuestSkeleton = isCheckingAuth || !isAuthed;
  const activeItem = useMemo(() => {
    return navItems.find((item) => item.path === location.pathname) || navItems[0];
  }, [location.pathname]);

  useEffect(() => {
    if (!isCheckingAuth && !isAuthed && !hasOpenedLogin.current) {
      hasOpenedLogin.current = true;
      setLoginOpen(true);
    }
  }, [isAuthed, isCheckingAuth]);

  function handleSelect(item) {
    navigate(item.path);
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

  function DashboardRoute() {
    return (
      <>
        <DashboardContent
          dashboardData={dashboardData}
          isAuthed={isAuthed}
          isCheckingAuth={isCheckingAuth}
          isError={isDashboardError}
          isLoading={isDashboardLoading}
          onRetry={refetchDashboard}
          error={dashboardError}
        />
        <StatsPanel dashboardData={dashboardData} isAuthed={isAuthed} />
      </>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[var(--app-bg)] lg:h-screen lg:overflow-hidden lg:p-6">
      <a
        href="#dashboard-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-slate-950"
      >
        Skip to dashboard content
      </a>
      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-white/5 bg-[var(--sidebar-bg)] px-4 py-3 text-white lg:hidden">
        <div className="flex min-w-0 items-center gap-3">
          {showGuestSkeleton ? (
            <>
              <div className="h-9 w-9 shrink-0 animate-pulse rounded-lg bg-white/10" />
              <div className="min-w-0 space-y-2">
                <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
                <div className="h-2.5 w-16 animate-pulse rounded bg-white/10" />
              </div>
            </>
          ) : (
            <>
              <img
                src={visibleUser.avatar}
                alt={visibleUser.name}
                className="h-9 w-9 shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{visibleUser.name}</p>
                <p className="truncate text-xs text-white/40">{activeItem.label}</p>
              </div>
            </>
          )}
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
              active={activeItem.key}
              currentUser={currentUser}
              onSelect={handleSelect}
              isAuthed={isAuthed}
              showSkeleton={showGuestSkeleton}
              onLoginClick={handleMobileLogin}
              onLogout={handleMobileLogout}
            />
          </div>
        </div>
      )}

      <section
        aria-label="Expenses dashboard"
        className="mx-auto flex w-full max-w-[1440px] flex-col overflow-hidden bg-[var(--sidebar-bg)] lg:h-[calc(100vh-3rem)] lg:flex-row lg:rounded-[30px] lg:shadow-2xl"
      >
        <div className="hidden lg:flex lg:h-full lg:w-[280px] lg:shrink-0 xl:w-[360px]">
          <Sidebar
            active={activeItem.key}
            currentUser={currentUser}
            onSelect={handleSelect}
            isAuthed={isAuthed}
            showSkeleton={showGuestSkeleton}
            onLoginClick={() => setLoginOpen(true)}
            onLogout={logout}
          />
        </div>

        <div id="dashboard-content" className="flex min-h-0 flex-1 flex-col overflow-hidden xl:flex-row">
          <Routes>
            <Route path="/" element={<DashboardRoute />} />
            <Route path="/dashboard" element={<Navigate to="/" replace />} />
            {navItems
              .filter((item) => item.key !== "dashboard")
              .map((item) => (
                <Route
                  key={item.key}
                  path={item.path}
                  element={<ComingSoonPage title={item.label} />}
                />
              ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </section>

      <LoginDialog
        open={loginOpen}
        onOpenChange={setLoginOpen}
        onLogin={login}
        onRegister={register}
      />
    </main>
  );
}

export default App;

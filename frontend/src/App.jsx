import React, { useState } from "react";

import DashboardContent from "@/components/dashboard/DashboardContent";
import LoginDialog from "@/components/dashboard/LoginDialog";
import Sidebar from "@/components/dashboard/Sidebar";
import StatsPanel from "@/components/dashboard/StatsPanel";
import { useAuth } from "@/hooks/useAuth";

function App() {
  const [active, setActive] = useState("expenses");
  const [loginOpen, setLoginOpen] = useState(false);
  const { isAuthed, login, logout } = useAuth();

  return (
    <main className="min-h-screen w-full bg-[var(--app-bg)] p-0 lg:p-6">
      <section
        aria-label="Expenses dashboard"
        className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col overflow-hidden bg-[var(--sidebar-bg)] lg:min-h-0 lg:h-[calc(100vh-3rem)] lg:flex-row lg:rounded-[30px] lg:shadow-2xl xl:h-[900px]"
      >
        <Sidebar
          active={active}
          onSelect={setActive}
          isAuthed={isAuthed}
          onLoginClick={() => setLoginOpen(true)}
          onLogout={logout}
        />
        <DashboardContent />
        <StatsPanel />
      </section>

      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} onLogin={login} />
    </main>
  );
}

export default App;

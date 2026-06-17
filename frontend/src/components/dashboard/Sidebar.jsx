import React from "react";
import { Bell, LogIn, LogOut, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { navItems, user } from "@/data/mockData";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

function Sidebar({ active, currentUser, onSelect, isAuthed, onLoginClick, onLogout }) {
  const { theme, toggle } = useTheme();
  const visibleUser = isAuthed ? currentUser : user;

  return (
    <aside className="flex h-full w-full animate-[slide-in_.4s_ease-out] flex-col bg-[var(--sidebar-bg)] text-[var(--sidebar-fg)]">
      <div className="px-8 pb-8 pt-10 lg:pt-12 xl:px-20 xl:pt-20">
        <div className="relative inline-block">
          <img
            src={visibleUser.avatar}
            alt={visibleUser.name}
            loading="lazy"
            className="h-[88px] w-[88px] rounded-2xl object-cover shadow-lg"
          />
          <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-sm font-semibold text-white shadow-lg">
            {visibleUser.notifications}
          </span>
          <Bell className="sr-only" />
        </div>
        <h2 className="mt-5 text-3xl font-bold">{visibleUser.name}</h2>
        <p className="mt-2 text-sm font-medium text-white/40 xl:text-base">
          {visibleUser.email}
        </p>
      </div>

      <nav className="flex-1 px-4 pt-6 xl:px-16 xl:pt-16" aria-label="Dashboard navigation">
        <ul className="space-y-1 xl:space-y-2">
          {navItems.map((item, index) => {
            const isActive = active === item.key;
            const Icon = item.icon;

            return (
              <li
                key={item.key}
                style={{ animationDelay: `${0.08 + index * 0.04}s` }}
                className="animate-[slide-in_.35s_ease-out_both]"
              >
                <button
                  onClick={() => onSelect(item.key)}
                  className={cn(
                    "group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-lg font-semibold transition-all xl:gap-4 xl:py-4 xl:text-xl",
                    isActive
                      ? "bg-white/5 text-white"
                      : "text-white/35 hover:bg-white/[0.03] hover:text-white/80"
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" strokeWidth={isActive ? 2.5 : 2} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex items-center justify-between gap-2 px-8 pb-8 pt-6 xl:px-20">
        {isAuthed ? (
          <Button
            variant="ghost"
            onClick={onLogout}
            className="h-auto px-0 text-base font-semibold text-white/40 hover:bg-transparent hover:text-white"
          >
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        ) : (
          <Button
            variant="ghost"
            onClick={onLoginClick}
            className="h-auto px-0 text-base font-semibold text-white/40 hover:bg-transparent hover:text-white"
          >
            <LogIn className="mr-2 h-4 w-4" /> Login
          </Button>
        )}
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="rounded-full p-2 text-white/40 transition hover:bg-white/5 hover:text-white"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;

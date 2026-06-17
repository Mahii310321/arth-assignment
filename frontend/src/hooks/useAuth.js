import { useEffect, useState } from "react";

export function useAuth() {
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    setIsAuthed(localStorage.getItem("dashboard-auth") === "1");
  }, []);

  function login() {
    localStorage.setItem("dashboard-auth", "1");
    setIsAuthed(true);
  }

  function logout() {
    localStorage.removeItem("dashboard-auth");
    setIsAuthed(false);
  }

  return { isAuthed, login, logout };
}

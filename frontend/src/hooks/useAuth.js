import { useEffect, useState } from "react";

import { authedUser } from "@/data/mockData";

const AUTH_KEY = "dashboard-auth";
const USER_KEY = "dashboard-user";

export function useAuth() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [currentUser, setCurrentUser] = useState(authedUser);

  useEffect(() => {
    setIsAuthed(localStorage.getItem(AUTH_KEY) === "1");

    const storedUser = localStorage.getItem(USER_KEY);
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  function login(profile = authedUser) {
    localStorage.setItem(AUTH_KEY, "1");
    localStorage.setItem(USER_KEY, JSON.stringify(profile));
    setCurrentUser(profile);
    setIsAuthed(true);
  }

  function logout() {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
    setCurrentUser(authedUser);
    setIsAuthed(false);
  }

  return { currentUser, isAuthed, login, logout };
}

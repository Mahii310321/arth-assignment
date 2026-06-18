import { useEffect, useState } from "react";

import { authedUser } from "@/data/mockData";
import { apiClient, clearToken, getToken, saveToken } from "@/lib/apiClient";

const USER_KEY = "dashboard-user";

function normalizeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    notifications: 0,
    avatar: user.profileImageUrl || authedUser.avatar,
    profileImageUrl: user.profileImageUrl
  };
}

export function useAuth() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [currentUser, setCurrentUser] = useState(authedUser);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      const token = getToken();
      const storedUser = localStorage.getItem(USER_KEY);

      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }

      if (!token) {
        setIsCheckingAuth(false);
        return;
      }

      try {
        const response = await apiClient.get("/api/auth/me");
        const profile = normalizeUser(response.data.user);
        localStorage.setItem(USER_KEY, JSON.stringify(profile));
        setCurrentUser(profile);
        setIsAuthed(true);
      } catch {
        clearToken();
        localStorage.removeItem(USER_KEY);
        setIsAuthed(false);
        setCurrentUser(authedUser);
      } finally {
        setIsCheckingAuth(false);
      }
    }

    restoreSession();
  }, []);

  function setSession(token, user) {
    const profile = normalizeUser(user);
    saveToken(token);
    localStorage.setItem(USER_KEY, JSON.stringify(profile));
    setCurrentUser(profile);
    setIsAuthed(true);
  }

  async function login(values) {
    const response = await apiClient.post("/api/auth/login", values);
    setSession(response.data.token, response.data.user);
    return response.data;
  }

  async function register(values) {
    const response = await apiClient.post("/api/auth/register", {
      ...values,
      profileImageUrl:
        values.profileImageUrl ||
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=faces"
    });
    setSession(response.data.token, response.data.user);
    return response.data;
  }

  async function logout() {
    try {
      if (getToken()) {
        await apiClient.post("/api/auth/logout");
      }
    } catch {
      // Client cleanup should still happen even if the token is already expired.
    }

    clearToken();
    localStorage.removeItem(USER_KEY);
    setCurrentUser(authedUser);
    setIsAuthed(false);
  }

  return { currentUser, isAuthed, isCheckingAuth, login, logout, register };
}

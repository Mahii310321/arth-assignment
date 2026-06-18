import { useEffect, useState } from "react";

import { apiClient } from "@/lib/apiClient";

export function useDashboardData(isAuthed) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function loadDashboard() {
    if (!isAuthed) {
      setData(null);
      setStatus("idle");
      setError("");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      const response = await apiClient.get("/api/dashboard");
      setData(response.data);
      setStatus("success");
    } catch (requestError) {
      setData(null);
      setStatus("error");
      setError(
        requestError.response?.data?.message ||
          "Unable to load dashboard data. Please check the backend."
      );
    }
  }

  useEffect(() => {
    loadDashboard();
  }, [isAuthed]);

  return {
    data,
    error,
    isError: status === "error",
    isLoading: status === "loading",
    refetch: loadDashboard
  };
}

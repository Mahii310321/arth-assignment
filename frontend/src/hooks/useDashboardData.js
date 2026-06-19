import { useEffect, useRef, useState } from "react";

import { apiClient, getToken } from "@/lib/apiClient";

export function useDashboardData(isAuthed) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const lastPayloadRef = useRef("");

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
      lastPayloadRef.current = JSON.stringify(response.data);
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

  useEffect(() => {
    const token = getToken();

    if (!isAuthed || !token || typeof EventSource === "undefined") {
      return undefined;
    }

    const baseUrl = apiClient.defaults.baseURL || window.location.origin;
    const stream = new EventSource(
      `${baseUrl}/api/dashboard/stream?token=${encodeURIComponent(token)}`
    );

    stream.addEventListener("dashboard", (event) => {
      if (event.data === lastPayloadRef.current) {
        return;
      }

      lastPayloadRef.current = event.data;
      setData(JSON.parse(event.data));
      setStatus("success");
      setError("");
    });

    stream.addEventListener("error", () => {
      setError((currentError) => currentError || "Live dashboard updates are temporarily unavailable.");
    });

    return () => {
      stream.close();
    };
  }, [isAuthed]);

  return {
    data,
    error,
    isError: status === "error",
    isLoading: status === "loading",
    refetch: loadDashboard
  };
}

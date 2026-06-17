import React, { useState } from "react";
import axios from "axios";
import { Activity, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

function App() {
  const [health, setHealth] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function checkHealth() {
    setStatus("loading");
    setError("");

    try {
      const response = await axios.get(`${API_BASE_URL}/health`);
      setHealth(response.data);
      setStatus("success");
    } catch (requestError) {
      setHealth(null);
      setError(
        requestError.response?.data?.message ||
          "Unable to reach the backend health endpoint."
      );
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-[#101010] px-6 py-10 text-white">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl flex-col justify-center">
        <div className="rounded-lg border border-white/10 bg-white p-8 text-slate-900 shadow-2xl">
          <div className="mb-8 flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Activity aria-hidden="true" className="h-6 w-6" />
            </span>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard Assignment</h1>
              <p className="text-sm text-muted-foreground">
                Phase 1 foundation with backend health check.
              </p>
            </div>
          </div>

          <div className="grid gap-4 rounded-md border bg-secondary/50 p-5 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Backend URL</p>
              <p className="mt-1 break-all font-mono text-sm">{API_BASE_URL}/health</p>
            </div>
            <Button onClick={checkHealth} disabled={status === "loading"}>
              <RefreshCcw
                aria-hidden="true"
                className={`mr-2 h-4 w-4 ${status === "loading" ? "animate-spin" : ""}`}
              />
              Check Health
            </Button>
          </div>

          <div className="mt-6 min-h-24 rounded-md border bg-background p-5">
            {status === "idle" && (
              <p className="text-muted-foreground">
                Start the backend, then check the API connection.
              </p>
            )}
            {status === "loading" && <p className="text-muted-foreground">Checking...</p>}
            {status === "error" && (
              <p role="alert" className="text-sm font-medium text-destructive">
                {error}
              </p>
            )}
            {status === "success" && health && (
              <dl className="grid gap-3 text-sm sm:grid-cols-3">
                <div>
                  <dt className="text-muted-foreground">Status</dt>
                  <dd className="font-semibold text-accent">{health.status}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Service</dt>
                  <dd className="font-semibold">{health.service}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Timestamp</dt>
                  <dd className="font-semibold">{health.timestamp}</dd>
                </div>
              </dl>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;

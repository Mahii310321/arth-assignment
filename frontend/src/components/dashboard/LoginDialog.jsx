import React, { useState } from "react";
import { Flame } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginDialog({ open, onOpenChange, onLogin }) {
  const [mode, setMode] = useState("login");
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function switchMode(nextMode) {
    setMode(nextMode);
    setErrors({});
    setValues({ name: "", email: "", password: "" });
  }

  function updateValue(event) {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function validate() {
    const nextErrors = {};
    if (mode === "register" && values.name.trim().length < 2) {
      nextErrors.name = "Name is required.";
    }
    if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      nextErrors.email = "Enter a valid email.";
    }
    if (mode === "login" && !values.password) {
      nextErrors.password = "Password is required.";
    }
    if (mode === "register") {
      if (values.password.length < 8) nextErrors.password = "Use at least 8 characters.";
      else if (!/[A-Z]/.test(values.password)) nextErrors.password = "Add one uppercase letter.";
      else if (!/[a-z]/.test(values.password)) nextErrors.password = "Add one lowercase letter.";
      else if (!/[0-9]/.test(values.password)) nextErrors.password = "Add one number.";
      else if (!/[^A-Za-z0-9]/.test(values.password)) {
        nextErrors.password = "Add one special character.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function submit(event) {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 450));
    onLogin();
    onOpenChange(false);
    setValues({ name: "", email: "", password: "" });
    setErrors({});
    setIsSubmitting(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl border-0 bg-white p-10 text-slate-900">
        <DialogHeader className="items-center text-center">
          <div className="mb-4 flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-900 text-white">
              <Flame className="h-5 w-5" />
            </div>
            <DialogTitle className="text-3xl font-black text-slate-900">SMOKE</DialogTitle>
          </div>
          <DialogDescription className="sr-only">
            Sign in or register to access your dashboard.
          </DialogDescription>
        </DialogHeader>

        <div className="mb-6 grid grid-cols-2 rounded-lg bg-slate-100 p-1">
          {["login", "register"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => switchMode(tab)}
              className={`rounded-md px-3 py-2 text-sm font-semibold capitalize transition ${
                mode === tab ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="space-y-5">
          {mode === "register" && (
            <div className="space-y-1">
              <Label htmlFor="name" className="text-xs font-semibold uppercase text-slate-500">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={values.name}
                onChange={updateValue}
                className="rounded-none border-0 border-b border-slate-300 bg-transparent px-0 text-slate-900 shadow-none focus-visible:border-slate-900 focus-visible:ring-0"
              />
              {errors.name && <p className="text-xs text-rose-600">{errors.name}</p>}
            </div>
          )}

          <div className="space-y-1">
            <Label htmlFor="email" className="text-xs font-semibold uppercase text-slate-500">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={values.email}
              onChange={updateValue}
              className="rounded-none border-0 border-b border-slate-300 bg-transparent px-0 text-slate-900 shadow-none focus-visible:border-slate-900 focus-visible:ring-0"
            />
            {errors.email && <p className="text-xs text-rose-600">{errors.email}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="password" className="text-xs font-semibold uppercase text-slate-500">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={values.password}
              onChange={updateValue}
              className="rounded-none border-0 border-b border-slate-300 bg-transparent px-0 text-slate-900 shadow-none focus-visible:border-slate-900 focus-visible:ring-0"
            />
            {errors.password && <p className="text-xs text-rose-600">{errors.password}</p>}
          </div>

          {mode === "login" && (
            <button type="button" className="text-xs text-slate-500 hover:text-slate-900">
              Forgot Your Password?
            </button>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-md bg-slate-800 text-base font-semibold text-white hover:bg-slate-900"
          >
            {isSubmitting ? "Please wait..." : mode === "login" ? "Enter" : "Create Account"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default LoginDialog;

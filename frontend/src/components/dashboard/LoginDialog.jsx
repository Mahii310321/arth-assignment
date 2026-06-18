import React, { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flame } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email."),
  password: z.string().min(1, "Password is required.")
});

const registerSchema = z.object({
  name: z.string().trim().min(2, "Name is required."),
  email: z.string().trim().email("Enter a valid email."),
  password: z
    .string()
    .min(8, "Use at least 8 characters.")
    .regex(/[A-Z]/, "Add one uppercase letter.")
    .regex(/[a-z]/, "Add one lowercase letter.")
    .regex(/[0-9]/, "Add one number.")
    .regex(/[^A-Za-z0-9]/, "Add one special character.")
});

function LoginDialog({ open, onOpenChange, onLogin, onRegister }) {
  const [mode, setMode] = useState("login");
  const schema = useMemo(() => (mode === "login" ? loginSchema : registerSchema), [mode]);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
    setError
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });

  function switchMode(nextMode) {
    setMode(nextMode);
    reset();
  }

  async function submit(values) {
    try {
      if (mode === "login") {
        await onLogin({
          email: values.email,
          password: values.password
        });
      } else {
        await onRegister({
          name: values.name,
          email: values.email,
          password: values.password
        });
      }

      onOpenChange(false);
      reset();
    } catch (requestError) {
      setError("root", {
        message:
          requestError.response?.data?.message ||
          "Unable to authenticate. Please try again."
      });
    }
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

        <form onSubmit={handleSubmit(submit)} className="space-y-5">
          {errors.root && (
            <div
              role="alert"
              className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700"
            >
              {errors.root.message}
            </div>
          )}

          {mode === "register" && (
            <div className="space-y-1">
              <Label htmlFor="name" className="text-xs font-semibold uppercase text-slate-500">
                Name
              </Label>
              <Input
                id="name"
                {...register("name")}
                aria-invalid={Boolean(errors.name)}
                className="rounded-none border-0 border-b border-slate-300 bg-transparent px-0 text-slate-900 shadow-none focus-visible:border-slate-900 focus-visible:ring-0"
              />
              {errors.name && <p className="text-xs text-rose-600">{errors.name.message}</p>}
            </div>
          )}

          <div className="space-y-1">
            <Label htmlFor="email" className="text-xs font-semibold uppercase text-slate-500">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              aria-invalid={Boolean(errors.email)}
              className="rounded-none border-0 border-b border-slate-300 bg-transparent px-0 text-slate-900 shadow-none focus-visible:border-slate-900 focus-visible:ring-0"
            />
            {errors.email && <p className="text-xs text-rose-600">{errors.email.message}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="password" className="text-xs font-semibold uppercase text-slate-500">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              aria-invalid={Boolean(errors.password)}
              className="rounded-none border-0 border-b border-slate-300 bg-transparent px-0 text-slate-900 shadow-none focus-visible:border-slate-900 focus-visible:ring-0"
            />
            {errors.password && (
              <p className="text-xs text-rose-600">{errors.password.message}</p>
            )}
          </div>

          {mode === "login" && (
            <button type="button" className="text-xs text-slate-500 hover:text-slate-900">
              Forgot Your Password?
            </button>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-md bg-slate-800 text-base font-semibold text-white hover:bg-slate-900 disabled:opacity-70"
          >
            {isSubmitting ? "Please wait..." : mode === "login" ? "Enter" : "Create Account"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default LoginDialog;

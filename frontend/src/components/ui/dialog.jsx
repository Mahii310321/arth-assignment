import React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

function Dialog({ open, onOpenChange, children }) {
  if (!open) return null;

  return (
    <div role="presentation" onKeyDown={(event) => event.key === "Escape" && onOpenChange(false)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { onOpenChange }) : child
      )}
    </div>
  );
}

function DialogOverlay({ className, onOpenChange, ...props }) {
  return (
    <div
      className={cn("fixed inset-0 z-50 bg-black/70 backdrop-blur-[1px]", className)}
      onClick={() => onOpenChange(false)}
      {...props}
    />
  );
}

function DialogContent({ className, children, onOpenChange, ...props }) {
  return (
    <>
      <DialogOverlay onOpenChange={onOpenChange} />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 text-slate-900 shadow-2xl outline-none",
          className
        )}
        {...props}
      >
        {children}
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute right-5 top-5 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </>
  );
}

function DialogHeader({ className, ...props }) {
  return <div className={cn("flex flex-col space-y-2", className)} {...props} />;
}

function DialogTitle({ className, ...props }) {
  return <h2 className={cn("text-lg font-semibold", className)} {...props} />;
}

function DialogDescription({ className, ...props }) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle
};

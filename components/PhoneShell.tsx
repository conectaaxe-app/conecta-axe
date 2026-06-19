import type { ReactNode } from "react";

export function PhoneShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <main className={`phoneShell ${className}`}>
      {children}
    </main>
  );
}

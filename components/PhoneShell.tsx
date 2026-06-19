import type { ReactNode } from "react";

export function PhoneShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <main className={`phoneShell ${className}`}>
      <div className="statusBar">
        <span>9:41</span>
        <span>▮▮  ◒  ▭</span>
      </div>
      {children}
    </main>
  );
}

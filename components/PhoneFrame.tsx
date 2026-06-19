export function PhoneFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`phone-frame ${className}`}>
      <div className="phone-screen">
        <div className="statusbar"><span>9:41</span><span>◔ ᯤ ▰</span></div>
        {children}
      </div>
    </div>
  );
}

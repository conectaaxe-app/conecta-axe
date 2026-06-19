import { LogoMark } from './LogoMark';

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'brand brand-compact' : 'brand'}>
      <LogoMark size={compact ? 42 : 98} />
      <div className="brand-text">
        <h1>Conecta <span>Axé</span></h1>
        {!compact && <p>O app para descobrir macumbas,<br />casas e pessoas perto de você.</p>}
      </div>
    </div>
  );
}

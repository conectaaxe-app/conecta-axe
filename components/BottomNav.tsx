import Link from 'next/link';
import { Bell, Home, MapPin, Plus, UserRound } from 'lucide-react';

export function BottomNav({ active = 'inicio' }: { active?: string }) {
  const item = (href: string, key: string, label: string, Icon: any) => (
    <Link className={`nav-item ${active === key ? 'active' : ''}`} href={href}>
      <Icon size={21} strokeWidth={1.9} />
      <span>{label}</span>
    </Link>
  );

  return (
    <nav className="bottom-nav">
      {item('/feed', 'inicio', 'Início', Home)}
      {item('/mapa', 'mapa', 'Mapa', MapPin)}
      <Link className="nav-plus" href="/cadastro" aria-label="Publicar"><Plus size={32} /></Link>
      {item('/admin', 'notificacoes', 'Notif.', Bell)}
      {item('/perfil', 'perfil', 'Perfil', UserRound)}
    </nav>
  );
}

import { AlertTriangle, BadgeDollarSign, BarChart3, CalendarDays, Flag, Home, ShieldCheck, UsersRound } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { Brand } from '@/components/Brand';
import { PhoneFrame } from '@/components/PhoneFrame';

export default function AdminPage() {
  const cards: Array<{ title: string; desc: string; Icon: any }> = [
    { title: 'Usuários', desc: 'Gerenciar perfis pessoais e bloqueios', Icon: UsersRound },
    { title: 'Casas de axé', desc: 'Casas cadastradas e administradores', Icon: Home },
    { title: 'Eventos', desc: 'Eventos oficiais e denúncias', Icon: CalendarDays },
    { title: 'Central de Denúncias', desc: 'Posts, perfis, casas e eventos denunciados', Icon: Flag },
    { title: 'Moderação automática', desc: 'Palavras, regras e níveis de gravidade', Icon: ShieldCheck },
    { title: 'Destaques internos', desc: 'Top 3, recomendações e campanhas', Icon: BarChart3 },
    { title: 'Monetização', desc: 'Fase futura: Mercado Pago, destaques e planos', Icon: BadgeDollarSign },
    { title: 'Alertas críticos', desc: 'Ameaças, racismo, intolerância e golpes', Icon: AlertTriangle }
  ];
  return (
    <main className="app-shell">
      <PhoneFrame>
        <div className="app-scroll">
          <header className="app-top"><Brand compact /><strong>Admin</strong></header>
          <div className="notice"><strong>Painel administrativo web.</strong><br />No MVP visual, esta área representa a futura central de moderação, usuários, casas, eventos e destaques internos.</div>
          <div className="admin-grid">
            {cards.map(({ title, desc, Icon }) => (
              <div className="admin-card" key={title}><div className="choice-icon" style={{ width: 46, height: 46 }}><Icon size={23} /></div><div><strong>{title}</strong><span>{desc}</span></div></div>
            ))}
          </div>
        </div>
        <BottomNav active="notificacoes" />
      </PhoneFrame>
    </main>
  );
}

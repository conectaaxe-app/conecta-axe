import { ArrowLeft, Building2, CalendarDays, Heart, Pencil, Share2, UsersRound } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { EventListItem } from '@/components/EventCard';
import { PhoneFrame } from '@/components/PhoneFrame';

export default function CasaPage() {
  return (
    <main className="app-shell">
      <PhoneFrame>
        <div className="app-scroll" style={{ paddingTop: 0 }}>
          <header className="app-top"><ArrowLeft size={24} /><strong>Perfil da Casa</strong><span><Share2 size={21} /> •••</span></header>
          <div className="profile-cover" />
          <section className="profile-main">
            <div className="profile-photo"><Building2 size={54} /></div>
            <h2>Ilê Axé Odé Ofaguerangi <span className="verified">●</span></h2>
            <span className="handle">@odeofaguerangi</span>
            <p className="location" style={{ margin: '10px 0' }}>📍 Salvador, BA • 2,3 km de você</p>
            <span style={{ fontSize: 13, color: 'rgba(53,31,21,.70)' }}>Rua das Flores, 123 — São Caetano, Salvador — BA</span>
            <p className="bio">Casa de axé fundada na força de Oxóssi, guiada pelo respeito aos mais velhos, à natureza e à ancestralidade. Axé, acolhimento e tradição que transformam vidas.</p>
            <div className="stats"><div><UsersRound size={18} /><strong>1.842</strong><span>Seguidores</span></div><div><CalendarDays size={18} /><strong>34</strong><span>Eventos</span></div><div><UsersRound size={18} /><strong>2.316</strong><span>Interessados</span></div><div><Heart size={18} /><strong>623</strong><span>Vou</span></div></div>
            <div className="action-row"><button className="primary-btn">Seguir</button><button className="outline-btn" style={{ color: '#351F15' }}>📍 Como chegar</button></div>
            <div className="section-head"><h3>Gerenciar Casa</h3></div>
            <div className="action-row"><button className="green-btn" style={{ fontSize: 15, padding: 13 }}>+ Criar evento</button><button className="outline-btn" style={{ color: '#2F4E2D', borderColor: 'rgba(47,78,45,.35)', fontSize: 15, padding: 13 }}><Pencil size={16} /> Editar casa</button></div>
            <div className="tabs"><span className="selected">Eventos</span><span>Publicações</span><span>Sobre</span></div>
            <div className="section-head"><h3>Próximos eventos oficiais</h3><span>Ver todos</span></div>
            <EventListItem title="Festa de Oxóssi" house="Sáb, 15 de Junho • 20h" time="356 interessados" km="189 vou" />
            <EventListItem title="Toque de Xangô" house="Sáb, 29 de Junho • 19h" time="278 interessados" km="142 vou" imageClass="img-caboclo" />
            <EventListItem title="Festa de Iemanjá" house="Dom, 07 de Julho • 16h" time="412 interessados" km="206 vou" imageClass="img-iemanja" />
          </section>
        </div>
        <BottomNav active="perfil" />
      </PhoneFrame>
    </main>
  );
}

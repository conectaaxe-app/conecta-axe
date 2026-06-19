import { ArrowLeft, Grid2X2, Heart, Share2, UserRound, UsersRound } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { EventMiniCard } from '@/components/EventCard';
import { PhoneFrame } from '@/components/PhoneFrame';

export default function PerfilPage() {
  return (
    <main className="app-shell">
      <PhoneFrame>
        <div className="app-scroll" style={{ paddingTop: 0 }}>
          <header className="app-top"><ArrowLeft size={24} /><strong>Perfil</strong><span><Share2 size={21} /> •••</span></header>
          <div className="profile-cover" />
          <section className="profile-main">
            <div className="profile-photo"><UserRound size={54} /></div>
            <h2>João de Oxóssi</h2>
            <span className="handle">@joaodeoxossi</span>
            <p className="location" style={{ margin: '10px 0' }}>📍 Salvador, BA • 2,3 km de você</p>
            <span className="badge">🌿 Filiado ao Ilê Axé Odé Ofaguerangi</span>
            <p className="bio">Filho de santo, apaixonado pela cultura afro-religiosa. Compartilho vivências, fotos e eventos da comunidade.</p>
            <div className="stats">
              <div><Grid2X2 size={18} /><strong>128</strong><span>Publicações</span></div>
              <div><UsersRound size={18} /><strong>842</strong><span>Seguidores</span></div>
              <div><UserRound size={18} /><strong>315</strong><span>Seguindo</span></div>
              <div><Heart size={18} /><strong>18</strong><span>Vou</span></div>
            </div>
            <div className="action-row"><button className="primary-btn">Seguir</button><button className="outline-btn" style={{ color: '#351F15' }}>Mensagem</button></div>
            <div className="notice"><strong>Este perfil é pessoal e não cria eventos oficiais.</strong><br />Acompanhe e participe dos eventos da comunidade.</div>
            <div className="section-head"><h3>Casa que gerencia</h3></div>
            <div className="event-list-item" style={{ gridTemplateColumns: '52px 1fr 18px' }}><div className="logo-small">☘</div><div><strong>Ilê Axé Odé Ofaguerangi</strong><p>Casa de axé • Salvador, BA</p></div><span className="chevron">›</span></div>
            <div className="section-head"><h3>Próximos eventos</h3><span>Ver todos</span></div>
            <div className="story-row"><EventMiniCard title="Festa de Oxóssi" time="Hoje • 20h" /><EventMiniCard title="Toque de Ogum" time="Sáb • 19h" imageClass="img-ogum" /><EventMiniCard title="Festa de Iemanjá" time="Dom • 16h" imageClass="img-iemanja" /></div>
            <div className="tabs"><span className="selected">Publicações</span><span>Agenda</span><span>Curtidos</span></div>
            <article className="feed-post"><p>Estarei nessa festa. Quem mais vai? 🌿🏹</p><div className="event-list-item" style={{ gridTemplateColumns: '82px 1fr' }}><div className="event-thumb img-oxossi"></div><div><strong>Festa de Oxóssi</strong><p>Hoje • 20h</p><span>Ilê Axé Odé Ofaguerangi</span></div></div></article>
          </section>
        </div>
        <BottomNav active="perfil" />
      </PhoneFrame>
    </main>
  );
}

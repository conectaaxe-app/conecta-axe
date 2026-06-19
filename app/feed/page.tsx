import { Bell, Heart, MapPin, Menu, MessageCircle, Share2 } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { Brand } from '@/components/Brand';
import { EventMiniCard } from '@/components/EventCard';
import { PhoneFrame } from '@/components/PhoneFrame';

export default function FeedPage() {
  return (
    <main className="app-shell">
      <PhoneFrame>
        <div className="app-scroll">
          <header className="app-top">
            <Menu size={23} />
            <Brand compact />
            <Bell size={22} color="#C23D2A" />
          </header>
          <div className="location"><MapPin size={15} /> Salvador, BA</div>

          <div className="section-head"><h3>Hoje tem</h3><span>Ver todos</span></div>
          <div className="story-row">
            <EventMiniCard title="Festa de Oxóssi" time="Hoje • 20h" />
            <EventMiniCard title="Festa de Ogum" time="Amanhã • 19h" imageClass="img-ogum" />
            <EventMiniCard title="Toque de Caboclo" time="Sáb • 18h" imageClass="img-caboclo" />
            <EventMiniCard title="Festa de Iemanjá" time="Dom • 16h" imageClass="img-iemanja" />
          </div>

          <div className="section-head"><h3>Feed da comunidade</h3></div>
          <article className="feed-post">
            <div className="post-head">
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div className="avatar" />
                <div><strong>Ilê Axé Odé Ofaguerangi</strong><span>Salvador, BA • 2h</span></div>
              </div>
              <strong>•••</strong>
            </div>
            <p>É com muita alegria que convidamos todos para a nossa Festa de Oxóssi!</p>
            <div className="post-image img-oxossi" />
            <div className="post-actions"><span><Heart size={17} /> 128</span><span><MessageCircle size={17} /> 24</span><span><Share2 size={17} /> Compartilhar</span></div>
          </article>

          <article className="feed-post">
            <div className="post-head">
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div className="avatar" />
                <div><strong>João de Oxóssi</strong><span>compartilhou um evento</span></div>
              </div>
              <strong>•••</strong>
            </div>
            <p>Estarei nessa festa. Quem mais vai? 🌿🏹</p>
            <div className="event-list-item" style={{ gridTemplateColumns: '80px 1fr' }}>
              <div className="event-thumb img-oxossi" />
              <div><strong>Festa de Oxóssi</strong><p>Hoje • 20h</p><span>Ilê Axé Odé Ofaguerangi</span></div>
            </div>
          </article>
        </div>
        <BottomNav active="inicio" />
      </PhoneFrame>
    </main>
  );
}

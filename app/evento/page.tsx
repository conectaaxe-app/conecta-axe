import { ArrowLeft, CalendarDays, Heart, MapPin, Share2 } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { DetailLine, MetricsRow } from '@/components/EventCard';
import { PhoneFrame } from '@/components/PhoneFrame';

export default function EventoPage() {
  return (
    <main className="app-shell">
      <PhoneFrame>
        <div className="app-scroll" style={{ paddingTop: 0 }}>
          <header className="app-top"><ArrowLeft size={24} /><strong>Evento</strong><span><Share2 size={21} /> <Heart size={21} /></span></header>
          <div className="hero-img img-oxossi" />
          <section className="event-detail-card">
            <div className="date-badge"><span>SÁB</span><strong>15</strong><span>JUN</span></div>
            <h2>Festa de Oxóssi</h2>
            <p style={{ margin: '4px 0 0' }}>Ilê Axé Odé Ofaguerangi <span className="verified">●</span></p>
            <p className="official">🛡 Evento oficial da casa</p>
            <DetailLine icon="calendar">Sáb, 15 de Junho • 20h</DetailLine>
            <DetailLine icon="pin">Rua das Flores, 123 — São Caetano, Salvador — BA</DetailLine>
            <DetailLine icon="map">2,3 km de você <strong style={{ marginLeft: 'auto', color: '#C23D2A' }}>Ver no mapa ›</strong></DetailLine>
            <p className="detail-copy">Uma noite de fé, cantos, comida e celebração em honra a Oxóssi. Toda a comunidade é bem-vinda para vivenciar esse momento de axé, tradição e encontro.</p>
            <button className="primary-btn">Quero ir</button>
            <button className="outline-btn" style={{ marginTop: 10 }}>Tenho interesse</button>
            <button className="outline-btn" style={{ marginTop: 10, color: '#2F4E2D', borderColor: 'rgba(47,78,45,.28)' }}>Compartilhar evento</button>
            <MetricsRow />
            <h3>Casa organizadora</h3>
            <div className="house-card-small">
              <div className="logo-small">☘</div>
              <div><strong>Ilê Axé Odé Ofaguerangi <span className="verified">●</span></strong><p style={{ margin: '3px 0', fontSize: 12 }}>Casa de axé • Salvador, BA</p><span style={{ fontSize: 12 }}>1.842 seguidores</span></div>
              <button className="outline-btn" style={{ padding: '9px 12px', fontSize: 12 }}>Ver perfil</button>
            </div>
            <h3>Mais informações</h3>
            <div className="event-list-item" style={{ gridTemplateColumns: '28px 1fr 20px' }}><CalendarDays size={18} /><strong>Adicionar à agenda</strong><span className="chevron">›</span></div>
            <div className="event-list-item" style={{ gridTemplateColumns: '28px 1fr 20px' }}><MapPin size={18} /><strong>Como chegar</strong><span className="chevron">›</span></div>
          </section>
        </div>
        <BottomNav active="mapa" />
      </PhoneFrame>
    </main>
  );
}

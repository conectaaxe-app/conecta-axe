import { Building2, CalendarDays, LocateFixed, Search, SlidersHorizontal } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { EventListItem } from '@/components/EventCard';
import { PhoneFrame } from '@/components/PhoneFrame';

export default function MapaPage() {
  return (
    <main className="app-shell">
      <PhoneFrame>
        <div className="map-area">
          <div className="map-search"><Search size={18} />Buscar eventos, casas ou cidade <SlidersHorizontal size={18} style={{ marginLeft: 'auto' }} /></div>
          <div className="radius" />
          <div className="user-dot" />
          <div className="pin event" style={{ left: '42%', top: '31%' }}><CalendarDays size={17} /></div>
          <div className="pin event" style={{ left: '21%', top: '43%' }}><CalendarDays size={15} /></div>
          <div className="pin event" style={{ left: '70%', top: '57%' }}><CalendarDays size={15} /></div>
          <div className="pin event" style={{ left: '57%', top: '74%' }}><CalendarDays size={15} /></div>
          <div className="pin house" style={{ left: '22%', top: '20%' }}><Building2 size={15} /></div>
          <div className="pin house" style={{ left: '66%', top: '33%' }}><Building2 size={15} /></div>
          <div className="pin house" style={{ left: '34%', top: '63%' }}><Building2 size={15} /></div>
          <div className="pin house" style={{ left: '76%', top: '26%' }}><Building2 size={15} /></div>
          <button className="social-btn" style={{ position: 'absolute', right: 18, bottom: 166, zIndex: 8 }}><LocateFixed size={24} /></button>
          <div className="map-legend">
            <span className="legend-pill"><CalendarDays size={14} color="#C23D2A" />Eventos</span>
            <span className="legend-pill"><Building2 size={14} color="#2F4E2D" />Casas</span>
            <span className="legend-pill">◌ Raio inicial 10 km</span>
          </div>
          <div className="map-sheet">
            <div className="section-head" style={{ marginTop: 0 }}><h3>Próximos perto de você</h3><span>Ver todos</span></div>
            <EventListItem title="Festa de Oxóssi" house="Ilê Axé Odé Ofaguerangi" time="Hoje • 20h" km="2,3 km" />
            <EventListItem title="Toque de Ogum" house="Terreiro de Ogum Megê" time="Amanhã • 19h" km="3,1 km" imageClass="img-ogum" />
            <EventListItem title="Festa de Iemanjá" house="Casa de Iemanjá" time="Dom • 16h" km="4,8 km" imageClass="img-iemanja" />
          </div>
        </div>
        <BottomNav active="mapa" />
      </PhoneFrame>
    </main>
  );
}

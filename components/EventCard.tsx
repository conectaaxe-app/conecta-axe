import { CalendarDays, Heart, MapPin, UsersRound } from 'lucide-react';

export function EventMiniCard({ title, time, imageClass = 'img-oxossi' }: { title: string; time: string; imageClass?: string }) {
  return (
    <article className="story-card">
      <div className={`story-img ${imageClass}`}></div>
      <strong>{title}</strong>
      <span>{time}</span>
    </article>
  );
}

export function EventListItem({ title, house, time, km, imageClass = 'img-oxossi' }: { title: string; house: string; time: string; km: string; imageClass?: string }) {
  return (
    <article className="event-list-item">
      <div className={`event-thumb ${imageClass}`}></div>
      <div>
        <strong>{title}</strong>
        <p>{house}</p>
        <span>{time} • {km}</span>
      </div>
      <span className="chevron">›</span>
    </article>
  );
}

export function MetricsRow() {
  return (
    <div className="metrics-row">
      <span><UsersRound size={17} />356 interessados</span>
      <span><Heart size={17} />189 vou</span>
    </div>
  );
}

export function DetailLine({ icon, children }: { icon: 'calendar' | 'pin' | 'map'; children: React.ReactNode }) {
  const Icon = icon === 'calendar' ? CalendarDays : MapPin;
  return <p className="detail-line"><Icon size={18} />{children}</p>;
}

import Link from "next/link";

export function EventStory({ title, time, color = "green" }: { title: string; time: string; color?: "green" | "blue" | "gold" }) {
  return (
    <Link href="/evento" className={`eventStory ${color}`}>
      <div className="eventPoster">
        <strong>{title.split(" ").slice(-1)[0]}</strong>
        <small>Festa de</small>
      </div>
      <b>{title}</b>
      <span>{time}</span>
    </Link>
  );
}

export function EventRow({ title, house, when, distance }: { title: string; house: string; when: string; distance: string }) {
  return (
    <Link href="/evento" className="eventRow">
      <div className="thumb"><strong>{title.split(" ").slice(-1)[0]}</strong></div>
      <div>
        <b>{title}</b>
        <span>{house}</span>
        <small>{when} • {distance}</small>
      </div>
      <i>›</i>
    </Link>
  );
}

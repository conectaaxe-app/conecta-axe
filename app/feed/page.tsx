import { BottomNav } from "@/components/BottomNav";
import { EventStory } from "@/components/EventCard";
import { PhoneShell } from "@/components/PhoneShell";
import { SmallHeader } from "@/components/Header";

export default function FeedPage() {
  return (
    <div className="appStage">
      <PhoneShell>
        <SmallHeader title="Conecta Axé" />
        <section className="content">
          <div className="heroCard">
            <b>Salvador, BA</b>
            <h1 style={{ margin: "10px 0 6px", fontSize: 28 }}>Hoje tem axé perto de você</h1>
            <p style={{ margin: 0 }}>Eventos oficiais, casas e comunidade no raio inicial de 10 km.</p>
          </div>

          <div className="sectionHeader">
            <h2>Hoje Tem</h2>
            <a>Ver todos</a>
          </div>

          <div className="storyScroller">
            <EventStory title="Festa de Oxóssi" time="Hoje • 20h" />
            <EventStory title="Festa de Ogum" time="Amanhã • 19h" color="blue" />
            <EventStory title="Toque de Caboclo" time="Sáb • 18h" color="gold" />
            <EventStory title="Festa de Iemanjá" time="Dom • 16h" color="blue" />
          </div>

          <div className="sectionHeader">
            <h2>Feed da comunidade</h2>
          </div>

          <article className="feedPost">
            <div className="postHead">
              <div className="avatar">A</div>
              <div>
                <b>Ilê Axé Odé Ofaguerangi</b>
                <span>compartilhou um evento • 2h</span>
              </div>
            </div>
            <p>É com muita alegria que convidamos todos para a nossa Festa de Oxóssi!</p>
            <div className="postImage">Oxóssi</div>
            <div>♥ 128 &nbsp;&nbsp; ◌ 24 &nbsp;&nbsp; ↗ Compartilhar</div>
          </article>
        </section>
        <BottomNav />
      </PhoneShell>
    </div>
  );
}

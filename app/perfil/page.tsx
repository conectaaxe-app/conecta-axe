import { BottomNav } from "@/components/BottomNav";
import { EventStory } from "@/components/EventCard";
import { PhoneShell } from "@/components/PhoneShell";
import { SmallHeader } from "@/components/Header";
import Link from "next/link";

export default function PerfilPage() {
  return (
    <div className="appStage">
      <PhoneShell>
        <SmallHeader title="Perfil" />
        <section className="content">
          <div className="profileCover" />
          <div className="profileCard">
            <div className="profilePhoto">J</div>
            <h1>João de Oxóssi</h1>
            <span>@joaodeoxossi</span>
            <p>Filho de santo, apaixonado pela cultura afro-religiosa. Compartilho vivências, fotos e eventos da comunidade.</p>

            <div className="stats">
              <div><b>128</b><span>Publicações</span></div>
              <div><b>842</b><span>Seguidores</span></div>
              <div><b>315</b><span>Seguindo</span></div>
              <div><b>18</b><span>Vou</span></div>
            </div>

            <div className="twoButtons">
              <button className="primaryButton">Seguir</button>
              <button className="secondaryButton">Mensagem</button>
            </div>

            <div className="notice">Este perfil é pessoal e não cria eventos oficiais. Acompanhe e participe dos eventos da comunidade.</div>

            <div className="cardBlock">
              <b>Casa que gerencia</b>
              <Link href="/casa" style={{ display: "block", marginTop: 10 }}>Ilê Axé Odé Ofaguerangi ›</Link>
            </div>

            <div className="sectionHeader">
              <h2>Próximos eventos</h2>
              <a>Ver todos</a>
            </div>
            <div className="storyScroller">
              <EventStory title="Festa de Oxóssi" time="Hoje • 20h" />
              <EventStory title="Toque de Ogum" time="Sáb • 19h" color="blue" />
              <EventStory title="Festa de Iemanjá" time="Dom • 16h" color="gold" />
            </div>
          </div>
        </section>
        <BottomNav />
      </PhoneShell>
    </div>
  );
}

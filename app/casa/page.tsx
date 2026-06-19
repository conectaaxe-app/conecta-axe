import { BottomNav } from "@/components/BottomNav";
import { EventRow } from "@/components/EventCard";
import { PhoneShell } from "@/components/PhoneShell";
import { SmallHeader } from "@/components/Header";

export default function CasaPage() {
  return (
    <div className="appStage">
      <PhoneShell>
        <SmallHeader title="Perfil da Casa" />
        <section className="content">
          <div className="profileCover" />
          <div className="profileCard">
            <div className="profilePhoto" style={{ background: "linear-gradient(135deg, var(--green), var(--sand))" }}>⌂</div>
            <h1>Ilê Axé Odé Ofaguerangi</h1>
            <span>@odeofaguerangi</span>
            <p>Casa de axé fundada na força de Oxóssi, guiada pelo respeito aos mais velhos, à natureza e à ancestralidade.</p>

            <div className="stats">
              <div><b>1.842</b><span>Seguidores</span></div>
              <div><b>34</b><span>Eventos</span></div>
              <div><b>2.316</b><span>Interessados</span></div>
              <div><b>623</b><span>Vou</span></div>
            </div>

            <div className="twoButtons">
              <button className="primaryButton">Seguir</button>
              <button className="secondaryButton">Como chegar</button>
            </div>

            <div className="twoButtons">
              <button className="primaryButton" style={{ background: "linear-gradient(180deg, var(--green), var(--green-dark))" }}>Criar evento</button>
              <button className="secondaryButton" style={{ color: "var(--green)", borderColor: "var(--green)" }}>Editar casa</button>
            </div>

            <div className="sectionHeader"><h2>Próximos eventos oficiais</h2><a>Ver todos</a></div>
            <EventRow title="Festa de Oxóssi" house="Ilê Axé Odé Ofaguerangi" when="Sáb, 15 de Junho • 20h" distance="356 interessados" />
            <EventRow title="Toque de Xangô" house="Ilê Axé Odé Ofaguerangi" when="Sáb, 29 de Junho • 19h" distance="278 interessados" />
            <EventRow title="Festa de Iemanjá" house="Ilê Axé Odé Ofaguerangi" when="Dom, 07 de Julho • 16h" distance="412 interessados" />
          </div>
        </section>
        <BottomNav />
      </PhoneShell>
    </div>
  );
}

import { BottomNav } from "@/components/BottomNav";
import { EventRow } from "@/components/EventCard";
import { PhoneShell } from "@/components/PhoneShell";
import { SmallHeader } from "@/components/Header";

export default function MapaPage() {
  return (
    <div className="appStage">
      <PhoneShell>
        <SmallHeader title="Mapa" />
        <section className="content">
          <div className="mapBox">
            <div className="searchPill">⌕ Buscar eventos, casas ou cidade</div>
            <div className="radius" />
            <div className="userDot" />
            <div className="marker event" style={{ left: "52%", top: "28%" }}><span>▣</span></div>
            <div className="marker event" style={{ left: "30%", top: "38%" }}><span>▣</span></div>
            <div className="marker event" style={{ left: "68%", top: "58%" }}><span>▣</span></div>
            <div className="marker house" style={{ left: "74%", top: "33%" }}><span>⌂</span></div>
            <div className="marker house" style={{ left: "39%", top: "63%" }}><span>⌂</span></div>
            <div className="marker house" style={{ left: "78%", top: "73%" }}><span>⌂</span></div>
          </div>

          <div className="sheet">
            <div className="sectionHeader" style={{ marginTop: 0 }}>
              <h2>Próximos perto de você</h2>
              <a>Ver todos</a>
            </div>
            <EventRow title="Festa de Oxóssi" house="Ilê Axé Odé Ofaguerangi" when="Hoje • 20h" distance="2,3 km" />
            <EventRow title="Toque de Ogum" house="Terreiro de Ogum Megê" when="Amanhã • 19h" distance="3,1 km" />
            <EventRow title="Festa de Iemanjá" house="Casa de Iemanjá" when="Dom • 16h" distance="4,8 km" />
          </div>
        </section>
        <BottomNav />
      </PhoneShell>
    </div>
  );
}

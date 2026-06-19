import { BottomNav } from "@/components/BottomNav";
import { PhoneShell } from "@/components/PhoneShell";
import { SmallHeader } from "@/components/Header";
import Link from "next/link";

export default function EventoPage() {
  return (
    <div className="appStage">
      <PhoneShell>
        <SmallHeader title="Evento" />
        <section className="content">
          <div className="eventHero">Festa de<br />Oxóssi</div>
          <div className="eventPanel">
            <div className="dateBox"><span>SÁB</span><strong>15</strong><span>JUN</span></div>
            <h1>Festa de Oxóssi</h1>
            <p style={{ margin: "6px 0 0" }}>Ilê Axé Odé Ofaguerangi 🔵</p>
            <p style={{ margin: "8px 0 0", color: "var(--green-dark)", fontWeight: 800 }}>Evento oficial da casa</p>

            <div className="metaLine">
              <span>◷ Sáb, 15 de Junho • 20h</span>
              <span>⌖ Rua das Flores, 123 — São Caetano, Salvador — BA</span>
              <span>◉ 2,3 km de você &nbsp;&nbsp; <b style={{ color: "var(--terracotta)" }}>Ver no mapa ›</b></span>
            </div>

            <p>Uma noite de fé, cantos, comida e celebração em honra a Oxóssi. Toda a comunidade é bem-vinda para vivenciar esse momento de axé, tradição e encontro.</p>

            <div className="actionStack">
              <button className="primaryButton">Quero ir</button>
              <button className="secondaryButton">Tenho interesse</button>
              <button className="secondaryButton" style={{ borderColor: "var(--line)", color: "var(--green)" }}>Compartilhar evento</button>
            </div>

            <div className="cardBlock">
              <b>Casa organizadora</b>
              <p>Ilê Axé Odé Ofaguerangi<br /><small>Casa de axé • Salvador, BA • 1.842 seguidores</small></p>
              <Link href="/casa" className="secondaryButton" style={{ display: "grid", placeItems: "center" }}>Ver perfil da casa</Link>
            </div>
          </div>
        </section>
        <BottomNav />
      </PhoneShell>
    </div>
  );
}

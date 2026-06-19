"use client";

import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { PhoneShell } from "@/components/PhoneShell";
import { SmallHeader } from "@/components/Header";
import Link from "next/link";

export default function EventoPage() {
  const [vou, setVou] = useState(false);
  const [interesse, setInteresse] = useState(false);

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
              <span>◉ 2,3 km de você &nbsp;&nbsp; <Link href="/mapa" style={{ color: "var(--terracotta)", fontWeight: 800 }}>Ver no mapa ›</Link></span>
            </div>

            <p>Uma noite de fé, cantos, comida e celebração em honra a Oxóssi. Toda a comunidade é bem-vinda para vivenciar esse momento de axé, tradição e encontro.</p>

            <div className="actionStack">
              <button className="primaryButton" type="button" onClick={() => setVou(!vou)}>
                {vou ? "Confirmado: eu vou" : "Quero ir"}
              </button>
              <button className="secondaryButton" type="button" onClick={() => setInteresse(!interesse)}>
                {interesse ? "Interesse marcado" : "Tenho interesse"}
              </button>
              <button className="secondaryButton" type="button" style={{ borderColor: "var(--line)", color: "var(--green)" }}>
                Compartilhar evento
              </button>
            </div>

            {vou && (
              <div className="notice">
                Lembrete ativado: você receberá uma notificação 3 horas antes do evento.
              </div>
            )}

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

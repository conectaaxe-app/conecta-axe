"use client";

import Link from "next/link";
import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { PhoneShell } from "@/components/PhoneShell";
import { SmallHeader } from "@/components/Header";

export default function CadastroPage() {
  const [cadastrarCasa, setCadastrarCasa] = useState(false);

  return (
    <div className="appStage">
      <PhoneShell>
        <SmallHeader title="Cadastro" />

        <section className="formScreen">
          <div className="stepPill">Etapa 1</div>
          <h1>Criar conta</h1>
          <p>Todas as contas são públicas</p>

          <label className="formField">♙ <input placeholder="Nome completo" /></label>
          <label className="formField">@ <input placeholder="Nome de usuário" /></label>
          <label className="formField">✉ <input placeholder="E-mail" type="email" /></label>
          <label className="formField">▣ <input placeholder="Senha" type="password" /></label>
          <label className="formField">⌖ <input placeholder="Cidade" /></label>
          <label className="formField">✎ <input placeholder="Bio opcional" /></label>

          <label className="toggleLine">
            <span>Cadastrar minha casa de axé opcional</span>
            <input
              className="realCheckbox"
              type="checkbox"
              checked={cadastrarCasa}
              onChange={(e) => setCadastrarCasa(e.target.checked)}
            />
          </label>

          <label className="toggleLine">
            <span>Quero exibir minha filiação à casa de axé no perfil</span>
            <input className="realToggleInput" type="checkbox" defaultChecked />
            <span className="realToggle" />
          </label>

          <div className="notice">Seu perfil pessoal não cria eventos oficiais.</div>

          {!cadastrarCasa && (
            <Link href="/feed" className="linkButton">
              Criar conta
            </Link>
          )}

          {cadastrarCasa && (
            <>
              <div className="stepPill" style={{ background: "var(--green)", marginTop: 30 }}>
                Etapa opcional
              </div>
              <h1>Cadastrar minha casa</h1>
              <p>Você será o gestor principal deste perfil</p>

              <label className="formField">⌂ <input placeholder="Nome da casa" /></label>
              <label className="formField">@ <input placeholder="@usuário da casa" /></label>
              <label className="formField">✎ <input placeholder="Descrição da casa" /></label>
              <label className="formField">⌖ <input placeholder="Endereço" /></label>
              <label className="formField"># <input placeholder="Número / Bairro" /></label>
              <label className="formField">▣ <input placeholder="Cidade / Estado / CEP" /></label>

              <div className="notice">
                Cada perfil pessoal só pode gerenciar 1 casa. A casa pode ter vários administradores.
              </div>

              <Link href="/casa" className="linkButton green">
                Cadastrar casa
              </Link>
            </>
          )}

          <div className="registerLine">
            Já tem conta? <Link href="/login">Entrar</Link>
          </div>
        </section>

        <BottomNav />
      </PhoneShell>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { LogoMark } from "@/components/LogoMark";
import { PhoneShell } from "@/components/PhoneShell";

export default function LoginPage() {
  const [tipo, setTipo] = useState<"pessoa" | "casa">("pessoa");

  return (
    <div className="appStage">
      <PhoneShell>
        <LogoMark size={58} />

        <section className="loginContent">
          <div className="progressLine" />

          <h1>Bem-vindo de volta!</h1>
          <p>Faça login para continuar</p>

          <div className="segment" aria-label="Tipo de acesso">
            <button
              type="button"
              className={tipo === "pessoa" ? "active" : ""}
              onClick={() => setTipo("pessoa")}
            >
              ♙ Pessoa
            </button>
            <button
              type="button"
              className={tipo === "casa" ? "active" : ""}
              onClick={() => setTipo("casa")}
            >
              ⌂ Casa de axé
            </button>
          </div>

          <label className="field">
            <span>✉</span>
            <input placeholder="E-mail ou usuário" type="email" />
          </label>

          <label className="field">
            <span>▣</span>
            <input placeholder="Senha" type="password" />
            <span>⌧</span>
          </label>

          <div className="loginOptions">
            <label className="checkbox">
              <input className="realCheckbox" type="checkbox" />
              Lembrar de mim
            </label>
            <Link href="#">Esqueci minha senha</Link>
          </div>

          <Link href={tipo === "casa" ? "/casa" : "/feed"} className="linkButton">
            Entrar
          </Link>

          <div className="divider">ou continue com</div>

          <div className="socialButtons">
            <button className="socialButton" type="button">G</button>
            <button className="socialButton" type="button"></button>
            <button className="socialButton" type="button">f</button>
          </div>

          <div className="registerLine">
            Não tem conta? <Link href="/cadastro">Cadastre-se</Link>
          </div>
        </section>
      </PhoneShell>
    </div>
  );
}

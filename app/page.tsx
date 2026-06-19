import Link from "next/link";
import { BrandHeader } from "@/components/Header";
import { PhoneShell } from "@/components/PhoneShell";

export default function Home() {
  return (
    <div className="appStage">
      <PhoneShell>
        <BrandHeader />

        <div className="accessQuestion">Como você quer entrar?</div>

        <section className="accessCards">
          <Link href="/login?tipo=pessoa" className="accessCard">
            <div className="accessIcon">♙</div>
            <div>
              <h2>Sou uma pessoa</h2>
              <p>Entre para descobrir eventos, casas, comunidades e se conectar com a rede.</p>
            </div>
            <span className="arrow">›</span>
          </Link>

          <Link href="/login?tipo=casa" className="accessCard house">
            <div className="accessIcon">⌂</div>
            <div>
              <h2>Sou uma casa de axé</h2>
              <p>Acesse como gestor da casa para criar eventos, gerenciar informações e sua equipe.</p>
            </div>
            <span className="arrow">›</span>
          </Link>
        </section>

        <div className="authFooter">
          Ainda não tem conta? <Link href="/cadastro">Cadastre-se</Link>
        </div>

        <div className="brandWords">
          <span>DESCUBRA</span>
          <span>CONECTE-SE</span>
          <span>FORTALEÇA</span>
          <span>PRESERVE</span>
        </div>
      </PhoneShell>
    </div>
  );
}

import { BottomNav } from "@/components/BottomNav";
import { PhoneShell } from "@/components/PhoneShell";
import { SmallHeader } from "@/components/Header";

export default function CadastroPage() {
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
          <label className="formField">✉ <input placeholder="E-mail" /></label>
          <label className="formField">▣ <input placeholder="Senha" type="password" /></label>
          <label className="formField">⌖ <input placeholder="Cidade" /></label>
          <label className="formField">✎ <input placeholder="Bio opcional" /></label>

          <div className="toggleLine">
            <span>Cadastrar minha casa de axé opcional</span>
            <span className="fakeCheck"></span>
          </div>

          <div className="toggleLine">
            <span>Quero exibir minha filiação à casa de axé no perfil</span>
            <span className="toggle"></span>
          </div>

          <div className="notice">Seu perfil pessoal não cria eventos oficiais.</div>
          <button className="primaryButton">Criar conta</button>

          <div className="stepPill" style={{ background: "var(--green)", marginTop: 30 }}>Etapa opcional</div>
          <h1>Cadastrar minha casa</h1>
          <p>Você será o gestor principal deste perfil</p>
          <label className="formField">⌂ <input placeholder="Nome da casa" /></label>
          <label className="formField">@ <input placeholder="@usuário da casa" /></label>
          <label className="formField">✎ <input placeholder="Descrição da casa" /></label>
          <label className="formField">⌖ <input placeholder="Endereço" /></label>
          <label className="formField"># <input placeholder="Número / Bairro" /></label>
          <label className="formField">▣ <input placeholder="Cidade / Estado / CEP" /></label>

          <div className="notice">Cada perfil pessoal só pode gerenciar 1 casa. A casa pode ter vários administradores.</div>
          <button className="primaryButton" style={{ background: "linear-gradient(180deg, var(--green), var(--green-dark))" }}>Cadastrar casa</button>
        </section>
        <BottomNav />
      </PhoneShell>
    </div>
  );
}

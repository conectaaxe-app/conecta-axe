import { BottomNav } from "@/components/BottomNav";
import { PhoneShell } from "@/components/PhoneShell";
import { SmallHeader } from "@/components/Header";

export default function AdminPage() {
  const items = [
    ["Usuários", "Perfis, bloqueios e reincidências"],
    ["Casas de Axé", "Gestores, administradores e agenda"],
    ["Eventos", "Eventos ativos, futuros e denunciados"],
    ["Central de Denúncias", "Posts, comentários, perfis e fotos"],
    ["Regras de Moderação", "Palavras, níveis e ações automáticas"],
    ["Destaques Internos", "Conteúdo estratégico rotativo"]
  ];

  return (
    <div className="appStage">
      <PhoneShell>
        <SmallHeader title="Admin" />
        <section className="content">
          <div className="heroCard">
            <b>Administrador Master</b>
            <h1 style={{ margin: "10px 0 6px", fontSize: 28 }}>Painel do Conecta Axé</h1>
            <p style={{ margin: 0 }}>Controle da plataforma, moderação e estrutura.</p>
          </div>
          <div className="adminGrid">
            {items.map(([title, desc]) => (
              <div className="adminCard" key={title}>
                <div><b>{title}</b><span>{desc}</span></div>
                <span>›</span>
              </div>
            ))}
          </div>
        </section>
        <BottomNav />
      </PhoneShell>
    </div>
  );
}

import { ArrowLeft, AtSign, Building2, Camera, Home, Lock, Mail, MapPin, UserRound } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { PhoneFrame } from '@/components/PhoneFrame';

export default function CadastroPage() {
  return (
    <main className="app-shell">
      <PhoneFrame>
        <div className="app-scroll form-screen">
          <header className="app-top"><ArrowLeft size={24} /><strong>Cadastro</strong><span></span></header>
          <span style={{ display: 'block', margin: '0 auto 8px', width: '86px', textAlign: 'center', borderRadius: 999, background: '#C23D2A', color: 'white', padding: '5px 10px', fontSize: 12, fontWeight: 800 }}>Etapa 1</span>
          <h2>Criar conta</h2>
          <p className="sub">Todas as contas são públicas</p>
          <div style={{ display: 'grid', placeItems: 'center', marginBottom: 18 }}><div className="profile-photo" style={{ width: 88, height: 88, margin: 0 }}><UserRound size={44} /></div><span style={{ fontSize: 13, marginTop: 6 }}>Adicionar foto</span></div>
          <div className="form-field"><UserRound size={17} />Nome completo</div>
          <div className="form-field"><AtSign size={17} />Nome de usuário</div>
          <div className="form-field"><Mail size={17} />E-mail</div>
          <div className="form-field"><Lock size={17} />Senha</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}><div className="form-field"><MapPin size={17} />Cidade</div><div className="form-field">Estado</div></div>
          <div className="form-field" style={{ height: 70, alignItems: 'flex-start', paddingTop: 12 }}>Bio opcional</div>
          <div className="toggle-row"><span>Cadastrar minha casa de axé<br /><small>Se marcado, você seguirá para o cadastro da casa.</small></span><span className="fake-box"></span></div>
          <div className="toggle-row"><span>Quero exibir minha filiação à casa de axé no perfil</span><span className="toggle"></span></div>
          <div className="notice">Seu perfil pessoal não cria eventos oficiais.</div>
          <button className="primary-btn">Criar conta</button>
          <button className="outline-btn" style={{ marginTop: 10 }}>Já tenho conta</button>

          <div style={{ height: 28 }} />
          <span style={{ display: 'block', margin: '0 auto 8px', width: '130px', textAlign: 'center', borderRadius: 999, background: '#2F4E2D', color: 'white', padding: '5px 10px', fontSize: 12, fontWeight: 800 }}>Etapa opcional</span>
          <h2>Cadastrar minha casa</h2>
          <p className="sub">Você será o gestor principal deste perfil</p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}><div className="logo-small"><Building2 /></div><div className="hero-img img-caboclo" style={{ flex: 1, margin: 0, height: 82, borderRadius: 16, display: 'grid', placeItems: 'center', color: 'white' }}><Camera /></div></div>
          <div className="form-field"><Home size={17} />Nome da casa</div>
          <div className="form-field"><AtSign size={17} />@usuario da casa</div>
          <div className="form-field" style={{ height: 64 }}>Descrição da casa</div>
          <div className="form-field"><MapPin size={17} />Endereço</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}><div className="form-field">Número</div><div className="form-field">Bairro</div></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}><div className="form-field">Cidade</div><div className="form-field">Estado</div></div>
          <div className="form-field">CEP</div>
          <div className="notice"><strong>Administradores da casa</strong><br />Você será o criador. Outros perfis poderão ser adicionados como administradores.</div>
          <button className="green-btn">Cadastrar casa</button>
        </div>
        <BottomNav active="inicio" />
      </PhoneFrame>
    </main>
  );
}

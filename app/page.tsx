import Link from 'next/link';
import { Apple, Building2, Feather, Lock, Mail, ShieldCheck, UsersRound } from 'lucide-react';
import { Brand } from '@/components/Brand';
import { LogoMark } from '@/components/LogoMark';

export default function HomePage() {
  return (
    <main className="shell">
      <section className="login-board">
        <div className="phone-card">
          <div className="phone-status"><span>9:41</span><span>◔ ᯤ ▰</span></div>
          <div className="login-hero">
            <Brand />
            <h2 className="login-question">Como você quer entrar?</h2>
            <div className="choice-list">
              <Link className="choice-card" href="/feed">
                <div className="choice-icon"><UsersRound size={38} /></div>
                <div>
                  <h3>Sou uma pessoa</h3>
                  <p>Entre para descobrir eventos, casas, comunidades e se conectar com a rede.</p>
                </div>
                <span className="choice-arrow">›</span>
              </Link>
              <Link className="choice-card house" href="/casa">
                <div className="choice-icon"><Building2 size={40} /></div>
                <div>
                  <h3>Sou uma casa de axé</h3>
                  <p>Acesse como gestor da casa para criar eventos, gerenciar informações e sua equipe.</p>
                </div>
                <span className="choice-arrow">›</span>
              </Link>
            </div>
            <p className="login-footer">Ainda não tem conta? <Link href="/cadastro">Cadastre-se</Link></p>
          </div>
          <div className="brand-words">Descubra • Conecte-se • Fortaleça • Preserve</div>
        </div>

        <div className="phone-card form-card">
          <div className="phone-status"><span>9:41</span><span>◔ ᯤ ▰</span></div>
          <div className="back-row"><span className="back">‹</span><div className="step-logo"><LogoMark size={54} /></div></div>
          <div className="progress" />
          <div className="form-title">
            <h2>Bem-vindo de volta!</h2>
            <p>Faça login para continuar</p>
          </div>
          <div className="segmented">
            <button className="selected">Pessoa</button>
            <button>Casa de axé</button>
          </div>
          <div className="input-group">
            <div className="field"><Mail size={22} />E-mail ou usuário</div>
            <div className="field"><Lock size={22} />Senha <span style={{ marginLeft: 'auto' }}>◌</span></div>
          </div>
          <div className="login-options">
            <span className="checkbox"><span className="fake-box" /> Lembrar de mim</span>
            <span className="forgot">Esqueci minha senha</span>
          </div>
          <Link href="/feed"><button className="primary-btn">Entrar</button></Link>
          <div className="divider">ou continue com</div>
          <div className="social-login">
            <div className="social-btn google">G</div>
            <div className="social-btn apple"><Apple size={26} fill="currentColor" /></div>
            <div className="social-btn facebook"><span className="facebook-letter">f</span></div>
          </div>
          <p className="login-footer">Não tem conta? <Link href="/cadastro">Cadastre-se</Link></p>
        </div>

        <aside className="info-panel">
          <h2>Acesso separado</h2>
          <div className="gold-line">◆</div>
          <p>O Conecta Axé possui dois tipos de acesso, cada um com funcionalidades exclusivas e experiências personalizadas.</p>
          <div className="info-box">
            <div className="choice-icon"><UsersRound size={40} /></div>
            <div>
              <h3>Pessoas</h3>
              <ul>
                <li>Descobrir eventos próximos</li>
                <li>Explorar casas e comunidades</li>
                <li>Conectar-se com a rede</li>
                <li>Salvar favoritos e interagir</li>
              </ul>
            </div>
          </div>
          <div className="info-box house">
            <div className="choice-icon"><Building2 size={40} /></div>
            <div>
              <h3>Casas de Axé</h3>
              <ul>
                <li>Gerenciar perfil da casa</li>
                <li>Criar e divulgar eventos</li>
                <li>Gerenciar equipe e funções</li>
                <li>Acessar métricas e relatórios</li>
              </ul>
            </div>
          </div>
          <div className="resources">
            <h3>Recursos</h3>
            <div className="resource-grid">
              <div className="resource"><ShieldCheck size={34} /><strong>Seguro</strong>Seus dados protegidos</div>
              <div className="resource"><Lock size={34} color="#2F4E2D" /><strong>Privado</strong>Informações confidenciais</div>
              <div className="resource"><UsersRound size={34} color="#351F15" /><strong>Conectado</strong>Rede de axé em expansão</div>
              <div className="resource"><Feather size={34} color="#D4A23A" /><strong>Autêntico</strong>Feito para nossa comunidade</div>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

'use client';

import { useMemo, useState } from 'react';

const events = [
  {
    id: 1,
    title: 'Festa de Oxóssi',
    house: 'Ilê Axé Odé Ofaguerangi',
    when: 'Hoje • 20h',
    fullDate: 'Sáb, 15 de Junho • 20h',
    distance: '2,3 km',
    color: 'green',
    badge: 'Top 3 Hoje Tem',
    interested: 356,
    going: 189,
    description:
      'Uma noite de fé, cantos, comida e celebração em honra a Oxóssi. Toda a comunidade é bem-vinda para vivenciar esse momento de axé, tradição e encontro.',
  },
  {
    id: 2,
    title: 'Toque de Ogum',
    house: 'Terreiro de Ogum Megê',
    when: 'Amanhã • 19h',
    fullDate: 'Dom, 16 de Junho • 19h',
    distance: '3,1 km',
    color: 'blue',
    badge: 'Evento oficial',
    interested: 218,
    going: 103,
    description:
      'Toque aberto à comunidade com acolhimento, cantos e celebração da força de Ogum.',
  },
  {
    id: 3,
    title: 'Festa de Iemanjá',
    house: 'Casa de Iemanjá',
    when: 'Dom • 16h',
    fullDate: 'Dom, 07 de Julho • 16h',
    distance: '4,8 km',
    color: 'ocean',
    badge: 'Casa com evento futuro',
    interested: 412,
    going: 206,
    description:
      'Celebração pública em honra a Iemanjá, com encontro, música, comida e axé.',
  },
  {
    id: 4,
    title: 'Calendário de Julho',
    house: 'Ilê Axé Odé Ofaguerangi',
    when: 'Daqui a 30 dias',
    fullDate: 'Julho • 5 eventos cadastrados',
    distance: '2,3 km',
    color: 'gold',
    badge: 'Agenda da casa',
    interested: 96,
    going: 44,
    description:
      'Casa com calendário futuro já cadastrado. Acompanhe a agenda completa pelo perfil da casa.',
  },
];

const reports = [
  { id: 1, type: 'Comentário', reason: 'Ofensa ou assédio', status: 'Pendente' },
  { id: 2, type: 'Evento', reason: 'Evento falso', status: 'Em análise' },
  { id: 3, type: 'Perfil', reason: 'Perfil enganoso', status: 'Resolvido' },
];

const ruleChips = [
  'Mobile-first',
  'Perfis públicos',
  'Evento só pela casa',
  'GPS 10 km',
  'Moderação por denúncias',
  'Mercado Pago no final',
];

function Logo() {
  return (
    <div className="logoWrap" aria-label="Conecta Axé">
      <div className="logoMark">
        <span className="spark">✦</span>
        <span className="person personOne" />
        <span className="person personTwo" />
        <span className="person personThree" />
        <span className="root rootOne" />
        <span className="root rootTwo" />
      </div>
      <div>
        <strong>Conecta <em>Axé</em></strong>
        <small>macumbas, casas e pessoas perto de você</small>
      </div>
    </div>
  );
}

function AppShell({ active, setActive }) {
  const nav = [
    ['home', 'Início', '⌂'],
    ['map', 'Mapa', '⌖'],
    ['publish', 'Publicar', '+'],
    ['alerts', 'Notificações', '◌'],
    ['profile', 'Perfil', '◉'],
  ];
  return (
    <nav className="bottomNav" aria-label="Navegação principal">
      {nav.map(([key, label, icon]) => (
        <button
          key={key}
          onClick={() => setActive(key === 'publish' ? 'home' : key)}
          className={active === key || (key === 'profile' && active === 'user') ? 'active' : ''}
        >
          <span className={key === 'publish' ? 'plusIcon' : ''}>{icon}</span>
          <small>{label}</small>
        </button>
      ))}
    </nav>
  );
}

function Phone({ children, active, setActive, title = 'Conecta Axé' }) {
  return (
    <section className="phone">
      <div className="status"><span>9:41</span><span>●●●  5G  ▰</span></div>
      <header className="phoneHeader">
        <button className="ghostBtn">‹</button>
        <strong>{title}</strong>
        <button className="ghostBtn">⋯</button>
      </header>
      <main className="phoneContent">{children}</main>
      <AppShell active={active} setActive={setActive} />
    </section>
  );
}

function EventPoster({ event, compact = false }) {
  return (
    <div className={`eventPoster ${event.color} ${compact ? 'compact' : ''}`}>
      <span className="posterBadge">{event.badge}</span>
      <b>{event.title.split(' de ')[0]} de</b>
      <strong>{event.title.split(' de ')[1] || event.title}</strong>
      <small>{event.when}</small>
    </div>
  );
}

function HomeScreen({ setActive, setSelectedEvent }) {
  return (
    <>
      <section className="heroCard">
        <Logo />
        <div className="locationPill">📍 Salvador, BA • GPS ativo</div>
      </section>

      <section className="todayHeader">
        <h2>Hoje Tem</h2>
        <button onClick={() => setActive('map')}>Ver mapa</button>
      </section>

      <div className="storiesRow">
        {events.slice(0, 4).map((event) => (
          <button
            className="storyCard"
            key={event.id}
            onClick={() => {
              setSelectedEvent(event);
              setActive('event');
            }}
          >
            <EventPoster event={event} compact />
            <strong>{event.title}</strong>
            <small>{event.when}</small>
          </button>
        ))}
      </div>

      <section className="suggestionCard founderBoost">
        <span className="tinyLabel">Destaque interno rotativo</span>
        <h3>Conheça a casa fundadora</h3>
        <p>Eventos, publicações e novidades do Ilê Axé Odé Ofaguerangi.</p>
        <div className="actionRow">
          <button onClick={() => setActive('house')}>Ver casa</button>
          <button className="outline">Dispensar</button>
        </div>
      </section>

      <section className="feedCard">
        <div className="feedHeader">
          <span className="avatar">J</span>
          <div>
            <b>João de Oxóssi</b>
            <small>Filiado ao Ilê Axé Odé Ofaguerangi</small>
          </div>
        </div>
        <p>Estarei nessa festa. Quem mais vai? 🌿</p>
        <button
          className="eventPreview"
          onClick={() => {
            setSelectedEvent(events[0]);
            setActive('event');
          }}
        >
          <EventPoster event={events[0]} compact />
          <div>
            <strong>Festa de Oxóssi</strong>
            <small>Hoje • 20h • 2,3 km</small>
          </div>
        </button>
        <div className="socialActions"><span>♡ 42</span><span>💬 8</span><span>↗ Compartilhar</span></div>
      </section>
    </>
  );
}

function MapScreen({ setActive, setSelectedEvent }) {
  return (
    <>
      <div className="searchBox">🔎 Buscar eventos, casas ou cidade <button>Filtros</button></div>
      <section className="mapMock">
        <span className="mapLabel labelOne">Brotas</span>
        <span className="mapLabel labelTwo">Rio Vermelho</span>
        <span className="mapLabel labelThree">Pituba</span>
        <span className="mapLabel labelFour">Barra</span>
        <div className="gpsRadius"><span>Você</span></div>
        <button className="pin eventPin pinOne" onClick={() => { setSelectedEvent(events[0]); setActive('event'); }}>📅</button>
        <button className="pin casaPin pinTwo" onClick={() => setActive('house')}>⌂</button>
        <button className="pin eventPin pinThree" onClick={() => { setSelectedEvent(events[1]); setActive('event'); }}>📅</button>
        <button className="pin futurePin pinFour" onClick={() => { setSelectedEvent(events[3]); setActive('event'); }}>◆</button>
        <button className="pin casaPin pinFive" onClick={() => setActive('house')}>⌂</button>
        <div className="mapLegend"><span><i className="redDot"/>Eventos</span><span><i className="greenDot"/>Casas</span><span><i className="blueDot"/>Raio 10 km</span></div>
      </section>
      <section className="bottomSheet">
        <div className="sheetHandle" />
        <div className="sectionTitle"><h3>Próximos perto de você</h3><button>Ver todos</button></div>
        {events.slice(0, 3).map((event) => (
          <button className="listEvent" key={event.id} onClick={() => { setSelectedEvent(event); setActive('event'); }}>
            <EventPoster event={event} compact />
            <div>
              <strong>{event.title}</strong>
              <small>{event.house}</small>
              <small>{event.when} • {event.distance}</small>
            </div>
            <span>›</span>
          </button>
        ))}
      </section>
    </>
  );
}

function EventScreen({ event, setActive }) {
  const selected = event || events[0];
  return (
    <>
      <EventPoster event={selected} />
      <section className="detailCard">
        <span className="tinyLabel">Evento oficial da casa</span>
        <h1>{selected.title}</h1>
        <button className="linkBtn" onClick={() => setActive('house')}>🌿 {selected.house} ✓</button>
        <div className="detailGrid">
          <span>📅 {selected.fullDate}</span>
          <span>📍 {selected.distance} de você</span>
          <span>🏠 Rua das Flores, 123</span>
          <button onClick={() => setActive('map')}>Ver no mapa</button>
        </div>
        <p>{selected.description}</p>
        <div className="ctaStack">
          <button className="primary">Quero ir</button>
          <button className="outline">Tenho interesse</button>
          <button className="soft">Compartilhar evento</button>
        </div>
        <div className="counterRow"><span>{selected.interested} interessados</span><span>{selected.going} vou</span></div>
        <div className="noticeBox">🔔 Quem marcar “Quero ir” recebe lembrete 3 horas antes do evento.</div>
      </section>
      <section className="organizerCard">
        <span className="avatar houseAvatar">IA</span>
        <div>
          <b>{selected.house}</b>
          <small>Casa de Axé • Salvador, BA</small>
        </div>
        <button onClick={() => setActive('house')}>Ver casa</button>
      </section>
    </>
  );
}

function UserProfile({ setActive }) {
  return (
    <>
      <section className="cover userCover"><span className="avatar bigAvatar">J</span></section>
      <section className="profileCard">
        <h1>João de Oxóssi</h1>
        <small>@joaodeoxossi • Salvador, BA • 2,3 km de você</small>
        <div className="badge">🌿 Filiado ao Ilê Axé Odé Ofaguerangi</div>
        <p>Filho de santo, apaixonado pela cultura afro-religiosa. Compartilho vivências, fotos e eventos da comunidade.</p>
        <div className="stats"><span><b>128</b>Publicações</span><span><b>842</b>Seguidores</span><span><b>18</b>Vou</span></div>
        <div className="socialLinks"><span>Instagram</span><span>TikTok</span><span>YouTube</span></div>
        <div className="actionRow"><button>Seguir</button><button className="outline">Mensagem</button><button className="danger">Bloquear</button></div>
      </section>
      <section className="noticeBox">Este perfil é pessoal e não cria eventos oficiais.</section>
      <section className="houseManageCard" onClick={() => setActive('house')}>
        <span className="avatar houseAvatar">IA</span>
        <div><b>Casa que gerencia</b><small>Ilê Axé Odé Ofaguerangi</small></div><span>›</span>
      </section>
      <section className="feedCard"><h3>Publicações</h3><p>Estarei na Festa de Oxóssi. Quem mais vai? 🌿</p><div className="socialActions"><span>♡ 42</span><span>💬 8</span><span>↗</span></div></section>
    </>
  );
}

function HouseProfile({ setActive, setSelectedEvent }) {
  return (
    <>
      <section className="cover houseCover"><span className="avatar bigAvatar houseAvatar">IA</span></section>
      <section className="profileCard">
        <span className="tinyLabel">Perfil de Casa de Axé</span>
        <h1>Ilê Axé Odé Ofaguerangi</h1>
        <small>@odeofaguerangi • Salvador, BA • 2,3 km de você</small>
        <p>Casa de axé fundada na força de Oxóssi, guiada pelo respeito aos mais velhos, à natureza e à ancestralidade.</p>
        <div className="stats"><span><b>1.842</b>Seguidores</span><span><b>34</b>Eventos</span><span><b>623</b>Vou</span></div>
        <div className="socialLinks"><span>Instagram</span><span>WhatsApp</span><span>YouTube</span></div>
        <div className="actionRow"><button>Seguir</button><button className="outline">Como chegar</button></div>
      </section>
      <section className="managerBox">
        <h3>Gerenciar Casa</h3>
        <p>Cada perfil pessoal só pode gerenciar 1 casa. Esta casa pode ter vários administradores.</p>
        <div className="actionRow"><button onClick={() => setActive('createEvent')}>Criar evento</button><button className="outline">Editar casa</button></div>
      </section>
      <section className="bottomSheet inFlow">
        <div className="sectionTitle"><h3>Agenda da Casa</h3><button>Calendário completo</button></div>
        {events.map((event) => (
          <button className="listEvent" key={event.id} onClick={() => { setSelectedEvent(event); setActive('event'); }}>
            <EventPoster event={event} compact />
            <div><strong>{event.title}</strong><small>{event.fullDate}</small><small>{event.interested} interessados • {event.going} vou</small></div><span>›</span>
          </button>
        ))}
      </section>
    </>
  );
}

function SignupScreen() {
  const [wantsHouse, setWantsHouse] = useState(false);
  return (
    <>
      <section className="signupCard">
        <span className="tinyLabel">Etapa 1</span>
        <h1>Criar conta</h1>
        <p>Todas as contas são públicas.</p>
        <div className="avatarUpload">＋ Adicionar foto</div>
        {['Nome completo', 'Nome de usuário', 'E-mail', 'Senha', 'Cidade', 'Estado', 'Bio opcional'].map((field) => <label key={field}>{field}<input placeholder={field}/></label>)}
        <label className="checkRow"><input type="checkbox" checked={wantsHouse} onChange={(e) => setWantsHouse(e.target.checked)} /> Cadastrar minha casa de axé</label>
        <label className="checkRow"><input type="checkbox" defaultChecked /> Exibir minha filiação no perfil</label>
        <div className="noticeBox">Seu perfil pessoal não cria eventos oficiais.</div>
        <button className="primary">Criar conta</button>
      </section>
      {wantsHouse && <section className="signupCard houseStep"><span className="tinyLabel">Etapa opcional</span><h2>Cadastrar minha casa</h2><p>Você será o gestor principal deste perfil.</p>{['Nome da casa', '@usuario da casa', 'Descrição da casa', 'Endereço', 'Bairro', 'Cidade', 'Estado', 'CEP'].map((field) => <label key={field}>{field}<input placeholder={field}/></label>)}<button>Cadastrar casa</button></section>}
    </>
  );
}

function AdminScreen() {
  return (
    <>
      <section className="adminHero"><h1>Painel Admin</h1><p>Moderação, métricas, usuários, casas, eventos e destaques internos.</p></section>
      <div className="adminGrid">
        <article><b>Usuários</b><strong>1.284</strong></article>
        <article><b>Casas</b><strong>86</strong></article>
        <article><b>Eventos ativos</b><strong>214</strong></article>
        <article><b>Denúncias</b><strong>12</strong></article>
      </div>
      <section className="bottomSheet inFlow">
        <div className="sectionTitle"><h3>Central de Denúncias</h3><button>Ver todas</button></div>
        {reports.map((r) => <div className="reportRow" key={r.id}><span>{r.type}</span><b>{r.reason}</b><small>{r.status}</small></div>)}
      </section>
      <section className="managerBox"><h3>Destaques Internos</h3><p>Controle Top 3 do Hoje Tem e sugestões rotativas a cada 2 acessos.</p><button>Configurar destaques</button></section>
    </>
  );
}

function CreateEventScreen() {
  return (
    <section className="signupCard">
      <span className="tinyLabel">Perfil da casa</span>
      <h1>Criar evento oficial</h1>
      <p>Eventos só podem ser criados pelo perfil da casa de axé.</p>
      {['Nome do evento', 'Data', 'Horário', 'Endereço', 'Descrição'].map((field) => <label key={field}>{field}<input placeholder={field}/></label>)}
      <div className="avatarUpload">＋ Adicionar folder do evento</div>
      <div className="noticeBox">A casa pode cadastrar vários eventos futuros, inclusive calendário anual.</div>
      <button className="primary">Publicar evento</button>
    </section>
  );
}

export default function Page() {
  const [active, setActive] = useState('home');
  const [selectedEvent, setSelectedEvent] = useState(events[0]);

  const screen = useMemo(() => {
    const props = { setActive, selectedEvent, setSelectedEvent };
    if (active === 'home') return <HomeScreen {...props} />;
    if (active === 'map') return <MapScreen {...props} />;
    if (active === 'event') return <EventScreen event={selectedEvent} setActive={setActive} />;
    if (active === 'user' || active === 'profile') return <UserProfile setActive={setActive} />;
    if (active === 'house') return <HouseProfile {...props} />;
    if (active === 'signup') return <SignupScreen />;
    if (active === 'admin') return <AdminScreen />;
    if (active === 'createEvent') return <CreateEventScreen />;
    return <HomeScreen {...props} />;
  }, [active, selectedEvent]);

  return (
    <div className="page">
      <aside className="leftPanel">
        <Logo />
        <h1>Preview inicial do MVP</h1>
        <p>Primeira versão visual para subir na Vercel e testar a navegação mobile-first. Financeiro fica para a etapa final.</p>
        <div className="chipWrap">{ruleChips.map((chip) => <span key={chip}>{chip}</span>)}</div>
        <div className="sideActions">
          <button onClick={() => setActive('home')}>Home</button>
          <button onClick={() => setActive('map')}>Mapa</button>
          <button onClick={() => { setSelectedEvent(events[0]); setActive('event'); }}>Evento</button>
          <button onClick={() => setActive('user')}>Perfil usuário</button>
          <button onClick={() => setActive('house')}>Perfil casa</button>
          <button onClick={() => setActive('signup')}>Cadastro</button>
          <button onClick={() => setActive('admin')}>Admin</button>
        </div>
        <div className="ruleBox">
          <b>Regras respeitadas nesta versão:</b>
          <ul>
            <li>Usuário comum não cria evento oficial.</li>
            <li>Casa pode cadastrar vários eventos futuros.</li>
            <li>Mapa mostra casas com eventos futuros.</li>
            <li>Perfis públicos e opção de bloquear usuário.</li>
            <li>Links sociais opcionais e controlados.</li>
          </ul>
        </div>
      </aside>
      <Phone active={active} setActive={setActive} title={active === 'map' ? 'Mapa' : active === 'event' ? 'Evento' : active === 'admin' ? 'Admin' : 'Conecta Axé'}>
        {screen}
      </Phone>
    </div>
  );
}

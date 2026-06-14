'use client';

import { useMemo, useState } from 'react';

const palette = [
  ['Terracota', '#C23D2A'],
  ['Terra', '#4B2E20'],
  ['Marfim', '#FBF7F2'],
  ['Areia', '#D4B26A'],
  ['Verde Folha', '#2E7D4A'],
];

const events = [
  { id: 1, title: 'Festa de Oxóssi', house: 'Ilê Axé Odé Ofaguerangi', date: 'Hoje • 20h', fullDate: 'Sáb, 15 de Junho • 20h', distance: '2,3 km', color: 'oxossi', interested: 356, going: 189, short: 'Oxóssi' },
  { id: 2, title: 'Festa de Ogum', house: 'Terreiro de Ogum Megê', date: 'Amanhã • 19h', fullDate: 'Dom, 16 de Junho • 19h', distance: '3,1 km', color: 'ogum', interested: 278, going: 142, short: 'Ogum' },
  { id: 3, title: 'Toque de Caboclo', house: 'Casa de Caboclo Sete Flechas', date: 'Sáb • 18h', fullDate: 'Sáb, 22 de Junho • 18h', distance: '4,8 km', color: 'caboclo', interested: 190, going: 83, short: 'Caboclo' },
  { id: 4, title: 'Festa de Iemanjá', house: 'Casa de Iemanjá', date: 'Dom • 16h', fullDate: 'Dom, 07 de Julho • 16h', distance: '4,8 km', color: 'iemanja', interested: 412, going: 206, short: 'Iemanjá' },
];

const futureEvents = [
  ...events,
  { id: 5, title: 'Toque de Xangô', house: 'Ilê Axé Odé Ofaguerangi', date: '29 Jun • 19h', fullDate: 'Sáb, 29 de Junho • 19h', distance: '2,3 km', color: 'xango', interested: 278, going: 142, short: 'Xangô' },
];

function Icon({ name }) {
  const common = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  const paths = {
    calendar: <><rect x="3" y="4" width="18" height="18" rx="3"/><path d="M8 2v4M16 2v4M3 10h18"/><path d="M8 14h3M14 14h2M8 18h3M14 18h2"/></>,
    map: <><path d="M9 18l-6 3V6l6-3 6 3 6-3v15l-6 3-6-3z"/><path d="M9 3v15M15 6v15"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9.5" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    house: <><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></>,
    pin: <><path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></>,
    home: <><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    user: <><circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/></>,
    heart: <><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></>,
    share: <><path d="M4 12v8h16v-8"/><path d="M12 16V3"/><path d="M7 8l5-5 5 5"/></>,
    comment: <><path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></>,
    info: <><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></>,
    edit: <><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></>,
    globe: <><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20"/><path d="M12 2a15 15 0 0 0 0 20"/></>,
    star: <><path d="M12 2l2.9 6 6.6.9-4.8 4.6 1.2 6.5-5.9-3.1-5.9 3.1 1.2-6.5-4.8-4.6 6.6-.9L12 2z"/></>,
    camera: <><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></>,
  };
  return <svg className="icon" {...common}>{paths[name]}</svg>;
}

function LogoMark({ mono = false, small = false }) {
  return (
    <div className={`logoMark ${mono ? 'mono' : ''} ${small ? 'small' : ''}`}>
      <svg viewBox="0 0 220 220" aria-label="Conecta Axé">
        <path className="ring" d="M44 84c25-48 108-55 139-5" />
        <circle className="dot dot1" cx="60" cy="86" r="15" />
        <circle className="dot dot2" cx="110" cy="58" r="17" />
        <circle className="dot dot3" cx="160" cy="86" r="15" />
        <path className="person p1" d="M34 151c18-32 31-52 56-48 15 3 24 16 27 33-20-13-38-10-52 8-9 12-18 17-31 7z" />
        <path className="person p2" d="M78 147c8-52 24-70 45-69 24 2 40 28 43 70-30-19-59-19-88-1z" />
        <path className="person p3" d="M186 151c-18-32-31-52-56-48-15 3-24 16-27 33 20-13 38-10 52 8 9 12 18 17 31 7z" />
        <path className="river" d="M110 105c-20 23-4 37-25 59 23-5 38-18 25-40 20 23 4 37 25 59-5-29 22-45-25-78z" />
        <path className="roots" d="M110 139v45M110 168c-11 8-22 13-37 15M110 168c12 10 24 15 39 18M110 184c-8 10-18 16-31 20M110 184c9 10 20 16 33 20M95 187c-2 10-8 18-18 25M125 187c2 10 8 18 18 25" />
        <path className="star" d="M110 14l5 16 16 5-16 5-5 16-5-16-16-5 16-5 5-16z" />
      </svg>
    </div>
  );
}

function BrandLogo({ compact = false }) {
  return (
    <div className={`brandLogo ${compact ? 'compact' : ''}`}>
      <LogoMark small={compact} />
      <div className="brandText">
        <strong>Conecta<br/>Axé</strong>
        {!compact && <span>O app para descobrir macumbas,<br/>casas e pessoas perto de você.</span>}
      </div>
    </div>
  );
}

function Phone({ title, children, active = 'Início', className = '' }) {
  const nav = [
    ['Início', 'home'], ['Mapa', 'pin'], ['Publicar', 'plus'], ['Notificações', 'bell'], ['Perfil', 'user'],
  ];
  return (
    <div className={`phone ${className}`}>
      <div className="phoneStatus"><span>9:41</span><span>▮▮▮  Wi‑Fi  ▰</span></div>
      <div className="phoneBar"><button>‹</button><b>{title}</b><button>•••</button></div>
      <div className="phoneBody">{children}</div>
      <nav className="bottomNav">
        {nav.map(([label, icon]) => (
          <div key={label} className={`navItem ${active === label ? 'active' : ''} ${label === 'Publicar' ? 'publish' : ''}`}>
            <span><Icon name={icon} /></span><small>{label}</small>
          </div>
        ))}
      </nav>
    </div>
  );
}

function EventArt({ event, tall = false }) {
  return (
    <div className={`eventArt ${event.color} ${tall ? 'tall' : ''}`}>
      <span className="foliage" />
      <b>{event.title.includes('Toque') ? 'Toque de' : 'Festa de'}</b>
      <strong>{event.short}</strong>
      {!tall && <small>{event.date}</small>}
      {tall && <small>15 DE JUNHO • SÁBADO • 20H<br/>ILÊ AXÉ ODÉ OFAGUERANGI</small>}
    </div>
  );
}

function StoryCard({ event }) {
  return (
    <div className="storyCard">
      <EventArt event={event} />
      <b>{event.title}</b>
      <small>{event.date}</small>
    </div>
  );
}

function HomeScreen() {
  return (
    <Phone title="Conecta Axé" active="Início" className="homePhone">
      <div className="miniTop"><span><Icon name="pin"/> Salvador, BA</span><Icon name="bell"/></div>
      <div className="sectionLine"><b>HOJE TEM</b><button>Ver todos</button></div>
      <div className="stories">{events.map(e => <StoryCard key={e.id} event={e} />)}</div>
      <div className="feedTitle">FEED DA COMUNIDADE</div>
      <div className="postCard">
        <div className="postHeader"><div className="avatar casa">IA</div><div><b>Ilê Axé Odé Ofaguerangi</b><small>2h compartilhou um evento</small></div><button>•••</button></div>
        <p>É com muita alegria que convidamos todos para a nossa Festa de Oxóssi!</p>
        <EventArt event={events[0]} tall />
        <div className="postActions"><span>❤ 128</span><span>💬 24</span><span>↗ Compartilhar</span></div>
      </div>
    </Phone>
  );
}

function MapScreen() {
  return (
    <Phone title="Mapa" active="Mapa" className="mapPhone">
      <div className="mapSearch"><Icon name="map"/> Buscar eventos, casas ou cidade <button>☰</button></div>
      <div className="cityPill">Salvador, BA⌄</div>
      <div className="mapCanvas">
        <span className="neigh n1">Brotas</span><span className="neigh n2">Rio Vermelho</span><span className="neigh n3">Pituba</span><span className="neigh n4">Graça</span><span className="neigh n5">Barra</span><span className="neigh n6">Itapuã</span>
        <div className="radius"><span /></div>
        <Marker type="event" className="m1" big /><Marker type="event" className="m2"/><Marker type="event" className="m3"/><Marker type="event" className="m4"/><Marker type="house" className="m5"/><Marker type="house" className="m6"/><Marker type="house" className="m7"/><Marker type="house" className="m8"/><Marker type="future" className="m9"/>
        <button className="locate">⌖</button>
        <div className="legend"><span><i className="red"/>Eventos</span><span><i className="green"/>Casas</span><span><i className="blue"/>Raio inicial 10 km</span></div>
      </div>
      <div className="sheet"><div className="handle"/><div className="sectionLine"><b>Próximos perto de você</b><button>Ver todos</button></div>{events.slice(0,3).map(e => <EventList key={e.id} event={e}/>)}</div>
    </Phone>
  );
}

function Marker({ type, className, big = false }) {
  const icon = type === 'house' ? 'house' : 'calendar';
  return <div className={`marker ${type} ${big ? 'big' : ''} ${className}`}><Icon name={icon}/></div>;
}

function EventList({ event }) {
  return (
    <div className="eventList">
      <EventArt event={event} />
      <div><b>{event.title}</b><small>{event.house}</small><small>{event.date} • {event.distance}</small></div>
      <span>›</span>
    </div>
  );
}

function EventScreen() {
  return (
    <Phone title="Evento" active="Mapa" className="eventPhone">
      <div className="coverEvent"><EventArt event={events[0]} tall /></div>
      <div className="eventPanel">
        <div className="dateBadge"><span>SÁB</span><b>15</b><span>JUN</span></div>
        <div className="eventIntro"><h2>Festa de Oxóssi</h2><p>Ilê Axé Odé Ofaguerangi <span className="verify">✓</span></p><small><Icon name="shield"/> Evento oficial da casa</small></div>
        <div className="detailRows"><span><Icon name="calendar"/> Sáb, 15 de Junho • 20h</span><span><Icon name="pin"/> Rua das Flores, 123 – São Caetano, Salvador – BA</span><span><Icon name="map"/> 2,3 km de você <b>Ver no mapa ›</b></span></div>
        <p>Uma noite de fé, cantos, comida e celebração em honra a Oxóssi. Toda a comunidade é bem-vinda para vivenciar esse momento de axé, tradição e encontro.</p>
        <button className="primary">Quero ir</button><button className="outline">Tenho interesse</button><button className="soft"><Icon name="share"/> Compartilhar evento</button>
        <div className="numbers"><span><Icon name="users"/>356 interessados</span><span><Icon name="users"/>189 vou</span></div>
        <h3>Casa organizadora</h3><div className="organizer"><div className="houseSeal">IA</div><div><b>Ilê Axé Odé Ofaguerangi <span className="verify">✓</span></b><small>Casa de axé • Salvador, BA<br/>1.842 seguidores</small></div><button>Ver perfil da casa</button></div>
        <h3>Mais informações</h3><div className="moreRows"><span><Icon name="globe"/>Evento público ›</span><span><Icon name="pin"/>Como chegar ›</span><span><Icon name="calendar"/>Adicionar à agenda ›</span></div>
      </div>
    </Phone>
  );
}

function HouseScreen() {
  return (
    <Phone title="Perfil da Casa" active="Perfil" className="housePhone">
      <div className="altarCover" />
      <div className="profilePanel housePanel">
        <div className="houseLogo">ILÊ<br/>AXÉ</div>
        <h2>Ilê Axé Odé Ofaguerangi</h2><span className="handle">@odeofaguerangi</span>
        <p><Icon name="pin"/> Salvador, BA • 2,3 km de você</p><small>Rua das Flores, 123 – São Caetano, Salvador – BA</small>
        <p>Casa de axé fundada na força de Oxóssi, guiada pelo respeito aos mais velhos, à natureza e à ancestralidade. Axé, acolhimento e tradição que transformam vidas.</p>
        <Stats items={[['1.842','Seguidores'], ['34','Eventos'], ['2.316','Interessados'], ['623','Vou']]} />
        <div className="twoButtons"><button className="primary">Seguir</button><button className="outline"><Icon name="pin"/>Como chegar</button></div>
        <div className="manageTitle">Gerenciar Casa</div><div className="twoButtons"><button className="greenBtn"><Icon name="calendar"/>Criar evento</button><button className="outline"><Icon name="edit"/>Editar casa</button></div>
        <Tabs active="Eventos" labels={['Eventos','Publicações','Sobre']} />
        <div className="sectionLine"><b>PRÓXIMOS EVENTOS OFICIAIS</b><button>Ver todos</button></div>
        {futureEvents.slice(0,3).map(e => <EventList key={e.id} event={e}/>) }
      </div>
    </Phone>
  );
}

function UserScreen() {
  return (
    <Phone title="Perfil" active="Perfil" className="userPhone">
      <div className="altarCover" />
      <div className="profilePanel">
        <div className="userPhoto" />
        <h2>João de Oxóssi</h2><span className="handle">@joaodeoxossi</span>
        <p><Icon name="pin"/> Salvador, BA • 2,3 km de você</p>
        <p>Filho de santo, apaixonado pela cultura afro-religiosa. Compartilho vivências, fotos e eventos da comunidade.</p>
        <div className="badgeLine">🌿 Filiado ao Ilê Axé Odé Ofaguerangi</div>
        <Stats items={[['128','Publicações'], ['842','Seguidores'], ['315','Seguindo'], ['18','Vou']]} />
        <div className="twoButtons"><button className="primary">Seguir</button><button className="outline">Mensagem</button></div>
        <div className="notice"><Icon name="info"/> Este perfil é pessoal e não cria eventos oficiais.</div>
        <h3>Casas que gerencia</h3><div className="miniHouse"><div className="houseSeal">IA</div><div><b>Ilê Axé Odé Ofaguerangi</b><small>Casa de axé • Salvador, BA</small></div><span>›</span></div>
        <div className="sectionLine"><b>Próximos eventos</b><button>Ver todos</button></div>
        <div className="smallEvents">{events.slice(0,3).map(e => <StoryCard key={e.id} event={e}/>)}</div>
        <Tabs active="Publicações" labels={['Publicações','Agenda','Curtidos']} />
        <div className="postCard compactPost"><div className="postHeader"><div className="avatar user">J</div><div><b>João de Oxóssi compartilhou um evento</b><small>15 de junho</small></div></div><p>Estarei nessa festa. Quem mais vai? 🌿🏹</p><EventList event={events[0]}/><div className="postActions"><span>♡ 42</span><span>💬 8</span><span>↗ Compartilhar</span></div></div>
      </div>
    </Phone>
  );
}

function SignupScreen() {
  return (
    <section className="signupBoard boardCard">
      <BoardTitle title="Cadastro de Pessoas e Casas" subtitle="Como entra na rede e como cadastra uma casa de axé" />
      <div className="twoPhones">
        <div className="signupPhoneMini"><Phone title="" active=""><SignupForm /></Phone></div>
        <div className="signupPhoneMini"><Phone title="" active=""><HouseForm /></Phone></div>
      </div>
      <div className="ruleCards"><RuleCard icon="users" title="Perfis públicos" text="Todos os perfis da rede são públicos."/><RuleCard icon="house" title="Gestão da casa" text="Cada perfil pode gerenciar 1 casa. A casa pode ter vários administradores."/><RuleCard icon="calendar" title="Cadastro flexível" text="A casa pode ser cadastrada na criação da conta ou depois, pelo perfil."/></div>
    </section>
  );
}

function SignupForm() {
  return <div className="formScreen"><span className="step terracotta">Etapa 1</span><h2>Criar conta</h2><small>Todas as contas são públicas</small><div className="uploadAvatar"><Icon name="user"/><em><Icon name="camera"/></em></div><small>Adicionar foto</small>{['Nome completo','Nome de usuário','E-mail','Senha'].map(x => <div className="input" key={x}>{x}</div>)}<div className="inputGrid"><div className="input">Cidade⌄</div><div className="input">Estado⌄</div></div><div className="input bio">Bio (opcional)<span>0/160</span></div><label className="check"><input type="checkbox"/> Cadastrar minha casa de axé (opcional)</label><p className="hint"><Icon name="info"/> Se marcada, você seguirá para o cadastro da casa.</p><label className="switchLine">Quero exibir minha filiação à casa de axé no perfil <span/></label><div className="notice"><Icon name="info"/>Seu perfil pessoal não cria eventos oficiais.</div><button className="primary">Criar conta</button><button className="outline">Já tenho conta</button></div>;
}

function HouseForm() {
  return <div className="formScreen"><span className="step green">Etapa opcional</span><h2>Cadastrar minha casa</h2><small>Você será o gestor principal deste perfil</small><div className="uploads"><div className="houseLogo form">Logo</div><div className="coverUpload"><Icon name="camera"/>Imagem de capa<br/><small>Recomendado: 1600 × 900</small></div></div>{['Nome da casa','@usuario da casa','Descrição da casa','Endereço'].map(x => <div className="input" key={x}>{x}</div>)}<div className="inputGrid"><div className="input">Número</div><div className="input">Bairro</div></div><div className="inputGrid"><div className="input">Cidade⌄</div><div className="input">Estado⌄</div></div><div className="input">CEP</div><div className="mapInput"><Icon name="pin"/>Usar localização no mapa<span>›</span></div><div className="admins"><b>Administradores da casa</b>{['Você (criador) — Gestor principal','Maria Oliveira — Administrador','João Santos — Administrador'].map(a => <span key={a}>{a}</span>)}</div><div className="notice"><Icon name="info"/>Cada perfil pessoal só pode gerenciar 1 casa.</div><div className="notice"><Icon name="info"/>Outros perfis podem ser adicionados como administradores desta casa.</div><button className="greenBtn full">Cadastrar casa</button><button className="outline">Salvar e continuar depois</button></div>;
}

function Stats({ items }) {
  return <div className="stats">{items.map(([n,l]) => <span key={l}><b>{n}</b><small>{l}</small></span>)}</div>;
}
function Tabs({ labels, active }) { return <div className="tabs">{labels.map(l => <span className={l===active?'active':''} key={l}>{l}</span>)}</div>; }
function RuleCard({ icon, title, text }) { return <div className="ruleCard"><div><Icon name={icon}/></div><b>{title}</b><p>{text}</p></div>; }
function BoardTitle({ title, subtitle }) { return <div className="boardTitle"><h2>{title}</h2><p>{subtitle}</p></div>; }

function Organogram() {
  const boxes = [
    ['Usuários', 'Perfil pessoal, seguir, curtidas, comentários e agenda pessoal.', 'users'],
    ['Casas Religiosas', 'Perfil da casa, endereço, agenda de eventos e seguidores.', 'house'],
    ['Eventos', 'Folder, data, GPS, Quero ir, Tenho interesse e compartilhar.', 'calendar'],
    ['Mapa e Localização', 'GPS automático, raio de 10 km e mais eventos ao mover o mapa.', 'pin'],
    ['Feed Social', 'Posts, fotos, textos, compartilhamento de eventos e Hoje Tem.', 'comment'],
    ['Monetização', 'Evento destacado, casa destacada, premium e patrocinador regional.', 'star'],
    ['Administração', 'Painel web, moderação, métricas e denúncias.', 'shield'],
  ];
  return <section className="organogram boardCard"><BrandLogo compact/><BoardTitle title="Organograma da Rede" subtitle="Como a plataforma se organiza"/><div className="hub">CONECTA AXÉ<span>O app para descobrir macumbas, casas e pessoas perto de você.</span></div><div className="orgGrid">{boxes.map(([t, tx, ic], i) => <div className="orgBox" key={t}><span>{i+1}</span><Icon name={ic}/><b>{t}</b><p>{tx}</p></div>)}</div><div className="flow"><b>Fluxo principal da rede</b><div><span>1. A casa cria o evento</span><span>2. O evento entra no mapa</span><span>3. O usuário descobre pelo GPS</span><span>4. Interage e compartilha</span><span>5. A plataforma gera visibilidade e receita</span></div></div><div className="mvpBadge">MVP <small>Sem vídeos, lives, marketplace, grupos ou chat na V1.</small></div></section>;
}

function BrandBoard() {
  return <section className="brandBoard boardCard"><div className="brandTop"><BrandLogo/><div className="palette"><b>PALETA DE CORES</b><div>{palette.map(([n,c]) => <span key={n}><i style={{background:c}}/><small>{n}<br/>{c}</small></span>)}</div></div><div className="typeSpec"><b>TIPOGRAFIA</b><strong>Poppins</strong><small>Títulos e destaques</small><strong>Inter</strong><small>Textos e informações</small></div><div className="systemIcons"><b>ÍCONES DO SISTEMA</b><div>{['calendar','pin','users','house','bell'].map(i => <span key={i}><Icon name={i}/></span>)}</div></div></div><div className="titleRule"><b>TELAS DO APP</b></div><div className="phoneGrid"><HomeScreen/><MapScreen/><EventScreen/><HouseScreen/></div><div className="brandBottom"><RuleCard icon="users" title="Comunidade" text="Conectamos pessoas, casas e tradições com respeito."/><RuleCard icon="pin" title="Descoberta" text="Encontre eventos e casas perto de você com inteligência e facilidade."/><RuleCard icon="star" title="Cultura" text="Valorizamos raízes, mestras, saberes e manifestações."/><RuleCard icon="shield" title="Fé" text="Espaço seguro para viver e fortalecer sua espiritualidade."/><RuleCard icon="house" title="Proximidade" text="Mais perto do axé, da sua comunidade e do que importa."/></div></section>;
}

const interactiveScreens = {
  Início: <HomeScreen />,
  Mapa: <MapScreen />,
  Evento: <EventScreen />,
  Usuário: <UserScreen />,
  Casa: <HouseScreen />,
  Cadastro: <SignupScreen />,
};

function InteractivePreview() {
  const [active, setActive] = useState('Início');
  const buttons = Object.keys(interactiveScreens);
  const current = useMemo(() => interactiveScreens[active], [active]);
  return <section className="interactive"><div className="intro"><BrandLogo/><h1>Prévia navegável do Conecta Axé</h1><p>Esta versão foi refeita para seguir o padrão visual das telas aprovadas: fundo marfim, logo oficial, tipografia elegante, cards arredondados, cores terracota/terra/verde e navegação mobile-first.</p><div className="previewTabs">{buttons.map(b => <button key={b} onClick={() => setActive(b)} className={active===b?'active':''}>{b}</button>)}</div></div><div className="interactiveStage">{current}</div></section>;
}

export default function Page() {
  return <main className="page"><InteractivePreview/><BrandBoard/><SignupScreen/><Organogram/></main>;
}

# Conecta Axé — Clean Start

Primeira versão limpa do app, começando pelo visual correto da tela de login/acesso.

## O que está incluído

- Next.js App Router
- Visual mobile-first
- Primeira tela de login/acesso no padrão aprovado
- Rotas estáticas de preview:
  - `/` — Login/acesso inicial
  - `/feed` — Home/feed com Hoje Tem
  - `/mapa` — Mapa visual com raio inicial de 10 km
  - `/evento` — Tela de evento oficial da casa
  - `/perfil` — Perfil pessoal
  - `/casa` — Perfil da casa de axé
  - `/cadastro` — Cadastro de pessoa e casa opcional
  - `/admin` — Preview do painel administrativo
- SQL inicial em `supabase/conecta_axe_schema.sql`

## Importante

A parte financeira/Mercado Pago foi deixada para depois, como combinado.

## Como subir no GitHub

1. Extraia o ZIP.
2. Suba todos os arquivos para o repositório GitHub do Conecta Axé.
3. Aguarde a Vercel fazer o deploy automático.
4. Se a Vercel não atualizar sozinha, vá no projeto da Vercel e clique em Redeploy.

## Como testar localmente, se quiser

```bash
npm install
npm run dev
```

Depois abra `http://localhost:3000`.

## Regras respeitadas nesta versão

- Contas públicas.
- Usuário comum não cria evento oficial.
- Evento oficial só nasce a partir do perfil da casa de axé.
- Cada perfil pessoal pode gerenciar somente uma casa.
- Uma casa pode ter vários administradores.
- Casa pode criar vários eventos futuros ao mesmo tempo.
- Mapa mostra eventos próximos e casas com eventos futuros.
- Botão central do usuário comum é Publicar, não Evento.
- Login separa acesso de Pessoa e Casa de Axé.
- Redes sociais serão estruturadas por link validado em fase funcional.
- Painel admin/moderação previsto.
- Financeiro deixado para fase futura.

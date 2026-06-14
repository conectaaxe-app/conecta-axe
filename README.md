# Conecta Axé — Preview inicial do MVP

Este é o primeiro pacote visual do Conecta Axé para subir na Vercel e testar a experiência mobile-first.

## O que já está neste preview

- Home/feed com cards “Hoje Tem”
- Mapa visual com raio inicial de 10 km
- Casas com eventos futuros aparecendo no mapa
- Tela de evento
- Perfil pessoal
- Perfil de casa de axé
- Cadastro opcional da casa
- Criação de evento pelo perfil da casa
- Painel admin visual
- Destaques internos rotativos como conceito
- Regras principais escritas na interface

## O que ainda não está integrado

- Supabase real
- Login real
- Banco de dados real
- Upload real de imagens
- MapTiler real
- Mercado Pago
- Push notifications reais

A parte financeira foi deixada para a etapa final, conforme definido.

## Como rodar localmente

```bash
npm install
npm run dev
```

Depois abrir http://localhost:3000

## Como subir na Vercel

1. Subir estes arquivos no GitHub.
2. Entrar na Vercel.
3. Importar o repositório `conecta-axe-app`.
4. Escolher framework Next.js.
5. Clicar em Deploy.

# Conecta Axé — mobile clean fixed

Versão corrigida do app mobile-first.

## Correções desta versão

- Removida a barra fake de status do celular no topo.
- Checkbox "Lembrar de mim" agora é um input real e funciona.
- Toggle de filiação agora funciona.
- Checkbox "Cadastrar minha casa de axé" agora funciona e exibe a etapa opcional.
- Botão "Entrar" leva para dentro do app:
  - Pessoa: `/feed`
  - Casa de axé: `/casa`
- Botão "Criar conta" leva para `/feed`.
- Botão "Cadastrar casa" leva para `/casa`.
- Botões "Quero ir" e "Tenho interesse" na tela do evento mudam de estado visualmente.
- Financeiro continua fora desta versão.

## Rotas

- `/` — primeira tela do app
- `/login` — login funcional visual
- `/feed` — app/home
- `/mapa` — mapa
- `/evento` — evento
- `/perfil` — perfil pessoal
- `/casa` — perfil da casa
- `/cadastro` — cadastro pessoa/casa
- `/admin` — admin visual

## SQL

`supabase/conecta_axe_schema.sql`

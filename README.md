# Diesel Florestal

Painéis públicos de telemetria com importação de Excel, cadastro pela placa, análise por motorista e gestão de importações.

## Publicação Cloudflare Workers
- Branch: main
- Build: npm run build
- Deploy: npx wrangler deploy
- Diretório raiz: /

A interface deste repositório lê as bases públicas no serviço central https://diesel-florestal-leonardo.dustyopera.chatgpt.site. Todos os endereços usam a mesma base. O botão Gerenciar importações leva à gestão central. Não é necessário configurar banco, senhas ou secrets neste Worker estático.

## Gestão
Na gestão central, o proprietário entra com a conta do ChatGPT. Consultas são públicas; uploads, parametrização e alterações exigem autorização no servidor. Importações têm metadados, ativação/desativação, exclusão reversível, restauração e download dos dados em JSON. O serviço central persiste os documentos em Cloudflare R2 e aplica controle de concorrência.

## Migração do navegador
Bases antigas não são enviadas automaticamente. Use Publicar dados antigos no endereço central. Se as bases antigas estiverem no endereço Cloudflare, use Baixar dados antigos e depois Restaurar histórico anterior na gestão central. Originais locais são preservados.

O arquivo central-service/api.mjs documenta a implementação do serviço central; ele não é implantado por este Worker estático. Credenciais e dados de telemetria não fazem parte do repositório.

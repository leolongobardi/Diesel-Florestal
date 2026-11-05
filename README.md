# Diesel Florestal

Painel de consumo CAN/GPS com importação de Excel e parametrização por placa e operador.

## Publicação no Cloudflare Workers
Conecte este repositório no Workers & Pages.
- Branch: main
- Build: npm run build
- Deploy: npx wrangler deploy
- Diretório raiz: /

Nenhuma senha ou variável secreta é necessária. O site começa vazio. Dados e configurações são processados e guardados somente no navegador do visitante. Use Exportar histórico para backup e Restaurar histórico para migrar.

A leitura de Excel carrega SheetJS do CDN oficial. O agrupamento usa soma da CAN dividida pela soma dos litros dos pares válidos.

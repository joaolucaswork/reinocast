# ✅ Checklist de Migração para Mux Player

## Pré-Migração

- [ ] Ler o [Quick Start Guide](./docs/QUICK-START-MUX.md)
- [ ] Ler o [Migration Guide](./docs/MIGRATION-GUIDE.md)
- [ ] Criar conta no [Mux](https://mux.com)
- [ ] Verificar [preços do Mux](https://mux.com/pricing)
- [ ] Listar todos os vídeos que precisam ser migrados

## Preparação dos Vídeos

- [ ] Baixar vídeos do YouTube (se aplicável)
  - [ ] Instalar `yt-dlp`: `pip install yt-dlp`
  - [ ] Baixar cada vídeo em melhor qualidade
  - [ ] Organizar vídeos em uma pasta

- [ ] Fazer upload para o Mux
  - [ ] Acessar [Mux Dashboard](https://dashboard.mux.com/)
  - [ ] Ir em **Video** → **Assets**
  - [ ] Fazer upload de cada vídeo
  - [ ] Aguardar processamento
  - [ ] Copiar Playback IDs

## Atualização do Código

✅ **Já Concluído!** O código já foi migrado automaticamente:

- [x] Dependências atualizadas (`@mux/mux-player` instalado)
- [x] `src/utils/mux-player.ts` criado
- [x] `src/utils/subtitle-sync.ts` atualizado
- [x] `src/index.ts` atualizado
- [x] Documentação criada
- [x] Build testado e funcionando

## Atualização do Webflow

- [ ] Abrir projeto no Webflow Designer
- [ ] Localizar todos os elementos `<lite-youtube>`
- [ ] Para cada vídeo:
  - [ ] Substituir `<lite-youtube>` por `<mux-player>`
  - [ ] Trocar `videoid` por `playback-id`
  - [ ] Adicionar `metadata-video-title`
  - [ ] Adicionar `stream-type="on-demand"`
  - [ ] Testar no preview

### Exemplo de Substituição:

**Antes:**
```html
<lite-youtube
  videoid="9fCzmyCgK1o"
  videotitle="CLAREZA: o que ninguém te conta sobre investir"
></lite-youtube>
```

**Depois:**
```html
<mux-player
  playback-id="SEU_PLAYBACK_ID_DO_MUX"
  metadata-video-title="CLAREZA: o que ninguém te conta sobre investir"
  stream-type="on-demand"
></mux-player>
```

## Testes

- [ ] Testar no Webflow Preview
  - [ ] Vídeo carrega corretamente
  - [ ] Thumbnail aparece
  - [ ] Reprodução funciona
  - [ ] Controles funcionam
  - [ ] Sincronização de legendas funciona
  - [ ] Tooltips de pessoas funcionam

- [ ] Testar em diferentes navegadores
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge

- [ ] Testar em dispositivos móveis
  - [ ] iOS Safari
  - [ ] Android Chrome

- [ ] Testar responsividade
  - [ ] Desktop
  - [ ] Tablet
  - [ ] Mobile

## Deploy

- [ ] Build local
  ```bash
  pnpm run build
  ```

- [ ] Verificar erros
  ```bash
  pnpm run check
  ```

- [ ] Deploy para Cloudflare Tunnel
  ```bash
  pnpm run tunnel
  ```

- [ ] Publicar Webflow
  - [ ] Salvar todas as mudanças
  - [ ] Publicar site
  - [ ] Verificar site publicado

## Pós-Deploy

- [ ] Testar site em produção
  - [ ] Todos os vídeos carregam
  - [ ] Reprodução funciona
  - [ ] Analytics está rastreando

- [ ] Configurar Analytics no Mux
  - [ ] Acessar [Mux Dashboard](https://dashboard.mux.com/)
  - [ ] Ir em **Data** → **Video Views**
  - [ ] Verificar se dados estão sendo coletados

- [ ] Monitorar custos
  - [ ] Verificar uso de storage
  - [ ] Verificar uso de bandwidth
  - [ ] Ajustar se necessário

## Otimizações (Opcional)

- [ ] Adicionar thumbnails customizados
  - [ ] Usar `thumbnail-time` para melhor frame
  
- [ ] Configurar cores personalizadas
  - [ ] Usar `accent-color` para match com brand

- [ ] Adicionar metadata adicional
  - [ ] `metadata-viewer-user-id` para tracking de usuários
  - [ ] `metadata-video-series` para agrupar vídeos
  - [ ] `metadata-sub-property-id` para segmentação

- [ ] Configurar vídeos privados (se necessário)
  - [ ] Gerar signed URLs
  - [ ] Usar `playback-token`

## Documentação

- [ ] Atualizar documentação interna do projeto
- [ ] Treinar equipe sobre novo sistema
- [ ] Documentar processo de upload de novos vídeos

## Backup e Rollback

- [ ] Fazer backup do código anterior
  ```bash
  git tag -a "pre-mux-migration" -m "Backup antes da migração para Mux"
  git push origin --tags
  ```

- [ ] Documentar processo de rollback (se necessário)
  - Ver [MIGRATION-SUMMARY.md](./MIGRATION-SUMMARY.md) seção "Rollback"

## Monitoramento Contínuo

- [ ] Configurar alertas no Mux Dashboard
- [ ] Monitorar métricas de reprodução
- [ ] Acompanhar custos mensais
- [ ] Revisar analytics regularmente

## Recursos de Ajuda

Se encontrar problemas, consulte:

- [Quick Start Guide](./docs/QUICK-START-MUX.md)
- [Webflow Integration Guide](./docs/MUX-PLAYER-WEBFLOW-GUIDE.md)
- [Migration Guide](./docs/MIGRATION-GUIDE.md)
- [Webflow Examples](./docs/WEBFLOW-EXAMPLE.md)
- [Mux Documentation](https://docs.mux.com/)
- [Mux Support](https://mux.com/support)

## Status da Migração

**Código:** ✅ Completo  
**Vídeos:** ⏳ Pendente (você precisa fazer upload)  
**Webflow:** ⏳ Pendente (você precisa atualizar os embeds)  
**Deploy:** ⏳ Pendente (após atualizar Webflow)  

---

**Última atualização:** 2025-10-19  
**Versão do Mux Player:** 3.6.1


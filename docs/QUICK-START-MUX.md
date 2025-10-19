# Quick Start: Mux Player

## 🚀 Começando em 5 Minutos

### Passo 1: Criar Conta no Mux

1. Acesse [mux.com](https://mux.com)
2. Clique em **Sign Up**
3. Preencha seus dados
4. Confirme seu email

💡 **Dica:** Mux oferece créditos gratuitos para teste!

### Passo 2: Fazer Upload de um Vídeo

#### Opção A: Via Dashboard (Mais Fácil)

1. Acesse [dashboard.mux.com](https://dashboard.mux.com/)
2. Vá em **Video** → **Assets**
3. Clique em **Upload Video**
4. Selecione seu arquivo de vídeo
5. Aguarde o processamento (pode levar alguns minutos)
6. Copie o **Playback ID**

#### Opção B: Via URL

1. No Mux Dashboard, clique em **Upload Video**
2. Escolha **From URL**
3. Cole a URL do vídeo
4. Clique em **Create Asset**
5. Aguarde o processamento
6. Copie o **Playback ID**

### Passo 3: Usar no Webflow

1. No Webflow Designer, arraste um elemento **Embed**
2. Cole este código:

```html
<mux-player
  playback-id="SEU_PLAYBACK_ID_AQUI"
  metadata-video-title="Título do Vídeo"
></mux-player>
```

3. Substitua `SEU_PLAYBACK_ID_AQUI` pelo Playback ID que você copiou
4. Salve e publique

### Passo 4: Testar

1. Visualize seu site no Webflow
2. Clique no vídeo para reproduzir
3. Verifique se está funcionando corretamente

## 📹 Baixar Vídeos do YouTube

Se você precisa migrar vídeos do YouTube para o Mux:

### Usando yt-dlp (Recomendado)

```bash
# Instalar yt-dlp
pip install yt-dlp

# Baixar vídeo em melhor qualidade
yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]" \
  -o "%(title)s.%(ext)s" \
  "https://www.youtube.com/watch?v=VIDEO_ID"
```

### Usando Sites Online

Alternativamente, use sites como:
- [y2mate.com](https://y2mate.com)
- [savefrom.net](https://savefrom.net)
- [ytmp3.cc](https://ytmp3.cc)

⚠️ **Atenção:** Certifique-se de ter direitos sobre os vídeos que está baixando!

## 🎨 Personalização Básica

### Cor de Destaque

```html
<mux-player
  playback-id="SEU_PLAYBACK_ID"
  accent-color="#ac39f2"
></mux-player>
```

### Thumbnail Personalizado

```html
<mux-player
  playback-id="SEU_PLAYBACK_ID"
  thumbnail-time="10"
></mux-player>
```

### Autoplay (Silenciado)

```html
<mux-player
  playback-id="SEU_PLAYBACK_ID"
  autoplay
  muted
></mux-player>
```

## 📊 Ver Analytics

1. Acesse [dashboard.mux.com](https://dashboard.mux.com/)
2. Vá em **Data** → **Video Views**
3. Veja métricas detalhadas de reprodução

## 💰 Preços

Mux cobra por:
- **Armazenamento:** ~$0.05/GB/mês
- **Encoding:** ~$0.005/minuto
- **Streaming:** ~$0.01/GB

**Exemplo de custo:**
- 10 vídeos de 10 minutos cada
- 1000 visualizações/mês
- **Custo estimado:** ~$5-10/mês

Veja preços atualizados em [mux.com/pricing](https://mux.com/pricing)

## 🆘 Problemas Comuns

### Vídeo não aparece

**Solução:**
1. Verifique se o Playback ID está correto
2. Aguarde o processamento do vídeo no Mux
3. Verifique o console do navegador para erros

### Vídeo não reproduz

**Solução:**
1. Verifique se o vídeo está público (não privado)
2. Teste em modo anônimo do navegador
3. Verifique se há bloqueadores de anúncios ativos

### Thumbnail não aparece

**Solução:**
1. Aguarde alguns minutos após o upload
2. Especifique `thumbnail-time` manualmente
3. Verifique se o vídeo foi processado completamente

## 📚 Recursos Úteis

- **Documentação Completa:** [docs/MUX-PLAYER-WEBFLOW-GUIDE.md](./MUX-PLAYER-WEBFLOW-GUIDE.md)
- **Guia de Migração:** [docs/MIGRATION-GUIDE.md](./MIGRATION-GUIDE.md)
- **Exemplos:** [docs/WEBFLOW-EXAMPLE.md](./WEBFLOW-EXAMPLE.md)
- **Mux Docs:** [docs.mux.com](https://docs.mux.com/)

## 🎯 Próximos Passos

1. ✅ Criar conta no Mux
2. ✅ Fazer upload de um vídeo de teste
3. ✅ Testar no Webflow
4. ✅ Migrar todos os vídeos
5. ✅ Configurar analytics
6. ✅ Publicar site

## 💡 Dicas Pro

1. **Use metadata:** Adicione `metadata-video-title` e `metadata-viewer-user-id` para analytics melhores
2. **Otimize thumbnails:** Use `thumbnail-time` para escolher o melhor frame
3. **Monitore custos:** Acompanhe o uso no Mux Dashboard
4. **Use signed URLs:** Para vídeos privados, use playback tokens
5. **Teste antes:** Sempre teste em staging antes de publicar

## 🔗 Links Rápidos

- [Mux Dashboard](https://dashboard.mux.com/)
- [Mux Pricing](https://mux.com/pricing)
- [Mux Support](https://mux.com/support)
- [Mux Community](https://community.mux.com/)

---

**Precisa de ajuda?** Consulte a [documentação completa](./MUX-PLAYER-WEBFLOW-GUIDE.md) ou entre em contato com o suporte do Mux.


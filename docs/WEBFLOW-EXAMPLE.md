# Mux Player - Exemplo para Webflow

## Como Usar no Webflow

### Passo 1: Obter o Playback ID

1. Acesse o [Mux Dashboard](https://dashboard.mux.com/)
2. Faça upload do seu vídeo
3. Copie o **Playback ID** do vídeo

### Passo 2: Adicionar no Webflow

1. No Webflow Designer, arraste um elemento **Embed**
2. Cole o código do Mux Player
3. Substitua `YOUR_PLAYBACK_ID` pelo seu Playback ID real
4. Publique o site

## Exemplo Básico

```html
<mux-player
  playback-id="YOUR_PLAYBACK_ID"
  metadata-video-title="Título do Vídeo"
  metadata-viewer-user-id="user-id-007"
></mux-player>
```

## Exemplo para o ReinoCast

Baseado na estrutura atual do projeto, aqui está como usar o Mux Player no slider de podcasts:

```html
<div class="swiper-slide is-podcast">
  <div class="video-principal_wrapper">
    <mux-player
      playback-id="YOUR_MUX_PLAYBACK_ID"
      metadata-video-title="CLAREZA: o que ninguém te conta sobre investir"
      metadata-viewer-user-id="user-id-007"
      stream-type="on-demand"
      class="mux-player"
    ></mux-player>
  </div>
  <div class="height-bg"></div>
  <div class="elements-video-youtube">
    <div class="people-podcast">
      <div
        description="CEO"
        person="Gabriel Tintori"
        class="people_item active"
      >
        <img src="..." alt="Gabriel Tintori" />
      </div>
      <!-- Mais pessoas aqui -->
    </div>
  </div>
</div>
```

## Recursos Avançados

### Thumbnail Personalizado

Escolha qual frame usar como thumbnail (em segundos):

```html
<mux-player
  playback-id="YOUR_PLAYBACK_ID"
  thumbnail-time="10"
></mux-player>
```

### Cor de Destaque Personalizada

```html
<mux-player
  playback-id="YOUR_PLAYBACK_ID"
  accent-color="#ac39f2"
></mux-player>
```

### Autoplay (Silenciado)

```html
<mux-player
  playback-id="YOUR_PLAYBACK_ID"
  autoplay
  muted
></mux-player>
```

## Estilização com CSS

Você pode adicionar CSS customizado no Webflow:

**Project Settings → Custom Code → Head Code:**

```html
<style>
  mux-player {
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
  }
  
  /* Responsivo */
  @media (max-width: 768px) {
    mux-player {
      border-radius: 8px;
    }
  }
</style>
```

## Sincronização de Legendas

O sistema de sincronização de legendas funciona automaticamente com o Mux Player. Certifique-se de que:

1. O arquivo SRT está acessível
2. Os elementos com atributo `person` existem na página
3. Os nomes no SRT correspondem aos nomes nos elementos HTML

Exemplo de elemento de pessoa:

```html
<div
  person="Gabriel Tintori"
  description="CEO"
  class="people_item"
>
  <img src="..." alt="Gabriel Tintori" />
</div>
```

## Múltiplos Vídeos

Para adicionar vários vídeos em um slider Swiper:

```html
<div class="swiper is-podcast">
  <div class="swiper-wrapper is-podcast">
    
    <!-- Vídeo 1 -->
    <div class="swiper-slide is-podcast">
      <div class="video-principal_wrapper">
        <mux-player
          playback-id="PLAYBACK_ID_1"
          metadata-video-title="Vídeo 1"
        ></mux-player>
      </div>
    </div>
    
    <!-- Vídeo 2 -->
    <div class="swiper-slide is-podcast">
      <div class="video-principal_wrapper">
        <mux-player
          playback-id="PLAYBACK_ID_2"
          metadata-video-title="Vídeo 2"
        ></mux-player>
      </div>
    </div>
    
    <!-- Adicione mais slides conforme necessário -->
    
  </div>
</div>
```

## Atributos Importantes

| Atributo | Descrição | Exemplo |
|----------|-----------|---------|
| `playback-id` | ID do vídeo no Mux (obrigatório) | `"abc123..."` |
| `metadata-video-title` | Título para analytics | `"Meu Vídeo"` |
| `metadata-viewer-user-id` | ID do usuário para analytics | `"user-123"` |
| `stream-type` | Tipo de stream | `"on-demand"` ou `"live"` |
| `thumbnail-time` | Tempo do thumbnail (segundos) | `10` |
| `accent-color` | Cor de destaque do player | `"#ac39f2"` |
| `autoplay` | Reprodução automática | (sem valor) |
| `muted` | Iniciar sem som | (sem valor) |
| `loop` | Repetir vídeo | (sem valor) |

## Troubleshooting

### Vídeo não aparece

- Verifique se o Playback ID está correto
- Confirme que o vídeo foi processado no Mux
- Verifique o console do navegador para erros

### Player não carrega

- Certifique-se de que o script está sendo carregado
- Verifique se há conflitos de CSS
- Teste em modo anônimo do navegador

### Legendas não sincronizam

- Verifique se o arquivo SRT está acessível
- Confirme que os nomes no SRT correspondem aos elementos HTML
- Verifique o console para mensagens de erro

## Próximos Passos

1. Faça upload dos seus vídeos para o Mux
2. Copie os Playback IDs
3. Atualize os embeds no Webflow
4. Teste a reprodução
5. Publique o site

## Recursos

- [Guia Completo do Mux Player](./MUX-PLAYER-WEBFLOW-GUIDE.md)
- [Guia de Migração](./MIGRATION-GUIDE.md)
- [Mux Dashboard](https://dashboard.mux.com/)
- [Documentação do Mux](https://docs.mux.com/)


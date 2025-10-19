# Subtitle Synchronization Guide

## Overview

O módulo `subtitle-sync` sincroniza automaticamente o destaque de speakers com base em um arquivo SRT e o player do YouTube (lite-youtube).

## Como Funciona

1. **Carrega o arquivo SRT** (`transcribe.srt`) e extrai:
   - Timestamps (início e fim de cada fala)
   - Nome do speaker (extraído do formato `[Nome do Speaker]: texto`)
   
2. **Conecta com o YouTube Player** via YouTube IFrame API:
   - Detecta quando o vídeo está tocando ou pausado
   - Obtém o tempo atual do vídeo (currentTime)
   
3. **Atualiza os speakers visualmente**:
   - Adiciona a classe `active` no elemento `.people_item` correspondente ao speaker atual
   - Remove a classe `active` de todos os outros speakers

## Estrutura HTML Necessária (Webflow)

### 1. Elemento lite-youtube

```html
<lite-youtube videoid="9fCzmyCgK1o" videotitle="..."></lite-youtube>
```

### 2. Elementos de Speaker

Cada speaker deve ter:
- Classe: `people_item`
- Atributo `person`: nome exato do speaker (deve corresponder ao nome no SRT)

```html
<div class="people_item" person="Gabriel Tintori">
  <!-- Conteúdo do speaker -->
</div>

<div class="people_item" person="Wagner Maranhão">
  <!-- Conteúdo do speaker -->
</div>

<div class="people_item" person="Douglas Alves">
  <!-- Conteúdo do speaker -->
</div>
```

## Formato do Arquivo SRT

O arquivo `transcribe.srt` deve seguir este formato:

```srt
1
00:00:00,000 --> 00:00:04,000
[Gabriel Tintori]: Fala turma, tudo bem? Aqui é o Gabriel Tintori...

2
00:00:04,000 --> 00:00:08,000
[Gabriel Tintori]: Capital aqui no nosso primeiro podcast...

3
00:00:18,000 --> 00:00:24,000
[Wagner Maranhão]: Obrigado Gabriel, é um prazer estar aqui...
```

**Importante:** O nome entre colchetes `[Nome]` deve corresponder **exatamente** ao atributo `person` no HTML.

## Uso no Código

### Inicialização Automática

O módulo é inicializado automaticamente em `src/index.ts`:

```typescript
import { initSubtitleSync } from '$utils/subtitle-sync';

window.Webflow.push(() => {
  // Inicializa a sincronização
  initSubtitleSync('/transcribe.srt').then((sync) => {
    // Expõe globalmente para debug
    window.subtitleSync = sync;
  });
});
```

### Uso Manual (Opcional)

Se você quiser controlar manualmente:

```typescript
import { SubtitleSync } from '$utils/subtitle-sync';

const sync = new SubtitleSync();
await sync.init('/transcribe.srt', '.people_item', 'lite-youtube');

// Atualizar manualmente em um tempo específico
sync.updateSpeakerAtTime(45.5); // 45.5 segundos

// Obter lista de speakers
const speakers = sync.getSpeakers();
console.log(speakers); // ['Gabriel Tintori', 'Wagner Maranhão', ...]

// Obter legendas
const subtitles = sync.getSubtitles();

// Obter legenda em um tempo específico
const subtitle = sync.getSubtitleAtTime(30);
console.log(subtitle?.speaker); // Nome do speaker naquele momento

// Limpar
sync.destroy();
```

## Estilização CSS (Webflow)

A classe `active` é adicionada/removida automaticamente. Você pode estilizar no Webflow:

### Estado Normal
```css
.people_item {
  opacity: 0.5;
  transform: scale(1);
  transition: all 0.3s ease;
}
```

### Estado Ativo
```css
.people_item.active {
  opacity: 1;
  transform: scale(1.1);
  border: 2px solid #ff0000;
}
```

## Fluxo de Sincronização

```
1. Usuário clica no vídeo (lite-youtube)
   ↓
2. YouTube IFrame é criado
   ↓
3. YouTube IFrame API é carregada
   ↓
4. Conecta ao player
   ↓
5. Detecta evento de PLAY
   ↓
6. Inicia loop de sincronização (a cada 100ms):
   - Obtém currentTime do player
   - Busca subtitle correspondente
   - Atualiza speaker ativo
   ↓
7. Detecta evento de PAUSE
   ↓
8. Para o loop de sincronização
```

## Troubleshooting

### Speakers não estão sendo destacados

1. **Verifique o console** para mensagens de erro
2. **Confirme que os nomes correspondem**:
   - Nome no SRT: `[Gabriel Tintori]:`
   - Atributo HTML: `person="Gabriel Tintori"`
   - Devem ser **exatamente iguais** (case-sensitive)

3. **Verifique se o arquivo SRT está acessível**:
   - Abra `http://localhost:3000/transcribe.srt` no navegador
   - Deve mostrar o conteúdo do arquivo

4. **Verifique se lite-youtube está presente**:
   - Inspecione a página e procure por `<lite-youtube>`

### Sincronização está atrasada ou adiantada

- A sincronização usa os timestamps do SRT
- Se o vídeo do YouTube tiver intro/outro diferente, os timestamps podem não bater
- Verifique se o `videoStartAt` do lite-youtube está configurado corretamente

### Console mostra "No people items found"

- Verifique se os elementos têm a classe `people_item`
- Use o seletor correto ao inicializar:
  ```typescript
  initSubtitleSync('/transcribe.srt', '.sua-classe-customizada');
  ```

## API Reference

### `SubtitleSync` Class

#### Methods

- `init(srtFilePath, peopleItemsSelector, liteYoutubeSelector)` - Inicializa a sincronização
- `updateSpeakerAtTime(currentTime)` - Atualiza speaker manualmente
- `getSpeakers()` - Retorna array de speakers únicos
- `getSubtitles()` - Retorna todas as legendas parseadas
- `getSubtitleAtTime(time)` - Retorna legenda em um tempo específico
- `destroy()` - Limpa e destrói a sincronização

### `initSubtitleSync()` Function

```typescript
async function initSubtitleSync(
  srtFilePath?: string,        // default: '/transcribe.srt'
  peopleItemsSelector?: string, // default: '.people_item'
  liteYoutubeSelector?: string  // default: 'lite-youtube'
): Promise<SubtitleSync>
```

## Exemplo Completo

```typescript
// Inicializar
const sync = await initSubtitleSync();

// Obter informações
console.log('Speakers:', sync.getSpeakers());
console.log('Total de legendas:', sync.getSubtitles().length);

// Verificar quem está falando em 1 minuto
const subtitle = sync.getSubtitleAtTime(60);
if (subtitle) {
  console.log(`Em 1:00 - ${subtitle.speaker}: ${subtitle.text}`);
}

// A sincronização acontece automaticamente quando o vídeo toca!
```

## Notas Importantes

1. **Webflow cuida da estrutura e estilo** - Este módulo apenas gerencia a lógica
2. **YouTube IFrame API é carregada automaticamente** - Não precisa adicionar manualmente
3. **A classe `active` é sua responsabilidade estilizar** - Use Webflow para isso
4. **Nomes devem corresponder exatamente** - Case-sensitive!


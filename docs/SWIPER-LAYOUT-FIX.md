# 🔧 Correção do Layout do Swiper - Problema de Sobreposição

## 📋 Problema Identificado

O Swiper carousel estava sobrepondo o texto lateral devido a configurações CSS que forçavam 100% de largura, ignorando o layout de duas colunas definido no Webflow.

### Sintomas:
- ✅ Swiper ocupando toda a largura do container
- ✅ Texto lateral sendo cortado/sobreposto
- ✅ Layout de duas colunas não sendo respeitado

---

## 🎯 Solução Implementada

### Mudanças no CSS (`src/utils/swiper.css`)

**Antes:**
```css
.swiper.is-podcast {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
  overflow: visible;
}
```

**Depois:**
```css
.swiper.is-podcast {
  /* Don't force width - let it inherit from parent container */
  width: auto;
  max-width: none;
  margin: 0;
  padding: 0;
  overflow: visible;
  flex: 1; /* Allow it to grow within flex container */
}
```

### Principais Mudanças:

1. **`width: auto`** - Permite que o Swiper respeite o layout do container pai
2. **`max-width: none`** - Remove limitações de largura máxima
3. **`flex: 1`** - Permite que o Swiper cresça dentro de um container flexbox
4. **`margin: 0`** - Remove margens automáticas que centralizavam o elemento

---

## 🏗️ Configuração Necessária no Webflow

Para que o layout funcione corretamente, você precisa configurar o container pai no Webflow Designer:

### Estrutura HTML Esperada:

```
reinocast-main_wrapper (Div Block)
├── swiper.is-podcast (Div Block) ← Carousel
└── div-block-21 (Div Block) ← Texto lateral
```

### Configuração do Container Pai (`reinocast-main_wrapper`):

No Webflow Designer, selecione o elemento `reinocast-main_wrapper` e configure:

#### Layout:
- **Display**: `Flex`
- **Direction**: `Horizontal` (Row)
- **Align**: `Center` ou `Stretch`
- **Justify**: `Space Between` ou `Flex Start`

#### Spacing:
- **Gap**: `20px` a `40px` (espaço entre o vídeo e o texto)

#### Exemplo de Configuração:
```
Display: Flex
Flex Direction: Row
Align Items: Center
Justify Content: Space Between
Gap: 32px
```

---

## 📱 Comportamento Responsivo

### Desktop (> 991px):
- Layout lado a lado (Swiper + Texto)
- Swiper ocupa ~60-70% da largura
- Texto ocupa ~30-40% da largura

### Tablet (≤ 991px):
- Pode manter layout lado a lado ou empilhar
- Ajuste no Webflow: mude `Flex Direction` para `Column` no breakpoint tablet

### Mobile (≤ 767px):
- Layout empilhado (Column)
- Swiper ocupa 100% da largura
- Texto abaixo do vídeo

---

## ✅ Checklist de Verificação

Após fazer o upload do novo CSS, verifique:

- [ ] O Swiper não está sobrepondo o texto lateral
- [ ] O texto lateral está visível e legível
- [ ] O vídeo não está cortado nas laterais
- [ ] Os botões de navegação estão visíveis
- [ ] O layout funciona em todos os breakpoints (Desktop, Tablet, Mobile)
- [ ] O espaçamento entre Swiper e texto está adequado

---

## 🚀 Próximos Passos

1. **Faça upload do CSS atualizado**
   - Arquivo: `dist/index.css`
   - Destino: Seu servidor/CDN

2. **Configure o layout no Webflow**
   - Selecione `reinocast-main_wrapper`
   - Configure Display: Flex
   - Configure Direction: Row
   - Adicione Gap entre elementos

3. **Teste em todos os dispositivos**
   - Desktop
   - Tablet
   - Mobile

4. **Ajuste responsivo se necessário**
   - Use breakpoints do Webflow
   - Mude para Column em mobile

---

## 🔍 Debugging

Se o problema persistir:

1. **Verifique o CSS no DevTools:**
   ```css
   .swiper.is-podcast {
     width: auto; /* Deve ser 'auto', não '100%' */
     flex: 1; /* Deve estar presente */
   }
   ```

2. **Verifique o container pai:**
   - Deve ter `display: flex`
   - Deve ter `flex-direction: row` (desktop)

3. **Verifique o cache:**
   - Limpe o cache do navegador
   - Force refresh (Cmd+Shift+R no Mac, Ctrl+Shift+R no Windows)

---

## 📝 Notas Técnicas

- O Swiper agora usa `flex: 1` para crescer dentro do container flexbox
- A largura é determinada pelo espaço disponível após o texto lateral
- O `overflow: visible` garante que nada seja cortado
- Os botões de navegação têm `z-index: 10` para ficarem acima do conteúdo

---

## 🎨 Customização Adicional

Se você quiser controlar a proporção entre Swiper e texto:

### Opção 1: Proporção Fixa
No Webflow, configure:
- Swiper: `Flex Grow: 2` (ocupa 2/3 do espaço)
- Texto: `Flex Grow: 1` (ocupa 1/3 do espaço)

### Opção 2: Largura Fixa para o Texto
No Webflow, configure:
- Texto: `Width: 300px` (largura fixa)
- Swiper: `Flex: 1` (ocupa o resto do espaço)

---

## 📚 Referências

- [Webflow Flexbox Guide](https://university.webflow.com/lesson/intro-to-flexbox)
- [Swiper.js Documentation](https://swiperjs.com/swiper-api)
- [CSS Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)


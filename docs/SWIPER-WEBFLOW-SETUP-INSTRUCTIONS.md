# 🔧 Instruções de Configuração do Swiper no Webflow

## ⚠️ Problemas Identificados na Estrutura Atual

Analisando o arquivo `webflow-structure/index.html`, identifiquei que a estrutura atual está **incompleta**. Faltam elementos essenciais para o funcionamento do Swiper.

### Estrutura Atual (Incompleta):
```html
<div class="swiper is-podcast">
  <div class="swiper-wrapper is-podcast">
    <div class="swiper-slide is-podcast">
      <lite-youtube videoid="guJLfqTFfIw"></lite-youtube>
    </div>
    <div class="swiper-slide is-podcast">
      <lite-youtube videoid="guJLfqTFfIw"></lite-youtube>
    </div>
  </div>
</div>
```

### ❌ O que está faltando:
1. **Botões de navegação** (`swiper-button-prev` e `swiper-button-next`)
2. **Paginação** (`swiper-pagination`)

---

## ✅ Como Corrigir no Webflow Designer

### **Passo 1: Adicionar Botão "Anterior"**

1. Selecione o elemento com classe `swiper is-podcast`
2. Adicione um **Div Block** como filho (irmão do `swiper-wrapper`)
3. Dê a classe: `swiper-button-prev`
4. Posicione este elemento **DEPOIS** do `swiper-wrapper` (não dentro dele)

### **Passo 2: Adicionar Botão "Próximo"**

1. Ainda dentro do `swiper is-podcast`
2. Adicione outro **Div Block** como filho
3. Dê a classe: `swiper-button-next`
4. Posicione este elemento **DEPOIS** do `swiper-button-prev`

### **Passo 3: Adicionar Paginação**

1. Ainda dentro do `swiper is-podcast`
2. Adicione outro **Div Block** como filho
3. Dê a classe: `swiper-pagination`
4. Posicione este elemento **DEPOIS** do `swiper-button-next`

---

## 📋 Estrutura Final Esperada

Após seguir os passos acima, sua estrutura no Webflow deve ficar assim:

```
swiper is-podcast (Div Block)
├── swiper-wrapper is-podcast (Div Block)
│   ├── swiper-slide is-podcast (Div Block)
│   │   └── lite-youtube (Embed)
│   └── swiper-slide is-podcast (Div Block)
│       └── lite-youtube (Embed)
├── swiper-button-prev (Div Block) ← ADICIONAR
├── swiper-button-next (Div Block) ← ADICIONAR
└── swiper-pagination (Div Block) ← ADICIONAR
```

### HTML Resultante:
```html
<div class="swiper is-podcast">
  <div class="swiper-wrapper is-podcast">
    <div class="swiper-slide is-podcast">
      <lite-youtube videoid="guJLfqTFfIw"></lite-youtube>
    </div>
    <div class="swiper-slide is-podcast">
      <lite-youtube videoid="guJLfqTFfIw"></lite-youtube>
    </div>
  </div>
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
  <div class="swiper-pagination"></div>
</div>
```

---

## 🎨 Estilização no Webflow (Opcional)

Os botões e paginação já têm estilos CSS aplicados automaticamente pelo arquivo `src/utils/swiper.css`. No entanto, você pode personalizar no Webflow:

### **Botões de Navegação:**
- **Tamanho padrão:** 44px × 44px
- **Cor de fundo:** rgba(0, 0, 0, 0.5)
- **Cor do texto:** branco
- **Posição:** Absoluta (esquerda/direita)

### **Paginação:**
- **Posição:** Absoluta (bottom: 10px)
- **Bullets:** 8px × 8px
- **Cor ativa:** #007aff

---

## 🔍 Verificação Passo a Passo

### **1. Verifique a Hierarquia:**
No Webflow Navigator, certifique-se de que:
- ✅ `swiper-button-prev` é **irmão** de `swiper-wrapper` (não filho)
- ✅ `swiper-button-next` é **irmão** de `swiper-wrapper` (não filho)
- ✅ `swiper-pagination` é **irmão** de `swiper-wrapper` (não filho)
- ✅ Todos os três estão **dentro** de `swiper is-podcast`

### **2. Verifique as Classes:**
- ✅ Container principal: `swiper is-podcast`
- ✅ Wrapper: `swiper-wrapper is-podcast`
- ✅ Cada slide: `swiper-slide is-podcast`
- ✅ Botão anterior: `swiper-button-prev` (sem combo class)
- ✅ Botão próximo: `swiper-button-next` (sem combo class)
- ✅ Paginação: `swiper-pagination` (sem combo class)

### **3. Verifique os Embeds:**
- ✅ Cada `swiper-slide` contém um elemento **Embed**
- ✅ O Embed contém o código `<lite-youtube videoid="..."></lite-youtube>`

---

## 🚀 Após Fazer as Alterações

### **1. Publique no Webflow:**
- Clique em **Publish** no Webflow
- Aguarde a publicação completar

### **2. Teste Localmente (Opcional):**
Se quiser testar antes de publicar:
1. Exporte o código do Webflow
2. Atualize o arquivo de referência em `webflow-structure/index.html`
3. Execute `pnpm run dev`
4. Abra `http://localhost:3000` no navegador

### **3. Verifique o Funcionamento:**
- ✅ Apenas **1 slide** deve estar visível por vez
- ✅ Botões de navegação devem aparecer (setas esquerda/direita)
- ✅ Paginação deve aparecer (bolinhas na parte inferior)
- ✅ Clicar nas setas deve mudar de slide
- ✅ Arrastar/deslizar deve funcionar (mobile e desktop)
- ✅ Teclas de seta (← →) devem funcionar

---

## 🐛 Solução de Problemas

### **Problema: Slides aparecem empilhados verticalmente**
**Causa:** CSS não está sendo carregado ou estrutura HTML incorreta

**Solução:**
1. ✅ Verifique se `dist/index.js` está sendo carregado no Footer Code
2. ✅ Limpe o cache do navegador (Ctrl+Shift+R ou Cmd+Shift+R)
3. ✅ Verifique se a estrutura HTML está correta (veja acima)
4. ✅ Execute `pnpm run build` novamente
5. ✅ Faça upload do novo `dist/index.js`

### **Problema: Erro "Cannot read properties of undefined (reading 'querySelector')"**
**Causa:** Elementos de navegação/paginação não existem no HTML

**Solução:**
1. ✅ Adicione os elementos `swiper-button-prev`, `swiper-button-next`, `swiper-pagination`
2. ✅ Certifique-se de que estão na posição correta (irmãos de `swiper-wrapper`)
3. ✅ Publique as alterações no Webflow

### **Problema: Botões de navegação não aparecem**
**Causa:** Elementos não foram adicionados ou CSS não carregou

**Solução:**
1. ✅ Verifique se os elementos existem no HTML
2. ✅ Verifique se as classes estão corretas
3. ✅ Inspecione no DevTools se o CSS está sendo aplicado
4. ✅ Verifique se `dist/index.js` está carregado

### **Problema: Paginação não aparece**
**Causa:** Elemento não foi adicionado

**Solução:**
1. ✅ Adicione o elemento `swiper-pagination`
2. ✅ Certifique-se de que está dentro de `swiper is-podcast`
3. ✅ Publique as alterações

---

## 📝 Checklist Final

Antes de considerar a configuração completa, verifique:

- [ ] Estrutura HTML está completa (wrapper + slides + navegação + paginação)
- [ ] Classes estão corretas em todos os elementos
- [ ] Lite-youtube embeds estão dentro dos slides
- [ ] Projeto foi publicado no Webflow
- [ ] `dist/index.js` está sendo carregado no Footer Code
- [ ] Apenas 1 slide aparece por vez
- [ ] Botões de navegação são visíveis e funcionam
- [ ] Paginação é visível e funciona
- [ ] Arrastar/deslizar funciona
- [ ] Teclas de seta funcionam
- [ ] Vídeos pausam ao trocar de slide

---

## 📚 Recursos Adicionais

- [Guia Completo do Swiper](./SWIPER-WEBFLOW-GUIDE.md)
- [Referência Rápida](./SWIPER-QUICK-REFERENCE.md)
- [Exemplos ao Vivo](./swiper-example.html)
- [README do webflow-structure](../webflow-structure/README.md)

---

## 💡 Dica Importante

**Lembre-se:** Todas as alterações na estrutura HTML devem ser feitas no **Webflow Designer**, não nos arquivos de referência em `webflow-structure/`. Esses arquivos são apenas para consulta!

---

**Última Atualização:** 2025-10-17
**Status:** Instruções para correção da estrutura HTML no Webflow


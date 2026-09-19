---
title: "Depurar CSS: como diagnosticar problemas"
description: "Guía para usar as DevTools, analizar a cascada e diagnosticar estilos sobrescritos, problemas de contraste e rendemento."
bloque: 6
capitulo: 28
nivel: intermedio
ultima_revision: "2026-09-18"
estado: "borrador_para_validacion"
compatibilidade: "non_aplicable"
palabras_chave:
  - depuracion
  - devtools
  - inspeccion
  - cascada
  - especificidade
  - estilos_sobrescritos
  - contraste
  - capas
  - rendemento
---

# Capítulo 28: Depurar CSS

> Saber escribir CSS é importante. Saber **por que non funciona** é igual de importante. Este capítulo explica como usar as ferramentas de desenvolvemento do navegador (DevTools) para inspeccionar estilos, entender a cascada, detectar estilos sobrescritos, comprobar contrastes, analizar o rendemento e diagnosticar os problemas máis comúns.

---

## 1. Introdución: CSS falla silenciosamente

A diferenza de JavaScript, CSS **non dá erros**. Se escribes unha propiedade mal, o navegador ignóraa e segue. Se un selector non coincide con nada, non pasa nada. Se un estilo é sobrescrito por outro, non hai aviso.

Isto significa que a meirande parte dos problemas de CSS **non se detectan lendo o código**. Hai que **inspeccionar o que o navegador está a facer**.

**A ferramenta principal** son as **DevTools** (Ferramentas de Desenvolvemento) integradas no navegador. Este capítulo céntrase en Chrome DevTools (as máis usadas), pero Firefox, Safari e Edge teñen ferramentas equivalentes.

> 💡 **Para pensar:** aprender a usar DevTools é tan importante coma aprender CSS. A maioría de persoas que saben CSS ben pasan máis tempo en DevTools ca no editor. É a ferramenta que che di **que está a facer o navegador**, en lugar de **que cres que está a facer**.

---

## 2. Abrir DevTools

- **Windows / Linux:** `F12` ou `Ctrl+Shift+I`.
- **macOS:** `Cmd+Option+I`.
- **Menú:** botón dereito → «Inspeccionar».

A ventá de DevTools ten varias pestanas:

- **Elements** — inspeccionar o DOM e os estilos.
- **Console** — mensaxes de erro (incluídos os de CSS).
- **Sources** — código fonte, puntos de interrupción.
- **Network** — peticións de rede.
- **Performance** — análise de rendemento.
- **Layers** — capas creadas polo navegador.

---

## 3. Inspeccionar estilos

### 3.1 O panel de estilos

Cando seleccionas un elemento na pestana **Elements**, ves na parte dereita o **panel de estilos**:

```css
element.style { }      /* ← estilos en liña */
.c-boton {             /* ← regras que coinciden */
    background: #1a5c8a;
    color: white;
}
button {                /* ← regras de elemento */
    padding: 0.5rem 1rem;
}
```

**Cousas que podes facer:**

- **Ver que regras coinciden.** Aparecen todas as regras que afectan ao elemento, en orde de especificidade.
- **Ver o ficheiro e a liña.** Fai clic no nome do ficheiro para ir ao CSS.
- **Activar/desactivar regras.** Fai clic na casiña á esquerda de cada declaración.
- **Modificar valores.** Fai clic nun valor e escríbeo. Ves o resultado en tempo real.
- **Engadir declaracións.** Fai clic en `element.style` e engade propiedades.

### 3.2 Estilos sobrescritos

Cando unha declaración é sobrescrita por outra, aparece **tachada**:

```css
.c-boton {
    background: #1a5c8a;  /* ← esta gaña */
}

button {
    background: red;        /* ← tachada, sobrescrita */
}
```

Isto é **moi útil** para entender a cascada. Se un estilo non se aplica, mira se está tachado.

### 3.3 A orde dos estilos

O panel de estilos mostra as regras **en orde de prioridade**, de maior a menor:

1. **Estilos en liña** (`style="..."`).
2. **Regras con `!important`.**
3. **Regras normais**, por orde de especificidade e aparición.

Isto axúdache a ver **quen gaña** cando hai conflito.

### 3.4 O modelo de caixa

Cando inspeccionas un elemento, ves un **diagrama visual do modelo de caixa**:

```text
┌─────────────────────────────────┐
│         margin                  │
│  ┌───────────────────────────┐  │
│  │        border             │  │
│  │  ┌─────────────────────┐  │  │
│  │  │      padding        │  │  │
│  │  │  ┌───────────────┐  │  │  │
│  │  │  │    content    │  │  │  │
│  │  │  └───────────────┘  │  │  │
│  │  └─────────────────────┘  │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

Ves os valores de `margin`, `border`, `padding` e `content` en tempo real. Moi útil para entender por que un elemento ocupa o tamaño que ocupa.

---

## 4. Entender a cascada

### 4.1 Ver que regra gaña

Cando hai conflito, DevTools amosa **todas** as regras que afectan ao elemento, coas tachadas. Isto permite ver **exactamente** por que un estilo gaña.

**Exemplo:**

```css
/* Estilos que aparecen en DevTools */
.tarxeta p { color: #666; }       /* ← tachada */
.articulo .texto { color: #333; } /* ← esta gaña */
p { color: #999; }                /* ← tachada */
```

Aquí vese que `.articulo .texto` gaña porque ten maior especificidade ca `.tarxeta p` e ca `p`.

### 4.2 Filtrar por propiedade

Na parte superior do panel de estilos hai un **filtro**. Se escribes `color`, só se mostran as regras que afectan á propiedade `color`. **Moi útil** cando hai moitas regras.

### 4.3 Ver a orixe

Fai clic nunha regra para ir ao ficheiro CSS e á liña. Isto axúdache a atopar rapidamente onde está definido un estilo.

---

## 5. Detectar estilos sobrescritos

### 5.1 O caso típico

Escribes un CSS, abres a páxina, e o estilo **non se aplica**. Non hai erros na consola. Que pasa?

**Causas máis comúns:**

1. **Especificidade.** Outra regra ten maior especificidade.
2. **Orde.** Outra regra aparece despois.
3. **Selección.** O selector non coincide con ningún elemento.
4. **Sintaxe.** Hai un erro de sintaxe antes.
5. **Carga.** O CSS non se cargou (ruta incorrecta, caché).
6. **`!important`.** Outra regra ten `!important`.
7. **Herdanza.** A propiedade non se herda e o elemento non a recibe.

### 5.2 Como diagnosticalo

1. **Abre DevTools** e inspecciona o elemento.
2. **Busca a propiedade no panel.** Se está tachada, hai unha regra que gaña.
3. **Mira a orde das regras.** A que gaña está máis arriba.
4. **Comproba a especificidade.** Se non entende por que gaña, mira as dúas regras.

### 5.3 Exemplo práctico

```css
/* CSS escrito */
.tarxeta p {
    color: red;
}
```

Pero no navegador, o parágrafo vese azul. Inspeccionas e ves:

```css
.articulo p { color: blue; }   ← esta gaña
.tarxeta p { color: red; }     ← tachada
```

**Por que?** Porque `.articulo p` ten a mesma especificidade ca `.tarxeta p` (dúas clases + elemento), pero aparece **despois** no CSS.

**Solución:** cambiar a orde, ou aumentar a especificidade de `.tarxeta p`.

---

## 6. Analizar o rendemento

### 6.1 O panel Performance

A pestana **Performance** permite gravar a actividade do navegador durante uns segundos e ver **onde se perde o tempo**.

**Como usala:**

1. Abre a pestana **Performance**.
2. Fai clic en **Record** (círculo).
3. Interactúa coa páxina (scroll, hover, clic).
4. Fai clic en **Stop**.
5. Analiza o resultado.

**Que buscar:**

- **Layouts longos.** Se a fase de layout dura moito, hai propiedades que provocan recálculo.
- **Pintados longos.** Se o pintado dura moito, hai sombras, filtros ou efectos custosos.
- **Fotogramas caídos.** Se hai fotogramas que duran máis de 16ms, a animación vai a saltos.

### 6.2 O panel Layers

A pestana **Layers** amosa as **capas gráficas** que o navegador creou. Útil para entender que elementos están a usar a GPU.

**Que buscar:**

- **Demasiadas capas.** Cada capa consume memoria. Se hai moitas, pode ser un problema.
- **Elementos con `will-change`.** Se ves moitos, pode ser un problema de memoria.

### 6.3 Comprobar animacións

Cando unha animación vai a saltos:

1. **Comproba se animas propiedades custosas** (`width`, `top`, `left`).
2. **Usa `transform` e `opacity`** sempre que poidas.
3. **Comproba o panel Performance** para ver onde se perde o tempo.

---

## 7. Comprobar contrastes

### 7.1 DevTools e o contraste

Cando inspeccionas un elemento de texto, DevTools amosa o **contraste** entre a cor do texto e a do fondo:

```
Contrast ratio: 4.54 ✓
```

Se o contraste é insuficiente, aparece un aviso.

**Requisitos WCAG:**

- **AA:** 4.5:1 para texto normal, 3:1 para texto grande.
- **AAA:** 7:1 para texto normal, 4.5:1 para texto grande.

### 7.2 Exemplo

Inspecciona un `<p>` con `color: #999` sobre fondo branco. DevTools amosa:

```
Contrast ratio: 2.85 ✗
```

Isto significa que **non pasa AA**. Hai que escurecer o texto.

### 7.3 Ferramentas externas

- **WebAIM Contrast Checker** (https://webaim.org/resources/contrastchecker/).
- **Contrast Ratio** (https://contrast-ratio.com/).

---

## 8. Erros comúns e como diagnosticalos

### 8.1 O estilo non se aplica

**Síntomas:** escribes CSS, gardas, recargas, e o elemento non cambia.

**Diagnóstico:**

1. **Inspecciona o elemento.** Ves o estilo no panel?
2. **Se non aparece**, o selector non coincide. Revisa o HTML e o selector.
3. **Se aparece tachado**, hai outra regra que gaña. Mira cal.
4. **Se aparece pero non se aplica**, pode ser un erro de sintaxe nesa declaración ou nunha anterior.

### 8.2 O layout rompe

**Síntomas:** o layout non é o que esperas.

**Diagnóstico:**

1. **Comproba o modelo de caixa** en DevTools.
2. **Comproba se hai `overflow`** oculto.
3. **Comproba se hai `position: absolute`** ou `float` que sae do fluxo.
4. **Comproba os `width` e `height`** cos valores reais.

### 8.3 A animación vai a saltos

**Síntomas:** a animación non é fluída.

**Diagnóstico:**

1. **Comproba que propiedades animas.** Se animas `width`, `top`, etc., cambia a `transform`.
2. **Abre o panel Performance** e grava durante a animación.
3. **Busca fotogramas longos** (máis de 16ms).

### 8.4 O CSS non se carga

**Síntomas:** non se aplica ningún estilo.

**Diagnóstico:**

1. **Abre o panel Network.** Ves a petición do CSS?
2. **Se non aparece**, revisa a etiqueta `<link>` no HTML.
3. **Se aparece con estado 404**, a ruta é incorrecta.
4. **Se aparece con estado 200**, o CSS cárgase. O problema é outro.

### 8.5 Un elemento desaparece

**Síntomas:** un elemento que debería verse non se ve.

**Diagnóstico:**

1. **Comproba `display: none`** no panel de estilos.
2. **Comproba `visibility: hidden`.**
3. **Comproba `opacity: 0`.**
4. **Comproba se está fóra da pantalla** (`position: absolute` con valores moi grandes).
5. **Comproba o `z-index`** se outros elementos o tapan.

### 8.6 Un elemento ocupa máis do esperado

**Síntomas:** un elemento é máis ancho ou alto do que cres.

**Diagnóstico:**

1. **Comproba o modelo de caixa.** O padding e o border engádense ao `width`.
2. **Comproba `box-sizing`.** Se non é `border-box`, o `width` refírese ao contido.
3. **Comproba se hai `margin` colapsando.**
4. **Comproba se hai `min-width` ou `min-height`** que force un tamaño maior.

### 8.7 Un estilo non se herda

**Síntomas:** esperas que un fillo herde un estilo do pai, pero non o fai.

**Diagnóstico:**

1. **Comproba se a propiedade é heredable.** `color`, `font-family`, `line-height` si. `margin`, `padding`, `border` non.
2. **Comproba se hai unha regra que a sobrescribe.**
3. **Comproba se o fillo ten `all: initial`** ou similar.

---

## 9. Exemplo práctico completo

Imaxina que tes este CSS:

```css
.boton {
    background: blue;
    color: white;
    padding: 1rem;
}

.boton.primario {
    background: red;
}

#boton-enviar {
    background: green;
}
```

E este HTML:

```html
<button id="boton-enviar" class="boton primario">Enviar</button>
```

**Pregunta:** de que cor é o botón?

**Diagnóstico con DevTools:**

1. **Inspecciona o botón.**
2. **No panel de estilos ves:**

```
#boton-enviar { background: green; }      ← esta gaña
.boton.primario { background: red; }      ← tachada
.boton { background: blue; }              ← tachada
```

3. **Por que gaña `#boton-enviar`?** Porque un ID ten maior especificidade ca dúas clases.

**Resposta:** o botón é verde.

---

## 10. Casos habituais na práctica

### 10.1 Depurar un layout con Grid

1. **Inspecciona o contedor de Grid.**
2. **Chrome e Firefox teñen unha vista específica de Grid** que amosa as liñas, as celas e as áreas.
3. **Actívaa** facendo clic na icona de grid ao lado do elemento no panel de Elements.

### 10.2 Depurar un layout con Flexbox

1. **Inspecciona o contedor flex.**
2. **Firefox ten unha vista específica de Flexbox** que amosa os eixes, o `justify-content`, o `align-items`, etc.
3. **Actívaa** facendo clic na icona de flex ao lado do elemento.

### 10.3 Depurar animacións

1. **Abre a pestana Animations** (Chrome).
2. **Interactúa coa páxina** para que se dispare a animación.
3. **Analiza a liña temporal.** Ves a duración, a curva, o estado.

### 10.4 Depurar transicións

1. **Abre a pestana Animations.**
2. **Fai hover** nun elemento con transición.
3. **Analiza a liña temporal.** Ves a duración e a curva.

---

## 11. Compatibilidade (2026)

DevTools está integrado en todos os navegadores modernos. As funcións específicas varían:

- **Chrome DevTools:** as máis completas. Panel de Layers, Animations, Performance.
- **Firefox DevTools:** excelente para Grid e Flexbox. Panel de accesibilidade moi bo.
- **Safari Web Inspector:** menos completo, pero suficiente para uso básico.
- **Edge DevTools:** baseado en Chromium, case idéntico a Chrome.

**Recomendación:** usar Chrome ou Firefox para depurar CSS.

---

## 12. Exercicios

### Exercicio 1: Diagnóstico básico

Dado este CSS:

```css
p { color: blue; }
.destacado { color: red; }
```

E este HTML:

```html
<p class="destacado">Texto</p>
```

De que cor é o texto? Usa DevTools para comprobalo.

<details>
<summary><b>Amosar a solución</b></summary>


Vermello, porque `.destacado` ten maior especificidade ca `p`.

</details>

### Exercicio 2: Estilo sobrescrito

Dado este CSS:

```css
.boton { background: blue; }
.boton { background: red; }
```

De que cor é o botón? Por que?

<details>
<summary><b>Amosar a solución</b></summary>


Vermello, porque a segunda regra aparece despois e ten a mesma especificidade. En DevTools, a primeira aparece tachada.

</details>

### Exercicio 3: Contraste

Dado este CSS:

```css
p {
    color: #999;
    background: #fff;
}
```

Pasa o nivel AA? Como o comprobarías?

<details>
<summary><b>Amosar a solución</b></summary>


Non pasa AA. O contraste é 2.85:1, e AA require 4.5:1. Compróbase en DevTools (que amosa o ratio) ou en WebAIM Contrast Checker.

</details>

---

## 13. Para profundar

- **Chrome DevTools:** [CSS documentation](https://developer.chrome.com/docs/devtools/css) — guía oficial.
- **Firefox DevTools:** [CSS](https://firefox-source-docs.mozilla.org/devtools-user/page_inspector/how_to/examine_and_edit_css/index.html) — guía oficial.
- **MDN Web Docs:** [What are browser developer tools?](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Tools_and_setup/What_are_browser_developer_tools) — introdución.
- **WebAIM:** [Contrast Checker](https://webaim.org/resources/contrastchecker/) — ferramenta.

---

## 14. Referencias cruzadas

- **Capítulo 3: Selectores básicos** — a especificidade que se ve en DevTools.
- **Capítulo 5: Modelo de caixa** — o diagrama de caixa en DevTools.
- **Capítulo 23: `@layer`, `@scope`, `@supports`** — como a cascada se ve en DevTools.
- **Capítulo 26: Rendemento e boas prácticas** — o panel Performance.
- **Capítulo 28: Accesibilidade** — o contraste.

---

**Data de creación:** 2026-09-18  
**Última revisión:** 2026-09-18  
**Estado:** Borrador para validación
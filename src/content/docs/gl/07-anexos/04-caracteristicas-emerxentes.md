---
title: "Características emerxentes (2026)"
description: "Panorama das características CSS emerxentes en 2026, co seu estado de compatibilidade, usos e recomendacións."
bloque: 7
capitulo: 30
nivel: referencia
ultima_revision: "2026-09-17"
estado: "borrador_para_validacion"
compatibilidade: "non_aplicable"
palabras_chave:
  - caracteristicas_emerxentes
  - CSS_futuro
  - experimental
  - baseline_futuro
  - roadmap
  - novas_caracteristicas
---

<!-- # Características emerxentes (2026) -->

> CSS evoluciona constantemente. Cada ano aparecen características novas que **aínda non están en Baseline** (é dicir, non están soportadas por todos os navegadores modernos), pero que están en camiño. Este anexo recolle as máis relevantes a setembro de 2026, co seu estado, os seus casos de uso, e recomendacións de uso.

**Importante:** as características deste anexo **non se deben usar en produción** sen unha estratexia de mellora progresiva (`@supports`) ou un fallback. Están aquí para que as coñezas e poidas planificar a súa adopción cando estean listas.
Lembra comprobar en [caniuse.com](https://caniuse.com) cal é o estado actual daquelas características emerxentes que che interesen.

---

### 1. Como ler este anexo

Cada característica ten:

- **Nome** e sintaxe básica.
- **Estado** (que navegadores a soportan).
- **Que resolve.**
- **Cando usala.**
- **Ligazón a Baseline** para consultar o estado actual.

**Estados posibles:**

- **Baseline recente:** soportada pola maioría de navegadores modernos, pero pode haber usuarios con navegadores antigos.
- **En camiño:** soportada por algúns navegadores, pero non por todos.
- **Experimental:** só nun ou dous navegadores, normalmente con prefixo ou bandeira.
- **Borrador:** en fase de discusión, sen implementación en navegadores.

---

### 2. A función `if()`

**Sintaxe:**

```css
.elemento {
    propiedade: if(<condición>: <valor>; else: <valor>);
}
```

**Que resolve:** escribir condicións (media queries, `@supports`, consultas de estilo) **dentro dun valor**, sen necesidade de regras separadas.

**Estado en 2026:**

- Chrome/Edge 137+ (xullo de 2025).
- Firefox: **non**.
- Safari: **non**.
- **Baseline:** non.

**Cando usar:** en experimentación e prototipos. **Non en produción** con público amplo.

**Ligazón:** https://developer.mozilla.org/en-US/docs/Web/CSS/if

---

### 3. `interpolate-size: allow-keywords` e `calc-size()`

**Sintaxe:**

```css
:root {
    interpolate-size: allow-keywords;
}

.elemento {
    height: calc-size(auto, size + 2rem);
}
```

**Que resolve:** animar a `height: auto` e outras palabras clave (`min-content`, `max-content`). Resolve un problema histórico de CSS.

**Estado en 2026:**

- `interpolate-size`: Chrome/Edge 129+ (setembro de 2024). Firefox e Safari **non**.
- `calc-size()`: Chrome/Edge.
- **Baseline:** non.

**Cando usar:** cun fallback (por exemplo, `max-height` cun valor fixo). Aplicar con `@supports`.

**Ligazón:** https://developer.mozilla.org/en-US/docs/Web/CSS/interpolate-size

---

### 4. CSS Anchor Positioning

**Sintaxe:**

```css
[popovertarget] {
    anchor-name: --boton;
}

[popover] {
    position-anchor: --boton;
    top: anchor(bottom);
    left: anchor(left);
}
```

**Que resolve:** posicionar elementos **respecto a outros elementos**, sen JavaScript. Moi útil para tooltips, menús, popovers, dropdowns.

**Estado en 2026:**

- Chrome/Edge 125+ (maio de 2024).
- Safari 26+.
- Firefox: **aínda non de forma completa**.
- **Baseline:** recente.

**Cando usar:** en combinación con Popover API. Cun fallback (por exemplo, posición fixa ou centrada).

**Ligazón:** https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning

---

### 5. View Transitions cross-document (Firefox)

**Sintaxe:**

```css
@view-transition {
    navigation: auto;
}
```

**Que resolve:** transicións suaves entre páxinas distintas (MPA). **Xa explicado no Cap. 19.**

**Estado en 2026:**

- Chrome/Edge 126+.
- Safari 18.2+.
- Firefox: **aínda non**.
- **Baseline:** parcial.

**Cando usar:** pódese usar, pero hai que asegurar que a navegación funcione **sen transición** en Firefox.

**Ligazón:** https://developer.mozilla.org/en-US/docs/Web/CSS/@view-transition

---

### 6. Element-scoped view transitions

O seu propósito non é activar o alcance, senón evitar colisións de nomes (`view-transition-name`) cando se usan transicións globais normais (`document.startViewTransition`). Permite que un elemento pai "intercepte" e faga visibles os nomes de transición dos seus fillos só dentro do seu propio subárvore, evitando que entren en conflito con outros compoñentes idénticos da páxina.

O seu valor inicial por defecto é `none`.

**Sintaxe:**
A súa sintaxe acepta un identificador personalizado (<custom-ident>) ou none:

```css
.compoñente-pai {
  view-transition-scope: --o-meu-alcance;
}
```

**Que resolve:** transicións con **alcance de elemento**, que permiten múltiples transicións simultáneas e aniñadas. **É unha evolución da View Transitions API.**

**Estado en 2026:**

- Chrome 147+ (marzo de 2026).
- **Experimental.**

**Cando usar:** só en experimentación.

**Ligazón:** https://developer.chrome.com/docs/web-platform/view-transitions

---

### 7. `masonry` layout

**Sintaxe:**

```css
.contenedor {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: masonry;
}
```

**Que resolve:** layout tipo Pinterest, onde os elementos se apilan verticalmente **coa súa altura natural**, sen aliñación entre filas.

**Estado en 2026:**

- Chrome/Edge: **con bandeira experimental**.
- Firefox: **con bandeira experimental**.
- Safari: **non**.
- **Baseline:** non.

**Cando usar:** aínda non en produción. Hai alternativas con JavaScript (Masonry.js, Isotope).

**Ligazón:** https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Masonry_layout

---

### 8. `text-box-trim` e `text-box-edge`

**Sintaxe:**

```css
h1 {
    text-box-trim: trim-both;
    text-box-edge: cap alphabetic;
}
```

**Que resolve:** eliminar o espazo baleiro **por riba e por debaixo** do texto, que vén dos ascendentes e descendentes da fonte. Moi útil para aliñación vertical precisa en compoñentes.

**Estado en 2026:**

- Chrome/Edge 133+.
- Safari 18.2+.
- Firefox: **non**.
- **Baseline:** non.

**Cando usar:** cun fallback (por exemplo, axustes manuais de `padding` ou `line-height`).

**Ligazón:** https://developer.mozilla.org/en-US/docs/Web/CSS/text-box-trim

---

### 9. Consultas de estilo con `@container style()`

**Sintaxe:**

```css
@container style(--tema: escuro) {
    .tarxeta {
        background: #1a1a1a;
    }
}
```

**Que resolve:** aplicar estilos segundo o **valor dunha variable CSS** nun contedor.

**Estado en 2026:**

- Chrome/Edge 111+.
- Safari 18+.
- Firefox: **en camiño** (parcial).
- **Baseline:** parcial.

**Cando usar:** en combinación con variables CSS para temas e variantes de compoñentes.

**Ligazón:** https://developer.mozilla.org/en-US/docs/Web/CSS/@container

---

### 10. `@scope` (matices de compatibilidade)

**Sintaxe:**

```css
@scope (.tarxeta) to (.tarxeta-aniñada) {
    /* ... */
}
```

**Que resolve:** illamento de estilos. **Xa explicado no Cap. 23.**

**Estado en 2026:**

- Chrome/Edge 118+.
- Safari 17.4+.
- Firefox: **aínda non completo**.
- **Baseline:** parcial.

**Cando usar:** con `@supports` cando se quere garantir compatibilidade. **Nota:** `@scope` está en Baseline, pero algunhas combinacións avanzadas aínda non están universalmente soportadas.

**Ligazón:** https://developer.mozilla.org/en-US/docs/Web/CSS/@scope

---

### 11. `light-dark()`

**Sintaxe:**

```css
body {
    color: light-dark(#333333, #e0e0e0);
    background: light-dark(#ffffff, #1a1a1a);
}
```

**Que resolve:** escribir un valor que se adapta automaticamente ao tema claro ou escuro, **sen media queries**.

**Estado en 2026:**

- Chrome/Edge 123+.
- Safari 17.5+.
- Firefox 120+.
- **Baseline:** desde 2024.

**Cando usar:** en proxectos que ofrecen tema claro e escuro. Cun fallback se é necesario.

**Ligazón:** https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark

---

### 12. `@property` (variables CSS con tipo)

**Sintaxe:**

```css
@property --rotacion {
    syntax: "<angle>";
    initial-value: 0deg;
    inherits: false;
}
```

**Que resolve:** declarar variables CSS **con tipo**, o que permite:

- Validar valores.
- **Animar variables** (sen tipo, non se poden animar).
- Definir valor inicial.

**Estado en 2026:**

- Chrome/Edge 85+.
- Safari 16.4+.
- Firefox 128+.
- **Baseline:** desde 2024.

**Cando usar:** cando se necesitan animar variables CSS ou validar valores.

**Ligazón:** https://developer.mozilla.org/en-US/docs/Web/CSS/@property

---

### 13. `field-sizing: content`

**Sintaxe:**

```css
textarea {
    field-sizing: content;
}
```

**Que resolve:** facer que os campos de formulario **medren automaticamente** co contido, sen JavaScript.

**Estado en 2026:**

- Chrome/Edge 123+.
- Firefox: **non**.
- Safari: **non**.
- **Baseline:** non.

**Cando usar:** cun fallback (por exemplo, `rows` fixo). En experimentación.

**Ligazón:** https://developer.mozilla.org/en-US/docs/Web/CSS/field-sizing

---

### 14. `scrollbar-color` e `scrollbar-width`

**Sintaxe:**

```css
:root {
    scrollbar-color: #1a5c8a #f0f0f0;
    scrollbar-width: thin;
}
```

**Que resolve:** estilizar as barras de scroll **sen `::-webkit-scrollbar`** (que só funciona en Chrome/Safari). Estas propiedades son estándar.

**Estado en 2026:**

- Chrome/Edge 121+.
- Firefox 64+ (desde hai anos).
- Safari 18.2+.
- **Baseline:** desde 2024.

**Cando usar:** con normalidade. Cun fallback para navegadores antigos.

**Ligazón:** https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-color

---

### 15. Táboa resumo

| Característica                  | Estado                | Recomendación      |
| ------------------------------- | --------------------- | ------------------ |
| `if()`                          | Non Baseline          | Experimental       |
| `interpolate-size`              | Non Baseline          | Con `@supports`    |
| CSS Anchor Positioning          | Baseline recente      | Cun fallback       |
| View Transitions cross-document | Parcial (sen Firefox) | Cun fallback       |
| Element-scoped view transitions | Experimental          | Só experimentación |
| `masonry` layout                | Experimental          | Con JS             |
| `text-box-trim`                 | Non Baseline          | Cun fallback       |
| Consultas de estilo             | Parcial               | Con `@supports`    |
| `@scope` (avanzado)             | Parcial               | Con `@supports`    |
| `light-dark()`                  | Baseline 2024         | Uso normal         |
| `@property`                     | Baseline 2024         | Uso normal         |
| `field-sizing`                  | Non Baseline          | Con `@supports`    |
| `scrollbar-color`               | Baseline 2024         | Uso normal         |

---

### 16. Como detectar o soporte

**En CSS:** `@supports`

```css
@supports (interpolate-size: allow-keywords) {
    /* estilos só se está soportado */
}
```

**En JavaScript:** `CSS.supports()`

```javascript
if (CSS.supports('interpolate-size', 'allow-keywords')) {
    // aplicar
}
```

**Ligazón de referencia:** [web.dev/baseline](https://web.dev/baseline)

---

### 17. Estratexia de adopción

Cando unha característica está en camiño, hai tres estratexias posibles:

1. **Esperar.** Non usala ata que estea en Baseline. É a opción máis segura, pero pode significar renunciar a melloras.

2. **Usar con `@supports`.** Aplicala só onde está soportada, e usar un fallback no resto. É a opción recomendada cando a característica é unha mellora, non un requisito.

3. **Usar con polyfill.** Cargar unha libraría de JavaScript que emula a característica en navegadores antigos. Útil cando a característica é esencial.

**Recomendación xeral:** **Opción 2** (`@supports`) sempre que sexa posible. Reservar a opción 3 para casos moi concretos.

---

**Data de creación:** 2026-09-17  
**Última revisión:** 2026-09-17  
**Estado:** Borrador para validación
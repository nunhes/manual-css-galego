---
title: "Compoñentes nativos — dialog e Popover API"
description: "Guía para empregar e estilizar `<dialog>` e a Popover API con accesibilidade, foco e comportamento nativos."
bloque: 6
capitulo: 25
nivel: avanzado
ultima_revision: "2026-09-17"
estado: "borrador_para_validacion"
compatibilidade: "baseline_2023"
palabras_chave:
  - dialog
  - popover_api
  - componentes_nativos
  - accesibilidade
  - modal
  - tooltip
  - menu
  - starting_style
  - transition_behavior
---

<!-- # Capítulo 25: Compoñentes nativos — `<dialog>` e Popover API -->

> CSS moderno permite estilizar **compoñentes nativos** que antes requirían JavaScript e librarías externas: **`<dialog>`** (para diálogos modais) e a **Popover API** (para elementos flotantes como menús e tooltips). Estes compoñentes veñen con **accesibilidade integrada**, xestión de foco, peche con Escape, e moito máis. Este capítulo explica como se estruturan, como se estilizan, e como se animan usando `@starting-style` e `transition-behavior: allow-discrete` (vistos no Cap. 18).

---

## 1. Introdución: por que usar compoñentes nativos

Durante anos, para crear un **diálogo modal** ou un **popover**, había que:

1. Crear un `<div>` con posición fixa.
2. Xestionar manualmente a apertura e o peche con JavaScript.
3. Xestionar o foco (que non se poida tabular fóra do diálogo).
4. Xestionar o peche con Escape.
5. Xestionar o `aria-modal`, `role="dialog"`, etc.
6. Xestionar a superposición (que non se poida facer clic detrás).
7. Xestionar a devolución do foco ao pechar.

Isto son moitas cousas, e é moi doado esquecer algunha. O resultado son diálogos e popovers inaccesibles, que non se pechan con Escape, ou que deixan o foco perdido.

**CSS e HTML modernos resolven isto** con dous compoñentes nativos:

- **`<dialog>`:** o elemento nativo para diálogos modais e non modais.
- **Popover API:** o conxunto de atributos para crear popovers nativos.

Estes compoñentes xestionan **automaticamente** todo o comportamento: foco, peche, accesibilidade, superposición. A persoa que programa só ten que estilizalos.

> 💡 **Para pensar:** usar compoñentes nativos non é só unha cuestión de comodidade. É unha cuestión de **accesibilidade**. Os compoñentes nativos son accesibles por defecto, mentres que os compoñentes feitos a man adoitan ter problemas que requiren moito traballo para resolver. Sempre que exista un compoñente nativo axeitado, hai que usalo.

---

## 2. O elemento `<dialog>`

### 2.1 Que é `<dialog>`

`<dialog>` é un elemento HTML que representa un **diálogo** ou unha **ventá modal**. Ten dúas formas de apertura:

- **Non modal:** `dialog.show()`. O diálogo aparece, pero a persoa pode seguir interactuando co resto da páxina.
- **Modal:** `dialog.showModal()`. O diálogo aparece **enriba** dun fondo escuro (`::backdrop`), e a persoa **non pode interactuar** co resto da páxina mentres estea aberto.

**Importante:** o diálogo **non se amosa** por defecto. Hai que chamar a un dos dous métodos de apertura.

### 2.2 Estrutura básica

```html
<dialog id="meu-dialogo">
    <h2>Título do diálogo</h2>
    <p>Contido do diálogo.</p>
    <form method="dialog">
        <button>Pechar</button>
    </form>
</dialog>

<button id="abrir">Abrir diálogo</button>
```

**Nota:** o `<form method="dialog">` **pecha o diálogo automaticamente** ao enviar o formulario. Non require JavaScript.

### 2.3 Apertura e peche

**Con JavaScript:**

```javascript
const dialogo = document.getElementById('meu-dialogo');
const abrir = document.getElementById('abrir');

abrir.addEventListener('click', () => {
    dialogo.showModal();   // modal
    // dialogo.show();     // non modal
});
```

**Peche:**

```javascript
dialogo.close();              // peche normal
dialogo.close('resultado');   // peche con valor
```

**Peche automático:**

- Premendo **Escape**.
- Enviando un `<form method="dialog">`.
- Chamando a `dialogo.close()`.

### 2.4 Estilización básica

```css
dialog {
    border: none;
    border-radius: 12px;
    padding: 2rem;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}
```

**Puntos a ter en conta:**

- **`border: none;`** — os diálogos teñen un bordo por defecto.
- **`padding`** — o diálogo non ten padding por defecto.
- **`max-width` e `width`** — o diálogo non ten ancho definido; hai que definilo.

### 2.5 `::backdrop`

O **`::backdrop`** é o pseudo-elemento que estiliza o **fondo escuro detrás dun diálogo modal**:

```css
dialog::backdrop {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
}
```

**Nota:** `::backdrop` só existe cando o diálogo está aberto con `showModal()`. Se se abre con `show()`, non hai `::backdrop`.

### 2.6 Animación de apertura e peche

Para animar un diálogo, hai que combinar `@starting-style` e `transition-behavior: allow-discrete` (vistos no Cap. 18):

```css
dialog {
    display: none;
    opacity: 0;
    transform: scale(0.9);

    transition:
        display 0.3s allow-discrete,
        overlay 0.3s allow-discrete,
        opacity 0.3s ease-out,
        transform 0.3s ease-out;
}

dialog[open] {
    display: block;
    opacity: 1;
    transform: scale(1);
}

@starting-style {
    dialog[open] {
        opacity: 0;
        transform: scale(0.9);
    }
}
```

**Que ocorre aquí:**

1. **`display: none`** cando está pechado. Isto é o estado por defecto.
2. **`transition`** inclúe `display` con `allow-discrete`, o que fai que a transición se execute aínda que `display` cambie.
3. **`@starting-style`** define o estado inicial da apertura (`opacity: 0`, `scale: 0.9`).
4. **`dialog[open]`** é o estado aberto. Aplícase cando o atributo `open` está presente.

**Resultado:** o diálogo aparece gradualmente con opacidade e escala.

### 2.7 Estilización accesible

**Recomendacións:**

- **Contraste:** o texto do diálogo debe ter contraste suficiente co fondo.
- **Foco visible:** os elementos do diálogo deben ter foco visible.

```css
dialog button:focus-visible {
    outline: 3px solid #1a5c8a;
    outline-offset: 2px;
}
```

- **Tamaño de toque:** os botóns deben ter polo menos 44×44px.

### 2.8 Exemplo mínimo funcional

**Arquivo HTML:**

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Diálogo nativo</title>
    <link rel="stylesheet" href="estilos/dialogo.css">
</head>
<body>
    <main class="contido">
        <h1>Diálogos nativos</h1>

        <button id="abrir" class="boton">Abrir diálogo</button>

        <dialog id="meu-dialogo" class="dialogo">
            <h2>Un diálogo modal</h2>
            <p>Este diálogo xestiona automaticamente o foco, o peche con Escape, e o fondo escuro.</p>
            <form method="dialog">
                <button class="boton">Pechar</button>
            </form>
        </dialog>
    </main>

    <script>
        const dialogo = document.getElementById('meu-dialogo');
        const abrir = document.getElementById('abrir');

        abrir.addEventListener('click', () => {
            dialogo.showModal();
        });
    </script>
</body>
</html>
```

**Arquivo CSS:**

```css
/* ==============================
   Reset
   ============================== */
*, *::before, *::after {
    box-sizing: border-box;
}

* {
    margin: 0;
    padding: 0;
}

body {
    font-family: system-ui, sans-serif;
    line-height: 1.6;
    background: #fafafa;
    color: #333;
    padding: 2rem;
}

.contido {
    max-width: 600px;
    margin: 0 auto;

    h1 {
        font-size: clamp(1.5rem, 1rem + 2vw, 2rem);
        color: #1a5c8a;
        margin-bottom: 2rem;
    }
}

.boton {
    padding: 0.75rem 1.5rem;
    background: #1a5c8a;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;

    &:focus-visible {
        outline: 3px solid #1a5c8a;
        outline-offset: 2px;
    }
}

/* ==============================
   Diálogo
   ============================== */
.dialogo {
    /* Estado pechado */
    display: none;
    opacity: 0;
    transform: scale(0.9);

    /* Estilos visuais */
    border: none;
    border-radius: 12px;
    padding: 2rem;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

    /* Transición */
    transition:
        display 0.4s allow-discrete,
        overlay 0.4s allow-discrete,
        opacity 0.3s ease-out,
        transform 0.3s ease-out;

    h2 {
        color: #1a5c8a;
        margin-bottom: 1rem;
        font-size: 1.25rem;
    }

    p {
        color: #666;
        margin-bottom: 1.5rem;
    }
}

.dialogo[open] {
    display: block;
    opacity: 1;
    transform: scale(1);
}

@starting-style {
    .dialogo[open] {
        opacity: 0;
        transform: scale(0.9);
    }
}

/* ==============================
   Fondo escuro
   ============================== */
.dialogo::backdrop {
    background: rgba(0, 0, 0, 0);
    transition:
        display 0.4s allow-discrete,
        overlay 0.4s allow-discrete,
        background 0.4s ease-out;
}

.dialogo[open]::backdrop {
    background: rgba(0, 0, 0, 0.5);
}

@starting-style {
    .dialogo[open]::backdrop {
        background: rgba(0, 0, 0, 0);
    }
}

/* ==============================
   Accesibilidade
   ============================== */
@media (prefers-reduced-motion: reduce) {
    .dialogo,
    .dialogo::backdrop {
        transition: none;
    }
}
```

---

## 3. A Popover API

### 3.1 Que é a Popover API

A **Popover API** permite crear **popovers** (elementos flotantes que aparecen por riba do contido) usando **atributos HTML**, sen JavaScript para o comportamento básico.

**Diferenza con `<dialog>`:**

- **`<dialog>`** é un **elemento**. Representa un diálogo.
- **Popover** é un **atributo** (`popover`). Pódese aplicar a **calquera elemento**.

**Diferenza de comportamento:**

- Os diálogos modais **bloquean** a interacción co resto da páxina.
- Os popovers **non bloquean**: a persoa pode seguir interactuando co resto.

### 3.2 Atributos básicos

```html
<button popovertarget="meu-popover">Abrir popover</button>

<div popover id="meu-popover">
    <p>Contido do popover.</p>
    <button popovertarget="meu-popover" popovertargetaction="hide">Pechar</button>
</div>
```

**Atributos:**

- **`popover`** no elemento flotante: activa o comportamento de popover.
- **`popovertarget="id"`** no botón: indica que elemento se abre/pecha.
- **`popovertargetaction="show|hide|toggle"`** no botón: indica que acción se fai. Por defecto, `toggle`.

**Valores de `popover`:**

- **`auto`** (por defecto): o popover péchase ao facer clic fóra ou ao premer Escape.
- **`manual`**: o popover non se pecha automaticamente. Hai que chamar a `hidePopover()`.
- **`hint`**: variante máis recente, para popovers que se amosan por «suxestión» (tooltips).

### 3.3 Estilización

```css
[popover] {
    border: none;
    border-radius: 8px;
    padding: 1rem;
    background: white;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    max-width: 300px;
}
```

**Nota:** os popovers veñen cun bordo por defecto. Hai que eliminalo con `border: none`.

### 3.4 `:popover-open`

A pseudo-clase **`:popover-open`** aplícase só cando o popover está **aberto**:

```css
[popover] {
    opacity: 0;
    transform: translateY(-10px);
    transition: opacity 0.2s, transform 0.2s, overlay 0.2s allow-discrete, display 0.2s allow-discrete;
}

[popover]:popover-open {
    opacity: 1;
    transform: translateY(0);
}

@starting-style {
    [popover]:popover-open {
        opacity: 0;
        transform: translateY(-10px);
    }
}
```

### 3.5 Posicionamento

Por defecto, os popovers aparecen **centrados** na ventá. Para posicionalos xunto ao elemento que os abre, hai que usar **CSS Anchor Positioning** (característica emerxente) ou `position: absolute` con JavaScript.

**Exemplo con Anchor Positioning (emergente):**

```css
[popovertarget] {
    anchor-name: --boton;
}

[popover] {
    position-anchor: --boton;
    position: absolute;
    top: anchor(bottom);
    left: anchor(left);
}
```

**Nota:** Anchor Positioning está en Baseline **recente** (2024-2025). Comproba o estado actual antes de usalo en produción.

#### 3.6 Exemplo mínimo funcional

**Arquivo HTML:**

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Popover nativo</title>
    <link rel="stylesheet" href="estilos/popover.css">
</head>
<body>
    <main class="contido">
        <h1>Popovers nativos</h1>

        <button popovertarget="info" class="boton">
            Máis información
        </button>

        <div popover id="info" class="popover">
            <h2>Información</h2>
            <p>Este popover xestiona automaticamente o foco, o peche con Escape, e o peche ao facer clic fóra.</p>
            <button popovertarget="info" popovertargetaction="hide" class="boton">
                Pechar
            </button>
        </div>
    </main>
</body>
</html>
```

**Arquivo CSS:**

```css
/* ==============================
   Reset
   ============================== */
*, *::before, *::after {
    box-sizing: border-box;
}

* {
    margin: 0;
    padding: 0;
}

body {
    font-family: system-ui, sans-serif;
    line-height: 1.6;
    background: #fafafa;
    color: #333;
    padding: 2rem;
}

.contido {
    max-width: 600px;
    margin: 0 auto;

    h1 {
        font-size: clamp(1.5rem, 1rem + 2vw, 2rem);
        color: #1a5c8a;
        margin-bottom: 2rem;
    }
}

.boton {
    padding: 0.75rem 1.5rem;
    background: #1a5c8a;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;

    &:focus-visible {
        outline: 3px solid #1a5c8a;
        outline-offset: 2px;
    }
}

/* ==============================
   Popover
   ============================== */
.popover {
    /* Estado pechado */
    display: none;
    opacity: 0;
    transform: translateY(-10px);

    /* Estilos visuais */
    border: none;
    border-radius: 12px;
    padding: 1.5rem;
    background: white;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    max-width: 320px;

    /* Transición */
    transition:
        display 0.3s allow-discrete,
        overlay 0.3s allow-discrete,
        opacity 0.3s,
        transform 0.3s;

    h2 {
        color: #1a5c8a;
        margin-bottom: 0.75rem;
        font-size: 1.125rem;
    }

    p {
        color: #666;
        margin-bottom: 1rem;
        font-size: 0.95rem;
    }
}

.popover:popover-open {
    display: block;
    opacity: 1;
    transform: translateY(0);
}

@starting-style {
    .popover:popover-open {
        opacity: 0;
        transform: translateY(-10px);
    }
}

/* ==============================
   Accesibilidade
   ============================== */
@media (prefers-reduced-motion: reduce) {
    .popover {
        transition: none;
    }
}
```

---

## 4. Casos habituais na práctica

### 4.1 Diálogo de confirmación

```html
<dialog id="confirmar">
    <h2>Confirmar acción</h2>
    <p>Estás segura ou seguro de que queres continuar?</p>
    <form method="dialog">
        <button value="cancelar">Cancelar</button>
        <button value="confirmar">Confirmar</button>
    </form>
</dialog>
```

```javascript
const dialogo = document.getElementById('confirmar');
dialogo.showModal();

dialogo.addEventListener('close', () => {
    if (dialogo.returnValue === 'confirmar') {
        // acción confirmada
    }
});
```

### 4.2 Menú despregable

```html
<button popovertarget="menu">Menú</button>
<ul popover id="menu">
    <li><a href="#">Inicio</a></li>
    <li><a href="#">Cursos</a></li>
    <li><a href="#">Contacto</a></li>
</ul>
```

### 4.3 Tooltip

```html
<button popovertarget="tooltip">?</button>
<div popover="hint" id="tooltip">
    Isto é unha axuda contextual.
</div>
```

### 4.4 Tarxeta de produto

```html
<button popovertarget="produto">Ver detalles</button>
<div popover id="produto">
    <h3>Nome do produto</h3>
    <p>Descrición e prezo.</p>
</div>
```

### 4.5 Combinación con `@starting-style` e `allow-discrete`

Xa o vimos. É o patrón estándar para animar diálogos e popovers.

### 4.6 `dialog` non modal

```javascript
dialogo.show();   // non modal
```

Útil para diálogos que non bloquean a interacción.

---

## 5. Erros frecuentes

### 5.1 Esquecer `method="dialog"` no formulario

```html
<!-- Mal: o formulario envía e recarga a páxina -->
<form>
    <button>Pechar</button>
</form>

<!-- Ben: o formulario pecha o diálogo -->
<form method="dialog">
    <button>Pechar</button>
</form>
```

### 5.2 Usar `<div>` en lugar de `<dialog>` para modais

```html
<!-- Mal: hai que xestionar todo manualmente -->
<div role="dialog" aria-modal="true">
    <!-- ... -->
</div>

<!-- Ben: usar o elemento nativo -->
<dialog>
    <!-- ... -->
</dialog>
```

### 5.3 Esquecer `@starting-style`

Xa o vimos no Cap. 18. Sen `@starting-style`, o diálogo non se anima ao abrir.

### 5.4 Non respectar `prefers-reduced-motion`

Os diálogos e popovers tamén se deben animar menos cando a persoa o prefire.

### 5.5 Non dar estilos ao `::backdrop`

Sen estilos, o `::backdrop` ten unha cor por defecto que pode non encaixar co deseño.

```css
dialog::backdrop {
    background: rgba(0, 0, 0, 0.5);
}
```

### 5.6 Usar `popover` sen `popovertarget`

```html
<!-- Mal: o botón non sabe que popover abrir -->
<button>Abrir</button>
<div popover id="meu-popover">...</div>

<!-- Ben -->
<button popovertarget="meu-popover">Abrir</button>
<div popover id="meu-popover">...</div>
```

### 5.7 Non comprobar o soporte en JavaScript

```javascript
/* Mal: se non hai soporte, isto dá erro */
dialogo.showModal();
```

**Solución:** comprobar antes:

```javascript
if (typeof dialogo.showModal === 'function') {
    dialogo.showModal();
}
```

### 5.8 Non usar `:popover-open` para estilos

```css
/* Mal: o popover vese sempre, aínda que estea pechado */
[popover] {
    background: white;
}

/* Ben: só se ve cando está aberto */
[popover]:popover-open {
    background: white;
}
```

---

## 6. Compatibilidade (2026)

| Característica                        | Estado                       |
| ------------------------------------- | ---------------------------- |
| `<dialog>`                            | Baseline desde 2022          |
| `dialog.showModal()`                  | Baseline desde 2022          |
| `::backdrop`                          | Universal desde 2022         |
| Popover API                           | Baseline desde 2024          |
| `:popover-open`                       | Baseline desde 2024          |
| `@starting-style`                     | Baseline desde 2024-2026     |
| `transition-behavior: allow-discrete` | Baseline desde 2024          |
| CSS Anchor Positioning                | Baseline recente (2024-2025) |

**Recomendación:** todos estes compoñentes están listos para usar en 2026.

---

## 7. Exercicios

### Exercicio 1: Diálogo básico

Crea un `<dialog>` cun título, un parágrafo e un botón de peche. Engade o JavaScript mínimo para abrilo.

<details>
<summary><b>Amosar a solución</b></summary>

```html
<dialog id="meu-dialogo">
    <h2>Título</h2>
    <p>Contido.</p>
    <form method="dialog">
        <button>Pechar</button>
    </form>
</dialog>

<button id="abrir">Abrir</button>

<script>
    document.getElementById('abrir').addEventListener('click', () => {
        document.getElementById('meu-dialogo').showModal();
    });
</script>
```

</details>


### Exercicio 2: Estilizar o backdrop

Escribe CSS para que o `::backdrop` dun diálogo teña un fondo negro ao 50% de opacidade e un desenfoque de 4px.

<details>
<summary><b>Amosar a solución</b></summary>

```css
dialog::backdrop {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
}
```

</details>


### Exercicio 3: Popover

Crea un popover cun botón que o abra e outro que o peche.

<details>
<summary><b>Amosar a solución</b></summary>

```html
<button popovertarget="info">Abrir</button>
<div popover id="info">
    <p>Contido.</p>
    <button popovertarget="info" popovertargetaction="hide">Pechar</button>
</div>
```

</details>


### Exercicio 4: Animar un diálogo

Escribe CSS para que un diálogo apareza cunha animación de opacidade e escala.

<details>
<summary><b>Amosar a solución</b></summary>

```css
dialog {
    display: none;
    opacity: 0;
    transform: scale(0.9);
    transition:
        display 0.3s allow-discrete,
        opacity 0.3s,
        transform 0.3s;
}

dialog[open] {
    display: block;
    opacity: 1;
    transform: scale(1);
}

@starting-style {
    dialog[open] {
        opacity: 0;
        transform: scale(0.9);
    }
}
```

</details>


### Exercicio 5: Detectar o erro

```html
<div role="dialog" aria-modal="true">
    <h2>Título</h2>
    <button onclick="pechar()">Pechar</button>
</div>
```

Que problema ten este código?

<details>
<summary><b>Amosar a solución</b></summary>

Está a usar un `<div>` con `role="dialog"` en lugar do elemento nativo `<dialog>`. Isto require xestionar manualmente o foco, o peche con Escape, a superposición, etc. **Solución:** usar `<dialog>`:

```html
<dialog>
    <h2>Título</h2>
    <form method="dialog">
        <button>Pechar</button>
    </form>
</dialog>
```

</details>

---

## 8. Para profundar

- **MDN Web Docs:** [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) — referencia do elemento.
- **MDN Web Docs:** [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) — referencia da API.
- **MDN Web Docs:** [`::backdrop`](https://developer.mozilla.org/en-US/docs/Web/CSS/::backdrop) — referencia do pseudo-elemento.
- **web.dev:** [Dialogs and popovers](https://web.dev/learn/html/dialog) — guía de Google.
- **web.dev:** [Popover API](https://developer.chrome.com/docs/web-platform/popover-api) — documentación oficial.
- **CSS-Tricks:** [The Dialog Element](https://css-tricks.com/the-dialog-element/) — artigo práctico.
- **W3C:** [HTML Standard — Dialog](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element) — especificación.

---

## 9. Referencias cruzadas

- **Capítulo 6: `display`, fluxo normal e posicionamento** — os diálogos usan `display` e `position`.
- **Capítulo 18: Transicións e animacións** — `@starting-style` e `allow-discrete` son esenciais para animar diálogos.
- **Capítulo 21: Filtros, blend modes e masking** — `::backdrop` e `backdrop-filter`.
- **Capítulo 26: Accesibilidade e CSS** — os diálogos e popovers son compoñentes accesibles por defecto.

---

**Data de creación:** 2026-09-17  
**Última revisión:** 2026-09-17  
**Estado:** Borrador para validación
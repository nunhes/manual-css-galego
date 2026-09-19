---
title: "Pseudo-clases e pseudo-elementos modernos"
description: "Guía das pseudo-clases e pseudo-elementos modernos para relacionar selectores, xestionar estados e estilizar partes dos elementos."
bloque: 5
capitulo: 16
nivel: intermedio
ultima_revision: "2026-09-17"
estado: "borrador_para_validacion"
compatibilidade: "baseline_2024"
palabras_chave:
  - pseudo_clase
  - pseudo_elemento
  - is
  - where
  - has
  - focus_visible
  - focus_within
  - user_valid
  - user_invalid
  - marker
  - selection
  - backdrop
---

<!-- # Capítulo 16: Pseudo-clases e pseudo-elementos modernos -->

> As **pseudo-clases** (como `:hover` ou `:first-child`) seleccionan elementos **segundo o seu estado ou a súa posición**. Os **pseudo-elementos** (como `::before` ou `::marker`) seleccionan **partes** dun elemento. Este capítulo céntrase nas pseudo-clases e pseudo-elementos **modernos** que se engadiron a CSS nos últimos anos: `:is()`, `:where()`, `:has()`, `:focus-visible`, `:focus-within`, `:user-valid`, `:user-invalid`, `::marker`, `::selection`, `::backdrop` e outros. Moitos deles cambiaron radicalmente a forma de escribir selectores.

---

## 1. Introdución: o que xa sabemos e o que vén

Nos capítulos anteriores xa apareceron varias pseudo-clases e pseudo-elementos, aínda que sen explicación detallada:

- `:hover` (Cap. 3).
- `:focus` e `:focus-visible` (Cap. 3 e 15).
- `:first-child`, `:nth-child()` (Cap. 3).
- `::before` e `::after` (Cap. 3).
- `::first-letter`, `::first-line` (Cap. 3, brevemente).

Este capítulo **non repite** o que xa vimos. Céntrase no que é **novo e moderno**, e que case ninguén usa porque non o coñece:

1. **Pseudo-clases de relación:** `:is()`, `:where()`, `:has()`, `:not()` moderno.
2. **Pseudo-clases de formulario:** `:user-valid`, `:user-invalid`, `:placeholder-shown`.
3. **Pseudo-clases de foco:** `:focus-visible`, `:focus-within`.
4. **Pseudo-elementos modernos:** `::marker`, `::selection`, `::backdrop`, `::file-selector-button`, `::placeholder`.

Algunhas destas características cambiaron moitísimo a forma de escribir CSS. En particular, `:has()` é probablemente a pseudo-clase máis importante engadida a CSS na última década.

> 💡 **Para pensar:** moitas das cousas que hai 10 anos só se podían facer con JavaScript (por exemplo, aplicar estilos a un pai cando un fillo está activo), hoxe se fan con CSS puro. Isto é importante porque reduce o JavaScript, mellora o rendemento, e fai o código máis declarativo.

---

## 2. Pseudo-clases de relación

Estas pseudo-clases permiten **agrupar** ou **relacionar** selectores de formas que antes eran imposibles ou moi tediosas.

### 2.1 `:is()`: agrupar sen repetir

`:is()` recibe unha **lista de selectores** e coincide se o elemento coincide con **algún** deles. É como unha agrupación con comas, pero **dentro** dun selector máis longo.

**Sen `:is()`:**

```css
article h1,
article h2,
article h3,
article h4 {
    color: #1a5c8a;
}
```

**Con `:is()`:**

```css
article :is(h1, h2, h3, h4) {
    color: #1a5c8a;
}
```

A sintaxe é moito máis limpa, sobre todo cando o prefixo é longo.

**Exemplo máis complexo:**

```css
/* Antes */
.menu > a:hover,
.menu > a:focus,
.menu > button:hover,
.menu > button:focus {
    background: #0d3a5c;
}

/* Con :is() */
.menu > :is(a, button):is(:hover, :focus) {
    background: #0d3a5c;
}
```

**Moi importante:** `:is()` ten a especificidade **do selector máis específico** da súa lista. Isto significa que `.menu :is(h1, #titulo)` ten a especificidade dun `#titulo` (ID), aínda que se aplique a un `h1`. Hai que ter isto en conta.

### 2.2 `:where()`: como `:is()` pero con especificidade cero

`:where()` fai o mesmo que `:is()`, pero **sempre ten especificidade 0**. Isto significa que os seus estilos se poden sobrescribir doadamente.

```css
article :where(h1, h2, h3, h4) {
    color: #1a5c8a;   /* especificidade 0 */
}

article h1 {
    color: #cc0000;   /* gaña, aínda que veña antes */
}
```

**Uso principal:** escribir **estilos base** que se poidan sobrescribir facilmente. É habitual en librarías de compoñentes.

**Exemplo típico:** reset de estilos de listas.

```css
:where(ul, ol) {
    list-style: none;
    padding: 0;
    margin: 0;
}
```

Deste xeito, calquera estilo posterior pode sobrescribir sen problemas de especificidade.

### 2.3 `:has()`: o «selector de pai»

Esta é a pseudo-clase máis importante engadida a CSS na última década. `:has()` **selecciona un elemento se contén outro que coincida co selector entre parénteses**.

**Exemplo básico:**

```css
/* Selecciona calquera <article> que conteña unha imaxe */
article:has(img) {
    padding: 1rem;
    background: #f5f5f5;
}
```

Nunca antes se puido facer isto: aplicar estilos a un pai **en función do seu contido**. Agora é posible.

**Exemplos prácticos:**

**1. Etiquetas de formulario con asterisco se o eido é obrigatorio:**

```css
label:has(+ input:required)::after {
    content: " *";
    color: #cc0000;
}
```

Se un `<label>` vai seguido dun `<input required>`, engádese un asterisco.

**2. Tarxetas con imaxes destacadas:**

```css
.tarxeta:has(img) {
    grid-template-rows: auto 1fr;
}
```

**3. Menús con elementos activos:**

```css
.menu:has(.activo) {
    background: #1a5c8a;
    color: white;
}
```

**4. Formularios con erros:**

```css
.formulario:has(:invalid) .mensaxe-erro {
    display: block;
}
```

Se o formulario ten algún eido inválido, amósase a mensaxe de erro.

**5. Elementos baleiros:**

```css
.contenedor:has(> :empty) {
    /* hai fillos baleiros */
}
```

**Combinacións de `:has()`:**

```css
/* Selecciona <section> que teñan un <h2> E un <p> */
section:has(h2):has(p) { }

/* Selecciona <div> que NON teñan fillos */
div:has(> :not(*)) { }   /* equivalente a div:empty, pero :has pode ser máis flexible */

/* Selecciona <article> que teñan unha clase .destacado dentro */
article:has(.destacado) { }
```

**Estado en 2026:** `:has()` está en Baseline desde 2023-2024. Ten soporte completo en navegadores modernos.

**Coidado co rendemento:** `:has()` é moi potente, pero pode ser custoso se se usa con selectores moi complexos en documentos grandes. Non hai que abusar.

### 2.4 `:not()` moderno

`:not()` xa existía antes, pero a súa forma moderna é moito máis potente: **pode recibir unha lista de selectores**.

```css
/* Antes: só un selector */
p:not(.destacado) { }

/* Agora: varios selectores */
p:not(.destacado, .importante) { }
```

**Exemplo:**

```css
/* Todos os botóns agás o primario e o secundario */
button:not(.boton-primario, .boton-secundario) {
    background: #f0f0f0;
}
```

**Coidado:** `:not()` ten a especificidade do selector máis específico da súa lista. Isto significa que `.boton:not(#pechar)` ten especificidade de ID.

---

## 3. Pseudo-clases de formulario

Estas pseudo-clases permiten aplicar estilos a eidos de formulario segundo o seu **estado de validación** ou de **interacción coa persoa usuaria**.

### 3.1 `:valid`, `:invalid`, `:required`, `:optional`

Xa existían antes, pero convén repasalas:

```css
input:valid {
    border-color: #2d7a3e;
}

input:invalid {
    border-color: #cc0000;
}

input:required {
    /* eido obrigatorio */
}

input:optional {
    /* eido non obrigatorio */
}
```

**Problema coñecido:** `:invalid` aplícase desde o principio, mesmo antes de que a persoa usuaria escriba nada. Isto pode ser agresivo visualmente.

**Solución moderna:** usar `:user-invalid` (ver 3.2).

### 3.2 `:user-valid` e `:user-invalid`

Estas pseudo-clases son como `:valid` e `:invalid`, pero **só se aplican despois de que a persoa usuaria interactuou co eido**.

```css
input:user-valid {
    border-color: #2d7a3e;
}

input:user-invalid {
    border-color: #cc0000;
}
```

**Diferenza clave:**

- `:invalid`: aplícase desde que o eido existe (mesmo baleiro).
- `:user-invalid`: só se aplica despois de que o eido perdeu o foco (despois de que a persoa intentase enchelo).

**Isto é moito mellor para a experiencia de usuario.** Non hai que mostrar erros antes de que a persoa teña oportunidade de escribir.

**Estado en 2026:** `:user-invalid` e `:user-valid` están en Baseline desde 2023-2024.

### 3.3 `:placeholder-shown`

Selecciona eidos que están amosando o seu `placeholder` (é dicir, están baleiros).

```css
input:placeholder-shown {
    background: #fafafa;
}

input:not(:placeholder-shown) {
    background: white;
    border-color: #1a5c8a;
}
```

**Uso típico:** cambiar o estilo dun eido cando a persoa comeza a escribir.

**Truco moi usado:** usar `:placeholder-shown` para crear un efecto de «etiqueta flotante»:

```css
.eido {
    position: relative;
}

.eido input:focus + label,
.eido input:not(:placeholder-shown) + label {
    transform: translateY(-1.5rem) scale(0.85);
    color: #1a5c8a;
}
```

### 3.4 `:autofill`

Selecciona eidos que o navegador encheu automaticamente.

```css
input:autofill {
    background: #fef9c3;
}
```

Útil para personalizar o estilo (que os navegadores adoitan facer por defecto dun xeito que rompe o deseño).

**Coidado:** os navegadores engaden estilos por defecto a `:autofill` con `!important`, o que fai difícil sobrescribilos. Hai trucos con `box-shadow` para evitar o fondo amarelo por defecto.

---

## 4. Pseudo-clases de foco

Estas pseudo-clases permiten controlar o foco, algo fundamental para a **accesibilidade**.

### 4.1 `:focus`

Selecciona o elemento que ten o foco (por exemplo, un eido activo).

```css
input:focus {
    border-color: #1a5c8a;
    outline: 2px solid #1a5c8a;
    outline-offset: 2px;
}
```

**Problema:** `:focus` aplícase tamén cando se fai clic cun rato, o que pode amosar o contorno en momentos non desexados.

### 4.2 `:focus-visible`

**Solución ao problema anterior:** `:focus-visible` aplícase só cando o foco **debería ser visible** (navegación con teclado, por exemplo), non cando se fai clic cun rato.

```css
button:focus-visible {
    outline: 2px solid #1a5c8a;
    outline-offset: 2px;
}
```

**Recomendación: usar sempre `:focus-visible` en lugar de `:focus`** para estilos visuais de foco. Isto dá o mellor de dous mundos: navegación con teclado visible, clics con rato sen contorno.

**Importante:** non quitar o contorno de foco sen substituílo por algo visible. É unha das peores prácticas de accesibilidade.

```css
/* MAL: elimina o foco sen alternativa */
button:focus {
    outline: none;
}

/* BEN: substitúe o foco por algo visible */
button:focus-visible {
    outline: 2px solid #1a5c8a;
    outline-offset: 2px;
}
```

### 4.3 `:focus-within`

Selecciona un elemento se **el mesmo ou algún dos seus descendentes** ten o foco.

```css
.eido:focus-within {
    border-color: #1a5c8a;
    box-shadow: 0 0 0 3px rgba(26, 92, 138, 0.1);
}
```

**Uso típico:** destacar un contedor cando un dos seus eidos está activo. Moi útil para formularios onde cada eido ten unha etiqueta e un input dentro dun contedor.

**Outro uso:** menús despregables que se manteñen abertos mentres o foco está neles.

```css
.menu:focus-within .submenu {
    display: block;
}
```

---

## 5. Pseudo-elementos modernos

Os pseudo-elementos seleccionan **partes** dun elemento. Vexamos os máis modernos.

### 5.1 `::marker`

Selecciona o **marcador** dun elemento de lista (`<li>`) ou dun `<summary>`.

```css
li::marker {
    color: #1a5c8a;
    font-weight: bold;
}

summary::marker {
    color: #1a5c8a;
}
```

**Vantaxe:** antes había que usar `list-style: none` e crear o marcador con `::before`. Agora pódese estilizar directamente.

**Propiedades que se poden aplicar:** só unhas poucas (cor, tamaño, contido...). Non se pode facer calquera cousa.

```css
li::marker {
    content: "→ ";
    color: #1a5c8a;
}
```

### 5.2 `::selection`

Selecciona o texto que a persoa usuaria seleccionou (por exemplo, ao arrastrar o rato).

```css
::selection {
    background: #1a5c8a;
    color: white;
}
```

**Uso:** personalizar a cor de selección para que encaixe coa identidade visual. É un detalle, pero dá unha sensación de coidado.

**Coidado coa accesibilidade:** hai que asegurar que o contraste entre o fondo e o texto de selección é suficiente.

### 5.3 `::placeholder`

Selecciona o texto do `placeholder` dun eido de formulario.

```css
input::placeholder {
    color: #999;
    font-style: italic;
}
```

**Coidado:** hai que asegurar contraste suficiente co fondo. Moitos deseños poñen `placeholder` demasiado claro e hai problemas de accesibilidade.

### 5.4 `::backdrop`

Selecciona o **fondo escuro** que se amosa detrás dun `<dialog>` cando se abre cun `showModal()`.

```css
dialog::backdrop {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
}
```

**Uso:** modais, diálogos, alertas. `::backdrop` só existe para elementos con `dialog` en modo modal.

### 5.5 `::file-selector-button`

Selecciona o botón de selección de arquivo nun `<input type="file">`.

```css
input[type="file"]::file-selector-button {
    background: #1a5c8a;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
}
```

Antes había que usar trucos con `label` para estilizar este botón. Agora pódese facer directamente.

### 5.6 `::first-letter` e `::first-line`

Xa vistos brevemente no Cap. 3. Repasamos:

```css
.articulo p:first-of-type::first-letter {
    font-size: 4rem;
    font-weight: bold;
    color: #1a5c8a;
    float: left;
    margin-right: 0.5rem;
    line-height: 0.8;
}

.articulo p::first-line {
    font-weight: bold;
    color: #1a5c8a;
}
```

**Uso:**

- `::first-letter`: drop caps (letra capitular).
- `::first-line`: destacar a primeira liña dun parágrafo (en textos xornalísticos).

### 5.7 `::before` e `::after` (repaso)

Xa vistos no Cap. 3. Repasamos unha cousa importante: **son os pseudo-elementos máis usados**, con moita diferenza.

```css
.boton::after {
    content: " →";
}
```

**Regra de ouro:** sempre hai que poñer `content`, aínda que sexa `content: ""`.

---

## 6. Exemplo mínimo funcional

Vexamos un formulario completo que usa moitas destas pseudo-clases e pseudo-elementos.

**Arquivo HTML:**

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pseudo-clases modernas</title>
    <link rel="stylesheet" href="estilos/pseudos.css">
</head>
<body>
    <form class="formulario">
        <h1>Contacto</h1>

        <div class="eido">
            <label for="nome">Nome *</label>
            <input type="text" id="nome" name="nome" required placeholder="O teu nome">
        </div>

        <div class="eido">
            <label for="email">Correo *</label>
            <input type="email" id="email" name="email" required placeholder="nome@exemplo.gal">
        </div>

        <div class="eido">
            <label for="web">Web</label>
            <input type="url" id="web" name="web" placeholder="https://...">
        </div>

        <div class="eido">
            <label for="arquivo">Arquivo adxunto</label>
            <input type="file" id="arquivo" name="arquivo">
        </div>

        <button type="submit" class="boton">Enviar</button>
    </form>
</body>
</html>
```

**Arquivo CSS:**

```css
/* ==============================
   Variables
   ============================== */
:root {
    --cor-primaria: #1a5c8a;
    --cor-erro: #cc0000;
    --cor-exito: #2d7a3e;
    --cor-texto: #333;
    --cor-suave: #666;
    --cor-fondo: #fafafa;
    --cor-bordo: #d0d0d0;
    --radio: 6px;
}

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
    background: var(--cor-fondo);
    color: var(--cor-texto);
    padding: 2rem 1rem;
}

/* ==============================
   Formulario
   ============================== */
.formulario {
    max-width: 500px;
    margin: 0 auto;
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);

    /* :has() para destacar o formulario se ten erros */
    &:has(:user-invalid) {
        border-left: 4px solid var(--cor-erro);
    }

    &:has(:user-valid:not(:placeholder-shown)) {
        /* alternativa: sen efecto visual, só como exemplo */
    }

    h1 {
        font-size: 1.5rem;
        color: var(--cor-primaria);
        margin-bottom: 1.5rem;
    }
}

/* ==============================
   Eidos
   ============================== */
.eido {
    margin-bottom: 1.25rem;

    label {
        display: block;
        margin-bottom: 0.25rem;
        font-weight: 500;
        color: var(--cor-texto);

        /* :has() con + para marcar os labels obrigatorios */
        /* (aquí non é posible porque o required está no input,
           non no label, pero mostramos a idea) */
    }

    input {
        width: 100%;
        padding: 0.625rem 0.875rem;
        border: 1px solid var(--cor-bordo);
        border-radius: var(--radio);
        font-size: 1rem;
        font-family: inherit;
        transition: border-color 0.15s, box-shadow 0.15s;

        /* Placeholder estilizado */
        &::placeholder {
            color: #aaa;
            font-style: italic;
        }

        /* Foco: usamos :focus-visible */
        &:focus-visible {
            outline: none;
            border-color: var(--cor-primaria);
            box-shadow: 0 0 0 3px rgba(26, 92, 138, 0.15);
        }

        /* Estado de validación despois de interactuar */
        &:user-valid {
            border-color: var(--cor-exito);
        }

        &:user-invalid {
            border-color: var(--cor-erro);

            /* Mensaxe de erro a través do placeholder */
            &::placeholder {
                color: var(--cor-erro);
            }
        }
    }

    /* :focus-within: destaca o eido cando o input ten foco */
    &:focus-within label {
        color: var(--cor-primaria);
    }
}

/* ==============================
   Botón de arquivo
   ============================== */
input[type="file"] {
    padding: 0.5rem;

    &::file-selector-button {
        background: var(--cor-primaria);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: var(--radio);
        cursor: pointer;
        font-family: inherit;
        font-size: 0.95rem;
        margin-right: 0.75rem;
        transition: background 0.15s;

        &:hover {
            background: #0d3a5c;
        }
    }
}

/* ==============================
   Botón
   ============================== */
.boton {
    width: 100%;
    padding: 0.75rem 1.5rem;
    background: var(--cor-primaria);
    color: white;
    border: none;
    border-radius: var(--radio);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s, transform 0.1s;

    &:hover {
        background: #0d3a5c;
    }

    &:focus-visible {
        outline: 2px solid var(--cor-primaria);
        outline-offset: 2px;
    }

    &:active {
        transform: scale(0.98);
    }
}

/* ==============================
   Selección de texto
   ============================== */
::selection {
    background: var(--cor-primaria);
    color: white;
}
```

**Que está a pasar aquí:**

1. **`formulario:has(:user-invalid)`** destaca o formulario se algún eido ten erro despois de interactuar. **Nunca antes se podía facer isto en CSS.**
2. **`input:user-valid` e `input:user-invalid`** cambian a cor do bordo só despois de que a persoa interactuou co eido. Non hai erros prematuros.
3. **`.eido:focus-within label`** destaca a etiqueta cando o eido ten foco.
4. **`input::placeholder`** estiliza o texto de axuda.
5. **`::file-selector-button`** estiliza o botón de selección de arquivo directamente.
6. **`::selection`** personaliza a cor de selección de texto.
7. **O aniñamento nativo** (Cap. 15) fai que todo o CSS estea agrupado por compoñente.

---

## 7. Casos habituais na práctica

### 7.1 Marcar eidos obrigatorios

```css
label:has(+ input:required)::after {
    content: " *";
    color: #cc0000;
}
```

Se un `<label>` vai seguido dun `<input required>`, engádese un asterisco.

### 7.2 Destacar seccións cando un fillo ten foco

```css
.tarxeta:focus-within {
    box-shadow: 0 0 0 3px rgba(26, 92, 138, 0.15);
}
```

### 7.3 Amosar unha mensaxe de erro só se hai eidos inválidos

```css
.formulario .erro {
    display: none;
}

.formulario:has(:user-invalid) .erro {
    display: block;
}
```

### 7.4 Estilizar a primeira letra dun artigo

```css
.articulo > p:first-of-type::first-letter {
    font-size: 4rem;
    font-weight: bold;
    color: #1a5c8a;
    float: left;
    margin-right: 0.5rem;
    line-height: 0.8;
}
```

### 7.5 Destacar elementos que conteñen ligazóns

```css
.tarxeta:has(a[href^="http"]) {
    /* ten unha ligazón externa */
}
```

### 7.6 Aplicar estilos a unha lista agás o último elemento

```css
li:not(:last-child) {
    border-bottom: 1px solid #eee;
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
}
```

### 7.7 Aplicar estilos a unha lista agás algúns elementos

```css
li:not(:first-child, :last-child) {
    /* aplícase a todos agás o primeiro e o último */
}
```

### 7.8 Contornos de foco accesibles

```css
:focus-visible {
    outline: 2px solid #1a5c8a;
    outline-offset: 2px;
    border-radius: 2px;
}
```

Este patrón debería estar en calquera proxecto. **Non quitar o foco, personalizalo.**

---

## 8. Erros frecuentes

### 8.1 Esquecer `content` en `::before` e `::after`

```css
/* Mal: non se ve nada */
.boton::after {
    color: red;
}

/* Ben */
.boton::after {
    content: "→";
    color: red;
}
```

Sen `content`, o pseudo-elemento non se xera.

### 8.2 Usar `:focus` en lugar de `:focus-visible`

```css
/* Problemático: mostra o contorno ao facer clic */
button:focus {
    outline: 2px solid blue;
}

/* Mellor */
button:focus-visible {
    outline: 2px solid blue;
}
```

### 8.3 Quitar o foco sen alternativa

**Este é un erro grave de accesibilidade.** Nunca quitar `outline` sen poñer unha alternativa visible.

```css
/* MAL */
button:focus {
    outline: none;
}

/* BEN */
button:focus-visible {
    outline: 2px solid #1a5c8a;
    outline-offset: 2px;
}
```

### 8.4 Usar `:invalid` en lugar de `:user-invalid`

```css
/* Problemático: o eido aparece con erro desde o principio */
input:invalid {
    border-color: red;
}

/* Mellor */
input:user-invalid {
    border-color: red;
}
```

### 8.5 Abusar de `:has()`

`:has()` é moi potente, pero pode ser custoso:

```css
/* Potencialmente lento en documentos grandes */
*:has(*) { }
*:has(:has(*)) { }
```

**Recomendación:** usar `:has()` con selectores específicos, non con `*`.

### 8.6 Esquecer que `:is()` e `:not()` teñen especificidade

```css
p:is(.clase, #id) {
    /* Especificidade = ID */
}
```

A especificidade de `:is()` e `:not()` é a do selector **máis específico** da súa lista. Hai que ter isto en conta.

### 8.7 Usar `:where()` e esperar que funcione igual ca `:is()`

`:where()` ten **especificidade 0**. Se che importa a especificidade, hai que usar `:is()`.

### 8.8 Non comprobar a compatibilidade de `::marker` e outros

Aínda que están en Baseline, algunhas propiedades de `::marker` non están todas soportadas. Comproba en [caniuse.com](https://caniuse.com) se unha propiedade concreta funciona.

---

## 9. Compatibilidade (2026)

| Característica                                     | Estado                   |
| -------------------------------------------------- | ------------------------ |
| `:hover`, `:focus`, `:first-child`, `:nth-child()` | Universal desde hai anos |
| `:not()` con lista de selectores                   | Baseline desde 2023      |
| `:is()`                                            | Baseline desde 2023      |
| `:where()`                                         | Baseline desde 2023      |
| `:has()`                                           | Baseline desde 2024      |
| `:focus-visible`                                   | Baseline desde 2022      |
| `:focus-within`                                    | Universal desde 2017     |
| `:user-valid`, `:user-invalid`                     | Baseline desde 2024      |
| `:placeholder-shown`                               | Universal desde hai anos |
| `::marker`                                         | Universal desde 2020     |
| `::selection`                                      | Universal                |
| `::backdrop`                                       | Baseline desde 2022      |
| `::file-selector-button`                           | Baseline desde 2021      |

**Recomendación:** `:has()` é o máis recente e útil. Úsao sen medo en 2026.

---

## 10. Exercicios

### Exercicio 1: `:is()` e `:where()`

Simplifica este CSS usando `:is()`:

```css
.tarxeta h1,
.tarxeta h2,
.tarxeta h3,
.tarxeta h4 {
    color: #1a5c8a;
}
```

<details>
<summary><b>Amosar a solución</b></summary>

```css
.tarxeta :is(h1, h2, h3, h4) {
    color: #1a5c8a;
}
```

</details>

---

### Exercicio 2: `:has()`

Escribe CSS para que calquera `<article>` que conteña unha imaxe teña `background: #f5f5f5`.

<details>
<summary><b>Amosar a solución</b></summary>

```css
article:has(img) {
    background: #f5f5f5;
}
```

</details>

---

### Exercicio 3: `:focus-within`

Escribe CSS para que un `.eido` destaque cando o seu input ten o foco, cambiando o bordo a `#1a5c8a`.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.eido:focus-within {
    border-color: #1a5c8a;
}
```

</details>

---

### Exercicio 4: `:user-invalid`

Escribe CSS para que un input mostre un bordo vermello só despois de que a persoa interactuou co eido e o deixou inválido.

<details>
<summary><b>Amosar a solución</b></summary>

```css
input:user-invalid {
    border-color: #cc0000;
}
```

</details>

---

### Exercicio 5: `::marker`

Escribe CSS para que os `<li>` dunha lista teñan un marcador azul.

<details>
<summary><b>Amosar a solución</b></summary>

```css
li::marker {
    color: #1a5c8a;
}
```

</details>

---

### Exercicio 6: Diferenza entre `:is()` e `:where()`

Cal é a diferenza entre `:is()` e `:where()`?

<details>
<summary><b>Amosar a solución</b></summary>

- **`:is()`**: ten a especificidade do selector máis específico da súa lista.
- **`:where()`**: sempre ten especificidade 0.

**Cando usar cada un:**

- `:where()`: para estilos base que deben ser fáciles de sobrescribir.
- `:is()`: cando queres que a especificidade reflicta o selector.

</details>

---

### Exercicio 7: Detectar o erro

```css
button:focus {
    outline: none;
}

li::marker {
    color: blue;
}

.eido {
    color: red;
}
```

Atopa o erro de accesibilidade.

<details>
<summary><b>Amosar a solución</b></summary>

O erro está en `button:focus { outline: none; }`. Elimina o contorno de foco **sen poñer alternativa**. Isto impide que as persoas que navegan con teclado saiban onde están. Hai que substituílo por algo visible:

```css
button:focus-visible {
    outline: 2px solid #1a5c8a;
    outline-offset: 2px;
}
```

</details>

---

## 11. Para profundar

- **MDN Web Docs:** [Pseudo-classes and pseudo-elements](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Pseudo_classes_and_elements) — introdución.
- **MDN Web Docs:** [`:has()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:has) — referencia da pseudo-clase.
- **MDN Web Docs:** [`:is()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:is) e [`:where()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:where) — referencias.
- **MDN Web Docs:** [`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) — referencia.
- **web.dev:** [Learn CSS: Pseudo-classes](https://web.dev/learn/css/pseudo-classes) — lección interactiva.
- **Ahmad Shadeed:** [CSS :has() guide](https://ishadeed.com/article/css-has-parent-selector/) — guía práctica de `:has()`.
- **W3C:** [Selectors Level 4](https://www.w3.org/TR/selectors-4/) — especificación.

---

## 12. Referencias cruzadas

- **Capítulo 3: Selectores básicos** — repasa `:hover`, `:first-child`, `::before`, `::after`.
- **Capítulo 15: Aniñamento nativo** — o aniñado úsase moito con pseudo-clases.
- **Capítulo 17: Funcións de cor modernas** — `:has()` e outras pseudo-clases combínanse con funcións de cor.
- **Capítulo 26: Accesibilidade e CSS** — `:focus-visible` e `:user-invalid` son parte da accesibilidade.

---

**Data de creación:** 2026-09-17  
**Última revisión:** 2026-09-17  
**Estado:** Borrador para validación
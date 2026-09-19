---
title: "Unidades relativas e funcións modernas"
description: "Uso de unidades relativas e funcións como `calc()`, `min()`, `max()` e `clamp()` para crear deseños fluídos."
bloque: 4
capitulo: 13
nivel: intermedio
ultima_revision: "2026-09-17"
estado: "borrador_para_validacion"
compatibilidade: "universal"
palabras_chave:
  - unidades_relativas
  - vw
  - vh
  - em
  - rem
  - container_units
  - calc
  - min
  - max
  - clamp
  - funcions_matematicas
  - layout_adaptativo
---

<!-- # Capítulo 13: Unidades relativas e funcións modernas -->

> CSS moderno incorpora **unidades relativas** (ao viewport, ao contedor, ao texto) e **funcións matemáticas** (`calc()`, `min()`, `max()`, `clamp()`) que permiten crear deseños adaptativos **sen escribir media queries**. Este capítulo explica todas estas ferramentas, cando usar cada unha, e como reducir o CSS adaptativo a un mínimo máis limpo e máis fácil de manter. Pecha o Bloque 4 (Adaptabilidade).

---

## 1. Introdución: o deseño fluído fronte ao deseño por saltos

Cando escribes CSS adaptativo con media queries, o deseño cambia **a saltos**. Nun ancho de 767px hai un layout, e nun ancho de 768px hai outro completamente distinto. Isto funciona, pero ten dous problemas:

1. **Os saltos son visibles.** Se redimensionas a ventá pouco a pouco, ves como o contido «salta» dun estado a outro. Non hai transición.
2. **Necesitas moitas media queries.** Cada cambio de layout require unha media query nova, e cada media query é código adicional que hai que manter.

CSS moderno ofrece unha alternativa: **o deseño fluído**. En lugar de definir tamaños fixos e cambialos por saltos, defines **fórmulas** que calculan o tamaño axeitado para cada ancho. O resultado é un deseño que se adapta **suavemente**, sen saltos, con menos código.

Para isto, hai dúas ferramentas principais:

- **Unidades relativas:** en lugar de `320px`, usas `20vw`, `5rem`, `10cqw` ou `50ch`. O valor depende do contexto.
- **Funcións matemáticas:** `calc()`, `min()`, `max()` e `clamp()` permiten combinar unidades, poñer límites e crear fórmulas.

Este capítulo céntrase nestas dúas ferramentas. Son a base do CSS fluído e van aparecendo en case todos os exemplos dos capítulos seguintes.

> 💡 **Para pensar:** a idea clave é que, en CSS moderno, **non hai que elixir entre «tamaño fixo» e «media queries»**. Hai un terceiro camiño: **fórmulas que se adaptan**. Se un título debe medrar coa pantalla pero sen pasar dun límite, non precisas dúas media queries: precisas un `clamp()`. Se unha imaxe debe ocupar un terzo do contedor pero cun mínimo de 200px, non precisas JavaScript: precisas `max(200px, 33%)`.

---

## 2. Unidades relativas: repaso e ampliación

No Capítulo 4 xa vimos as unidades relativas máis comúns (`em`, `rem`, `%`, `vw`, `vh`, `ch`). Aquí imos:

1. Repasar as que xa vimos, brevemente.
2. Engadir unidades máis recentes que non vimos entón.
3. Explicar cando usar cada unha.

### 2.1 Unidades relativas ao texto

| Unidade | Relativa a                                     |
| ------- | ---------------------------------------------- |
| `em`    | O tamaño de fonte do elemento actual.          |
| `rem`   | O tamaño de fonte do elemento raíz (`<html>`). |
| `ch`    | O ancho do carácter «0» da fonte actual.       |
| `ex`    | A altura da letra «x» da fonte actual.         |
| `lh`    | A altura de liña do elemento actual.           |
| `rlh`   | A altura de liña do elemento raíz.             |

**`rem`:** a unidade máis usada para tamaños de texto, padding, margin, gap... Calquera cousa que queiras que escale co tamaño base do documento.

```css
html {
    font-size: 16px;   /* 1rem = 16px */
}

h1 {
    font-size: 2rem;   /* 32px */
    margin-bottom: 1rem; /* 16px */
}
```

**Se a persoa usuaria cambia o tamaño de fonte do navegador** (por accesibilidade), `rem` adáptase. Isto é o principal motivo de usalo en lugar de `px`.

**`em`:** relativa ao tamaño de fonte **do elemento actual**. Útil cando queres que algo escale co tamaño de texto do seu propio contexto:

```css
.boton {
    font-size: 1rem;
    padding: 0.5em 1em;   /* 0.5 e 1 veces o tamaño do botón */
}
```

Se o botón ten `font-size: 1rem` (16px), o padding é 8px 16px. Se alguén cambia o `font-size` do botón a `1.25rem` (20px), o padding pasa a 10px 20px automaticamente.

**`ch`:** o ancho do carácter «0». Útil para limitar o ancho de liñas de texto:

```css
.articulo {
    max-width: 65ch;   /* uns 65 caracteres por liña */
}
```

Este é un truco moi común para que o texto longo se lea cómodamente.

**`lh` e `rlh`:** a altura de liña. Útiles en casos moi concretos, coma se queres aliñar algo á altura dunha liña de texto:

```css
.icona {
    height: 1lh;   /* mesma altura que unha liña de texto */
}
```

Son unidades relativamente novas e non se usan moito. Abonda con sabelas.

### 2.2 Unidades relativas ao viewport

| Unidade      | Relativa a                                                   |
| ------------ | ------------------------------------------------------------ |
| `vw`         | 1% do ancho da ventá.                                        |
| `vh`         | 1% da altura da ventá.                                       |
| `vmin`       | 1% do lado máis pequeno da ventá.                            |
| `vmax`       | 1% do lado máis grande da ventá.                             |
| `dvh`, `dvw` | Como `vh`/`vw`, pero teñen en conta a **altura dinámica** da ventá (barras do navegador móbil que aparecen e desaparecen). |
| `svh`, `svw` | Como `vh`/`vw`, pero usando a **altura pequena** (cando as barras están visibles). |
| `lvh`, `lvw` | Como `vh`/`vw`, usando a **altura grande** (cando as barras están ocultas). |

**`vw` e `vh`:** as clásicas. `100vh` era o xeito típico de facer unha sección que ocupa toda a pantalla.

```css
.hero {
    height: 100vh;
    background: url("fondo.jpg") center/cover;
}
```

**Problema en móbil:** `100vh` non ten en conta as barras do navegador móbil (arriba e abaixo). Cando aparecen, o contido de `100vh` desborda por baixo. Por iso saíron `dvh`, `svh` e `lvh`.

**`dvh` (dynamic viewport height):** a altura **actual** da ventá, teña ou non barras. É a máis axeitada para o caso anterior:

```css
.hero {
    min-height: 100dvh;   /* ocupa a pantalla sen desbordar */
}
```

**`svh` (small viewport height):** a altura cando as barras **están visibles**. Úsase cando queres garantir que nada se corta.

**`lvh` (large viewport height):** a altura cando as barras **están ocultas**. Úsase cando queres aproveitar todo o espazo.

**Recomendación:** usa `dvh` para seccións a pantalla completa. É o valor que mellor se comporta. Se queres garantir que nada se corte, usa `svh`.

**`vmin` e `vmax`:** útiles cando queres que algo escale en función do lado máis pequeno ou máis grande da pantalla. Por exemplo, un texto que sempre caiba:

```css
h1 {
    font-size: 5vmin;   /* nunca desborda, nin en horizontal nin en vertical */
}
```

### 2.3 Unidades relativas ao contedor

Xa vimos no Capítulo 12 que as container queries permiten adaptar compoñentes ao tamaño do seu contedor. Xunto con elas, CSS ofrece unidades relativas ao contedor:

| Unidade | Relativa a                                               |
| ------- | -------------------------------------------------------- |
| `cqw`   | 1% do ancho do contedor.                                 |
| `cqh`   | 1% da altura do contedor.                                |
| `cqi`   | 1% do tamaño en liña do contedor (ancho en horizontal).  |
| `cqb`   | 1% do tamaño en bloque do contedor (alto en horizontal). |
| `cqmin` | 1% do lado máis pequeno do contedor.                     |
| `cqmax` | 1% do lado máis grande do contedor.                      |

**Exemplo:**

```css
.tarxeta-wrapper {
    container: tarxeta / inline-size;
}

.tarxeta {
    padding: 5cqi;    /* 5% do ancho do contedor */
    font-size: 2.5cqi;
}
```

Cando o contedor ten 400px, o padding é 20px e a fonte é 10px. Cando o contedor ten 800px, o padding é 40px e a fonte é 20px.

**Atención:** as unidades `cq*` **só funcionan dentro dun contedor declarado**. Se o elemento non está dentro dun contedor, valen cero.

**Recomendación:** úsaas con moderación. En moitos casos, `rem` ou `%` son suficientes. As `cq*` son útiles cando queres que un compoñente escale **proporcionalmente** ao contedor, non ao documento.

---

## 3. Funcións matemáticas

CSS moderno ten catro funcións matemáticas principais. Xuntas son a base do deseño fluído.

### 3.1 `calc()`: facer cálculos

`calc()` permite combinar unidades e facer operacións aritméticas.

```css
.caixa {
    width: calc(100% - 2rem);         /* ancho total menos 2rem */
    padding: calc(1rem + 2vw);         /* suma de rem e vw */
    font-size: calc(1rem * 1.5);       /* multiplicación */
    margin: calc(2rem / 4);            /* división */
}
```

**Regras:**

- Os operadores `+` e `-` **deben ter espazos** ao redor. `calc(100%-2rem)` non funciona; hai que escribir `calc(100% - 2rem)`.
- Os operadores `*` e `/` **non necesitan espazos**, pero por claridade é mellor poñelos.
- Pódense aniñar `calc()` dentro doutros `calc()`, pero non é necesario: pódese facer todo nun.

**Usos típicos:**

**Contedores con marxe interna:**

```css
.contido {
    width: calc(100% - 4rem);
    margin: 0 auto;
}
```

**Aliñación con elementos fixos:**

```css
.elemento {
    top: calc(50% - 100px);   /* centrado verticalmente restándolle a metade da altura */
}
```

**Grid con anchos calculados:**

```css
.grid {
    grid-template-columns: repeat(3, calc((100% - 2rem) / 3));
}
```

### 3.2 `min()`: escoller o menor

`min()` recibe dous ou máis valores e devolve **o máis pequeno**.

```css
.caixa {
    width: min(500px, 100%);
    /* se 100% < 500px, usa 100%
       se 500px < 100%, usa 500px
       é dicir: o ancho nunca pasa de 500px, pero tampouco sae do contedor */
}
```

**Uso típico:** poñer un **límite superior** sen necesitar `max-width`.

```css
.contido {
    width: min(1200px, 100% - 2rem);
    margin: 0 auto;
}
```

Isto é **equivalente** a:

```css
.contido {
    width: 100%;
    max-width: 1200px;
    padding: 0 1rem;
}
```

Pero nunha soa liña. Moi útil para layouts fluídos.

### 3.3 `max()`: escoller o maior

`max()` recibe dous ou máis valores e devolve **o máis grande**.

```css
.caixa {
    width: max(200px, 30%);
    /* se 30% < 200px, usa 200px
       se 200px < 30%, usa 30%
       é dicir: o ancho nunca baixa de 200px */
}
```

**Uso típico:** poñer un **límite inferior** sen necesitar `min-width`.

```css
.tarxeta {
    padding: max(1rem, 2vw);
}
```

Se a pantalla é pequena, o padding é 1rem. Se é grande, o padding é 2vw. Nunca baixa de 1rem.

### 3.4 `clamp()`: entre un mínimo e un máximo

`clamp(min, ideal, max)` recibe **tres valores** e devolve:

- O valor mínimo se o ideal é menor.
- O valor máximo se o ideal é maior.
- O valor ideal se está entre os dous.

```css
h1 {
    font-size: clamp(1.5rem, 4vw, 3rem);
    /* nunca menos de 1.5rem
       nunca máis de 3rem
       entre os dous, 4vw (que cambia co ancho da pantalla) */
}
```

**Esta é a función máis útil do CSS moderno para deseño fluído.** Permite que un valor se adapte suavemente, con límites seguros.

**Exemplos típicos:**

**Tipografía fluída:**

```css
h1 { font-size: clamp(1.5rem, 4vw, 3rem); }
h2 { font-size: clamp(1.25rem, 3vw, 2rem); }
p  { font-size: clamp(1rem, 1.5vw, 1.125rem); }
```

**Paddings fluídos:**

```css
.seccion {
    padding: clamp(1rem, 5vw, 4rem);
}
```

**Anchos fluídos:**

```css
.contido {
    width: clamp(300px, 90%, 1200px);
    margin: 0 auto;
}
```

**Xeitos de calcular o valor ideal:** o ideal adoita ser unha combinación de `vw` e `rem`, ou unha fórmula do tipo `calc(1rem + 2vw)`. Isto permite que o valor escale coa pantalla **pero tamén co tamaño de texto base**:

```css
h1 {
    font-size: clamp(1.5rem, 1rem + 3vw, 3rem);
}
```

Cando a pantalla é grande, `1rem + 3vw` dá un valor grande. Cando é pequena, dá un valor pequeno. E se a persoa usuaria cambia o tamaño base do navegador, o `1rem` axusta todo.

> 💡 **Truco moi útil:** podes facer tipografía **completamente fluída** con este patrón, sen necesitar media queries para o tamaño do texto.

### 3.5 Combinar funcións

As funcións pódense combinar:

```css
.elemento {
    padding: clamp(1rem, 2vw + 0.5rem, 3rem);
    width: min(max(300px, 50%), 800px);
    /* o ancho mínimo é 300px, o máximo 800px, entremedias 50% */
    margin: calc(max(1rem, 2vw) + 0.5rem);
}
```

**Recomendación:** non abuses. Cando unha expresión é moi complexa, é mellor dividila en variables (Cap. 14) ou en pasos intermedios.

---

## 4. Exemplo mínimo funcional

Vexamos unha páxina que usa unidades relativas e funcións modernas para ser **completamente fluída**, sen media queries.

**Arquivo HTML:**

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Deseño fluído</title>
    <link rel="stylesheet" href="estilos/fluido.css">
</head>
<body>
    <header class="hero">
        <h1>Aprende CSS en galego</h1>
        <p class="subtitulo">Un curso completo, fluído e adaptativo</p>
    </header>

    <main class="contido">
        <section class="tarxetas">
            <article class="tarxeta">
                <h2>Fundamentos</h2>
                <p>Comeza desde cero: sintaxe, selectores, modelo de caixa.</p>
            </article>
            <article class="tarxeta">
                <h2>Maquetación</h2>
                <p>Flexbox, Grid e todas as técnicas modernas de layout.</p>
            </article>
            <article class="tarxeta">
                <h2>Adaptabilidade</h2>
                <p>Media queries, container queries e deseño fluído.</p>
            </article>
        </section>
    </main>
</body>
</html>
```

**Arquivo CSS:**

```css
*, *::before, *::after {
    box-sizing: border-box;
}

* {
    margin: 0;
    padding: 0;
}

/* ==============================
   Tipografía base
   ============================== */
html {
    font-size: 16px;
}

body {
    font-family: system-ui, sans-serif;
    line-height: 1.6;
    color: #333;
    background: #fafafa;
}

/* ==============================
   Hero a pantalla completa
   ============================== */
.hero {
    min-height: 100dvh;          /* altura dinámica do viewport */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: clamp(1.5rem, 5vw, 4rem);
    background: linear-gradient(135deg, #1a5c8a, #0d3a5c);
    color: white;
}

.hero h1 {
    font-size: clamp(1.75rem, 1rem + 5vw, 4rem);
    line-height: 1.1;
    margin-bottom: clamp(0.5rem, 2vw, 1.5rem);
    max-width: 20ch;             /* evita liñas moi longas */
}

.subtitulo {
    font-size: clamp(1rem, 0.75rem + 1.5vw, 1.5rem);
    opacity: 0.9;
    max-width: 45ch;
}

/* ==============================
   Contido
   ============================== */
.contido {
    padding: clamp(2rem, 5vw, 5rem) clamp(1rem, 3vw, 2rem);
}

.tarxetas {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
    gap: clamp(1rem, 2vw, 2rem);
    max-width: 1200px;
    margin: 0 auto;
}

/* Nota: minmax(min(280px, 100%), 1fr) evita que a columna
   desborde en pantallas moi pequenas (menos de 280px) */

.tarxeta {
    background: white;
    padding: clamp(1.25rem, 3vw, 2rem);
    border-radius: clamp(8px, 1vw, 16px);
    border: 1px solid #e5e5e5;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.tarxeta h2 {
    font-size: clamp(1.125rem, 1rem + 0.75vw, 1.5rem);
    color: #1a5c8a;
    margin-bottom: clamp(0.5rem, 1vw, 1rem);
}

.tarxeta p {
    font-size: clamp(0.9rem, 0.85rem + 0.25vw, 1.05rem);
    color: #555;
}
```

**Que está a pasar aquí:**

1. **Non hai nin unha soa media query.** Todo se adapta por fórmulas.
2. **`.hero`** ocupa toda a pantalla con `100dvh`. O padding é fluído: `clamp(1.5rem, 5vw, 4rem)`.
3. **O título** ten tamaño fluído: mínimo 1.75rem, ideal `1rem + 5vw`, máximo 4rem.
4. **`.tarxetas`** usa Grid con `auto-fit` e `minmax()`. Ancho mínimo de 280px (ou 100% se a pantalla é menor), ancho máximo flexible.
5. **Os gaps, paddings e border-radius** son todos fluídos.
6. **A tipografía de todos os elementos** escala suavemente.

**Se redimensionas a ventá**, o deseño cambia **suavemente**, sen saltos. E o CSS é moito máis curto que se se fixese con media queries.

---

## 5. Casos habituais na práctica

### 5.1 Tipografía fluída

Patrón estándar:

```css
h1 { font-size: clamp(1.75rem, 1rem + 4vw, 3.5rem); }
h2 { font-size: clamp(1.25rem, 1rem + 2vw, 2rem); }
h3 { font-size: clamp(1.125rem, 1rem + 1vw, 1.5rem); }
p  { font-size: clamp(1rem, 0.95rem + 0.25vw, 1.125rem); }
```

**Vantaxe:** o texto nunca é demasiado pequeno nin demasiado grande, e escala de forma natural.

### 5.2 Contedores con marxe lateral adaptativa

```css
.contido {
    width: min(100% - 2rem, 1200px);
    margin-inline: auto;
}
```

**Equivale a:** ancho máximo de 1200px, pero nunca ocupa todo o ancho menos 2rem (1rem por cada lado).

### 5.3 Espazados fluídos

```css
.seccion {
    padding-block: clamp(2rem, 5vw, 6rem);
    padding-inline: clamp(1rem, 3vw, 2rem);
}
```

Esto reduce a necesidade de media queries para espazados.

### 5.4 Alturas a pantalla completa

```css
.hero {
    min-height: 100dvh;
}
```

**Usa `dvh`**, non `vh`, para evitar problemas coas barras do navegador móbil.

### 5.5 Imaxes que non desbordan

```css
img {
    max-width: 100%;
    height: auto;
    display: block;
}
```

Este é un patrón clásico que segue sendo imprescindible. Se o combinamos con unidades relativas, as imaxes sempre encaixan.

### 5.6 Grid adaptativa con ancho mínimo flexible

```css
.tarxetas {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
    gap: 1rem;
}
```

O `min(280px, 100%)` evita que a columna mínima desborde en pantallas moi estreitas (menos de 280px). Sen el, unha pantalla de 250px rompe o layout.

**Detalle técnico:** normalmente escribirías `minmax(280px, 1fr)`. Pero se o contedor ten menos de 280px, a columna ocupa máis que o contedor e desborda. `min(280px, 100%)` resolve isto: se 100% < 280px, usa 100%.

### 5.7 Combinación de `clamp()` e `calc()`

```css
h1 {
    font-size: clamp(1.5rem, calc(1rem + 3vw), 3rem);
}
```

O `calc()` aquí non é estritamente necesario (CSS xa suma `1rem + 3vw` nun clamp), pero explícao e fai o CSS máis lexible.

### 5.8 Reducir media queries ao mínimo

Un exemplo real de refactorización:

**Antes (con media queries):**

```css
h1 {
    font-size: 1.5rem;
    padding: 1rem;
}
@media (min-width: 640px) {
    h1 { font-size: 2rem; padding: 1.5rem; }
}
@media (min-width: 1024px) {
    h1 { font-size: 2.5rem; padding: 2rem; }
}
@media (min-width: 1280px) {
    h1 { font-size: 3rem; padding: 2.5rem; }
}
```

**Despois (con clamp):**

```css
h1 {
    font-size: clamp(1.5rem, 1rem + 2.5vw, 3rem);
    padding: clamp(1rem, 2vw, 2.5rem);
}
```

4 media queries → 0 media queries.

---

## 6. Erros frecuentes

### 6.1 Esquecer os espazos en `calc()`

```css
/* Mal: non funciona */
width: calc(100%-2rem);

/* Ben */
width: calc(100% - 2rem);
```

Os operadores `+` e `-` requiren espazos. É un erro moi común que non dá erro de consola, simplemente non funciona.

### 6.2 Usar `vh` en móbil sen `dvh`

```css
/* Problemático en móbil */
.hero {
    height: 100vh;   /* as barras do navegador córtano */
}

/* Mellor */
.hero {
    min-height: 100dvh;
}
```

### 6.3 Abusar de `vw` para o tamaño de texto

```css
/* Mal: o texto faise ilegible en pantallas moi anchas ou moi estreitas */
h1 {
    font-size: 5vw;   /* nun monitor de 3000px, son 150px */
}
```

**Solución:** usar `clamp()` para poñer límites.

```css
h1 {
    font-size: clamp(1.5rem, 5vw, 3rem);
}
```

### 6.4 Confundir `min()` e `max()` con `min-width` e `max-width`

`min()` e `max()` son funcións. `min-width` e `max-width` son propiedades.

```css
/* Función: devolve o máis pequeno dos dous valores */
width: min(500px, 100%);

/* Propiedade: establece un ancho máximo */
max-width: 500px;
```

Moitas veces poden acadar o mesmo resultado, pero non son o mesmo.

### 6.5 Usar unidades `cq*` sen un contedor declarado

```css
.tarxeta {
    padding: 5cqw;   /* vale 0 se non hai contedor */
}
```

As unidades `cq*` só funcionan dentro dun contedor declarado con `container-type` (Cap. 12).

### 6.6 Mesturar `calc()` e `clamp()` innecesariamente

```css
/* Redundante */
font-size: clamp(1rem, calc(1rem + 2vw), 3rem);

/* Ben */
font-size: clamp(1rem, 1rem + 2vw, 3rem);
```

`clamp()` xa acepta expresións matemáticas. Non é necesario envolver todo en `calc()`.

### 6.7 Esquecer a unidade

```css
/* Mal: 0 non ten unidade (está ben), pero outros valores necesitan */
width: calc(100% - 20);   /* 20 non ten unidade, non funciona */

/* Ben */
width: calc(100% - 20px);
width: calc(100% - 1.25rem);
```

Só o `0` pode ir sen unidade. Todo o demais require unha.

### 6.8 Fórmulas con resultado negativo

```css
width: calc(100px - 200px);   /* -100px */
```

Nalgunhas propiedades, isto pode causar problemas ou desbordamentos. **Solución:** usar `max(0px, calc(...))` para asegurar que non baixa de cero.

```css
width: max(0px, calc(100px - 200px));   /* dá 0px */
```

---

## 7. Compatibilidade (2026)

| Característica              | Estado                   |
| --------------------------- | ------------------------ |
| `calc()`                    | Universal desde hai anos |
| `min()`, `max()`, `clamp()` | Baseline desde 2020      |
| `vw`, `vh`, `vmin`, `vmax`  | Universal                |
| `dvh`, `svh`, `lvh`         | Baseline desde 2022      |
| `ch`, `ex`                  | Universal                |
| `lh`, `rlh`                 | Baseline desde 2023      |
| `cqw`, `cqi`, etc.          | Baseline desde 2023      |

Todas estas ferramentas están estabilizadas. Podes usalas sen preocupacións.

---

## 8. Exercicios

### Exercicio 1: Tipografía fluída

Escribe CSS para que un `h1` teña:

- Mínimo: `1.5rem`
- Ideal: `1rem + 3vw`
- Máximo: `3rem`

<details>
<summary><b>Amosar a solución</b></summary>

```css
h1 {
    font-size: clamp(1.5rem, 1rem + 3vw, 3rem);
}
```

</details>


### Exercicio 2: Contedor fluído

Escribe CSS para un contedor que ocupe como máximo 1100px, pero que nunca toque os bordos da pantalla (deixa polo menos 1rem por cada lado).

<details>
<summary><b>Amosar a solución</b></summary>

```css
.contido {
    width: min(1100px, 100% - 2rem);
    margin: 0 auto;
}
```

</details>

### Exercicio 3: Padding fluído

Escribe CSS para que o padding dunha sección vaia de `1.5rem` en móbil a `5rem` en escritorio, de forma suave.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.seccion {
    padding: clamp(1.5rem, 1rem + 3vw, 5rem);
}
```

</details>


### Exercicio 4: Altura a pantalla completa

Escribe CSS para que unha sección ocupe toda a pantalla, incluídas as barras do navegador móbil, sen desbordar.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.hero {
    min-height: 100dvh;
}
```

</details>


### Exercicio 5: Converter media queries a clamp

Converte este código a un só `clamp()`:

```css
h2 { font-size: 1.25rem; }

@media (min-width: 768px) {
    h2 { font-size: 1.75rem; }
}

@media (min-width: 1200px) {
    h2 { font-size: 2.5rem; }
}
```

<details>
<summary><b>Amosar a solución</b></summary>

```css
h2 {
    font-size: clamp(1.25rem, 1rem + 1.5vw, 2.5rem);
}
```

</details>


### Exercicio 6: Detectar o erro

```css
.caixa {
    width: calc(100%-2rem);
    height: 100vh;
    font-size: 5vw;
}
```

Atopa tres problemas.

<details>
<summary><b>Amosar a solución</b></summary>

1. `calc(100%-2rem)` non ten espazos ao redor do `-`. Debe ser `calc(100% - 2rem)`.
2. `height: 100vh` pode desbordar en móbil. Mellor `min-height: 100dvh`.
3. `font-size: 5vw` pode ser demasiado grande en pantallas moi anchas ou demasiado pequeno en pantallas moi estreitas. Mellor `clamp()`.

</details>

---

## 9. Para profundar

- **MDN Web Docs:** [CSS values and units](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units) — referencia completa.
- **MDN Web Docs:** [clamp()](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp) — referencia da función.
- **MDN Web Docs:** [Viewport units](https://developer.mozilla.org/en-US/docs/Web/CSS/length#viewport-percentage_lengths) — unidades relativas ao viewport.
- **web.dev:** [Min and max width/height](https://web.dev/learn/css/sizing) — lección sobre tamaños.
- **Ahmad Shadeed:** [CSS clamp() guide](https://ishadeed.com/article/css-min-max-clamp/) — guía práctica.
- **Utopia:** [Fluid Responsive Design](https://utopia.fyi/) — ferramenta para xerar escalas fluídas.
- **W3C:** [CSS Values and Units Module Level 4](https://www.w3.org/TR/css-values-4/) — especificación.

---

## 10. Referencias cruzadas

- **Capítulo 4: Cores, tipografía e unidades** — primeira introdución ás unidades.
- **Capítulo 9: Grid** — `minmax()`, `auto-fit` e `fr` combínanse con `clamp()` e `min()`.
- **Capítulo 11: Media queries** — alternativa a moitos usos destas funcións.
- **Capítulo 12: Container queries** — as unidades `cq*` aparecen aquí.
- **Capítulo 14: Propiedades personalizadas** — as variables CSS son útiles para gardar fórmulas.
- **Capítulo 17: Funcións de cor modernas** — outro grupo de funcións modernas (`color-mix()`, etc.).

---

**Data de creación:** 2026-09-17  
**Última revisión:** 2026-09-17  
**Estado:** Borrador para validación
---
title: "Selectores básicos"
description: "Guía dos selectores CSS básicos, as súas combinacións e o funcionamento da especificidade."
bloque: 1
capitulo: 3
nivel: basico
ultima_revision: "2026-09-17"
estado: "borrador_para_validacion"
compatibilidade: "universal"
palabras_chave:
  - selector
  - elemento
  - clase
  - ID
  - selector_universal
  - agrupacion
  - combinacion
  - especificidade
  - descendente
  - fillo_directo
  - irman_adxacente
  - irman_xerais
---

<!-- # Capítulo 3: Selectores básicos -->

> Un **selector** é a parte dunha regra CSS que indica a que elementos se aplica. Este capítulo cobre os selectores fundamentais: elemento, clase, ID, universal, agrupación, e as combinacións entre eles (descendente, fillo directo, irmá adxacente, irmáns xerais). Tamén introduce a **especificidade**, que determina que regra gaña cando hai conflito.

---

## 1. Introdución: como lle dise ao navegador a que elementos aplicar un estilo

Cando escribes unha regra CSS, o navegador ten que decidir a que elementos do documento lla aplica. Se escribes `color: red;` sen máis, o navegador non sabe se queres poñer vermello a todos os parágrafos, só aos títulos, ou a un elemento concreto. Por iso toda regra comeza cun **selector**.

Un selector é, en esencia, unha **condición**: «aplicar esta regra a todos os elementos que cumpran isto». Pode ser unha condición moi simple («todos os `<h1>`»), unha condición baseada nunha clase («todos os elementos con `class="destacado"`»), ou unha combinación complexa («todos os `<a>` que estean dentro dun `<nav>` e que ademais teñan a clase `activo`»).

Entender ben os selectores é fundamental por tres razóns:

1. **Precisión:** canto mellor saibas seleccionar, menos CSS necesitarás escribir.
2. **Mantemento:** selectores claros fan que o CSS sexa fácil de ler e modificar.
3. **Especificidade:** cando dúas regras afectan ao mesmo elemento, a especificidade dos selectores decide cal gaña. Se non entenden isto, é moi común atoparse con estilos que «non se aplican» sen saber por que.

Este capítulo céntrase nos selectores **básicos** (os que se usan no 90% do CSS real). Os selectores avanzados (pseudo-clases, pseudo-elementos, atributos, `:has()`, etc.) verémolos noutros capítulos.

---

## 2. Conceptos fundamentais

### 2.1 Que é un selector

Un **selector** é un patrón que identifica un conxunto de elementos do documento. Nunha regra CSS, é a parte que vai antes das chaves:

```css
p {
    color: #333333;
}
/* ↑
   Este é o selector. Di: "a todos os elementos <p>" */
```

### 2.2 Elemento, clase e ID

Estes son os tres eixes sobre os que se constrúen case todos os selectores:

- **Elemento (ou etiqueta):** o nome da etiqueta HTML (`p`, `h1`, `a`, `div`...).
- **Clase:** un atributo `class` que pode ter calquera valor. Un elemento pode ter varias clases. Moitos elementos poden compartir a mesma clase.
- **ID:** un atributo `id` que identifica un elemento de forma única no documento. **Non pode haber dous elementos co mesmo `id`** nunha mesma páxina.

```html
<p>Sen atributos.</p>
<p class="destacado">Cunha clase.</p>
<p id="introducion" class="destacado importante">Cun ID e dúas clases.</p>
```

Neste exemplo:

- O primeiro `<p>` só se pode seleccionar por elemento.
- O segundo pódese seleccionar por elemento (`p`) ou por clase (`.destacado`).
- O terceiro pódese seleccionar por elemento (`p`), por ID (`#introducion`), por clase `.destacado`, por clase `.importante`, ou por combinacións.

> ⚠️ **Nota sobre o ID:** Aínda que o HTML permite usar `id` para seleccionar estilos, o seu uso en CSS está **desaconsellado** na maioría dos casos. Os IDs teñen unha especificidade moi alta, o que fai difícil sobrescribir estilos, e non se poden reutilizar. O seu uso lexítimo é para ligazóns internas (`<a href="#introducion">`) e para JavaScript (`document.getElementById`). Para estilos, **prefire clases**.

---

## 3. Selectores básicos

### 3.1 Selector de elemento (ou de tipo)

Selecciona **todos os elementos** cunha etiqueta determinada.

```css
/* Todos os parágrafos */
p {
    color: #333333;
}

/* Todos os títulos de nivel 1 */
h1 {
    font-size: 2rem;
}

/* Todas as ligazóns */
a {
    color: #1a5c8a;
}
```

**Cando usalo:** cando queres aplicar un estilo a todos os elementos dese tipo no documento. É habitual usalo para estilos base (tipografía, marxes por defecto) nunha sección de «reset» ou «base».

### 3.2 Selector de clase

Selecciona todos os elementos que teñan unha clase concreta. Escríbese cun punto diante do nome da clase.

```css
/* Todos os elementos con class="destacado" */
.destacado {
    background: #fef9c3;
    padding: 0.75rem;
}

/* Todos os elementos con class="boton" */
.boton {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: #1a5c8a;
    color: white;
    border-radius: 4px;
}
```

No HTML:

```html
<p class="destacado">Este parágrafo ten a clase destacado.</p>
<a href="#" class="boton">Este botón ten a clase boton.</a>
<button class="boton">Este botón tamén.</button>
```

**Cando usalo:** é o selector máis usado en CSS moderno. Sempre que queiras aplicar un estilo a un conxunto de elementos que comparten unha característica (independentemente da súa etiqueta), usa unha clase.

**Varias clases nun elemento:** un elemento pode ter varias clases separadas por espazos:

```html
<a href="#" class="boton boton-grande boton-secundario">Aceptar</a>
```

Isto permite combinar estilos: `.boton` dá o estilo base, `.boton-grande` aumenta o tamaño, `.boton-secundario` cambia as cores.

### 3.3 Selector de ID

Selecciona o elemento cun `id` concreto. Escríbese cun cancelo (`#`) diante.

```css
#introducion {
    font-size: 1.25rem;
    border-left: 4px solid #1a5c8a;
    padding-left: 1rem;
}
```

No HTML:

```html
<p id="introducion">Este parágrafo ten o ID introducion.</p>
```

**Cando usalo:** case nunca para estilos. Só en casos moi concretos (por exemplo, para «saltar ao contido principal» cunha ligazón interna, ou para estilos moi específicos dunha páxina única). Se dubidas, usa unha clase.

### 3.4 Selector universal

O asterisco `*` selecciona **todos os elementos** do documento.

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

**Cando usalo:** nun «reset» ou «base» ao comezo da folla de estilo, para igualar as diferenzas entre navegadores. **Non abuses del** porque pode afectar o rendemento se se aplica a moitos elementos con moitas propiedades.

**Exemplo típico:** o bloque anterior é un patrón moi habitual ao comezo dun arquivo CSS. Elimina todas as marxes e recheos por defecto, e fai que o `box-sizing` sexa `border-box` para todos os elementos. Isto evita moitos problemas de cálculo de tamaños.

---

## 4. Agrupación de selectores

Se queres aplicar os mesmos estilos a varios selectores, podes agrupalos separándoos con comas.

**Sen agrupar:**

```css
h1 {
    font-family: Georgia, serif;
    color: #1a5c8a;
}

h2 {
    font-family: Georgia, serif;
    color: #1a5c8a;
}

h3 {
    font-family: Georgia, serif;
    color: #1a5c8a;
}
```

**Agrupado:**

```css
h1, h2, h3 {
    font-family: Georgia, serif;
    color: #1a5c8a;
}
```

Os dous fan exactamente o mesmo. O agrupado é máis conciso e fácil de manter (se queres cambiar a cor, só tes que editala nun sitio).

**Importante:** a coma significa «ou». `h1, h2, h3` significa «todos os `h1`, **ou** todos os `h2`, **ou** todos os `h3`». Non significa «elementos que sexan á vez `h1`, `h2` e `h3`» (iso sería imposible).

---

## 5. Combinacións de selectores

Os selectores poden combinarse para crear patróns máis precisos. Hai catro combinacións básicas.

### 5.1 Descendente (espazo)

Selecciona elementos que estean **dentro** doutros elementos, a calquera profundidade. Escríbese cun espazo entre os dous selectores.

```css
/* Todos os <a> que estean dentro dun <nav>, a calquera profundidade */
nav a {
    color: white;
    text-decoration: none;
}
```

No HTML:

```html
<nav>
    <ul>
        <li><a href="#">Inicio</a></li>     <!-- ← este <a> selecciónase -->
        <li><a href="#">Cursos</a></li>     <!-- ← este tamén -->
    </ul>
</nav>

<p>
    <a href="#">Unha ligazón fóra do nav</a>  <!-- ← este NON -->
</p>
```

O selector `nav a` atopa **todos os `<a>` que estean dentro dun `<nav>`**, independentemente de se están dentro dun `<ul>` e un `<li>` de polo medio. A profundidade non importa.

**Cando usalo:** cando queres limitar un estilo a unha zona concreta da páxina (navegación, sección, artigo, etc.).

### 5.2 Fillo directo (`>`)

Selecciona elementos que sexan **fillos directos** doutro elemento. Non inclúe netos nin descendentes máis profundos.

```css
/* Todos os <li> que sexan fillos directos dun <ul> */
ul > li {
    list-style: square;
}
```

No HTML:

```html
<ul>
    <li>Elemento 1</li>           <!-- ← este selecciónase -->
    <li>Elemento 2</li>           <!-- ← este tamén -->
    <li>
        <ul>
            <li>Subelemento</li>  <!-- ← este NON, é neto -->
        </ul>
    </li>
</ul>
```

**Diferenza con descendente:** `ul li` (con espazo) seleccionaría tamén os netos. `ul > li` (con `>`) só selecciona os fillos directos.

**Cando usalo:** cando queres ser preciso e evitar que o estilo se aplique a elementos aniñados máis profundos.

### 5.3 Irmá adxacente (`+`)

Selecciona o elemento que vén **inmediatamente despois** doutro, no mesmo nivel.

```css
/* O <p> que veña inmediatamente despois dun <h2> */
h2 + p {
    margin-top: 0;
    font-weight: bold;
}
```

No HTML:

```html
<h2>Título</h2>
<p>Este parágrafo selecciónase.</p>       <!-- ← este SI -->
<p>Este non, porque non vén inmediatamente despois do h2.</p>
```

**Cando usalo:** cando queres aplicar un estilo a un elemento dependendo do que veña antes. Moi útil para eliminar marxes cando dous elementos van xuntos.

### 5.4 Irmáns xerais (`~`)

Selecciona todos os elementos que veñan **despois** doutro, no mesmo nivel.

```css
/* Todos os <p> que veñan despois dun <h2> */
h2 ~ p {
    color: #555555;
}
```

No HTML:

```html
<h2>Título</h2>
<p>Este parágrafo selecciónase.</p>       <!-- ← este SI -->
<p>Este tamén.</p>                        <!-- ← este tamén -->
<div>Outro elemento</div>
<p>Este tamén, porque veñen despois do h2 no mesmo nivel.</p>
```

**Cando usalo:** menos habitual que `+`, pero útil para aplicar un estilo común a un grupo de elementos que seguen a outro.

---

## 6. Exemplo mínimo funcional

Vexamos unha páxina completa que usa varios tipos de selectores e combinacións.

**Arquivo HTML:**

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <title>Selectores básicos</title>
    <link rel="stylesheet" href="estilos/selectores.css">
</head>
<body>
    <header>
        <h1>O meu sitio</h1>
        <nav>
            <ul>
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Artigos</a></li>
                <li><a href="#">Contacto</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <article>
            <h2>Primeiro artigo</h2>
            <p>Este parágrafo vai inmediatamente despois do título.</p>
            <p class="destacado">Este é un parágrafo destacado.</p>
            <p>Este é un parágrafo normal.</p>
        </article>

        <aside>
            <h3>Ligazóns útiles</h3>
            <ul>
                <li><a href="#">MDN</a></li>
                <li><a href="#">W3C</a></li>
            </ul>
        </aside>
    </main>
</body>
</html>
```

**Arquivo CSS (`estilos/selectores.css`):**

```css
/* ==============================
   Reset básico
   ============================== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    color: #333333;
    line-height: 1.6;
}

/* ==============================
   Cabeceira
   ============================== */

/* Todos os <a> dentro do <nav> */
nav a {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
}

/* O <h1> dentro do <header> */
header h1 {
    color: #1a5c8a;
    margin-bottom: 1rem;
}

/* ==============================
   Artigos
   ============================== */

article h2 {
    color: #1a5c8a;
    margin-bottom: 1rem;
}

/* O <p> inmediatamente despois dun <h2> */
h2 + p {
    font-size: 1.1rem;
    font-weight: bold;
    color: #555555;
}

/* Todos os <p> que veñan despois dun <h2> */
h2 ~ p {
    margin-bottom: 0.75rem;
}

/* Parágrafos con clase destacado */
.destacado {
    background: #fef9c3;
    padding: 1rem;
    border-left: 4px solid #ca8a04;
}

/* ==============================
   Barra lateral
   ============================== */

aside {
    background: #f5f5f5;
    padding: 1rem;
    border-radius: 8px;
}

/* Só os <li> que son fillos directos dun <ul> dentro de <aside> */
aside > ul > li {
    list-style: square;
    margin-left: 1.5rem;
    margin-bottom: 0.5rem;
}
```

**Que está a pasar aquí:**

1. **`*`** (universal) elimina marxes e recheos de todos os elementos e aplica `box-sizing: border-box`.
2. **`body`** (elemento) establece a tipografía e cor base.
3. **`nav a`** (descendente) dá estilo a todas as ligazóns dentro do `<nav>`.
4. **`header h1`** (descendente) dá cor ao título principal.
5. **`article h2`** (descendente) dá cor aos títulos de artigo.
6. **`h2 + p`** (irmá adxacente) aplica estilo ao parágrafo que vén inmediatamente despois dun `<h2>`.
7. **`h2 ~ p`** (irmáns xerais) engade marxe inferior a todos os parágrafos que veñen despois dun `<h2>`.
8. **`.destacado`** (clase) aplica o estilo de recadro amarelo.
9. **`aside`** (elemento) dá fondo e formato á barra lateral.
10. **`aside > ul > li`** (fillo directo encadeado) só aplica o estilo aos `<li>` que son fillos directos dun `<ul>` que é fillo directo dun `<aside>`.

Se abres o HTML no navegador, verás a cabeceira cun título azul e unha navegación horizontal con ligazóns brancas, dous artigos cos títulos en azul e os parágrafos formatados, e unha barra lateral gris con ligazóns cadradas.

---

## 7. Especificidade: que regra gaña

Cando dúas regras afectan ao mesmo elemento e á mesma propiedade, hai un conflito. Por exemplo:

```css
p {
    color: blue;
}

.destacado {
    color: red;
}
```

Se un parágrafo ten `class="destacado"`, cal das dúas cores se aplica? **A vermella**, porque `.destacado` ten maior **especificidade** que `p`.

A especificidade é un valor numérico que se calcula a partir dos selectores. Sen entrar en detalles exhaustivos (haberá un capítulo específico sobre isto), a regra xeral é:

1. **ID** (`#id`) → maior peso.
2. **Clase** (`.clase`), atributo (`[href]`), pseudo-clase (`:hover`) → peso medio.
3. **Elemento** (`p`, `h1`), pseudo-elemento (`::before`) → menor peso.

Canto máis específico é un selector, maior prioridade ten. Se dous selectores teñen a mesma especificidade, gaña o que apareza **máis abaixo** no arquivo CSS.

**Exemplo:**

```css
p {
    color: blue;
}

p {
    color: green;
}
```

Como os dous teñen a mesma especificidade, gaña o segundo (o que vén despois). O texto será verde.

**Táboa rápida de especificidade (de menor a maior):**

| Selector  | Especificidade        |
| --------- | --------------------- |
| `*`       | 0                     |
| `p`       | 1 (elemento)          |
| `.clase`  | 10 (clase)            |
| `p.clase` | 11 (elemento + clase) |
| `#id`     | 100 (ID)              |
| `p#id`    | 101                   |

> 💡 **Nota:** Estes números son unha simplificación para entender a idea. A especificidade real calcúlase cun sistema de tres compoñentes (A, B, C), non cun só número. Pero para o día a día, este modelo simplificado abonda.

**Consello práctico:** evita os IDs para estilos, e non abuses de selectores moi longos. Canto máis simple sexa a especificidade, máis fácil será manter o CSS.

---

## 8. Casos habituais na práctica

### 8.1 Selectores de clase para compoñentes

O patrón máis común en CSS moderno é crear clases para compoñentes reutilizables:

```css
.boton { /* estilo base */ }
.boton-primario { /* variante */ }
.boton-secundario { /* outra variante */ }
.tarxeta { /* tarxeta */ }
.tarxeta-titulo { /* título dentro dunha tarxeta */ }
```

### 8.2 Selectores descendentes para rexións da páxina

Limitar estilos a zonas concretas:

```css
header a { }
footer a { }
article p { }
aside h3 { }
```

Isto evita que os estilos se filtren a outras partes da páxina.

### 8.3 Selectores de fillo directo para listas de navegación

Moi habitual en menús:

```css
.menu > li {
    display: inline-block;
}
```

Só os `<li>` que son fillos directos de `.menu` son elementos de menú; os submenús (que van en `<ul>` aniñados) non seguen este estilo.

### 8.4 Selector universal para o reset

Xa o vimos. É o patrón máis común de comezo dunha folla de estilo:

```css
*, *::before, *::after {
    box-sizing: border-box;
}
```

---

## 9. Compatibilidade (2026)

Todos os selectores básicos descritos neste capítulo están soportados por todos os navegadores desde hai décadas:

- Selector de elemento, clase, ID: CSS1 (1996).
- Selector universal: CSS2 (1998).
- Combinacións descendente, fillo, irmá adxacente, irmáns xerais: CSS1 e CSS2.
- Agrupación con comas: CSS1.

Non hai problemas de compatibilidade. O que si varía entre navegadores é a **especificidade nalgunhas combinacións modernas** (con `:is()`, `:where()`, `:has()`), pero iso verémolo noutros capítulos.

---

## 10. Erros frecuentes

### 10.1 Esquecer o punto nas clases

```css
/* Incorrecto: selecciona a etiqueta <destacado>, que non existe */
destacado {
    color: red;
}

/* Correcto */
.destacado {
    color: red;
}
```

O punto distingue unha clase dunha etiqueta. Sen el, o navegador busca unha etiqueta HTML con ese nome.

### 10.2 Esquecer o cancelo nos IDs

```css
/* Incorrecto */
introducion {
    color: red;
}

/* Correcto */
#introducion {
    color: red;
}
```

O mesmo que coas clases, pero co cancelo.

### 10.3 Usar espazos onde hai que usar `>`

```css
/* Descendente: todos os li dentro do menu, a calquera profundidade */
.menu li { }

/* Fillo directo: só os li fillos directos do menu */
.menu > li { }
```

Estes dous selectores son diferentes. Se non entendes a diferenza, podes ter estilos que non se aplican ou que se aplican onde non queres.

### 10.4 Pensar que unha coma significa «e»

```css
/* Isto significa: "todos os h1, OU todos os p" */
h1, p {
    color: blue;
}

/* Isto significa: "os elementos que sexan h1 E p á vez" (imposible) */
/* Se queres combinar, terías que usar outras técnicas */
```

A coma é un «ou», non un «e».

### 10.5 Abusar de selectores longos

```css
/* Mal: moi específico, difícil de sobrescribir */
body > div > main > article > section > p {
    color: red;
}

/* Ben: máis simple e igual de preciso */
.articulo-texto {
    color: red;
}
```

Canto máis longo o selector, maior especificidade e máis difícil de manter.

### 10.6 Esquecer a especificidade

```css
p {
    color: blue;
}

.destacado {
    color: red;
}
```

Se non entendes por que o parágrafo con clase `.destacado` sae vermello e non azul, é porque `.destacado` ten maior especificidade. Isto é correcto, pero hai que sabelo.

---

## 11. Exercicios

### Exercicio 1: Selectores básicos

Dado o seguinte HTML:

```html
<h1>Título principal</h1>
<p>Primeiro parágrafo.</p>
<p class="aviso">Segundo parágrafo, con aviso.</p>
<p id="final">Terceiro parágrafo, con id.</p>
```

Escribe os selectores CSS para:

1. Todos os parágrafos.
2. O parágrafo con clase `aviso`.
3. O parágrafo con `id="final"`.
4. O título e todos os parágrafos á vez.

<details>
<summary><b>Amosar a solución</b></summary>

```css
p { }
.aviso { }
#final { }
h1, p { }
```

</details>

### Exercicio 2: Combinacións

Dado o seguinte HTML:

```html
<nav>
    <ul>
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Cursos</a></li>
    </ul>
</nav>
<p><a href="#">Ligazón fóra do nav</a></p>
```

Escribe os selectores para:

1. Todas as ligazóns dentro do `nav`.
2. Só os `<li>` que son fillos directos do `<ul>`.
3. Só as ligazóns que van inmediatamente despois dun `<li>`.

<details>
<summary><b>Amosar a solución</b></summary>

```css
nav a { }
ul > li { }
li + a { }
```

</details>

### Exercicio 3: Especificidade

Dadas estas dúas regras:

```css
p {
    color: blue;
}

.importante {
    color: red;
}
```

Se un parágrafo ten `class="importante"`, de que cor sairá? Por que?

<details>
<summary><b>Amosar a solución</b></summary>

Sairá de cor **vermella**, porque `.importante` é unha clase e ten maior especificidade que o selector de elemento `p`.

</details>

### Exercicio 4: Detectar o erro

Atopa o erro nestes selectores:

```css
/* 1 */ .boton { }
/* 2 */ #menu { }
/* 3 */ h1 h2 { }
/* 4 */ p, div { }
/* 5 */ .tarxeta > .titulo { }
```

<details>
<summary><b>Amosar a solución</b></summary>

1. Correcto: clase `boton`.
2. Correcto: ID `menu`.
3. **Errado:** `h1 h2` significa «todos os h2 dentro dun h1», o que case nunca ten sentido. Se querías «todos os h1 e h2», sería `h1, h2`.
4. Correcto: agrupación de elemento `p` e elemento `div`.
5. Correcto: fillo directo con clase `titulo` dentro dun elemento con clase `tarxeta`.

</details>

---

## 12. Para profundar

- **MDN Web Docs:** [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors) — referencia completa de todos os selectores.
- **MDN Web Docs:** [Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Specificity) — explicación detallada da especificidade.
- **W3C:** [Selectors Level 4](https://www.w3.org/TR/selectors-4/) — especificación formal (nivel avanzado).
- **CSS-Tricks:** [The Complete Guide to CSS Selectors](https://css-tricks.com/how-css-selectors-work/) — guía práctica con exemplos.
- **web.dev:** [Learn CSS: Selectors](https://web.dev/learn/css/selectors) — lección interactiva.

---

## 13. Referencias cruzadas

- **Capítulo 1: Que é CSS** — repasa as tres formas de aplicar CSS a un documento HTML.
- **Capítulo 2: Sintaxe** — repasa a estrutura dunha regra (selector, propiedade, valor).
- **Capítulo 4: Cores, tipografía e unidades** — aprofunda nas propiedades que se usan nos exemplos deste capítulo (`color`, `font-size`, `padding`, `margin`).
- **Capítulo 5: Modelo de caixa** — explica en detalle `margin`, `padding` e `border`, moi presentes nos exemplos.
- **Capítulo 16: Pseudo-clases e pseudo-elementos modernos** — amplía os selectores con `:hover`, `:focus`, `::before`, etc.
- **Capítulo 17: Funcións de cor modernas** — cando se vexan as cores, volveremos sobre os selectores e a especificidade con exemplos máis complexos.

---

**Data de creación:** 2026-09-17  
**Última revisión:** 2026-09-17  
**Estado:** Borrador para validación
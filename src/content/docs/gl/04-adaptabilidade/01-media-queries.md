---
title: "Media queries"
description: "Uso das media queries para adaptar os estilos ao tamaño, orientación, medio e preferencias da persoa usuaria."
bloque: 4
capitulo: 11
nivel: intermedio
ultima_revision: "2026-09-17"
estado: "borrador_para_validacion"
compatibilidade: "universal"
palabras_chave:
  - media_query
  - responsive_design
  - breakpoint
  - viewport
  - max_width
  - min_width
  - orientation
  - prefers_color_scheme
  - prefers_reduced_motion
---

<!-- # Capítulo 11: Media queries -->

> As **media queries** (consultas de medios) permiten aplicar estilos CSS **só cando se cumpren certas condicións**, normalmente relacionadas co tamaño da pantalla, mais tamén co tipo de dispositivo, a orientación, as preferencias da persoa usuaria ou a resolución. Son a ferramenta clásica do **deseño adaptativo** (responsive design) e seguen sendo fundamentais en 2026, aínda que agora comparten protagonismo coas container queries (Cap. 12).

---

## 1. Introdución: por que un mesmo CSS non abonda

Cando escribes CSS pensando nunha soa pantalla, o resultado adoita funcionar ben nesa pantalla e mal nas demais. Un layout de tres columnas que se ve perfecto nun monitor de 1920px vólvese ilexible nun móbil de 375px. Unha tipografía de 18px que se le ben nun ordenador é demasiado grande nun reloxo intelixente.

Isto non é un problema novo. A web sempre se viu en dispositivos de tamaños moi distintos: monitores grandes, portátiles, tablets, móbiles, televisores, reloxos, lectores electrónicos, paneis industriais. E non só importa o tamaño: tamén importan a orientación, a densidade de píxeles, a presenza de rato ou de dedo, as preferencias de accesibilidade da persoa usuaria, se está a imprimir a páxina, etc.

**Media queries** son a ferramenta de CSS que permite adaptar os estilos a estas circunstancias. A idea é simple: escribes regras CSS que só se aplican **se se cumpre unha condición**. Por exemplo: «se a pantalla ten menos de 600px de ancho, aplica estes estilos».

Este capítulo explica:

- Que son as media queries e como se escriben.
- Que tipos de condicións se poden comprobar.
- Como se organiza o CSS adaptativo (mobile-first vs desktop-first).
- Que outros usos teñen as media queries ademais do tamaño de pantalla (impresión, accesibilidade, preferencias).
- Cales son os erros máis comúns.

É un capítulo longo porque as media queries están presentes en case calquera proxecto real, e entender ben como funcionan evita moitos problemas. Pero tamén é un capítulo importante porque, a partir de aquí, empezamos a construír CSS que se adapta a contextos moi diversos.

> 💡 **Para pensar:** hai unha idea que cómpre interiorizar desde o principio: **o deseño adaptativo non é «facer unha versión móbil e outra de escritorio»**. É facer **unha soa experiencia** que se adapta progresivamente ao espazo dispoñible. Isto implica pensar en **intervalos** (ranges) en lugar de en tamaños fixos, e en **compoñentes** que se reorganizan, non en páxinas distintas.

---

## 2. Conceptos fundamentais

### 2.1 Que é unha media query

Unha **media query** é unha condición que se escribe cunha sintaxe específica e que envolve un bloque de CSS. Se a condición é verdadeira, os estilos aplícanse. Se é falsa, ignóranse.

```css
@media (min-width: 600px) {
    /* Estes estilos só se aplican
       cando o ancho da ventá é 600px ou máis */
    .contenedor {
        display: flex;
    }
}
```

A sintaxe básica é:

```
@media <condición> {
    /* regras CSS */
}
```

O símbolo `@media` é unha **at-rule** (regra `@`), como `@import` ou `@font-face`, que xa vimos no Cap. 2. Dentro do bloque pode haber calquera regra CSS normal.

### 2.2 Media types: pantalla, impresión, etc.

A forma máis antiga de media query usa **tipos de medio**. Os principais son:

- **`all`:** todos os medios (por defecto se non se indica nada).
- **`screen`:** pantallas (ordenadores, móbiles, tablets, televisores).
- **`print`:** impresoras e vista previa de impresión.

```css
/* Estilos específicos para impresión */
@media print {
    .menu, .pe {
        display: none;   /* non se imprimen */
    }

    body {
        font-size: 12pt;
        color: black;
        background: white;
    }
}
```

**Os media types son útiles sobre todo para `print`.** O tipo `screen` úsase pouco hoxe, porque case todo o contido que chega ao navegador é para pantalla. O interese está nas **media features** (ver 2.3).

### 2.3 Media features: as condicións reais

As **media features** son as condicións que se comproban dentro dunha media query. As máis usadas son:

| Feature                              | Que comproba                                                 |
| ------------------------------------ | ------------------------------------------------------------ |
| `width`, `min-width`, `max-width`    | O ancho da ventá.                                            |
| `height`, `min-height`, `max-height` | A altura da ventá.                                           |
| `orientation`                        | Se a pantalla é vertical (`portrait`) ou horizontal (`landscape`). |
| `aspect-ratio`                       | A proporción entre ancho e alto.                             |
| `resolution`                         | A densidade de píxeles (`1dppx`, `2dppx`...).                |
| `prefers-color-scheme`               | Se a persoa usuaria prefire tema claro ou escuro.            |
| `prefers-reduced-motion`             | Se a persoa usuaria prefire reducir animacións.              |
| `prefers-contrast`                   | Se prefire máis ou menos contraste.                          |
| `hover`                              | Se o dispositivo admite pasar o rato por riba.               |
| `pointer`                            | Se o dispositivo usa rato, dedo, etc.                        |

A maioría destas features pódense combinar con `min-` e `max-`, e combinarse entre si con `and`, `or`, `not`.

### 2.4 Operadores lóxicos

Poden combinarse varias condicións usando operadores lóxicos:

- **`and`:** todas as condicións deben cumprirse.
- **`,`** (coma) ou **`or`:** abonda con que se cumpra unha.
- **`not`:** nega a condición.
- **`only`:** para navegadores antigos (xa case non se usa).

**Exemplos:**

```css
/* Pantalla horizontal e ancho mínimo 800px */
@media screen and (orientation: landscape) and (min-width: 800px) {
    /* ... */
}

/* Pantalla con ancho entre 600px e 900px */
@media (min-width: 600px) and (max-width: 900px) {
    /* ... */
}

/* Móbil OU pantalla estreita */
@media (max-width: 600px), (orientation: portrait) {
    /* ... */
}

/* Calquera cousa agás impresión */
@media not print {
    /* ... */
}
```

**Recomendación:** usa `and` e a sintaxe de intervalos modernos (`600px <= width <= 900px`, ver 2.5) cando poidas. O operador `not` úsase pouco.

### 2.5 Sintaxe de intervalos (range syntax)

CSS moderno permite escribir intervalos dunha forma máis natural e lexible, usando os símbolos `<`, `>`, `<=`, `>=`:

```css
/* En lugar de: (min-width: 600px) and (max-width: 900px) */
@media (600px <= width <= 900px) {
    /* ... */
}

/* Ancho maior ou igual a 600px */
@media (width >= 600px) {
    /* ... */
}

/* Ancho menor que 600px */
@media (width < 600px) {
    /* ... */
}
```

Esta sintaxe é máis recente, pero ten soporte universal desde 2023. É máis clara, sobre todo cando hai intervalos con dous límites.

### 2.6 O viewport e a etiqueta `meta viewport`

Antes de escribir media queries, hai que asegurarse de que o navegador móbil **non finxa** ter un ancho maior do real. Sen isto, as media queries para móbil non funcionarán como se espera.

**Solución:** engadir esta etiqueta no `<head>` de todas as páxinas HTML:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Que fai:**

- `width=device-width`: fai que a ventá lóxica coincida co ancho real do dispositivo.
- `initial-scale=1.0`: escala inicial 1:1.

**Sen esta etiqueta**, os móbiles adoitan usar un viewport virtual de ~980px e reescalar, o que estraga o deseño adaptativo. **É un requisito indispensable** en calquera sitio que queira ser adaptativo.

---

## 3. Sintaxe: como se escriben as media queries

Xa vimos os elementos por separado. Agora vexamos exemplos completos e casos concretos.

### 3.1 Estrutura básica

```css
/* Estilos base (aplicados sempre) */
.contenedor {
    padding: 1rem;
}

/* A partir de 768px, cambia o padding */
@media (min-width: 768px) {
    .contenedor {
        padding: 2rem;
    }
}
```

O CSS que está **fóra** das media queries aplícase sempre. O que está **dentro** só se aplica se se cumpre a condición.

### 3.2 Aniñado dentro de media queries

Podes meter calquera regra CSS dentro dunha media query, incluídas outras at-rules:

```css
@media (min-width: 768px) {
    .tarxeta {
        display: flex;
    }

    @media (min-width: 1200px) {
        .tarxeta {
            padding: 2rem;
        }
    }
}
```

Este aniñado é pouco habitual (é máis común escribir varias media queries separadas), pero é válido.

### 3.3 Media queries dentro de arquivos ligados

Cando un arquivo CSS se liga cun `<link>`, pódese engadir unha media query no atributo `media`:

```html
<link rel="stylesheet" href="base.css">
<link rel="stylesheet" href="escritorio.css" media="(min-width: 1024px)">
<link rel="stylesheet" href="impresion.css" media="print">
```

Isto permite **separar o CSS adaptativo en arquivos distintos**, o que nalgúns casos é útil para non cargar estilos que non se van usar. Na práctica, hoxe é máis común poñer todo o CSS nun só arquivo con media queries dentro, porque o navegador só carga o arquivo unha vez.

---

## 4. Estratexias de deseño adaptativo

Hai dúas estratexias principais para organizar o CSS adaptativo. A elección entre unha e outra inflúe en todo o resto.

### 4.1 Mobile-first (recomendada)

**Estratexia:** escribes primeiro os estilos para móbil (a pantalla máis pequena), e despois **engades** estilos para pantallas máis grandes usando `min-width`.

```css
/* Estilos base (móbil) */
.contenedor {
    display: block;
    padding: 1rem;
}

/* Tablet en diante */
@media (min-width: 768px) {
    .contenedor {
        display: flex;
        padding: 1.5rem;
    }
}

/* Escritorio en diante */
@media (min-width: 1024px) {
    .contenedor {
        padding: 2rem;
    }
}
```

**Vantaxes:**

- O CSS base é o máis simple, porque a pantalla pequena require menos layout.
- Os estilos de pantallas grandes **engádense encima**, sen sobrescribir.
- O resultado é CSS máis limpo e máis fácil de manter.
- Funciona ben en dispositivos futuros de calquera tamaño.

**É a estratexia recomendada hoxe** pola comunidade e por todos os manuais modernos.

### 4.2 *Desktop-first*

**Estratexia:** escribes primeiro os estilos para escritorio, e despois **cambias** cousas para pantallas pequenas usando `max-width`.

```css
/* Estilos base (escritorio) */
.contenedor {
    display: flex;
    padding: 2rem;
}

/* Móbil en diante */
@media (max-width: 767px) {
    .contenedor {
        display: block;
        padding: 1rem;
    }
}
```

**Vantaxes:**

- Se xa tes un deseño de escritorio e queres engadir adaptación a móbil, pode ser máis rápido.
- Algúns deseñadores pensan primeiro en escritorio.

**Inconvenientes:**

- O CSS base é máis complexo e hai que sobrescribir moitas cousas.
- As media queries con `max-width` van «por debaixo», o que pode levar a estilos que se solapan.
- Non escala ben a dispositivos futuros.

**Recomendación:** usa **mobile-first** sempre que poidas. Se tes que traballar con código antigo escrito desktop-first, mantén a coherencia.

### 4.3 *Breakpoints*: onde poñer os límites

Un ***breakpoint*** é un valor de ancho no que o deseño cambia. A pregunta clásica é: **que *breakpoints* usar?**

**Resposta curta:** depende do teu contido, non de tamaños estándar.

**Resposta longa:** hai unha lista de breakpoints «habituales» que se repiten en moitos proxectos, pero non hai un estándar. Os máis usados son:

| Nome               | Ancho mínimo | Dispositivos típicos                       |
| ------------------ | ------------ | ------------------------------------------ |
| `sm` (small)       | 640px        | Móbiles en horizontal                      |
| `md` (medium)      | 768px        | Tablets en vertical                        |
| `lg` (large)       | 1024px       | Tablets en horizontal, portátiles pequenos |
| `xl` (extra large) | 1280px       | Portátiles, monitores                      |
| `2xl`              | 1536px       | Monitores grandes                          |

**Recomendación práctica:** comeza con 3 breakpoints (por exemplo 640, 1024, 1280) e engade máis só se o contido o pide. **Non engadas breakpoints «porque si»**. Cada breakpoint é unha responsabilidade máis de manter.

**Truco para saber se necesitas un breakpoint:** abre a páxina no navegador e vai redimensionando a ventá pouco a pouco. Se hai algún ancho no que o deseño se ve mal (algo rompe, algo queda demasiado estreito, algo desborda), ese é o punto onde necesitas un breakpoint.

### 4.4 A organización do CSS

Independentemente da estratexia, convén agrupar as media queries ao final do arquivo, ou xunto ás regras que modifican. Hai dous estilos:

**Estilo 1: media queries agrupadas ao final**

```css
/* Estilos base */
.tarxeta { /* ... */ }
.menu { /* ... */ }
.pe { /* ... */ }

/* Tablet */
@media (min-width: 768px) {
    .tarxeta { /* ... */ }
    .menu { /* ... */ }
}

/* Escritorio */
@media (min-width: 1024px) {
    .tarxeta { /* ... */ }
    .pe { /* ... */ }
}
```

**Vantaxe:** todas as adaptacións están xuntas, é fácil ver o que cambia.

**Estilo 2: media queries xunto a cada compoñente**

```css
.tarxeta {
    /* estilos base */
}

@media (min-width: 768px) {
    .tarxeta {
        /* adaptación */
    }
}

.menu {
    /* estilos base */
}

@media (min-width: 768px) {
    .menu {
        /* adaptación */
    }
}
```

**Vantaxe:** cada compoñente ten o seu CSS xunto, é máis fácil de mover a outros proxectos.

**Recomendación:** o Estilo 2 funciona mellor en proxectos con compoñentes (React, Vue, etc.) ou con CSS modular. O Estilo 1 funciona mellor en arquivos únicos grandes.

---

## 5. Outros usos das media queries

As media queries non só serven para adaptar ao tamaño de pantalla. Hai outros usos moi útiles.

### 5.1 Preferencia de tema claro ou escuro

Moitas persoas configuran o seu sistema operativo para usar tema escuro. Podes respectar esa preferencia:

```css
/* Estilos para tema claro (por defecto) */
body {
    background: white;
    color: #333;
}

/* Estilos para tema escuro */
@media (prefers-color-scheme: dark) {
    body {
        background: #1a1a1a;
        color: #e0e0e0;
    }
}
```

**Nota:** non é obrigatorio ofrecer tema escuro, pero é unha boa práctica de accesibilidade. Podes tamén ofrecer un interruptor manual (con JavaScript) que sobrescriba a preferencia do sistema.

### 5.2 Preferencia de reducir animacións

Algunhas persoas teñen sensibilidade ao movemento ou vértixes, e configuran o sistema para reducir animacións. Podes respectalo:

```css
.boton {
    transition: transform 0.3s, background 0.3s;
}

.boton:hover {
    transform: scale(1.05);
}

@media (prefers-reduced-motion: reduce) {
    .boton {
        transition: none;
    }

    .boton:hover {
        transform: none;
    }
}
```

Isto **non é opcional** se o teu sitio ten animacións: hai persoas que poden ter problemas de saúde. É unha cuestión de accesibilidade.

### 5.3 Preferencia de maior contraste

Persoas con baixa visión poden configurar maior contraste:

```css
@media (prefers-contrast: more) {
    body {
        color: black;
        background: white;
    }

    .boton {
        border: 2px solid black;
    }
}
```

### 5.4 Tipo de dispositivo de entrada

Podes comprobar se o dispositivo ten rato (permite `hover`) ou só dedo:

```css
/* Só se permite hover (rato, trackpad) */
@media (hover: hover) and (pointer: fine) {
    .boton:hover {
        background: #0d3a5c;
    }
}

/* Só se NON permite hover (táctil) */
@media (hover: none) {
    .boton:active {
        background: #0d3a5c;
    }
}
```

Isto é útil porque **en dispositivos táctiles, `:hover` pode comportarse de forma estraña**. Se un elemento ten estilos só para `:hover`, nun móbil pode quedar «atascado» despois de tocalo.

### 5.5 Orientación da pantalla

```css
@media (orientation: landscape) {
    /* Pantalla horizontal (ancho > alto) */
    .galeria {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (orientation: portrait) {
    /* Pantalla vertical (alto > ancho) */
    .galeria {
        grid-template-columns: repeat(2, 1fr);
    }
}
```

Útil en móbiles e tablets, onde a orientación cambia con frecuencia.

### 5.6 Impresión

```css
@media print {
    /* Ocultar elementos que non van impresos */
    nav, aside, footer {
        display: none;
    }

    /* Ajustar cores para aforrar tinta */
    body {
        color: black;
        background: white;
    }

    /* Evitar cortes de liñas */
    h1, h2, h3 {
        page-break-after: avoid;
    }

    /* Amosar a URL das ligazóns */
    a::after {
        content: " (" attr(href) ")";
        font-size: 0.8em;
        color: #666;
    }
}
```

**Os estilos de impresión son unha parte de accesibilidade e de calidade** que moitos sitios esquecen. Cando alguén imprime unha páxina, o resultado adoita ser horrible se non se preparan estilos específicos.

### 5.7 Resolución de pantalla

```css
@media (min-resolution: 2dppx) {
    /* Pantallas de alta densidade (Retina, etc.) */
    .logo {
        background-image: url("logo@2x.png");
        background-size: contain;
    }
}
```

Hoxe en día isto úsase pouco porque os formatos vectoriais (SVG) e as imaxes responsivas (`srcset`) resolven o problema doutra forma. Pero é útil sabelo.

---

## 6. Exemplo mínimo funcional

Vexamos unha páxina completa que usa media queries para adaptarse a distintos tamaños, con estratexia mobile-first.

**Arquivo HTML:**

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Media queries</title>
    <link rel="stylesheet" href="estilos/adaptativo.css">
</head>
<body>
    <header class="cabecera">
        <h1>O meu sitio</h1>
        <nav class="menu">
            <a href="#">Inicio</a>
            <a href="#">Cursos</a>
            <a href="#">Contacto</a>
        </nav>
    </header>

    <main class="contido">
        <article class="tarxeta">
            <h2>Primeiro artigo</h2>
            <p>Un texto de exemplo para ver como se adapta.</p>
        </article>

        <article class="tarxeta">
            <h2>Segundo artigo</h2>
            <p>Outro texto de exemplo.</p>
        </article>

        <article class="tarxeta">
            <h2>Terceiro artigo</h2>
            <p>E outro máis.</p>
        </article>
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

body {
    font-family: system-ui, sans-serif;
    line-height: 1.6;
    color: #333;
    background: #fafafa;
}

/* ==============================
   Estilos base (móbil primeiro)
   ============================== */

.cabecera {
    background: #1a5c8a;
    color: white;
    padding: 1rem;
}

.cabecera h1 {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
}

.menu {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.menu a {
    color: white;
    text-decoration: none;
    padding: 0.5rem 0;
}

.contido {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
}

.tarxeta {
    background: white;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #e5e5e5;
}

.tarxeta h2 {
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
    color: #1a5c8a;
}

/* ==============================
   Tablet en diante (≥ 640px)
   ============================== */

@media (min-width: 640px) {
    .cabecera {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
    }

    .cabecera h1 {
        margin-bottom: 0;
    }

    .menu {
        flex-direction: row;
        gap: 1.5rem;
    }

    .contido {
        grid-template-columns: repeat(2, 1fr);
        padding: 1.5rem 2rem;
        gap: 1.5rem;
    }
}

/* ==============================
   Escritorio en diante (≥ 1024px)
   ============================== */

@media (min-width: 1024px) {
    .contido {
        grid-template-columns: repeat(3, 1fr);
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
        gap: 2rem;
    }

    .tarxeta {
        padding: 1.5rem;
    }

    .tarxeta h2 {
        font-size: 1.25rem;
    }
}

/* ==============================
   Accesibilidade: reducir animacións
   ============================== */

@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}

/* ==============================
   Impresión
   ============================== */

@media print {
    .cabecera {
        background: white;
        color: black;
    }

    .menu {
        display: none;
    }

    .tarxeta {
        border: 1px solid black;
        page-break-inside: avoid;
    }
}
```

**Que está a pasar aquí:**

1. **Os estilos base** son para móbil: cabeceira en columna, menú en columna, unha soa columna de tarxetas.
2. **A partir de 640px**, o menú pasa a fila e o contido pasa a dúas columnas. A cabeceira distribúese horizontalmente.
3. **A partir de 1024px**, o contido pasa a tres columnas e limítase o ancho total a 1200px.
4. **A media query de `prefers-reduced-motion`** desactiva animacións para quen o pida.
5. **A media query de impresión** oculta a cabeceira e o menú, e adapta as tarxetas.

**Como probalo:**

- Abre o HTML no navegador e vai redimensionando a ventá. Verás como o layout cambia nos breakpoints.
- En Chrome ou Firefox, abre DevTools (F12) e activa a vista de dispositivo móbil (Ctrl+Shift+M en Chrome) para simular distintos tamaños.
- Para probar a impresión, usa «Imprimir» ou a vista previa de impresión.

---

## 7. Casos habituais na práctica

### 7.1 Contedor central con ancho máximo

```css
.contido {
    padding: 1rem;
}

@media (min-width: 1024px) {
    .contido {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }
}
```

### 7.2 Cabeceira que cambia de columna a fila

```css
.cabecera {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
}

@media (min-width: 768px) {
    .cabecera {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
    }
}
```

Este patrón é moi común en cabeceiras con logo e menú.

### 7.3 Galería que se adapta

```css
.galeria {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
}

@media (min-width: 640px) {
    .galeria {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .galeria {
        grid-template-columns: repeat(3, 1fr);
    }
}
```

**Alternativa sen media queries:**

```css
.galeria {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
}
```

Ves como, en moitos casos, Grid pode facer o mesmo sen media queries. Isto é **preferible** cando o deseño o permite: menos código, menos responsabilidade.

### 7.4 Tipografía adaptativa

```css
h1 {
    font-size: 1.5rem;
}

@media (min-width: 768px) {
    h1 {
        font-size: 2rem;
    }
}

@media (min-width: 1024px) {
    h1 {
        font-size: 2.5rem;
    }
}
```

**Alternativa moderna con `clamp()`:**

```css
h1 {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
}
```

Tamén evita media queries, e o tamaño cambia de forma **fluída**, non a saltos.

### 7.5 Ocultar e amosar elementos

```css
.menu-horizontal {
    display: none;
}

@media (min-width: 1024px) {
    .menu-horizontal {
        display: flex;
    }
}

.menu-mobil {
    display: flex;
}

@media (min-width: 1024px) {
    .menu-mobil {
        display: none;
    }
}
```

Coidado: ocultar elementos con `display: none` fai que non se lean polos lectores de pantalla. Se o contido é importante, hai que ofrecer alternativas accesibles.

---

## 8. Erros frecuentes

### 8.1 Esquecer a etiqueta `meta viewport`

Sen ela, as media queries non funcionan ben en móbiles. **Erro número un.**

```html
<!-- Indispensable en todas as páxinas -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### 8.2 Mesturar `min-width` e `max-width` sen orde

Se tes media queries con `min-width` e outras con `max-width`, pódense solapar e crear resultados inesperados.

```css
/* Problemático: a 800px, cúmprense as dúas? */
@media (max-width: 800px) { /* ... */ }
@media (min-width: 800px) { /* ... */ }
```

**Solución:** escolle unha estratexia (mobile-first ou desktop-first) e séguia. Non mestures.

### 8.3 Repetir moito o mesmo CSS

```css
/* Mal: repite regras */
@media (min-width: 768px) {
    .a { color: red; }
    .b { color: blue; }
    .c { color: green; }
}

@media (min-width: 1024px) {
    .a { color: red; }
    .b { color: blue; }
    .c { color: green; font-size: 1.2rem; }
}
```

Agrupa o que é común e só cambia o que sexa distinto.

### 8.4 Non probar nun dispositivo real

As ferramentas de simulación do navegador son útiles, pero non substitúen probar nun móbil real. O rendemento, o tacto, a resolución real, etc. só se poden comprobar así.

### 8.5 Breakpoints ao azar

Non engadas breakpoints sen motivo. Cada breakpoint ten que responder a un punto no que o deseño necesita cambiar.

### 8.6 Esquecer `prefers-reduced-motion`

Se tes animacións, **sempre** hai que respectar esta preferencia. É unha cuestión de accesibilidade e de respecto.

### 8.7 Usar `max-width` cando se pode usar `min-width`

En mobile-first, usa sempre `min-width`. Se te atopas usando `max-width`, probablemente esteas escribindo desktop-first sen querer.

---

## 9. Compatibilidade (2026)

| Característica                                   | Estado                            |
| ------------------------------------------------ | --------------------------------- |
| Media queries básicas (`min-width`, `max-width`) | Universal desde hai décadas       |
| `prefers-color-scheme`                           | Universal desde 2020              |
| `prefers-reduced-motion`                         | Universal desde 2020              |
| `prefers-contrast`                               | Universal (con matices en Safari) |
| `hover`, `pointer`                               | Universal                         |
| Sintaxe de intervalos (`width >= 600px`)         | Baseline desde 2023               |
| `orientation`                                    | Universal                         |

As media queries están completamente estabilizadas. Podes usalas sen preocupacións.

---

## 10. Exercicios

### Exercicio 1: Estrutura básica

Dado este CSS:

```css
.tarxeta {
    display: block;
    padding: 1rem;
}
```

Escribe unha media query para que, a partir de 768px, as tarxetas se amosen en dúas columnas cunha grella.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.tarxeta {
    display: block;
    padding: 1rem;
}

@media (min-width: 768px) {
    .tarxetas {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }
}
```

</details>

### Exercicio 2: Mobile-first

Reescribe este CSS (desktop-first) a mobile-first:

```css
.menu {
    display: flex;
    gap: 2rem;
}

@media (max-width: 767px) {
    .menu {
        display: block;
        gap: 0;
    }
}
```

<details>
<summary><b>Amosar a solución</b></summary>

```css
.menu {
    display: block;
}

@media (min-width: 768px) {
    .menu {
        display: flex;
        gap: 2rem;
    }
}
```

</details>

### Exercicio 3: Preferencias

Escribe CSS para que, se a persoa usuaria prefire tema escuro, o fondo sexa `#1a1a1a` e o texto `#e0e0e0`. E se prefire reducir animacións, que as transicións se desactiven.

<details>
<summary><b>Amosar a solución</b></summary>

```css
@media (prefers-color-scheme: dark) {
    body {
        background: #1a1a1a;
        color: #e0e0e0;
    }
}

@media (prefers-reduced-motion: reduce) {
    * {
        transition: none !important;
        animation: none !important;
    }
}
```

</details>


### Exercicio 4: Impresión

Escribe CSS para que, ao imprimir, se oculten os elementos `<nav>` e `<footer>`, e as ligazóns amosen a súa URL entre parénteses.

<details>
<summary><b>Amosar a solución</b></summary>

```css
@media print {
    nav, footer {
        display: none;
    }

    a::after {
        content: " (" attr(href) ")";
        font-size: 0.9em;
        color: #666;
    }
}
```

</details>


### Exercicio 5: Identificar breakpoints

Dado un deseño que se ve ben ata 500px, empeora entre 500 e 700, mellora entre 700 e 1100, e empeora a partir de 1100, que breakpoints usarías e por que?

<details>
<summary><b>Amosar a solución</b></summary>

Os puntos onde o deseño cambia son 500, 700 e 1100. Con mobile-first:

```css
@media (min-width: 500px) { /* ... */ }
@media (min-width: 700px) { /* ... */ }
@media (min-width: 1100px) { /* ... */ }
```

</details>

---

## 11. Para profundar

- **MDN Web Docs:** [Media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries) — referencia completa.
- **MDN Web Docs:** [Using media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries) — guía práctica.
- **MDN Web Docs:** [Responsive design](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design) — introdución ao deseño adaptativo.
- **web.dev:** [Learn CSS: Media queries](https://web.dev/learn/design/media-queries) — lección interactiva.
- **web.dev:** [Learn Responsive Design](https://web.dev/learn/design) — curso completo de deseño adaptativo.
- **A List Apart:** [Responsive Web Design](https://alistapart.com/article/responsive-web-design/) — o artigo orixinal de Ethan Marcotte (2010), que definiu o termo.
- **W3C:** [Media Queries Level 4](https://www.w3.org/TR/mediaqueries-4/) — especificación actual.
- **A11Y Project:** [Reduced motion](https://www.a11yproject.com/posts/understanding-prefers-reduced-motion/) — artigo sobre `prefers-reduced-motion`.

---

## 12. Referencias cruzadas

- **Capítulo 6: `display`, fluxo normal e posicionamento** — as media queries modifican o `display` e outras propiedades.
- **Capítulo 8: Flexbox** — as media queries úsanse moito para cambiar `flex-direction` e outras propiedades.
- **Capítulo 9: Grid** — moitas veces as media queries cambian o número de columnas dunha grella.
- **Capítulo 12: Container queries** — a evolución das media queries, baseadas no contedor en lugar do viewport.
- **Capítulo 13: Unidades relativas e funcións modernas** — `clamp()`, `min()`, `max()` reducen a necesidade de media queries.
- **Capítulo 26: Accesibilidade e CSS** — `prefers-reduced-motion` e `prefers-color-scheme` son parte da accesibilidade.

---

**Data de creación:** 2026-09-17  
**Última revisión:** 2026-09-17  
**Estado:** Borrador para validación
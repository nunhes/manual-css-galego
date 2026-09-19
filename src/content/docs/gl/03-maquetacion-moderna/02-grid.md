---
title: "Grid"
description: "Guía de CSS Grid para crear layouts bidimensionais con filas, columnas, áreas e grellas adaptativas."
bloque: 3
capitulo: 9
nivel: intermedio
ultima_revision: "2026-09-17"
estado: "borrador_para_validacion"
compatibilidade: "universal"
palabras_chave:
  - grid
  - layout_bidimensional
  - display_grid
  - grid_template_columns
  - grid_template_rows
  - grid_area
  - grid_gap
  - fr
  - minmax
  - auto_fit
  - auto_fill
  - grid_column
  - grid_row
---

<!-- # Capítulo 9: Grid -->

> **CSS Grid** é un sistema de maquetación **bidimensional**: controla filas e columnas á vez. É a ferramenta máis potente de CSS para crear layouts complexos. Este capítulo explica como definir grellas, como colocar elementos nas celas, como crear layouts adaptativos sen media queries, e cando convén usar Grid en lugar de Flexbox.

---

## 1. Introdución: o sistema de layout definitivo

Cando apareceu Flexbox, parecía que xa non facía falta nada máis. Pero Flexbox é **unidimensional**: organiza elementos nunha dirección (fila ou columna). Se necesitas controlar filas e columnas á vez, Flexbox queda curto: tes que aniñar contedores flexibles uns dentro doutros, o que complica o código.

**CSS Grid** resolveu isto. É un sistema **bidimensional**: defines unha grella con filas e columnas, e colocas os elementos nas celas. Igual que unha folla de cálculo. Isto permite crear layouts complexos (páxinas completas, galerías, formularios, dashboards) con moi pouco código.

Grid apareceu como borrador en 2011, estabilizouse en 2017, e hoxe está soportado universalmente. É o sistema máis potente de CSS para maquetación, e a ferramenta principal para layouts de páxina completa.

> 💡 **Cando usar Grid e cando Flexbox:** unha regra sinxela:
>
> - **Grid:** para layouts de dúas dimensións (filas **e** columnas á vez). Layouts de páxina completa, galerías, formularios estruturados.
> - **Flexbox:** para layouts dunha soa dimensión (fila **ou** columna). Barras de navegación, listas, compoñentes individuais.
>
> Na práctica, úsanse xuntos: Grid para a estrutura xeral da páxina, Flexbox para compoñentes dentro das celas.

---

## 2. Conceptos fundamentais

### 2.1 Contedor e fillos

Igual que en Flexbox, hai dous roles:

- **Contedor de grella (grid container):** o elemento ao que se lle aplica `display: grid` ou `display: inline-grid`.
- **Fillos de grella (grid items):** os fillos directos do contedor.

```css
.contenedor {
    display: grid;
}
```

### 2.2 Filas, columnas e celas

Unha grella está formada por:

- **Filas (rows):** as liñas horizontais.
- **Columnas (columns):** as liñas verticais.
- **Celas (cells):** as interseccións de fila e columna. É onde se colocan os fillos.

```
   ┌────────┬────────┬────────┐
   │  Cela  │  Cela  │  Cela  │  ← fila 1
   ├────────┼────────┼────────┤
   │  Cela  │  Cela  │  Cela  │  ← fila 2
   ├────────┼────────┼────────┤
   │  Cela  │  Cela  │  Cela  │  ← fila 3
   └────────┴────────┴────────┘
    col 1    col 2    col 3
```

### 2.3 Liñas de grella

As **liñas de grella (grid lines)** son as divisións entre filas e columnas. Nunha grella de 3 columnas hai **4 liñas verticais** (a 1 é a beira esquerda, a 4 é a beira dereita). Isto é importante porque a colocación de elementos faise indicando números de liña.

```
   liña 1  liña 2  liña 3  liña 4
     │       │       │       │
     │  col  │  col  │  col  │
     │   1   │   2   │   3   │
     │       │       │       │
```

---

## 3. Definir a grella

### 3.1 `grid-template-columns` e `grid-template-rows`

Estas propiedades definen as columnas e as filas da grella.

```css
.contenedor {
    display: grid;
    grid-template-columns: 200px 200px 200px;  /* tres columnas de 200px */
    grid-template-rows: 100px 100px;            /* dúas filas de 100px */
}
```

**A unidade `fr`:** representa unha **fracción** do espazo dispoñible. É a unidade máis útil de Grid.

```css
.contenedor {
    grid-template-columns: 1fr 1fr 1fr;  /* tres columnas iguais */
    grid-template-columns: 2fr 1fr;      /* a primeira o dobre que a segunda */
}
```

**Mesturar unidades:**

```css
.contenedor {
    grid-template-columns: 250px 1fr 250px;  /* sidebar + contido + sidebar */
}
```

**A función `repeat()`:** para non repetir valores.

```css
.contenedor {
    grid-template-columns: repeat(3, 1fr);           /* tres columnas iguais */
    grid-template-columns: repeat(4, 100px);         /* catro columnas de 100px */
    grid-template-columns: repeat(2, 1fr 2fr);       /* alterna 1fr, 2fr, 1fr, 2fr */
}
```

### 3.2 `gap`: espazo entre celas

```css
.contenedor {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;              /* mesmo espazo entre filas e columnas */
    gap: 1rem 2rem;         /* filas 1rem, columnas 2rem */
    row-gap: 1rem;
    column-gap: 2rem;
}
```

### 3.3 `grid-auto-rows` e `grid-auto-columns`

Cando un elemento se coloca nunha fila ou columna que non foi definida explicitamente, o navegador crea unha «implícita». Estas propiedades controlan o tamaño desas filas/columnas implícitas.

```css
.contenedor {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(100px, auto);  /* filas implícitas de polo menos 100px */
}
```

**`minmax(min, max)`:** establece un tamaño mínimo e máximo.

```css
grid-auto-rows: minmax(100px, auto);   /* mínimo 100px, máximo o que pida o contido */
grid-auto-rows: minmax(200px, 1fr);
```

### 3.4 `grid-template-areas`: nomear rexións

Unha das características máis potentes de Grid é poder **nomear rexións** e colocar elementos por nome.

```css
.contenedor {
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
        "cabecera cabecera"
        "sidebar  contido"
        "pe        pe";
    gap: 1rem;
    min-height: 100vh;
}

.cabecera { grid-area: cabecera; }
.sidebar  { grid-area: sidebar; }
.contido  { grid-area: contido; }
.pe       { grid-area: pe; }
```

Este patrón é moi limpo e visual: vese a estrutura do layout no propio CSS.

**Regras:**

- Cada cadea de texto representa unha fila.
- Cada palabra dentro da cadea é un nome de rexión.
- Un punto (`.`) representa unha cela baleira.
- As rexións teñen que ser rectangulares.

---

## 4. Colocar elementos na grella

Hai varias formas de colocar un elemento nunha cela concreta.

### 4.1 Por número de liña

```css
.elemento {
    grid-column: 1 / 3;   /* desde a liña 1 ata a liña 3 */
    grid-row: 2 / 4;      /* desde a liña 2 ata a liña 4 */
}
```

- `grid-column: 1 / 3` significa «desde a liña vertical 1 ata a liña vertical 3». Ocupa dúas columnas.
- `grid-row: 2 / 4` significa «desde a liña horizontal 2 ata a liña horizontal 4». Ocupa dúas filas.

**Atallo `span`:** ocupa un número de celas sen especificar a liña final.

```css
.elemento {
    grid-column: span 2;   /* ocupa 2 columnas a partir de onde estea */
    grid-row: span 3;      /* ocupa 3 filas */
}
```

### 4.2 Por área nomeada

```css
.elemento {
    grid-area: cabecera;
}
```

Usando as áreas definidas con `grid-template-areas`.

### 4.3 Automática

Se non colocas un elemento explicitamente, colócase na primeira cela libre. Isto é o que ocorre por defecto cando só defines as columnas.

---

## 5. Grellas adaptativas sen media queries

Unha das marabillas de Grid é poder crear grellas que se adaptan ao ancho da pantalla **sen escribir media queries**. Isto faise coas palabras clave `auto-fit` e `auto-fill` combinadas con `minmax()`.

### 5.1 `auto-fit`

```css
.galeria {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
}
```

**Que fai isto:**

- Crea tantas columnas como caiban, cada unha de polo menos 250px.
- Se sobran columnas, estíraas para encher o espazo (grazas a `1fr`).
- Se a pantalla é estreita, reduce o número de columnas.

**Exemplo:** nunha pantalla de 1000px, caben 4 columnas de 250px. Nunha de 600px, caben 2. Nunha de 300px, cabe 1. Todo automático.

### 5.2 `auto-fill` fronte a `auto-fit`

- **`auto-fill`:** crea tantas columnas como caiban, aínda que algunhas queden baleiras.
- **`auto-fit`:** como `auto-fill`, pero se sobran columnas baleiras, estira as existentes.

Na práctica, `auto-fit` adoita dar mellor resultado para galerías, e `auto-fill` para grellas con columnas que deben manterse.

---

## 6. Exemplo mínimo funcional

Vexamos unha páxina completa cun layout de tres zonas (cabeceira, sidebar, contido, pé) feito con Grid, e unha galería adaptativa.

**Arquivo HTML:**

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <title>Layout con Grid</title>
    <link rel="stylesheet" href="estilos/grid.css">
</head>
<body>
    <div class="layout">
        <header class="cabecera">
            <h1>O meu sitio</h1>
        </header>

        <aside class="sidebar">
            <h2>Menú</h2>
            <ul>
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Cursos</a></li>
                <li><a href="#">Contacto</a></li>
            </ul>
        </aside>

        <main class="contido">
            <h2>Contido principal</h2>
            <div class="galeria">
                <article class="tarxeta">Tarxeta 1</article>
                <article class="tarxeta">Tarxeta 2</article>
                <article class="tarxeta">Tarxeta 3</article>
                <article class="tarxeta">Tarxeta 4</article>
                <article class="tarxeta">Tarxeta 5</article>
                <article class="tarxeta">Tarxeta 6</article>
            </div>
        </main>

        <footer class="pe">
            <p>© 2026 Programación en Galego</p>
        </footer>
    </div>
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
}

/* ==============================
   Layout principal
   ============================== */
.layout {
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
        "cabecera cabecera"
        "sidebar  contido"
        "pe       pe";
    gap: 1rem;
    min-height: 100vh;
    padding: 1rem;
}

.cabecera {
    grid-area: cabecera;
    background: #1a5c8a;
    color: white;
    padding: 1.5rem;
    border-radius: 8px;
}

.sidebar {
    grid-area: sidebar;
    background: #f5f5f5;
    padding: 1.5rem;
    border-radius: 8px;
}

.contido {
    grid-area: contido;
    background: #fafafa;
    padding: 1.5rem;
    border-radius: 8px;
}

.pe {
    grid-area: pe;
    background: #333333;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    text-align: center;
}

/* ==============================
   Galería adaptativa
   ============================== */
.galeria {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
}

.tarxeta {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    text-align: center;
}
```

**Que está a pasar aquí:**

1. **`.layout`** é un contedor de grella con dúas columnas (250px fixa e 1fr flexible) e tres filas (auto, 1fr, auto).
2. **`grid-template-areas`** define a estrutura visual do layout, con nomes de rexión.
3. **Cada elemento** colócase na súa rexión con `grid-area`.
4. **`min-height: 100vh`** asegura que o layout ocupe toda a pantalla.
5. **`.galeria`** é unha subgrella adaptativa: crea tantas columnas de 200px como caiban.

Se redimensionas a ventá, verás que a galería se adapta automaticamente: nunha pantalla grande hai varias columnas, nunha pantalla pequena hai menos. E o layout xeral mantense.

---

## 7. Casos habituais na práctica

### 7.1 Layout de páxina completa

O patrón máis común:

```css
.layout {
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 1fr;
    min-height: 100vh;
}

.cabecera { grid-row: 1; }
.principal { grid-row: 2; }
.pe { grid-row: 3; }
```

Isto fai que a páxina ocupe toda a pantalla, co contido principal collendo o espazo restante. O pé queda sempre ao final.

### 7.2 Galería de tarxetas adaptativa

Xa o vimos:

```css
.galeria {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}
```

### 7.3 Formulario con etiquetas aliñadas

```css
.formulario {
    display: grid;
    grid-template-columns: 150px 1fr;
    gap: 1rem;
    align-items: center;
}

.formulario label {
    text-align: right;
}
```

As etiquetas á esquerda, os campos á dereita, todo aliñado.

### 7.4 Superpoñer elementos nunha cela

Grid permite que varios elementos ocupen a mesma cela, o que é útil para superpoñer:

```css
.contenedor {
    display: grid;
    grid-template-columns: 1fr;
}

.contenedor > * {
    grid-area: 1 / 1;   /* todos na mesma cela */
}
```

**Uso:** imaxe de fondo con texto enriba, badges, overlays, etc.

### 7.5 Cards con contido variable

```css
.tarxetas {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
}

.tarxeta {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
```

Grid para a grella exterior, Flexbox para o interior da tarxeta. Este patrón é moi habitual.

---

## 8. Erros frecuentes

### 8.1 Definir fillas ou columnas con comas

```css
/* Mal */
grid-template-columns: 1fr, 1fr, 1fr;

/* Ben */
grid-template-columns: 1fr 1fr 1fr;
```

En CSS Grid, os valores sepáranse con espazos, non con comas. As comas úsanse dentro de `repeat()` ou noutras funcións.

### 8.2 Confundir liñas con celas

```css
/* Mal: pensando que 1/3 é "columna 1 ata 3" */
grid-column: 1 / 3;   /* en realidade: desde a liña 1 ata a liña 3 */

/* O que se quere: */
grid-column: 1 / 4;   /* desde a liña 1 ata a liña 4 (3 columnas) */
```

As posicións fanse por **liñas**, non por celas. Nunha grella de 3 columnas hai **4 liñas verticais**.

### 8.3 Esquecer `display: grid`

As propiedades de Grid non funcionan sen `display: grid`. Erro tan común como en Flexbox.

### 8.4 `gap` en lugar de `grid-gap`

Os nomes antigos (`grid-gap`, `grid-row-gap`, `grid-column-gap`) están obsoletos. Usa `gap`, `row-gap` e `column-gap` (funcionan en Grid e Flexbox).

### 8.5 Usar Grid para todo

Grid é moi potente, pero non é a ferramenta axeitada para todo. Se só necesitas unha fila de elementos, Flexbox é máis simple e máis claro. Usa Grid cando realmente necesites dúas dimensións.

### 8.6 Non usar `minmax()` en grellas adaptativas

```css
/* Mal: columnas dun ancho fixo */
grid-template-columns: repeat(auto-fit, 250px);   /* non se adaptan */

/* Ben */
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
```

---

## 9. Compatibilidade (2026)

| Característica                        | Estado               |
| ------------------------------------- | -------------------- |
| `display: grid` e propiedades básicas | Universal desde 2017 |
| `gap` en Grid                         | Universal desde 2017 |
| `grid-template-areas`                 | Universal            |
| `auto-fit`, `auto-fill`               | Universal            |
| `minmax()`, `repeat()`                | Universal            |
| `subgrid`                             | Baseline desde 2023  |
| `grid-template-rows: masonry`         | Experimental (2026)  |

Grid está completamente estabilizado. Podes usalo sen preocupacións.

---

## 10. Exercicios

### Exercicio 1: Definir unha grella

Define unha grella de 3 columnas iguais e 2 filas de 100px.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.contenedor {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 100px 100px;
}
```

</details>

### Exercicio 2: Colocar elementos

Dada unha grella de 4 columnas, coloca un elemento que ocupe as dúas primeiras columnas da primeira fila.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.elemento {
    grid-column: 1 / 3;
    grid-row: 1 / 2;
}
```

</details>

### Exercicio 3: Layout con áreas

Crea un layout con cabeceira, sidebar, contido e pé, usando `grid-template-areas`.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.layout {
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
        "cabecera cabecera"
        "sidebar  contido"
        "pe       pe";
    gap: 1rem;
    min-height: 100vh;
}
```

</details>

### Exercicio 4: Galería adaptativa

Escribe CSS para unha galería de tarxetas que se adapte automaticamente ao ancho da pantalla, con cada tarxeta de polo menos 250px e espazo de 1.5rem entre elas.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.galeria {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}
```

</details>

### Exercicio 5: Grid + Flexbox

Crea unha tarxeta que use Grid para a estrutura xeral (imaxe arriba, título, texto, botón abaixo) e Flexbox para aliñar o título co botón «pechar».

<details>
<summary><b>Amosar a solución</b></summary>

```css
.tarxeta {
    display: grid;
    grid-template-rows: auto auto 1fr auto;
    gap: 0.5rem;
    padding: 1rem;
    border: 1px solid #ddd;
}

.tarxeta-encabezado {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```

</details>

---

## 11. Para profundar

- **MDN Web Docs:** [Basic concepts of grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Basic_concepts_of_grid_layout) — explicación conceptual.
- **MDN Web Docs:** [Grid template areas](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Grid_template_areas) — guía de áreas.
- **CSS-Tricks:** [A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/) — a guía visual de referencia.
- **web.dev:** [Learn CSS: Grid](https://web.dev/learn/css/grid) — lección interactiva.
- **W3C:** [CSS Grid Layout Module Level 2](https://www.w3.org/TR/css-grid-2/) — especificación.
- **Grid Garden** (https://cssgridgarden.com/#gl) — xogo interactivo en galego para practicar Grid.

---

## 12. Referencias cruzadas

- **Capítulo 5: Modelo de caixa** — as celas de Grid tamén seguen o modelo de caixa.
- **Capítulo 6: `display`, fluxo normal e posicionamento** — Grid substitúe moitos usos do posicionamento absoluto.
- **Capítulo 8: Flexbox** — complementario a Grid. Xuntos cobren case todo o layout moderno.
- **Capítulo 10: Subgrid e grellas avanzadas** — Grid de nivel superior.
- **Capítulo 13: Unidades relativas e funcións modernas** — para usar `minmax()`, `clamp()`, etc.

---

**Data de creación:** 2026-09-17  
**Última revisión:** 2026-09-17  
**Estado:** Borrador para validación
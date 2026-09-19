---
title: "Subgrid e grellas avanzadas"
description: "Explicación de `subgrid` e doutras técnicas avanzadas de Grid, como `masonry` e as posicións nomeadas."
bloque: 3
capitulo: 10
nivel: avanzado
ultima_revision: "2026-09-17"
estado: "borrador_para_validacion"
compatibilidade: "baseline_2023"
palabras_chave:
  - subgrid
  - grid_avanzado
  - masonry
  - posicion_nomeado
  - grid_template
  - herdar_liñas
  - layout_complejo
  - aniñamento_grid
---

<!-- # Capítulo 10: Subgrid e grellas avanzadas -->

> Cando Grid se estabilizou en 2017, quedaba unha limitación: un fillo dun contedor de grella **non podía herdar as columnas e filas do seu pai**. Tiña que definir a súa propia grella interna, o que facía que elementos aniñados non se aliñasen perfectamente co resto. **Subgrid** resolveu este problema en 2023: permite que un fillo de grella use as **mesmas liñas** que o seu pai. Este capítulo explica subgrid e outras características avanzadas de Grid, como `masonry` e as posicións nomeadas.

---

## 1. Introdución: o problema da aliñación aniñada

Imaxina unha grella de tarxetas. Cada tarxeta ten unha imaxe arriba, un título, un texto e un botón abaixo. Para que as tarxetas se vexan ben, queres que:

- As imaxes teñan a mesma altura en todas as tarxetas.
- Os títulos estean á mesma altura.
- Os textos comecen á mesma altura.
- Os botóns queden na parte inferior.

Co Grid normal, isto é difícil, porque cada tarxeta é un elemento independente e o seu interior non comparte liñas co exterior.

**Subgrid** soluciona isto: permítelle a un fillo **usar as mesmas liñas** que o seu pai. Se a grella exterior ten 3 columnas e 4 filas, un fillo con `subgrid` pode aliñar o seu contido a esas mesmas liñas.

Isto é moi útil para:

- Tarxetas con elementos aliñados entre si.
- Formularios onde etiquetas, campos e botóns deben aliñarse co exterior.
- *Layouts* complexos onde varios niveis de aniñado comparten estrutura.

---

## 2. Como funciona subgrid

### 2.1 Sintaxe

```css
.pai {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto auto auto;
}

.fillo {
    grid-column: span 3;   /* ocupa as 3 columnas */
    grid-row: span 3;      /* ocupa as 3 filas */
    display: grid;
    grid-template-columns: subgrid;   /* herda columnas do pai */
    grid-template-rows: subgrid;      /* herda filas do pai */
}
```

A palabra clave `subgrid` di ao navegador: «non definas columnas/filas propias, usa as do pai».

### 2.2 Exemplo práctico: tarxetas aliñadas

**Arquivo HTML:**

```html
<div class="tarxetas">
    <article class="tarxeta">
        <h3>Título 1</h3>
        <p>Un texto curto.</p>
        <button>Ver máis</button>
    </article>
    <article class="tarxeta">
        <h3>Título 2 moito máis longo</h3>
        <p>Un texto moito máis longo que ocupa varias liñas e fai que
           a tarxeta medre en altura para que se vexa ben.</p>
        <button>Ver máis</button>
    </article>
    <article class="tarxeta">
        <h3>Título 3</h3>
        <p>Outro texto.</p>
        <button>Ver máis</button>
    </article>
</div>
```

**Arquivo CSS:**

```css
.tarxetas {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

.tarxeta {
    display: grid;
    grid-template-rows: subgrid;
    grid-row: span 3;      /* ocupa 3 filas do pai */
    gap: 0.5rem;
    padding: 1rem;
    background: #f5f5f5;
    border-radius: 8px;
}

.tarxeta h3 { grid-row: 1; }
.tarxeta p  { grid-row: 2; }
.tarxeta button { grid-row: 3; align-self: end; }
```

**Que ocorre:** os títulos, os textos e os botóns de todas as tarxetas quedan aliñados entre si, porque comparten as mesmas liñas. Isto é imposible sen subgrid (ou require trucos con alturas calculadas).

---

## 3. Características avanzadas de Grid

### 3.1 Posicións nomeadas

Ademais das áreas, podes nomear **liñas concretas** da grella:

```css
.contenedor {
    display: grid;
    grid-template-columns:
        [inicio] 1fr [medio] 2fr [fin];
    grid-template-rows:
        [arriba] auto [centro] auto [abaixo];
}

.elemento {
    grid-column: inicio / fin;   /* desde a liña "inicio" ata a liña "fin" */
    grid-row: arriba / centro;    /* desde "arriba" ata "centro" */
}
```

Isto fai o CSS máis lexible, porque se engades ou quitas columnas, os nomes seguen sendo válidos.

### 3.2 `grid-auto-flow`

Controla como se colocan automaticamente os fillos que non teñen posición explícita.

```css
.contenedor {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-flow: row;         /* por defecto: enche filas primeiro */
    grid-auto-flow: column;      /* enche columnas primeiro */
    grid-auto-flow: dense;       /* recoloca para encher ocos */
}
```

**`dense`:** se hai ocos na grella, o navegador move elementos para enchelos. Útil para galerías con elementos de distintos tamaños.

### 3.3 `grid-template-rows: masonry` (experimental)

**Masonry** é un layout tipo Pinterest: os elementos organízanse en columnas e vanse apilando verticalmente, cada un coa súa altura natural, sen aliñación entre filas.

```css
.contenedor {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: masonry;   /* layout tipo Pinterest */
}
```

**Estado en 2026:** aínda é experimental. Comproba o estado actual en [web.dev/baseline](https://web.dev/baseline) antes de usalo en produción. Hai alternativas con JavaScript (Masonry.js) mentres non sexa estándar.

### 3.4 Grid e escritura lóxica

En culturas que escriben de dereita a esquerda (árabe, hebreo), as columnas van ao revés. CSS moderno ten propiedades lóxicas que se adaptan automaticamente:

```css
.contenedor {
    grid-template-columns: 1fr 2fr;   /* física: esquerda a dereita */
    /* Alternativa lóxica (ver Cap. 13): */
    grid-template-columns: 1fr 2fr;   /* CSS Grid xa adapta a dirección */
}
```

En Grid, as direccións xa son lóxicas por defecto: seguen a dirección do texto. Isto é unha vantaxe respecto a propiedades físicas como `margin-left`.

---

## 4. Exemplo mínimo funcional: formulario con subgrid

**Arquivo HTML:**

```html
<form class="formulario">
    <label for="nome">Nome:</label>
    <input type="text" id="nome" name="nome">

    <label for="email">Correo electrónico:</label>
    <input type="email" id="email" name="email">

    <label for="comentario">Comentario:</label>
    <textarea id="comentario" name="comentario"></textarea>

    <div class="accions">
        <button type="submit">Enviar</button>
    </div>
</form>
```

**Arquivo CSS:**

```css
.formulario {
    display: grid;
    grid-template-columns: 150px 1fr;
    gap: 1rem;
    max-width: 600px;
}

label {
    text-align: right;
    padding-top: 0.5rem;
}

input, textarea {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-family: inherit;
}

.accions {
    grid-column: 2;
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
}
```

Neste caso non usamos `subgrid` porque só hai dous niveis, pero se o formulario tivese seccións aniñadas con etiquetas propias, `subgrid` permitiría que todas as etiquetas e campos se aliñasen coa grella exterior.

---

## 5. Casos habituais na práctica

### 5.1 Tarxetas aliñadas (xa visto)

O caso máis claro de subgrid: tarxetas con elementos que deben aliñarse entre si.

### 5.2 Formularios con seccións

```css
.formulario {
    display: grid;
    grid-template-columns: 150px 1fr;
    gap: 0.5rem 1rem;
}

.seccion {
    grid-column: span 2;
    display: grid;
    grid-template-columns: subgrid;  /* herda columnas do formulario */
}
```

Cada sección pode ter as súas propias filas de etiquetas e campos, todas aliñadas co formulario principal.

### 5.3 Layouts complexos con áreas aniñadas

```css
.layout {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1rem;
}

.seccion {
    grid-column: span 12;
    display: grid;
    grid-template-columns: subgrid;  /* herda as 12 columnas */
}
```

A sección pode colocar o seu contido en calquera das 12 columnas do pai.

---

## 6. Erros frecuentes

### 6.1 Usar `subgrid` sen fillo directo

Subgrid só funciona en fillos **directos** dun contedor de grella. Se o elemento non é fillo directo, `subgrid` non fai nada.

### 6.2 Esquecer `grid-row: span` ou `grid-column: span`

Para que subgrid funcione, o fillo ten que ocupar un número de filas ou columnas do pai. Se non o indicas, o navegador pode asignarlle unha soa cela, e subgrid non ten sentido.

### 6.3 Pensar que subgrid crea unha grella nova

Subgrid **non crea unha grella nova**. Simplemente **usa as liñas do pai**. Se queres unha grella independente, usa `grid-template-columns` normal.

### 6.4 Confundir `masonry` con subgrid

Son cousas distintas:

- `subgrid`: herda liñas do pai.
- `masonry`: layout tipo Pinterest.

---

## 7. Compatibilidade (2026)

| Característica          | Estado               |
| ----------------------- | -------------------- |
| Grid básico             | Universal desde 2017 |
| `subgrid`               | Baseline desde 2023  |
| `masonry`               | Experimental (2026)  |
| Posicións nomeadas      | Universal            |
| `grid-auto-flow: dense` | Universal            |

**Recomendación:** `subgrid` pódese usar con seguridade. Para `masonry`, comproba o estado actual e usa unha alternativa con JavaScript se é necesario.

---

## 8. Exercicios

### Exercicio 1: Subgrid básico

Crea unha grella con 2 columnas e 3 filas, e un fillo con subgrid que ocupe as 3 filas.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.pai {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto;
    gap: 1rem;
}

.fillo {
    display: grid;
    grid-template-columns: subgrid;
    grid-template-rows: subgrid;
    grid-column: 1 / 3;
    grid-row: 1 / 4;
}
```

</details>

### Exercicio 2: Tarxetas aliñadas

Dadas tres tarxetas con título, texto e botón, escribe CSS con Grid e subgrid para que os elementos queden aliñados entre tarxetas.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.tarxetas {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

.tarxeta {
    display: grid;
    grid-template-rows: subgrid;
    grid-row: span 3;
    gap: 0.5rem;
    padding: 1rem;
    background: #f5f5f5;
}
```

</details>

### Exercicio 3: Posicións nomeadas

Define unha grella con liñas nomeadas `inicio`, `medio` e `fin`, e coloca un elemento desde `inicio` ata `fin`.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.contenedor {
    display: grid;
    grid-template-columns: [inicio] 1fr [medio] 1fr [fin];
}

.elemento {
    grid-column: inicio / fin;
}
```

</details>

---

## 9. Para profundar

- **MDN Web Docs:** [Subgrid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid) — guía completa de subgrid.
- **web.dev:** [CSS subgrid](https://web.dev/articles/css-subgrid) — artigo de Google sobre subgrid.
- **CSS-Tricks:** [Subgrid](https://css-tricks.com/css-subgrid/) — guía práctica.
- **W3C:** [CSS Grid Layout Module Level 2](https://www.w3.org/TR/css-grid-2/) — especificación que inclúe subgrid.
- **web.dev:** [Baseline](https://web.dev/baseline) — estado de compatibilidade actualizado.

---

## 10. Referencias cruzadas

- **Capítulo 8: Flexbox** — o outro sistema de layout moderno.
- **Capítulo 9: Grid** — a base sobre a que se constrúe subgrid.
- **Capítulo 13: Unidades relativas e funcións modernas** — para combinar con `minmax()`, `fr`, etc.
- **Capítulo 24: Rendemento e boas prácticas** — cando usar subgrid e cando non.

---

**Data de creación:** 2026-09-17  
**Última revisión:** 2026-09-17  
**Estado:** Borrador para validación
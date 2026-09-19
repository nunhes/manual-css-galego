---
title: "CSS e SVG"
description: "Guía para estilizar e animar SVG con CSS, aproveitando as súas posibilidades vectoriais en iconas e interfaces web."
bloque: 7
capitulo: 35
nivel: intermedio
ultima_revision: "2026-09-18"
estado: "borrador_para_validacion"
compatibilidade: "universal"
palabras_chave:
  - svg
  - vectorial
  - css_svg
  - fill
  - stroke
  - currentColor
  - iconas
  - animacion_svg
---

# Anexo: CSS e SVG

> **SVG** (Scalable Vector Graphics) é un formato de imaxe vectorial baseado en XML. A diferenza das imaxes raster (PNG, JPG), SVG pódese estilizar con CSS: cambiar cores, engadir transicións, animar. Este anexo explica como estilizar SVG con CSS, cando usalo, e como integralo en proxectos web.

---

## 1. Introdución: por que SVG

**SVG** ten tres vantaxes principais:

1. **Escalable.** Non perde calidade a calquera tamaño.
2. **Lixeiro.** Unha icona SVG pode ocupar uns centos de bytes.
3. **Estilizable.** Pódese cambiar con CSS (cor, tamaño, animación).

**Cando usar SVG:**

- **Iconas** — substituír iconas raster.
- **Logos** — escalables e nítidos.
- **Ilustracións** — gráficos vectoriais.
- **Gráficos** — charts, diagramas.
- **Mapas** — cartografía interactiva.

**Cando non usar SVG:**

- **Fotografías** — demasiado complexas, mellor JPEG/WebP.
- **Imaxes con moito detalle** — o SVG resultante sería enorme.

---

## 2. Formas de integrar SVG

### 2.1 Como imaxe (`<img>`)

```html
<img src="icona.svg" alt="Descrición">
```

**Vantaxes:** simple, cacheable, non inxecta CSS.

**Inconvenientes:** non se pode estilizar con CSS externo.

### 2.2 Como CSS background

```css
.icona {
    background: url("icona.svg") center / contain no-repeat;
    width: 24px;
    height: 24px;
}
```

**Vantaxes:** simple.

**Inconvenientes:** non se pode cambiar a cor con CSS (a menos que o SVG use `currentColor`, ver 4.2).

### 2.3 Inline (`<svg>` no HTML)

```html
<svg viewBox="0 0 24 24" class="icona">
    <path d="M12 2L2 22h20z"/>
</svg>
```

**Vantaxes:** estilizable con CSS, animable, accesible.

**Inconvenientes:** non cacheable, pode aumentar o HTML.

### 2.4 `<use>` con sprite

```html
<svg>
    <use href="sprite.svg#icona-menu"></use>
</svg>
```

**Vantaxes:** sprite cacheable, uso inline.

**Inconvenientes:** algúns navegadores teñen problemas con CORS.

---

## 3. Propiedades CSS específicas de SVG

### 3.1 `fill` — cor de recheo

```css
.icona {
    fill: #1a5c8a;
}
```

Equivale ao `background-color` para formas.

### 3.2 `stroke` — cor do trazo

```css
.icona {
    stroke: #1a5c8a;
    stroke-width: 2;
}
```

### 3.3 Propiedades de trazo

| Propiedade          | Que controla                                 |
| ------------------- | -------------------------------------------- |
| `stroke-width`      | Grosor do trazo                              |
| `stroke-linecap`    | Forma do extremo (`butt`, `round`, `square`) |
| `stroke-linejoin`   | Forma da unión (`miter`, `round`, `bevel`)   |
| `stroke-dasharray`  | Patrón de trazos discontinuos                |
| `stroke-dashoffset` | Desprazamento do patrón                      |

**Exemplo: liña discontinua**

```css
.linia {
    stroke: #1a5c8a;
    stroke-width: 2;
    stroke-dasharray: 5 5;   /* 5 de trazo, 5 de espazo */
}
```

### 3.4 `fill-rule` e `clip-rule`

```css
.forma {
    fill-rule: evenodd;   /* ou nonzero */
}
```

---

## 4. Estilizar SVG con CSS

### 4.1 Selectores

```css
/* Por clase no SVG */
.icona .trazo {
    stroke: #1a5c8a;
}

/* Por tipo de elemento */
svg path {
    fill: #1a5c8a;
}

/* Por ID */
#logo {
    width: 100px;
}
```

### 4.2 `currentColor`: herdar a cor do texto

**`currentColor`** é unha palabra clave que se refire ao valor de `color` do elemento. Moi útil en SVG:

```html
<svg viewBox="0 0 24 24" class="icona">
    <path d="..." fill="currentColor"/>
</svg>
```

```css
.icona {
    color: #1a5c8a;
}

.boton:hover .icona {
    color: white;   /* a icona cambia automaticamente */
}
```

**Vantaxe:** unha soa icona SVG pode adaptarse á cor do contexto.

### 4.3 `viewBox` e tamaño

O atributo `viewBox` define o sistema de coordenadas. O tamaño real defínese con `width` e `height`:

```css
.icona {
    width: 24px;
    height: 24px;
}
```

**Recomendación:** usar `viewBox` no SVG e controlar o tamaño con CSS.

### 4.4 Cambiar a cor de SVG externo

Se o SVG está nunha etiqueta `<img>` ou nun `background`, **non se pode cambiar a cor con CSS**. Hai dúas solucións:

**1. Usar `mask`:**

```css
.icona {
    width: 24px;
    height: 24px;
    background: currentColor;
    mask: url("icona.svg") center / contain no-repeat;
    -webkit-mask: url("icona.svg") center / contain no-repeat;
}
```

**2. Usar SVG inline** ou **`<use>`**.

---

## 5. Animar SVG con CSS

### 5.1 Transicións

```css
.icona path {
    transition: fill 0.3s;
}

.icona:hover path {
    fill: #ca8a04;
}
```

### 5.2 Animacións

```css
@keyframes xirar {
    to { transform: rotate(360deg); }
}

.spinner {
    animation: xirar 1s linear infinite;
    transform-origin: center;
}
```

### 5.3 Animar `stroke-dashoffset` (efecto «dibuxar»)

```css
.linia {
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
    animation: dibuxar 2s ease-out forwards;
}

@keyframes dibuxar {
    to { stroke-dashoffset: 0; }
}
```

Este efecto fai que a liña se «dibuxe» progresivamente.

---

## 6. Exemplo mínimo funcional

**HTML:**

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <title>SVG con CSS</title>
    <link rel="stylesheet" href="estilos/svg.css">
</head>
<body>
    <button class="boton">
        <svg viewBox="0 0 24 24" class="icona">
            <path d="M12 2L2 22h20z" fill="currentColor"/>
        </svg>
        Premer
    </button>

    <svg viewBox="0 0 100 100" class="spinner">
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="8"/>
    </svg>
</body>
</html>
```

**CSS:**

```css
*, *::before, *::after {
    box-sizing: border-box;
}

body {
    font-family: system-ui, sans-serif;
    padding: 2rem;
}

/* Botón con icona */
.boton {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: #1a5c8a;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s;
}

.boton:hover {
    background: #0d3a5c;
}

.icona {
    width: 20px;
    height: 20px;
}

/* Spinner */
.spinner {
    width: 40px;
    height: 40px;
    color: #1a5c8a;
    margin-top: 2rem;
    animation: xirar 1s linear infinite;
}

@keyframes xirar {
    to { transform: rotate(360deg); }
}
```

**Que ocorre:**

1. A icona do botón usa `fill="currentColor"`, polo que herda a cor do botón (`white`).
2. Cando o botón cambia de cor en `:hover`, a icona tamén.
3. O spinner usa `stroke="currentColor"` e xira infinitamente.

---

## 7. Casos habituais

### 7.1 Sistema de iconas

```html
<svg class="icona" aria-hidden="true">
    <use href="/iconas.svg#menu"></use>
</svg>
```

```css
.icona {
    width: 1em;
    height: 1em;
    fill: currentColor;
    vertical-align: middle;
}
```

### 7.2 Logotipo adaptable

```html
<a href="/" class="logo">
    <svg viewBox="0 0 200 50">
        <text x="0" y="35" fill="currentColor">O meu sitio</text>
    </svg>
</a>
```

```css
.logo {
    color: #1a5c8a;
    display: inline-block;
}

.logo:hover {
    color: #0d3a5c;
}
```

### 7.3 Gráficos

```html
<svg viewBox="0 0 200 100" class="grafico">
    <rect x="10" y="50" width="30" height="50" fill="currentColor"/>
    <rect x="50" y="30" width="30" height="70" fill="currentColor"/>
    <rect x="90" y="20" width="30" height="80" fill="currentColor"/>
</svg>
```

```css
.grafico {
    width: 100%;
    height: 200px;
    color: #1a5c8a;
}
```

---

## 8. Erros frecuentes

### 8.1 Tentar cambiar a cor dun SVG externo con CSS

```css
/* Non funciona se o SVG está nun <img> */
img.icona {
    fill: red;   /* non fai nada */
}
```

**Solución:** usar SVG inline, `<use>` con `currentColor`, ou `mask`.

### 8.2 Non usar `viewBox`

Sen `viewBox`, o SVG non escala ben.

```html
<!-- Mal -->
<svg width="24" height="24">
    <path d="..."/>
</svg>

<!-- Ben -->
<svg viewBox="0 0 24 24">
    <path d="..."/>
</svg>
```

### 8.3 Non poñer `aria-hidden` en iconas decorativas

### 



```html
<!-- Mal: os lectores de pantalla len o SVG -->
<svg>...</svg>

<!-- Ben: decorativa -->
<svg aria-hidden="true">...</svg>
```



### 8.4 Usar SVG para fotos

SVG é para gráficos vectoriais, non para fotografías. Unha foto en SVG sería enorme.

### 8.5 Non optimizar o SVG

Os SVG xerados por ferramentas de deseño adoitan ter moita «lixo»: comentarios, metadatos, precisión excesiva. Hai que **optimizalos** con ferramentas como SVGO (https://github.com/svg/svgo).

------

## 9. Compatibilidade (2026)

| Característica      | Estado    |
| :------------------ | :-------- |
| SVG inline          | Universal |
| `fill`, `stroke`    | Universal |
| `currentColor`      | Universal |
| SVG en `<img>`      | Universal |
| SVG en `background` | Universal |
| `<use>` con sprite  | Universal |
| SVG animado con CSS | Universal |

------

## 10. Exercicios

### Exercicio 1: Icona con `currentColor`

Crea un botón cunha icona SVG que cambie de cor co texto.

<details> <summary><b>Amosar a solución</b></summary>



```html
<button class="boton">
    <svg viewBox="0 0 24 24" class="icona">
        <path d="M12 2L2 22h20z" fill="currentColor"/>
    </svg>
    Premer
</button>
```



```css
.boton {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: #1a5c8a;
    color: white;
}

.icona {
    width: 20px;
    height: 20px;
}
```



</details>

### Exercicio 2: Spinner

Crea un spinner SVG que xire infinitamente.

<details> <summary><b>Amosar a solución</b></summary>



```html
<svg viewBox="0 0 100 100" class="spinner">
    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="8"/>
</svg>
```



```css
.spinner {
    width: 40px;
    height: 40px;
    color: #1a5c8a;
    animation: xirar 1s linear infinite;
}

@keyframes xirar {
    to { transform: rotate(360deg); }
}
```



</details>

### Exercicio 3: Cambiar cor con mask

Escribe CSS para cambiar a cor dun SVG externo usando `mask`.

<details> <summary><b>Amosar a solución</b></summary>



```css
.icona {
    width: 24px;
    height: 24px;
    background: currentColor;
    mask: url("icona.svg") center / contain no-repeat;
    -webkit-mask: url("icona.svg") center / contain no-repeat;
}
```



</details>

------

## 11. Para profundar

- **MDN Web Docs:** [SVG: Scalable Vector Graphics](https://developer.mozilla.org/en-US/docs/Web/SVG) — referencia completa.
- **MDN Web Docs:** [Styling SVG with CSS](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/SVG_and_CSS) — guía.
- **CSS-Tricks:** [Styling SVG with CSS](https://css-tricks.com/svg-properties-and-css/) — artigo.
- **SVGOMG** — https://jakearchibald.github.io/svgomg/ — optimizador en liña.
- **SVGO** — https://github.com/svg/svgo — optimizador de liña de comandos.

------

## 12. Referencias cruzadas

- **Capítulo 4: Cores, tipografía e unidades** — as cores que se aplican ao SVG.
- **Capítulo 18: Transicións e animacións** — as transicións en SVG.
- **Capítulo 21: Filtros, blend modes e masking** — `mask` para cambiar cores.
- **Capítulo 26: Accesibilidade e CSS** — `aria-hidden` en iconas decorativas.

------

**Data de creación:** 2026-09-18
**Última revisión:** 2026-09-18
**Estado:** Borrador para validación
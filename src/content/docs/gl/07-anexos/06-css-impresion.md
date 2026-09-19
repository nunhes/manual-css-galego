---
title: "CSS para impresión"
description: "Técnicas CSS para preparar páxinas imprimibles, controlar saltos de páxina, ocultar elementos e optimizar o uso da tinta."
bloque: 7
capitulo: 32
nivel: intermedio
ultima_revision: "2026-09-18"
estado: "borrador_para_validacion"
compatibilidade: "universal"
palabras_chave:
  - impresion
  - page
  - page_break
  - print
  - media_print
  - css_impresion
  - papel
---

# Anexo: CSS para impresión

> Cando alguén imprime unha páxina web, o resultado adoita ser horrible se non se preparan estilos específicos: menús que aparecen, cores que non se ven, contido cortado, ligazóns que non se poden seguir. CSS ten un conxunto de ferramentas específicas para impresión que permiten controlar o resultado.

---

## 1. Introdución: a impresión esquecida

A maioría dos sitios web **non teñen estilos de impresión**. Isto significa que cando alguén imprime a páxina, o navegador usa os estilos de pantalla, o que adoita dar:

- **Menús de navegación impresos** (non teñen sentido no papel).
- **Cores de fondo escuras** (gastan moita tinta).
- **Ligazóns sen URL** (non se pode saber onde levan).
- **Contido cortado** (as seccións rompen no medio).
- **Publicidade impresa** (non ten sentido).

**Os estilos de impresión** resolven isto. E non só son unha cuestión de calidade: son unha **parte da accesibilidade**.

---

## 2. A media query `print`

A forma máis básica de aplicar estilos só ao imprimir:

```css
@media print {
    /* Estilos específicos de impresión */
}
```

**Exemplo:**

```css
@media print {
    /* Ocultar elementos que non van impresos */
    nav, aside, footer, .menu, .publicidade {
        display: none;
    }

    /* Ajustar cores */
    body {
        color: black;
        background: white;
    }

    /* Amosar URL das ligazóns */
    a::after {
        content: " (" attr(href) ")";
        font-size: 0.8em;
        color: #666;
    }
}
```

---

## 3. `@page`: configurar a páxina

A regra **`@page`** permite configurar o tamaño, as marxes e outras propiedades da páxina impresa.

```css
@page {
    size: A4;
    margin: 2cm;
}
```

**Valores de `size`:**

- `A4`, `A5`, `letter`, `legal` — tamaños estándar.
- `portrait` / `landscape` — orientación.
- Lonxitudes: `size: 210mm 297mm;`.

**Marxes:**

```css
@page {
    margin: 2cm 1.5cm;
}
```

**Pseudo-clases:**

```css
@page :first {
    margin-top: 4cm;   /* primeira páxina con marxe superior maior */
}

@page :left {
    margin-left: 3cm;  /* páxinas pares */
}

@page :right {
    margin-right: 3cm; /* páxinas impares */
}
```

**Nota:** `@page` ten soporte parcial. As marxes e o tamaño funcionan; as pseudo-clases, menos.

---

## 4. `page-break-*` e `break-*`: controlar os cortes

Cando o contido é longo, hai que controlar onde se rompe. Hai dúas xeracións de propiedades:

**Antigas (aínda funcionan):**

- `page-break-before` — `auto`, `always`, `avoid`, `left`, `right`.
- `page-break-after` — igual.
- `page-break-inside` — `auto`, `avoid`.

**Modernas (recomendadas):**

- `break-before` — `auto`, `page`, `avoid`, `left`, `right`, `recto`, `verso`.
- `break-after` — igual.
- `break-inside` — `auto`, `avoid`, `avoid-page`, `avoid-column`.

**Exemplo:**

```css
@media print {
    h1, h2, h3 {
        break-after: avoid;   /* non romper xusto despois dun título */
    }

    .tarxeta {
        break-inside: avoid;  /* non romper unha tarxeta polo medio */
    }

    .seccion {
        break-before: page;   /* comezar cada sección nunha páxina nova */
    }
}
```

---

## 5. Cores e imaxes

### 5.1 Cores

Por defecto, os navegadores **non imprimen** as cores de fondo (para aforrar tinta). Podes forzar a impresión con:

```css
.boton {
    background: #1a5c8a !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
}
```

**Coidado:** isto gasta moita tinta. Úsao só cando é necesario.

**Recomendación:** en xeral, **evita as cores de fondo** en impresión. Usa cores de texto e bordos.

### 5.2 Imaxes

```css
@media print {
    img {
        max-width: 100%;
        height: auto;
    }

    /* Imaxes decorativas: ocultar */
    .decoracion {
        display: none;
    }
}
```

---

## 6. Ligazóns

As ligazóns son un problema en impresión: non se poden premer. A solución é **amosar a URL**:

```css
@media print {
    a::after {
        content: " (" attr(href) ")";
        font-size: 0.8em;
        color: #666;
        word-break: break-all;
    }

    /* Non amosar URL para ligazóns internas */
    a[href^="#"]::after {
        content: "";
    }
}
```

---

## 7. Exemplo mínimo funcional

**HTML:**

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <title>Artigo imprimible</title>
    <link rel="stylesheet" href="estilos/principal.css">
    <link rel="stylesheet" href="estilos/impresion.css" media="print">
</head>
<body>
    <header>
        <h1>O meu sitio</h1>
        <nav>
            <a href="/">Inicio</a>
            <a href="/cursos">Cursos</a>
        </nav>
    </header>

    <main>
        <article>
            <h2>Un artigo</h2>
            <p>Este é un texto de exemplo con <a href="https://exemplo.gal">unha ligazón</a>.</p>
        </article>
    </main>

    <footer>
        <p>© 2026 O meu sitio</p>
    </footer>
</body>
</html>
```

**CSS (`estilos/impresion.css`):**

```css
@page {
    size: A4;
    margin: 2cm;
}

@media print {
    /* Ocultar elementos de navegación */
    nav, footer, .menu, .publicidade {
        display: none;
    }

    /* Cores para impresión */
    body {
        color: black;
        background: white;
        font-size: 12pt;
        line-height: 1.4;
    }

    h1, h2, h3 {
        break-after: avoid;
    }

    /* Amosar URL das ligazóns */
    a::after {
        content: " (" attr(href) ")";
        font-size: 0.85em;
        color: #666;
    }

    /* Evitar cortes */
    .tarxeta, .seccion {
        break-inside: avoid;
    }
}
```

---

## 8. Casos habituais

### 8.1 Facturas e recibos

```css
@page {
    size: A4;
    margin: 1cm;
}

.factura {
    font-family: monospace;
    font-size: 10pt;
}
```

### 8.2 Artigos longos

```css
@media print {
    .articulo {
        column-count: 2;
        column-gap: 1cm;
    }

    h2 {
        break-after: avoid;
    }
}
```

### 8.3 Tickets

```css
@page {
    size: 80mm auto;   /* ancho de ticket térmico */
    margin: 0;
}

.ticket {
    font-family: monospace;
    font-size: 10pt;
}
```

---

## 9. Erros frecuentes

### 9.1 Non probar a impresión

**O erro máis común.** Hai que probar a impresión con **vista previa de impresión** (Ctrl+P no navegador).

### 9.2 Usar cores de fondo sen `print-color-adjust`

Por defecto, as cores de fondo non se imprimen. Hai que forzalas se son necesarias.

### 9.3 Non ocultar a navegación

Os menús de navegación non teñen sentido no papel. Hai que ocultalos.

### 9.4 Non amosar as URLs

As ligazóns sen URL son inútiles no papel.

### 9.5 Non controlar os cortes

Se non se controla, as seccións rompen polo medio. Hai que usar `break-inside: avoid` e `break-after: avoid`.

### 9.6 Usar `px` para impresión

En impresión, úsanse **unidades físicas** (`cm`, `mm`, `in`, `pt`) ou **`rem`**. `px` non ten sentido no papel.

---

## 10. Compatibilidade (2026)

| Característica                                | Estado    |
| --------------------------------------------- | --------- |
| `@media print`                                | Universal |
| `@page` (tamaño, marxe)                       | Universal |
| `@page :first`, `:left`, `:right`             | Parcial   |
| `break-before`, `break-after`, `break-inside` | Universal |
| `page-break-*` (antigas)                      | Universal |
| `print-color-adjust`                          | Universal |

---

## 11. Exercicios

### Exercicio 1: Ocultar navegación

Escribe CSS para ocultar `<nav>` e `<footer>` ao imprimir.

<details>
<summary><b>Amosar a solución</b></summary>


```css
@media print {
    nav, footer {
        display: none;
    }
}
```

</details>

### Exercicio 2: Amosar URL

Escribe CSS para que as ligazóns amosen a súa URL entre parénteses ao imprimir.

<details>
<summary><b>Amosar a solución</b></summary>


```css
@media print {
    a::after {
        content: " (" attr(href) ")";
        font-size: 0.85em;
        color: #666;
    }
}
```

</details>

### Exercicio 3: Evitar cortes

Escribe CSS para que as tarxetas non se rompan polo medio ao imprimir.

<details>
<summary><b>Amosar a solución</b></summary>


```css
@media print {
    .tarxeta {
        break-inside: avoid;
    }
}
```

</details>

---

## 12. Para profundar

- **MDN Web Docs:** [Printing](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_paged_media) — guía completa.
- **MDN Web Docs:** [@page](https://developer.mozilla.org/en-US/docs/Web/CSS/@page) — referencia.
- **MDN Web Docs:** [break-inside](https://developer.mozilla.org/en-US/docs/Web/CSS/break-inside) — referencia.
- **Smashing Magazine:** [CSS for print](https://www.smashingmagazine.com/2018/05/print-stylesheets-in-2018/) — artigo.

---

## 13. Referencias cruzadas

- **Capítulo 11: Media queries** — `@media print` é unha media query.
- **Capítulo 4: Cores, tipografía e unidades** — unidades para impresión (`cm`, `mm`, `pt`).

---

**Data de creación:** 2026-09-18  
**Última revisión:** 2026-09-18  
**Estado:** Borrador para validación
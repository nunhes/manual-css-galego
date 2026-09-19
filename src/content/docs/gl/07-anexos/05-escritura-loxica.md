---
title: "Escritura lóxica e internacionalización"
description: "Uso das propiedades lóxicas de CSS para adaptar os estilos a diferentes direccións e modos de escritura."
bloque: 7
capitulo: 31
nivel: avanzado
ultima_revision: "2026-09-18"
estado: "borrador_para_validacion"
compatibilidade: "baseline_2021"
palabras_chave:
  - escritura_loxica
  - writing_mode
  - dir
  - internacionalizacion
  - inline_start
  - block_end
  - propiedades_loxicas
  - multilingue
---

# Anexo: Escritura lóxica e internacionalización

> A maioría dos sitios web escríbense en linguas que se len de esquerda a dereita e de arriba a abaixo. Pero non todas: o árabe e o hebreo escríbense de dereita a esquerda; o xaponés e o chinés poden escribirse en vertical; algunhas linguas indíxenas usan outras direccións. CSS moderno ten **propiedades lóxicas** que permiten escribir estilos que se adaptan automaticamente á dirección de escritura, sen necesidade de media queries nin JavaScript.

---

## 1. Introdución: por que non usar `left` e `right`

Durante anos, CSS usaba propiedades **físicas**: `margin-left`, `margin-right`, `padding-left`, `padding-right`, `left`, `right`, `text-align: left`, etc. Estas propiedades refírense á **posición física** na pantalla.

O problema: se un sitio ten que funcionar en árabe (de dereita a esquerda), todas esas propiedades están mal. `margin-left` debería ser `margin-right`, `text-align: left` debería ser `text-align: right`, etc.

**As propiedades lóxicas** resolven isto. En lugar de `left` e `right`, úsanse `inline-start` e `inline-end`. O navegador adapta automaticamente segundo a dirección de escritura do documento.

---

## 2. Conceptos fundamentais

### 2.1 Eixes lóxicos

En CSS lóxico hai dous eixes:

- **Eixe en liña (inline axis).** A dirección na que se escribe o texto. En galego, horizontal, de esquerda a dereita. En árabe, horizontal, de dereita a esquerda. En xaponés vertical, de arriba a abaixo.
- **Eixe de bloque (block axis).** A dirección perpendicular á anterior. En galego, vertical, de arriba a abaixo.

**Termos:**

- **`inline-start`** — o principio do eixe en liña. En galego, a esquerda.
- **`inline-end`** — o final do eixe en liña. En galego, a dereita.
- **`block-start`** — o principio do eixe de bloque. En galego, arriba.
- **`block-end`** — o final do eixe de bloque. En galego, abaixo.

### 2.2 A propiedade `direction` e o atributo `dir`

**`direction`** (CSS) ou **`dir`** (HTML) indican a dirección de escritura:

```html
<html lang="gl">          <!-- esquerda a dereita (por defecto) -->
<html lang="ar" dir="rtl"> <!-- dereita a esquerda -->
```
```css
   html[dir="rtl"] {
        direction: rtl;
    }
```

En 2026, o máis común é usar o atributo HTML `dir`. O CSS `direction` resérvase para casos moi concretos.

### 2.3 `writing-mode`

A propiedade **`writing-mode`** define a dirección xeral da escritura:

```css
.vertical {
    writing-mode: vertical-rl;   /* vertical, de arriba a abaixo, columnas de dereita a esquerda */
}

.horizontal {
    writing-mode: horizontal-tb; /* horizontal, de esquerda a dereita (por defecto) */
}
```

**Valores:**

- `horizontal-tb` — horizontal, de arriba a abaixo (por defecto).
- `vertical-rl` — vertical, columnas de dereita a esquerda (xaponés, chinés).
- `vertical-lr` — vertical, columnas de esquerda a dereita (mongol).
- `sideways-rl`, `sideways-lr` — variacións.

---

## 3. Propiedades lóxicas

### 3.1 Márxenes e paddings

| Propiedade física | Propiedade lóxica      |
| ----------------- | ---------------------- |
| `margin-left`     | `margin-inline-start`  |
| `margin-right`    | `margin-inline-end`    |
| `margin-top`      | `margin-block-start`   |
| `margin-bottom`   | `margin-block-end`     |
| `padding-left`    | `padding-inline-start` |
| `padding-right`   | `padding-inline-end`   |
| `padding-top`     | `padding-block-start`  |
| `padding-bottom`  | `padding-block-end`    |

**Atallos:**

```css
margin-inline: 1rem 2rem;   /* inline-start, inline-end */
margin-block: 1rem 2rem;    /* block-start, block-end */
```

### 3.2 Posicionamento

| Propiedade física | Propiedade lóxica    |
| ----------------- | -------------------- |
| `top`             | `inset-block-start`  |
| `bottom`          | `inset-block-end`    |
| `left`            | `inset-inline-start` |
| `right`           | `inset-inline-end`   |

**Atallos:**

```css
inset-inline: 1rem 2rem;
inset-block: 1rem 2rem;
```

### 3.3 Bordos

| Propiedade física        | Propiedade lóxica           |
| ------------------------ | --------------------------- |
| `border-left`            | `border-inline-start`       |
| `border-right`           | `border-inline-end`         |
| `border-top`             | `border-block-start`        |
| `border-bottom`          | `border-block-end`          |
| `border-top-left-radius` | `border-start-start-radius` |

### 3.4 Texto

| Propiedade física   | Propiedade lóxica   |
| ------------------- | ------------------- |
| `text-align: left`  | `text-align: start` |
| `text-align: right` | `text-align: end`   |

### 3.5 Dimensións

| Propiedade física | Propiedade lóxica |
| ----------------- | ----------------- |
| `width`           | `inline-size`     |
| `height`          | `block-size`      |
| `min-width`       | `min-inline-size` |
| `min-height`      | `min-block-size`  |
| `max-width`       | `max-inline-size` |
| `max-height`      | `max-block-size`  |

---

## 4. Exemplo mínimo funcional

**HTML:**

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <title>Escritura lóxica</title>
    <link rel="stylesheet" href="estilos/loxica.css">
</head>
<body>
    <div class="tarxeta">
        <h2>Un título</h2>
        <p>Un texto con <a href="#">unha ligazón</a>.</p>
    </div>
</body>
</html>
```

**CSS (con propiedades físicas):**

```css
.tarxeta {
    margin-left: 1rem;
    padding-left: 1.5rem;
    border-left: 4px solid #1a5c8a;
    text-align: left;
}
```

**CSS (con propiedades lóxicas):**

```css
.tarxeta {
    margin-inline-start: 1rem;
    padding-inline-start: 1.5rem;
    border-inline-start: 4px solid #1a5c8a;
    text-align: start;
}
```

**Resultado:** o mesmo en galego. Pero se cambias `lang="gl"` por `lang="ar" dir="rtl"`, o segundo adapta automaticamente: a marxe vai á dereita, o padding vai á dereita, o bordo vai á dereita, e o texto aliñase á dereita.

---

## 5. Casos habituais na práctica

### 5.1 Sitios multilingües

```html
<html lang="gl">...</html>
<html lang="en">...</html>
<html lang="ar" dir="rtl">...</html>
<html lang="he" dir="rtl">...</html>
```

Cos CSS lóxicos, o mesmo CSS funciona para todos.

### 5.2 Iconas direccionais

Se tes unha icona de frecha «a seguinte», podes facela adaptarse:

```css
.icona-seguinte {
    /* No CSS estándar, a frecha apunta á dereita */
    transform: scaleX(1);
}

[dir="rtl"] .icona-seguinte {
    /* En árabe, apunta á esquerda */
    transform: scaleX(-1);
}
```

### 5.3 Texto vertical

```css
.vertical {
    writing-mode: vertical-rl;
    height: 300px;
}
```

Útil para títulos verticais, como en xaponés, ou para deseño creativo.

---

## 6. Erros frecuentes

### 6.1 Mesturar propiedades físicas e lóxicas

```css
/* Mal: mestura */
.tarxeta {
    margin-left: 1rem;
    margin-inline-end: 2rem;
}
```

**Solución:** usar só un tipo. Recoméndase o lóxico.

### 6.2 Usar `text-align: left` en lugar de `text-align: start`

```css
/* Menos recomendable */
.titulo {
    text-align: left;
}

/* Recomendado */
.titulo {
    text-align: start;
}
```

### 6.3 Esquecer `dir` no HTML

Se o sitio ten contido en árabe, hai que indicar `dir="rtl"` no elemento correspondente. Senón, o CSS lóxico non se activa.

### 6.4 Usar `writing-mode` sen considerar o contexto

`writing-mode` cambia moitas cousas: a dirección das marxes, o comportamento dos elementos en liña, o scroll, etc. Úsao con coidado.

---

## 7. Compatibilidade (2026)

| Característica                    | Estado              |
| --------------------------------- | ------------------- |
| `margin-inline`, `margin-block`   | Baseline desde 2021 |
| `padding-inline`, `padding-block` | Baseline desde 2021 |
| `inset-inline`, `inset-block`     | Baseline desde 2021 |
| `border-inline-start`, etc.       | Baseline desde 2021 |
| `inline-size`, `block-size`       | Baseline desde 2021 |
| `writing-mode`                    | Universal           |
| `direction`                       | Universal           |

As propiedades lóxicas están completamente estabilizadas.

---

## 8. Exercicios

### Exercicio 1: Converter a lóxico

Converte este CSS a propiedades lóxicas:

```css
.tarxeta {
    margin-left: 1rem;
    padding-right: 1.5rem;
    border-left: 4px solid #1a5c8a;
    text-align: left;
    width: 300px;
}
```

<details>
<summary><b>Amosar a solución</b></summary>


```css
.tarxeta {
    margin-inline-start: 1rem;
    padding-inline-end: 1.5rem;
    border-inline-start: 4px solid #1a5c8a;
    text-align: start;
    inline-size: 300px;
}
```

</details>

### Exercicio 2: Texto vertical

Escribe CSS para que un título se vexa en vertical, de arriba a abaixo.

<details>
<summary><b>Amosar a solución</b></summary>


```css
.titulo-vertical {
    writing-mode: vertical-rl;
    height: 300px;
}
```

</details>

---

## 9. Para profundar

- **MDN Web Docs:** [CSS logical properties and values](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values) — guía completa.
- **MDN Web Docs:** [writing-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode) — referencia.
- **web.dev:** [Logical properties](https://web.dev/learn/css/logical-properties) — lección interactiva.
- **W3C:** [CSS Logical Properties and Values Level 1](https://www.w3.org/TR/css-logical-1/) — especificación.

---

## 10. Referencias cruzadas

- **Capítulo 5: Modelo de caixa** — as propiedades de caixa en versión lóxica.
- **Capítulo 6: `display`, fluxo normal e posicionamento** — o posicionamento lóxico.
- **Capítulo 8: Flexbox** — Flexbox xa usa eixes lóxicos por defecto.
- **Capítulo 9: Grid** — Grid tamén usa eixes lóxicos.

---

**Data de creación:** 2026-09-18  
**Última revisión:** 2026-09-18  
**Estado:** Borrador para validación
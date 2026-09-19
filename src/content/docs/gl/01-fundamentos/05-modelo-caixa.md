---
title: "O modelo de caixa"
description: "Explicación do modelo de caixa CSS, o contido, o recheo, os bordos, as marxes e o seu cálculo."
bloque: 1
capitulo: 5
nivel: basico
ultima_revision: "2026-09-17"
estado: "borrador_para_validacion"
compatibilidade: "universal"
palabras_chave:
  - modelo_de_caixa
  - padding
  - border
  - margin
  - box_sizing
  - colapso_de_marxes
  - width
  - height
  - calc
---

<!-- # Capítulo 5: O modelo de caixa -->

> Todo elemento HTML é, para CSS, unha **caixa rectangular**. Esta caixa ten catro capas: contido, recheo (`padding`), bordo (`border`) e marxe (`margin`). Entender como se calculan os tamaños, como interactúan estas capas e que é o **colapso de marxes** é fundamental para maquetar con precisión. Este capítulo pecha o Bloque 1 (Fundamentos) e prepara o terreo para a maquetación moderna.

---

## 1. Introdución: por que todo é unha caixa

Cando miras unha páxina web, ves títulos, parágrafos, imaxes, botóns, menús. Pero o navegador non ve «títulos» nin «botóns». Ve **caixas rectangulares** organizadas unhas dentro das outras, coma se fosen pezas de Lego.

Esta idea é literal: en CSS, **todo elemento xerado por HTML é unha caixa rectangular**. Aínda que o texto se vexa circular ou un botón teña as esquinas redondeadas, por debaixo hai sempre un rectángulo. As esquinas redondeadas son un efecto visual, non cambian a forma real da caixa.

Entender isto é fundamental por varias razóns:

- **Os tamaños calcúlanse a partir das caixas**, non do contido visible. Se non entendes como se calcula o ancho real dun elemento, os layouts sairánche mal.
- **O espazo entre elementos** xestiónase coas marxes e os recheos. Se non distingues un do outro, non poderás controlar o ritmo visual.
- **Moitos erros de maquetación** veñen de malentendidos sobre o modelo de caixa. Por exemplo: «por que este elemento ocupa máis ancho do que lle din?» ou «por que esta marxe non se aplica?».

Neste capítulo imos ver, paso a paso, como se constrúe unha caixa en CSS, como se calculan os seus tamaños, e cales son os casos que adoitan causar problemas.

> 💡 **Para pensar:** se vas aprender só unha cousa deste capítulo, que sexa esta: **`box-sizing: border-box`**. É unha propiedade que cambia como se calculan os anchos e que evita unha chea de dores de cabeza. Verémola en detalle na sección 4.

---

## 2. Conceptos fundamentais

### 2.1 As catro capas dunha caixa

Cada caixa CSS está formada por catro capas, do interior ao exterior:

1. **Contido (content):** o texto, a imaxe, ou o que conteña o elemento. É a parte visible «útil».
2. **Recheo (padding):** espazo **entre o contido e o bordo**. Forma parte do propio elemento (se ten cor de fondo, o recheo tamén a ten).
3. **Bordo (border):** unha liña que rodea o elemento. Ten grosor, estilo e cor.
4. **Marxe (margin):** espazo **fóra do elemento**, entre el e os elementos veciños. **A marxe non forma parte do elemento** e nunca ten cor de fondo.

Un esquema visual axuda a fixar a idea:

```
┌───────────────────────────────────────┐
│              MARGIN                   │  ← espazo exterior (transparente)
│  ┌─────────────────────────────────┐  │
│  │           BORDER                │  │  ← liña visible
│  │  ┌───────────────────────────┐  │  │
│  │  │         PADDING           │  │  │  ← espazo interior (herda o fondo)
│  │  │  ┌─────────────────────┐  │  │  │
│  │  │  │      CONTENT        │  │  │  │  ← texto, imaxe, etc.
│  │  │  └─────────────────────┘  │  │  │
│  │  └───────────────────────────┘  │  │
│  └─────────────────────────────────┘  │
└───────────────────────────────────────┘
```

**A diferenza clave entre `padding` e `margin`:**

- `padding` é **espazo interior**. Forma parte do elemento.
- `margin` é **espazo exterior**. Non forma parte do elemento.

Isto ten unha consecuencia moi práctica: se poñer unha cor de fondo ao elemento, o `padding` tamén a colle, porque está dentro. A `margin` non, porque está fóra.

**Exemplo visual:**

```css
.caixa {
    background: lightyellow;
    padding: 20px;
    border: 2px solid black;
    margin: 30px;
}
```

O resultado: un recadro amarelo que ocupa o contido máis 20px por cada lado, cunha liña negra de 2px ao redor, e despois 30px de espazo baleiro entre este recadro e os veciños.

### 2.2 As propiedades que controlan cada capa

Cada capa ten as súas propiedades específicas:

| Capa    | Propiedades                                                  |
| ------- | ------------------------------------------------------------ |
| Contido | `width`, `height`, `min-width`, `max-width`, `min-height`, `max-height` |
| Recheo  | `padding-top`, `padding-right`, `padding-bottom`, `padding-left`, atallo `padding` |
| Bordo   | `border-width`, `border-style`, `border-color`, atallos `border`, `border-top`, etc. |
| Marxe   | `margin-top`, `margin-right`, `margin-bottom`, `margin-left`, atallo `margin` |

**Nota:** `width` e `height` **non** son o tamaño total da caixa. Son o tamaño da capa de **contido**. Isto é unha fonte moi habitual de confusión, e vémolo na sección 4.

### 2.3 Elementos de bloque e en liña

Non todos os elementos ocupan o mesmo tipo de caixa. Hai dúas categorías principais:

- **Elementos de bloque (block):** ocupan todo o ancho dispoñible do seu contedor, e sempre comezan nunha liña nova. Exemplos: `<div>`, `<p>`, `<h1>`, `<section>`, `<article>`.
- **Elementos en liña (inline):** ocupan só o ancho do seu contido, e flúen dentro do texto. Exemplos: `<span>`, `<a>`, `<strong>`, `<em>`.

Isto afecta a como se aplican as propiedades de caixa:

- Nos elementos de bloque, `width`, `height`, `margin-top`, `margin-bottom`, `padding-top` e `padding-bottom` **funcionan normalmente**.
- Nos elementos en liña, `width` e `height` **non teñen efecto**, e as marxes e recheos verticais **non afectan ao layout** (aínda que se debuxen). Isto é un comportamento que sorprende a moita xente.

**Exemplo:**

```css
/* Funciona ben: p é un elemento de bloque */
p {
    width: 300px;
    height: 100px;
    margin-top: 20px;
    padding: 15px;
}

/* Non funciona como agardas: span é un elemento en liña */
span {
    width: 300px;      /* ignorado */
    height: 100px;     /* ignorado */
    margin-top: 20px;  /* non afecta ao layout */
    padding: 15px;     /* aplícase visualmente pero non empurra liñas */
}
```

Se necesitas que un elemento en liña se comporte como un bloque, ou viceversa, podes cambiar o seu `display`:

```css
span.bloque {
    display: block;  /* agora compórtase como un bloque */
}

div.en-liña {
    display: inline;  /* agora compórtase como un elemento en liña */
}
```

Hai un terceiro valor, `inline-block`, que mestura características dos dous: compórtase como elemento en liña (non rompe a liña), pero acepta `width`, `height` e marxes verticais.

```css
.boton {
    display: inline-block;
    width: 150px;
    padding: 10px;
}
```

Isto é moi usado para botóns e etiquetas que queren manter un tamaño fixo pero fluír dentro do texto.

---

## 3. As propiedades en detalle

### 3.1 `padding`

O `padding` engade espazo **entre o contido e o bordo**. Forma parte do elemento, polo que herda a súa cor de fondo.

```css
.caixa {
    padding-top: 20px;
    padding-right: 15px;
    padding-bottom: 20px;
    padding-left: 15px;
}
```

**Atallo `padding`:** segue o patrón TRBL (top, right, bottom, left), igual que `margin`:

```css
.caixa {
    padding: 20px;              /* todos os lados */
    padding: 20px 15px;         /* 20 arriba/abaixo, 15 esquerda/dereita */
    padding: 20px 15px 30px;    /* 20 arriba, 15 esquerda/dereita, 30 abaixo */
    padding: 20px 15px 30px 10px; /* arriba, dereita, abaixo, esquerda */
}
```

**Cando usar padding:**

- Cando queres dar aire ao contido dun elemento por dentro.
- Cando queres que o fondo do elemento se estenda máis alá do contido.
- Para botóns, tarxetas, caixas de aviso, etc.

### 3.2 `border`

O `border` debuxa unha liña arredor do elemento, entre o `padding` e o `margin`. Ten tres compoñentes:

- **Grosor (`border-width`):** en unidades como `px`, `rem` ou palabras clave (`thin`, `medium`, `thick`).
- **Estilo (`border-style`):** `solid`, `dashed`, `dotted`, `double`, `groove`, `ridge`, `inset`, `outset`, `none`.
- **Cor (`border-color`):** calquera valor de cor.

**Atallo `border`:**

```css
.caixa {
    border: 2px solid #333333;
    /* grosor, estilo, cor */
}
```

**Bordos por lado:**

```css
.caixa {
    border-top: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
    /* sen bordo esquerdo nin dereito */
}
```

Isto é moi útil para separadores horizontais (por exemplo, entre liñas dunha táboa ou entre elementos dunha lista).

**`border-radius`:** permite redondear as esquinas.

```css
.boton {
    border-radius: 8px;
}

.avatar {
    border-radius: 50%;  /* círculo perfecto */
}
```

Aínda que poñas `border-radius: 50%`, a caixa segue a ser rectangular; só se debuxa arredondada.

**Coidado co bordo e o tamaño:** o `border` **engádese ao tamaño** do elemento. Isto é fundamental e vémolo na sección 4.

### 3.3 `margin`

A `margin` engade espazo **fóra do elemento**, entre el e os seus veciños. Non forma parte do elemento, polo que non herda a súa cor de fondo.

```css
.caixa {
    margin-top: 20px;
    margin-right: 15px;
    margin-bottom: 20px;
    margin-left: 15px;
}
```

**Atallo `margin`:** mesmo patrón que `padding`.

**Centrado horizontal:** un truco moi habitual é usar `margin: 0 auto` para centrar horizontalmente un elemento de bloque cun ancho fixo:

```css
.contenedor {
    width: 800px;
    margin: 0 auto;  /* centrado horizontal */
}
```

**Coidado: para que isto funcione, o elemento debe ter un ancho definido** (non `auto`) e non pode estar en posición absoluta.

**Marxes negativas:** as marxes poden ser negativas, o que move o elemento cara a fóra:

```css
.sobresae {
    margin-top: -20px;  /* móvese 20px cara arriba */
}
```

Úsanse con moderación, pero son útiles en casos concretos (por exemplo, superpoñer elementos).

---

## 4. Como se calcula o tamaño dunha caixa: `box-sizing`

Aquí chegamos ao punto que máis confusión xera ao comezo. Imos con calma.

### 4.1 O problema: `content-box` (comportamento por defecto)

Por defecto, en CSS, cando escribes `width: 300px`, eses 300px refírense **só ao contido**. O `padding` e o `border` **engádense por fóra**.

**Exemplo:**

```css
.caixa {
    width: 300px;
    padding: 20px;
    border: 2px solid black;
}
```

Cal é o ancho **total** que ocupa esta caixa na páxina?

```
Ancho total = width + padding-esquerda + padding-dereita + border-esquerda + border-dereita
           = 300 + 20 + 20 + 2 + 2
           = 344px
```

**Non 300px. 344px.** Isto pilla desprevido a case todo o mundo a primeira vez.

Isto chámase **`content-box`**: o `width` refírese ao contido, e o resto engádese.

### 4.2 A solución: `border-box`

Se engades esta liña:

```css
.caixa {
    box-sizing: border-box;
    width: 300px;
    padding: 20px;
    border: 2px solid black;
}
```

Agora o `width: 300px` refírese ao **ancho total da caixa**, incluído padding e border. O contido queda con menos espazo:

```
Ancho total = 300px
Contido = 300 - 20 - 20 - 2 - 2 = 256px
```

**Isto é moito máis intuitivo.** Cando dis «quero unha caixa de 300px», agardas que a caixa ocupe 300px, non que ocupe 344px.

### 4.3 A recomendación universal

A comunidade de desenvolvedores web adoptou hai anos un patrón que se aplica ao comezo de case todos os proxectos:

```css
*, *::before, *::after {
    box-sizing: border-box;
}
```

Isto fai que **todos os elementos** se comporten co modelo `border-box`, evitando o problema do cálculo.

**Por que é tan importante:** sen isto, cada vez que engades un `padding` a un elemento con `width` fixo, tes que recalcular o ancho total. Nun layout con decenas de elementos, isto vólvese insostible.

> 💡 **Boas prácticas:** inclúe sempre este bloque no comezo dos teus arquivos CSS. Cópiao dun proxecto a outro. Xa forma parte do estándar de facto.

### 4.4 `width`, `height` e `auto`

Os valores de `width` e `height` poden ser:

- **Unha lonxitude:** `300px`, `50%`, `20rem`, etc.
- **`auto`** (por defecto): o navegador calcula o tamaño segundo o contido e o contexto.
- **`min-content`:** o tamaño mínimo para que o contido non se corte.
- **`max-content`:** o tamaño necesario para amosar todo o contido nunha soa liña.
- **`fit-content`:** un punto intermedio, que non supera o ancho dispoñible.

```css
.auto {
    width: auto;  /* o navegador decide */
}

.fixa {
    width: 400px;
}

.porcentaxe {
    width: 50%;  /* 50% do ancho do pai */
}

.minimo {
    width: min-content;  /* o mínimo necesario */
}
```

**`max-width` e `min-width`:** establecen límites ao ancho:

```css
.contenedor {
    width: 90%;
    max-width: 1200px;  /* non pasa de 1200px aínda que o pai sexa moi ancho */
}
```

Este patrón é moi usado para contedores responsivos: ocupan o 90% do pai, pero nunca máis de 1200px.

---

## 5. Colapso de marxes: o fenómeno que sorprende

Este é un tema que adoita xerar moita confusión. Cando dúas marxes verticais están en contacto, **non se suman**, senón que **colapsan** nunha soa marxe do tamaño maior.

### 5.1 Exemplo do colapso

```html
<p style="margin-bottom: 30px;">Primeiro parágrafo.</p>
<p style="margin-top: 20px;">Segundo parágrafo.</p>
```

Se as marxes se sumasen, habería 30 + 20 = **50px** entre os dous parágrafos. Pero o que realmente ocorre é que **colapsan**: a distancia entre eles é de **30px** (a marxe maior).

Isto pasa **só coas marxes verticais** (arriba e abaixo). As marxes horizontais (esquerda e dereita) **nunca colapsan**.

### 5.2 Cando ocorre o colapso

O colapso de marxes ocorre en varios escenarios:

1. **Entre irmáns adxacentes:** o `margin-bottom` dun colapsa co `margin-top` do seguinte.
2. **Entre un pai e o seu primeiro fillo:** se o pai non ten `padding`, `border` nin `overflow: hidden`, o `margin-top` do fillo «sae» e aplica ao pai.
3. **Entre un pai e o seu último fillo:** o mesmo co `margin-bottom`.
4. **Elementos baleiros:** se un elemento non ten contido, `padding`, `border` nin `height`, as súas marxes superior e inferior colapsan entre si.

### 5.3 Como evitalo (cando non o queres)

Hai varias formas de evitar o colapso cando non desexas o seu efecto:

- **`padding` no pai:** se o pai ten `padding`, o fillo xa non colapsa co exterior.
- **`border` no pai:** o mesmo, se o pai ten un bordo.
- **`overflow: hidden` (ou calquera valor distinto de `visible`) no pai.**
- **`display: flex` ou `display: grid` no pai:** estes modos de layout non colapsan marxes.
- **`display: flow-root` no pai:** crea un contexto de formato que evita o colapso.

**Exemplo:**

```css
/* Sen colapso: usando flow-root */
.pai {
    display: flow-root;
}

.fillo {
    margin-top: 40px;  /* agora queda dentro do pai */
}
```

### 5.4 Cando o colapso é útil

Aínda que poida parecer un comportamento «malo», o colapso de marxes existe por unha razón: permite escribir CSS máis limpo.

Sen colapso, se quixeses 20px entre todos os parágrafos dun artigo, terías que poñer `margin-bottom: 20px` a todos menos ao último, ou aplicar marxes a un contedor. Co colapso, abonda con:

```css
p {
    margin-top: 20px;
    margin-bottom: 20px;
}
```

E as distancias entre parágrafos serán sempre 20px, non 40px. O colapso resolve este problema automaticamente.

> 💡 **Para pensar:** o colapso de marxes é unha das razóns polas que moita xente prefire usar `padding` en lugar de `margin` para espazados internos, ou usar `display: flex` con `gap`. En calquera caso, é importante **saber que existe** para non pasar horas depurando algo que che parece inexplicable.

---

## 6. Exemplo mínimo funcional

Vexamos unha páxina que ilustra todos os conceptos deste capítulo.

**Arquivo HTML:**

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <title>Modelo de caixa</title>
    <link rel="stylesheet" href="estilos/caixa.css">
</head>
<body>
    <div class="tarxeta">
        <h2>Un título</h2>
        <p>
            Este parágrafo está dentro dunha tarxeta.
            A tarxeta ten padding, border e margin.
        </p>
        <p>
            Este é un segundo parágrafo. Fíxate no
            colapso de marxes entre os dous.
        </p>
    </div>

    <div class="tarxeta">
        <h2>Outra tarxeta</h2>
        <p>
            Esta tarxeta está separada da anterior
            pola marxe.
        </p>
    </div>
</body>
</html>
```

**Arquivo CSS:**

```css
/* ==============================
   Reset universal
   ============================== */

/* Todos os elementos usan border-box */
*, *::before, *::after {
    box-sizing: border-box;
}

/* Marxes e paddings a cero por defecto */
* {
    margin: 0;
    padding: 0;
}

body {
    font-family: system-ui, sans-serif;
    line-height: 1.6;
    padding: 2rem;
    background: #f5f5f5;
}

/* ==============================
   Tarxetas
   ============================== */

.tarxeta {
    background: white;
    padding: 1.5rem;          /* espazo interior */
    border: 1px solid #dddddd; /* bordo fino */
    border-radius: 8px;        /* esquinas redondeadas */
    margin-bottom: 2rem;       /* separación entre tarxetas */
    max-width: 600px;          /* ancho máximo */
}

.tarxeta h2 {
    margin-bottom: 0.75rem;    /* separa o título do contido */
    color: #1a5c8a;
}

.tarxeta p {
    margin-bottom: 0.75rem;    /* separación entre parágrafos */
}

.tarxeta p:last-child {
    margin-bottom: 0;          /* o último parágrafo non engade marxe */
}
```

**Que está a pasar aquí:**

1. **`box-sizing: border-box`** fai que `width` e `max-width` inclúan o padding e o bordo. Sen isto, a tarxeta ocuparía máis de 600px.
2. **`* { margin: 0; padding: 0; }`** elimina as marxes e recheos por defecto dos elementos, evitando diferenzas entre navegadores.
3. **`.tarxeta`** ten `padding: 1.5rem` (espazo interior), un bordo fino gris, esquinas redondeadas, e `margin-bottom: 2rem` (separación entre tarxetas).
4. **`.tarxeta p`** engade unha marxe inferior para separar parágrafos dentro da tarxeta.
5. **`.tarxeta p:last-child`** elimina a marxe do último parágrafo, para que non quede un espazo baleiro ao final da tarxeta.

Se abres o HTML no navegador, verás dúas tarxetas brancas separadas por un espazo gris. Cada tarxeta ten espazo interior (padding), un bordo fino gris, esquinas redondeadas e separación entre parágrafos.

**Para experimentar:**

- Cambia `padding: 1.5rem` por `padding: 3rem` e observa como o contido se afasta do bordo, pero a tarxeta mantén o mesmo ancho (grazas a `border-box`).
- Elimina `box-sizing: border-box` e observa como a tarxeta se fai máis ancha (agora o padding engádese ao ancho).
- Cambia `margin-bottom: 2rem` por `margin-bottom: 0.5rem` e observa como as tarxetas se achegan.

---

## 7. Casos habituais na práctica

### 7.1 Contedores con ancho máximo

O patrón máis común para centrar o contido dunha páxina:

```css
.contenedor {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}
```

- `width: 100%` fai que o contedor ocupe todo o ancho dispoñible.
- `max-width: 1200px` limita o ancho en pantallas grandes.
- `margin: 0 auto` centra horizontalmente.
- `padding: 0 1rem` engade un pouco de espazo interior nas beiras.

### 7.2 Botóns

Os botóns adoitan combinar `padding`, `border-radius` e `border`:

```css
.boton {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background: #1a5c8a;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    text-decoration: none;
}
```

### 7.3 Separadores horizontais

Usando só `border-bottom`:

```css
.lista li {
    padding: 0.75rem 0;
    border-bottom: 1px solid #eeeeee;
}

.lista li:last-child {
    border-bottom: none;  /* o último non ten separador */
}
```

### 7.4 Imaxes responsivas

```css
img {
    max-width: 100%;
    height: auto;
    display: block;
}
```

- `max-width: 100%` evita que a imaxe desborde o seu contedor.
- `height: auto` mantén a proporción.
- `display: block` elimina o espazo baleiro que se crea debaixo das imaxes en liña.

---

## 8. Erros frecuentes

### 8.1 Esquecer `box-sizing: border-box`

Se non o pos, os cálculos de ancho fanse moi difíciles. Sempre o primeiro bloque do CSS:

```css
*, *::before, *::after {
    box-sizing: border-box;
}
```

### 8.2 Confundir `padding` con `margin`

- `padding` é espazo **interior**. Herda o fondo do elemento.
- `margin` é espazo **exterior**. Non herda o fondo.

Se queres que unha caixa teña espazo arredor do contido **dentro** do fondo, usa `padding`. Se queres separala doutros elementos, usa `margin`.

### 8.3 Non saber que as marxes colapsan

Vexamos un caso real. Queres 20px entre dúas seccións:

```css
.seccion {
    margin-top: 20px;
    margin-bottom: 20px;
}
```

Se hai dúas seccións seguidas, o espazo entre elas será **20px**, non 40px. Isto pode sorprender se non sabes do colapso.

**Solución:** se queres 40px, pon `margin: 40px 0` nunha soa regra. Se queres que non colapse, usa `padding` ou `display: flow-root` no pai.

### 8.4 Poñer `width: 100%` e `padding` sen `border-box`

```css
/* Problema: o elemento ocupa 100% + padding, e desborda */
.caixa {
    width: 100%;
    padding: 20px;
}
```

Se o contedor ten ancho 1000px e a caixa ten `width: 100%` con `padding: 20px`, o ancho total é 1000 + 40 = 1040px, o que desborda.

**Solución:** `box-sizing: border-box`.

### 8.5 Aplicar `width` a elementos en liña

```css
span {
    width: 300px;  /* ignorado */
}
```

Os elementos en liña ignoran `width` e `height`. Se necesitas que teñan tamaño, cambia o seu `display` a `inline-block` ou `block`.

### 8.6 Abusar de marxes negativas

As marxes negativas poden resolver problemas concretos, pero abusar delas fai o CSS moi fráxil. Se te atopas usando moitas marxes negativas, probabelmente haxa unha mellor forma de facer o layout (Flexbox, Grid, etc.).

---

## 9. Compatibilidade (2026)

| Característica                                     | Estado                                         |
| -------------------------------------------------- | ---------------------------------------------- |
| `padding`, `margin`, `border`                      | Universal desde CSS1                           |
| `box-sizing: border-box`                           | Universal desde hai anos                       |
| `border-radius`                                    | Universal desde 2011                           |
| `max-width`, `min-width`                           | Universal                                      |
| `display: flow-root`                               | Baseline desde 2020                            |
| `min-content`, `max-content`, `fit-content`        | Universal (con matices en navegadores antigos) |
| `box-sizing: border-box` en `::before` e `::after` | Universal                                      |

**Recomendación:** usa `box-sizing: border-box` con normalidade, é seguro.

---

## 10. Exercicios

### Exercicio 1: Calcular o ancho total

Dado este CSS:

```css
.caixa {
    width: 400px;
    padding: 20px;
    border: 3px solid #333;
    margin: 10px;
}
```

Cal é o ancho total ocupado pola caixa? E se engades `box-sizing: border-box`?

<details>
<summary><b>Amosar a solución</b></summary>

- Sen `border-box`: 400 + 20 + 20 + 3 + 3 = **446px** de ancho visible. A marxe (10px por cada lado) vai por fóra.
- Con `border-box`: **400px** de ancho visible, incluído padding e border.

</details>

### Exercicio 2: Colapso de marxes

Dado este CSS:

```css
.a {
    margin-bottom: 40px;
}

.b {
    margin-top: 25px;
}
```

Se `.a` e `.b` son irmáns, cal será a distancia entre eles?

<details>
<summary><b>Amosar a solución</b></summary>

**40px** (colapsan as marxes, gaña a maior).

</details>

### Exercicio 3: Centrar un contedor

Escribe CSS para que un `<div>` cun ancho máximo de 900px quede centrado horizontalmente, con polo menos 16px de espazo interior en cada lado.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.contenedor {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 16px;
}
```

</details>

### Exercicio 4: Separar parágrafos

Dado este HTML:

```html
<article>
    <p>Primeiro</p>
    <p>Segundo</p>
    <p>Terceiro</p>
</article>
```

Escribe CSS para que haxa 1rem entre parágrafos, **pero o último non teña marxe inferior**.

<details>
<summary><b>Amosar a solución</b></summary>

```css
article p {
    margin-bottom: 1rem;
}

article p:last-child {
    margin-bottom: 0;
}
```

</details>

### Exercicio 5: Detectar o erro

```css
.caixa {
    width: 100%;
    padding: 30px;
    border: 5px solid red;
}
```

Se o pai desta caixa ten 500px de ancho, canto ocupa realmente a caixa? Que habería que facer para que ocupe exactamente 500px?

<details>
<summary><b>Amosar a solución</b></summary>

A caixa ocupa 500 + 60 + 10 = **570px**. Para que ocupe exactamente 500px, hai que engadir `box-sizing: border-box`.

</details>

---

## 11. Para profundar

- **MDN Web Docs:** [The box model](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model) — introdución clara ao modelo de caixa.
- **MDN Web Docs:** [box-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing) — referencia da propiedade.
- **MDN Web Docs:** [Mastering margin collapsing](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing) — artigo detallado sobre o colapso de marxes.
- **web.dev:** [Learn CSS: The box model](https://web.dev/learn/css/box-model) — lección interactiva.
- **W3C:** [CSS Box Model Module Level 3](https://www.w3.org/TR/css-box-3/) — especificación formal.

---

## 12. Referencias cruzadas

- **Capítulo 3: Selectores básicos** — como se seleccionan os elementos aos que se aplican as propiedades de caixa.
- **Capítulo 4: Cores, tipografía e unidades** — unidades como `rem`, `px`, `%` que se usan en `padding`, `margin` e `width`.
- **Capítulo 6: `display`, fluxo normal e posicionamento** — como se organizan as caixas nunha páxina.
- **Capítulo 8: Flexbox** — un modo de layout que **non colapsa marxes** e usa `gap` para separar elementos.
- **Capítulo 9: Grid** — o outro modo de layout moderno, con comportamento similar.
- **Capítulo 14: Propiedades personalizadas (variables CSS)** — para definir espazados coherentes.

---

**Data de creación:** 2026-09-17  
**Última revisión:** 2026-09-17  
**Estado:** Borrador para validación
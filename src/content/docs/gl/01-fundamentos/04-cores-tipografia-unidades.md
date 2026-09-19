---
title: "Cores, tipografía e unidades"
description: "Fundamentos das cores, a tipografía e as unidades de medida máis empregadas en CSS."
bloque: 1
capitulo: 4
nivel: basico
ultima_revision: "2026-09-17"
estado: "borrador_para_validacion"
compatibilidade: "universal"
palabras_chave:
  - cores
  - tipografia
  - unidades
  - hex
  - rgb
  - hsl
  - font_family
  - font_size
  - px
  - rem
  - em
  - vw
  - vh
  - porcentaxe
---

<!-- # Capítulo 4: Cores, tipografía e unidades -->

> Este capítulo cobre tres aspectos que aparecen en case todas as regras CSS: como se definen as **cores**, como se controla a **tipografía**, e que **unidades de medida** existen e cando usar cada unha. Son tres temas distintos pero van xuntos porque na práctica úsanse á vez: cando dás estilo a un texto, sempre estás a elixir cor, tamaño, tipografía e espazado.

---

## 1. Introdución: os tres piares visuais de calquera páxina

Cando miras unha páxina web, o teu ollo percibe inmediatamente tres cousas:

1. **A cor**: o que destaca, o que se le, o que chama a atención.
2. **A tipografía**: como se le o texto, se cansa ou non, se transmite formalidade ou proximidade.
3. **O espazo**: canto ocupa cada cousa, canto aire hai entre elementos, como se organiza a información.

Estes tres aspectos non son decoración. Son **comunicación**. Unha cor mal elixida pode facer un texto ilexible. Unha tipografía inadecuada pode facer que un sitio pareza pouco profesional. Unha unidade mal usada pode facer que a páxina se vexa ben nun monitor e rompa nun móbil.

Neste capítulo imos ver como se controlan estes tres aspectos desde CSS. Non é un capítulo de deseño (iso é outra disciplina), senón de **ferramentas**: que propiedades existen, que valores aceptan, e cando usar cada opción. O bo gusto elíxeo ti.

> 💡 **Para pensar:** Un dos erros máis comúns de quen empeza é pensar que «máis cores = mellor». Na práctica, os sitios web profesionais usan **poucas cores** (2-4 principais) e moito espazo en branco. A disciplina visual consiste en resistir a tentación de engadir.

---

## 2. Cores

### 2.1 Como se representan as cores en CSS

Unha cor en CSS pódese escribir de moitas formas. Todas son válidas, e todas representan o mesmo: unha combinación de luz vermella, verde e azul (o modelo **RGB**) que os monitores saben reproducir.

Vexamos as formas principais, da máis antiga á máis moderna.

#### 2.1.1 Nomes de cores

CSS define unha lista duns 140 nomes de cores en inglés: `red`, `blue`, `green`, `yellow`, `black`, `white`, `orange`, `purple`, etc.

```css
h1 {
    color: red;
    background-color: lightyellow;
}
```

**Cando usalos:** case nunca en proxectos reais. Teñen dous problemas:

1. Son **pouco precisos**: `red` é un vermello concreto, pero se queres un vermello específico da túa marca, non che serve.
2. **Non se poden modificar facilmente**: se mañá queres cambiar o ton, tes que editar todas as regras.

**Cando si usalos:** en prototipos rápidos, en exemplos didácticos, ou cando o nome coincide exactamente co que queres (`white`, `black` son útiles).

> 💡 **Curiosidade:** algúns nomes son sorprendentes: `chocolate`, `tomato`, `orchid`, `papayawhip`, `rebeccapurple`. Este último engadiuse en 2014 en homenaxe a Rebecca Meyer, filla dun desenvolvedor web que faleceu aos 6 anos.

#### 2.1.2 Hexadecimal

A forma máis tradicional e aínda moi usada. Escríbese cun cancelo (`#`) seguido de 3, 4, 6 ou 8 díxitos hexadecimais (0-9, a-f).

```css
h1 {
    color: #1a5c8a;        /* azul escuro */
    background-color: #fef9c3; /* amarelo claro */
}

p {
    color: #333;           /* abreviación de #333333 */
}
```

**Como se le:**

- `#RRGGBB`: dous díxitos para vermello, dous para verde, dous para azul.
- `#RGB`: abreviación cando os dous díxitos de cada canle son iguais (`#333` = `#333333`).
- `#RRGGBBAA`: engade dous díxitos para transparencia (alpha).
- `#RGBA`: abreviación con transparencia.

**Exemplos:**

| Código    | Cor                   |
| --------- | --------------------- |
| `#000000` | Negro                 |
| `#ffffff` | Branco                |
| `#ff0000` | Vermello puro         |
| `#00ff00` | Verde puro            |
| `#0000ff` | Azul puro             |
| `#1a5c8a` | Azul escuro (exemplo) |
| `#333333` | Gris escuro           |

**Cando usalo:** cando copias unha cor exacta dunha guía de estilo ou dunha ferramenta de deseño (Figma, Photoshop). É preciso e universal.

#### 2.1.3 `rgb()` e `rgba()`

A función `rgb()` recibe tres valores (vermello, verde, azul) entre 0 e 255.

```css
h1 {
    color: rgb(26, 92, 138);       /* equivalente a #1a5c8a */
    background-color: rgb(254, 249, 195);
}
```

A función `rgba()` engade un cuarto valor: a **transparencia** (alpha), entre 0 (transparente) e 1 (opaco).

```css
.fondo-semitransparente {
    background-color: rgba(0, 0, 0, 0.5);  /* negro ao 50% */
}
```

**Nota:** hoxe en día, `rgb()` tamén acepta o cuarto valor alpha, polo que `rgba()` é redundante. Pero moito código antigo aínda usa `rgba()`. Os dous funcionan.

**Cando usalo:** cando necesitas transparencia ou cando calculas cores dinamicamente desde JavaScript.

#### 2.1.4 `hsl()` e `hsla()`

O modelo **HSL** (Hue, Saturation, Lightness) describe a cor en tres parámetros:

- **Hue (ton):** un ángulo entre 0 e 360 graos. 0 = vermello, 120 = verde, 240 = azul.
- **Saturation (saturación):** unha porcentaxe. 0% = gris, 100% = cor pura.
- **Lightness (luminosidade):** unha porcentaxe. 0% = negro, 50% = cor normal, 100% = branco.

```css
h1 {
    color: hsl(205, 68%, 32%);   /* azul escuro */
}

.destacado {
    background-color: hsl(50, 100%, 88%);  /* amarelo claro */
}
```

Con transparencia:

```css
.fondo {
    background-color: hsla(0, 0%, 0%, 0.5);  /* negro ao 50% */
}
```

**Vantaxe respecto a hex ou rgb:** HSL é **moito máis intuitivo** para crear variacións dunha mesma cor. Se queres un azul un pouco máis claro, abonda con aumentar a luminosidade:

```css
.azul-escuro   { color: hsl(205, 68%, 32%); }
.azul-medio    { color: hsl(205, 68%, 50%); }
.azul-claro    { color: hsl(205, 68%, 70%); }
.azul-moi-claro { color: hsl(205, 68%, 90%); }
```

Todas comparten o mesmo ton e saturación, só cambia a luminosidade. Isto é moi útil para crear **paletas de cores coherentes**.

**Cando usalo:** sempre que queiras crear variacións dunha cor ou cando penses en termos de «ton», «saturación» e «luminosidade». É un dos modelos máis recomendados para traballar con CSS moderno.

#### 2.1.5 Espazos de cor modernos: `oklch()`, `lab()`, `lch()`

CSS moderno incorpora espazos de cor **perceptualmente uniformes**, que reparten as cores de forma máis acorde coa percepción humana. O máis recomendado actualmente é **OKLCH**.

```css
h1 {
    color: oklch(45% 0.12 250);
    /* L = luminosidade (0-100%)
       C = croma (saturación percibida, 0-0.4 aprox.)
       H = ton (0-360 graos) */
}
```

**Vantaxe principal:** en HSL, dous cores coa mesma luminosidade poden parecer moi diferentes de brillo (o amarelo puro parece moito máis brillante que o azul puro, aínda que os dous teñan `lightness: 50%`). En OKLCH, a luminosidade é **perceptual**: dous cores con `L` igual parecen igual de brillantes.

**Cando usalo:** en proxectos novos, especialmente se queres crear paletas accesibles e coherentes. Ten soporte completo en todos os navegadores modernos desde 2023.

> ⚠️ **Nota:** a sintaxe de `oklch()` pode parecer estraña ao principio. Pero unha vez que a entendes, é moi práctica. Se vés de HSL, a diferenza clave é que `L` vai de 0 a 1 ou de 0% a 100%, `C` é un número pequeno (0 a 0.4 aprox.), e `H` é un ángulo.

#### 2.1.6 Outras funcións de cor modernas

**`color-mix()`**: mestura dúas cores.

```css
.boton {
    background-color: color-mix(in oklch, #1a5c8a 70%, white);
    /* 70% de azul escuro + 30% de branco */
}
```

Útil para crear variacións sen ter que calcular manualmente os valores.

**`contrast-color()`**: devolve automaticamente a cor con maior contraste respecto a unha cor dada.

```css
.boton {
    background-color: #1a5c8a;
    color: contrast-color(#1a5c8a);
    /* O navegador escolle entre negro ou branco segundo cal contraste mellor */
}
```

Esta función é moi recente (Baseline 2026). Consulta o estado actual antes de usala en produción.

### 2.2 Propiedades de cor

As propiedades máis usadas que aceptan cores son:

| Propiedade              | Que controla                     |
| ----------------------- | -------------------------------- |
| `color`                 | A cor do texto.                  |
| `background-color`      | A cor de fondo.                  |
| `border-color`          | A cor dos bordos.                |
| `outline-color`         | A cor do contorno (focus).       |
| `text-decoration-color` | A cor da liña de subliñado, etc. |
| `caret-color`           | A cor do cursor de texto.        |

Exemplo combinado:

```css
.boton {
    color: white;
    background-color: #1a5c8a;
    border: 2px solid #0d3a5c;
}

.boton:hover {
    background-color: #0d3a5c;
}
```

### 2.3 Accesibilidade: o contraste

Un dos erros máis graves ao elixir cores é **non garantir contraste suficiente** entre o texto e o fondo. Isto afecta directamente á lexibilidade para persoas con baixa visión, daltónicas, ou que usan pantallas en condicións de moita luz.

As **WCAG** (Web Content Accessibility Guidelines) establecen niveis mínimos de contraste:

- **Nivel AA (mínimo recomendado):** contraste de 4.5:1 para texto normal, 3:1 para texto grande.
- **Nivel AAA (óptimo):** 7:1 para texto normal, 4.5:1 para texto grande.

**Como comprobalo:** hai moitas ferramentas en liña que che din o contraste entre dúas cores. Por exemplo, [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).

```css
/* MAL: contraste insuficiente */
p {
    color: #999999;
    background: #ffffff;  /* contraste 2.85:1 — non pasa AA */
}

/* BEN */
p {
    color: #555555;
    background: #ffffff;  /* contraste 7.45:1 — pasa AAA */
}
```

> ⚠️ **Accesibilidade:** o contraste non é unha recomendación opcional. É un requisito legal en moitos países (por exemplo, a directiva europea de accesibilidade web). E sobre todo, é unha cuestión de respecto ás persoas que usan os teus sitios.

---

## 3. Tipografía

A tipografía é o conxunto de decisións sobre como se presenta o texto: que tipo de letra, que tamaño, que espazado, que aliñación. É probablemente o aspecto que máis afecta á **lexibilidade** dunha páxina.

### 3.1 `font-family`: a familia tipográfica

Indica que tipo de letra usar. Como non todas as persoas teñen as mesmas fontes instaladas, defínese unha **lista de preferencias** (font stack): o navegador usa a primeira que atope no sistema.

```css
body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
```

**Como se le:**

1. O navegador busca `"Helvetica Neue"` no sistema. Se a atopa, úsaa.
2. Se non, busca `Helvetica`.
3. Se non, busca `Arial`.
4. Se non, usa a fonte xenérica `sans-serif` (a que o sistema considere sans-serif por defecto).

**Familias xenéricas** (sempre ao final da lista):

- `serif`: con serifas (Georgia, Times New Roman).
- `sans-serif`: sen serifas (Arial, Helvetica, Verdana).
- `monospace`: ancho fixo (Courier, Consolas), para código.
- `cursive`: manuscrita.
- `fantasy`: decorativa.

**Boas prácticas:**

- Poñer sempre unha familia xenérica ao final.
- Se o nome da fonte ten espazos, entre comiñas: `"Helvetica Neue"`.
- Usar como máximo 2-3 fontes distintas nun sitio.

```css
/* Tipografía para o corpo do texto */
body {
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}

/* Tipografía para títulos */
h1, h2, h3 {
    font-family: Georgia, "Times New Roman", serif;
}

/* Tipografía para código */
code, pre {
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
}
```

> 💡 **Nota:** `system-ui` é unha palabra clave que fai que o navegador use a fonte por defecto do sistema operativo. É unha boa opción para que a túa web se vexa «nativa» en cada plataforma.

### 3.2 `font-size`: o tamaño do texto

```css
body {
    font-size: 1rem;      /* 16px por defecto */
}

h1 {
    font-size: 2.5rem;    /* 40px */
}

small {
    font-size: 0.875rem;  /* 14px */
}
```

**Unidades:** as máis usadas son `rem` e `em` (veremos as unidades en detalle na sección 4). `px` tamén funciona, pero non se adapta ás preferencias do usuario.

**Regra práctica:** establece un tamaño base no `body` (por exemplo `1rem`, que equivale a 16px por defecto) e a partir de aí usa `rem` para todo o demais.

### 3.3 `font-weight`: o grosor

Valores numéricos de 100 a 900, ou palabras clave:

| Valor numérico | Palabra clave | Descrición           |
| -------------- | ------------- | -------------------- |
| 100            | `thin`        | Moi fino             |
| 300            | `light`       | Fino                 |
| 400            | `normal`      | Normal (por defecto) |
| 500            | `medium`      | Medio                |
| 700            | `bold`        | Negra                |
| 900            | `black`       | Moi negra            |

```css
p {
    font-weight: 400;
}

strong {
    font-weight: 700;
}

.lixeiro {
    font-weight: 300;
}
```

> ⚠️ **Nota:** Non todas as fontes teñen todos os grosores. Se unha fonte só ten 400 e 700, pedir 500 amosará 400 ou 700, o que a fonte teña definido. As **fontes variables** (variable fonts) resolven isto permitindo calquera valor entre os extremos.

### 3.4 `font-style`: cursiva

```css
em, .cursiva {
    font-style: italic;
}

.normal {
    font-style: normal;  /* anula a cursiva herdada */
}
```

Valores: `normal`, `italic`, `oblique`.

### 3.5 `line-height`: o espazado entre liñas

Controla a altura de cada liña de texto. É **clave para a lexibilidade**.

```css
body {
    line-height: 1.5;    /* 1.5 veces o tamaño da fonte */
}

h1 {
    line-height: 1.2;    /* títulos adoitan ter menos espazo */
}

p {
    line-height: 1.6;    /* corpo de texto, máis espazo */
}
```

**Valores:**

- **Sen unidade** (recomendado): `1.5` significa 1.5 veces o `font-size` do elemento. É o máis flexible.
- **Con unidade:** `24px`, `1.5rem`, etc. Menos flexible.
- **Porcentaxe:** `150%` equivale a `1.5`, pero con diferenzas sutís na herdanza.

**Recomendación xeral:**

- Corpo de texto: `1.5` a `1.7`.
- Títulos: `1.1` a `1.3`.
- Nunca menos de `1` (o texto vólvese ilexible).

### 3.6 Outras propiedades tipográficas

```css
p {
    letter-spacing: 0.02em;      /* espazo entre letras */
    word-spacing: 0.05em;         /* espazo entre palabras */
    text-align: left;             /* left | right | center | justify */
    text-decoration: underline;   /* underline | none | line-through | overline */
    text-transform: uppercase;    /* uppercase | lowercase | capitalize | none */
    text-indent: 2rem;            /* sangría da primeira liña */
}
```

**Cando usar cada unha:**

- `letter-spacing`: útil en textos moi pequenos (mellora lexibilidade) ou en títulos en maiúsculas (dálles aire).
- `text-align`: `left` por defecto na maioría das culturas. `justify` pode crear ríos de espazo en columnas estreitas.
- `text-transform: uppercase`: **non** substitúe escribir en maiúsculas no HTML. Úsao só para efectos visuais, non para cambiar o significado.

### 3.7 Fontes web (`@font-face`)

Se queres usar unha fonte que non está instalada no sistema da persoa que visita a túa web, podes **descargala** desde o teu servidor ou desde un servizo externo.

**Opción 1: autoaloxada**

```css
@font-face {
    font-family: "Miña Fonte";
    src: url("fontes/minha-fonte.woff2") format("woff2"),
         url("fontes/minha-fonte.woff") format("woff");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}

body {
    font-family: "Miña Fonte", sans-serif;
}
```

**Opción 2: servizos externos** (Google Fonts, Fontsource, etc.)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
```

```css
body {
    font-family: "Inter", sans-serif;
}
```

**Coidados:**

- **Rendemento:** as fontes web engaden peso á páxina. Usa só as variantes que necesites.
- **Privacidade:** os servizos externos poden rexistrar as visitas. Se isto importa, autoaloxa as fontes.
- **`font-display: swap`:** fai que o texto se amose cunha fonte de reserva mentres se descarga a fonte web. Mellor que un texto invisible.

---

## 4. Unidades de medida

En CSS hai moitas unidades. Escoller a axeitada para cada caso é fundamental para que a túa páxina se vexa ben en calquera dispositivo.

### 4.1 Unidades absolutas

Teñen un valor fixo, independente do contexto.

| Unidade          | Equivalencia                                       |
| ---------------- | -------------------------------------------------- |
| `px`             | Píxel. A máis usada.                               |
| `pt`             | Punto (1pt = 1.333px). Para impresión.             |
| `cm`, `mm`, `in` | Centímetros, milímetros, polgadas. Para impresión. |
| `pc`             | Pica (1pc = 12pt). Para impresión.                 |

```css
h1 {
    font-size: 32px;
    margin-bottom: 16px;
}
```

**Cando usar `px`:** para bordos, sombras, ou valores moi concretos que non deben cambiar. **Evítao** para tamaños de texto e espazados grandes, porque non se adapta ás preferencias do usuario.

### 4.2 Unidades relativas

O seu valor depende doutro valor de referencia. Son as recomendadas para deseño adaptativo.

| Unidade | Relativa a...                                                |
| ------- | ------------------------------------------------------------ |
| `em`    | O tamaño da fonte do elemento actual.                        |
| `rem`   | O tamaño da fonte do elemento raíz (`<html>`).               |
| `%`     | Depende da propiedade: para `font-size`, é o tamaño do pai; para `width`, o ancho do pai. |
| `vw`    | 1% do ancho da ventá (viewport width).                       |
| `vh`    | 1% da altura da ventá (viewport height).                     |
| `vmin`  | 1% do lado máis pequeno da ventá.                            |
| `vmax`  | 1% do lado máis grande da ventá.                             |
| `ch`    | Ancho do carácter «0» da fonte actual.                       |
| `ex`    | Altura da letra «x» da fonte actual.                         |
| `lh`    | Altura de liña do elemento actual.                           |

**`rem` vs `em`:**

```css
html {
    font-size: 16px;
}

body {
    font-size: 1rem;       /* 16px */
}

.tarxeta {
    font-size: 1.25rem;    /* 20px */
    padding: 1em;          /* 20px — relativo ao font-size do elemento */
}

.tarxeta h2 {
    font-size: 1.5em;      /* 30px — 1.5 × 20px (o pai) */
}
```

**A diferenza clave:**

- `rem` sempre é relativo ao `<html>`. É **predecible**.
- `em` é relativo ao `font-size` do **elemento actual**. Isto pode ser útil (para que os paddings escalen co texto) ou problemático (se non controlas o contexto).

**Recomendación:**

- Usa `rem` para tamaños de fonte e espazados xerais.
- Usa `em` só cando queres que algo escale co tamaño de texto do seu contedor.
- Usa `px` só para valores moi pequenos ou que non deben cambiar.

**`vw` e `vh`:**

```css
.hero {
    min-height: 100vh;    /* ocupa o alto da ventá */
    padding: 5vw;         /* 5% do ancho da ventá */
}
```

Útiles para seccións que ocupan toda a pantalla. **Coidado** en móbiles: a altura da ventá cambia cando aparecen as barras do navegador, o que pode causar saltos.

### 4.3 Funcións de cálculo

**`calc()`** permite combinar unidades:

```css
.contenedor {
    width: calc(100% - 2rem);   /* ancho total menos 2rem de marxe */
    padding: calc(1rem + 2vw);   /* combinación de rem e vw */
}
```

**`min()`, `max()`, `clamp()`** permiten escoller valores dentro dun rango:

```css
h1 {
    font-size: clamp(1.5rem, 5vw, 3rem);
    /* mínimo 1.5rem, ideal 5vw, máximo 3rem */
}
```

Isto é **moi útil** para tipografía adaptativa: o texto crece coa pantalla pero sen pasar dun límite.

---

## 5. Exemplo mínimo funcional

Vexamos unha páxina completa que combina cores, tipografía e unidades.

**Arquivo HTML:**

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <title>Cores, tipografía e unidades</title>
    <link rel="stylesheet" href="estilos/estilo.css">
</head>
<body>
    <header class="cabecera">
        <h1>Manual de CSS</h1>
        <p class="subtitulo">Aprende desde cero, en galego</p>
    </header>

    <main>
        <article>
            <h2>Un título de artigo</h2>
            <p>
                Este é un parágrafo de exemplo que serve para
                comprobar como se aplican as cores, a tipografía
                e as unidades de medida nun contexto real.
            </p>
            <p class="destacado">
                Este parágrafo ten un fondo amarelo claro e un bordo lateral.
            </p>
        </article>
    </main>
</body>
</html>
```

**Arquivo CSS:**

```css
/* ==============================
   Variables de cor (verémolas no Cap. 14)
   ============================== */
:root {
    --cor-primaria: #1a5c8a;
    --cor-texto: #333333;
    --cor-fondo: #ffffff;
    --cor-destacado: #fef9c3;
    --cor-bordo: #ca8a04;
}

/* ==============================
   Reset básico
   ============================== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* ==============================
   Tipografía base
   ============================== */
html {
    font-size: 16px;   /* 1rem = 16px */
}

body {
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    color: var(--cor-texto);
    background-color: var(--cor-fondo);
}

h1, h2 {
    font-family: Georgia, "Times New Roman", serif;
    line-height: 1.2;
    color: var(--cor-primaria);
}

h1 {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
}

h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

p {
    margin-bottom: 1rem;
}

/* ==============================
   Cabeceira
   ============================== */
.cabecera {
    padding: 3rem 1.5rem;
    background-color: var(--cor-primaria);
    color: white;
    text-align: center;
}

.cabecera h1 {
    color: white;
    margin-bottom: 0.5rem;
}

.subtitulo {
    font-size: 1.125rem;
    opacity: 0.9;
}

/* ==============================
   Contido
   ============================== */
main {
    max-width: 65ch;      /* ancho ideal de lectura */
    margin: 0 auto;       /* centrado horizontal */
    padding: 2rem 1.5rem;
}

.destacado {
    background-color: var(--cor-destacado);
    border-left: 4px solid var(--cor-bordo);
    padding: 1rem 1.5rem;
    border-radius: 4px;
}
```

**Que está a pasar aquí:**

1. **`html { font-size: 16px; }`** establece a base para as unidades `rem`.
2. **`body`** define a tipografía base (sans-serif), o tamaño (1rem), a altura de liña (1.6) e as cores.
3. **`h1, h2`** cambian a serif e a cor azul.
4. **`h1`** usa `clamp()` para que o tamaño vaia de 1.75rem a 2.5rem segundo o ancho da ventá.
5. **`.cabecera`** ten fondo azul e texto branco, con `padding` en `rem` (adaptable).
6. **`main`** limita o ancho a `65ch` (aproximadamente 65 caracteres), que é o ancho ideal de lectura.
7. **`.destacado`** usa fondo amarelo, bordo lateral e `border-radius`.

Se abres o HTML no navegador, verás unha cabeceira azul cun título grande, un artigo con texto lexible e un parágrafo destacado con fondo amarelo. Se redimensionas a ventá, o título adapta o tamaño e o contido permanece centrado.

---

## 6. Casos habituais na práctica

### 6.1 Sistema de cores con variables

O patrón máis común en CSS moderno é definir as cores como **variables** (custom properties) e usalas en todas as regras:

```css
:root {
    --cor-primaria: #1a5c8a;
    --cor-secundaria: #ca8a04;
    --cor-texto: #333333;
    --cor-fondo: #ffffff;
}

.boton {
    background: var(--cor-primaria);
    color: white;
}
```

Isto permite cambiar toda a paleta modificando só as variables.

### 6.2 Escala tipográfica

En vez de elixir tamaños de fonte ao azar, defínese unha **escala** coherente:

```css
:root {
    --texto-xs: 0.75rem;    /* 12px */
    --texto-sm: 0.875rem;   /* 14px */
    --texto-base: 1rem;     /* 16px */
    --texto-lg: 1.125rem;   /* 18px */
    --texto-xl: 1.25rem;    /* 20px */
    --texto-2xl: 1.5rem;    /* 24px */
    --texto-3xl: 1.875rem;  /* 30px */
    --texto-4xl: 2.25rem;   /* 36px */
}

h1 { font-size: var(--texto-4xl); }
h2 { font-size: var(--texto-3xl); }
p  { font-size: var(--texto-base); }
```

### 6.3 Ancho de liña ideal

Para que un texto longo sexa cómodo de ler, o ancho da liña debería estar entre **45 e 75 caracteres**. Pódese conseguir con `ch`:

```css
.articulo {
    max-width: 65ch;
    margin: 0 auto;
}
```

### 6.4 Tipografía fluída

Combinar `clamp()` con unidades relativas para que o texto se adapte suavemente ao tamaño da pantalla:

```css
h1 {
    font-size: clamp(1.5rem, 4vw + 1rem, 3rem);
}

p {
    font-size: clamp(1rem, 1.5vw, 1.125rem);
}
```

---

## 7. Erros frecuentes

### 7.1 Usar só `px` para todo

```css
/* Non recomendado */
body {
    font-size: 16px;
}

h1 {
    font-size: 32px;
    margin-bottom: 24px;
}
```

**Problema:** se a persoa que visita a web ten configurado un tamaño de fonte máis grande no navegador (por accesibilidade), os `px` non se adaptan.

**Solución:** usar `rem` para tamaños de fonte e espazados xerais.

### 7.2 Non usar familia xenérica ao final

```css
/* Mal: se o usuario non ten Arial, non hai reserva */
body {
    font-family: Arial;
}

/* Ben */
body {
    font-family: Arial, sans-serif;
}
```

### 7.3 Contraste insuficiente

```css
/* Mal: gris claro sobre branco */
p {
    color: #cccccc;
    background: #ffffff;
}
```

Sempre comprobar o contraste con ferramentas como WebAIM.

### 7.4 Abusar de `!important`

```css
/* Evitar */
p {
    color: red !important;
}
```

`!important` rompe a cascada e fai o CSS moi difícil de manter. Úsao só como último recurso.

### 7.5 Esquecer a herdanza

Algunhas propiedades (como `color`, `font-family`, `line-height`) **herdan** do pai. Outras (como `margin`, `padding`, `border`) non. Se non o tes claro, podes atopar estilos que «non se aplican» ou que se aplican onde non queres.

---

## 8. Compatibilidade (2026)

| Característica              | Estado                  |
| --------------------------- | ----------------------- |
| Cores hex, rgb, hsl         | Universal desde CSS1-3  |
| `oklch()`, `lab()`, `lch()` | Baseline desde 2023     |
| `color-mix()`               | Baseline desde 2023     |
| `contrast-color()`          | Baseline novo (2026)    |
| `clamp()`, `min()`, `max()` | Baseline desde 2020     |
| `rem`, `em`, `vw`, `vh`     | Universal               |
| `ch`, `ex`, `lh`            | Universal (con matices) |
| Fontes variables            | Universal desde 2020    |
| `@font-face` con `woff2`    | Universal               |

**Recomendación:** para `contrast-color()`, comproba o estado actual en [web.dev/baseline](https://web.dev/baseline) antes de usala en produción sen alternativa.

---

## 9. Exercicios

### Exercicio 1: Cores

Escribe tres formas distintas de representar a mesma cor (`#1a5c8a`) usando hex, `rgb()` e `hsl()`.

<details>
<summary><b>Amosar a solución</b></summary>

```css
color: #1a5c8a;
color: rgb(26, 92, 138);
color: hsl(205, 68%, 32%);
```

</details>

### Exercicio 2: Tipografía

Dado este HTML:

```html
<article>
    <h2>Título</h2>
    <p>Un parágrafo normal.</p>
    <p class="nota">Unha nota pequena.</p>
</article>
```

Escribe CSS para que:

1. O corpo do texto use unha sans-serif.
2. O título use unha serif.
3. O parágrafo `.nota` teña tamaño `0.875rem` e cor gris.

<details>
<summary><b>Amosar a solución</b></summary>

```css
body {
    font-family: system-ui, sans-serif;
    font-size: 1rem;
    line-height: 1.6;
}

h2 {
    font-family: Georgia, serif;
    font-size: 1.5rem;
}

.nota {
    font-size: 0.875rem;
    color: #666666;
}
```

</details>

### Exercicio 3: Unidades

Explica a diferenza entre `em` e `rem`. Cando usarías cada unha?

<details>
<summary><b>Amosar a solución</b></summary>

- `em` é relativo ao `font-size` do **elemento actual**.
- `rem` é relativo ao `font-size` do **elemento raíz** (`<html>`).
- Usa `rem` para tamaños de fonte e espazados xerais (predecible).
- Usa `em` cando queres que algo escale co tamaño de texto do seu contedor (por exemplo, paddings dentro dun botón).

</details>

### Exercicio 4: Tipografía fluída

Escribe CSS para que un `h1` teña:

- Mínimo: `1.75rem`
- Ideal: `4vw`
- Máximo: `3rem`

<details>
<summary><b>Amosar a solución</b></summary>

```css
h1 {
    font-size: clamp(1.75rem, 4vw, 3rem);
}
```

</details>

### Exercicio 5: Accesibilidade

Dado este CSS:

```css
p {
    color: #888888;
    background: #ffffff;
}
```

Comproba o contraste. Pasa o nivel AA das WCAG?

<details>
<summary><b>Amosar a solución</b></summary>

O contraste entre `#888888` e `#ffffff` é aproximadamente **3.54:1**. Non pasa o nivel AA para texto normal (require 4.5:1). Habería que escurecer o texto, por exemplo a `#595959` (contraste 7:1).

</details>

---

## 10. Para profundar

- **MDN Web Docs:** [CSS colors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors) — referencia completa de cores.
- **MDN Web Docs:** [CSS fonts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts) — referencia completa de tipografía.
- **MDN Web Docs:** [CSS values and units](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units) — referencia de unidades.
- **web.dev:** [Learn CSS: Color](https://web.dev/learn/css/color) — lección interactiva.
- **web.dev:** [Learn CSS: Typography](https://web.dev/learn/css/typography) — lección interactiva.
- **web.dev:** [Learn CSS: Sizing units](https://web.dev/learn/css/sizing) — lección interactiva.
- **W3C:** [CSS Color Module Level 4](https://www.w3.org/TR/css-color-4/) — especificación formal (nivel avanzado).
- **WebAIM:** [Contrast Checker](https://webaim.org/resources/contrastchecker/) — ferramenta para comprobar contraste.

---

## 11. Referencias cruzadas

- **Capítulo 2: Sintaxe** — repasa a estrutura dunha regra e os atallos como `font`.
- **Capítulo 3: Selectores básicos** — repasa como se aplican os estilos aos elementos.
- **Capítulo 5: Modelo de caixa** — explica `margin`, `padding` e `border`, que se usan nos exemplos.
- **Capítulo 11: Media queries** — aprofunda en como facer que os tamaños cambien segundo o dispositivo.
- **Capítulo 13: Unidades relativas e funcións modernas** — amplía o uso de `clamp()`, `min()`, `max()`.
- **Capítulo 14: Propiedades personalizadas (variables CSS)** — explica en detalle as variables que se usan nos exemplos.
- **Capítulo 17: Funcións de cor modernas** — aprofunda en `oklch()`, `color-mix()` e `contrast-color()`.
- **Capítulo 26: Accesibilidade e CSS** — amplía o tema do contraste e outras consideracións de accesibilidade.

---

**Data de creación:** 2026-09-17  
**Última revisión:** 2026-09-17  
**Estado:** Borrador para validación
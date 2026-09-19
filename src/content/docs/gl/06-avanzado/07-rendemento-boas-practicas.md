---
title: "Rendemento e boas prácticas"
description: "Boas prácticas para escribir CSS rápido, previsible e fácil de manter, entendendo as fases de renderización do navegador."
bloque: 6
capitulo: 24
nivel: avanzado
ultima_revision: "2026-09-17"
estado: "borrador_para_validacion"
compatibilidade: "universal"
palabras_chave:
  - rendemento
  - performance
  - boas_practicas
  - organization
  - maintenance
  - render
  - layout
  - paint
  - composite
  - will_change
---

<!-- # Capítulo 24: Rendemento e boas prácticas -->

> CSS non é só «escribir regras que funcionen». Un CSS **ben escrito** tamén é **rápido**, **fácil de manter** e **previsible**. Este capítulo explica como o navegador procesa o CSS (para entender por que unhas técnicas son máis custosas ca outras), cales son as prácticas que melloran o rendemento, cales son as que o empeoran, e como organizar o código para que un proxecto medre sen volverse inmanexable.

---

## 1. Introdución: o rendemento tamén é unha decisión de deseño

Cando unha páxina web é lenta, a xente pensa primeiro no JavaScript. Pero o CSS tamén afecta ao rendemento, e moitas veces sen que ninguén o note ata que é tarde.

Un CSS mal escrito pode provocar:

- **Recálculos de layout innecesarios** (o navegador ten que repoñer todos os elementos).
- **Repintados constantes** (o navegador ten que redibuxar zonas da pantalla).
- **Animacións que van a saltos** (o navegador non chega a 60 fotogramas por segundo).
- **Páxinas que tardan en verse** (o CSS bloquea a representación visual).

Nada disto se resolve escribindo máis código. Resólvese escribindo **mellor** código. Este capítulo non é unha lista de trucos soltos, senón unha explicación de **como funciona o navegador** para que poidas tomar decisións informadas.

> 💡 **Para pensar:** a maioría das optimizacións de CSS non requiren ferramentas externas. Requiren **entender o que fai o navegador** cando aplica estilos. Unha vez que entendes isto, as decisións son case sempre obvias: animar `transform` en lugar de `width`, usar `will-change` con coidado, evitar selectores excesivamente complexos, etc.

---

## 2. Como o navegador procesa o CSS

Para entender o rendemento, hai que entender que fai o navegador desde que recibe o HTML ata que amosa a páxina. O proceso ten varias fases:

### 2.1 As cinco fases

1. **Parseo do HTML:** o navegador le o HTML e constrúe o **DOM** (a árbore de elementos).
2. **Parseo do CSS:** o navegador le o CSS e constrúe o **CSSOM** (a representación interna dos estilos).
3. **Cálculo de estilos:** para cada elemento do DOM, o navegador calcula os estilos finais, aplicando a cascada, a especificidade e a herdanza.
4. **Layout:** o navegador calcula a **posición e o tamaño** de cada elemento na páxina. Esta fase tamén se chama **reflow**.
5. **Pintado:** o navegador **debuxa** cada elemento na pantalla. Despois vén a fase de **composición**, na que se combinan as capas.

Cada fase é custosa. E o problema é que, se algo cambia nunha fase, **todas as fases posteriores teñen que repetirse**.

### 2.2 Que propiedades provocan que fase

Esta é a información máis importante do capítulo. As propiedades CSS agrúpanse en tres categorías segundo que fase activan cando cambian:

**Propiedades que provocan layout (as máis custosas):**

- `width`, `height`, `min-width`, `max-width`, `min-height`, `max-height`
- `margin`, `padding`, `border-width`
- `top`, `right`, `bottom`, `left`
- `font-size`, `line-height`, `font-family`
- `display`, `position`
- `float`, `clear`
- `overflow`, `scroll`

Cando cambia unha destas, o navegador ten que **recalcular a posición de moitos elementos**.

**Propiedades que provocan só pintado:**

- `background`, `background-color`, `background-image`
- `color`
- `border-color`, `border-style`
- `box-shadow`
- `outline`
- `visibility`
- `opacity` (aínda que hai matices, ver 2.3)

Cando cambia unha destas, o navegador non necesita recalcular posicións, pero si **redibuxar** os elementos.

**Propiedades que só provocan composición (as máis eficientes):**

- `transform`
- `opacity`
- `filter`
- `backdrop-filter` (aínda que pode ser custoso, ver 2.4)
- `will-change`

Cando cambia unha destas, o navegador pode **animar directamente na tarxeta gráfica**, sen recalcular nada.

### 2.3 Un caso práctico

Imaxina que queres animar un elemento que se move 50 píxeles cara a dereita.

**Opción A: animar `left`**

```css
.elemento {
    position: relative;
    left: 0;
    transition: left 0.3s;
}

.elemento:hover {
    left: 50px;
}
```

Esta animación **provoca layout** en cada fotograma. O navegador ten que recalcular a posición do elemento e de todos os que dependan del. **É lento.**

**Opción B: animar `transform`**

```css
.elemento {
    transform: translateX(0);
    transition: transform 0.3s;
}

.elemento:hover {
    transform: translateX(50px);
}
```

Esta animación **só provoca composición**. O navegador move o elemento na tarxeta gráfica sen recalcular nada. **É moito máis rápida.**

**As dúas animacións ven o mesmo.** Pero a segunda é 10-20 veces máis eficiente.

### 2.4 Matices sobre `opacity`

`opacity` xeralmente é unha propiedade de composición (rápida). Pero hai dous casos nos que pode provocar layout ou pintado:

1. **Se o elemento ten fillos que crean novos contextos de apilamento**, o navegador pode ter que recalcular.
2. **Se `opacity` interactúa con outras propiedades** (como `filter` ou `mix-blend-mode`), o custo pode aumentar.

Na maioría dos casos, con todo, `opacity` é eficiente.

### 2.5 Resumo visual

```
┌────────────────────────────────────────────────┐
│                                                │
│  Layout ──→ Pintado ──→ Composición            │
│   ▲          ▲           ▲                     │
│   │          │           │                     │
│  width      color       transform              │
│  height     background  opacity                │
│  margin     box-shadow  filter                 │
│  padding    border-color                       │
│  top/left   outline                            │
│                                                │
│  ─────────────────────────────────────────     │
│  CUSTOSO      MEDIO       EFICIENTE            │
│                                                │
└────────────────────────────────────────────────┘
```

**Regra de ouro:** cando poidas, anima `transform` e `opacity`. Evita animar propiedades que provocan layout.

---

## 3. Boas prácticas de rendemento

Agora que entendes como funciona o navegador, vexamos as prácticas que melloran o rendemento.

### 3.1 Animar `transform` e `opacity`

Xa o vimos. É a práctica máis importante.

```css
/* Ben */
.elemento {
    transition: transform 0.3s;
}

/* Evitar */
.elemento {
    transition: width 0.3s;
}
```

**Excepción:** ás veces hai que animar outras propiedades (por exemplo, unha cor). Nestes casos, non hai alternativa. Pero hai que saber que é máis custoso.

### 3.2 Usar `will-change` con coidado

A propiedade `will-change` **avisa ao navegador** de que un elemento vai cambiar, para que poida preparar optimizacións (por exemplo, crear unha capa na tarxeta gráfica).

```css
.elemento {
    will-change: transform;
}
```

**Cando usar:** antes de animacións complexas ou frecuentes.

**Cando NON usar:**

- Nunca poñelo a `*` ou a moitos elementos. **Cada `will-change` consome memoria.**
- Nunca poñelo permanentemente. Se o elemento só se anima ao pasar o rato, activalo só nese momento.

**Patrón correcto:**

```css
.elemento {
    transition: transform 0.3s;
}

.elemento:hover {
    will-change: transform;
    transform: translateX(50px);
}
```

**Patrón incorrecto:**

```css
/* Mal: will-change sempre activo */
.elemento {
    will-change: transform;
}
```

**Se tes dúbidas, non uses `will-change`.** O navegador xa fai optimizacións automáticas. `will-change` é para casos moi concretos.

### 3.3 Evitar animacións que provocan layout

```css
/* Evitar */
.elemento {
    transition: width 0.3s, height 0.3s, margin 0.3s;
}

/* Preferir */
.elemento {
    transition: transform 0.3s, opacity 0.3s;
}
```

### 3.4 Limitar o número de propiedades animadas

Animar unha propiedade é máis barato ca animar cinco. Se podes acadar o mesmo efecto cunha soa propiedade, mellor.

```css
/* Ben: só transform */
.elemento:hover {
    transform: translateY(-4px) scale(1.02);
}

/* Menos ideal: varias propiedades */
.elemento:hover {
    top: -4px;
    width: calc(100% * 1.02);
    height: calc(100% * 1.02);
}
```

### 3.5 Non abusar dos filtros

`filter` e `backdrop-filter` son **eficientes**, pero non gratuítos. Especialmente `backdrop-filter`, que require procesar o fondo en tempo real.

**Regra:** unha ou dúas capas de filtro por elemento, non cinco.

```css
/* Evitar */
.elemento {
    filter: blur(2px) saturate(1.5) contrast(1.2) brightness(1.1) hue-rotate(30deg);
}

/* Mellor: os filtros xustos */
.elemento {
    filter: blur(2px);
}
```

### 3.6 Evitar sombras grandes ou moi difusas

As sombras con moito `blur` son custosas de pintar. En elementos grandes ou animados, poden afectar ao rendemento.

```css
/* Custoso */
.elemento {
    box-shadow: 0 0 100px 50px rgba(0, 0, 0, 0.5);
}

/* Mellor */
.elemento {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

### 3.7 Usar `content-visibility: auto`

`content-visibility: auto` permite que o navegador **ignore** partes da páxina que non están visibles, o que mellora o rendemento de páxinas longas.

```css
.seccion-inferior {
    content-visibility: auto;
    contain-intrinsic-size: 500px;
}
```

- `content-visibility: auto`: o navegador só procesa a sección cando está a piques de ser visible.
- `contain-intrinsic-size`: un tamaño estimado para evitar saltos.

**Estado en 2026:** Baseline desde 2024. **Recomendado** para páxinas longas con moitas seccións.

### 3.8 Usar `contain`

A propiedade `contain` indica ao navegador que o layout, o pintado ou o tamaño dun elemento **non depende do exterior**, o que permite optimizacións.

```css
.tarxeta {
    contain: layout style;
}
```

Valores:

- `layout`: o layout do elemento non afecta ao exterior.
- `style`: os estilos do elemento non afectan aos fillos.
- `paint`: o pintado do elemento non se filtra ao exterior.
- `size`: o tamaño do elemento non depende dos fillos.
- `content`: combina `layout`, `paint` e `style`.

**Cando usar:** en compoñentes illados (tarxetas, widgets, seccións independentes).

**Coidado:** `contain` pode causar problemas se se usa onde non toca. **Non usar a cegas.**

### 3.9 Usar `content-visibility` en listas longas

Para listas moi longas (centos de elementos), combinar `content-visibility: auto` con `contain-intrinsic-size` pode mellorar moito o rendemento.

```css
.elemento-lista {
    content-visibility: auto;
    contain-intrinsic-size: 80px;
}
```

### 3.10 Simplificar selectores

Canto máis complexo o selector, máis tempo tarda o navegador en emparellalo cos elementos.

```css
/* Custoso */
body > div > main > article > section > p {
    color: #666;
}

/* Ben */
.articulo-texto {
    color: #666;
}
```

**Regra:** canto máis curto o selector, mellor. Usa clases específicas en lugar de cadeas longas de selectores.

### 3.11 Evitar selectores universais en regras grandes

```css
/* Custoso: aplícase a todos os elementos, fillos, etc. */
* > * { }

/* Mellor: sé específico */
.tarxeta > * { }
```

### 3.12 Cargar o CSS de forma eficiente

- **Un só arquivo CSS en produción.** Múltiples arquivos aumentan o número de peticións HTTP.
- **Minificar** (eliminar espazos, comentarios).
- **Comprimir con gzip/brotli** no servidor.
- **Usar `media` queries no `<link>`** para cargar arquivos só cando se necesiten.

```html
<link rel="stylesheet" href="principal.css">
<link rel="stylesheet" href="impresion.css" media="print">
```

### 3.13 Evitar `@import`

`@import` bloquea a carga de CSS. É mellor usar varias etiquetas `<link>`.

```css
/* Evitar */
@import url("outra-folla.css");

/* Mellor: usar <link> no HTML */
```

---

## 4. Boas prácticas de organización

O código que funciona pero non se entende non é bo código. Vexamos como organizar o CSS para que un proxecto medre.

### 4.1 Estrutura por capas

Usar `@layer` (Cap. 23) para organizar o CSS en capas:

```css
@layer reset, base, layout, compoñentes, utilidades;
```

### 4.2 Convención de nomes

Hai varias convencións. A máis coñecida é **BEM** (Block, Element, Modifier):

```css
.tarxeta { }                  /* bloque */
.tarxeta__titulo { }          /* elemento */
.tarxeta--destacada { }       /* modificador */
```

**Vantaxes:**

- Os nomes son predecibles.
- Reducen a necesidade de aniñamento profundo.
- Funcionan ben en equipo.

**Desvantaxe:** os nomes son longos.

**Alternativas:** outros equipos usan **clases utilitarias** (estilo Tailwind) ou **CSS Modules** (propio de React). Non hai unha convención única; o importante é **escolle unha e sé coherente**.

### 4.3 Variables para valores repetidos

Xa o vimos no Cap. 14. **Todo valor que se repita máis de dúas veces debe ser unha variable.**

```css
:root {
    --cor-primaria: #1a5c8a;
    --esp-1: 0.25rem;
    --esp-2: 0.5rem;
    --esp-3: 1rem;
    --radio-md: 8px;
}
```

### 4.4 Unha soa fonte de verdade

Evitar definir a mesma cor, tamaño ou espazado en varios sitios. Se hai que cambiar un valor, que só haxa que cambialo nun sitio.

### 4.5 Non usar `!important`

`!important` rompe a cascada. Se te atopas usando `!important` para gañar unha batalla de especificidade, é sinal de que a estrutura do CSS é mala.

```css
/* Evitar */
.boton {
    background: red !important;
}
```

**Excepcións lexítimas:**

- Estilos de accesibilidade (por exemplo, `prefers-reduced-motion`).
- Estilos que deben gañar sempre por deseño.

### 4.6 Evitar `id` para estilos

Os `id` teñen especificidade moi alta e non se poden reutilizar. **Usa clases.**

```css
/* Evitar */
#boton-principal { }

/* Mellor */
.boton-principal { }
```

**Excepción:** ligazóns internas (`href="#seccion"`), que seguen sendo útiles.

### 4.7 Organizar por compoñentes, non por propiedades

**Mal:** agrupar todo o CSS por tipo de propiedade.

```css
/* Mal: agrupado por propiedade */
.titulo { font-size: 1.5rem; }
.paragrafo { font-size: 1rem; }
.boton { font-size: 1rem; }

.titulo { color: #1a5c8a; }
.paragrafo { color: #666; }
.boton { color: white; }
```

**Ben:** agrupar por compoñente.

```css
/* Ben: agrupado por compoñente */
.titulo {
    font-size: 1.5rem;
    color: #1a5c8a;
}

.paragrafo {
    font-size: 1rem;
    color: #666;
}

.boton {
    font-size: 1rem;
    color: white;
}
```

### 4.8 Comentar o xusto

**Non comentes o obvio.** Comenta o que non é evidente: por que se toma unha decisión, que limita unha regra, etc.

```css
/* Mal: comenta o obvio */
/* Cor vermella */
.boton { color: red; }

/* Ben: comenta o por que */
/* A cor vermella é da guía de estilo da empresa */
.boton { color: #cc0000; }
```

### 4.9 Evitar valores máxicos

**Valores máxicos** son números que aparecen no CSS sen explicación, que non se sabe de onde veñen.

```css
/* Mal: por que 37px? */
.elemento { margin-top: 37px; }

/* Ben: explica a orixe */
.elemento { margin-top: 37px; /* alinea coa cabeceira */ }
```

**Mellor aínda:** converter eses valores en variables.

```css
:root {
    --altura-cabecera: 37px;
}

.elemento { margin-top: var(--altura-cabecera); }
```

### 4.10 Manter a coherencia

Se elixes unha forma de facer algo (por exemplo, usar variables para cores), sé coherente en todo o proxecto. **A coherencia importa máis ca escoller a opción «perfecta».**

### 4.11 Organización de arquivos

Para proxectos medianos ou grandes, organizar o CSS en arquivos:

```
estilos/
├── base/
│   ├── reset.css
│   ├── variables.css
│   └── tipografia.css
├── layout/
│   ├── cabecera.css
│   ├── pe.css
│   └── contido.css
├── compoñentes/
│   ├── boton.css
│   ├── tarxeta.css
│   └── formulario.css
└── utilidades/
    ├── espazados.css
    └── texto.css
```

**Nota:** aínda que o CSS se divida en arquivos en desenvolvemento, en produción convén **combinar nun só arquivo** (con ferramentas de build) para reducir peticións HTTP.

---

## 5. Exemplo mínimo funcional

Vexamos un exemplo de CSS **ben escrito** cunha tarxeta que se anima ao pasar o rato, aplicando as boas prácticas deste capítulo.

**Arquivo HTML:**

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rendemento e boas prácticas</title>
    <link rel="stylesheet" href="estilos/boas-practicas.css">
</head>
<body>
    <main class="contido">
        <h1>Tarxetas con animación optimizada</h1>

        <div class="tarxetas">
            <article class="tarxeta">
                <h2>Tarxeta 1</h2>
                <p>Pasa o rato por riba para ver a animación.</p>
            </article>
            <article class="tarxeta">
                <h2>Tarxeta 2</h2>
                <p>Usa transform e opacity, non width nin top.</p>
            </article>
            <article class="tarxeta">
                <h2>Tarxeta 3</h2>
                <p>Rápida e eficiente.</p>
            </article>
        </div>
    </main>
</body>
</html>
```

**Arquivo CSS:**

```css
/* ==============================
   Capas (organización)
   ============================== */
@layer reset, base, compoñentes;

/* ==============================
   Reset
   ============================== */
@layer reset {
    *, *::before, *::after {
        box-sizing: border-box;
    }

    * {
        margin: 0;
        padding: 0;
    }
}

/* ==============================
   Variables
   ============================== */
@layer base {
    :root {
        --cor-primaria: #1a5c8a;
        --cor-texto: #333;
        --cor-texto-suave: #666;
        --cor-fondo: #fafafa;
        --cor-bordo: #e5e5e5;

        --esp-2: 0.5rem;
        --esp-3: 1rem;
        --esp-4: 1.5rem;
        --esp-5: 2rem;

        --radio-md: 8px;
        --sombra-suave: 0 1px 2px rgba(0, 0, 0, 0.04);
        --sombra-forte: 0 12px 24px rgba(0, 0, 0, 0.08);

        --transicion-rapida: 0.2s ease-out;
    }

    body {
        font-family: system-ui, sans-serif;
        line-height: 1.6;
        background: var(--cor-fondo);
        color: var(--cor-texto);
        padding: var(--esp-5) var(--esp-3);
    }

    .contido {
        max-width: 900px;
        margin: 0 auto;
    }

    h1 {
        font-size: clamp(1.5rem, 1rem + 2vw, 2rem);
        color: var(--cor-primaria);
        margin-bottom: var(--esp-5);
    }
}

/* ==============================
   Compoñentes
   ============================== */
@layer compoñentes {
    .tarxetas {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
        gap: var(--esp-4);
    }

    .tarxeta {
        background: white;
        padding: var(--esp-4);
        border: 1px solid var(--cor-bordo);
        border-radius: var(--radio-md);
        box-shadow: var(--sombra-suave);

        /* Isolamos o compoñente para optimizacións */
        contain: layout style;

        /* Transición SÓ con propiedades eficientes */
        transition:
            transform var(--transicion-rapida),
            box-shadow var(--transicion-rapida);

        /* Será un "elemento raíz" do seu propio contexto */
        will-change: auto;
    }

    .tarxeta:hover {
        /* Activamos will-change só cando se vai animar */
        will-change: transform;

        /* Só transform e box-shadow: nada de layout */
        transform: translateY(-4px);
        box-shadow: var(--sombra-forte);
    }

    .tarxeta h2 {
        font-size: 1.125rem;
        color: var(--cor-primaria);
        margin-bottom: var(--esp-2);
    }

    .tarxeta p {
        color: var(--cor-texto-suave);
        font-size: 0.95rem;
    }
}

/* ==============================
   Accesibilidade
   ============================== */
@media (prefers-reduced-motion: reduce) {
    .tarxeta {
        transition: none;
    }

    .tarxeta:hover {
        transform: none;
    }
}
```

**Boas prácticas aplicadas neste exemplo:**

1. **Capas `@layer`** para organizar o CSS.
2. **Variables CSS** para todos os valores repetidos.
3. **Aniñado** dentro de cada compoñente.
4. **Animación só con `transform` e `box-shadow`**, que son as propiedades eficientes.
5. **`contain: layout style`** para indicar ao navegador que o compoñente está illado.
6. **`will-change`** activado só no `:hover`, non permanentemente.
7. **Accesibilidade:** respectar `prefers-reduced-motion`.

---

## 6. Casos habituais na práctica

### 6.1 Animación de botón optimizada

```css
.boton {
    transition: transform 0.15s, box-shadow 0.15s;
}

.boton:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.boton:active {
    transform: translateY(0);
}
```

### 6.2 Menú que se abre sen layout

```css
.menu {
    opacity: 0;
    transform: translateY(-10px);
    pointer-events: none;
    transition: opacity 0.2s, transform 0.2s;
}

.menu.aberto {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
}
```

**Nota:** `pointer-events: none` evita que o menú pechado reciba clics. **Non usar `display: none`**, que provoca layout.

### 6.3 Lista longa con `content-visibility`

```css
.lista li {
    content-visibility: auto;
    contain-intrinsic-size: 80px;
}
```

### 6.4 Compoñentes illados con `contain`

```css
.widget {
    contain: layout style paint;
}
```

### 6.5 Carga de CSS optimizada

```html
<!-- Un só arquivo principal -->
<link rel="stylesheet" href="principal.min.css">

<!-- Arquivo só para impresión -->
<link rel="stylesheet" href="impresion.css" media="print">
```

---

## 7. Erros frecuentes

### 7.1 Animar `width`, `height`, `top` ou `left`

Xa o vimos. O erro máis común.

```css
/* Evitar */
.elemento {
    transition: width 0.3s;
}

/* Mellor */
.elemento {
    transition: transform 0.3s;
}
```

### 7.2 Usar `will-change` permanentemente

```css
/* Mal: consume memoria sempre */
.elemento {
    will-change: transform;
}
```

**Solución:** activar `will-change` só cando o elemento vai animarse.

### 7.3 Usar `* { transition: all 0.3s; }`

```css
/* Moi mal: anima TODO, con custo enorme */
* {
    transition: all 0.3s;
}
```

**Solución:** animar só o necesario, en elementos concretos.

### 7.4 Selectores moi complexos

```css
/* Custoso e difícil de manter */
body > div > main > article:nth-child(2) > section > p:first-child { }
```

**Solución:** usar clases específicas.

### 7.5 Abusar de `!important`

```css
/* Mal */
.boton {
    background: red !important;
}
```

Xa o vimos. Usa `@layer` ou organiza mellor o CSS.

### 7.6 Non usar variables

```css
/* Mal: valores espallados */
h1 { color: #1a5c8a; }
h2 { color: #1a5c8a; }
.boton { background: #1a5c8a; }
```

**Solución:** usar variables.

### 7.7 Arquivos CSS excesivamente longos

Un arquivo de 5000 liñas sen estrutura é imposible de manter.

**Solución:** dividir en arquivos, ou usar `@layer` para organizar.

### 7.8 Non comprobar o rendemento

**Solución:** usar DevTools (panel de rendemento) para identificar problemas.

### 7.9 Abusar de `content-visibility`

`content-visibility: auto` é útil, pero se se aplica a demasiados elementos pequenos, pode **empeorar** o rendemento en lugar de melloralo.

**Solución:** úsao en seccións grandes ou listas longas, non en cada elemento.

### 7.10 Ignorar `prefers-reduced-motion`

Xa o vimos. É unha cuestión de accesibilidade e de respecto.

---

## 8. Compatibilidade (2026)

| Característica                         | Estado               |
| -------------------------------------- | -------------------- |
| `transform`, `opacity` para animacións | Universal            |
| `will-change`                          | Universal            |
| `contain`                              | Baseline desde 2022  |
| `content-visibility`                   | Baseline desde 2024  |
| `@layer`                               | Baseline desde 2022  |
| Variables CSS                          | Universal desde 2017 |

Todas estas técnicas están soportadas en navegadores modernos.

---

## 9. Ferramentas útiles

- **Chrome DevTools — Performance panel:** para analizar o rendemento en detalle.
- **Chrome DevTools — Layers panel:** para ver as capas creadas polo navegador.
- **Lighthouse:** para auditar o rendemento global.
- **WebPageTest:** para medir o rendemento en dispositivos reais.
- **CSS Stats:** para analizar un arquivo CSS (número de regras, especificidade, etc.).

---

## 10. Exercicios

### Exercicio 1: Optimizar unha animación

Converte esta animación a unha versión optimizada:

```css
.elemento {
    width: 100px;
    transition: width 0.3s;
}

.elemento:hover {
    width: 200px;
}
```

<details>
<summary><b>Amosar a solución</b></summary>

```css
.elemento {
    width: 100px;
    transition: transform 0.3s;
    transform-origin: left;
}

.elemento:hover {
    transform: scaleX(2);
}
```

A animación é equivalente visualmente pero **moito máis eficiente**.

</details>


### Exercicio 2: `will-change` correcto

Reescribe este código para que `will-change` só se active cando o elemento vai animarse:

```css
.elemento {
    will-change: transform;
    transition: transform 0.3s;
}

.elemento:hover {
    transform: translateY(-4px);
}
```

<details>
<summary><b>Amosar a solución</b></summary>

```css
.elemento {
    transition: transform 0.3s;
}

.elemento:hover {
    will-change: transform;
    transform: translateY(-4px);
}
```

</details>

### Exercicio 3: Organizar con `@layer`

Organiza este CSS en capas: `reset`, `base`, `compoñentes`:

```css
* { margin: 0; }
body { font-family: sans-serif; }
.boton { background: #1a5c8a; }
h1 { color: #1a5c8a; }
```

<details>
<summary><b>Amosar a solución</b></summary>

```css
@layer reset, base, compoñentes;

@layer reset {
    * { margin: 0; }
}

@layer base {
    body { font-family: sans-serif; }
    h1 { color: #1a5c8a; }
}

@layer compoñentes {
    .boton { background: #1a5c8a; }
}
```

</details>


### Exercicio 4: Variables

Extrae os valores repetidos deste CSS a variables:

```css
.boton {
    background: #1a5c8a;
    padding: 1rem;
    border-radius: 8px;
}

.tarxeta {
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #1a5c8a;
}
```

<details>
<summary><b>Amosar a solución</b></summary>

```css
:root {
    --cor-primaria: #1a5c8a;
    --esp-3: 1rem;
    --radio-md: 8px;
}

.boton {
    background: var(--cor-primaria);
    padding: var(--esp-3);
    border-radius: var(--radio-md);
}

.tarxeta {
    padding: var(--esp-3);
    border-radius: var(--radio-md);
    border: 1px solid var(--cor-primaria);
}
```

</details>


### Exercicio 5: Detectar o erro

```css
* {
    transition: all 0.3s;
}

.elemento {
    will-change: transform, opacity, width, height, top, left;
}
```

Atopa os erros.

<details>
<summary><b>Amosar a solución</b></summary>

1. `* { transition: all 0.3s; }` anima **todos** os elementos, con custo enorme. Hai que ser específico.
2. `will-change: transform, opacity, width, height, top, left;` indica demasiadas propiedades. **Só as que realmente se animan**, e só cando se van animar.
3. Ademais, `width`, `height`, `top` e `left` provocan layout, polo que non deberían animarse.

</details>


---

## 11. Para profundar

- **MDN Web Docs:** [CSS performance optimization](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/CSS) — guía de rendemento.
- **MDN Web Docs:** [will-change](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change) — referencia.
- **MDN Web Docs:** [contain](https://developer.mozilla.org/en-US/docs/Web/CSS/contain) — referencia.
- **MDN Web Docs:** [content-visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility) — referencia.
- **web.dev:** [Stick to compositor-only properties](https://web.dev/articles/stick-to-compositor-only-properties-and-manage-layer-count) — artigo clave de Google.
- **web.dev:** [Content-visibility](https://web.dev/articles/content-visibility) — artigo de Google.
- **CSS-Tricks:** [CSS performance](https://css-tricks.com/tag/performance/) — colección de artigos.
- **Harry Roberts:** [CSS Guidelines](https://cssguidelin.es/) — guía de estilo moi recomendada.

---

## 12. Referencias cruzadas

- **Capítulo 14: Propiedades personalizadas** — variables para valores repetidos.
- **Capítulo 15: Aniñamento nativo** — organización do CSS por compoñente.
- **Capítulo 18: Transicións e animacións** — que propiedades animar e cales non.
- **Capítulo 20: Transformacións 2D e 3D** — as transformacións son as propiedades máis eficientes para animar.
- **Capítulo 21: Filtros, blend modes e masking** — os filtros poden ser custosos.
- **Capítulo 22: Scroll-driven animations** — implicacións de rendemento.
- **Capítulo 23: `@layer`, `@scope`, `@supports`** — organización avanzada do CSS.
- **Capítulo 26: Accesibilidade e CSS** — o rendemento tamén é accesibilidade.

---

**Data de creación:** 2026-09-17  
**Última revisión:** 2026-09-17  
**Estado:** Borrador para validación
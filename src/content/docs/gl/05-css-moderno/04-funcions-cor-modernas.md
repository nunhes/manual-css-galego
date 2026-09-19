---
title: "Funcións de cor modernas"
description: "Uso de OKLCH, LAB, LCH e funcións CSS para mesturar cores, calcular contrastes e crear paletas coherentes."
bloque: 5
capitulo: 17
nivel: avanzado
ultima_revision: "2026-09-17"
estado: "borrador_para_validacion"
compatibilidade: "baseline_2023"
palabras_chave:
  - OKLCH
  - LAB
  - LCH
  - color_mix
  - contrast_color
  - cor_relativa
  - espazos_cor
  - paletas
  - sistema_deseño
  - percepcion_cor
---

<!-- # Capítulo 17: Funcións de cor modernas -->

> CSS moderno incorporou **espazos de cor perceptualmente uniformes** (OKLCH, LAB, LCH) e **funcións de manipulación de cor** (`color-mix()`, `contrast-color()`, sintaxe de cor relativa) que cambian radicalmente a forma de traballar coas cores. Xa non hai que calcular variacións a man nin usar ferramentas externas: o propio CSS pode mesturar cores, calcular contrastes, e xerar paletas coherentes. Este capítulo explica estas ferramentas, cando usalas, e como integrar nun sistema de deseño con variables (Cap. 14).

---

## 1. Introdución: por que as cores sempre foron un problema en CSS

Durante anos, traballar coas cores en CSS foi incómodo. Había dúas razóns principais:

**1. Os formatos tradicionais (`hex`, `rgb`, `hsl`) non son intuitivos para crear variacións.** Se tes un azul `#1a5c8a` e queres un azul un 20% máis escuro, tes que abrir unha ferramenta externa, calcular o novo valor, e copialo. Non hai forma de dicir «escuréceme esta cor» directamente en CSS.

**2. As cores non son perceptualmente uniformes.** En HSL, dous cores coa mesma luminosidade (`50%`) poden verse moi distintas en brillo. Un amarelo puro `hsl(60, 100%, 50%)` parece moito máis brillante que un azul puro `hsl(240, 100%, 50%)`, aínda que os dous teñan a mesma `lightness`. Isto fai moi difícil crear paletas visualmente coherentes.

CSS moderno resolveu estes dous problemas:

- **Espazos de cor perceptualmente uniformes** (OKLCH, LAB, LCH) onde a mesma luminosidade **vese** igual de brillante en calquera ton.
- **Funcións de manipulación** (`color-mix()`, `contrast-color()`, cor relativa) que permiten mesturar, calcular contrastes, e derivar cores sen saír de CSS.

Este capítulo céntrase nestas ferramentas. Non é un capítulo de teoría da cor, senón de **ferramentas prácticas** que podes empezar a usar hoxe.

> 💡 **Para pensar:** as cores en CSS moderno van moito máis alá de escribir `#1a5c8a`. Podes escribir «mestura ao 70% o meu azul principal con branco», «dame a cor con maior contraste respecto a este fondo», ou «auméntalle a luminosidade un 10% a esta variable». Isto é o que cambia coas funcións modernas.

---

## 2. Repaso: os formatos de cor tradicionais

Antes de entrar nas novidades, un repaso rápido dos formatos que xa vimos no Cap. 4, para ter o contexto:

| Formato            | Exemplo              | Descrición                           |
| ------------------ | -------------------- | ------------------------------------ |
| Nome               | `red`, `blue`        | 140 nomes predefinidos.              |
| Hex                | `#1a5c8a`, `#333`    | Seis (ou tres) díxitos hexadecimais. |
| `rgb()` / `rgba()` | `rgb(26, 92, 138)`   | Vermello, verde, azul.               |
| `hsl()` / `hsla()` | `hsl(205, 68%, 32%)` | Ton, saturación, luminosidade.       |

Estes formatos seguen sendo válidos e funcionan perfectamente. **Non hai que abandonarlos.** Pero para crear variacións e sistemas de deseño, as funcións modernas son moito mellores.

---

## 3. Espazos de cor perceptualmente uniformes

### 3.1 O problema de HSL

En HSL, o terceiro valor (`lightness`) **non coincide coa percepción de brillo**. Isto vese claramente comparando dúas cores coa mesma luminosidade:

```css
.amarelo { color: hsl(60, 100%, 50%); }   /* amarelo puro */
.azul    { color: hsl(240, 100%, 50%); }  /* azul puro */
```

Os dous teñen `50%` de luminosidade, pero o amarelo parece **moito** máis brillante. Se queres dúas cores coa mesma percepción de brillo, HSL non che serve.

### 3.2 OKLCH: o espazo de cor recomendado

**OKLCH** é un espazo de cor deseñado para ser **perceptualmente uniforme**: dous cores coa mesma `L` (luminosidade) **parecen** igual de brillantes, independentemente do seu ton.

**Sintaxe:**

```css
color: oklch(L C H);
/* ou */
color: oklch(L C H / alpha);
```

- **L (Lightness):** luminosidade percibida. Pode ser un número entre 0 e 1, ou unha porcentaxe entre 0% e 100%.
- **C (Chroma):** saturación percibida. Número pequeno, xeralmente entre 0 e 0.4.
- **H (Hue):** ton, un ángulo entre 0 e 360 graos.

**Exemplos:**

```css
.azul-escuro  { color: oklch(45% 0.12 250); }
.azul-medio   { color: oklch(60% 0.15 250); }
.azul-claro   { color: oklch(75% 0.10 250); }
.azul-moi-claro { color: oklch(92% 0.04 250); }
```

Todos comparten o mesmo ton (`250`) e van aumentando a luminosidade. Visualmente, forman unha progresión moi natural.

**Comparación con HSL:**

```css
/* HSL: estes dous parecen moi distintos de brillo */
.a { color: hsl(60, 100%, 60%); }   /* amarelo claro */
.b { color: hsl(240, 100%, 60%); }  /* azul claro */

/* OKLCH: estes dous parecen igual de brillantes */
.a { color: oklch(70% 0.15 90); }   /* amarelo claro */
.b { color: oklch(70% 0.15 250); }  /* azul claro */
```

### 3.3 LAB e LCH

OKLCH é en realidade unha **variante** de LCH. Os espazos LAB e LCH son máis antigos e tamén perceptualmente uniformes, pero OKLCH ten vantaxes prácticas: reparte mellor os tons, evita problemas con algúns valores extremos, e a súa sintaxe é máis consistente.

**LAB:**

```css
color: lab(50% 20 -30);
/* L: luminosidade
   a: eixe verde-vermello
   b: eixe azul-amarelo */
```

**LCH:**

```css
color: lch(50% 35 250);
/* L: luminosidade
   C: croma
   H: ton */
```

**Comparación:**

| Espazo | Estado              | Recomendación                         |
| ------ | ------------------- | ------------------------------------- |
| LAB    | Baseline            | Úsase pouco directamente.             |
| LCH    | Baseline            | Interesante, pero OKLCH é mellor.     |
| OKLCH  | Baseline desde 2023 | **Recomendado para proxectos novos.** |

**Por que OKLCH e non LCH:** OKLCH é unha mellora de LCH que corrixe certos problemas (por exemplo, valores de croma moi altos nalgúns tons). A sintaxe é case idéntica. **Para proxectos novos, escolle OKLCH.**

### 3.4 A función `color()`

A función `color()` permite especificar unha cor nun espazo de cor **concreto**, con control total sobre a profundidade de bits e o espazo:

```css
color: color(display-p3 1 0.5 0);
color: color(srgb 0.1 0.5 0.8);
color: color(rec2020 0.5 0.2 0.3);
```

**Cando se usa:** cando queres traballar con espazos de cor **fóra de sRGB** (como Display P3, que ofrecen os monitores modernos de Apple), ou cando necesitas control preciso do espazo.

**Na práctica diaria, úsase pouco.** É máis importante entender `oklch()`.

### 3.5 Que formato escoller

**Guía rápida:**

- **Prototipos rápidos:** `hex` ou nomes de cores.
- **Copiar dunha guía de estilo:** `hex`.
- **Crear variacións dunha cor:** `oklch()`.
- **Cores con transparencia:** `rgb()` con alpha, ou calquera formato moderno con `/ alpha`.
- **Espazos de cor fóra de sRGB:** `color()`.

**Recomendación xeral:** usa `oklch()` para o sistema de deseño, e `hex` ou nomes cando copies dunha guía externa.

---

## 4. `color-mix()`: mesturar cores

### 4.1 Que fai

`color-mix()` **mestura dúas cores** nun espazo de cor dado. É como unha mestura de pintura, pero feita con código.

**Sintaxe:**

```css
color-mix(in <espazo-de-cor>, <cor1> <porcentaxe1>, <cor2> <porcentaxe2>);
```

**Exemplo:**

```css
.cor-mesturada {
    color: color-mix(in oklch, #1a5c8a 70%, white);
    /* 70% de azul + 30% de branco */
}
```

**Porcentaxes:**

- Se só indicas unha porcentaxe, a outra é o complementario (100% − 70% = 30%).
- Se non indicas ningunha, é 50% cada unha.

```css
color-mix(in oklch, red, blue);         /* 50% vermello + 50% azul */
color-mix(in oklch, red 30%, blue);     /* 30% vermello + 70% azul */
color-mix(in oklch, red 20%, blue 40%); /* normalizado a 33% / 67% */
```

### 4.2 Espazos de cor para a mestura

O primeiro argumento indica **en que espazo de cor se fai a mestura**. A elección afecta o resultado visual.

```css
color-mix(in srgb, red, blue);      /* mestura en sRGB */
color-mix(in oklch, red, blue);     /* mestura en OKLCH */
color-mix(in hsl, red, blue);       /* mestura en HSL */
```

**Para cores de marca, usa `in oklch` ou `in oklab`.** Dan resultados máis naturais, especialmente cando se mesturan cores moi distintas.

**Exemplo:**

```css
/* Mestura dun azul escuro e un amarelo brillante */

/* en sRGB: dá un verde oliva apagado */
color-mix(in srgb, #1a5c8a, #fef9c3);

/* en OKLCH: dá un verde-amarelo máis natural */
color-mix(in oklch, #1a5c8a, #fef9c3);
```

Visualmente, a versión OKLCH é máis agradable.

### 4.3 Usos prácticos

**Variacións dunha cor base:**

```css
:root {
    --cor-primaria: #1a5c8a;
    --cor-primaria-clara: color-mix(in oklch, var(--cor-primaria) 70%, white);
    --cor-primaria-escura: color-mix(in oklch, var(--cor-primaria) 70%, black);
    --cor-primaria-suave: color-mix(in oklch, var(--cor-primaria) 20%, white);
}
```

Con isto, tes 4 variacións dunha cor **sen saír de CSS**. Se cambias `--cor-primaria`, todo o sistema actualízase.

**Estados de botón:**

```css
.boton {
    --cor-boton: #1a5c8a;

    background: var(--cor-boton);

    &:hover {
        background: color-mix(in oklch, var(--cor-boton) 85%, black);
    }

    &:active {
        background: color-mix(in oklch, var(--cor-boton) 75%, black);
    }
}
```

**Fondos suaves:**

```css
.alerta-info {
    background: color-mix(in oklch, #0d3a5c 10%, white);
    color: #0d3a5c;
}

.alerta-erro {
    background: color-mix(in oklch, #cc0000 10%, white);
    color: #cc0000;
}
```

**Sombras con cor:**

```css
.tarxeta {
    box-shadow: 0 4px 16px color-mix(in oklch, #1a5c8a 30%, transparent);
}
```

A sombra ten a cor da marca pero transparente. Moito máis elegante que unha sombra gris xenérica.

### 4.4 Compatibilidade

`color-mix()` está en Baseline desde 2023. Soporte universal en navegadores modernos.

---

## 5. `contrast-color()`: cor automática con contraste

### 5.1 Que fai

`contrast-color()` recibe unha cor e devolve **outra cor que ten o máximo contraste** con ela (normalmente negro ou branco).

**Sintaxe:**

```css
color: contrast-color(<cor-de-fondo>);
```

**Exemplo:**

```css
.boton {
    background: #1a5c8a;
    color: contrast-color(#1a5c8a);
    /* o navegador escolle entre negro ou branco, o que contraste mellor */
}
```

Se o fondo é azul escuro, `contrast-color()` devolve branco. Se o fondo é amarelo claro, devolve negro.

### 5.2 Casos de uso

**Botóns con cor dinámica:**

```css
.boton {
    --cor-boton: #1a5c8a;

    background: var(--cor-boton);
    color: contrast-color(var(--cor-boton));
}
```

Se cambias `--cor-boton`, o texto adáptase automaticamente. **Isto garante contraste mínimo sen cálculos manuais.**

**Sistemas de etiquetas:**

```css
.etiqueta {
    background: var(--cor-etiqueta);
    color: contrast-color(var(--cor-etiqueta));
}
```

**Xeración dinámica de cores (con JavaScript):**

Se xeras cores dinamicamente (por exemplo, para gráficos), `contrast-color()` garante que o texto sempre se lea.

### 5.3 Estado en 2026

`contrast-color()` é unha característica **moi recente** (Baseline 2026). **Comproba o estado actual en [web.dev/baseline](https://web.dev/baseline) antes de usala en produción.** Se necesitas compatibilidade con navegadores máis antigos, considera unha alternativa con JavaScript.

---

## 6. Sintaxe de cor relativa

### 6.1 Que é

**Sintaxe de cor relativa** permite **modificar unha cor existente** aplicando funcións ás súas canles individuais. É unha forma moi potente de derivar cores.

**Sintaxe xeral:**

```css
color: rgb(from <cor-orixinal> r g b / alpha);
color: hsl(from <cor-orixinal> h s l / alpha);
color: oklch(from <cor-orixinal> l c h / alpha);
```

As palabras `r`, `g`, `b`, `h`, `s`, `l`, `alpha` (ou os nomes correspondentes ao espazo) son **variables** que representan os valores da cor orixinal.

### 6.2 Exemplos

**Aclarar unha cor:**

```css
.cor {
    color: oklch(from #1a5c8a l c h / 1);
    /* mesma cor */
}

.cor-clara {
    color: oklch(from #1a5c8a calc(l + 0.2) c h);
    /* mesma cor, pero 20% máis clara */
}
```

**Cambiar o ton:**

```css
.cor-cambiada {
    color: oklch(from #1a5c8a l c 30);
    /* mesma luminosidade e saturación, pero ton 30 (laranxa) */
}
```

**Reducir a saturación:**

```css
.cor-gris {
    color: oklch(from #1a5c8a l calc(c * 0.3) h);
    /* mesma cor, pero máis gris */
}
```

**Con transparencia:**

```css
.cor-transparente {
    color: oklch(from #1a5c8a l c h / 0.5);
    /* mesma cor ao 50% de opacidade */
}
```

### 6.3 Casos prácticos

**Variacións dunha cor:**

```css
:root {
    --cor-base: #1a5c8a;
}

.ton-1 { background: oklch(from var(--cor-base) calc(l + 0.2) c h); }
.ton-2 { background: oklch(from var(--cor-base) calc(l + 0.1) c h); }
.ton-3 { background: oklch(from var(--cor-base) l c h); }
.ton-4 { background: oklch(from var(--cor-base) calc(l - 0.1) c h); }
.ton-5 { background: oklch(from var(--cor-base) calc(l - 0.2) c h); }
```

Creas unha **escala de tons** dunha soa cor, sen definir 5 variables distintas.

**Estados de botón:**

```css
.boton {
    --cor-boton: #1a5c8a;
    background: var(--cor-boton);
}

.boton:hover {
    background: oklch(from var(--cor-boton) calc(l - 0.1) c h);
}

.boton:active {
    background: oklch(from var(--cor-boton) calc(l - 0.2) c h);
}
```

**Versión desaturada para estados desactivados:**

```css
.boton:disabled {
    background: oklch(from var(--cor-boton) l calc(c * 0.3) h);
    /* mesma cor, moi desaturada */
    opacity: 0.6;
}
```

### 6.4 Compatibilidade

A sintaxe de cor relativa está en Baseline desde 2024. Pódese usar con seguridade.

---

## 7. Exemplo mínimo funcional

Vexamos un sistema de botóns completo que usa todas estas ferramentas xuntas.

**Arquivo HTML:**

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cores modernas</title>
    <link rel="stylesheet" href="estilos/cores.css">
</head>
<body>
    <main class="contido">
        <h1>Sistema de botóns</h1>

        <section class="demo">
            <h2>Variantes</h2>
            <button class="boton boton-primario">Primario</button>
            <button class="boton boton-exito">Éxito</button>
            <button class="boton boton-erro">Erro</button>
            <button class="boton boton-aviso">Aviso</button>
        </section>

        <section class="demo">
            <h2>Estados</h2>
            <button class="boton boton-primario">Normal</button>
            <button class="boton boton-primario" disabled>Desactivado</button>
            <button class="boton boton-primario grande">Grande</button>
        </section>

        <section class="demo">
            <h2>Alertas</h2>
            <div class="alerta alerta-info">Información</div>
            <div class="alerta alerta-exito">Operación realizada con éxito</div>
            <div class="alerta alerta-erro">Produciuse un erro</div>
        </section>
    </main>
</body>
</html>
```

**Arquivo CSS:**

```css
/* ==============================
   Variables de cor
   ============================== */
:root {
    /* Cores base en OKLCH */
    --cor-primaria: oklch(50% 0.13 250);      /* azul */
    --cor-exito: oklch(55% 0.15 145);         /* verde */
    --cor-erro: oklch(55% 0.20 25);           /* vermello */
    --cor-aviso: oklch(70% 0.15 75);          /* amarelo laranxa */

    /* Derivadas con color-mix() */
    --cor-fondo: oklch(98% 0.005 250);
    --cor-texto: oklch(25% 0.01 250);
    --cor-texto-suave: oklch(50% 0.01 250);
    --cor-bordo: oklch(90% 0.01 250);

    /* Espazados */
    --esp-1: 0.25rem;
    --esp-2: 0.5rem;
    --esp-3: 1rem;
    --esp-4: 1.5rem;
    --esp-5: 2rem;

    --radio-sm: 4px;
    --radio-md: 8px;
    --radio-lg: 12px;
}

/* ==============================
   Reset
   ============================== */
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
    background: var(--cor-fondo);
    color: var(--cor-texto);
}

.contido {
    max-width: 800px;
    margin: 0 auto;
    padding: var(--esp-5) var(--esp-3);

    h1 {
        font-size: clamp(1.5rem, 1rem + 2vw, 2rem);
        color: var(--cor-primaria);
        margin-bottom: var(--esp-5);
    }

    h2 {
        font-size: 1.125rem;
        color: var(--cor-texto-suave);
        margin-bottom: var(--esp-3);
        font-weight: 500;
    }
}

.demo {
    margin-bottom: var(--esp-5);
    padding: var(--esp-4);
    background: white;
    border-radius: var(--radio-lg);
    border: 1px solid var(--cor-bordo);
}

/* ==============================
   Botóns
   ============================== */
.boton {
    --cor-boton: var(--cor-primaria);

    background: var(--cor-boton);
    color: contrast-color(var(--cor-boton));
    padding: var(--esp-2) var(--esp-4);
    border: none;
    border-radius: var(--radio-md);
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    margin-right: var(--esp-2);
    margin-bottom: var(--esp-2);
    transition: background 0.15s, transform 0.1s;

    /* Estados derivados con sintaxe de cor relativa */
    &:hover {
        background: oklch(from var(--cor-boton) calc(l - 0.08) c h);
    }

    &:active {
        transform: scale(0.97);
        background: oklch(from var(--cor-boton) calc(l - 0.15) c h);
    }

    &:focus-visible {
        outline: 2px solid var(--cor-boton);
        outline-offset: 2px;
    }

    &:disabled {
        background: oklch(from var(--cor-boton) l calc(c * 0.3) h);
        cursor: not-allowed;
        opacity: 0.5;
    }

    /* Variantes */
    &.boton-primario { --cor-boton: var(--cor-primaria); }
    &.boton-exito    { --cor-boton: var(--cor-exito); }
    &.boton-erro     { --cor-boton: var(--cor-erro); }
    &.boton-aviso    { --cor-boton: var(--cor-aviso); }

    /* Tamaño */
    &.grande {
        padding: var(--esp-3) var(--esp-5);
        font-size: 1.125rem;
    }
}

/* ==============================
   Alertas
   ============================== */
.alerta {
    --cor-alerta: var(--cor-primaria);

    padding: var(--esp-3) var(--esp-4);
    border-radius: var(--radio-md);
    border-left: 4px solid var(--cor-alerta);
    background: color-mix(in oklch, var(--cor-alerta) 12%, white);
    color: oklch(from var(--cor-alerta) calc(l - 0.2) c h);
    margin-bottom: var(--esp-3);

    &.alerta-info  { --cor-alerta: var(--cor-primaria); }
    &.alerta-exito { --cor-alerta: var(--cor-exito); }
    &.alerta-erro  { --cor-alerta: var(--cor-erro); }
}
```

**Que está a pasar aquí:**

1. **Todas as cores base están en OKLCH.** Isto garante coherencia perceptiva entre elas.
2. **`contrast-color()`** escolle automaticamente a cor do texto (negro ou branco) para o botón.
3. **`oklch(from ...)`** deriva os estados (hover, active, disabled) directamente da cor base, sen definir variables adicionais.
4. **`color-mix()`** crea o fondo suave das alertas mesturando a cor co branco.
5. **Cada variante de botón só redefine `--cor-boton`.** Todos os estados e derivacións aplícanse automaticamente.

**O resultado é un sistema moi flexible:** se cambias `--cor-primaria`, todos os botóns primarios (con todos os seus estados) actualízanse. Se engades unha nova variante, só tes que definir unha variable.

---

## 8. Casos habituais na práctica

### 8.1 Sistema de cores con variables e OKLCH

```css
:root {
    /* Cores base */
    --cor-marca: oklch(50% 0.13 250);

    /* Escala de tons derivada */
    --cor-50:  oklch(from var(--cor-marca) 97% calc(c * 0.15) h);
    --cor-100: oklch(from var(--cor-marca) 92% calc(c * 0.25) h);
    --cor-200: oklch(from var(--cor-marca) 85% calc(c * 0.4) h);
    --cor-300: oklch(from var(--cor-marca) 75% calc(c * 0.6) h);
    --cor-400: oklch(from var(--cor-marca) 65% calc(c * 0.8) h);
    --cor-500: var(--cor-marca);
    --cor-600: oklch(from var(--cor-marca) 42% c h);
    --cor-700: oklch(from var(--cor-marca) 35% c h);
    --cor-800: oklch(from var(--cor-marca) 28% c h);
    --cor-900: oklch(from var(--cor-marca) 20% c h);
}
```

Esta é a forma moderna de crear unha **escala de tons tipo Tailwind**, pero usando só CSS.

### 8.2 Botóns con estados coherentes

Xa o vimos. O patrón é: definir unha variable de cor base e derivar todo o demais con `oklch(from ...)`.

### 8.3 Alertas con cores suaves

```css
.alerta {
    background: color-mix(in oklch, var(--cor-alerta) 12%, white);
    border-left: 4px solid var(--cor-alerta);
    color: oklch(from var(--cor-alerta) calc(l - 0.25) c h);
}
```

As cores do texto e do fondo son derivadas da cor da alerta. Cando cambias a cor, todo se adapta.

### 8.4 Sombras con cor

```css
.tarxeta {
    box-shadow:
        0 1px 2px color-mix(in oklch, var(--cor-primaria) 15%, transparent),
        0 4px 16px color-mix(in oklch, var(--cor-primaria) 10%, transparent);
}
```

Sombras con múltiples capas e cor da marca. Moito máis elegante que sombras grises.

### 8.5 Fondos degradados coherentes

```css
.hero {
    background: linear-gradient(
        135deg,
        var(--cor-primaria),
        oklch(from var(--cor-primaria) calc(l - 0.2) calc(c + 0.05) h)
    );
}
```

Degradado entre a cor base e unha variante máis escura e saturada.

### 8.6 Modo escuro con derivacións

```css
:root {
    --cor-primaria: oklch(50% 0.13 250);
    --cor-fondo: white;
    --cor-texto: oklch(20% 0 0);
}

@media (prefers-color-scheme: dark) {
    :root {
        --cor-primaria: oklch(70% 0.10 250);   /* máis clara para fondo escuro */
        --cor-fondo: oklch(15% 0.01 250);
        --cor-texto: oklch(92% 0.005 250);
    }
}

body {
    background: var(--cor-fondo);
    color: var(--cor-texto);
}
```

Só redefinindo as variables base, todo o sitio cambia a modo escuro.

---

## 9. Erros frecuentes

### 9.1 Usar `color-mix()` sen indicar o espazo de cor

```css
/* Mal: falta o "in <espazo>" */
color: color-mix(#1a5c8a, white);

/* Ben */
color: color-mix(in oklch, #1a5c8a, white);
```

O primeiro argumento é **obrigatorio**: `in <espazo>`.

### 9.2 Usar porcentaxes que non suman 100%

```css
/* Isto non dá erro, pero normalízase */
color: color-mix(in oklch, red 30%, blue 30%);
/* Normalízase a 50% / 50% */
```

Se a suma non é 100%, o navegador normaliza. Hai que ter isto en conta.

### 9.3 Esquecer que `contrast-color()` é moi recente

```css
/* Se os teus usuarios teñen navegadores antigos, isto non funciona */
color: contrast-color(#1a5c8a);
```

**Solución:** se necesitas compatibilidade, comproba o estado actual e, se é necesario, usa un fallback con JavaScript.

### 9.4 Usar `oklch()` sen comprobar se a cor é válida

```css
/* O croma pode saírse do rango e a cor volverase inválida */
color: oklch(50% 0.9 250);   /* croma demasiado alto */
```

O croma en OKLCH vai aproximadamente de 0 a 0.4. Valores moi altos poden non ser representables e a cor volverase inválida (ou se recortará).

### 9.5 Abusar de `color-mix()` para cores que xa existen

```css
/* Redundante: só queres un gris claro, escribe o valor directamente */
color: color-mix(in oklch, white 90%, black);
```

**Recomendación:** usa `color-mix()` cando queiras **derivar** cores dinamicamente. Se o valor é fixo, escríbeo directamente.

### 9.6 Mesturar cores en sRGB cando importa a coherencia

```css
/* Se queres cores coherentes, evita mesturar en sRGB */
color: color-mix(in srgb, #1a5c8a, white);

/* Usa oklch ou oklab */
color: color-mix(in oklch, #1a5c8a, white);
```

### 9.7 Confundir `contrast-color()` con `color-contrast()`

`color-contrast()` foi unha proposta que **non chegou a implementarse**. A función que existe é `contrast-color()`. Se ves `color-contrast()` en código antigo, é unha proba fallida.

### 9.8 Non poñer espazos nos argumentos de `oklch()`

```css
/* Mal */
color: oklch(50%0.13 250);

/* Ben */
color: oklch(50% 0.13 250);
```

Os valores sepáranse por espazos.

---

## 10. Compatibilidade (2026)

| Característica                              | Estado                           |
| ------------------------------------------- | -------------------------------- |
| `oklch()`, `lab()`, `lch()`                 | Baseline desde 2023              |
| `color-mix()`                               | Baseline desde 2023              |
| `contrast-color()`                          | Baseline novo (2026) — comprobar |
| Sintaxe de cor relativa (`oklch(from ...)`) | Baseline desde 2024              |
| `color()` con `display-p3` e outros         | Baseline desde 2023              |
| `hsl()` e `rgb()` modernos con `/ alpha`    | Universal                        |

**Recomendación:** todas excepto `contrast-color()` pódense usar sen preocupacións. Para `contrast-color()`, comproba o estado actual.

---

## 11. Exercicios

### Exercicio 1: OKLCH

Escribe tres tons de verde en OKLCH: escuro, medio, claro. Todos deben ter o mesmo croma e ton.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.verde-escuro { color: oklch(35% 0.12 145); }
.verde-medio  { color: oklch(55% 0.12 145); }
.verde-claro  { color: oklch(75% 0.12 145); }
```

</details>

---

### Exercicio 2: `color-mix()`

Escribe CSS para que un botón teña fondo `#1a5c8a` e, ao pasar o rato por riba, un fondo que sexa ese azul mesturado ao 80% con negro.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.boton {
    background: #1a5c8a;
}

.boton:hover {
    background: color-mix(in oklch, #1a5c8a 80%, black);
}
```

</details>

---

### Exercicio 3: Cor relativa

Usando sintaxe de cor relativa, escribe CSS para que un elemento teña a mesma cor ca `#1a5c8a` pero cun 20% menos de croma (menos saturada).

<details>
<summary><b>Amosar a solución</b></summary>

```css
.elemento {
    color: oklch(from #1a5c8a l calc(c * 0.8) h);
}
```

</details>

---

### Exercicio 4: Sistema de botóns

Crea un sistema de botóns onde cada variante (`primario`, `exito`, `erro`) defina só unha variable `--cor-boton`, e os estados `:hover` e `:disabled` derívense automaticamente.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.boton {
    --cor-boton: oklch(50% 0.13 250);
    background: var(--cor-boton);
    color: contrast-color(var(--cor-boton));

    &:hover {
        background: oklch(from var(--cor-boton) calc(l - 0.08) c h);
    }

    &:disabled {
        background: oklch(from var(--cor-boton) l calc(c * 0.3) h);
        opacity: 0.5;
    }

    &.boton-exito { --cor-boton: oklch(55% 0.15 145); }
    &.boton-erro  { --cor-boton: oklch(55% 0.20 25); }
}
```

</details>

---

### Exercicio 5: Detectar o erro

```css
.boton {
    background: color-mix(oklch, #1a5c8a, white);
    color: contrast-color(#1a5c8a);
    border: oklch(50% 0.9 250);
}
```

Atopa tres erros.

<details>
<summary><b>Amosar a solución</b></summary>

1. `color-mix(oklch, ...)` falta o `in`. Debe ser `color-mix(in oklch, ...)`.
2. `color: contrast-color(#1a5c8a)` — pode ser un problema de compatibilidade. Hai que comprobalo (aínda que a sintaxe é correcta).
3. `oklch(50% 0.9 250)` — o croma `0.9` está fóra do rango habitual (máx. ~0.4). A cor pode non ser representable.

</details>

---

## 12. Para profundar

- **MDN Web Docs:** [CSS colors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors) — referencia completa.
- **MDN Web Docs:** [`<color>`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) — todos os formatos.
- **MDN Web Docs:** [color-mix()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix) — referencia.
- **MDN Web Docs:** [oklch()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch) — referencia.
- **MDN Web Docs:** [Using relative colors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Relative_colors) — guía.
- **web.dev:** [Learn CSS: Color](https://web.dev/learn/css/color) — lección interactiva.
- **Lea Verou:** [LCH color in CSS](https://lea.verou.me/2020/04/lch-colors-in-css-what-why-and-how/) — artigo histórico.
- **Evil Martians:** [OKLCH in CSS](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl) — artigo moi recomendado.
- **OKLCH Color Picker** (https://oklch.com) — ferramenta visual para explorar OKLCH.
- **W3C:** [CSS Color Module Level 5](https://www.w3.org/TR/css-color-5/) — especificación.

---

## 13. Referencias cruzadas

- **Capítulo 4: Cores, tipografía e unidades** — repasa os formatos tradicionais de cor.
- **Capítulo 11: Media queries** — as cores cambian en modo escuro con `prefers-color-scheme`.
- **Capítulo 14: Propiedades personalizadas** — as variables combínanse con todas estas funcións.
- **Capítulo 15: Aniñamento nativo** — o aniñado úsase moito con estas funcións nos compoñentes.
- **Capítulo 16: Pseudo-clases e pseudo-elementos modernos** — `:has()` e outras combínanse con funcións de cor.
- **Capítulo 26: Accesibilidade e CSS** — `contrast-color()` e `color-mix()` son ferramentas clave para garantir contraste.

---

**Data de creación:** 2026-09-17  
**Última revisión:** 2026-09-17  
**Estado:** Borrador para validación
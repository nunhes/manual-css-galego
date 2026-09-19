---
title: "Aniñamento nativo"
description: "Explicación do aniñamento nativo de CSS, a súa sintaxe, vantaxes e límites fronte aos preprocesadores."
bloque: 5
capitulo: 15
nivel: intermedio
ultima_revision: "2026-09-17"
estado: "borrador_para_validacion"
compatibilidade: "baseline_2023"
palabras_chave:
  - aniñamento
  - nesting
  - aniñado
  - aniñar
  - estructura_aniñada
  - specificity
  - readabilidade
  - preprocesadores
---

<!-- # Capítulo 15: Aniñamento nativo -->

> O **Aniñamento nativo** (en inglés, *native nesting*) permite escribir regras CSS **unhas dentro doutras**, coma se fose unha linguaxe de programación con ámbolos aniñados. Isto fai que o CSS sexa máis lexible e máis próximo á estrutura do HTML. Ata 2023, isto só era posible con preprocesadores (Sass, Less). Agora é CSS estándar. Este capítulo explica como funciona, cando usalo, e os coidados que hai que ter.

---

## 1. Introdución: o CSS sempre foi plano

Durante case toda a historia de CSS, as regras tiñan que ser **planas**: non se podía meter unha regra dentro doutra. Isto contrasta co HTML, que é **xerárquico** (elementos dentro de elementos), e co JavaScript, que permite funcións dentro de funcións.

**Exemplo do problema.** Imaxina que queres dar estilo a unha tarxeta e aos seus elementos internos. Sen aniñado, tes que escribir:

```css
.tarxeta {
    background: white;
    padding: 1rem;
    border-radius: 8px;
}

.tarxeta h2 {
    color: #1a5c8a;
    margin-bottom: 0.5rem;
}

.tarxeta p {
    color: #555;
    margin-bottom: 1rem;
}

.tarxeta button {
    background: #1a5c8a;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
}

.tarxeta button:hover {
    background: #0d3a5c;
}
```

Cada regra repite `.tarxeta` como prefixo. Cando o compoñente ten moitos elementos internos, isto vólvese moi repetitivo.

**Co aniñado nativo**, podes escribir:

```css
.tarxeta {
    background: white;
    padding: 1rem;
    border-radius: 8px;

    h2 {
        color: #1a5c8a;
        margin-bottom: 0.5rem;
    }

    p {
        color: #555;
        margin-bottom: 1rem;
    }

    button {
        background: #1a5c8a;
        color: white;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;

        &:hover {
            background: #0d3a5c;
        }
    }
}
```

O CSS reflite **visualmente** a estrutura do compoñente. Isto fai que o código sexa moito máis fácil de ler e manter.

> 💡 **Para pensar:** o aniñado nativo é probablemente a característica de CSS moderno que máis cambia a forma de escribir CSS. Se vés de escribir CSS plano ou de usar Sass, o aniñado nativo permíteche ter case todo o que che daba Sass, sen necesidade de compilador.

---

## 2. Conceptos fundamentais

### 2.1 Que é o aniñado

**Aniñar** significa **meter unha regra CSS dentro doutra regra CSS**. A regra interior aplícase só aos elementos que estean dentro do elemento da regra exterior.

```css
.tarxeta {
    /* Estilos da tarxeta */

    h2 {
        /* Estilos dos h2 dentro da tarxeta */
    }
}
```

O `h2` aniñado é equivalente a escribir `.tarxeta h2` **fóra** (selector descendente). Pero a forma aniñada é máis clara.

### 2.2 O símbolo `&`: referencia ao selector pai

Cando aniñas, o **selector pai** pódese referenciar co símbolo `&`. Isto é moi útil cando queres que a regra interior **engada** algo ao pai (por exemplo, unha pseudo-clase, unha pseudo-elemento, ou unha clase combinada).

```css
.boton {
    background: #1a5c8a;

    &:hover {
        background: #0d3a5c;
    }
}
```

O `&` refírese a `.boton`. A regra interior é equivalente a `.boton:hover`.

**Sen `&`**, o mesmo exemplo sería:

```css
.boton {
    background: #1a5c8a;

    :hover {
        /* Isto significa: "calquera :hover DENTRO de .boton" */
        /* NON é o que queremos */
    }
}
```

Sen `&`, o `:hover` interpretaríase como «un descendente que está en estado hover», o que non é o mesmo. Por iso o `&` é fundamental nestes casos.

### 2.3 Cando se necesita o `&`

O `&` **é necesario** cando o selector interior:

- Empeza por unha **pseudo-clase** (`:hover`, `:focus`, `:active`...).
- Empeza por unha **pseudo-elemento** (`::before`, `::after`...).
- Empeza por unha **clase combinada** (`.boton.activo`).
- Empeza por un **atributo** (`[aria-hidden="true"]`).
- Quere **inverter a relación** (`.pai & { }` para referirse a un pai, que veremos en 4.4).

O `&` **non é necesario** cando o selector interior:

- É unha etiqueta (`h2`, `p`, `button`).
- É unha clase descendente (`.titulo`).
- É calquera cousa que funcione coma descendente.

**Recomendación:** usa sempre `&` cando haxa dúbida. É máis explícito e evita erros.

---

## 3. Sintaxe

### 3.1 Aniñado básico

```css
.tarxeta {
    background: white;
    padding: 1rem;

    h2 {
        color: #1a5c8a;
    }

    p {
        color: #555;
    }
}
```

**Equivale a:**

```css
.tarxeta {
    background: white;
    padding: 1rem;
}

.tarxeta h2 {
    color: #1a5c8a;
}

.tarxeta p {
    color: #555;
}
```

### 3.2 Con pseudo-clases

```css
.boton {
    background: #1a5c8a;

    &:hover {
        background: #0d3a5c;
    }

    &:focus-visible {
        outline: 2px solid #1a5c8a;
        outline-offset: 2px;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
}
```

### 3.3 Con clases combinadas

```css
.boton {
    background: #1a5c8a;

    &.grande {
        padding: 1rem 2rem;
        font-size: 1.125rem;
    }

    &.pequeno {
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;
    }
}
```

`&.grande` equivale a `.boton.grande` (un botón **que tamén ten** a clase `grande`).

**Diferenza con `.grande` sen `&`:** `.boton .grande` (con espazo) significa «un elemento con clase `grande` **dentro dun** botón». Isto é moi diferente.

### 3.4 Con pseudo-elementos

```css
.tarxeta {
    position: relative;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background: #1a5c8a;
    }
}
```

### 3.5 Con media queries dentro

Tamén se poden meter media queries e outras at-rules dentro dunha regra aniñada:

```css
.tarxeta {
    background: white;
    padding: 1rem;

    @media (min-width: 768px) {
        padding: 2rem;
    }
}
```

**Equivale a:**

```css
.tarxeta {
    background: white;
    padding: 1rem;
}

@media (min-width: 768px) {
    .tarxeta {
        padding: 2rem;
    }
}
```

Isto é moi cómodo porque evita ter que ir ao final do arquivo a poñer as adaptacións.

---

## 4. Casos avanzados

### 4.1 Aniñado profundo

Pódese aniñar varias veces:

```css
.tarxeta {
    h2 {
        color: #1a5c8a;

        span {
            font-weight: normal;
            opacity: 0.8;
        }
    }
}
```

Isto equivale a:

```css
.tarxeta h2 {
    color: #1a5c8a;
}

.tarxeta h2 span {
    font-weight: normal;
    opacity: 0.8;
}
```

**Recomendación:** non aniñar máis de 2-3 niveis. Máis alá diso, o CSS vólvese difícil de ler e a especificidade sobe sen control.

### 4.2 Aniñado de at-rules

As at-rules (`@media`, `@supports`, `@layer`, `@container`) pódense aniñar de dúas formas: dentro dunha regra, ou contendo regras aniñadas.

**Dentro dunha regra:**

```css
.tarxeta {
    padding: 1rem;

    @media (min-width: 768px) {
        padding: 2rem;
    }

    @supports (display: grid) {
        display: grid;
    }
}
```

**Contendo regras aniñadas:**

```css
@media (min-width: 768px) {
    .tarxeta {
        padding: 2rem;

        h2 {
            font-size: 1.5rem;
        }
    }
}
```

As dúas formas son válidas. A primeira é máis cómoda cando as adaptacións están ligadas ao compoñente.

### 4.3 O `&` como parte dun selector

O `&` pode combinarse con outras partes para crear selectores máis complexos:

```css
.boton {
    /* Cando o botón está dentro dun .formulario */
    .formulario & {
        width: 100%;
    }

    /* Cando o botón está inmediatamente despois dun .campo */
    .campo + & {
        margin-top: 1rem;
    }
}
```

O primeiro equivale a `.formulario .boton`. O segundo, a `.campo + .boton`.

Isto é moi útil cando o estilo do compoñente **depende do contexto onde se atopa**.

### 4.4 O `&` múltiple

O `&` pode aparecer varias veces nun mesmo selector:

```css
.boton {
    & + & {
        margin-left: 0.5rem;
    }
}
```

Isto significa «un `.boton` que veña inmediatamente despois doutro `.boton`». Moi útil para separar botóns consecutivos.

### 4.5 Especificidade no aniñado

**Importante:** o aniñado **non cambia a especificidade** respecto ao selector equivalente non aniñado. `.tarxeta h2 { }` aniñado ten a mesma especificidade que `.tarxeta h2 { }` non aniñado.

**Pero coidado co `&`:** `.boton { &.grande { } }` ten a especificidade de `.boton.grande` (dúas clases). Isto é maior que `.boton .grande` (dúas clases, pero como descendente).

Isto é relevante cando hai conflitos de estilos.

---

## 5. Exemplo mínimo funcional

Vexamos un compoñente completo escrito con aniñado nativo.

**Arquivo HTML:**

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aniñado nativo</title>
    <link rel="stylesheet" href="estilos/aninamento.css">
</head>
<body>
    <main class="contido">
        <article class="tarxeta">
            <h2>Un artigo</h2>
            <p>Un texto de exemplo.</p>
            <div class="accions">
                <button class="boton">Ler máis</button>
                <button class="boton boton-secundario">Gardar</button>
            </div>
        </article>

        <article class="tarxeta tarxeta-destacada">
            <h2>Outro artigo</h2>
            <p>Este ten unha variante.</p>
            <div class="accions">
                <button class="boton">Ler máis</button>
            </div>
        </article>
    </main>
</body>
</html>
```

**Arquivo CSS:**

```css
/* ==============================
   Variables (Cap. 14)
   ============================== */
:root {
    --cor-primaria: #1a5c8a;
    --cor-primaria-escura: #0d3a5c;
    --cor-texto: #333;
    --cor-texto-suave: #555;
    --cor-fondo: #fafafa;
    --cor-bordo: #e5e5e5;
    --esp-1: 0.25rem;
    --esp-2: 0.5rem;
    --esp-3: 1rem;
    --esp-4: 1.5rem;
    --radio-sm: 4px;
    --radio-md: 8px;
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
    color: var(--cor-texto);
    background: var(--cor-fondo);
}

/* ==============================
   Contido
   ============================== */
.contido {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
    gap: var(--esp-4);
    padding: var(--esp-4);
    max-width: 900px;
    margin: 0 auto;
}

/* ==============================
   Tarxeta (con aniñado)
   ============================== */
.tarxeta {
    background: white;
    padding: var(--esp-4);
    border-radius: var(--radio-md);
    border: 1px solid var(--cor-bordo);

    h2 {
        color: var(--cor-primaria);
        margin-bottom: var(--esp-3);
        font-size: 1.25rem;
    }

    p {
        color: var(--cor-texto-suave);
        margin-bottom: var(--esp-4);
    }

    .accions {
        display: flex;
        gap: var(--esp-2);
        flex-wrap: wrap;
    }

    /* Variante: tarxeta destacada */
    &.tarxeta-destacada {
        --cor-primaria: #ca8a04;
        --cor-bordo: #f5e6a8;
    }
}

/* ==============================
   Botón (con aniñado)
   ============================== */
.boton {
    background: var(--cor-primaria);
    color: white;
    padding: var(--esp-2) var(--esp-3);
    border: none;
    border-radius: var(--radio-sm);
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.2s;

    &:hover {
        background: var(--cor-primaria-escura);
    }

    &:focus-visible {
        outline: 2px solid var(--cor-primaria);
        outline-offset: 2px;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    /* Variante secundaria */
    &.boton-secundario {
        background: transparent;
        color: var(--cor-primaria);
        border: 1px solid var(--cor-primaria);

        &:hover {
            background: var(--cor-primaria);
            color: white;
        }
    }
}
```

**Que está a pasar aquí:**

1. **A tarxeta** aniña os estilos dos seus elementos internos: `h2`, `p`, `.accions`.
2. **A variante `.tarxeta-destacada`** redefina as variables localmente usando `&.tarxeta-destacada`.
3. **O botón** aniña os seus estados: `:hover`, `:focus-visible`, `:disabled`.
4. **A variante `.boton-secundario`** tamén aniña o seu propio `:hover`.

O CSS é **moito máis fácil de ler** que se estivese plano. Cada compoñente ten o seu CSS xunto, cos seus estados e variantes.

---

## 6. Casos habituais na práctica

### 6.1 Compoñentes con estados

```css
.boton {
    background: var(--cor-primaria);

    &:hover { }
    &:focus-visible { }
    &:active { }
    &:disabled { }

    &.activo { }
}
```

### 6.2 Compoñentes con elementos internos

```css
.tarxeta {
    padding: 1rem;

    .titulo {
        font-size: 1.25rem;
    }

    .descricion {
        color: #666;
    }

    .accions {
        display: flex;
        gap: 0.5rem;
    }
}
```

### 6.3 Adaptacións dentro do compoñente

```css
.menu {
    display: flex;
    flex-direction: column;

    @media (min-width: 768px) {
        flex-direction: row;
    }
}
```

Isto evita ter que poñer a media query ao final do arquivo.

### 6.4 Compoñentes con variantes

```css
.alerta {
    background: #f5f5f5;
    padding: 1rem;
    border-radius: 8px;

    &.alerta-erro {
        background: #ffe5e5;
        border-left: 4px solid #cc0000;
    }

    &.alerta-exito {
        background: #e5ffe5;
        border-left: 4px solid #2d7a3e;
    }
}
```

### 6.5 Combinación con variables

```css
.boton {
    --cor-boton: var(--cor-primaria);

    background: var(--cor-boton);
    color: white;

    &:hover {
        background: color-mix(in oklch, var(--cor-boton) 80%, black);
    }

    &.boton-erro {
        --cor-boton: var(--cor-erro);
    }
}
```

Variables + aniñado + `color-mix()` crean un sistema moi limpo e flexible.

---

## 7. Erros frecuentes

### 7.1 Esquecer o `&` en pseudo-clases

```css
/* Mal: o :hover aplícase aos fillos, non ao botón */
.boton {
    :hover {
        background: red;
    }
}

/* Ben */
.boton {
    &:hover {
        background: red;
    }
}
```

**Este é o erro máis común e perigoso.** Sen `&`, o `:hover` significa «calquera elemento en estado hover **dentro de** `.boton`», non «o propio `.boton` en estado hover». O resultado pode ser moi distinto do que se espera.

### 7.2 Aniñar demasiado

```css
/* Mal: tres niveis de aniñado */
.layout {
    .contido {
        .tarxeta {
            .titulo {
                color: red;
            }
        }
    }
}
```

**Problemas:**

- Especificidade moi alta (difícil de sobrescribir).
- CSS difícil de ler.
- Se un dos selectores cambia, hai que revisar todo o bloque.

**Recomendación:** non aniñar máis de 2-3 niveis. En moitos casos, un compoñente non necesita aniñado.

### 7.3 Confundir `.clase1 .clase2` con `.clase1.clase2`

```css
/* Sen & : descendente */
.tarxeta {
    .titulo { }   /* .tarxeta .titulo (con espazo) */
}

/* Con & : combinada */
.tarxeta {
    &.titulo { }   /* .tarxeta.titulo (mesmo elemento, dúas clases) */
}
```

Son cousas **completamente distintas**. Hai que ter claro cal é a que queres.

### 7.4 Usar aniñado só por moda

O aniñado é útil cando hai un compoñente claramente definido. Se só estás a escribir unha ou dúas regras soltas, o aniñado pode non aportar nada.

```css
/* Sen aniñado, isto está perfectamente */
h1 { font-size: 2rem; }
h2 { font-size: 1.5rem; }
p  { margin-bottom: 1rem; }
```

Isto é máis claro que aniñar estas regras baixo un contedor común só por facelo.

### 7.5 Non saber que o aniñado xa non precisa compilador

Se vés de usar Sass, hai que ter claro que o aniñado nativo **non necesita compilador**. Escríbese directamente en `.css` e o navegador enténdeo. Non hai que compilar.

Isto tamén significa que **non hai que renomear arquivos** nin cambiar a ferramentas.

### 7.6 Usar sintaxe antiga de Sass

Algunhas cousas de Sass **non funcionan** en aniñado nativo:

```css
/* Isto é de Sass, NON funciona en CSS nativo */
.boton {
    &__icone { }     /* BEM en Sass */
    &--grande { }    /* BEM en Sass */
}
```

En CSS nativo, isto **non funciona** porque o `&` só substitúe o selector pai enteiro, non o nome. Hai que escribir:

```css
.boton__icone { }
.boton--grande { }
```

ou usar outras técnicas.

---

## 8. Compatibilidade (2026)

| Característica                 | Estado                   |
| ------------------------------ | ------------------------ |
| Aniñado nativo básico          | Baseline desde 2023      |
| `&` como referencia ao pai     | Baseline desde 2023      |
| Aniñado de `@media` e at-rules | Baseline desde 2023-2024 |
| Aniñado con `@layer`           | Baseline desde 2023-2024 |

**O aniñado nativo está estabilizado desde 2023** e ten soporte completo en todos os navegadores modernos desde 2024. Pódese usar sen preocupacións.

---

## 9. Exercicios

### Exercicio 1: Converter a aniñado

Converte este CSS a aniñado nativo:

```css
.tarxeta {
    background: white;
    padding: 1rem;
}

.tarxeta h2 {
    color: #1a5c8a;
}

.tarxeta p {
    color: #555;
}

.tarxeta:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
```

<details>
<summary><b>Amosar a solución</b></summary>

```css
.tarxeta {
    background: white;
    padding: 1rem;

    h2 {
        color: #1a5c8a;
    }

    p {
        color: #555;
    }

    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
}
```

</details>

---

### Exercicio 2: O `&` necesario

Que pasa se quitas o `&` neste código? Por que?

```css
.boton {
    background: blue;

    &:hover {
        background: red;
    }
}
```

<details>
<summary><b>Amosar a solución</b></summary>

Se quitas o `&`, o `:hover` significa «calquera elemento en estado hover dentro de `.boton`». O navegador aplicaría o fondo vermello a elementos internos do botón cando pasas o rato por riba de calquera deles, non ao propio botón. O resultado é incorrecto.

</details>

---

### Exercicio 3: Diferencia entre `.clase` e `&.clase`

Explica a diferenza entre estes dous bloques:

```css
/* A */
.tarxeta {
    .titulo { }
}

/* B */
.tarxeta {
    &.titulo { }
}
```

<details>
<summary><b>Amosar a solución</b></summary>

- **A**: `.tarxeta .titulo` — un elemento con clase `titulo` **dentro dun** elemento con clase `tarxeta`.
- **B**: `.tarxeta.titulo` — un único elemento que ten **as dúas clases** `tarxeta` e `titulo`.

</details>

---

### Exercicio 4: Variantes con `&`

Crea un compoñente `.boton` con tres variantes: `.boton-primario`, `.boton-secundario`, `.boton-perigo`, cada unha cunha cor diferente. Usa aniñado.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.boton {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &.boton-primario {
        background: #1a5c8a;
        color: white;
    }

    &.boton-secundario {
        background: transparent;
        color: #1a5c8a;
        border: 1px solid #1a5c8a;
    }

    &.boton-perigo {
        background: #cc0000;
        color: white;
    }

    &:hover {
        opacity: 0.9;
    }
}
```

</details>

---

### Exercicio 5: Aniñado con media query

Converte este CSS a aniñado nativo:

```css
.menu {
    display: flex;
    flex-direction: column;
}

@media (min-width: 768px) {
    .menu {
        flex-direction: row;
    }
}
```

<details>
<summary><b>Amosar a solución</b></summary>

```css
.menu {
    display: flex;
    flex-direction: column;

    @media (min-width: 768px) {
        flex-direction: row;
    }
}
```

</details>

---

## 10. Para profundar

- **MDN Web Docs:** [CSS nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting) — guía completa.
- **MDN Web Docs:** [Using CSS nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting/Using_CSS_nesting) — guía práctica.
- **web.dev:** [CSS nesting](https://web.dev/articles/css-nesting) — artigo de Google.
- **Ahmad Shadeed:** [CSS Nesting](https://ishadeed.com/article/css-nesting/) — guía visual.
- **W3C:** [CSS Nesting Module](https://www.w3.org/TR/css-nesting-1/) — especificación.

---

## 11. Referencias cruzadas

- **Capítulo 3: Selectores básicos** — o aniñado crea selectores descendentes e combinados, que convén repasar.
- **Capítulo 14: Propiedades personalizadas** — o aniñado combínase moi ben coas variables.
- **Capítulo 16: Pseudo-clases e pseudo-elementos modernos** — o aniñado úsase moito con pseudo-clases como `:hover`.
- **Capítulo 23: `@layer`, `@scope`, `@supports`** — outras at-rules que se poden aniñar.
- **Capítulo 24: Rendemento e boas prácticas** — cando aniñar e cando non.

---

**Data de creación:** 2026-09-17  
**Última revisión:** 2026-09-17  
**Estado:** Borrador para validación
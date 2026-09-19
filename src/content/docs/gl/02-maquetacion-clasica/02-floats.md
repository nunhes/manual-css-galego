---
title: "`float`"
description: "Explicación dos floats, os seus efectos no fluxo, o clearfix e os usos actuais desta técnica de maquetación clásica."
bloque: 2
capitulo: 7
nivel: intermedio
ultima_revision: "2026-09-17"
estado: "borrador_para_validacion"
compatibilidade: "universal"
palabras_chave:
  - float
  - clearfix
  - codigo_legado
  - maquetacion_clasica
  - left
  - right
  - none
---

<!-- # Capítulo 7: Floats -->

> Os **floats** son unha técnica de maquetación que permite que un elemento «flote» á esquerda ou á dereita, e que o texto flúa ao seu redor. Foron a base da maquetación web durante anos, pero hoxe están en desuso: Flexbox e Grid substitúenos. Aínda así, hai que coñecelos porque:
>
> 1. Aparecen en código legado que hai que manter.
> 2. Hai dous usos onde seguen sendo a mellor opción: **texto que flúe arredor dunha imaxe** e **drop caps**.

---

## 1. Introdución: unha técnica con historia

Durante os anos 2000 e 2010, antes de que existisen Flexbox e Grid, os floats eran **a** ferramenta para maquetar en CSS. Columnas, barras laterais, grellas... todo se facía con floats. Era unha época na que o CSS non tiña ferramentas específicas para layouts, e os desenvolvedores tiñan que enxeñar solucións con propiedades que non foran pensadas para iso.

O resultado era un CSS fráxil, cheo de «clearfixes» e trucos, que se rompía con facilidade. Hoxe, con Flexbox e Grid dispoñibles, xa non hai que facer isto. Pero entender os floats ten tres utilidades:

1. **Manter código legado.** Moitos sitios web antigos usan floats. Se tes que modificalos, hai que entendelos.
2. **Dous usos actuais.** Hai dous casos onde os floats seguen a ser a mellor opción (ver sección 5).
3. **Cultura xeral de CSS.** Moitos artigos e recursos en liña usan floats. Entendelos axúdache a lelos.

> ⚠️ **Importante:** Se estás a aprender CSS agora, **non uses floats para maquetar**. Usa Flexbox (Cap. 8) ou Grid (Cap. 9). O contido deste capítulo é para entender e manter código antigo, non para escribir código novo.

---

## 2. Conceptos fundamentais

### 2.1 Que é un float

A propiedade `float` indica que un elemento debe **saír do fluxo normal** e colocarse á esquerda ou á dereita do seu contedor, permitindo que o **texto flúa ao seu redor**.

```css
.imaxe-flotante {
    float: left;   /* a imaxe flota á esquerda */
    margin-right: 1rem;  /* separación co texto */
}
```

Valores:

- **`left`:** o elemento flota á esquerda.
- **`right`:** o elemento flota á dereita.
- **`none`:** o elemento segue o fluxo normal (por defecto).
- **`inline-start` e `inline-end`:** valores lóxicos (equivalentes a `left`/`right` segundo a dirección do texto).

### 2.2 Como afecta ao fluxo

Cando un elemento ten `float`, o navegador:

1. **Sácao do fluxo normal.** O elemento non ocupa espazo no seu sitio orixinal.
2. **Colócao á esquerda ou á dereita** do contedor.
3. **O resto do contido (texto, elementos en liña) flúe ao seu redor.**

**Exemplo:**

```html
<img src="imaxe.jpg" alt="Exemplo" class="flotante">
<p>Este texto flúe ao redor da imaxe. A imaxe está á esquerda
e o texto colócase á súa dereita, arredor do seu contorno.</p>
```

```css
.flotante {
    float: left;
    width: 200px;
    margin-right: 1rem;
}
```

O resultado: a imaxe á esquerda, o texto á dereita.

### 2.3 Elementos que flotan e elementos que non

Non todos os elementos se comportan igual ao flotar:

- Os elementos **en liña** cando flotan **convértense en elementos de bloque** para efectos de layout. Aínda que un `<span>` flotante siga sendo un `<span>`, compórtase como bloque.
- Os elementos de bloque flotantes seguen sendo bloques.
- Un elemento flotante **ignora** `margin: auto` (non se pode centrar con auto).

### 2.4 O problema clásico: contedores que colapsan

Cando un contedor só ten fillos flotantes, o contedor **non os contén** e pode colapsar a altura cero. Este é o problema máis coñecido dos floats.

```html
<div class="contedor">
    <div class="fillo-flotante">A</div>
    <div class="fillo-flotante">B</div>
</div>
```

```css
.contedor {
    background: lightgray;
    /* sen altura explícita */
}

.fillo-flotante {
    float: left;
    width: 100px;
    height: 100px;
}
```

O contedor ten altura 0 (non se ve o fondo gris), porque os fillos flotantes están fóra do fluxo.

**Solución:** hai varias técnicas. A máis limpa é `display: flow-root` no contedor:

```css
.contedor {
    display: flow-root;
}
```

Outra opción é usar o «clearfix» (ver sección 4).

---

## 3. `clear`: cancelar o flotante

A propiedade `clear` indica que un elemento **non pode estar ao lado** dun float. Se hai un float á esquerda, un elemento con `clear: left` baixa debaixo.

```css
.despois-do-float {
    clear: both;  /* baixa debaixo de calquera float */
}
```

Valores:

- **`left`:** o elemento baixa debaixo dos floats á esquerda.
- **`right`:** o elemento baixa debaixo dos floats á dereita.
- **`both`:** o elemento baixa debaixo de calquera float.
- **`none`:** (por defecto) non se cancela ningún float.

**Exemplo: dous bloques flotantes e un pé que vai debaixo**

```css
.esquerda {
    float: left;
    width: 50%;
}

.dereita {
    float: right;
    width: 50%;
}

.pe {
    clear: both;   /* o pé vai debaixo dos dous */
}
```

---

## 4. Clearfix: a técnica clásica

Antes de que existise `display: flow-root`, a forma habitual de conter fillos flotantes era un «clearfix». Consistía en engadir un pseudo-elemento ao final do contedor que «limpase» os floats.

**O clearfix clásico (de Nicolas Gallagher):**

```css
.clearfix::after {
    content: "";
    display: table;
    clear: both;
}
```

**Como funciona:**

1. `::after` crea un pseudo-elemento ao final do contedor.
2. `content: ""` fai que o pseudo-elemento teña contido (necesario para que se xere).
3. `display: table` fai que se comporte como un bloque especial.
4. `clear: both` fai que se coloque debaixo de calquera float, e polo tanto o contedor medra para conter o pseudo-elemento.

**Uso:**

```html
<div class="contedor clearfix">
    <div class="fillo-flotante">A</div>
    <div class="fillo-flotante">B</div>
</div>
```

**Alternativa moderna:** `display: flow-root` no contedor substitúe o clearfix e é moito máis limpo. Non ten efectos secundarios.

```css
.contedor {
    display: flow-root;
}
```

**Recomendación:** se estás a escribir CSS novo, usa `flow-root`. Se estás a modificar código antigo que xa ten clearfix, déixao (funciona ben).

---

## 5. Usos actuais dos floats

Aínda que os floats xa non se usan para maquetar, hai dous casos onde seguen sendo a mellor opción.

### 5.1 Texto que flúe arredor dunha imaxe

Este é o uso orixinal dos floats, e segue sendo a forma máis natural de facelo.

```html
<article>
    <img src="foto.jpg" alt="Descrición" class="imaxe-flotante">
    <p>
        Este texto flúe arredor da imaxe. A imaxe está á esquerda
        e o texto colócase á súa dereita. Se o texto é longo,
        seguirá fluíndo debaixo da imaxe cando remate a súa altura.
    </p>
    <p>
        Este parágrafo tamén flúe ao redor da imaxe se aínda
        queda espazo á dereita.
    </p>
</article>
```

```css
.imaxe-flotante {
    float: left;
    width: 300px;
    margin: 0 1rem 1rem 0;
    border-radius: 8px;
}
```

**Por que segue sendo útil:** cando flotas unha imaxe, o texto **encaixa arredor** de forma natural. Con Flexbox ou Grid isto non se consegue doadamente, porque eses sistemas organizan caixas, non texto que flúe.

> 💡 **Nota:** hai unha técnica moderna chamada `float` + `shape-outside` que permite que o texto flúa arredor dun contorno non rectangular (por exemplo, un círculo). Isto é útil para revistas dixitais e deseños creativos.

### 5.2 Drop caps (letras capitulares)

As **drop caps** son letras grandes ao comezo dun parágrafo, como nas revistas. Pódense facer con `float`:

```css
.articulo p:first-of-type::first-letter {
    float: left;
    font-size: 4rem;
    line-height: 0.8;
    padding-right: 0.5rem;
    font-weight: bold;
    color: #1a5c8a;
}
```

O resultado é unha primeira letra grande que o texto rodea.

---

## 6. Exemplo mínimo funcional

**Arquivo HTML:**

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <title>Floats</title>
    <link rel="stylesheet" href="estilos/floats.css">
</head>
<body>
    <article class="artigo">
        <h1>Un artigo con imaxe flotante</h1>
        <img src="https://picsum.photos/300/200" alt="Exemplo" class="imaxe-flotante">
        <p>
            Este é o primeiro parágrafo do artigo. A imaxe flota á esquerda
            e o texto colócase á súa dereita, arredor do seu contorno.
            Isto é útil para artigos longos con imaxes intercaladas.
        </p>
        <p>
            Este segundo parágrafo tamén flúe arredor da imaxe se aínda
            hai espazo. Se a imaxe é alta, o texto segue baixo dela cando
            a liña actual remata.
        </p>
        <p class="pe">
            Este parágrafo ten <code>clear: both</code> para que
            quede sempre debaixo dos floats.
        </p>
    </article>
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
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
}

.artigo {
    background: #f9f9f9;
    padding: 2rem;
    border-radius: 8px;
    /* Usamos flow-root para conter os floats */
    display: flow-root;
}

.imaxe-flotante {
    float: left;
    width: 300px;
    margin: 0 1rem 1rem 0;
    border-radius: 8px;
}

.pe {
    clear: both;
    background: #fef9c3;
    padding: 1rem;
    border-radius: 4px;
    margin-top: 2rem;
}
```

**Que está a pasar aquí:**

1. A imaxe ten `float: left`, polo que se coloca á esquerda.
2. O texto dos parágrafos flúe ao seu redor.
3. O contedor ten `display: flow-root` para conter os floats.
4. O último parágrafo ten `clear: both`, polo que sempre queda debaixo.

---

## 7. Casos habituais (en código legado)

### 7.1 Columnas con floats

**Código legado:**

```css
.columna {
    float: left;
    width: 33.333%;
}
```

Isto creaba tres columnas iguais. Hoxe faríase con Grid:

```css
.contenedor {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}
```

### 7.2 Layout de barra lateral + contido

**Código legado:**

```css
.sidebar {
    float: left;
    width: 25%;
}

.contenido {
    float: right;
    width: 75%;
}

.contenedor::after {
    content: "";
    display: table;
    clear: both;
}
```

**Moderno:**

```css
.contenedor {
    display: grid;
    grid-template-columns: 1fr 3fr;
}
```

### 7.3 Grellas de produtos

**Código legado:**

```css
.producto {
    float: left;
    width: 25%;
    padding: 1rem;
}
```

**Moderno:**

```css
.galeria {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}
```

---

## 8. Erros frecuentes

### 8.1 Contedor que colapsa

O erro máis común. O contedor non medra para conter os fillos flotantes.

**Solución:** `display: flow-root` no contedor, ou un clearfix.

### 8.2 Elementos que non caben na fila

Cando hai varios floats e o ancho non é suficiente, o último baixa á liña seguinte. Isto pode romper layouts que contan con que todos estean na mesma liña.

**Solución:** calcular ben os anchos, ou usar Flexbox (que permite envolver con `flex-wrap: wrap`).

### 8.3 Texto que se solapa coa imaxe

Se a imaxe é moi estreita e o texto moi longo, pode quedar cortado ou solapado.

**Solución:** dar á imaxe un ancho adecuado e unha marxe.

### 8.4 Usar floats para maquetar hoxe

Aínda que funciona, é unha mala práctica hoxe. Usa Flexbox ou Grid.

---

## 9. Compatibilidade (2026)

Os floats están soportados universalmente desde CSS1. `display: flow-root` está soportado universalmente desde 2020.

---

## 10. Exercicios

### Exercicio 1: Imaxe flotante

Crea unha páxina cun artigo e unha imaxe que flote á dereita, cunha marxe de 1rem, e texto que flúa ao seu redor. O contedor debe conter a imaxe.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.artigo {
    display: flow-root;
    padding: 2rem;
}

.imaxe-flotante {
    float: right;
    width: 300px;
    margin: 0 0 1rem 1rem;
    border-radius: 8px;
}
```

</details>

### Exercicio 2: Drop caps

Crea unha primeira letra grande nun artigo, que ocupe as primeiras tres liñas de texto.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.articulo p:first-of-type::first-letter {
    float: left;
    font-size: 4rem;
    line-height: 0.8;
    padding: 0 0.5rem 0 0;
    font-weight: bold;
    color: #1a5c8a;
}
```

</details>

### Exercicio 3: Modernizar

Converte este código con floats a Flexbox:

```css
.contenedor {
    display: flow-root;
}

.columna {
    float: left;
    width: 33.333%;
    padding: 1rem;
}
```

<details>
<summary><b>Amosar a solución</b></summary>

```css
.contenedor {
    display: flex;
    gap: 1rem;
}

.columna {
    flex: 1;
    padding: 1rem;
}
```

</details>

---

## 11. Para profundar

- **MDN Web Docs:** [Floats](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Floats) — guía completa.
- **MDN Web Docs:** [clear](https://developer.mozilla.org/en-US/docs/Web/CSS/clear) — referencia da propiedade.
- **CSS-Tricks:** [The Clearfix: Force an Element To Self-Clear its Children](https://css-tricks.com/snippets/css/clear-fix/) — historia do clearfix.
- **A List Apart:** [CSS Floats 101](https://alistapart.com/article/css-floats-101/) — artigo clásico.

---

## 12. Referencias cruzadas

- **Capítulo 6: `display`, fluxo normal e posicionamento** — contexto xeral de como se organiza o contido.
- **Capítulo 8: Flexbox** — substituto moderno dos floats para maquetar.
- **Capítulo 9: Grid** — o outro substituto moderno.
- **Capítulo 24: Rendemento e boas prácticas** — cando evitar floats.

---

**Data de creación:** 2026-09-17  
**Última revisión:** 2026-09-17  
**Estado:** Borrador para validación
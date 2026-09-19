---
title: "`display`, fluxo normal e posicionamento"
description: "Descrición do fluxo normal, dos valores de `display`, do posicionamento e do apilamento de elementos con `z-index`."
bloque: 2
capitulo: 6
nivel: intermedio
ultima_revision: "2026-09-17"
estado: "borrador_para_validacion"
compatibilidade: "universal"
palabras_chave:
  - display
  - fluxo_normal
  - posicionamento
  - position
  - static
  - relative
  - absolute
  - fixed
  - sticky
  - z_index
  - elementos_bloque
  - elementos_en_liña
---

<!-- # Capítulo 6: `display`, fluxo normal e posicionamento -->

> O **fluxo normal** é a forma por defecto en que o navegador coloca os elementos nunha páxina: os de bloque un tras outro, os en liña seguidos. A propiedade **`display`** permite cambiar ese comportamento. A propiedade **`position`** permite sacar elementos do fluxo normal e colocalos onde queiras. Este capítulo explica como se organiza o contido e como intervir sobre esa organización cando o necesites.

---

## 1. Introdución: como se organiza o contido sen facer nada

Cando escribes HTML e non aplicas ningún CSS de maquetación, o navegador xa coloca os elementos dunha forma determinada. Os títulos van un tras outro, os parágrafos tamén, as ligazóns flúen dentro do texto, as imaxes aparecen onde as poñas. Isto chámase **fluxo normal** (en inglés, *normal flow*).

Entender o fluxo normal é fundamental por dous motivos:

1. **É o comportamento por defecto.** Moitas veces non necesitas facer nada para conseguir o que queres. Se entendes como funciona o fluxo, evitas CSS innecesario.
2. **Cando interveñas, ti decídelo.** Se cambias o `display` dun elemento ou aplicas un posicionamento, estás a alterar o fluxo. Saber que estabas a cambiar (e por que) evita resultados inesperados.

Neste capítulo vemos:

- Como funciona o fluxo normal.
- Que son os contextos de formato (e por que importan).
- Como se usan os distintos valores de `display`.
- Como se posicionan elementos con `position` (relative, absolute, fixed, sticky).
- Que é o `z-index` e como funciona o apilamento de elementos.

É un capítulo longo porque xunta dous temas moi relacionados: como se organiza o contido por defecto, e como se altera esa organización cando o necesitas.

> 💡 **Para pensar:** En CSS moderno, a maioría das maquetacións fanse con **Flexbox** (Cap. 8) ou **Grid** (Cap. 9). Estes dous modos de layout substitúen na práctica a combinación de fluxo normal, floats e posicionamento absoluto que se usaba hai 15 anos. Pero entender o fluxo normal e o posicionamento segue sendo necesario: son a **base** sobre a que se constrúen os demais modos.

---

## 2. O fluxo normal

### 2.1 Que é o fluxo normal

O **fluxo normal** é a forma en que o navegador coloca os elementos por defecto, sen intervención de CSS específico. Funciona así:

- Os **elementos de bloque** (`<div>`, `<p>`, `<h1>`, `<section>`...) colócanse **un debaixo doutro**, ocupando todo o ancho dispoñible do seu contedor.
- Os **elementos en liña** (`<span>`, `<a>`, `<strong>`...) flúen **dentro do texto**, un tras outro, ocupando só o ancho do seu contido.
- Os elementos en liña **rómpense en varias liñas** se non caben, como o texto normal.

**Exemplo:**

```html
<div>Primeiro bloque.</div>
<div>Segundo bloque.</div>
<p>Un parágrafo con <strong>texto en negra</strong> e <a href="#">unha ligazón</a> dentro.</p>
```

Sen CSS, o resultado visual sería:

```
Primeiro bloque.
Segundo bloque.
Un parágrafo con texto en negra e unha ligazón dentro.
```

Cada `<div>` ocupa unha liña, o `<p>` tamén, e dentro do `<p>` os elementos en liña flúen como parte do texto.

### 2.2 Como se comportan os elementos de bloque

Un elemento de bloque, por defecto:

- Ocupa **todo o ancho** do seu contedor (aínda que o contido non chegue a ocupalo).
- Comeza **nunha liña nova**.
- O seguinte elemento de bloque comeza **tamén nunha liña nova**.
- Acepta `width`, `height`, `margin`, `padding`, `border`.

```css
div {
    background: lightblue;
    /* sen width explícito, ocupa todo o ancho dispoñible */
}
```

### 2.3 Como se comportan os elementos en liña

Un elemento en liña, por defecto:

- Ocupa só o ancho do seu **contido**.
- **Non** comeza nunha liña nova; flúe dentro do texto.
- **Ignora** `width` e `height` (aínda que os pongas).
- As marxes e paddings verticais aplícanse visualmente pero **non empurran as liñas veciñas**.
- Os paddings e marxes horizontais si funcionan normalmente.

```css
span {
    background: lightyellow;
    padding: 10px;   /* aplícase visualmente */
    margin-top: 20px; /* non afecta ao layout */
}
```

Este comportamento sorprende moito ao principio, pero é coherente coa idea de que os elementos en liña son parte do texto, non caixas independentes.

### 2.4 O valor `inline-block`

Existe un valor intermedio: `inline-block`. Combina características dos dous:

- Colócase **en liña** con outros elementos (non rompe a liña).
- **Acepta** `width`, `height`, `margin` e `padding` como un elemento de bloque.

```css
.boton {
    display: inline-block;
    width: 150px;
    padding: 10px;
    margin: 5px;
    background: #1a5c8a;
    color: white;
    text-align: center;
}
```

Múltiples botóns con `inline-block` colócanse un ao lado do outro, pero cada un ten o seu tamaño.

---

## 3. A propiedade `display`

A propiedade `display` controla **como se comporta un elemento no layout**. É unha das propiedades máis importantes de CSS.

### 3.1 Valores principais

| Valor                    | Que fai                                                                       |
| ------------------------ | ----------------------------------------------------------------------------- |
| `block`                  | Comportamento de bloque (ocupa todo o ancho, liña nova).                      |
| `inline`                 | Comportamento en liña (ancho do contido, flúe co texto).                      |
| `inline-block`           | Mestura: en liña, pero con tamaño controlable.                                |
| `none`                   | O elemento **desaparece completamente** (non ocupa espazo).                   |
| `flex`                   | Converte o elemento en contedor Flexbox (Cap. 8).                             |
| `grid`                   | Converte o elemento en contedor Grid (Cap. 9).                                |
| `flow-root`              | Como `block`, pero crea un contexto de formato que evita o colapso de marxes. |
| `contents`               | O elemento desaparece pero os fillos seguen visibles.                         |
| `table`, `table-cell`... | Comportamento de táboa (legado, úsase pouco hoxe).                            |

### 3.2 `display: none` fronte a `visibility: hidden`

Hai unha diferenza importante entre dúas formas de «ocultar» un elemento:

- **`display: none`:** o elemento desaparece **e non ocupa espazo**. Como se non existise no layout.
- **`visibility: hidden`:** o elemento é invisible **pero segue ocupando o seu espazo**. Deixa un burato baleiro.

```css
.desaparece {
    display: none;      /* o seguinte elemento ocupa o seu sitio */
}

.invisible {
    visibility: hidden; /* o sitio queda baleiro */
}
```

**Cando usar cada un:**

- `display: none`: cando queres eliminar completamente o elemento (por exemplo, un menú que se oculta).
- `visibility: hidden`: menos habitual. Úsase cando queres reservar o espazo (por exemplo, manter a estrutura dunha grella).

> ⚠️ **Accesibilidade:** os elementos con `display: none` **non son lidos polos lectores de pantalla**. Os elementos con `visibility: hidden` si o son (aínda que non se vexan). Hai que ter isto en conta se estás a ocultar contido que debería ser accesible.

### 3.3 Cando usar cada valor

- **`block`:** para elementos estruturais como seccións, artigos, divs contedores.
- **`inline`:** raramente se cambia a este valor. Normalmente úsase o que o elemento xa ten por defecto.
- **`inline-block`:** para botóns, etiquetas, elementos que deben fluír pero ter tamaño.
- **`none`:** para ocultar elementos en determinadas condicións.
- **`flex` ou `grid`:** cando se constrúe un layout nestes sistemas (ver Cap. 8 e 9).
- **`flow-root`:** para crear un contexto de formato e evitar problemas de colapso de marxes.

---

## 4. Contextos de formato

Un **contexto de formato** é unha zona onde os elementos seguen unhas regras de layout determinadas. Hai varios tipos, pero os principais son:

- **Block formatting context (BFC):** os elementos colócanse verticalmente.
- **Inline formatting context:** os elementos flúen como texto.
- **Flex formatting context:** os elementos organízanse segundo Flexbox.
- **Grid formatting context:** os elementos organízanse segundo Grid.

**Por que importa isto:** cando creas un BFC (con `display: flow-root`, `overflow: hidden`, `display: flex`, etc.), evitas que as marxes dos fillos «escapen» ao exterior, e contés os elementos flotantes (floats) dentro do contedor.

**Como crear un BFC:**

```css
.pai {
    display: flow-root;
}
```

ou

```css
.pai {
    overflow: hidden;  /* funciona, pero pode cortar contido */
}
```

**Recomendación:** usa `display: flow-root` cando necesites un BFC limpo. É a forma moderna e non ten efectos secundarios.

---

## 5. Posicionamento

A propiedade `position` permite **sacar elementos do fluxo normal** e colocalos onde queiras.

### 5.1 `position: static` (por defecto)

É o valor por defecto. O elemento segue o fluxo normal. As propiedades `top`, `right`, `bottom` e `left` **non teñen efecto**.

```css
p {
    position: static;
}
```

### 5.2 `position: relative`

O elemento **segue ocupando o seu sitio no fluxo**, pero pódese **desprazar** respecto á súa posición orixinal usando `top`, `right`, `bottom` e `left`.

```css
.relativo {
    position: relative;
    top: 10px;   /* despraza 10px cara abaixo */
    left: 20px;  /* despraza 20px cara á dereita */
}
```

**Cousas a ter en conta:**

- O espazo orixinal **segue reservado**. Os elementos veciños non se moven.
- Se desprazas un elemento, pode superpoñerse aos veciños.
- `top` e `bottom` son incompatibles (se pos os dous, gaña `top`). O mesmo con `left` e `right`.

**Usos principais:**

- Axustes finos de posición.
- **Como «pai de referencia» para fillos en `position: absolute`.** Este é o uso máis habitual (ver 5.3).

### 5.3 `position: absolute`

O elemento **sae completamente do fluxo normal** e colócase respecto ao **antepasado posicionado máis próximo** (é dicir, un antepasado que teña `position` distinto de `static`). Se non hai ningún, colócase respecto ao documento enteiro.

```css
.pai {
    position: relative;  /* convértese en referencia */
}

.fillo {
    position: absolute;
    top: 0;
    right: 0;
}
```

**Cousas a ter en conta:**

- **O elemento absoluto xa non ocupa espazo** no fluxo. Os veciños actúan como se non existise.
- **O punto de referencia é o antepasado posicionado.** Se ningún antepasado ten `position`, o punto de referencia é o `<html>` (a ventá inicial).
- As propiedades `top`, `right`, `bottom`, `left` indican a distancia desde os bordos dese antepasado.

**Usos principais:**

- Elementos que se superpoñen a outros: menús despregables, tooltips, badges de notificación.
- Elementos decorativos fóra do fluxo.
- Layouts complexos onde un elemento debe colocarse nunha posición exacta.

**Exemplo: badge de notificación**

```html
<button class="boton">
    Mensaxes
    <span class="badge">3</span>
</button>
```

```css
.boton {
    position: relative;
    padding: 0.75rem 1.5rem;
}

.badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: red;
    color: white;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
}
```

O botón ten `position: relative` para crear o contexto, e o badge ten `position: absolute` para colocarse na súa esquina superior dereita.

### 5.4 `position: fixed`

O elemento **sae do fluxo** e colócase respecto á **ventá do navegador**. **Non se move ao facer scroll**: queda fixo na pantalla.

```css
.cabecera-fixa {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

**Usos principais:**

- Cabeceiras que quedan sempre visibles.
- Botóns flotantes (por exemplo, «volver arriba»).
- Barras de navegación laterais fixas.
- Modais e diálogos que cobren a pantalla.

**Coidado:** un elemento `fixed` **sae completamente do fluxo** e pode tapar contido. Se tes unha cabeceira fixa, o contido de abaixo pode quedar oculto; normalmente engádese un `padding-top` ao `<body>` para compensar.

### 5.5 `position: sticky`

**Mestura** entre `relative` e `fixed`. O elemento compórtase como `relative` ata que se alcanza un **limiar** (indicado con `top`, `bottom`, etc.), momento no que se comporta como `fixed`.

```css
.encabezado-seccion {
    position: sticky;
    top: 0;
    background: white;
    padding: 1rem;
    border-bottom: 1px solid #eee;
}
```

**Cousas a ter en conta:**

- **O elemento segue ocupando o seu espazo** no fluxo (a diferenza de `fixed`).
- **Só funciona se o contedor ten scroll** (é dicir, se hai contido abondo para desprazarse).
- **O contedor non pode ter `overflow: hidden`** (ou o sticky non funcionará).

**Usos principais:**

- Encabezados de sección que quedan fixos mentres se fai scroll dentro da sección.
- Índices laterais que seguen o scroll.
- Cabeceiras que aparecen ao subir e desaparecen ao baixar (con algo de lóxica adicional).

**Compatibilidade:** `position: sticky` ten soporte universal desde 2017. **Coidado** con navegadores moi antigos, pero hoxe non hai problema.

### 5.6 Resumo visual

| Valor      | No fluxo? | Referencia para `top`/`left`        | Cando usar                             |
| ---------- | --------- | ----------------------------------- | -------------------------------------- |
| `static`   | Si        | (ningunha)                          | Por defecto                            |
| `relative` | Si        | A súa posición orixinal             | Axustes finos; contexto para absolutos |
| `absolute` | Non       | Antepasado posicionado máis próximo | Superpoñer elementos                   |
| `fixed`    | Non       | A ventá                             | Cabeceiras, botóns flotantes           |
| `sticky`   | Si        | O contedor (ata un limiar)          | Encabezados que seguen o scroll        |

---

## 6. `z-index` e apilamento

Cando dous elementos se superpoñen (por exemplo, cun posicionamento), é necesario decidir cal queda **enriba** e cal **debaiXO**. Iso faise coa propiedade `z-index`.

```css
.modal {
    position: fixed;
    z-index: 1000;
}

.aviso-temporal {
    position: fixed;
    z-index: 900;   /* queda debaixo do modal */
}
```

**Regras básicas:**

- Só funciona en elementos **posicionados** (`relative`, `absolute`, `fixed`, `sticky`). Nos elementos `static`, `z-index` ignórase.
- **Valores máis altos quedan enriba.**
- Pode ser negativo.
- Por defecto, un elemento posicionado ten `z-index: auto` (comportamento automático).

**Contextos de apilamento:** cada elemento que crea un contexto de apilamento (por exemplo, cun `position` distinto de `static` e un `z-index` distinto de `auto`) é unha «caixa» pechada. Os `z-index` dos fillos son relativos a ese contexto, non ao documento enteiro. Isto é unha fonte de confusión moi común, pero non hai que preocuparse por iso ao comezo.

---

## 7. Exemplo mínimo funcional

Vexamos unha páxina que combina fluxo normal, `display`, posicionamento e `z-index`.

**Arquivo HTML:**

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <title>Fluxo normal e posicionamento</title>
    <link rel="stylesheet" href="estilos/fluxo.css">
</head>
<body>
    <header class="cabecera-fixa">
        <h1>Unha cabeceira fixa</h1>
    </header>

    <main class="contido">
        <article>
            <h2>Un título</h2>
            <p>
                Este é un parágrafo normal, no fluxo. O seguinte
                parágrafo ten unha <span class="destacado">palabra
                destacada</span> e segue no fluxo normal.
            </p>
            <p>
                Este parágrafo tamén segue o fluxo.
            </p>

            <div class="tarxeta-posicionada">
                Tarxeta con posición relativa.
                <span class="etiqueta">Novo</span>
            </div>

            <p style="margin-top: 4rem;">
                O contido segue despois da tarxeta.
            </p>
        </article>

        <section class="seccion-con-sticky">
            <h3 class="encabezado-sticky">Encabezado sticky</h3>
            <p>Contido da sección 1.</p>
            <p>Contido da sección 2.</p>
            <p>Contido da sección 3.</p>
            <p>Contido da sección 4.</p>
            <p>Contido da sección 5.</p>
        </section>
    </main>

    <button class="boton-flotante">↑</button>
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
    padding-top: 80px; /* espazo para a cabeceira fixa */
}

/* ==============================
   Cabeceira fixa
   ============================== */
.cabecera-fixa {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #1a5c8a;
    color: white;
    padding: 1rem 2rem;
    z-index: 100;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

/* ==============================
   Contido principal
   ============================== */
.contido {
    max-width: 720px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
}

.destacado {
    background: #fef9c3;
    padding: 0.1em 0.3em;
    border-radius: 3px;
}

/* ==============================
   Tarxeta con posición relativa e etiqueta absoluta
   ============================== */
.tarxeta-posicionada {
    position: relative;
    background: #f5f5f5;
    padding: 2rem;
    margin: 2rem 0;
    border-radius: 8px;
}

.etiqueta {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #ca8a04;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
}

/* ==============================
   Encabezado sticky
   ============================== */
.seccion-con-sticky {
    margin-top: 3rem;
}

.encabezado-sticky {
    position: sticky;
    top: 80px; /* xusto debaixo da cabeceira fixa */
    background: #fef9c3;
    padding: 0.75rem 1rem;
    border-left: 4px solid #ca8a04;
}

/* ==============================
   Botón flotante
   ============================== */
.boton-flotante {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #1a5c8a;
    color: white;
    border: none;
    font-size: 1.25rem;
    cursor: pointer;
    z-index: 50;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
```

**Que está a pasar aquí:**

1. **A cabeceira** é `position: fixed`, queda sempre enriba da pantalla. Para que o contido non quede oculto detrás, o `body` ten `padding-top: 80px`.
2. **Os parágrafos** seguen o fluxo normal, un debaixo doutro.
3. **A palabra destacada** é un `<span>` (elemento en liña), flúe co texto.
4. **A tarxeta** ten `position: relative`, o que serve de referencia para a etiqueta.
5. **A etiqueta «Novo»** é `position: absolute`, colocada no recuncho superior dereito da tarxeta grazas ao `top: 10px; right: 10px`. Non ocupa espazo no fluxo.
6. **O encabezado sticky** queda fixo ao facer scroll pola súa sección.
7. **O botón flotante** é `position: fixed`, sempre visible no recuncho inferior dereito.

---

## 8. Casos habituais na práctica

### 8.1 Cabeceira fixa con contido compensado

```css
.cabecera {
    position: fixed;
    top: 0;
    width: 100%;
    height: 64px;
    z-index: 100;
}

body {
    padding-top: 64px;  /* compensa a altura da cabeceira */
}
```

### 8.2 Menú despregable

```css
.menu-item {
    position: relative;
}

.submenu {
    position: absolute;
    top: 100%;
    left: 0;
    display: none;
}

.menu-item:hover .submenu {
    display: block;
}
```

### 8.3 Modal centrado

```css
.modal-fondo {
    position: fixed;
    inset: 0;  /* atallo para top/right/bottom/left: 0 */
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}
```

O uso de `inset: 0` é un atallo moderno que substitúe `top: 0; right: 0; bottom: 0; left: 0;`.

### 8.4 Elemento que sae do contedor (sen afectar ao layout)

```css
.decoracion {
    position: absolute;
    top: -20px;
    right: -20px;
}
```

Útil para amosar elementos decorativos fóra dos límites do contedor sen empurrar o contido.

---

## 9. Erros frecuentes

### 9.1 Pór `position: absolute` sen un pai `relative`

```css
.fillo {
    position: absolute;
    top: 0;
    right: 0;
}
```

Se ningún antepasado ten `position` distinto de `static`, o fillo colócase respecto ao documento enteiro, o que case nunca é o que se quere.

**Solución:** engade `position: relative` ao pai que queiras como referencia.

### 9.2 Usar `position: fixed` sen compensar o contido

Se pos unha cabeceira fixa e non engades `padding-top` ao contido, a cabeceira tapa a parte superior do contido.

**Solución:** engade `padding-top` ao `<body>` ou ao elemento que conteña o contido, igual á altura da cabeceira.

### 9.3 `z-index` que non funciona

Se aplicas `z-index` a un elemento `static`, ignórase. **Solución:** dá `position` distinto de `static` ao elemento antes de aplicar `z-index`.

### 9.4 Contexto de apilamento inesperado

Se un fillo ten `z-index: 9999` pero segue debaixo doutro elemento, probablemente o **pai** ten un `z-index` menor. O fillo non pode «escapar» do contexto de apilamento do pai. **Solución:** revisa os `z-index` dos antepasados.

### 9.5 `sticky` que non funciona

As causas máis habituais:

- O elemento pai ten `overflow: hidden` ou `overflow: auto`.
- O elemento non ten un `top` (ou `bottom`/`left`/`right`) definido.
- O contedor non ten suficiente altura para facer scroll.

**Solución:** revisa esas tres cousas.

### 9.6 Abusar de `position: absolute` para maquetar

Se te atopas usando `position: absolute` con valores como `top: 200px; left: 350px;` para colocar elementos, probablemente haxa unha mellor forma (Flexbox, Grid). O posicionamento absoluto é útil para **superpoñer** elementos, non para maquetar.

---

## 10. Compatibilidade (2026)

| Característica                          | Estado                                    |
| --------------------------------------- | ----------------------------------------- |
| `display: block / inline / none`        | Universal desde CSS1                      |
| `display: inline-block`                 | Universal desde hai anos                  |
| `position: relative / absolute / fixed` | Universal desde CSS2                      |
| `position: sticky`                      | Universal desde 2017                      |
| `display: flow-root`                    | Baseline desde 2020                       |
| `inset`                                 | Baseline desde 2021                       |
| `display: contents`                     | Universal (con matices en accesibilidade) |

---

## 11. Exercicios

### Exercicio 1: `display`

Dado este HTML:

```html
<div>Elemento 1</div>
<span>Elemento 2</span>
<div>Elemento 3</div>
```

Cal será o resultado visual? Que pasa se cambias `div { display: inline; }` e `span { display: block; }`?

<details>
<summary><b>Amosar a solución</b></summary>

Por defecto, os dous `<div>` ocupan unha liña cada un, e o `<span>` flúe dentro da súa liña. Se cambias os `display`, os `<div>` flúen como texto e os `<span>` ocupan unha liña cada un.

</details>

### Exercicio 2: `relative` + `absolute`

Crea un contedor con `position: relative` e un fillo con `position: absolute` que se coloque na esquina inferior esquerda do contedor.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.pai {
    position: relative;
    height: 200px;
    background: #f5f5f5;
}

.fillo {
    position: absolute;
    bottom: 0;
    left: 0;
    background: #1a5c8a;
    color: white;
    padding: 0.5rem 1rem;
}
```

</details>

### Exercicio 3: Cabeceira fixa

Crea unha cabeceira que quede sempre fixa na parte superior da pantalla, cunha altura de 60px, e un contido que non quede oculto por ela.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.cabecera {
    position: fixed;
    top: 0;
    width: 100%;
    height: 60px;
    background: #1a5c8a;
    color: white;
    z-index: 100;
}

body {
    padding-top: 60px;
}
```

</details>

### Exercicio 4: Sticky

Crea unha lista de seccións onde cada encabezado quede fixo na parte superior mentres se fai scroll por esa sección.

<details>
<summary><b>Amosar a solución</b></summary>

```css
h2 {
    position: sticky;
    top: 0;
    background: white;
    padding: 1rem 0;
    border-bottom: 1px solid #eee;
}
```

</details>

### Exercicio 5: `z-index`

Dados tres elementos posicionados, escribe CSS para que queden apilados na orde: A abaixo, B no medio, C enriba.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.a { position: relative; z-index: 1; }
.b { position: relative; z-index: 2; }
.c { position: relative; z-index: 3; }
```

</details>

---

## 12. Para profundar

- **MDN Web Docs:** [Normal Flow](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Normal_Flow) — fluxo normal.
- **MDN Web Docs:** [position](https://developer.mozilla.org/en-US/docs/Web/CSS/position) — referencia da propiedade.
- **MDN Web Docs:** [display](https://developer.mozilla.org/en-US/docs/Web/CSS/display) — referencia da propiedade.
- **MDN Web Docs:** [Understanding z-index](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index) — artigo detallado sobre `z-index`.
- **web.dev:** [Learn CSS: Layout](https://web.dev/learn/css/layout) — lección interactiva.
- **W3C:** [CSS Positioned Layout Module Level 3](https://www.w3.org/TR/css-position-3/) — especificación.

---

## 13. Referencias cruzadas

- **Capítulo 5: Modelo de caixa** — explica `margin`, `padding` e `border`, que se usan aquí constantemente.
- **Capítulo 7: Floats** — outro xeito de sacar elementos do fluxo, aínda que en desuso.
- **Capítulo 8: Flexbox** — modo de layout que substitúe a moitas maquetacións con posicionamento.
- **Capítulo 9: Grid** — o outro modo de layout moderno.
- **Capítulo 13: Unidades relativas e funcións modernas** — para valores como `inset: 0`.
- **Capítulo 24: Rendemento e boas prácticas** — cando usar e cando non usar posicionamento.

---

**Data de creación:** 2026-09-17  
**Última revisión:** 2026-09-17  
**Estado:** Borrador para validación
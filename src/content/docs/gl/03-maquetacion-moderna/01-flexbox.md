---
title: "Flexbox"
description: "Guía práctica de Flexbox para organizar, aliñar e distribuír elementos ao longo dun único eixe."
bloque: 3
capitulo: 8
nivel: intermedio
ultima_revision: "2026-09-17"
estado: "borrador_para_validacion"
compatibilidade: "universal"
palabras_chave:
  - flexbox
  - flexible_box_layout
  - display_flex
  - justify_content
  - align_items
  - flex_direction
  - flex_wrap
  - gap
  - flex_grow
  - flex_shrink
  - flex_basis
  - layout_unidimensional
---

<!-- # Capítulo 8: Flexbox -->

> **Flexbox** (Flexible Box Layout, *caixa flexible*) é un sistema de maquetación **unidimensional** que organiza elementos nunha fila ou nunha columna, distribuíndo o espazo dispoñible entre eles. É a ferramenta máis usada en CSS moderno para compoñentes, barras de navegación, tarxetas, formularios e calquera cousa que teña que aliñarse ou distribuírse ao longo dun eixe. Este capítulo explica como funciona, desde os conceptos básicos ata os casos prácticos máis frecuentes.

---

## 1. Introdución: por que Flexbox cambiou o CSS

Durante anos, maquetar en CSS era complicado. Para poñer dous elementos un ao lado do outro había que usar floats, clearfixes e trucos. Para centrar verticalmente un elemento había que facer malabares con `position` e `transform`. Para facer que dous elementos se repartisen o espazo dispoñible había que calcular porcentaxes a man.

**Flexbox** resolveu todo isto dunha vez. Apareceu como borrador en 2009, estabilizouse en 2012-2015, e hoxe está soportado universalmente. A idea central é simple: **ti defines un contedor flexible e os fillos distribúense automaticamente segundo as regras que lle deas**. Xa non hai que calcular posicións; o navegador fai os cálculos por ti.

Flexbox é **unidimensional**: organiza elementos ao longo dun **eixe** (horizontal ou vertical), unha soa dirección á vez. Se necesitas dúas dimensións (filas e columnas á vez), usarás Grid (Cap. 9). Moitas maquetacións, con todo, fanse só con Flexbox: barras de navegación, listas de tarxetas, formularios, botóns con iconas, cabeceiras con logo e menú, pés de páxina con varias seccións, etc.

> 💡 **Para pensar:** Cando te atopas a pensar «necesito poñer estes elementos un ao lado do outro», «necesito centrar isto verticalmente», «necesito que este ocupe todo o espazo dispoñible», ou «necesito que estes elementos se repartan o espazo», probablemente Flexbox é a ferramenta que buscas.

---

## 2. Conceptos fundamentais

Antes de ver propiedades, hai que entender tres conceptos que son a base de todo o sistema.

### 2.1 Contedor e fillos

Flexbox funciona con dous roles:

- **Contedor flexible (flex container):** o elemento ao que se lle aplica `display: flex` ou `display: inline-flex`. É o que organiza os fillos.
- **Fillos flexibles (flex items):** os fillos directos do contedor. Son os que se distribúen.

**Importante:** só os **fillos directos** se comportan como elementos flexibles. Os netos non. Se queres que os netos tamén se distribúan, tes que facer que o seu pai (fillo directo) sexa tamén un contedor flexible.

```html
<div class="contedor">
    <div class="fillo">A</div>   <!-- este é flex item -->
    <div class="fillo">B</div>   <!-- este tamén -->
</div>
```

```css
.contedor {
    display: flex;
}
```

Os fillos `.fillo` convértense automaticamente en elementos flexibles.

### 2.2 Eixe principal e eixe transversal

Flexbox organízase en dous eixes:

- **Eixe principal (main axis):** a dirección na que se colocan os fillos. Por defecto é **horizontal** (de esquerda a dereita).
- **Eixe transversal (cross axis):** a dirección perpendicular ao principal. Por defecto é **vertical** (de arriba a abaixo).

```
         Eixe transversal
              ↓
   ┌───────────────────────────┐
   │  ┌───┐  ┌───┐  ┌───┐      │
   │  │ A │  │ B │  │ C │  →   │  ← Eixe principal
   │  └───┘  └───┘  └───┘      │
   └───────────────────────────┘
```

**Punto clave:** todo se define respecto ao eixe principal. Cando mudas a dirección do eixe principal (con `flex-direction`), todo o demais cambia en consecuencia.

### 2.3 Dirección: `flex-direction`

A propiedade `flex-direction` define cal é o eixe principal:

```css
.contedor {
    display: flex;
    flex-direction: row;  /* por defecto */
}
```

Valores:

| Valor            | Eixe principal                 | Resultado                    |
| ---------------- | ------------------------------ | ---------------------------- |
| `row`            | Horizontal, esquerda → dereita | Fillos en fila.              |
| `row-reverse`    | Horizontal, dereita → esquerda | Fillos en fila invertida.    |
| `column`         | Vertical, arriba → abaixo      | Fillos en columna.           |
| `column-reverse` | Vertical, abaixo → arriba      | Fillos en columna invertida. |

**Exemplo:**

```html
<div class="fila">
    <div>1</div>
    <div>2</div>
    <div>3</div>
</div>
```

```css
.fila {
    display: flex;
    flex-direction: row;      /* 1, 2, 3 en fila */
}

.columna {
    display: flex;
    flex-direction: column;   /* 1, 2, 3 en columna */
}
```

> 💡 **Nota cultural:** en galego, cando escribes de esquerda a dereita, o eixe principal dun `row` coincide coa dirección natural de lectura. Noutras culturas (árabe, hebreo) escríbese de dereita a esquerda, e CSS moderno ten propiedades **lóxicas** (`inline-start`, `inline-end`) para que o layout se adapte automaticamente. Verémolo no Cap. 13.

---

## 3. Propiedades do contedor

Estas propiedades aplícanse ao **contedor** e afectan a todos os fillos.

### 3.1 `flex-wrap`: permitir que os fillos pasen á seguinte liña

Por defecto, os fillos tentan caber nunha soa liña, e se non caben, comprímanse. Con `flex-wrap: wrap`, permites que pasen á seguinte liña cando non caben.

```css
.contedor {
    display: flex;
    flex-wrap: wrap;
}
```

Valores:

- **`nowrap`** (por defecto): todos os fillos nunha soa liña.
- **`wrap`:** os fillos pasan á seguinte liña cando non caben.
- **`wrap-reverse`:** como `wrap`, pero as liñas engádense en orde inversa.

**Exemplo:**

```css
.galeria {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.tarxeta {
    width: 200px;
    /* se hai moitas tarxetas, van saltando de liña */
}
```

### 3.2 `justify-content`: distribuír ao longo do eixe principal

Controla como se distribúen os fillos ao longo do **eixe principal**.

```css
.contedor {
    display: flex;
    justify-content: center;
}
```

Valores:

| Valor           | Que fai                                                     |
| --------------- | ----------------------------------------------------------- |
| `flex-start`    | Fillos ao comezo do eixe (por defecto).                     |
| `flex-end`      | Fillos ao final do eixe.                                    |
| `center`        | Fillos centrados.                                           |
| `space-between` | O primeiro ao comezo, o último ao final, o resto repartido. |
| `space-around`  | Cada fillo ten espazo arredor (a metade nas beiras).        |
| `space-evenly`  | Espazo igual entre fillos e nas beiras.                     |

**Exemplo visual (eixe horizontal):**

```
flex-start:      [A][B][C]...............
flex-end:        ...............[A][B][C]
center:          .......[A][B][C].......
space-between:   [A]......[B]......[C]
space-around:    ..[A]...[B]...[C]..
space-evenly:    ...[A]..[B]..[C]...
```

**Uso habitual:**

- `space-between`: barras de navegación (logo á esquerda, menú á dereita).
- `center`: centrar horizontalmente un grupo de elementos.
- `space-around` ou `space-evenly`: distribución uniforme.

### 3.3 `align-items`: aliñar no eixe transversal

Controla como se aliñan os fillos ao longo do **eixe transversal**.

```css
.contedor {
    display: flex;
    align-items: center;
}
```

Valores:

| Valor        | Que fai                                                |
| ------------ | ------------------------------------------------------ |
| `stretch`    | Fillos estirados para encher o contedor (por defecto). |
| `flex-start` | Fillos ao comezo do eixe transversal.                  |
| `flex-end`   | Fillos ao final do eixe transversal.                   |
| `center`     | Fillos centrados no eixe transversal.                  |
| `baseline`   | Aliña as bases do texto dos fillos.                    |

**Exemplo (eixe principal horizontal):**

```
              contedor
   ┌─────────────────────────────┐
   │                             │
   │   ┌───┐                     │  align-items: flex-start
   │   │ A │                     │
   │   └───┘                     │
   └─────────────────────────────┘

   ┌─────────────────────────────┐
   │                             │
   │                     ┌───┐   │  align-items: flex-end
   │                     │ A │   │
   │                     └───┘   │
   └─────────────────────────────┘

   ┌─────────────────────────────┐
   │                             │
   │          ┌───┐              │  align-items: center
   │          │ A │              │
   │          └───┘              │
   └─────────────────────────────┘
```

**Uso habitual:** `align-items: center` é probablemente o valor máis usado de todo Flexbox. Serve para centrar verticalmente os fillos nun contedor dunha soa liña.

### 3.4 `align-content`: distribuír entre liñas

Cando hai **varias liñas** (porque usaches `flex-wrap: wrap`), `align-content` controla como se distribúen as liñas no eixe transversal.

```css
.contedor {
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
}
```

Valores: mesmos que `justify-content`, pero actuando sobre as liñas.

**Importante:** `align-content` só ten efecto cando hai **máis dunha liña**. Se só hai unha liña, `align-content` ignórase.

### 3.5 `gap`: espazo entre fillos

A propiedade `gap` engade espazo entre fillos sen necesidade de marxes.

```css
.contedor {
    display: flex;
    gap: 1rem;              /* mesmo espazo entre fillos e entre liñas */
    gap: 1rem 2rem;         /* filas 1rem, columnas 2rem */
    row-gap: 1rem;          /* só entre filas */
    column-gap: 2rem;       /* só entre columnas */
}
```

**Vantaxe fronte a marxes:** non hai que usar `:last-child` para eliminar a marxe do último. E non hai colapso de marxes entre fillos flexibles.

**Compatibilidade:** `gap` en Flexbox é relativamente recente (2020), pero está soportado universalmente desde 2021.

---

## 4. Propiedades dos fillos

Estas propiedades aplícanse aos **fillos** e controlan o seu comportamento dentro do contedor.

### 4.1 `flex-grow`: canto pode medrar

Indica canto pode medrar un fillo para ocupar espazo libre do contedor.

```css
.fillo {
    flex-grow: 1;   /* medra para encher espazo */
}
```

- `0` (por defecto): o fillo non medra.
- `1` ou maior: o fillo medra proporcionalmente.

**Exemplo:**

```html
<div class="contedor">
    <div class="fixo">Fixo</div>
    <div class="flexible">Flexible</div>
</div>
```

```css
.contedor {
    display: flex;
}

.fixo {
    width: 200px;
    flex-grow: 0;   /* mantén 200px */
}

.flexible {
    flex-grow: 1;   /* ocupa o resto */
}
```

O contedor ocúpano todo. `.fixo` queda con 200px, `.flexible` co resto.

**Exemplo con dous fillos flexibles:**

```css
.a { flex-grow: 1; }
.b { flex-grow: 2; }
```

O fillo `.b` medra o dobre que `.a`. Se hai 300px libres, `.a` queda con 100px e `.b` con 200px.

### 4.2 `flex-shrink`: canto pode encoller

Cando non hai espazo suficiente, `flex-shrink` indica canto pode encoller un fillo.

```css
.fillo {
    flex-shrink: 1;   /* por defecto */
}
```

- `1` (por defecto): o fillo pode encoller.
- `0`: o fillo **non encolle** (mantén o seu tamaño).

**Uso habitual:** `flex-shrink: 0` en elementos que non queres que se compriman (como unha imaxe ou un logo nunha barra de navegación).

### 4.3 `flex-basis`: tamaño inicial

`flex-basis` establece o tamaño **inicial** do fillo antes de que se apliquen `flex-grow` e `flex-shrink`.

```css
.fillo {
    flex-basis: 200px;
    flex-basis: 30%;
    flex-basis: auto;   /* por defecto */
}
```

- `auto`: usa o `width` do fillo (ou o contido).
- Unha lonxitude (`200px`, `30rem`...) ou unha porcentaxe: tamaño fixo de partida.

### 4.4 `flex`: o atallo

`flex` combina `flex-grow`, `flex-shrink` e `flex-basis` nunha soa declaración:

```css
.fillo {
    flex: 1 1 auto;      /* grow shrink basis */
    flex: 1;             /* atallo: 1 1 0 */
    flex: auto;          /* 1 1 auto */
    flex: none;          /* 0 0 auto */
}
```

**Valores moi usados:**

- **`flex: 1`**: o fillo medra para ocupar espazo dispoñible. O máis habitual.
- **`flex: auto`**: como `flex: 1`, pero a base é o tamaño do contido.
- **`flex: none`**: o fillo mantén o seu tamaño, non crece nin encolle.

**Exemplo: tres columnas iguais**

```css
.columnas {
    display: flex;
    gap: 1rem;
}

.columna {
    flex: 1;   /* todas as columnas ocupan o mesmo */
}
```

**Exemplo: sidebar fixa + contido flexible**

```css
.layout {
    display: flex;
    gap: 2rem;
}

.sidebar {
    flex: 0 0 250px;   /* non crece, non encolle, 250px de base */
}

.contenido {
    flex: 1;            /* ocupa o resto */
}
```

### 4.5 `align-self`: sobrescribir `align-items`

Permite que un fillo se aliñe de forma diferente ao resto:

```css
.contedor {
    display: flex;
    align-items: center;
}

.destacado {
    align-self: flex-start;   /* este vai arriba */
}
```

### 4.6 `order`: cambiar a orde visual

Por defecto, os fillos móstranse na orde do HTML. `order` permite cambiar a orde **visual** sen cambiar o HTML:

```css
.primeiro-visual {
    order: -1;
}
```

**Uso con precaución:** pode afectar á accesibilidade, porque a orde visual non coincide coa orde do DOM. Os lectores de pantalla len na orde do DOM, non na orde visual.

**Recomendación:** evita `order` agás en casos moi concretos (por exemplo, para reordenar en móbil sen cambiar o HTML).

---

## 5. Exemplo mínimo funcional

Vexamos unha barra de navegación real, feita con Flexbox, que ilustra case todas as propiedades.

**Arquivo HTML:**

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <title>Barra de navegación con Flexbox</title>
    <link rel="stylesheet" href="estilos/nav.css">
</head>
<body>
    <header class="cabecera">
        <a href="#" class="logo">Programación en Galego</a>
        <nav class="menu">
            <ul>
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Cursos</a></li>
                <li><a href="#">Recursos</a></li>
                <li><a href="#">Contacto</a></li>
            </ul>
        </nav>
    </header>
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
}

/* ==============================
   Cabeceira
   ============================== */
.cabecera {
    display: flex;
    justify-content: space-between;  /* logo á esquerda, menú á dereita */
    align-items: center;              /* centrado vertical */
    padding: 1rem 2rem;
    background: #1a5c8a;
    color: white;
}

.logo {
    font-size: 1.25rem;
    font-weight: 700;
    color: white;
    text-decoration: none;
    flex-shrink: 0;    /* o logo non encolle */
}

.menu ul {
    display: flex;
    gap: 1.5rem;
    list-style: none;
}

.menu a {
    color: white;
    text-decoration: none;
    padding: 0.5rem 0;
    transition: opacity 0.2s;
}

.menu a:hover {
    opacity: 0.8;
}
```

**Que está a pasar aquí:**

1. **`.cabecera`** é un contedor flex.
2. **`justify-content: space-between`** pon o logo á esquerda e o menú á dereita.
3. **`align-items: center`** centra verticalmente ambos.
4. **`.logo`** ten `flex-shrink: 0` para que non se comprima cando a pantalla é estreita.
5. **`.menu ul`** é á súa vez un contedor flex, para poñer os elementos do menú en fila.
6. **`gap: 1.5rem`** separa os elementos do menú.

Se abres o HTML no navegador, verás unha barra azul cun logo á esquerda e un menú á dereita, todo centrado verticalmente. Se redimensionas a ventá, o layout mantense estable.

---

## 6. Casos habituais na práctica

### 6.1 Centrar un elemento (horizontal e vertical)

O caso máis clásico. Para centrar un elemento nun contedor:

```css
.contedor {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}
```

**Nota:** se só necesitas centrar horizontalmente, abonda con `justify-content: center`. Para centrar un elemento en toda a pantalla, necesitas `min-height: 100vh` no contedor.

### 6.2 Columnas de igual altura

Flexbox fai que todos os fillos dunha fila teñan a **mesma altura**, aínda que o contido sexa diferente. Isto é moi útil para tarxetas.

```css
.tarxetas {
    display: flex;
    gap: 1rem;
}

.tarxeta {
    flex: 1;
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    /* todas teñen a mesma altura automaticamente */
}
```

Se queres que o contido dunha tarxeta se estire para ocupar o alto dispoñible, usa `align-items: stretch` no contedor (por defecto) e no fillo podes usar `display: flex; flex-direction: column;` para distribuír o contido interno.

### 6.3 Formularios

Flexbox é moi útil para aliñar etiquetas, campos e botóns:

```css
.campo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.campo label {
    flex: 0 0 120px;   /* etiquetas de ancho fixo */
}

.campo input {
    flex: 1;           /* o campo ocupa o resto */
    padding: 0.5rem;
}
```

### 6.4 Pés de páxina con varias seccións

```css
.pe {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 2rem;
    padding: 2rem;
    background: #1a1a1a;
    color: white;
}

.pe > div {
    flex: 1 1 200px;
}
```

Cada sección do pé ten polo menos 200px de base, pero pode crecer. Se non caben, pasan á seguinte liña.

### 6.5 Botóns con icona

```css
.boton {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
}
```

`inline-flex` fai que o botón se comporte como `inline-block` por fóra (non rompe a liña) pero como contedor flex por dentro.

### 6.6 Empurrar un elemento ao final

Sen usar `justify-content`, podes usar `margin-left: auto` nun fillo para que se empurre á dereita:

```css
.accions {
    display: flex;
}

.accions .pechar {
    margin-left: auto;   /* empurra á dereita */
}
```

Este truco é moi útil cando queres que a maioría dos elementos estean á esquerda pero un á dereita.

---

## 7. Erros frecuentes

### 7.1 Esquecer `display: flex`

As propiedades `justify-content`, `align-items`, etc. **non fan nada** se o contedor non ten `display: flex`. É o erro máis común.

```css
/* Mal: non funciona */
.contedor {
    justify-content: center;
}

/* Ben */
.contedor {
    display: flex;
    justify-content: center;
}
```

### 7.2 Aplicar propiedades do contedor aos fillos

`justify-content` e `align-items` van no **contedor**, non nos fillos. Se as poñes nos fillos, ignóranse.

```css
/* Mal */
.fillo {
    justify-content: center;   /* ignorado */
}

/* Ben */
.contedor {
    display: flex;
    justify-content: center;
}
```

### 7.3 Confundir `justify-content` con `align-items`

- `justify-content`: distribúe no eixe **principal**.
- `align-items`: aliña no eixe **transversal**.

Se cambias `flex-direction`, os dous «cambian de eixe». Se `flex-direction: column`, o eixe principal é vertical, e `justify-content` distribúe verticalmente. Isto confunde moito ao principio.

### 7.4 Esperar que os fillos teñan a mesma altura

Nunha fila flex, os fillos **si** teñen a mesma altura por defecto (grazas a `align-items: stretch`). Pero se pos `align-items: center` ou `flex-start`, xa non.

### 7.5 Abusar de `flex: 1`

`flex: 1` fai que os fillos se repartan o espazo igual. Se algún fillo ten contido que non cabe, pode comprimirse e mostrar mal o contido. Neses casos, usa `flex-shrink: 0` ou dá un ancho mínimo.

### 7.6 Usar Flexbox cando se necesita Grid

Flexbox é unidimensional. Se necesitas controlar **filas e columnas á vez** (por exemplo, unha grella de tarxetas con aliñación estrita entre filas e columnas), Grid é a ferramenta axeitada.

### 7.7 Non usar `gap` e usar marxes

Se podes, usa `gap` no contedor en lugar de marxes nos fillos. É máis limpo e evita problemas co colapso ou con ter que eliminar a marxe do último fillo.

---

## 8. Compatibilidade (2026)

| Característica                           | Estado               |
| ---------------------------------------- | -------------------- |
| `display: flex` e propiedades básicas    | Universal desde 2015 |
| `flex-grow`, `flex-shrink`, `flex-basis` | Universal desde 2015 |
| `gap` en Flexbox                         | Baseline desde 2021  |
| `inline-flex`                            | Universal            |
| `align-content`                          | Universal            |

Flexbox está completamente estabilizado. Podes usalo sen preocupacións de compatibilidade.

---

## 9. Exercicios

### Exercicio 1: Centrar

Escribe CSS para centrar un `<div>` horizontal e verticalmente nun contedor que ocupa toda a pantalla.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.contedor {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}
```

</details>


### Exercicio 2: Barra de navegación

Dado este HTML:

```html
<header>
    <h1>Meu sitio</h1>
    <nav>
        <a href="#">Inicio</a>
        <a href="#">Cursos</a>
        <a href="#">Contacto</a>
    </nav>
</header>
```

Escribe CSS para que o `<h1>` quede á esquerda e o `<nav>` á dereita, todo centrado verticalmente.

<details>
<summary><b>Amosar a solución</b></summary>

```css
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
}

nav {
    display: flex;
    gap: 1rem;
}
```

</details>


### Exercicio 3: Tarxetas de igual altura

Dado este HTML:

```html
<div class="tarxetas">
    <div class="tarxeta">Curto</div>
    <div class="tarxeta">Un texto moito máis longo que ocupa varias liñas.</div>
    <div class="tarxeta">Medio</div>
</div>
```

Escribe CSS para que as tres tarxetas estean en fila, teñan o mesmo ancho e a mesma altura.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.tarxetas {
    display: flex;
    gap: 1rem;
}

.tarxeta {
    flex: 1;
    background: #f5f5f5;
    padding: 1rem;
    border-radius: 8px;
}
```

</details>

### Exercicio 4: Sidebar + contido

Crea un layout con dúas columnas: unha sidebar de 250px fixos e un contido que ocupe o resto.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.layout {
    display: flex;
    gap: 2rem;
}

.sidebar {
    flex: 0 0 250px;
}

.contenido {
    flex: 1;
}
```

</details>

### Exercicio 5: Empurrar á dereita

Dado un contedor flex con tres elementos, escribe CSS para que o terceiro quede empurrado cara á dereita e os dous primeiros queden á esquerda.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.contedor {
    display: flex;
    gap: 1rem;
}

.terceiro {
    margin-left: auto;
}
```

</details>

---

## 10. Para profundar

- **MDN Web Docs:** [Basic concepts of flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox) — explicación conceptual.
- **MDN Web Docs:** [Typical use cases of flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Typical_use_cases_of_flexbox) — casos prácticos.
- **CSS-Tricks:** [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) — a guía visual máis famosa.
- **web.dev:** [Learn CSS: Flexbox](https://web.dev/learn/css/flexbox) — lección interactiva.
- **W3C:** [CSS Flexible Box Layout Module Level 1](https://www.w3.org/TR/css-flexbox-1/) — especificación.
- **Flexbox Froggy** (https://flexboxfroggy.com/#gl) — xogo interactivo en galego para practicar Flexbox.

---

## 11. Referencias cruzadas

- **Capítulo 5: Modelo de caixa** — Flexbox ignora o colapso de marxes, o que cambia como se calculan os espazados.
- **Capítulo 6: `display`, fluxo normal e posicionamento** — Flexbox é un modo de layout que substitúe o fluxo normal.
- **Capítulo 7: Floats** — Flexbox é o substituto moderno dos floats para maquetar.
- **Capítulo 9: Grid** — o outro sistema de layout moderno, bidimensional.
- **Capítulo 10: Subgrid e grellas avanzadas** — cando Grid combina con Flexbox.
- **Capítulo 14: Propiedades personalizadas** — uso de variables en layouts flexibles.

---

**Data de creación:** 2026-09-17  
**Última revisión:** 2026-09-17  
**Estado:** Borrador para validación


---
title: "Sintaxe de CSS"
description: "Explicación da sintaxe CSS, incluíndo regras, selectores, declaracións, propiedades, valores, comentarios e erros."
bloque: 1
capitulo: 2
nivel: basico
ultima_revision: "2026-09-17"
estado: "borrador_para_validacion"
compatibilidade: "universal"
palabras_chave:
  - sintaxe
  - regla
  - selector
  - declaracion
  - propiedad
  - valor
  - comentario
  - atallos
---

<!-- # Capítulo 2: Sintaxe de CSS -->

> Unha folla de estilo CSS está formada por **regras**. Cada regra ten un **selector** (a que elementos afecta) e un **bloque de declaracións** (que estilos se aplican). Este capítulo explica a estrutura exacta dunha regra, como se escriben as declaracións, como se comentan, e que pasa cando hai erros de sintaxe.

---

## 1. Introdución: a gramática dunha linguaxe

Todas as linguas teñen unha gramática: un conxunto de regras que din como se combinan as palabras para formar frases con sentido. Se escribes «O gato come peixe» enténdese. Se escribes «Peixe gato o come» aínda se pode intuír, pero xa soa raro. Se escribes «O o peixe come gato» rompe a gramática e non hai forma de interpretalo.

CSS tamén ten unha gramática. Chámase **sintaxe**, e di exactamente como se escriben as regras para que o navegador poida entendelas. Se a sintaxe é correcta, o navegador aplica o estilo. Se non, ignora esa parte e segue adiante (isto é importante: un erro de sintaxe non rompe toda a folla de estilo, só afecta á regra onde está o erro).

Neste capítulo imos ver:

- Como se estrutura unha regra CSS.
- Que son os selectores, as propiedades e os valores.
- Como se escriben os comentarios.
- Como se agrupan regras.
- Que atallos existen.
- Como reacciona o navegador ante erros de sintaxe.

É un capítulo curto pero fundamental. Sen entender a sintaxe, calquera cousa que escribas despois será copiar e pegar sen comprender.

---

## 2. Conceptos fundamentais

Antes de ver exemplos, convén ter claros cinco termos que se usan constantemente ao falar de CSS.

### 2.1 Regra (rule)

Unha **regra** é o bloque mínimo con sentido nunha folla de estilo. Está formada por un selector e un conxunto de declaracións entre chaves.

```css
h1 {
    color: #1a5c8a;
    font-size: 2rem;
}
```

Isto é unha regra. Di: «a todos os elementos `<h1>` da páxina, póñalles a cor `#1a5c8a` e o tamaño de fonte `2rem`».

### 2.2 Selector

O **selector** é a parte que vai antes das chaves. Indica **a que elementos** se aplica a regra. No exemplo anterior, o selector é `h1`.

```css
h1 {
    /* ↑ este é o selector */
}
```

Hai moitos tipos de selectores. Neste capítulo só nos interesa saber que ocupan o lugar antes das chaves. Os veremos en detalle no Capítulo 3.

### 2.3 Declaración (declaration)

Unha **declaración** é cada liña dentro do bloque de chaves. Está formada por unha propiedade e un valor, separados por dous puntos, e remata cun punto e coma.

```css
color: #1a5c8a;
/* ↑ propiedade  ↑ valor  ↑ punto e coma */
```

- **Propiedade:** o que queres cambiar (`color`, `font-size`, `margin`...).
- **Valor:** o que lle queres dar a esa propiedade (`#1a5c8a`, `2rem`, `10px`...).

### 2.4 Bloque (block)

O **bloque** é o conxunto de declaracións entre chaves `{ }`. Pode ter unha soa declaración ou centos. Visualmente, o habitual é poñer unha declaración por liña, pero CSS non o esixe.

```css
h1 {
    color: #1a5c8a;
    font-size: 2rem;
    margin-bottom: 1rem;
}
```

Isto é un bloque con tres declaracións.

### 2.5 Folla de estilo (stylesheet)

Unha **folla de estilo** é o conxunto de todas as regras dun arquivo `.css` (ou dun bloque `<style>`). É o documento completo que o navegador le e aplica.

---

## 3. Sintaxe: a forma dunha regra

Xa vimos os elementos por separado. Agora vexamos a forma completa cun esquema visual.

```
selector {
    propiedade1: valor1;
    propiedade2: valor2;
    propiedade3: valor3;
}
```

Regras prácticas:

1. **O selector vai antes das chaves.** Sen selector, o navegador non sabe a que aplicar a regra.
2. **As chaves abren e pechan o bloque.** Cada `{` debe ter o seu `}` correspondente.
3. **Cada declaración remata en `;`.** Excepto a última, que pode omitirse, pero é mellor poñela sempre por hábito. Se engades despois outra declaración e esqueciches o punto e coma, haberá un erro.
4. **Dous puntos separan propiedade e valor.** Non é un sinal de igual (`=`) nin unha frecha (`->`). É sempre `:`.
5. **Os espazos e saltos de liña son libres.** O navegador ignóraos. Podes escribir todo nunha liña, pero por lexibilidade é mellor unha declaración por liña.

**Exemplo mínimo escrito nunha soa liña (funciona, pero non se recomenda):**

```css
h1 { color: #1a5c8a; font-size: 2rem; }
```

**Exemplo co mesmo efecto, ben formatado:**

```css
h1 {
    color: #1a5c8a;
    font-size: 2rem;
}
```

Os dous fan exactamente o mesmo. O segundo é moito máis lexible e é o que atoparás en calquera proxecto real.

---

## 4. Exemplo mínimo funcional

Vexamos unha pequena folla de estilo que usa varias regras e comentarios, e que ilustra a sintaxe completa.

**Arquivo HTML:**

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <title>Sintaxe CSS</title>
    <link rel="stylesheet" href="estilos/sintaxe.css">
</head>
<body>
    <h1>Un título</h1>
    <p>Un parágrafo de exemplo.</p>
    <p class="destacado">Outro parágrafo, este con clase destacada.</p>
</body>
</html>
```

**Arquivo CSS (`estilos/sintaxe.css`):**

```css
/* ==============================
   Estilos xerais do documento
   ============================== */

/* Título principal */
h1 {
    color: #1a5c8a;         /* azul escuro */
    font-family: Georgia, serif;
    font-size: 2rem;
    margin-bottom: 1rem;
}

/* Parágrafos */
p {
    color: #333333;
    line-height: 1.6;
    margin-bottom: 0.5rem;
}

/* Parágrafos con clase destacada */
.destacado {
    background-color: #fef9c3; /* amarelo claro */
    padding: 0.75rem;
    border-left: 4px solid #ca8a04;
}
```

**Que está a pasar aquí:**

1. A folla ten **tres regras**:
   - `h1 { ... }` — aplícase a todos os elementos `<h1>`.
   - `p { ... }` — aplícase a todos os elementos `<p>`.
   - `.destacado { ... }` — aplícase a todos os elementos coa clase `destacado` (neste caso, o segundo parágrafo).

2. A primeira regra ten **catro declaracións** (`color`, `font-family`, `font-size`, `margin-bottom`).

3. A segunda regra ten **tres declaracións**.

4. A terceira regra ten **tres declaracións** e é a que dá o aspecto de recadro destacado ao segundo parágrafo.

5. Hai **comentarios** que explican que fai cada bloque. Os comentarios non afectan ao resultado.

Se abres o HTML no navegador, verás o título en azul escuro con tipografía serif, os parágrafos en gris escuro con espazado amplo entre liñas, e o segundo parágrafo cun fondo amarelo claro e unha franxa lateral.

---

## 5. Comentarios

En CSS, os comentarios escríbense entre `/*` e `*/`. Todo o que vai dentro deses marcadores é ignorado polo navegador.

```css
/* Isto é un comentario dunha liña */

/*
   Isto é un comentario
   que ocupa varias liñas.
   Podes escribir o que queiras aquí,
   mesmo código CSS que non queres que se aplique:
   color: red;
*/
```

**Diferenza co JavaScript:**

En JavaScript hai dous tipos de comentario: `//` para unha liña e `/* */` para varias. **En CSS só existe `/* */`**. Se escribes `// isto é un comentario` nun arquivo CSS, o navegador intentará interpretalo como unha propiedade e dará erro (ignorará a liña enteira).

```css
/* Correcto */
color: red;

/* Incorrecto: CSS non admite // */
// color: red;
```

**Cando usar comentarios:**

- Para explicar **por que** se aplica un estilo, non só **que** fai. Por exemplo: `/* Fixado pola guía de estilo da empresa */`.
- Para marcar seccións nun arquivo longo: `/* === FORMULARIOS === */`.
- Para deixar temporalmente desactivado un bloque de CSS que non queres borrar.

**Cando non abusar deles:**

- Non comentes o obvio: `/* pon a cor vermella */ color: red;` non engade nada.
- Non deixes comentarios con código morto durante meses. Se non o usas, bórrao.

---

## 6. Maiúsculas, minúsculas e espazos

### 6.1 Sensibilidade a maiúsculas

**As propiedades e os valores CSS non distinguen entre maiúsculas e minúsculas** (agás excepcións como as fontes ou os valores de `content`).

Estas dúas regras son equivalentes:

```css
h1 {
    COLOR: RED;
}

h1 {
    color: red;
}
```

A segunda é a que se usa por convención. Todo en minúsculas, agás nas palabras que requiren maiúscula (nomes de fontes, por exemplo).

**Os selectores de clase e ID si distinguen entre maiúsculas e minúsculas.** Isto significa que `.Destacado` e `.destacado` son clases diferentes. Hai que ter coidado con isto.

### 6.2 Espazos e indentación

Os espazos, tabuladores e saltos de liña son irrelevantes para o navegador. Podes escribir:

```css
h1{color:red;font-size:2rem;}
```

ou

```css
h1 {
    color: red;
    font-size: 2rem;
}
```

Os dous funcionan igual. O segundo é o estándar por convención e por lexibilidade.

**Recomendación:** usa **catro espazos** para indentar as declaracións dentro dun bloque. Non mestures tabuladores e espazos. Moitos editores (VSCode, entre outros) poden configurarse para converter automaticamente o tabulador en espazos.

---

## 7. Atallos (shorthand) e formas longas

Algunhas propiedades CSS teñen unha forma **longa** (que controla un aspecto concreto) e unha forma **curta** ou **atallo** (que agrupa varias propiedades relacionadas nunha soa declaración).

### 7.1 Exemplo: `margin`

**Forma longa:**

```css
.caixa {
    margin-top: 10px;
    margin-right: 20px;
    margin-bottom: 10px;
    margin-left: 20px;
}
```

**Forma curta (atallo):**

```css
.caixa {
    margin: 10px 20px;
}
```

A forma curta segue unha orde específica: **arriba, dereita, abaixo, esquerda** (en inglés: *top, right, bottom, left*, que se lembra coa regra mnemotécnica **TRBL**).

Podes usar:

- **4 valores:** `margin: 10px 20px 30px 40px;` → arriba, dereita, abaixo, esquerda.
- **3 valores:** `margin: 10px 20px 30px;` → arriba, esquerda e dereita, abaixo.
- **2 valores:** `margin: 10px 20px;` → arriba e abaixo, esquerda e dereita.
- **1 valor:** `margin: 10px;` → todos os lados iguais.

Este patrón repítese en moitas propiedades: `padding`, `border-width`, `border-radius`, etc.

### 7.2 Exemplo: `font`

O atallo `font` agrupa varias propiedades tipográficas:

**Forma longa:**

```css
p {
    font-style: italic;
    font-weight: bold;
    font-size: 1.2rem;
    line-height: 1.5;
    font-family: Georgia, serif;
}
```

**Forma curta:**

```css
p {
    font: italic bold 1.2rem/1.5 Georgia, serif;
}
```

**Coidado:** o atallo `font` require que `font-size` e `font-family` estean presentes. Se faltan, a declaración enteira ignórase.

### 7.3 Cando usar atallos e cando non

- **Atallos:** cando queres definir todos os aspectos dunha propiedade á vez. Máis conciso.
- **Formas longas:** cando só queres cambiar un aspecto sen afectar os demais. Máis seguro cando traballas sobre estilos existentes.

**Exemplo do problema dos atallos:** se tes un elemento con `margin-top: 10px` definido nunha regra anterior, e despois escribes `margin: 20px;`, estás a sobrescribir os catro lados. Se só querías cambiar o esquerdo, é mellor usar `margin-left: 20px;`.

---

## 8. Regras `@` (*at-rules*)

Ademais das regras normais, CSS ten un tipo especial chamado ***at-rules*** (regras `@`). Comezan co símbolo `@` e teñen unha sintaxe diferente. Neste capítulo só presentámolas; verémolas en detalle nos capítulos correspondentes.

Algunhas das máis importantes:

```css
/* Importar outra folla de estilo */
@import url("outra-folla.css");

/* Aplicar estilos só en certas condicións (ex.: pantalla pequena) */
@media (min-width: 768px) {
    /* estilos aquí */
}

/* Definir unha fonte personalizada */
@font-face {
    font-family: "Miña Fonte";
    src: url("minha-fonte.woff2");
}

/* Definir unha capa de estilos (máis sobre isto no Cap. 23) */
@layer base {
    /* estilos aquí */
}
```

Nunha *at-rule*, o bloque interior pode conter regras completas, non só declaracións. Isto é distinto dunha regra normal.

---

## 9. Que pasa cando hai un erro de sintaxe

Aquí hai unha diferenza importante respecto doutras linguaxes de programación.

**En JavaScript**, se hai un erro de sintaxe nun arquivo, todo o arquivo falla e o navegador detén a execución.

**En CSS, non.** O navegador é moi tolerante. Cando atopa un erro de sintaxe:

1. **Ignora só a parte que non entende.**
2. **Segue lendo o resto da folla.**

Vexamos algúns casos concretos.

### 9.1 Falta un punto e coma

```css
h1 {
    color: red
    font-size: 2rem;
}
```

Aquí falta o `;` despois de `red`. O navegador intentará interpretar `color: red font-size: 2rem` como unha soa declaración, e como non ten sentido, **ignora esta declaración**. O resultado: nin a cor nin o tamaño aplícanse.

**Como diagnosticalo:** cando un estilo non se aplica e non sabes por que, revisa a declaración anterior. Moitas veces o problema está nun `;` que falta.

### 9.2 Valor inválido

```css
h1 {
    color: verde;
    font-size: 2rem;
}
```

`verde` non é un valor válido para `color` (en inglés é `green`, e hai outras formas válidas). O navegador **ignora só esta declaración** e aplica `font-size: 2rem` normalmente.

### 9.3 Propiedade inexistente

```css
h1 {
    colour: red;
    font-size: 2rem;
}
```

`colour` (con `u`) non existe. O navegador **ignora esta declaración** e aplica `font-size`.

### 9.4 Chave sen pechar

```css
h1 {
    color: red;

p {
    color: blue;
}
```

Falta un `}` despois de `color: red`. O navegador pode interpretar que todo o que vén despois pertence ao bloque de `h1`, co que a segunda regra non se aplicará como esperabas. Este tipo de erro é máis difícil de detectar visualmente.

**Consello:** usa un editor con **resaltado de sintaxe** e **verificación de coincidencia de chaves**. VSCode, por exemplo, resalta a chave pechada cando o cursor está na chave aberta.

> 💡 **Para pensar:** O feito de que CSS ignore os erros en lugar de romper é unha arma de dobre fío. Por un lado, permíteche seguir traballando aínda que teñas un erro nunha regra. Por outro, pode pasar desapercibido: a páxina vese «case ben» pero algo non funciona, e non hai unha mensaxe de erro clara. Aconsello: revisa sempre a consola do navegador (F12 → Console) cando algo non se vexa como esperas. Os navegadores modernos amosan alí os erros de CSS con indicación da liña.

---

## 10. Compatibilidade (2026)

A sintaxe básica de CSS (regras, declaracións, comentarios, atallos) está soportada por todos os navegadores desde CSS1 (1996). Non hai problemas de compatibilidade.

As *at-rules* (`@media`, `@import`, `@font-face`) tamén están universalmente soportadas. Outras máis recentes (`@layer`, `@scope`) teñen soporte completo en navegadores modernos desde 2022-2023.

O que si convén ter en conta é que **a sintaxe dalgunhas propiedades modernas pode cambiar** entre versións dos navegadores. Isto verémolo caso por caso.

---

## 11. Erros frecuentes

### 11.1 Escribir `//` como comentario

```css
/* Incorrecto en CSS */
// Isto non é un comentario válido
color: red;
```

O navegador ignorará a liña con `//` e probablemente tamén a declaración seguinte. **Usa sempre `/* */`**.

### 11.2 Esquecer o `;` na penúltima declaración

Xa o vimos. É o erro máis común. Cando engades unha declaración nova ao final dun bloque, comproba sempre que a anterior remata en `;`.

### 11.3 Confundir `:` con `=`

```css
/* Incorrecto */
color = red;

/* Correcto */
color: red;
```

CSS non usa `=` para asignar valores. Só `:`.

### 11.4 Pór dúas veces a mesma propiedade e pensar que se suman

```css
h1 {
    margin: 10px;
    margin-top: 20px;
}
```

Aquí **non se suman**. A segunda declaración sobrescribe a parte correspondente da primeira: o resultado é `margin: 20px 10px 10px 10px` (arriba 20, os demais 10). Se quixeses sumar, terías que calcular o valor final.

### 11.5 Escribir unidades onde non van

```css
/* Incorrecto */
font-size: 2;

/* Correcto */
font-size: 2rem;
/* ou */
font-size: 2em;
/* ou */
font-size: 24px;
```

O número `2` só non significa nada para `font-size`. As unidades son obrigatorias salvo en propiedades que non as requiren (`line-height`, `z-index`, etc.).

---

## 12. Para profundar

- **MDN Web Docs:** [CSS syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax) — referencia completa da sintaxe.
- **MDN Web Docs:** [CSS reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference) — lista de todas as propiedades e valores válidos.
- **W3C:** [CSS Syntax Module Level 3](https://www.w3.org/TR/css-syntax-3/) — especificación formal da sintaxe (nivel técnico avanzado).
- **CSS-Tricks:** [The CSS Handbook](https://css-tricks.com/the-css-handbook/) — guía práctica de referencia.

---

## 13. Referencias cruzadas

- **Capítulo 1: Que é CSS** — repasa como se aplica unha folla de estilo a un documento HTML.
- **Capítulo 3: Selectores básicos** — aprofunda nos selectores que van antes das chaves.
- **Capítulo 5: Modelo de caixa** — explica en detalle as propiedades `margin`, `padding` e `border` que se mencionan brevemente aquí.
- **Capítulo 23: `@layer`, `@scope`, `@supports`** — explica as *at-rules* avanzadas que aquí só se presentan.

---

**Data de creación:** 2026-09-17  
**Última revisión:** 2026-09-17  
**Estado:** Borrador para validación
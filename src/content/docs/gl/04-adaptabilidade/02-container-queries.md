---
title: "Container queries"
description: "Guía das container queries para crear compoñentes que se adaptan ao tamaño do seu contedor."
bloque: 4
capitulo: 12
nivel: avanzado
ultima_revision: "2026-09-17"
estado: "borrador_para_validacion"
compatibilidade: "baseline_2023"
palabras_chave:
  - container_query
  - container_type
  - container_units
  - cq
  - cqw
  - cqh
  - componentes_reutilizables
  - layout_adaptativo
---

<!-- # Capítulo 12: Container queries -->

> As **container queries** (consultas de contedor) son a evolución natural das media queries. En lugar de preguntar «que tamaño ten a ventá?», preguntan «que tamaño ten o contedor onde está este elemento?». Isto permite crear **compoñentes verdadeiramente reutilizables**: unha tarxeta que se adapta ao espazo que ten, sen importar onde se coloque. Este capítulo explica que son, como se usan, en que se diferencian das media queries, e cando é mellor usar unhas ou outras.

---

## 1. Introdución: o problema que resolven

Imaxina que tes unha tarxeta de produto. A tarxeta ten unha imaxe, un título, un texto e un botón. Cando a colocas nunha columna estreita (por exemplo, nunha barra lateral), queres que se vexa en vertical. Cando a colocas nun contido ancho (por exemplo, no corpo dun artigo), queres que se vexa en horizontal, coa imaxe á esquerda e o texto á dereita.

Coas media queries, isto é complicado. As media queries preguntan polo **tamaño da ventá**, non polo tamaño do contedor onde está a tarxeta. Se a ventá é ancha, a tarxeta ponse en horizontal; se é estreita, en vertical. Pero isto non ten en conta **onde está a tarxeta**. Se a mesma tarxeta aparece nunha barra lateral estreita e nun contido ancho na mesma páxina, as media queries non poden diferencialas: as dúas ven o mesmo ancho de ventá.

Ata hai pouco, a solución era escribir dúas versións da tarxeta (unha para o contido ancho, outra para a barra lateral) e aplicarlles clases diferentes. Pero isto é **pouco reutilizable**: cada vez que moves un compoñente dun sitio a outro, tes que revisar onde vai e que variante usar.

**As container queries** resolven este problema. En lugar de preguntar polo tamaño da ventá, preguntan polo tamaño do **contedor pai**. Se a tarxeta está nun contedor estreito, adáptase a ese contedor. Se está nun contedor ancho, adáptase ao contedor ancho. **Sen cambiar o CSS da tarxeta, sen clases adicionais, sen variantes.**

> 💡 **Para pensar:** as container queries son un cambio de mentalidade. Coas media queries, pensas en «versión móbil», «versión tablet», «versión escritorio». Coas container queries, pensas en **compoñentes autónomos que se adaptan ao seu contexto**. É un paso máis cara a un CSS baseado en compoñentes, máis modular, máis reutilizable.

---

## 2. Conceptos fundamentais

### 2.1 O que é un contedor

Antes de usar container queries, hai que **declarar un contedor**. Un contedor é un elemento que vai servir de referencia para os seus fillos.

```css
.tarxeta-wrapper {
    container-type: inline-size;
    container-name: tarxeta;
}
```

Dúas propiedades:

- **`container-type`:** define o tipo de contedor. Os valores máis usados son `inline-size` (o contedor mídese polo seu ancho) e `size` (o contedor mídese por ancho e alto).
- **`container-name`:** dá un nome ao contedor (opcional, pero recomendado).

**Por que `inline-size` e non `size`?** Porque `inline-size` só depende do ancho do contedor, o que permite que o contedor se adapte ao seu contido en altura sen crear dependencias circulares. `size` require que o contedor teña unha altura fixada, e é menos útil na práctica.

### 2.2 O que é unha container query

Unha vez declarado o contedor, podes escribir **container queries** dentro del:

```css
@container tarxeta (min-width: 400px) {
    .tarxeta {
        display: flex;
    }
}
```

A sintaxe é moi parecida ás media queries, pero:

- Usa `@container` en lugar de `@media`.
- Opcionalmente, o nome do contedor despois de `@container`.
- A condición refírese ao **tamaño do contedor**, non da ventá.

**Sen nome de contedor:**

```css
@container (min-width: 400px) {
    /* Aplícase se o contedor máis próximo cumpre a condición */
}
```

**Con nome:**

```css
@container tarxeta (min-width: 400px) {
    /* Aplícase só se hai un contedor chamado "tarxeta" que cumpra a condición */
}
```

**Recomendación:** usar sempre nome. Evita ambigüidades cando hai contedores aniñados.

### 2.3 Como se miden os contedores

Un contedor mídese polo seu **ancho** (en `inline-size`) ou polo seu ancho e alto (en `size`). Isto é importante porque a medición é do **contedor**, non do elemento que contén a query.

**Exemplo visual:**

```
┌───────────────────────────────────────────┐
│ Contedor ancho (800px)                    │
│                                           │
│   A tarxeta está nun contedor ancho.     │
│   A container query de min-width: 400px  │
│   cúmprese, polo que se aplica o estilo  │
│   horizontal.                             │
│                                           │
└───────────────────────────────────────────┘

┌───────────────┐
│ Contedor      │
│ estreito      │
│ (300px)       │
│               │
│ A tarxeta     │
│ está nun      │
│ contedor      │
│ estreito. A   │
│ query de      │
│ min-width:    │
│ 400px NON se  │
│ cumpre.       │
│               │
└───────────────┘
```

O mesmo CSS, o mesmo compoñente, dous resultados distintos segundo o contedor.

---

## 3. Sintaxe

### 3.1 Declarar un contedor

```css
/* Contedor que só se mide polo ancho */
.wrapper {
    container-type: inline-size;
    container-name: tarxeta;
}

/* Contedor que se mide por ancho e alto (menos habitual) */
.wrapper {
    container-type: size;
    container-name: tarxeta;
}

/* Atallo (recomendado) */
.wrapper {
    container: tarxeta / inline-size;
    /* nome / tipo */
}
```

O atallo `container` combina nome e tipo nunha soa declaración. É o que se adoita usar.

### 3.2 Escribir unha container query

```css
/* Sen nome (menos recomendado) */
@container (min-width: 400px) {
    .tarxeta {
        display: flex;
        gap: 1rem;
    }
}

/* Con nome (recomendado) */
@container tarxeta (min-width: 400px) {
    .tarxeta {
        display: flex;
        gap: 1rem;
    }
}
```

### 3.3 Consultas en intervalos

Igual que as media queries, as container queries admiten sintaxe de intervalos:

```css
/* Entre 400 e 800px */
@container tarxeta (400px <= width <= 800px) {
    /* ... */
}

/* Maior ou igual a 600px */
@container tarxeta (width >= 600px) {
    /* ... */
}

/* Menor que 400px */
@container tarxeta (width < 400px) {
    /* ... */
}
```

### 3.4 Operadores lóxicos

Tamén se poden combinar condicións con `and`, `or` e `not`:

```css
/* Contedor ancho E en modo "destacado" */
@container tarxeta (min-width: 400px) and style(--destacado: true) {
    /* ... */
}
```

**Nota:** isto implica **style queries** (consultas de estilo), que vemos na sección 5.

### 3.5 Container query units

Cando se declara un contedor, pódense usar **unidades relativas ao contedor** dentro del:

| Unidade | Significado                                   |
| ------- | --------------------------------------------- |
| `cqw`   | 1% do ancho do contedor.                      |
| `cqh`   | 1% da altura do contedor.                     |
| `cqi`   | 1% do tamaño en liña (ancho, en horizontal).  |
| `cqb`   | 1% do tamaño en bloque (alto, en horizontal). |
| `cqmin` | 1% do lado máis pequeno.                      |
| `cqmax` | 1% do lado máis grande.                       |

**Exemplo:**

```css
.tarxeta {
    padding: 5cqw;   /* 5% do ancho do contedor */
    font-size: 2cqi; /* 2% do ancho en liña do contedor */
}
```

Isto é moi útil para crear compoñentes que escalan proporcionalmente co contedor.

---

## 4. Exemplo mínimo funcional: unha tarxeta adaptable

Vexamos un exemplo que ilustra perfectamente o valor das container queries: a mesma tarxeta, en dous contextos distintos, adaptándose a cada un.

**Arquivo HTML:**

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Container queries</title>
    <link rel="stylesheet" href="estilos/container.css">
</head>
<body>
    <div class="layout">
        <main class="contido">
            <h1>Contido principal</h1>
            <p>Aquí hai espazo dabondo para a tarxeta.</p>

            <div class="tarxeta-wrapper">
                <article class="tarxeta">
                    <img src="https://picsum.photos/300/200" alt="Exemplo" class="tarxeta-imaxe">
                    <div class="tarxeta-texto">
                        <h2>Un produto</h2>
                        <p>Unha descrición breve do produto.</p>
                        <button>Mercar</button>
                    </div>
                </article>
            </div>
        </main>

        <aside class="sidebar">
            <h2>Relacionados</h2>

            <div class="tarxeta-wrapper">
                <article class="tarxeta">
                    <img src="https://picsum.photos/300/200" alt="Exemplo" class="tarxeta-imaxe">
                    <div class="tarxeta-texto">
                        <h2>Outro produto</h2>
                        <p>Outra descrición breve.</p>
                        <button>Mercar</button>
                    </div>
                </article>
            </div>
        </aside>
    </div>
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
    padding: 1rem;
    background: #f5f5f5;
}

.layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

@media (min-width: 1024px) {
    .layout {
        grid-template-columns: 2fr 1fr;
    }
}

/* ==============================
   Declaración do contedor
   ============================== */

.tarxeta-wrapper {
    container: tarxeta / inline-size;
}

/* ==============================
   Estilos base da tarxeta (para contedor estreito)
   ============================== */

.tarxeta {
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #e5e5e5;
}

.tarxeta-imaxe {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    display: block;
}

.tarxeta-texto {
    padding: 1rem;
}

.tarxeta-texto h2 {
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
    color: #1a5c8a;
}

.tarxeta-texto p {
    margin-bottom: 1rem;
    color: #555;
}

.tarxeta-texto button {
    background: #1a5c8a;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
}

/* ==============================
   Container queries
   ============================== */

/* Cando o contedor ten máis de 500px, a tarxeta vólvese horizontal */
@container tarxeta (min-width: 500px) {
    .tarxeta {
        flex-direction: row;
    }

    .tarxeta-imaxe {
        width: 200px;
        aspect-ratio: auto;
        height: auto;
    }

    .tarxeta-texto {
        padding: 1.5rem;
    }

    .tarxeta-texto h2 {
        font-size: 1.25rem;
    }
}

/* Cando o contedor ten máis de 800px, aumenta aínda máis */
@container tarxeta (min-width: 800px) {
    .tarxeta-imaxe {
        width: 280px;
    }

    .tarxeta-texto {
        padding: 2rem;
    }

    .tarxeta-texto h2 {
        font-size: 1.5rem;
    }
}
```

**Que está a pasar aquí:**

1. **`.tarxeta-wrapper`** declárase como contedor con `container: tarxeta / inline-size`. O seu ancho será a referencia.
2. **Os estilos base da tarxeta** son para contedor estreito: layout vertical (imaxe arriba, texto abaixo).
3. **A container query de 500px** cambia o layout a horizontal (imaxe á esquerda, texto á dereita).
4. **A container query de 800px** aumenta a imaxe e o padding.

**O resultado:**

- A tarxeta do **contido principal** está nun contedor ancho (máis de 500px), polo que se amosa en horizontal.
- A tarxeta da **barra lateral** está nun contedor estreito (menos de 500px), polo que se amosa en vertical.
- **O mesmo código CSS** produce dous resultados distintos, sen clases adicionais nin variantes.

Se cambias o deseño e moves a tarxeta da barra lateral ao contido principal, adáptase automaticamente. **Isto é o poder das container queries.**

---

## 5. Style queries (consultas de estilo)

Ademais das consultas de tamaño, CSS moderno permite **consultar valores de propiedades personalizadas** (variables CSS). Chámanse **style queries**.

### 5.1 Sintaxe

```css
@container style(--tema: escuro) {
    .tarxeta {
        background: #1a1a1a;
        color: #e0e0e0;
    }
}
```

**Como funciona:**

1. Nun contedor, defines unha variable: `--tema: escuro`.
2. Nunha style query, comprobas se esa variable ten ese valor.
3. Se coincide, aplícanse os estilos.

**Exemplo completo:**

```html
<div class="tarxeta-wrapper" style="--tema: escuro;">
    <article class="tarxeta">
        <h2>Un produto</h2>
        <p>Descrición.</p>
    </article>
</div>
```

```css
.tarxeta-wrapper {
    container: tarxeta / inline-size;
}

@container tarxeta style(--tema: escuro) {
    .tarxeta {
        background: #1a1a1a;
        color: #e0e0e0;
    }
}
```

**Vantaxe:** podes cambiar o estilo dun compoñente simplemente cambiando unha variable no contedor. Non hai que engadir clases adicionais.

### 5.2 Estado en 2026

As style queries están en Baseline desde 2023-2024, pero hai que comprobar a compatibilidade exacta. Consulta [web.dev/baseline](https://web.dev/baseline) antes de usalas en produción.

---

## 6. Media queries vs. container queries: cando usar cada unha

Esta é a pregunta clave. A resposta curta é: **depende do que esteas a adaptar**.

### 6.1 Regra xeral

- **Media queries:** cando o que queres adaptar depende do **tamaño da ventá** ou de **características do dispositivo**. Exemplos: cambiar o layout xeral dunha páxina, activar tema escuro, reducir animacións.
- **Container queries:** cando o que queres adaptar depende do **tamaño do contedor** onde está o compoñente. Exemplos: tarxetas, botóns, menús, calquera compoñente reutilizable.

### 6.2 Táboa comparativa

| Aspecto                   | Media queries             | Container queries                   |
| ------------------------- | ------------------------- | ----------------------------------- |
| Referencia                | Tamaño da ventá           | Tamaño do contedor                  |
| Uso principal             | Layout xeral da páxina    | Compoñentes reutilizables           |
| Escala a                  | Dispositivos              | Contextos dentro dunha mesma páxina |
| Compoñentes reutilizables | Difícil                   | Nativo                              |
| Cando se aplican          | Sempre que a ventá cumpre | Sempre que o contedor cumpre        |
| Compatibilidade           | Universal                 | Baseline desde 2023                 |

### 6.3 Estratexia combinada

Na práctica, as dúas ferramentas úsanse xuntas:

- **Media queries** para o layout xeral da páxina: definir o número de columnas principais, cambiar a orientación da cabeceira, ocultar contido secundario, etc.
- **Container queries** para os compoñentes: tarxetas, botóns, formularios, calquera cousa que se repita en contextos distintos.

**Exemplo:**

```css
/* Layout xeral: media query */
.layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
}

@media (min-width: 1024px) {
    .layout {
        grid-template-columns: 2fr 1fr;
    }
}

/* Compoñente: container query */
.tarxeta-wrapper {
    container: tarxeta / inline-size;
}

@container tarxeta (min-width: 500px) {
    .tarxeta {
        flex-direction: row;
    }
}
```

A media query decide se hai unha ou dúas columnas. A container query decide como se ve a tarxeta dentro de cada columna.

### 6.4 Cando non hai contedor definido

Se un compoñente ten container queries pero non hai ningún contedor declarado, as queries non se aplican. **Non hai erro, simplemente non se cumpren.** Isto é importante: podes escribir un compoñente con container queries e usalo tamén en contextos sen contedor (aplicaranse os estilos base).

---

## 7. Casos habituais na práctica

### 7.1 Tarxetas reutilizables

Xa o vimos. É o caso máis claro e máis habitual.

### 7.2 Menús de navegación

Un menú que cambia de horizontal a vertical segundo o espazo do contedor:

```css
.menu-wrapper {
    container: menu / inline-size;
}

.menu {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

@container menu (min-width: 600px) {
    .menu {
        flex-direction: row;
        gap: 1.5rem;
    }
}
```

### 7.3 Formularios

Etiquetas e campos que se reorganizan:

```css
.formulario-wrapper {
    container: formulario / inline-size;
}

.campo {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

@container formulario (min-width: 500px) {
    .campo {
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    }

    .campo label {
        flex: 0 0 150px;
        text-align: right;
    }
}
```

### 7.4 Grellas adaptativas

```css
.galeria-wrapper {
    container: galeria / inline-size;
}

.galeria {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
}

@container galeria (min-width: 500px) {
    .galeria {
        grid-template-columns: repeat(2, 1fr);
    }
}

@container galeria (min-width: 800px) {
    .galeria {
        grid-template-columns: repeat(3, 1fr);
    }
}
```

**Nota:** en moitos casos, `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))` xa resolve isto sen container queries. Pero as container queries dan máis control cando os tamaños mínimos non son uniformes.

### 7.5 Compoñentes con variables

```css
.tarxeta-wrapper {
    container: tarxeta / inline-size;
}

.tarxeta {
    padding: 1rem;
    font-size: 0.9rem;
}

@container tarxeta (min-width: 500px) {
    .tarxeta {
        padding: 1.5rem;
        font-size: 1rem;
    }
}

@container tarxeta (min-width: 800px) {
    .tarxeta {
        padding: 2rem;
        font-size: 1.125rem;
    }
}
```

Isto é moi útil para compoñentes que se colocan en distintos contextos.

---

## 8. Erros frecuentes

### 8.1 Esquecer declarar o contedor

As container queries **non fan nada** se non hai un contedor declarado. Este é o erro máis común.

```css
/* Mal: non hai container-type en ningún antepasado */
@container (min-width: 400px) {
    .tarxeta {
        display: flex;
    }
}

/* Ben: hai un contedor declarado */
.tarxeta-wrapper {
    container-type: inline-size;
}

@container (min-width: 400px) {
    .tarxeta {
        display: flex;
    }
}
```

### 8.2 Usar `container-type: size` sen altura definida

`container-type: size` require que o contedor teña unha altura definida (explícita ou por contexto). Se non a ten, o navegador pode non saber que tamaño ten o contedor e as queries non se aplican como agardas.

**Recomendación:** usa `inline-size` sempre que poidas. É o que queres na maioría dos casos.

### 8.3 Non usar nome de contedor

Se hai varios contedores aniñados, unha query sen nome aplícase ao **contedor máis próximo** que cumpra a condición. Isto pode ser fonte de confusión.

```css
/* Sen nome: aplícase ao contedor máis próximo */
@container (min-width: 400px) {
    /* ... */
}

/* Con nome: só se aplica a contedores chamados "tarxeta" */
@container tarxeta (min-width: 400px) {
    /* ... */
}
```

**Recomendación:** usar sempre nome. É máis explícito e evita sorpresas.

### 8.4 Pensar que substitúen as media queries

As container queries **non substitúen** as media queries. Complementan. Cada unha ten o seu uso.

### 8.5 Aplicar container queries a fillos non directos

As container queries aplícanse aos **fillos do contedor** (ou a calquera descendente que non teña outro contedor entre medias). Se hai un contedor intermedio, a query aplícase ao contedor máis próximo.

### 8.6 Declarar contedor nun elemento que non ten fillos

Se declaras `container-type: inline-size` nun elemento que non ten fillos (ou cuxos fillos non teñen container queries), non pasa nada. As container queries só teñen efecto cando hai fillos que as usen.

### 8.7 Asumir que `container` afecta ao propio elemento

O elemento que se declara como contedor **non se mide a si mesmo**: os seus fillos mídeno a el. Isto é un erro conceptual frecuente.

---

## 9. Compatibilidade (2026)

| Característica                       | Estado                          |
| ------------------------------------ | ------------------------------- |
| `container-type` e `container-name`  | Baseline desde 2023             |
| Container queries de tamaño          | Baseline desde 2023             |
| Unidades `cqw`, `cqi`, etc.          | Baseline desde 2023             |
| Style queries (`@container style()`) | Baseline desde 2024 (verificar) |
| Atallo `container`                   | Baseline desde 2023             |

As container queries están estabilizadas. Podes usalas con confianza.

---

## 10. Exercicios

### Exercicio 1: Declarar un contedor

Dado este HTML:

```html
<div class="wrapper">
    <article class="tarxeta">
        <h2>Título</h2>
        <p>Texto.</p>
    </article>
</div>
```

Declara `.wrapper` como contedor chamado `tarxeta`.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.wrapper {
    container: tarxeta / inline-size;
}
```

</details>


### Exercicio 2: Primeira query

Usando o contedor do exercicio anterior, escribe unha query para que, cando o contedor teña máis de 400px, a tarxeta teña `padding: 2rem`.

<details>
<summary><b>Amosar a solución</b></summary>

```css
@container tarxeta (min-width: 400px) {
    .tarxeta {
        padding: 2rem;
    }
}
```

</details>


### Exercicio 3: Tarxeta adaptable

Crea un compoñente de tarxeta con imaxe, título e texto que:

- Cando o contedor teña menos de 400px: layout vertical.
- Cando o contedor teña 400px ou máis: layout horizontal.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.tarxeta-wrapper {
    container: tarxeta / inline-size;
}

.tarxeta {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

@container tarxeta (min-width: 400px) {
    .tarxeta {
        flex-direction: row;
    }
}
```

</details>


### Exercicio 4: Combinar coas media queries

Escribe CSS que:

- Use unha media query para definir o layout da páxina (1 columna en móbil, 2 en escritorio).
- Use unha container query para que as tarxetas dentro de cada columna se adapten ao ancho da columna.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
}

@media (min-width: 1024px) {
    .layout {
        grid-template-columns: 2fr 1fr;
    }
}

.tarxeta-wrapper {
    container: tarxeta / inline-size;
}

@container tarxeta (min-width: 500px) {
    .tarxeta {
        flex-direction: row;
    }
}
```

</details>


### Exercicio 5: Identificar o erro

```css
.tarxeta {
    container-type: inline-size;
}

@container tarxeta (min-width: 400px) {
    .tarxeta {
        display: flex;
    }
}
```

Cal é o problema?

<details>
<summary><b>Amosar a solución</b></summary>

O contedor ten `container-type: inline-size` e nome implícito (ningún), pero a query usa o nome `tarxeta`. Como non hai contedor chamado `tarxeta`, a query non se aplica. Hai que:

1. Darlle nome ao contedor: `container: tarxeta / inline-size;`.
2. Aplicar a container-type ao **pai** do elemento que queremos adaptar, non ao propio elemento.

**Corrección:**

```css
.tarxeta-wrapper {
    container: tarxeta / inline-size;
}

@container tarxeta (min-width: 400px) {
    .tarxeta {
        display: flex;
    }
}
```

</details>

---

## 11. Para profundar

- **MDN Web Docs:** [CSS container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries) — guía completa.
- **MDN Web Docs:** [container-type](https://developer.mozilla.org/en-US/docs/Web/CSS/container-type) — referencia da propiedade.
- **web.dev:** [CSS container queries](https://web.dev/articles/cq-stable) — artigo de Google.
- **web.dev:** [Learn CSS: Container queries](https://web.dev/learn/css/container-queries) — lección interactiva.
- **Ahmad Shadeed:** [CSS Container Queries](https://ishadeed.com/article/css-container-query-guide/) — guía visual moi clara.
- **W3C:** [CSS Containment Module Level 3](https://www.w3.org/TR/css-contain-3/) — especificación.

---

## 12. Referencias cruzadas

- **Capítulo 8: Flexbox** — as container queries úsanse moito para cambiar `flex-direction`.
- **Capítulo 9: Grid** — as container queries poden cambiar o número de columnas dunha grella.
- **Capítulo 11: Media queries** — o capítulo anterior. Convíén lelo antes deste.
- **Capítulo 13: Unidades relativas e funcións modernas** — as unidades `cqw`, `cqi`, etc. son específicas de contedores.
- **Capítulo 14: Propiedades personalizadas** — as style queries traballan con variables CSS.
- **Capítulo 24: Rendemento e boas prácticas** — cando usar container queries e cando non.

---

**Data de creación:** 2026-09-17  
**Última revisión:** 2026-09-17  
**Estado:** Borrador para validación
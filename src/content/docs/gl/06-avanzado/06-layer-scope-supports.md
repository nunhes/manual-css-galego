---
title: "@layer, @scope e @supports"
description: "Uso de `@layer`, `@scope` e `@supports` para organizar, illar e aplicar estilos CSS de forma condicional."
bloque: 6
capitulo: 23
nivel: avanzado
ultima_revision: "2026-09-17"
estado: "borrador_para_validacion"
compatibilidade: "baseline_2023"
palabras_chave:
  - layer
  - cascade_layers
  - scope
  - at_scope
  - supports
  - at_supports
  - organization
  - isolation
  - conditional_styles
---

<!-- # Capítulo 23: `@layer`, `@scope` e `@supports` -->

> CSS moderno incorpora tres **at-rules** que permiten organizar, illar e aplicar estilos de forma condicional. **`@layer`** permite agrupar estilos en capas e controlar a orde na que se aplican, independentemente da especificidade. **`@scope`** permite limitar os estilos a unha parte concreta do documento, evitando que se filtren a outras zonas. **`@supports`** permite aplicar estilos só se o navegador soporta unha característica concreta. As tres ferramentas xuntas dan un control moi fino sobre como se aplica o CSS, e son especialmente útiles en proxectos grandes, con librarías de terceiros, ou con compoñentes complexos.

---

## 1. Introdución: os problemas que resolven estas at-rules

Cando un proxecto CSS medra, aparecen problemas que non se resolven só con máis CSS:

1. **A especificidade convértese nun caos.** Cando hai moitas regras que compiten por aplicar a mesma propiedade, é difícil saber cal gaña. Cando se integra unha libraría de terceiros (Bootstrap, Tailwind), o problema multiplícase: hai que loitar contra os seus estilos, moitas veces con `!important`.

2. **Os estilos fíltranse.** Cando escribes estilos para unha parte da páxina, ás veces afectan sen querer a outras partes. Por exemplo, un estilo para `.tarxeta` dentro dunha sección concreta pode estar afectando a outras `.tarxeta` noutras seccións.

3. **Non se pode comprobar o soporte dunha característica sen JavaScript.** Ata hai pouco, para saber se un navegador soportaba unha propiedade CSS, había que usar JavaScript. Agora pódese facer con `@supports`.

As tres at-rules deste capítulo resolven estes tres problemas:

- **`@layer`:** control da orde de aplicación, independentemente da especificidade.
- **`@scope`:** illamento de estilos a unha parte do documento.
- **`@supports`:** aplicación condicional segundo o soporte do navegador.

> 💡 **Para pensar:** estas tres at-rules non son para principiantes, pero tampouco son para expertos. Son ferramentas que resolven problemas reais que aparecen cando un proxecto medra. Se estás a facer un sitio pequeno, probablemente non as necesites. Se estás a facer un proxecto grande, ou integras librarías de terceiros, ou traballas en equipo, estas ferramentas poden aforrarche moitos problemas.

---

## 2. `@layer`: capas de estilos

### 2.1 O problema que resolve

Cando dúas regras CSS se aplican ao mesmo elemento e á mesma propiedade, o navegador decide cal gaña usando dous criterios:

1. **Especificidade:** o selector máis específico gaña.
2. **Orde de aparición:** se a especificidade é igual, gaña a regra que aparece despois.

Isto funciona ben en CSS pequeno, pero cando hai librarías de terceiros, temas, compoñentes e utilidades, a especificidade convértese nun problema. Por exemplo:

```css
/* Estilos da libraría (aparecen primeiro) */
.boton {
    background: blue;
    color: white;
}

/* Os teus estilos (aparecen despois) */
.boton {
    background: red;
}
```

Aquí gaña o segundo (máis abaixo). Pero se a libraría usa un selector máis específico:

```css
/* Libraría */
button.boton.primario {
    background: blue;
}

/* Os teus estilos, máis simples */
.boton {
    background: red;   /* non gaña, porque a libraría é máis específica */
}
```

Tes que escribir `.boton.primario` ou incluso `.boton.primario.activo` para gañar. Isto é o que se chama «guerra de especificidade».

**`@layer` resolve isto:** permite agrupar estilos en **capas** e definir a **orde de prioridade entre capas**, independentemente da especificidade dentro de cada unha.

### 2.2 Sintaxe básica

```css
@layer reset, base, compoñentes, utilidades;
```

Esta liña **declara as capas** e a súa orde de prioridade, de **menor a maior**. É dicir:

- `reset` ten a prioridade máis baixa.
- `utilidades` ten a prioridade máis alta.
- En caso de conflito, gaña a capa de maior prioridade, independentemente da especificidade.

Despois, os estilos engádense ás capas correspondentes:

```css
@layer reset {
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
}

@layer base {
    body {
        font-family: system-ui, sans-serif;
        line-height: 1.6;
    }
}

@layer compoñentes {
    .boton {
        background: #1a5c8a;
        color: white;
        padding: 0.5rem 1rem;
    }
}

@layer utilidades {
    .texto-centrado {
        text-align: center;
    }

    .oculto {
        display: none;
    }
}
```

**A orde final de aplicación:**

1. `reset` (menor prioridade).
2. `base`.
3. `compoñentes`.
4. `utilidades` (maior prioridade).

Se hai un conflito entre `.boton` (en `compoñentes`) e `.oculto` (en `utilidades`), gaña `.oculto` porque está nunha capa superior. **Aínda que `.boton` teña un selector máis específico.**

### 2.3 Cando usar `@layer`

**Caso 1: integrar librarías de terceiros.** Colocas a libraría nunha capa inferior, e os teus estilos nunha superior. Así podes sobrescribir calquera estilo da libraría sen loitar coa especificidade.

```css
@layer libraria, meus-estilos;

@import url("bootstrap.css") layer(libraria);

@layer meus-estilos {
    .boton {
        background: red;   /* sobrescribe Bootstrap sen problema */
    }
}
```

**Caso 2: organizar o CSS por función.** En vez de ter un arquivo enorme, organizas o CSS en capas: reset, base, layout, compoñentes, utilidades.

**Caso 3: traballar en equipo.** Cada equipo pode ter a súa propia capa, e a orde de prioridade defínese unha vez.

### 2.4 Capas aniñadas

As capas poden conter outras capas:

```css
@layer compoñentes {
    @layer botons {
        .boton { /* ... */ }
    }

    @layer tarxetas {
        .tarxeta { /* ... */ }
    }
}
```

Isto permite unha organización xerárquica. A sintaxe completa do nome é `compoñentes.botons`.

### 2.5 Como se relaciona coa especificidade

**Importante:** dentro dunha mesma capa, a especificidade funciona como sempre. Só cando hai conflito entre capas **distintas** é cando a orde de capas decide.

**Exemplo:**

```css
@layer base, utilidades;

@layer base {
    #titulo {
        color: blue;   /* especificidade moi alta, pero capa baixa */
    }
}

@layer utilidades {
    .texto-rojo {
        color: red;    /* especificidade baixa, pero capa alta */
    }
}
```

Se un elemento ten `id="titulo"` e `class="texto-rojo"`, **gaña o vermello**, porque `utilidades` é unha capa superior, aínda que o selector da outra capa sexa moito máis específico.

Isto é o que fai `@layer` tan potente: **podes ter selectores simples nas capas superiores e non hai que loitar con selectores complexos das capas inferiores**.

### 2.6 Estilos fóra de capas

Os estilos que están **fóra** de calquera capa teñen **máis prioridade ca calquera capa**. Isto é importante: se queres que un estilo gañe sempre, déixao fóra de capas.

```css
@layer base, compoñentes;

@layer base {
    .boton { color: blue; }
}

/* Estilo fóra de capas: sempre gaña sobre as capas */
.boton-importante {
    color: red;
}
```

**Recomendación:** usar capas para a maioría dos estilos, e deixar fóra só os estilos que deben gañar sempre (por exemplo, un estilo de accesibilidade que sobrescribe todo).

### 2.7 Exemplo completo

```css
/* Declaración de capas */
@layer reset, base, compoñentes, utilidades;

/* Reset */
@layer reset {
    *, *::before, *::after {
        box-sizing: border-box;
    }

    * {
        margin: 0;
        padding: 0;
    }
}

/* Base */
@layer base {
    body {
        font-family: system-ui, sans-serif;
        line-height: 1.6;
        color: #333;
    }

    h1, h2, h3 {
        line-height: 1.2;
    }
}

/* Compoñentes */
@layer compoñentes {
    .boton {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: #1a5c8a;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
    }

    .tarxeta {
        padding: 1.5rem;
        background: white;
        border: 1px solid #e5e5e5;
        border-radius: 8px;
    }
}

/* Utilidades */
@layer utilidades {
    .oculto { display: none; }
    .texto-centrado { text-align: center; }
    .mt-1 { margin-top: 0.5rem; }
    .mt-2 { margin-top: 1rem; }
    .mt-3 { margin-top: 1.5rem; }
}
```

---

## 3. `@scope`: illamento de estilos

### 3.1 O problema que resolve

Cando escribes estilos para un compoñente, ás veces fíltranse a outros compoñentes que non deberían verse afectados. Por exemplo:

```css
.tarxeta p {
    color: #666;
}
```

Isto aplícase a **todos os `p` dentro de calquera `.tarxeta`**. Se hai outras `.tarxeta` noutras partes da páxina (por exemplo, nunha barra lateral), tamén se ven afectadas.

Ata agora, a única forma de limitar os estilos era usar selectores moi específicos (`.seccion-principal .tarxeta p`) ou clases especiais. Isto vólvese complicado.

**`@scope` resolve isto:** permite definir un **ámbito** (scope) no que se aplican os estilos, e opcionalmente **limitar** ese ámbito por abaixo.

### 3.2 Sintaxe básica

```css
@scope (.tarxeta) {
    p {
        color: #666;
    }

    h2 {
        color: #1a5c8a;
    }
}
```

**Que ocorre aquí:**

- Os estilos dentro de `@scope (.tarxeta)` **só se aplican a elementos dentro dun `.tarxeta`**.
- Dentro dese ámbito, `p` refírese só aos `p` dentro de `.tarxeta`.
- É como se escribises `.tarxeta p { }`, pero dunha forma máis limpa e máis eficiente.

### 3.3 Limitar o ámbito por abaixo

Podes definir un **límite inferior** (end scope) coa sintaxe `to`:

```css
@scope (.tarxeta) to (.tarxeta-aniñada) {
    p {
        color: #666;
    }
}
```

**Que ocorre aquí:** os estilos aplícanse aos elementos dentro de `.tarxeta`, **pero non dentro de `.tarxeta-aniñada`** se hai unha tarxeta aniñada. Isto permite que as tarxetas aniñadas teñan os seus propios estilos sen ser afectadas pola exterior.

### 3.4 `:scope`: referirse ao elemento raíz do ámbito

Dentro dun `@scope`, podes usar `:scope` para referirte ao elemento raíz do ámbito:

```css
@scope (.tarxeta) {
    :scope {
        padding: 1.5rem;
        border: 1px solid #e5e5e5;
    }

    :scope > h2 {
        margin-bottom: 1rem;
        color: #1a5c8a;
    }
}
```

Isto é equivalente a:

```css
.tarxeta {
    padding: 1.5rem;
    border: 1px solid #e5e5e5;
}

.tarxeta > h2 {
    margin-bottom: 1rem;
    color: #1a5c8a;
}
```

Pero dentro do `@scope` é máis claro e máis fácil de ler.

### 3.5 Especificidade e proximidade

Unha das vantaxes de `@scope` é que **a especificidade é menor** ca dos selectores descendentes equivalentes. Ademais, hai unha regra de **proximidade**: se dous ámbitos poden aplicar un estilo, gaña o **máis próximo ao elemento**.

**Exemplo:**

```css
@scope (.exterior) {
    p {
        color: blue;
    }
}

@scope (.interior) {
    p {
        color: red;
    }
}
```

Se un `p` está dentro de `.interior`, que á súa vez está dentro de `.exterior`, o `p` terá cor **vermella**, porque `.interior` está máis próximo. Isto é un comportamento novo, introducido con `@scope`.

### 3.6 Cando usar `@scope`

- **Compoñentes illados:** cando queres que os estilos dun compoñente non se filtren.
- **Subcompoñentes:** cando queres que un subcompoñente teña os seus propios estilos sen ser afectado polo compoñente pai.
- **Seccións da páxina:** cando queres dar estilos a unha parte da páxina sen afectar outras.

**Recomendación:** `@scope` é útil en proxectos con compoñentes, especialmente cando hai aniñamento de compoñentes. Para proxectos pequenos, probablemente non o necesites.

### 3.7 Exemplo completo

```css
@scope (.tarxeta) to (.tarxeta) {
    :scope {
        padding: 1.5rem;
        background: white;
        border: 1px solid #e5e5e5;
        border-radius: 8px;
    }

    h2 {
        color: #1a5c8a;
        margin-bottom: 0.75rem;
    }

    p {
        color: #666;
        margin-bottom: 0.5rem;
    }

    .accions {
        display: flex;
        gap: 0.5rem;
        margin-top: 1rem;
    }
}
```

**`to (.tarxeta)`** asegura que as tarxetas aniñadas non herdan estes estilos. Cada tarxeta aniñada pode ter os seus propios estilos.

---

## 4. `@supports`: aplicación condicional

### 4.1 O problema que resolve

Cando usas unha característica de CSS que pode non estar soportada por todos os navegadores, necesitas un plan B. Ata hai pouco, isto facíase con JavaScript ou con trucos de CSS. **`@supports`** permite comprobalo **directamente en CSS**.

### 4.2 Sintaxe básica

```css
@supports (display: grid) {
    .contedor {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }
}
```

**Que ocorre aquí:** os estilos dentro de `@supports` **só se aplican se o navegador soporta `display: grid`**.

### 4.3 Combinacións con `and`, `or`, `not`

```css
/* Soportar grid E flexbox */
@supports (display: grid) and (display: flex) {
    /* ... */
}

/* Soportar grid OU flexbox */
@supports (display: grid) or (display: flex) {
    /* ... */
}

/* NON soportar grid */
@supports not (display: grid) {
    /* ... */
}
```

### 4.4 `@supports` con valores, non só propiedades

`@supports` pode comprobar se unha propiedade **acepta un valor concreto**:

```css
@supports (color: oklch(50% 0.2 250)) {
    .elemento {
        color: oklch(50% 0.2 250);
    }
}
```

Isto é útil porque unha propiedade pode estar soportada pero non un valor concreto. Por exemplo, `color` está soportado, pero `oklch()` non en navegadores antigos.

### 4.5 `@supports` con `selector()`

Tamén se pode comprobar se un navegador soporta un **selector**:

```css
@supports selector(:has(a)) {
    .tarxeta:has(img) {
        padding: 0;
    }
}
```

Isto comproba se o navegador soporta a pseudo-clase `:has()`.

### 4.6 Cando usar `@supports`

- **Aplicar melloras progresivas:** usar unha característica moderna só se está soportada, e unha alternativa se non.
- **Evitar erros:** cando unha característica non está soportada, non aplicar estilos que romperían o deseño.
- **Comprobar características recentes:** `:has()`, `container queries`, `scroll-driven animations`, etc.

**Recomendación:** `@supports` é especialmente útil para características moi recentes (2024-2026). Para características antigas (Flexbox, Grid, variables CSS), xa non é necesario porque están universalmente soportadas.

### 4.7 Exemplo completo

```css
/* Estilos base (sen características modernas) */
.contedor {
    display: flex;
    gap: 1rem;
}

/* Mellora con Grid, se está soportado */
@supports (display: grid) {
    .contedor {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
}

/* Mellora con :has(), se está soportado */
@supports selector(:has(*)) {
    .tarxeta:has(img) {
        padding: 0;
    }
}

/* Mellora con oklch(), se está soportado */
@supports (color: oklch(50% 0.2 250)) {
    :root {
        --cor-primaria: oklch(50% 0.13 250);
    }
}
```

---

### 5. A función `if()`: condicionais en liña (característica emerxente)

#### 5.1 Que é a función `if()`

A función **`if()`** permite escribir **condicións directamente nun valor CSS**, sen necesidade de media queries ou `@supports` separados.

**Sintaxe:**

```css
.elemento {
    propiedade: if(<condición>: <valor-se-cumpre>; else: <valor-se-non-cumpre>);
}
```

**Exemplo:**

```css
.boton {
    width: if(media(any-pointer: fine): 200px; else: 100%);
}
```

**Que ocorre aquí:** se o dispositivo ten un punteiro preciso (rato, trackpad), o botón ten `width: 200px`. Se non (dedo, mando), ten `width: 100%`.

**A diferenza coas media queries:** en lugar de escribir dúas regras completas, escribes unha soa propiedade que se adapta segundo a condición. **É máis conciso.**

#### 5.2 Tipos de condicións

A función `if()` admite tres tipos de condicións:

**1. Media queries (`media()`):**

```css
.elemento {
    padding: if(media(min-width: 768px): 2rem; else: 1rem);
}
```

**2. Consultas de soporte (`supports()`):**

```css
.elemento {
    color: if(supports(color: oklch(50% 0.2 250)): oklch(50% 0.13 250); else: #1a5c8a);
}
```

**3. Consultas de estilo (`style()`):**

```css
.elemento {
    background: if(style(--tema: escuro): #1a1a1a; else: #ffffff);
}
```

**Nota:** as consultas de estilo xa se poden facer con `@container style()`. A función `if()` só as integra dentro dun valor.

**4. Outras condicións:**

- `else`: valor por defecto se ningunha condición se cumpre.
- Múltiples `else if`:

```css
.elemento {
    font-size: if(
        media(min-width: 1024px): 1.5rem;
        else if media(min-width: 768px): 1.25rem;
        else: 1rem
    );
}
```

#### 5.3 Exemplo mínimo funcional

**Arquivo HTML:**

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>A función if()</title>
    <link rel="stylesheet" href="estilos/if.css">
</head>
<body>
    <button class="boton">Un botón adaptativo</button>
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
    padding: 2rem;
}

.boton {
    /* Padding fluído con if() */
    padding: if(
        media(min-width: 768px): 1rem 2rem;
        else: 0.75rem 1.25rem
    );

    /* Cor moderna se está soportada */
    background: if(
        supports(color: oklch(50% 0.2 250)): oklch(50% 0.13 250);
        else: #1a5c8a
    );

    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
}
```

**Que está a pasar aquí:**

1. O `padding` cambia segundo o ancho da pantalla, **nunha soa declaración**.
2. A cor de fondo usa OKLCH se está soportada, senón un hex equivalente.
3. **O mesmo efecto que dúas media queries e dous `@supports`**, pero nunha soa propiedade.

#### 5.4 Estado en 2026

| Aspecto                | Estado                           |
| ---------------------- | -------------------------------- |
| Soporte en Chrome/Edge | Desde Chrome 137 (xullo de 2025) |
| Soporte en Firefox     | **Non**                          |
| Soporte en Safari      | **Non**                          |
| Estado en Baseline     | **Non está en Baseline**         |
| Documentación en MDN   | Si (desde agosto de 2026)        |

**É a característica menos madura da lista de melloras.** Non se pode usar en produción sen unha estratexia de mellora progresiva.

#### 5.5 Cando usar `if()` e cando non

**Cando usar:**

- En proxectos onde xa se sabe que a maioría dos usuarios teñen Chrome/Edge.
- En experimentación e prototipos.
- Cando se combina con `@supports` xeral para asegurar que o resultado é aceptable en navegadores sen soporte.

**Cando non usar:**

- En produción con público amplo (a maioría de usuarios de Firefox e Safari non o verán).
- Como substituto **único** de media queries ou `@supports`.
- Cando o fallback non está claro.

**Recomendación:** **non substituír** media queries nin `@supports` por `if()`. Usar `if()` só en proxectos onde se controle a contorna, ou como mellora progresiva.

#### 5.6 Alternativa: usar `@supports` para detectar

Se queres usar `if()` de forma segura, podes comprobar primeiro se está soportada:

```css
@supports (width: if(media(min-width: 0): 1px; else: 2px)) {
    .boton {
        width: if(media(min-width: 768px): 200px; else: 100%);
    }
}
```

**Nota:** este patrón é complexo e non sempre funciona como se espera, porque a sintaxe de `if()` dentro de `@supports` pode non ser aceptada por todos os navegadores. **A alternativa máis segura é usar `@supports` só para as propiedades modernas que se poñan dentro de `if()`.**

#### 5.7 Erros frecuentes

**Erro 1: agardar que funcione en todos os navegadores.**

```css
/* Mal: sen fallback */
.boton {
    width: if(media(min-width: 768px): 200px; else: 100%);
}
```

**Solución:** pór sempre un valor por defecto **fóra** da función `if()`:

```css
/* Ben */
.boton {
    width: 100%;   /* fallback */
}

@supports (width: if(media(min-width: 0): 1px; else: 2px)) {
    .boton {
        width: if(media(min-width: 768px): 200px; else: 100%);
    }
}
```

**Erro 2: sintaxe incorrecta.**

```css
/* Mal: falta "else:" */
width: if(media(min-width: 768px): 200px; 100%);

/* Ben */
width: if(media(min-width: 768px): 200px; else: 100%);
```

**Erro 3: usar `if()` para lóxica complexa.**

`if()` está pensada para condicións simples. Se a lóxica é complexa, hai que usar `@media`, `@supports` ou `@container`.

**Erro 4: confundir `if()` con funcións de cor ou outras funcións.**

`if()` é unha función específica para **condicións**. Non é o mesmo ca `clamp()`, `min()` ou `max()`, que son funcións matemáticas.

---

## 6. Exemplo mínimo funcional: as tres at-rules xuntas

Vexamos un exemplo que usa as tres at-rules á vez.

**Arquivo HTML:**

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Layer, scope e supports</title>
    <link rel="stylesheet" href="estilos/avanzado.css">
</head>
<body>
    <main class="contido">
        <h1>Compoñentes illados</h1>

        <article class="tarxeta">
            <h2>Tarxeta exterior</h2>
            <p>Este é o texto da tarxeta exterior.</p>

            <article class="tarxeta">
                <h2>Tarxeta aniñada</h2>
                <p>Esta tarxeta está dentro da exterior, pero ten os seus propios estilos.</p>
            </article>
        </article>

        <article class="tarxeta">
            <h2>Outra tarxeta</h2>
            <p>Esta é independente.</p>
        </article>
    </main>
</body>
</html>
```

**Arquivo CSS:**

```css
/* ==============================
   Declaración de capas
   ============================== */
@layer reset, base, compoñentes, utilidades;

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
   Base
   ============================== */
@layer base {
    body {
        font-family: system-ui, sans-serif;
        line-height: 1.6;
        background: #fafafa;
        color: #333;
        padding: 2rem 1rem;
    }

    .contido {
        max-width: 700px;
        margin: 0 auto;
    }

    h1 {
        font-size: 1.75rem;
        color: #1a5c8a;
        margin-bottom: 2rem;
    }
}

/* ==============================
   Compoñentes (con @scope)
   ============================== */
@layer compoñentes {
    @scope (.tarxeta) to (.tarxeta) {
        :scope {
            background: white;
            padding: 1.5rem;
            border: 1px solid #e5e5e5;
            border-radius: 12px;
            margin-bottom: 1rem;
        }

        h2 {
            color: #1a5c8a;
            font-size: 1.125rem;
            margin-bottom: 0.5rem;
        }

        p {
            color: #666;
        }
    }
}

/* ==============================
   Utilidades
   ============================== */
@layer utilidades {
    .oculto {
        display: none;
    }
}

/* ==============================
   Mellora progresiva con @supports
   ============================== */

/* Se o navegador soporta :has(), aplicamos un estilo adicional */
@supports selector(:has(*)) {
    .tarxeta:has(.tarxeta) {
        background: #f9f9f9;
    }
}

/* Se o navegador soporta oklch(), usamos cores modernas */
@supports (color: oklch(50% 0.2 250)) {
    @layer base {
        h1 {
            color: oklch(45% 0.13 250);
        }
    }
}
```

**Que está a pasar aquí:**

1. **`@layer`** organiza o CSS en catro capas: `reset`, `base`, `compoñentes` e `utilidades`. A orde de prioridade está definida na primeira liña.
2. **`@scope (.tarxeta) to (.tarxeta)`** illa os estilos das tarxetas. Os estilos aplícanse a elementos dentro de `.tarxeta`, **pero non dentro de tarxetas aniñadas**.
3. **`@supports selector(:has(*))`** aplica un estilo adicional se o navegador soporta `:has()`.
4. **`@supports (color: oklch(...))`** redefine a cor do título usando OKLCH só se está soportado.

**Nota:** o bloque `@supports` con `@layer` dentro é un exemplo de combinación de at-rules. Pódese facer, pero hai que ter coidado coa orde e a claridade.

---

## 7. Casos habituais na práctica

### 7.1 Integración de libraría de terceiros

```css
@layer libraria, base, compoñentes;

@import url("bootstrap.css") layer(libraria);

@layer base {
    /* estilos base propios */
}

@layer compoñentes {
    .boton {
        background: red;   /* sobrescribe Bootstrap */
    }
}
```

### 7.2 Organización por capas

```css
@layer reset, base, layout, compoñentes, utilidades;
```

Xa o vimos. É o patrón máis habitual.

### 7.3 Illamento de compoñentes

```css
@scope (.tarxeta) {
    :scope {
        /* estilos da tarxeta */
    }

    h2 {
        /* títulos dentro da tarxeta */
    }
}
```

### 7.4 Mellora progresiva con `@supports`

```css
.contedor {
    display: flex;
}

@supports (display: grid) {
    .contedor {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
}
```

### 7.5 Comprobar soporte de características recentes

```css
@supports (container-type: inline-size) {
    .tarxeta-wrapper {
        container: tarxeta / inline-size;
    }

    @container tarxeta (min-width: 500px) {
        .tarxeta {
            display: flex;
        }
    }
}
```

### 7.6 Combinación de `@layer` e `@supports`

```css
@layer base, compoñentes, melloras;

@layer melloras {
    @supports (color: oklch(50% 0.2 250)) {
        :root {
            --cor-primaria: oklch(50% 0.13 250);
        }
    }
}
```

---

## 8. Erros frecuentes

### 8.1 Esquecer declarar as capas

Se usas `@layer nome { }` sen declarar antes a orde, as capas créanse **na orde en que aparecen**. Isto pode non ser o que queres.

```css
/* Mal: a orde depende da aparición */
@layer utilidades { /* ... */ }
@layer base { /* ... */ }    /* base queda DESPOIS de utilidades */

/* Ben: declarar a orde primeiro */
@layer base, utilidades;
```

### 8.2 Non saber que os estilos fóra de capas gañan

```css
@layer base {
    .boton {
        background: blue;
    }
}

/* Este estilo, fóra de capas, gaña sempre */
.boton {
    background: red;
}
```

Se queres que unha capa gañe sobre outra, ten que estar **declarada despois** na orde. Os estilos fóra de capas sempre gañan.

### 8.3 Usar `@scope` sen `:scope`

```css
/* Mal: "p" dentro do scope refírese a p fillos, non ao scope */
@scope (.tarxeta) {
    p {
        color: #666;
    }
}

/* Ben: se queres estilos para o propio scope, usa :scope */
@scope (.tarxeta) {
    :scope {
        padding: 1rem;
    }

    p {
        color: #666;
    }
}
```

### 8.4 Esquecer que `@scope` ten menor especificidade

```css
.tarxeta p {
    color: blue;
}

@scope (.tarxeta) {
    p {
        color: red;   /* pode non gañar, porque ten menor especificidade */
    }
}
```

Se queres que os estilos dentro de `@scope` gañen, hai que asegurar que a especificidade é suficiente ou que están nunha capa superior.

### 8.5 Usar `@supports` para características universalmente soportadas

```css
/* Redundante: flexbox está universalmente soportado desde hai anos */
@supports (display: flex) {
    .contedor {
        display: flex;
    }
}
```

**Recomendación:** usa `@supports` só para características recentes (container queries, `:has()`, OKLCH, scroll-driven animations...).

### 8.6 Non comprobar `@supports` en navegadores

Cada navegador pode soportar características distintas. `@supports` permite adaptarse, pero hai que **probar en varios navegadores** para asegurar que o resultado é o esperado en cada un.

### 8.7 Combinar `@layer` e `@scope` sen coidado

A combinación pode ser moi potente, pero tamén complicada. Hai que ter claro **que capa ten prioridade** e **que scope se aplica**.

**Recomendación:** se a combinación é complexa, simplifica. Ás veces non fai falta usar as dúas.

### 8.8 Abusar de `@layer`

`@layer` é útil, pero se tes un proxecto pequeno con poucas regras, pode ser máis complexidade ca beneficio. **Non uses `@layer` só porque existe.**

---

## 9. Compatibilidade (2026)

| Característica           | Estado                   |
| ------------------------ | ------------------------ |
| `@layer`                 | Baseline desde 2022      |
| `@scope`                 | Baseline desde 2023      |
| `@supports`              | Universal desde hai anos |
| `@supports selector()`   | Baseline desde 2022      |
| `@import ... layer(...)` | Baseline desde 2022      |

As tres at-rules están estabilizadas. `@layer` e `@scope` son relativamente recentes, pero en 2026 están universalmente soportadas en navegadores modernos.

---

## 10. Exercicios

### Exercicio 1: Declarar capas

Escribe a liña que declara catro capas: `reset`, `base`, `compoñentes` e `utilidades`, nesta orde de prioridade.

<details>
<summary><b>Amosar a solución</b></summary>

```css
@layer reset, base, compoñentes, utilidades;
```

</details>


### Exercicio 2: Engadir estilos a unha capa

Engade un estilo `.boton` á capa `compoñentes`.

<details>
<summary><b>Amosar a solución</b></summary>

```css
@layer compoñentes {
    .boton {
        background: #1a5c8a;
        color: white;
        padding: 0.5rem 1rem;
    }
}
```

</details>


### Exercicio 3: `@scope`

Escribe un `@scope` que limite os estilos a elementos dentro de `.tarxeta`, e que defina un estilo para o propio scope.

<details>
<summary><b>Amosar a solución</b></summary>

```css
@scope (.tarxeta) {
    :scope {
        padding: 1.5rem;
        background: white;
    }

    h2 {
        color: #1a5c8a;
    }
}
```

</details>


### Exercicio 4: `@supports`

Escribe CSS que aplique unha grella se o navegador soporta `display: grid`, e unha alternativa con flexbox se non.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.contedor {
    display: flex;
    gap: 1rem;
}

@supports (display: grid) {
    .contedor {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
}
```

</details>


### Exercicio 5: Comprobar `:has()`

Escribe CSS que aplique un estilo só se o navegador soporta `:has()`.

<details>
<summary><b>Amosar a solución</b></summary>

```css
@supports selector(:has(*)) {
    .tarxeta:has(img) {
        padding: 0;
    }
}
```

</details>


### Exercicio 6: Detectar o erro

```css
@layer base, utilidades;

@layer utilidades {
    .texto-centrado {
        text-align: center;
    }
}

@layer base {
    #titulo {
        text-align: left;
    }
}
```

Se un elemento ten `id="titulo"` e `class="texto-centrado"`, cal é o resultado?

<details>
<summary><b>Amosar a solución</b></summary>

Gaña `text-align: center`, porque `utilidades` é unha capa superior, **independentemente da especificidade** do selector `#titulo`. Isto é o que fai `@layer` tan útil.

</details>


---

## 11. Para profundar

- **MDN Web Docs:** [@layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) — referencia completa.
- **MDN Web Docs:** [@scope](https://developer.mozilla.org/en-US/docs/Web/CSS/@scope) — referencia completa.
- **MDN Web Docs:** [@supports](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports) — referencia completa.
- **MDN Web Docs:** [Cascade layers](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Cascade_layers) — guía de capas.
- **web.dev:** [Cascade layers](https://web.dev/learn/css/cascade-layers) — lección interactiva.
- **Miriam Suzanne:** [A Complete Guide to CSS Cascade Layers](https://css-tricks.com/css-cascade-layers/) — guía moi detallada.
- **W3C:** [CSS Cascading and Inheritance Level 5](https://www.w3.org/TR/css-cascade-5/) — especificación de `@layer`.
- **W3C:** [CSS Scoping Module Level 1](https://www.w3.org/TR/css-scoping-1/) — especificación de `@scope`.
- **W3C:** [CSS Conditional Rules Module Level 3](https://www.w3.org/TR/css-conditional-3/) — especificación de `@supports`.

---

## 12. Referencias cruzadas

- **Capítulo 3: Selectores básicos** — a especificidade, que `@layer` pode sobrescribir.
- **Capítulo 11: Media queries** — `@supports` combínase con outras at-rules.
- **Capítulo 14: Propiedades personalizadas** — as variables CSS úsanse con `@layer` para temas.
- **Capítulo 15: Aniñamento nativo** — o aniñado pódese combinar con `@scope` e `@layer`.
- **Capítulo 22: Scroll-driven animations** — `@supports` é especialmente útil para aplicar estas animacións de forma segura.
- **Capítulo 24: Rendemento e boas prácticas** — `@layer` axuda a organizar o CSS en proxectos grandes.
- **Capítulo 26: Accesibilidade e CSS** — `@scope` e `@supports` poden usarse para aplicar melloras de accesibilidade.

---

**Data de creación:** 2026-09-17  
**Última revisión:** 2026-09-17  
**Estado:** Borrador para validación
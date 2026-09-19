---
title: "View Transitions API"
description: "Guía da View Transitions API para animar cambios de estado e navegacións entre páxinas con CSS."
bloque: 6
capitulo: 19
nivel: avanzado
ultima_revision: "2026-09-17"
estado: "borrador_para_validacion"
compatibilidade: "baseline_2023"
palabras_chave:
  - view_transition
  - view_transitions_api
  - transicion_estado
  - transicion_pagina
  - declarativo
  - animacion_automatica
  - SPA
  - navegacion
---

<!-- # Capítulo 19: View Transitions API -->

> A **View Transitions API** permite crear **transicións suaves entre estados dunha páxina**, ou entre páxinas distintas, cunha sintaxe **declarativa en CSS**. Cando un elemento cambia de posición, de tamaño ou de aparencia —ou cando se navega a outra páxina—, o navegador xera automaticamente unha animación entre o estado anterior e o novo. Isto substitúe moitos patróns que antes se facían con JavaScript, e é a ferramenta moderna para transicións de estado en aplicacións web.

---

## 1. Introdución: o problema das transicións de estado

Imaxina que tes unha lista de tarxetas e, ao facer clic nunha, o elemento se expande, cambia de posición e amosa máis información. Sen transición, o cambio é **brusco**: a tarxeta salta dun sitio a outro, desaparece dun lugar e aparece noutro.

Ata hai pouco, para facer este tipo de transicións había que usar **JavaScript** para:

1. Capturar o estado anterior do elemento.
2. Aplicar o novo estado.
3. Calcular a diferenza entre os dous.
4. Animar manualmente esa diferenza.

Isto é complexo, propenso a erros, e require moito código. Ademais, as transicións entre **páxinas distintas** (navegación) eran practicamente imposibles de facer con CSS puro.

**A View Transitions API resolve isto.** Permite que o navegador **capture automaticamente** o estado anterior e o novo, e xere a transición. A persoa que programa só ten que:

1. Marcar os elementos que quere animar cun nome (`view-transition-name`).
2. Chamar á API (para transicións con JavaScript) ou simplemente navegar (para transicións entre páxinas).
3. Personalizar a animación con CSS (opcional).

O navegador fai o resto.

> 💡 **Para pensar:** a View Transitions API é un cambio de paradigma. Antes, as transicións de estado eran unha tarefa de JavaScript; agora son unha tarefa de CSS. Isto reduce o código, mellora o rendemento, e fai que as transicións sexan máis accesibles (porque respectan automaticamente `prefers-reduced-motion` se se configura).

---

## 2. Conceptos fundamentais

### 2.1 Que é unha view transition

Unha **view transition** (transición de vista) é unha animación que o navegador xera **entre dous estados dunha páxina** ou **entre dúas páxinas distintas**. Cando se activa:

1. O navegador **captura** unha imaxe do estado actual.
2. Aplica o novo estado.
3. **Captura** unha imaxe do novo estado.
4. **Anima** entre as dúas imaxes.

O resultado é unha transición suave, coma se fose unha animación entre pantallas.

### 2.2 Elementos con nome

Para que o navegador saiba **que elementos animar**, hai que **nomealos** coa propiedade `view-transition-name`:

```css
.tarxeta-principal {
    view-transition-name: tarxeta;
}
```

**Regras:**

- Cada nome debe ser **único** nun momento dado. Non pode haber dous elementos co mesmo `view-transition-name` ao mesmo tempo.
- Os nomes son identificadores libres, pero deben ser **CSS-identifiers** válidos (`tarxeta`, `-imaxe-principal`, `foto1`...).
- Se un elemento non ten `view-transition-name`, o navegador **non o anima individualmente** (só se anima o conxunto da páxina).

#### 2.3 Pseudo-elementos de transición

Durante unha transición, o navegador crea unha árbore de **pseudo-elementos** que se poden estilizar:

| Pseudo-elemento                      | Que representa                  |
| ------------------------------------ | ------------------------------- |
| `::view-transition`                  | A raíz de toda a transición.    |
| `::view-transition-group(nome)`      | O grupo dun elemento con nome.  |
| `::view-transition-image-pair(nome)` | O par de imaxes (vella e nova). |
| `::view-transition-old(nome)`        | A imaxe do estado **anterior**. |
| `::view-transition-new(nome)`        | A imaxe do estado **novo**.     |

Estes pseudo-elementos só existen **durante a transición**. Pódense estilizar para personalizar a animación.

### 2.4 Tipos de view transitions

Hai **tres tipos** de transicións de vista:

1. **Same-document:** entre dous estados da **mesma páxina** (por exemplo, un elemento que se expande, un cambio de tema). **Requirir chamar á API desde JavaScript.**
2. **Cross-document (MPA):** entre **páxinas distintas**, ao navegar. **Non require JavaScript**, só CSS.
3. **Element-scoped:** transicións con **alcance de elemento**, que permiten múltiples transicións simultáneas e aniñadas. **Característica moi recente (Chrome 147+, 2026).**

---

## 3. Sintaxe

### 3.1 Transicións cross-document (sen JavaScript)

A forma máis simple de usar View Transitions: en dúas páxinas distintas, engadir esta regra ao CSS:

```css
@view-transition {
    navigation: auto;
}
```

**Que ocorre aquí:** cando a persoa navega **dunha páxina a outra** (por exemplo, premendo unha ligazón), o navegador anima a transición automaticamente. **Non require JavaScript.**

**Requisitos:**

- As dúas páxinas deben estar no **mesmo orixe** (mesmo dominio e protocolo).
- Ambas deben ter a regra `@view-transition { navigation: auto; }`.
- A navegación debe ser «normal» (ligazóns internas). Non funciona con formularios POST nin con redireccións complexas.

**Exemplo:**

**Páxina 1 (`index.html`):**

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <title>Inicio</title>
    <link rel="stylesheet" href="estilos/transicions.css">
</head>
<body>
    <h1>Páxina de inicio</h1>
    <a href="sobre.html">Ir á páxina «Sobre»</a>
</body>
</html>
```

**Páxina 2 (`sobre.html`):**

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <title>Sobre</title>
    <link rel="stylesheet" href="estilos/transicions.css">
</head>
<body>
    <h1>Páxina «Sobre»</h1>
    <a href="index.html">Volver ao inicio</a>
</body>
</html>
```

**Arquivo CSS (`estilos/transicions.css`):**

```css
@view-transition {
    navigation: auto;
}
```

**Resultado:** ao navegar entre as dúas páxinas, o navegador fai unha transición suave (por defecto, un cross-fade).

### 3.2 Transicións same-document (con JavaScript)

Para animar un cambio dentro da mesma páxina, hai que chamar á API `document.startViewTransition()`:

```javascript
document.startViewTransition(() => {
    // Aquí vai o código que cambia o DOM
    actualizarAPaxina();
});
```

**Exemplo:**

```html
<button id="cambiar">Cambiar vista</button>
<main id="contido">
    <!-- contido -->
</main>
```

```javascript
const boton = document.getElementById('cambiar');
const contido = document.getElementById('contido');

boton.addEventListener('click', () => {
    document.startViewTransition(() => {
        contido.textContent = 'Novo contido';
        contido.classList.toggle('novo');
    });
});
```

**Como funciona:**

1. `startViewTransition()` recibe unha **función de callback** que fai o cambio no DOM.
2. O navegador captura o estado anterior.
3. Executa o callback (cambio no DOM).
4. Captura o novo estado.
5. Anima entre os dous.

**Importante:** a función de callback debe ser **síncrona** ou devolver unha promesa. Se é asíncrona, o navegador espera a que se resolva antes de continuar.

### 3.3 Nomear elementos con `view-transition-name`

Para animar elementos individuais, hai que nomealos:

```css
.tarxeta {
    view-transition-name: tarxeta-principal;
}

.imaxe-grande {
    view-transition-name: imaxe-destacada;
}
```

**Coidado:** os nomes deben ser **únicos** nun momento dado. Se hai dous elementos co mesmo nome visibles, a transición **falla silenciosamente** (non hai erro, simplemente non se animan eses elementos).

**Solución:** usar clases dinámicas que cambian o nome cando se quere animar:

```css
.tarxeta.activa {
    view-transition-name: tarxeta-activa;
}
```

Cando unha tarxeta se activa, recibe o nome. As demais non o teñen.

---

## 4. Personalización con CSS

### 4.1 A estrutura de pseudo-elementos

Durante unha transición, o navegador crea a seguinte árbore:

```
::view-transition
├── ::view-transition-group(nome)
│   └── ::view-transition-image-pair(nome)
│       ├── ::view-transition-old(nome)
│       └── ::view-transition-new(nome)
```

Isto significa que se pode personalizar:

- A **animación** de cada imaxe (vella e nova).
- A **animación** do grupo (por exemplo, unha escala).
- **Transicións específicas** para cada elemento nomeado.

#### 4.2 Personalizar a animación por defecto

Por defecto, a animación é un **cross-fade** (a imaxe vella esvaece, a nova aparece). Pódese cambiar:

```css
::view-transition-old(raiz),
::view-transition-new(raiz) {
    animation-duration: 0.5s;
    animation-timing-function: ease-out;
}
```

**`raiz`** é un nome reservado que representa a transición da páxina enteira (o `:root`).

#### 4.3 Animar elementos individuais

```css
/* O grupo do elemento «tarxeta» */
::view-transition-group(tarxeta) {
    animation-duration: 0.4s;
    animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* A imaxe vella */
::view-transition-old(tarxeta) {
    animation: fade-out 0.3s ease-in forwards;
}

/* A imaxe nova */
::view-transition-new(tarxeta) {
    animation: fade-in 0.3s ease-out forwards;
}
```

**`::view-transition-group()`** é o máis útil, porque controla a animación de todo o grupo. A maioría das personalizacións fanse alí.

### 4.4 Personalizar unha animación concreta

Pódense usar todas as propiedades de animación:

```css
::view-transition-group(tarxeta) {
    animation: 0.4s ease-out both deslizar;
}

@keyframes deslizar {
    from { transform: translateX(-20px); opacity: 0; }
    to   { transform: translateX(0); opacity: 1; }
}
```

### 4.5 Desactivar unha transición específica

```css
::view-transition-group(tarxeta) {
    animation: none;
}
```

Útil cando un elemento non debe animarse durante unha transición xeral.

### 4.6 `view-transition-name: none`

Para elementos que **non deben ser capturados** pola transición:

```css
.elemento-fixo {
    view-transition-name: none;
}
```

O valor `none` é o por defecto. Só hai que usalo cando se quere **excluír** un elemento que herdou un nome dun antepasado.

### 4.7 `view-transition-class`

Cando hai **moitos elementos** que deben ter a mesma animación pero **nomes distintos**, pódese usar `view-transition-class`:

```css
.tarxeta {
    view-transition-class: tarxeta-comun;
}

.tarxeta:nth-child(1) { view-transition-name: t1; }
.tarxeta:nth-child(2) { view-transition-name: t2; }
.tarxeta:nth-child(3) { view-transition-name: t3; }
```

E logo:

```css
::view-transition-group(.tarxeta-comun) {
    animation-duration: 0.4s;
}
```

Isto evita ter que escribir unha regra por cada elemento.

---

## 5. Exemplo mínimo funcional

Vexamos unha páxina que usa View Transitions para animar a expansión dunha tarxeta.

**Arquivo HTML:**

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View Transitions API</title>
    <link rel="stylesheet" href="estilos/view-transitions.css">
</head>
<body>
    <main class="contido">
        <h1>Galería</h1>

        <div class="galeria">
            <article class="tarxeta" data-id="1">
                <h2>Tarxeta 1</h2>
                <p>Pasa o rato e fai clic para expandir.</p>
            </article>
            <article class="tarxeta" data-id="2">
                <h2>Tarxeta 2</h2>
                <p>Pasa o rato e fai clic para expandir.</p>
            </article>
            <article class="tarxeta" data-id="3">
                <h2>Tarxeta 3</h2>
                <p>Pasa o rato e fai clic para expandir.</p>
            </article>
        </div>
    </main>

    <script>
        document.querySelectorAll('.tarxeta').forEach((tarxeta) => {
            tarxeta.addEventListener('click', () => {
                // Se hai View Transitions API, úsaa
                if (document.startViewTransition) {
                    document.startViewTransition(() => {
                        tarxeta.classList.toggle('expandida');
                    });
                } else {
                    tarxeta.classList.toggle('expandida');
                }
            });
        });
    </script>
</body>
</html>
```

**Arquivo CSS:**

```css
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

/* ==============================
   Habilitar View Transitions
   ============================== */
@view-transition {
    navigation: auto;
}

body {
    font-family: system-ui, sans-serif;
    line-height: 1.6;
    background: #fafafa;
    color: #333;
    padding: 2rem 1rem;
}

.contido {
    max-width: 900px;
    margin: 0 auto;

    h1 {
        font-size: clamp(1.5rem, 1rem + 2vw, 2rem);
        color: #1a5c8a;
        margin-bottom: 2rem;
    }
}

.galeria {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
    gap: 1rem;
}

/* ==============================
   Tarxeta
   ============================== */
.tarxeta {
    background: white;
    padding: 1.5rem;
    border: 1px solid #e5e5e5;
    border-radius: 12px;
    cursor: pointer;
    transition: box-shadow 0.2s;

    /* Nome para a transición */
    view-transition-name: none;

    &:hover {
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    }

    h2 {
        font-size: 1.125rem;
        color: #1a5c8a;
        margin-bottom: 0.5rem;
    }

    p {
        color: #666;
        font-size: 0.95rem;
    }

    /* Cando está expandida */
    &.expandida {
        grid-column: 1 / -1;
        padding: 2rem;
        background: #f5f8fc;
        view-transition-name: tarxeta-expandida;

        h2 {
            font-size: 1.5rem;
        }

        p {
            font-size: 1.05rem;
        }
    }
}

/* ==============================
   Personalización da transición
   ============================== */
::view-transition-old(tarxeta-expandida),
::view-transition-new(tarxeta-expandida) {
    animation-duration: 0.4s;
    animation-timing-function: ease-out;
}

::view-transition-group(tarxeta-expandida) {
    animation-duration: 0.4s;
    animation-timing-function: cubic-bezier(0.34, 1.2, 0.64, 1);
}

/* ==============================
   Accesibilidade
   ============================== */
@media (prefers-reduced-motion: reduce) {
    ::view-transition-group(*),
    ::view-transition-old(*),
    ::view-transition-new(*) {
        animation-duration: 0.01ms !important;
    }
}
```

**Que está a pasar aquí:**

1. **`@view-transition { navigation: auto; }`** habilita transicións entre páxinas (aínda que neste exemplo non hai navegación).
2. **Cada tarxeta** ten `view-transition-name: none` por defecto, o que significa que non se anima individualmente.
3. **Cando unha tarxeta se expande**, recibe `view-transition-name: tarxeta-expandida`. Nese momento, o navegador captura o estado anterior e o novo, e anima entre eles.
4. **As regras `::view-transition-group()`** personalizan a duración e a curva da animación.
5. **A media query de `prefers-reduced-motion`** reduce a duración da animación.

**Nota importante:** o nome `tarxeta-expandida` só pode estar nun elemento a un tempo. Se se expanden dúas tarxetas simultaneamente, o navegador amosará un erro de duplicación. Neste exemplo, as tarxetas só se expanden dunha en unha (ao facer clic), así que non hai problema.

---

## 6. Casos habituais na práctica

### 6.1 Transición de páxina a páxina (MPA)

Xa o vimos. O caso máis simple:

```css
@view-transition {
    navigation: auto;
}
```

### 6.2 Transición de contido (SPA)

```javascript
document.startViewTransition(() => {
    // actualizar o contido
});
```

### 6.3 Expansión de tarxetas

Xa o vimos no exemplo mínimo.

### 6.4 Cambio de tema

```javascript
botonTema.addEventListener('click', () => {
    document.startViewTransition(() => {
        document.documentElement.classList.toggle('escuro');
    });
});
```

Con CSS:

```css
:root {
    view-transition-name: raiz;
}

.escuro {
    --cor-fondo: #1a1a1a;
    --cor-texto: #e0e0e0;
}

::view-transition-old(raiz),
::view-transition-new(raiz) {
    animation-duration: 0.3s;
}
```

O cambio de tema faise cun cross-fade suave.

### 6.5 Imaxe que se expande a pantalla completa

```css
.miniatura {
    view-transition-name: imaxe-1;
}

.imaxe-expandida {
    view-transition-name: imaxe-1;   /* mesmo nome */
    position: fixed;
    inset: 0;
    z-index: 1000;
}
```

Ao facer clic na miniatura, o navegador anima a súa expansión a pantalla completa.

### 6.6 Transicións entre elementos de lista

```css
.lista li.activo {
    view-transition-name: elemento-activo;
}
```

Ao cambiar o elemento activo, a transición fai que se mova suavemente.

---

## 7. Erros frecuentes

### 7.1 Esquecer nomear os elementos

```css
/* Mal: sen view-transition-name, o elemento non se anima individualmente */
.tarxeta {
    /* ... */
}
```

**Solución:** dar un nome único aos elementos que se queren animar.

### 7.2 Nomes duplicados

```css
/* Mal: dous elementos co mesmo nome visible */
.tarxeta-1 { view-transition-name: tarxeta; }
.tarxeta-2 { view-transition-name: tarxeta; }
```

**Solución:** asegurar que só un elemento ten o nome a un tempo. Usar clases dinámicas ou pseudo-clases.

### 7.3 Nomes inválidos

```css
/* Mal: nomes con caracteres non permitidos */
.elemento { view-transition-name: "tarxeta principal"; }
.elemento { view-transition-name: 123; }
```

**Solución:** usar identificadores CSS válidos: letras, díxitos, guións, guións baixos. Non usar comiñas nin espazos.

### 7.4 Non comprobar o soporte

```javascript
/* Mal: se non hai soporte, isto dá erro */
document.startViewTransition(() => { /* ... */ });
```

**Solución:** comprobar antes:

```javascript
if (document.startViewTransition) {
    document.startViewTransition(() => { /* ... */ });
} else {
    /* cambio directo */
    actualizarAPaxina();
}
```

### 7.5 Esperar que `@view-transition` funcione en calquera navegación

`@view-transition { navigation: auto; }` só funciona **entre páxinas do mesmo orixe** e con **navegación normal**. Non funciona con:

- Formularios POST.
- Redireccións 301/302.
- Navegación a outro dominio.

### 7.6 Non respectar `prefers-reduced-motion`

As transicións de vista tamén se deben reducir cando a persoa o prefire.

```css
@media (prefers-reduced-motion: reduce) {
    ::view-transition-group(*),
    ::view-transition-old(*),
    ::view-transition-new(*) {
        animation-duration: 0.01ms !important;
    }
}
```

### 7.7 Animar elementos con posición fixa

Os elementos `position: fixed` poden comportarse de forma estraña durante as transicións. Se hai problemas, hai que excluílos:

```css
.elemento-fixo {
    view-transition-name: none;
}
```

### 7.8 Non usar `view-transition-class` cando hai moitos elementos

Se hai 20 tarxetas, non ten sentido escribir 20 regras `::view-transition-group(t1)`, `(t2)`, `(t3)`... Mellor usar `view-transition-class`:

```css
.tarxeta { view-transition-class: tarxeta-comun; }
.tarxeta:nth-child(1) { view-transition-name: t1; }
/* ... */

::view-transition-group(.tarxeta-comun) {
    animation-duration: 0.3s;
}
```

---

## 8. Compatibilidade (2026)

| Característica                        | Estado                                                       |
| ------------------------------------- | ------------------------------------------------------------ |
| View Transitions same-document        | Baseline desde 2025 (Chrome/Edge 111+, Firefox 133+, Safari 18+) |
| View Transitions cross-document (MPA) | Chrome/Edge 126+, Safari 18.2+. **Firefox aínda non.**       |
| `view-transition-class`               | Baseline desde 2025                                          |
| Element-scoped view transitions       | Chrome 147+ (2026). **Experimental.**                        |

**Recomendación:**

- **Same-document:** úsase con confianza en 2026.
- **Cross-document:** úsase, pero hai que **asegurar que a navegación funcione sen transición** en Firefox.
- **Element-scoped:** só en experimentación.

**Mellora progresiva:**

```css
@supports (view-transition-name: none) {
    /* Estilos específicos para View Transitions */
}
```

En JavaScript:

```javascript
if (document.startViewTransition) {
    document.startViewTransition(() => {
        // cambio no DOM
    });
} else {
    // cambio directo, sen transición
}
```

---

## 9. Exercicios

### Exercicio 1: Transición entre páxinas

Escribe o CSS mínimo para que dúas páxinas do mesmo sitio teñan unha transición suave ao navegar entre elas.

<details>
<summary><b>Amosar a solución</b></summary>

```css
@view-transition {
    navigation: auto;
}
```

</details>


### Exercicio 2: Nomear un elemento

Escribe CSS para que unha tarxeta chamada `.tarxeta-destacada` se anime durante unha transición.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.tarxeta-destacada {
    view-transition-name: tarxeta;
}
```

</details>


### Exercicio 3: Personalizar a animación

Escribe CSS para que a transición da tarxeta do exercicio anterior dure 0,5 segundos cunha curva `ease-out`.

<details>
<summary><b>Amosar a solución</b></summary>

```css
::view-transition-group(tarxeta) {
    animation-duration: 0.5s;
    animation-timing-function: ease-out;
}
```

</details>


### Exercicio 4: JavaScript

Escribe o código JavaScript mínimo para que un botón cambie o contido dun elemento cunha View Transition.

<details>
<summary><b>Amosar a solución</b></summary>

```javascript
boton.addEventListener('click', () => {
    if (document.startViewTransition) {
        document.startViewTransition(() => {
            contido.textContent = 'Novo contido';
        });
    } else {
        contido.textContent = 'Novo contido';
    }
});
```

</details>


### Exercicio 5: Detectar o erro

```css
.tarxeta-1 { view-transition-name: tarxeta; }
.tarxeta-2 { view-transition-name: tarxeta; }
```

Por que isto non funciona?

<details>
<summary><b>Amosar a solución</b></summary>

Os nomes de transición deben ser **únicos** nun momento dado. Se dúas tarxetas teñen o mesmo nome, o navegador non sabe cal animar. Solución: usar nomes distintos, ou asegurar que só unha ten o nome a un tempo.

</details>

---

## 10. Para profundar

- **MDN Web Docs:** [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API) — guía completa.
- **MDN Web Docs:** [view-transition-name](https://developer.mozilla.org/en-US/docs/Web/CSS/view-transition-name) — referencia.
- **MDN Web Docs:** [@view-transition](https://developer.mozilla.org/en-US/docs/Web/CSS/@view-transition) — referencia.
- **web.dev:** [Smooth transitions with the View Transition API](https://developer.web.dev/articles/view-transitions) — artigo de Google.
- **Chrome for Developers:** [View Transitions](https://developer.chrome.com/docs/web-platform/view-transitions) — documentación oficial.
- **Jake Archibald:** [View Transitions](https://jakearchibald.com/2023/view-transitions/) — artigo de referencia.
- **W3C:** [CSS View Transitions Module Level 1](https://www.w3.org/TR/css-view-transitions-1/) — especificación.

---

## 11. Referencias cruzadas

- **Capítulo 18: Transicións e animacións** — a View Transitions API baséase nas transicións CSS.
- **Capítulo 20: Transformacións 2D e 3D** — as transformacións úsanse para animar elementos nas transicións.
- **Capítulo 22: Scroll-driven animations** — outro tipo de animación que non depende do tempo.
- **Capítulo 23: `@layer`, `@scope`, `@supports`** — `@supports` úsase para aplicar View Transitions de forma segura.
- **Capítulo 24: Rendemento e boas prácticas** — as View Transitions teñen implicacións de rendemento.
- **Capítulo 26: Accesibilidade e CSS** — `prefers-reduced-motion` é fundamental.

---

**Data de creación:** 2026-09-17  
**Última revisión:** 2026-09-17  
**Estado:** Borrador para validación
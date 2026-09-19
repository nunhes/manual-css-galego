---
title: "Scroll-driven animations"
description: "Creación de animacións CSS controladas polo scroll mediante liñas temporais de desprazamento e visibilidade."
bloque: 6
capitulo: 22
nivel: avanzado
ultima_revision: "2026-09-17"
estado: "borrador_para_validacion"
compatibilidade: "baseline_2024"
palabras_chave:
  - scroll_driven_animation
  - scroll
  - animation_timeline
  - view
  - parallax
  - barra_progreso
  - aparicion_gradual
  - timeline
---

<!-- # Capítulo 22: Scroll-driven animations -->

> As **animacións dirixidas polo scroll** (en inglés, *scroll-driven animations*) permiten que unha animación **avance ou retroceda en función da posición do scroll**, en lugar de executarse automaticamente ao longo do tempo. Isto permite crear efectos como barras de progreso que medran ao facer scroll, elementos que aparecen gradualmente, cabeceiras que se reducen, ou imaxes que se desprazan a distintas velocidades (parallax). Ata hai pouco, todo isto requiría JavaScript. Hoxe pódese facer con CSS puro.

---

## 1. Introdución: animacións que dependen do scroll

Cando pensamos en animacións, normalmente pensamos en animacións **baseadas no tempo**: un elemento xira durante 1 segundo, unha cor cambia en 0,3 segundos, unha tarxeta aparece en 0,5 segundos. O tempo é o motor.

Pero hai outro tipo de animación moi habitual na web: a que **depende da posición do scroll**. Cando fas scroll cara abaixo nunha páxina, os elementos poden:

- Aparecer gradualmente.
- Desprazarse a distintas velocidades (efecto parallax).
- Cambiar de tamaño ou de cor.
- Amosar unha barra de progreso que se enche.

Ata hai uns anos, todo isto requiría **JavaScript**, escoitando o evento `scroll` e actualizando estilos en cada fotograma. Era custoso, propenso a erros, e podía bloquear o fío principal do navegador.

**As scroll-driven animations** resolven isto: permiten definir animacións en CSS que se executan **en función do scroll**, non do tempo. O navegador xestiona todo internamente, de forma eficiente.

> 💡 **Para pensar:** a diferenza conceptual é importante:
>
> - **Animación clásica:** o tempo avanza, a animación avanza.
> - **Animación dirixida polo scroll:** o scroll avanza, a animación avanza.
>
> Se o scroll se detén, a animación detense. Se fas scroll cara atrás, a animación retrocede. O scroll convértese no «tempo» da animación.

---

## 2. Conceptos fundamentais

Antes de ver a sintaxe, hai que entender tres conceptos.

### 2.1 Liña temporal (timeline)

Unha **liña temporal** (timeline) é a fonte que determina como avanza unha animación. Nas animacións clásicas, a liña temporal é o **tempo**. Nas scroll-driven animations, hai dúas liñas temporais alternativas:

- **Scroll timeline:** baséase no **desprazamento do scroll do contedor** (normalmente o documento). A animación avanza desde que empeza o scroll ata que remata.
- **View timeline:** baséase en **cando un elemento entra e sae da ventá**. A animación avanza desde que o elemento aparece ata que desaparece.

### 2.2 Elemento «suxeito» e elemento «fonte»

Nunha animación dirixida polo scroll hai dous elementos:

- **Elemento suxeito (subject):** o elemento que se anima.
- **Elemento fonte (scroll source / view source):** o elemento cuxo scroll ou visibilidade determina o avance da animación.

Moitas veces o elemento fonte é o propio documento (o scroll da páxina), pero pode ser calquera contedor con scroll.

### 2.3 `animation-timeline`: a propiedade clave

A propiedade **`animation-timeline`** conecta unha animación cunha liña temporal. É o que fai que unha animación clásica se convirta en scroll-driven.

```css
.elemento {
    animation: crecer linear;
    animation-timeline: scroll();
}
```

Sen `animation-timeline`, a animación execútase en función do tempo. Con `animation-timeline: scroll()`, execútase en función do scroll.

**Importante:** cando se usa `animation-timeline`, a propiedade `animation-duration` **ignórase**. A duración vén determinada pola liña temporal (o scroll), non polo tempo.

---

## 3. Scroll timeline

### 3.1 Sintaxe básica

```css
@keyframes encher-barra {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
}

.barra-progreso {
    transform-origin: left;
    animation: encher-barra linear;
    animation-timeline: scroll();
}
```

**Que ocorre aquí:**

1. A animación `encher-barra` vai de `scaleX(0)` a `scaleX(1)`.
2. `animation-timeline: scroll()` conecta esta animación ao **scroll do elemento raíz** (o documento).
3. Ao facer scroll cara abaixo, a barra enchese. Ao facer scroll cara arriba, a barra baleírase.
4. Cando o scroll chega ao final, a barra está chea.

**`transform-origin: left`** fai que a barra medre desde a esquerda (por defecto medraría desde o centro).

### 3.2 A función `scroll()`

`scroll()` é unha función que define que a liña temporal é un **contedor con scroll**. Pode recibir dous argumentos opcionais:

```css
animation-timeline: scroll(<eixe> <alcance>);
```

**Eixe (que scroll se ten en conta):**

- `block` (por defecto): o eixe de bloque (vertical, normalmente).
- `inline`: o eixe en liña (horizontal).
- `x`: eixe X.
- `y`: eixe Y.
- `nearest`: o eixe máis próximo.

**Alcance (que parte do scroll se usa):**

- `nearest` (por defecto): o scroll dispoñible máis próximo.
- `root`: o scroll do elemento raíz.
- `self`: o scroll do propio elemento.

**Exemplos:**

```css
/* Scroll vertical do documento */
animation-timeline: scroll();

/* Scroll vertical explícito */
animation-timeline: scroll(y);

/* Scroll dun contedor concreto (o máis próximo que teña scroll) */
animation-timeline: scroll(nearest);

/* Scroll do propio elemento */
animation-timeline: scroll(self);
```

### 3.3 Nomear unha liña temporal: `scroll-timeline`

Se queres referirte a unha liña temporal concreta desde outro elemento, podes **nomeala**.

**No contedor con scroll:**

```css
.contedor-con-scroll {
    overflow-y: scroll;
    height: 400px;
    scroll-timeline: --miña-liña block;
    /* nome: --miña-liña, eixe: block */
}
```

**No elemento animado:**

```css
.elemento {
    animation: crecer linear;
    animation-timeline: --miña-liña;
}
```

Isto é moi útil cando o elemento animado non é fillo directo do contedor con scroll.

**Atallos:**

- `scroll-timeline-name: --miña-liña;`
- `scroll-timeline-axis: block;`

---

## 4. View timeline

### 4.1 Que é unha view timeline

Unha **view timeline** baséase en **cando un elemento entra e sae da ventá**, non no scroll do documento. Isto é útil para animacións que dependen de que un elemento sexa visible.

**Exemplo:**

```css
@keyframes aparecer {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.tarxeta {
    animation: aparecer linear;
    animation-timeline: view();
}
```

**Que ocorre aquí:**

1. A animación `aparecer` fai que a tarxeta apareza con opacidade e desprazamento.
2. `animation-timeline: view()` conecta a animación ao **ciclo de visibilidade da propia tarxeta**.
3. Cando a tarxeta entra na ventá, comeza a animación. Cando está completamente visible, a animación está no seu punto medio. Cando sae, remata.

Este é o efecto clásico de «elementos que aparecen ao facer scroll», pero **sen JavaScript**.

### 4.2 A función `view()`

`view()` pode recibir dous argumentos opcionais:

```css
animation-timeline: view(<eixe> <inset>);
```

**Eixe:**

- `block` (por defecto): eixe de bloque (vertical).
- `inline`: eixe en liña (horizontal).
- `x`: eixe X.
- `y`: eixe Y.

**Inset:** axusta o alcance da liña temporal, reducindo ou ampliando a zona de activación. Pódese usar calquera valor de `inset` (top, right, bottom, left).

```css
animation-timeline: view(block 20%);
/* a animación comeza cando o elemento está a 20% de entrar */
```

### 4.3 `animation-range`: controlar cando empeza e remata

Por defecto, unha view timeline avanza desde que o elemento **aparece pola parte inferior da ventá** ata que **desaparece pola parte superior**. Con `animation-range` podes axustar isto.

**Sintaxe:**

```css
animation-range: <inicio> <fin>;
```

**Palabras clave para o inicio:**

- `cover`: o elemento apenas aparece (valor por defecto).
- `contain`: o elemento está completamente visible.
- `entry`: o elemento está entrando.
- `exit`: o elemento está saíndo.

**Palabras clave para o fin:** as mesmas, aplicadas ao final.

```css
/* A animación execútase cando o elemento está entrando na ventá */
animation-range: entry;

/* A animación execútase cando o elemento está completamente visible */
animation-range: contain;

/* A animación execútase desde que o elemento empeza a entrar
   ata que está completamente visible */
animation-range: entry contain;

/* Usar porcentaxes */
animation-range: entry 0% cover 50%;
```

**Exemplo práctico:**

```css
.tarxeta {
    animation: aparecer linear;
    animation-timeline: view();
    animation-range: entry 0% entry 50%;
}
```

A animación execútase durante a primeira metade da entrada da tarxeta, e queda fixada no estado final cando xa entrou á metade.

### 4.4 `view-timeline`: nomear unha view timeline

Igual que con `scroll-timeline`, pódese **nomear** unha view timeline:

```css
.tarxeta {
    view-timeline: --aparicion block;
}

.outro-elemento {
    animation: aparecer linear;
    animation-timeline: --aparicion;
}
```

Isto permite que un elemento se anime en función da visibilidade doutro.

---

## 5. Diferenzas entre `scroll()` e `view()`

| Aspecto        | `scroll()`                   | `view()`                 |
| -------------- | ---------------------------- | ------------------------ |
| Base           | Scroll do contedor           | Visibilidade do elemento |
| Elemento fonte | O contedor                   | O propio elemento        |
| Uso típico     | Barras de progreso, parallax | Elementos que aparecen   |
| Cando avanza   | Ao facer scroll              | Ao entrar/sair da ventá  |

**Regra práctica:**

- Se o efecto depende de **canto scroll** fixeches → `scroll()`.
- Se o efecto depende de **onde está o elemento na ventá** → `view()`.

---

## 6. Exemplo mínimo funcional

Vexamos unha páxina que combina varios efectos dirixidos polo scroll.

**Arquivo HTML:**

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Scroll-driven animations</title>
    <link rel="stylesheet" href="estilos/scroll.css">
</head>
<body>
    <!-- Barra de progreso fixa na parte superior -->
    <div class="barra-progreso"></div>

    <header class="cabecera">
        <h1>Animacións dirixidas polo scroll</h1>
        <p>Fai scroll para ver os efectos.</p>
    </header>

    <main class="contido">
        <section class="seccion">
            <h2>Primeira sección</h2>
            <p>Contido da primeira sección.</p>
            <p>Este é un texto de exemplo para encher o contido e poder facer scroll.</p>
        </section>

        <section class="seccion">
            <h2>Segunda sección</h2>
            <p>Contido da segunda sección.</p>
            <p>Este é outro texto de exemplo.</p>
        </section>

        <section class="tarxetas">
            <article class="tarxeta">Tarxeta 1</article>
            <article class="tarxeta">Tarxeta 2</article>
            <article class="tarxeta">Tarxeta 3</article>
            <article class="tarxeta">Tarxeta 4</article>
        </section>

        <section class="seccion">
            <h2>Terceira sección</h2>
            <p>Máis contido para facer scroll.</p>
        </section>
    </main>

    <footer class="pe">
        <p>Fin da páxina</p>
    </footer>
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

body {
    font-family: system-ui, sans-serif;
    line-height: 1.6;
    background: #fafafa;
    color: #333;
}

/* ==============================
   Barra de progreso fixa
   ============================== */
@keyframes encher-barra {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
}

.barra-progreso {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: #1a5c8a;
    transform-origin: left;
    transform: scaleX(0);
    z-index: 100;

    animation: encher-barra linear;
    animation-timeline: scroll();
}

/* ==============================
   Cabeceira
   ============================== */
.cabecera {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 2rem;
    background: linear-gradient(135deg, #1a5c8a, #0d3a5c);
    color: white;

    h1 {
        font-size: clamp(1.75rem, 1rem + 3vw, 3rem);
        margin-bottom: 1rem;
        max-width: 20ch;
    }

    p {
        font-size: clamp(1rem, 0.9rem + 0.5vw, 1.25rem);
        opacity: 0.9;
    }
}

/* ==============================
   Contido
   ============================== */
.contido {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
}

.seccion {
    padding: 4rem 2rem;
    margin-bottom: 2rem;
    background: white;
    border-radius: 12px;
    border: 1px solid #e5e5e5;

    h2 {
        color: #1a5c8a;
        margin-bottom: 1rem;
        font-size: 1.5rem;
    }

    p {
        color: #666;
        margin-bottom: 1rem;
    }
}

/* ==============================
   Tarxetas que aparecen ao facer scroll
   ============================== */
@keyframes aparecer {
    from {
        opacity: 0;
        transform: translateY(40px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.tarxetas {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    padding: 4rem 0;
}

.tarxeta {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid #e5e5e5;
    text-align: center;
    font-weight: 500;
    color: #1a5c8a;

    animation: aparecer linear both;
    animation-timeline: view();
    animation-range: entry 0% cover 50%;
}

/* ==============================
   Pe
   ============================== */
.pe {
    padding: 2rem;
    text-align: center;
    background: #333;
    color: white;
}

/* ==============================
   Accesibilidade
   ============================== */
@media (prefers-reduced-motion: reduce) {
    .barra-progreso,
    .tarxeta {
        animation: none !important;
    }

    .barra-progreso {
        transform: scaleX(1);
    }

    .tarxeta {
        opacity: 1;
        transform: none;
    }
}
```

**Que está a pasar aquí:**

1. **A barra de progreso** enchese ao facer scroll. `animation-timeline: scroll()` conecta a animación ao scroll do documento. `transform-origin: left` fai que medre desde a esquerda.
2. **As tarxetas** aparecen cando entran na ventá. `animation-timeline: view()` conecta a animación á visibilidade de cada tarxeta. `animation-range: entry 0% cover 50%` fai que a animación se execute durante a primeira metade da entrada.
3. **`animation-fill-mode: both`** (o `both` do atajo `animation`) garante que as tarxetas comezan invisibles e quedan visibles ao final.
4. **A media query** desactiva as animacións e restaura o estado visible para persoas que prefiren movemento reducido.

**Nota:** o bloque de `prefers-reduced-motion` é especialmente importante aquí. Cando se desactiva a animación, hai que asegurar que o contido segue visible.

---

## 7. Casos habituais na práctica

### 7.1 Barra de progreso de lectura

```css
.barra {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: #1a5c8a;
    transform-origin: left;
    transform: scaleX(0);
    animation: encher linear;
    animation-timeline: scroll();
}

@keyframes encher {
    to { transform: scaleX(1); }
}
```

### 7.2 Elementos que aparecen ao facer scroll

```css
.aparece {
    animation: entrar linear both;
    animation-timeline: view();
    animation-range: entry 0% cover 40%;
}

@keyframes entrar {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
}
```

### 7.3 Efecto parallax (simplificado)

```css
.hero {
    animation: parallax linear;
    animation-timeline: scroll();
}

@keyframes parallax {
    from { transform: translateY(0); }
    to   { transform: translateY(-30%); }
}
```

O elemento desprazase máis amodo que o scroll, creando un efecto de profundidade.

### 7.4 Cabeceira que se reduce

```css
.cabecera {
    animation: reducir linear both;
    animation-timeline: scroll();
    animation-range: 0 300px;
}

@keyframes reducir {
    from { padding: 4rem 2rem; font-size: 1.5rem; }
    to   { padding: 1rem 2rem; font-size: 1rem; }
}
```

A medida que fas scroll, a cabeceira vaise reducindo.

### 7.5 Imaxes que se amplían ao entrar

```css
.imaxe {
    animation: ampliar linear both;
    animation-timeline: view();
    animation-range: entry 0% cover 60%;
}

@keyframes ampliar {
    from { transform: scale(0.8); opacity: 0; }
    to   { transform: scale(1); opacity: 1; }
}
```

### 7.6 Rotación dun elemento segundo o scroll

```css
.logo {
    animation: xirar linear;
    animation-timeline: scroll();
}

@keyframes xirar {
    to { transform: rotate(360deg); }
}
```

O logo xira mentres fas scroll, facendo unha volta completa ao chegar ao final.

---

## 8. Erros frecuentes

### 8.1 Esquecer `animation-timeline`

```css
/* Isto executa a animación en función do TEMPO */
.elemento {
    animation: crecer linear;
    animation-duration: 2s;
}

/* Ben: conecta ao scroll */
.elemento {
    animation: crecer linear;
    animation-timeline: scroll();
}
```

Sen `animation-timeline`, a animación é clásica.

### 8.2 Esperar que `animation-duration` funcione

```css
/* A duración ignórase cando hai animation-timeline */
.elemento {
    animation: crecer 2s linear;
    animation-timeline: scroll();   /* os "2s" son ignorados */
}
```

A duración vén determinada polo scroll, non polo tempo.

### 8.3 Esquecer `animation-fill-mode`

```css
/* Sen fill-mode, o elemento volve ao estado inicial cando remata o scroll */
.tarxeta {
    animation: entrar linear;
    animation-timeline: view();
}

/* Ben */
.tarxeta {
    animation: entrar linear both;
    animation-timeline: view();
}
```

Para que o elemento quede no estado final ao rematar a animación, hai que usar `both` ou `forwards`.

### 8.4 Usar `animation-timeline: view()` cando o elemento non está no scroll

Se o elemento é `position: fixed` ou non está nun contedor con scroll, a view timeline pode non funcionar como se espera.

### 8.5 Non comprobar a compatibilidade

As scroll-driven animations **non teñen soporte universal en 2026**. En navegadores que non as soportan, a animación execútase como **animación clásica** (baseada no tempo), o que pode dar un resultado inesperado.

**Solución:** usar `@supports` para comprobar o soporte, ou deseñar o efecto de forma que sexa aceptable sen animación.

```css
@supports (animation-timeline: scroll()) {
    .elemento {
        animation: crecer linear;
        animation-timeline: scroll();
    }
}
```

### 8.6 Non respectar `prefers-reduced-motion`

**Especialmente importante aquí:** cando se desactiva a animación, hai que asegurar que o contido segue visible. Non abonda con quitar a animación; hai que restaurar o estado final.

```css
@media (prefers-reduced-motion: reduce) {
    .tarxeta {
        animation: none !important;
        opacity: 1;              /* restaurar estado visible */
        transform: none;
    }
}
```

### 8.7 Abusar do efecto parallax

O parallax intenso pode causar **desorientación** e **mareos** en persoas con sensibilidade ao movemento. Hai que usalo con moderación e sempre respectar `prefers-reduced-motion`.

### 8.8 Non comprobar o rendemento

Aínda que as scroll-driven animations son máis eficientes que as solucións con JavaScript, **non son gratuítas**. Moitas animacións simultáneas poden afectar ao rendemento.

**Solución:** comprobar en dispositivos reais, especialmente en móbiles.

---

## 9. Compatibilidade (2026)

| Característica                 | Estado                                                       |
| ------------------------------ | ------------------------------------------------------------ |
| `animation-timeline: scroll()` | Baseline desde 2024 (Chrome/Edge primeiro, Firefox e Safari despois) |
| `animation-timeline: view()`   | Baseline desde 2024                                          |
| `animation-range`              | Baseline desde 2024                                          |
| `scroll-timeline`              | Baseline desde 2024                                          |
| `view-timeline`                | Baseline desde 2024                                          |

**Estado real en 2026:** as scroll-driven animations están en Baseline **recente**. É dicir, os navegadores modernos xa as soportan, pero pode haber usuarios con navegadores antigos que non as teñan.

**Recomendación:**

1. Comproba en [web.dev/baseline](https://web.dev/baseline) o estado actualizado.
2. Usa `@supports` para aplicar a animación só cando estea soportada.
3. Deseña o efecto de forma que o contido funcione igualmente sen el.

**Exemplo con `@supports`:**

```css
@supports (animation-timeline: scroll()) {
    .barra {
        animation: encher linear;
        animation-timeline: scroll();
    }
}
```

Se o navegador non soporta `animation-timeline`, a animación non se aplica e o elemento queda no estado base.

---

## 10. Exercicios

### Exercicio 1: Barra de progreso

Escribe CSS para unha barra fixa na parte superior que se enche segundo o scroll.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.barra {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: #1a5c8a;
    transform-origin: left;
    transform: scaleX(0);
    animation: encher linear;
    animation-timeline: scroll();
}

@keyframes encher {
    to { transform: scaleX(1); }
}
```

</details>


### Exercicio 2: Elemento que aparece

Escribe CSS para que unha tarxeta apareza cunha transición de opacidade e desprazamento cando entra na ventá.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.tarxeta {
    animation: entrar linear both;
    animation-timeline: view();
}

@keyframes entrar {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
}
```

</details>


### Exercicio 3: `animation-range`

Escribe CSS para que unha animación se execute só durante a entrada do elemento, e quede fixada cando o elemento está completamente visible.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.elemento {
    animation: aparecer linear both;
    animation-timeline: view();
    animation-range: entry 0% contain 100%;
}
```

</details>


### Exercicio 4: `@supports`

Escribe CSS que aplique unha scroll-driven animation só se o navegador a soporta.

<details>
<summary><b>Amosar a solución</b></summary>

```css
@supports (animation-timeline: scroll()) {
    .elemento {
        animation: crecer linear;
        animation-timeline: scroll();
    }
}
```

</details>


### Exercicio 5: Accesibilidade

Escribe o bloque que desactiva as scroll-driven animations cando a persoa prefire movemento reducido, e asegúrate de que o contido segue visible.

<details>
<summary><b>Amosar a solución</b></summary>

```css
@media (prefers-reduced-motion: reduce) {
    .elemento {
        animation: none !important;
        opacity: 1;
        transform: none;
    }
}
```

</details>


### Exercicio 6: Detectar o erro

```css
.elemento {
    animation: crecer 2s linear;
    animation-timeline: view();
}
```

Cal é o problema?

<details>
<summary><b>Amosar a solución</b></summary>

Cando se usa `animation-timeline`, a propiedade `animation-duration` (o `2s`) **ignórase**. A duración vén determinada pola liña temporal. Non é un erro de sintaxe, pero pode confundir. Hai que ter en conta que `2s` non ten efecto.

</details>


---

## 11. Para profundar

- **MDN Web Docs:** [Scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations) — guía completa.
- **MDN Web Docs:** [animation-timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline) — referencia da propiedade.
- **MDN Web Docs:** [animation-range](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-range) — referencia.
- **web.dev:** [Animate elements on scroll with scroll-driven animations](https://web.dev/articles/scroll-driven-animations) — artigo moi completo de Google.
- **Bramus:** [Scroll-driven animations](https://www.bram.us/2023/03/01/scroll-driven-animations/) — artigo práctico.
- **Scroll-driven Animations (demo)** (https://scroll-driven-animations.style/) — colección de exemplos visuais.
- **W3C:** [Scroll-driven Animations Module Level 1](https://www.w3.org/TR/scroll-animations-1/) — especificación.

---

## 12. Referencias cruzadas

- **Capítulo 18: Transicións e animacións** — base conceptual das animacións.
- **Capítulo 20: Transformacións 2D e 3D** — as transformacións son o efecto máis habitual nas scroll-driven animations.
- **Capítulo 21: Filtros, blend modes e masking** — combinables co scroll.
- **Capítulo 23: `@layer`, `@scope`, `@supports`** — `@supports` é esencial para aplicar estas animacións de forma segura.
- **Capítulo 24: Rendemento e boas prácticas** — as scroll-driven animations teñen implicacións de rendemento.
- **Capítulo 26: Accesibilidade e CSS** — `prefers-reduced-motion` é crucial aquí.

---

**Data de creación:** 2026-09-17  
**Última revisión:** 2026-09-17  
**Estado:** Borrador para validación
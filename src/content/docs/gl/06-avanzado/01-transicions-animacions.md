---
title: "Transicións e animacións"
description: "Explicación das transicións e animacións CSS, as súas diferenzas, configuración e consideracións de accesibilidade."
bloque: 6
capitulo: 18
nivel: intermedio
ultima_revision: "2026-09-17"
estado: "borrador_para_validacion"
compatibilidade: "universal"
palabras_chave:
  - transicion
  - animacion
  - transition
  - animation
  - keyframes
  - timing_function
  - prefers_reduced_motion
  - rendemento
  - ease
  - linear
---

<!-- # Capítulo 18: Transicións e animacións -->

> As **transicións** permiten que un cambio de estilo ocorra **suavemente** ao longo do tempo (por exemplo, un botón que cambia de cor ao pasar o rato por riba). As **animacións** permiten crear **secuencias completas** de cambios, con múltiples pasos e control total sobre o tempo. Este capítulo explica como funcionan, en que se diferencian, cando usar cada unha, e como respectar as preferencias de accesibilidade das persoas usuarias.

---

## 1. Introdución: o movemento como ferramenta

Ata agora, todos os cambios de estilo que vimos prodúcense **instantaneamente**. Se un botón cambia de cor ao pasar o rato por riba, o cambio é inmediato. Se un menú se abre, aparece dun golpe. Isto funciona, pero pode dar unha sensación brusca, pouco natural, pouco «viva».

**As transicións e animacións** engaden **tempo** aos cambios. Permiten que unha cor se transforme suavemente, que un elemento se desprace dun sitio a outro, que algo apareza gradualmente. Isto ten tres efectos:

1. **Mellora a percepción de calidade.** Unha interface con transicións suaves parece máis coidada que unha con cambios instantáneos.
2. **Axuda a entender o que ocorre.** Cando un elemento se move suavemente dun sitio a outro, o cerebro segue mellor a transformación. Un cambio brusco pode desorientar.
3. **Guía a atención.** Unha animación pode dirixir a mirada cara un punto importante.

Pero tamén hai riscos: **demasiada animación cansa**, distrae, e pode causar problemas a persoas con sensibilidade ao movemento. Este capítulo explica como facelo ben.

> 💡 **Para pensar:** a diferenza entre transición e animación é sinxela:
>
> - **Transición:** un cambio **entre dous estados**, disparado por un evento (normalmente `:hover`, `:focus`, unha clase engadida con JavaScript). É sempre un «de → a».
> - **Animación:** unha **secuencia de varios pasos**, que pode executarse soa, repetirse, e controlarse con máis detalle. Pode ter 2, 5 ou 100 pasos.
>
> Na práctica, as transicións cobren o 80% dos casos. As animacións úsanse cando cómpre algo máis elaborado.

---

## 2. Transicións

### 2.1 Que é unha transición

Unha **transición** é un cambio suave entre dous valores dunha propiedade. Escríbese coa propiedade `transition`.

```css
.boton {
    background: #1a5c8a;
    transition: background 0.3s ease;
}

.boton:hover {
    background: #0d3a5c;
}
```

**Que ocorre aquí:**

1. Cando a páxina carga, o botón ten fondo `#1a5c8a`.
2. Ao pasar o rato por riba, o CSS di que o fondo debería ser `#0d3a5c`.
3. **Sen transición**, o cambio sería instantáneo.
4. **Coa transición**, o cambio faise gradualmente ao longo de 0,3 segundos, cunha curva de aceleración (`ease`).

### 2.2 As propiedades da transición

`transition` é un **atallo** que combina catro propiedades:

| Propiedade                   | Que controla                          | Exemplo                          |
| ---------------------------- | ------------------------------------- | -------------------------------- |
| `transition-property`        | Que propiedade(s) cambian suavemente. | `background`, `opacity`, `all`.  |
| `transition-duration`        | Canto dura o cambio.                  | `0.3s`, `200ms`.                 |
| `transition-timing-function` | A curva de aceleración.               | `ease`, `linear`, `ease-in-out`. |
| `transition-delay`           | Canto tarda en comezar.               | `0s`, `100ms`.                   |

**Atallo:**

```css
transition: <property> <duration> <timing-function> <delay>;
```

**Exemplo completo:**

```css
.boton {
    transition: background 0.3s ease 0.1s;
    /*         propiedade duración curva atraso */
}
```

O atraso (`0.1s`) é opcional.

### 2.3 Que propiedades se poden animar

Non todas as propiedades CSS se poden animar. **Só aquelas cuxos valores son «interpolables»**: números, lonxitudes, cores, transformacións, etc.

**Propiedades que se animan ben (as máis usadas):**

- `opacity`
- `transform`
- `color`, `background-color`, `border-color`
- `width`, `height`, `padding`, `margin`
- `box-shadow`
- `filter`
- `clip-path`

**Propiedades que NON se poden animar:**

- `display` (aínda que hai trucos)
- `visibility` (aínda que hai excepcións)
- `font-family`
- `background-image` (en xeral)

**Coidado coas propiedades custosas:** animar `width`, `height`, `margin` ou `top`/`left` provoca que o navegador teña que recalcular o layout en cada fotograma, o que pode ser lento. Sempre que poidas, **anima `transform` e `opacity`**, que son moito máis eficientes.

**Regra práctica:**

```css
/* Evitar */
.elemento {
    transition: width 0.3s;
}

/* Preferir */
.elemento {
    transform: scaleX(0);
    transition: transform 0.3s;
}
```

### 2.4 A palabra clave `all`

Podes escribir `transition: all 0.3s` para que **todas** as propiedades animables cambien suavemente. Pero **non é recomendable**:

- Pode animar propiedades que non queres (por exemplo, se cambia unha cor nun estado non previsto).
- Pode ter problemas de rendemento.
- Fai o CSS menos explícito.

**Recomendación:** indica sempre a propiedade (ou propiedades) que queres animar.

```css
/* Ben */
.boton {
    transition: background 0.2s, transform 0.1s;
}

/* Evitar */
.boton {
    transition: all 0.2s;
}
```

### 2.5 As curvas de aceleración (`timing-function`)

A curva de aceleración define **como evoluciona o cambio ao longo do tempo**. Hai varias palabras clave:

| Valor               | Descrición                                         |
| ------------------- | -------------------------------------------------- |
| `linear`            | Velocidade constante.                              |
| `ease`              | Empeza amodo, acelera, remata amodo (por defecto). |
| `ease-in`           | Empeza amodo, acelera.                             |
| `ease-out`          | Empeza rápido, remata amodo.                       |
| `ease-in-out`       | Amodo ao principio e ao final, rápido no medio.    |
| `cubic-bezier(...)` | Curva personalizada.                               |

**Guía práctica:**

- **Cambios de cor:** `ease` (por defecto).
- **Elementos que aparecen:** `ease-out` (chega rápido e asenta).
- **Elementos que desaparecen:** `ease-in` (sae amodo e acelera).
- **Movementos:** `ease-in-out` (máis natural).

**Exemplo visual:**

```
linear:      ───────────────────
ease:        ╭─────────╮ (por defecto)
ease-in:     ────╱
ease-out:    ╲────
ease-in-out: ╭──╯
```

**Curvas personalizadas con `cubic-bezier()`:**

```css
transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
```

Esta curva, por exemplo, ten un pequeno «rebote» ao final, moi usado en animacións con personalidade.

### 2.6 Múltiples propiedades

Podes animar varias propiedades á vez, separándoas con comas:

```css
.boton {
    transition:
        background 0.2s ease,
        transform 0.15s ease-out,
        box-shadow 0.3s ease;
}
```

Cada unha pode ter a súa propia duración, curva e atraso.

### 2.7 Exemplo mínimo funcional: botón

```css
.boton {
    background: #1a5c8a;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;

    transition:
        background 0.2s ease,
        transform 0.1s ease-out,
        box-shadow 0.2s ease;

    &:hover {
        background: #0d3a5c;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    &:active {
        transform: scale(0.97);
    }
}
```

**Que ocorre aquí:**

- Ao pasar o rato, a cor e a sombra cambian suavemente en 0,2 segundos.
- Ao facer clic, o botón redúcese lixeiramente (efecto «premer»).
- Todo é suave, natural, e a resposta é rápida (non hai que esperar).

---

## 3. Animacións

### 3.1 Que é unha animación

Unha **animación** é unha **secuencia de fotogramas** que se executan ao longo do tempo. A diferenza da transición, que só vai dun estado a outro, unha animación pode ter **múltiples pasos**.

```css
@keyframes xirar {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.icone-cargando {
    animation: xirar 1s linear infinite;
}
```

**Que ocorre aquí:**

1. `@keyframes xirar` define unha animación chamada `xirar`.
2. `from` indica o estado inicial. `to` indica o estado final.
3. `.icone-cargando` aplícaa cunha duración de 1 segundo, velocidade constante, e infinitas repeticións.

### 3.2 A at-rule `@keyframes`

`@keyframes` define unha animación. O nome ponse libremente (evitando palabras reservadas).

**Sintaxe básica con `from` e `to`:**

```css
@keyframes nome-da-animacion {
    from {
        /* estado inicial */
    }
    to {
        /* estado final */
    }
}
```

**Sintaxe con porcentaxes (para múltiples pasos):**

```css
@keyframes aparecer-e-xirar {
    0% {
        opacity: 0;
        transform: scale(0.5);
    }
    50% {
        opacity: 1;
        transform: scale(1.1);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}
```

As porcentaxes indican **en que momento da animación** se aplica cada bloque. `0%` é o comezo, `100%` é o final. Pódense usar tantos pasos como se queira.

**Equivalencias:**

- `from` = `0%`
- `to` = `100%`

### 3.3 As propiedades da animación

Igual que as transicións, a propiedade `animation` é un **atallo**:

| Propiedade                  | Que controla                                                                       |
| --------------------------- | ---------------------------------------------------------------------------------- |
| `animation-name`            | Nome da animación definida en `@keyframes`.                                        |
| `animation-duration`        | Duración dun ciclo.                                                                |
| `animation-timing-function` | Curva de aceleración.                                                              |
| `animation-delay`           | Canto tarda en comezar.                                                            |
| `animation-iteration-count` | Cantas veces se repite (`1`, `infinite`, números).                                 |
| `animation-direction`       | Dirección (`normal`, `reverse`, `alternate`, `alternate-reverse`).                 |
| `animation-fill-mode`       | Que ocorre antes e despois da animación (`none`, `forwards`, `backwards`, `both`). |
| `animation-play-state`      | Se está en execución ou pausada (`running`, `paused`).                             |

**Atallo:**

```css
animation: <name> <duration> <timing> <delay> <iteration> <direction> <fill-mode>;
```

**Exemplo completo:**

```css
.icone-cargando {
    animation: xirar 1s linear 0s infinite normal none;
}
```

Na maioría dos casos, só se indican as primeiras:

```css
.icone-cargando {
    animation: xirar 1s linear infinite;
}
```

### 3.4 `animation-fill-mode`: que ocorre ao rematar

Por defecto, cando unha animación remata, o elemento **volve ao seu estado orixinal**. Con `animation-fill-mode` podes cambiar isto:

- **`none`** (por defecto): volve ao estado orixinal.
- **`forwards`**: queda no estado final da animación.
- **`backwards`**: aplica o estado inicial antes de que comece.
- **`both`**: aplica ambos.

**Exemplo típico:** unha animación de entrada que deixa o elemento visible ao rematar.

```css
@keyframes entrar {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.tarxeta {
    animation: entrar 0.5s ease-out forwards;
    /* sen "forwards", a tarxeta volvería a opacity: 0 */
}
```

**Este é un erro moi común:** esquecer `animation-fill-mode: forwards` cando a animación ten que deixar un estado permanente.

### 3.5 `animation-direction`: dirección

- **`normal`** (por defecto): sempre de `from` a `to`.
- **`reverse`**: sempre de `to` a `from`.
- **`alternate`**: vai e volta. Moi útil para animacións simétricas.
- **`alternate-reverse`**: volta e vai.

**Exemplo:** unha animación de «latido» que vai e volta:

```css
@keyframes latexar {
    from { transform: scale(1); }
    to   { transform: scale(1.1); }
}

.corazon {
    animation: latexar 0.8s ease-in-out infinite alternate;
}
```

### 3.6 `animation-play-state`: pausar e continuar

```css
.animacion {
    animation: xirar 1s linear infinite;
    animation-play-state: running;
}

.animacion.pausada {
    animation-play-state: paused;
}
```

Útil para pausar animacións cando o elemento non está visíbel ou cando a persoa interactúa con el.

---

## 4. Animar a `height: auto` con `interpolate-size`

### 4.1 O problema histórico

Un dos problemas máis antigos de CSS é **animar a altura dun elemento cando a altura final non se coñece**. Por exemplo, un acordeón que se desprega: cando está pechado, ten `height: 0`; cando está aberto, debería ter a altura do seu contido. Pero esa altura depende do contido, non se pode saber de antemán.

Durante anos, as solucións foron:

1. **`max-height` cun valor fixo.** Pór `max-height: 0` cando está pechado e `max-height: 500px` (un valor arbitrario grande) cando está aberto. **Problema:** a animación non é precisa (se o contido é de 100px, a animación remata antes de tempo), e hai que adiviñar un valor máximo suficientemente grande.

2. **Transición con `display: grid` e `grid-template-rows`.** Definir o elemento como unha grella dunha soa fila con `grid-template-rows: 0fr` no estado pechado e transicionalo a `1fr` no aberto (xunto con `overflow: hidden` e `min-height: 0` no fillo). **Funciona**, pero é un truco indirecto, require envolver o contido nun elemento adicional e non resulta intuitivo.

3. **JavaScript.** Medir a altura real do contido e aplicarlla como valor explícito. **Funciona**, pero require código, e hai que recalcular cando o contido cambia.

**Ningunha destas solucións é ideal.** A primeira é imprecisa, a segunda é indirecta, a terceira require JavaScript.

### 4.2 A solución: `interpolate-size: allow-keywords`

A propiedade `interpolate-size` permite que CSS **interpole entre valores numéricos e palabras clave** como `auto`, `min-content` ou `max-content`. Isto fai que se poida animar directamente:

```css
:root {
    interpolate-size: allow-keywords;
}

.acordeon {
    height: 0;
    overflow: hidden;
    transition: height 0.3s ease-out;
}

.acordeon.aberto {
    height: auto;
}
```

**Que ocorre aquí:**

1. `interpolate-size: allow-keywords` en `:root` habilita a interpolación de palabras clave **para todo o documento**.
2. O acordeón ten `height: 0` pechado.
3. Cando se lle engade a clase `.aberto`, ten `height: auto`.
4. **A transición funciona:** o navegador interpola entre `0` e a altura real do contido.

Isto resolve o problema histórico dunha forma directa e limpa.

### 4.3 Onde aplicar `interpolate-size`

**Opción 1: en `:root` (global)**

```css
:root {
    interpolate-size: allow-keywords;
}
```

Habilita a interpolación en todo o documento. É o máis cómodo, pero hai que ter en conta que calquera `height: auto` se pode animar, o que pode ter implicacións de rendemento nalgúns casos.

**Opción 2: nun subárbore concreto (recomendado)**

```css
.lista-acordeons {
    interpolate-size: allow-keywords;
}
```

Limita a interpolación aos elementos que realmente a necesitan. **Esta é a opción recomendada** se só hai unha parte da páxina onde se usan animacións de altura.

**Importante:** `interpolate-size` **non se herda** dos pais aos fillos. Se o pos nun contedor, aplícase aos fillos dese contedor, pero non aos netos. Hai que poñelo no nivel axeitado.

#### 4.4 `calc-size()`: a función compañeira

Xunto con `interpolate-size`, CSS introduce unha nova función, `calc-size()`, que permite facer cálculos con palabras clave:

```css
.acordeon {
    height: 0;
    transition: height 0.3s ease-out;
}

.acordeon.aberto {
    height: calc-size(auto, size + 2rem);
    /* a altura "auto" + 2rem de padding adicional */
}
```

**Sintaxe:** `calc-size(<palabra-clave>, <cálculo>)`, onde `size` representa o valor da palabra clave.

**Uso típico:** cando necesitas un valor lixeiramente distinto da altura natural (por exemplo, para engadir un pouco de padding calculado).

**Nota:** `calc-size()` é unha característica moi recente. Úsaa con `@supports` se necesitas compatibilidade.

### 4.5 Exemplo mínimo funcional: acordeón

**Arquivo HTML:**

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Acordeón con interpolate-size</title>
    <link rel="stylesheet" href="estilos/acordeon.css">
</head>
<body>
    <div class="acordeons">
        <details class="acordeon">
            <summary>Que é CSS?</summary>
            <p>CSS é a linguaxe que describe como se presenta o contido HTML.</p>
        </details>
        <details class="acordeon">
            <summary>Que é Flexbox?</summary>
            <p>Flexbox é un sistema de layout unidimensional que organiza elementos nunha fila ou nunha columna.</p>
        </details>
    </div>

    <script>
        // JS mínimo para pechar os demais ao abrir un
        document.querySelectorAll('details.acordeon').forEach((el) => {
            el.addEventListener('toggle', () => {
                if (el.open) {
                    document.querySelectorAll('details.acordeon').forEach((outro) => {
                        if (outro !== el) outro.open = false;
                    });
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
   Habilitar interpolación de palabras clave
   ============================== */
.acordeons {
    interpolate-size: allow-keywords;
}

/* ==============================
   Acordeón
   ============================== */
body {
    font-family: system-ui, sans-serif;
    line-height: 1.6;
    background: #fafafa;
    color: #333;
    padding: 2rem 1rem;
}

.acordeons {
    max-width: 600px;
    margin: 0 auto;
}

.acordeon {
    background: white;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    margin-bottom: 0.75rem;
    overflow: hidden;
}

.acordeon summary {
    padding: 1rem 1.5rem;
    font-weight: 600;
    color: #1a5c8a;
    cursor: pointer;
    list-style: none;
    user-select: none;

    /* Marcador propio */
    &::-webkit-details-marker {
        display: none;
    }

    &::after {
        content: "+";
        float: right;
        font-size: 1.25rem;
        transition: transform 0.2s;
    }
}

.acordeon[open] summary::after {
    content: "−";
}

.acordeon p {
    padding: 0 1.5rem 1rem;
    color: #666;
}

/* ==============================
   Animación de apertura e peche
   ============================== */
@supports (interpolate-size: allow-keywords) {
    /* Se o navegador soporta interpolate-size,
       animamos a apertura usando o atributo [open]. */

    .acordeon[open] summary ~ p {
        /* A transición funciona porque o navegador
           interpola entre "0" e "auto". */
        animation: despregar 0.3s ease-out;
    }

    @keyframes despregar {
        from {
            height: 0;
            opacity: 0;
        }
        to {
            height: auto;
            opacity: 1;
        }
    }
}
```

**Nota:** este exemplo usa o elemento nativo `<details>`, que xa ten un comportamento de apertura e peche. Para animar a apertura, o máis sinxelo é usar `@starting-style` (ver a sección seguinte). A combinación de `interpolate-size` con `@starting-style` é o patrón moderno para este tipo de animacións.

### 4.6 Compatibilidade (2026)

| Característica                     | Estado                                                                   |
| ---------------------------------- | ------------------------------------------------------------------------ |
| `interpolate-size: allow-keywords` | **Aínda non en Baseline.** Chrome/Edge 129+; Firefox e Safari aínda non. |
| `calc-size()`                      | **Aínda non en Baseline.** Só Chrome/Edge.                               |

**Recomendación:** usar `@supports` para aplicar a animación só onde estea soportada. O contido debe funcionar **sen a animación** como fallback.

```css
@supports (interpolate-size: allow-keywords) {
    .acordeons {
        interpolate-size: allow-keywords;
    }

    .acordeon {
        height: 0;
        transition: height 0.3s;
    }

    .acordeon.aberto {
        height: auto;
    }
}
```

### 4.7 Erros frecuentes

**Erro 1: esquecer `interpolate-size`.**

```css
/* Mal: height: 0 → height: auto non anima */
.acordeon {
    height: 0;
    transition: height 0.3s;
}

.acordeon.aberto {
    height: auto;   /* salto brusco, sen transición */
}
```

**Erro 2: agardar que `interpolate-size` se herde.**

```css
/* Mal: os netos non herdan interpolate-size */
.contedor {
    interpolate-size: allow-keywords;
}

.neto {
    height: auto;   /* non se interpola, porque non é fillo directo */
}
```

**Solución:** aplicar `interpolate-size` **no elemento que ten o `height: auto`**, non nun antepasado afastado.

**Erro 3: usar sen `@supports`.**

Se o navegador non soporta `interpolate-size`, a animación **non se executa** (o `height: auto` aplícase de golpe). Isto non rompe nada, pero tampouco mellora. Usar `@supports` para deixar claro o comportamento esperado.

---

## 5. Animar elementos con `display: none`: `@starting-style` e `transition-behavior: allow-discrete`

### 5.1 O problema: as propiedades discretas non se poden animar

Cando un elemento está en `display: none`, **non forma parte do layout**: non ocupa espazo, non se pode ver, non se pode animar. Cando pasa a `display: block` (ou `flex`, `grid`...), o cambio é **instantáneo**. Non hai forma de facer unha transición.

Isto tradúcese en que elementos como **diálogos modais**, **popovers** e **menús despregables** non poden ter unha animación de entrada e saída limpa. Hai que usar trucos con JavaScript, ou renunciar á animación.

**O problema é o propio `display`.** É unha propiedade **discreta**: só admite valores concretos, sen intermedios. Non hai un «50% de display: block». E as propiedades discretas **non se animan**.

### 5.2 A solución: `transition-behavior: allow-discrete`

A propiedade **`transition-behavior: allow-discrete`** permite que as propiedades discretas (como `display`) poidan transicionar:

```css
dialog {
    display: none;
    transition:
        display 0.3s allow-discrete,
        opacity 0.3s,
        transform 0.3s;
}

dialog[open] {
    display: block;
    opacity: 1;
    transform: scale(1);
}
```

**Que ocorre aquí:**

1. `transition-behavior: allow-discrete` na transición de `display` fai que o navegador **retrase** o cambio de `display: none` a `display: block` ata o **final** da transición.
2. O `opacity` e o `transform` van cambiando durante a transición.
3. **Resultado:** o diálogo aparece con opacidade e escala, e o `display` cámbiase ao final.

**Atallo:** pódese escribir `transition-behavior: allow-discrete` como propiedade separada:

```css
dialog {
    transition:
        display 0.3s allow-discrete,
        opacity 0.3s,
        transform 0.3s;
}
```

ou

```css
dialog {
    transition-property: display, opacity, transform;
    transition-duration: 0.3s;
    transition-behavior: allow-discrete;
}
```

### 5.3 O problema da entrada: `@starting-style`

Con `allow-discrete`, o peche funciona: o elemento ten un estado inicial (`display: block`, `opacity: 1`), pasa a `display: none`, `opacity: 0`, e o navegador anima.

**Pero a apertura non funciona.** Cando o elemento pasa de `display: none` a `display: block`, o navegador non ten un estado **inicial** desde o que animar. O elemento aparece directamente con `opacity: 1`.

**A solución é `@starting-style`:** define o estado **inicial** dunha transición que comeza desde `display: none`.

```css
dialog {
    display: none;
    opacity: 1;
    transform: scale(1);
    transition:
        display 0.3s allow-discrete,
        opacity 0.3s,
        transform 0.3s;
}

@starting-style {
    dialog[open] {
        opacity: 0;
        transform: scale(0.9);
    }
}

dialog[open] {
    display: block;
}
```

**Que ocorre aquí:**

1. `dialog` está en `display: none` por defecto.
2. Cando se lle engade o atributo `[open]`, pasa a `display: block`.
3. **`@starting-style`** define que, **no momento inicial da transición**, o `opacity` é `0` e o `transform` é `scale(0.9)`.
4. A transición execútase: o diálogo pasa de `opacity: 0, scale(0.9)` a `opacity: 1, scale(1)`.
5. O `display` cámbiase ao comezo (para que o elemento se vexa durante a animación).

**`@starting-style` non é unha at-rule que se aplique permanentemente.** Só define o estado inicial da transición. Unha vez rematada a transición, o estado normal aplícase.

### 5.4 Exemplo mínimo funcional: diálogo modal

**Arquivo HTML:**

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Animar un dialog</title>
    <link rel="stylesheet" href="estilos/dialog.css">
</head>
<body>
    <button id="abrir">Abrir diálogo</button>

    <dialog id="dialogo">
        <h2>Un diálogo modal</h2>
        <p>Este diálogo aparece e desaparece con animación.</p>
        <form method="dialog">
            <button>Pechar</button>
        </form>
    </dialog>

    <script>
        const boton = document.getElementById('abrir');
        const dialogo = document.getElementById('dialogo');

        boton.addEventListener('click', () => {
            dialogo.showModal();
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

body {
    font-family: system-ui, sans-serif;
    line-height: 1.6;
    padding: 2rem;
    display: flex;
    justify-content: center;
}

button {
    padding: 0.75rem 1.5rem;
    background: #1a5c8a;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
}

button:focus-visible {
    outline: 3px solid #1a5c8a;
    outline-offset: 2px;
}

/* ==============================
   Diálogo
   ============================== */
dialog {
    /* Estado pechado */
    display: none;
    opacity: 1;
    transform: scale(1);

    /* Estilos visuais */
    border: none;
    border-radius: 12px;
    padding: 2rem;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

    /* Transición: inclúe display con allow-discrete */
    transition:
        display 0.4s allow-discrete,
        overlay 0.4s allow-discrete,
        opacity 0.3s ease-out,
        transform 0.3s ease-out;
}

/* Estado aberto */
dialog[open] {
    display: block;
    opacity: 1;
    transform: scale(1);
}

/* Estado inicial da transición de apertura */
@starting-style {
    dialog[open] {
        opacity: 0;
        transform: scale(0.9);
    }
}

/* ==============================
   Fondo escuro detrás do diálogo
   ============================== */
dialog::backdrop {
    background: rgba(0, 0, 0, 0);
    transition:
        display 0.4s allow-discrete,
        overlay 0.4s allow-discrete,
        background 0.4s ease-out;
}

dialog[open]::backdrop {
    background: rgba(0, 0, 0, 0.5);
}

@starting-style {
    dialog[open]::backdrop {
        background: rgba(0, 0, 0, 0);
    }
}

/* ==============================
   Contido
   ============================== */
dialog h2 {
    color: #1a5c8a;
    margin-bottom: 1rem;
    font-size: 1.25rem;
}

dialog p {
    color: #666;
    margin-bottom: 1.5rem;
}

/* ==============================
   Accesibilidade
   ============================== */
@media (prefers-reduced-motion: reduce) {
    dialog,
    dialog::backdrop {
        transition: none;
    }
}
```

**Que está a pasar aquí:**

1. **O diálogo** está en `display: none` por defecto. Cando se abre (`dialog.showModal()`), pasa a `display: block`.
2. **`transition`** inclúe `display` con `allow-discrete`, o que fai que a transición se execute aínda que `display` cambie.
3. **`@starting-style`** define o estado inicial da apertura: `opacity: 0`, `transform: scale(0.9)`.
4. **O `::backdrop`** tamén se anima, usando a mesma técnica.
5. **`overlay`** é unha propiedade especial que controla a superposición de elementos. `allow-discrete` tamén se aplica a ela.

**Resultado:** o diálogo aparece gradualmente con opacidade e escala, e o fondo escuro vai aparecendo ao mesmo tempo. Ao pechar, o proceso invértese.

### 5.5 Popover API

A **Popover API** é outra incorporación recente que se beneficia de `@starting-style` e `allow-discrete`. Permite crear popovers nativos **sen JavaScript** para o comportamento básico.

**Arquivo HTML:**

```html
<button popovertarget="meu-popover">Abrir popover</button>

<div popover id="meu-popover">
    <p>Este é un popover nativo.</p>
    <button popovertarget="meu-popover" popovertargetaction="hide">Pechar</button>
</div>
```

**Arquivo CSS:**

```css
[popover] {
    /* Estado pechado */
    display: none;
    opacity: 0;
    transform: translateY(-10px);

    /* Estilos visuais */
    border: none;
    border-radius: 8px;
    padding: 1rem;
    background: white;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);

    /* Transición */
    transition:
        display 0.3s allow-discrete,
        opacity 0.3s,
        transform 0.3s;
}

[popover]:popover-open {
    display: block;
    opacity: 1;
    transform: translateY(0);
}

@starting-style {
    [popover]:popover-open {
        opacity: 0;
        transform: translateY(-10px);
    }
}
```

**Que ocorre aquí:**

1. **`[popover]`** selecciona calquera elemento co atributo `popover`.
2. **`[popover]:popover-open`** é unha pseudo-clase que se aplica cando o popover está visible.
3. **`@starting-style`** define o estado inicial da apertura.
4. **A Popover API** xestiona automaticamente a apertura, o peche, o posicionamento e o foco. **Non require JavaScript** para o comportamento básico.

**Vantaxes da Popover API:**

- **Accesibilidade integrada:** os lectores de pantalla entenden que é un popover.
- **Foco xestionado:** o foco móvese ao popover cando se abre.
- **Cerramento automático:** premendo Escape ou facendo clic fóra.
- **Sen JavaScript** para o comportamento básico.

**Estado en 2026:** a Popover API está en **Baseline desde 2024**. Pódese usar con confianza.

#### 5.6 Compatibilidade (2026)

| Característica                        | Estado                                                       |
| ------------------------------------- | ------------------------------------------------------------ |
| `@starting-style`                     | **Baseline desde 2024-2026** (Firefox foi o último, en 2025) |
| `transition-behavior: allow-discrete` | **Baseline desde 2024**                                      |
| Popover API                           | **Baseline desde 2024**                                      |
| `:popover-open`                       | **Baseline desde 2024**                                      |
| `::backdrop`                          | Universal desde 2022                                         |

**Recomendación:** todas estas características están listas para usar en 2026. Se necesitas compatibilidade con navegadores moi antigos, podes usar `@supports` para aplicar a animación só onde estea soportada.

```css
@supports (transition-behavior: allow-discrete) {
    dialog {
        transition:
            display 0.4s allow-discrete,
            opacity 0.3s;
    }
}
```

### 5.7 Erros frecuentes

**Erro 1: esquecer `allow-discrete`.**

```css
/* Mal: o display non se anima */
dialog {
    display: none;
    transition: display 0.3s;   /* sen allow-discrete, ignórase */
}
```

Sen `allow-discrete`, a transición de `display` **ignórase** e o cambio é instantáneo.

**Erro 2: esquecer `@starting-style`.**

```css
/* Mal: apertura sen animación */
dialog {
    display: none;
    opacity: 0;
    transition: opacity 0.3s;
}

dialog[open] {
    display: block;
    opacity: 1;
}
```

Sen `@starting-style`, o navegador non sabe que o estado inicial da apertura é `opacity: 0`. Aplica directamente `opacity: 1`.

**Erro 3: poñer `@starting-style` permanentemente.**

```css
/* Mal: isto non é un estado inicial, é un estado permanente */
dialog[open] {
    opacity: 0;
    transform: scale(0.9);
}

/* Isto é @starting-style */
@starting-style {
    dialog[open] {
        opacity: 0;
        transform: scale(0.9);
    }
}
```

`@starting-style` **non é unha regra normal**. Define o estado inicial dunha transición. Se non se usa correctamente, o elemento queda invisible ou mal posicionado.

**Erro 4: animar `overlay` sen `allow-discrete`.**

A propiedade `overlay` (que controla a superposición de elementos como diálogos e popovers) tamén require `allow-discrete` para animarse.

```css
/* Ben */
dialog {
    transition:
        display 0.4s allow-discrete,
        overlay 0.4s allow-discrete,
        opacity 0.3s;
}
```

**Erro 5: non respectar `prefers-reduced-motion`.**

As animacións de apertura e peche de diálogos tamén se deben reducir cando a persoa o prefire.

```css
@media (prefers-reduced-motion: reduce) {
    dialog,
    dialog::backdrop {
        transition: none;
    }
}
```

**Erro 6: pensar que `@starting-style` só funciona con `dialog`.**

`@starting-style` funciona con **calquera elemento** que pase dun estado inicial a outro. É útil para calquera animación que comece desde `display: none` ou desde un estado que o navegador non coñece.

---

## 6. Comparación: transición vs. animación

| Aspecto      | Transición                   | Animación                   |
| ------------ | ---------------------------- | --------------------------- |
| Disparo      | Evento (hover, focus, clase) | Automático                  |
| Pasos        | Só dous (de → a)             | Múltiples                   |
| Repetición   | Non                          | Si                          |
| Dirección    | Só unha                      | Normal, reverse, alternate  |
| Control      | Limitado                     | Total                       |
| Complexidade | Simple                       | Máis complexa               |
| Uso típico   | Micro-interaccións           | Efectos, secuencias, cargas |

**Cando usar cada unha:**

- **Transición:** botóns que cambian de cor, menús que se abren, tarxetas que elevan, calquera cambio entre dous estados.
- **Animación:** iconas de carga, elementos que aparecen con movemento, efectos de «rebote», secuencias complexas.

**Pódense combinar:** unha transición nun estado `:hover` pode convivir cunha animación en execución.

---

## 7. Exemplo mínimo funcional

Vexamos unha páxina con transicións e animacións combinadas.

**Arquivo HTML:**

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transicións e animacións</title>
    <link rel="stylesheet" href="estilos/animacions.css">
</head>
<body>
    <main class="contido">
        <h1>Transicións e animacións</h1>

        <section class="demo">
            <h2>Transicións</h2>
            <button class="boton">Preme aquí</button>
            <div class="tarxeta">Pasa o rato por riba</div>
        </section>

        <section class="demo">
            <h2>Animacións</h2>
            <div class="spinner"></div>
            <div class="pulso"></div>
        </section>

        <section class="demo">
            <h2>Animación de entrada</h2>
            <div class="entrada">Aparición suave</div>
            <div class="entrada" style="animation-delay: 0.2s;">Con atraso 1</div>
            <div class="entrada" style="animation-delay: 0.4s;">Con atraso 2</div>
        </section>
    </main>
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
    padding: 2rem 1rem;
}

.contido {
    max-width: 700px;
    margin: 0 auto;

    h1 {
        font-size: clamp(1.5rem, 1rem + 2vw, 2rem);
        color: #1a5c8a;
        margin-bottom: 2rem;
    }

    h2 {
        font-size: 1.125rem;
        color: #666;
        margin-bottom: 1rem;
        font-weight: 500;
    }
}

.demo {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    margin-bottom: 1.5rem;
    border: 1px solid #e5e5e5;
}

/* ==============================
   Transicións
   ============================== */

/* Botón */
.boton {
    background: #1a5c8a;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    margin-right: 1rem;
    margin-bottom: 1rem;

    transition:
        background 0.2s ease,
        transform 0.1s ease-out,
        box-shadow 0.25s ease;

    &:hover {
        background: #0d3a5c;
        box-shadow: 0 4px 12px rgba(26, 92, 138, 0.3);
    }

    &:active {
        transform: scale(0.96);
    }

    &:focus-visible {
        outline: 2px solid #1a5c8a;
        outline-offset: 2px;
    }
}

/* Tarxeta que se eleva */
.tarxeta {
    display: inline-block;
    background: #f5f5f5;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;

    transition:
        transform 0.25s ease-out,
        box-shadow 0.25s ease-out,
        background 0.25s ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        background: white;
    }
}

/* ==============================
   Animacións
   ============================== */

/* Spinner */
@keyframes xirar {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
}

.spinner {
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 4px solid #e5e5e5;
    border-top-color: #1a5c8a;
    border-radius: 50%;
    margin-right: 1rem;
    vertical-align: middle;
    animation: xirar 0.8s linear infinite;
}

/* Pulso */
@keyframes pulso {
    0% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(26, 92, 138, 0.5);
    }
    70% {
        transform: scale(1);
        box-shadow: 0 0 0 15px rgba(26, 92, 138, 0);
    }
    100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(26, 92, 138, 0);
    }
}

.pulso {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: #1a5c8a;
    border-radius: 50%;
    vertical-align: middle;
    animation: pulso 1.5s ease-out infinite;
}

/* ==============================
   Animación de entrada
   ============================== */

@keyframes entrar {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.entrada {
    padding: 1rem;
    background: #f5f5f5;
    border-radius: 8px;
    margin-bottom: 0.5rem;

    animation: entrar 0.6s ease-out forwards;
    /* "forwards" mantén o estado final */
}

/* ==============================
   Accesibilidade: reducir animacións
   ============================== */

@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}
```

**Que está a pasar aquí:**

1. **O botón** ten transicións para cor, transformación e sombra. Ao pasar o rato, elévase lixeiramente e cambia de cor.
2. **A tarxeta** elévase ao pasar o rato, cunha transición suave.
3. **O spinner** xira infinitamente. É unha animación de rotación simple.
4. **O pulso** latexa cun círculo expandíndose. A animación usa `box-shadow` para crear un «halo» que se expande.
5. **As tarxetas de entrada** aparecen con opacidade e desprazamento, con atrasos escalonados.
6. **O bloque final** é **crucial para accesibilidade**: se a persoa usuaria prefire reducir animacións, todas redúcense a duración case cero.

**Nota importante:** o bloque de `prefers-reduced-motion` debería estar en **calquera** proxecto que teña animacións. Non é opcional.

---

## 8. Casos habituais na práctica

### 8.1 Botóns interactivos

```css
.boton {
    transition: background 0.15s, transform 0.1s;

    &:hover {
        background: #0d3a5c;
    }

    &:active {
        transform: scale(0.96);
    }
}
```

### 8.2 Tarxetas que se elevan

```css
.tarxeta {
    transition: transform 0.25s ease-out, box-shadow 0.25s ease-out;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }
}
```

### 8.3 Elementos que aparecen

```css
@keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
}

.aparece {
    animation: fade-in 0.4s ease-out forwards;
}
```

### 8.4 Iconas de carga

```css
@keyframes xirar {
    to { transform: rotate(360deg); }
}

.spinner {
    animation: xirar 0.8s linear infinite;
}
```

### 8.5 Menús que se despregán

```css
.menu {
    opacity: 0;
    transform: translateY(-10px);
    pointer-events: none;
    transition: opacity 0.2s, transform 0.2s;
}

.menu.aberto {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
}
```

**Nota:** `pointer-events: none` evita que o menú pechado reciba clics. **Non usar `display: none`**, porque `display` **non se pode animar**.

### 8.6 Notificacións que entran e saen

```css
@keyframes entrar-notificacion {
    from { transform: translateX(100%); opacity: 0; }
    to   { transform: translateX(0); opacity: 1; }
}

@keyframes sair-notificacion {
    from { transform: translateX(0); opacity: 1; }
    to   { transform: translateX(100%); opacity: 0; }
}

.notificacion {
    animation: entrar-notificacion 0.3s ease-out forwards;
}

.notificacion.pechada {
    animation: sair-notificacion 0.3s ease-in forwards;
}
```

### 8.7 Animacións con atrasos escalonados

```css
.lista li {
    animation: fade-in 0.4s ease-out forwards;
    opacity: 0;
}

.lista li:nth-child(1) { animation-delay: 0.05s; }
.lista li:nth-child(2) { animation-delay: 0.10s; }
.lista li:nth-child(3) { animation-delay: 0.15s; }
.lista li:nth-child(4) { animation-delay: 0.20s; }
.lista li:nth-child(5) { animation-delay: 0.25s; }
```

**Alternativa moderna con `--i`** (variables CSS, Cap. 14):

```css
.lista li {
    animation: fade-in 0.4s ease-out forwards;
    animation-delay: calc(var(--i) * 0.05s);
    opacity: 0;
}
```

E desde o HTML:

```html
<li style="--i: 0">Elemento 1</li>
<li style="--i: 1">Elemento 2</li>
<li style="--i: 2">Elemento 3</li>
```

---

## 9. Erros frecuentes

### 9.1 Animar propiedades custosas

```css
/* Evitar: causa recalcular o layout */
.elemento {
    transition: width 0.3s, height 0.3s, top 0.3s, left 0.3s;
}

/* Preferir: usa transform e opacity */
.elemento {
    transition: transform 0.3s, opacity 0.3s;
}
```

**Regra de ouro:** anima `transform` e `opacity` sempre que poidas. Son as máis eficientes (non provocan recalcular o layout, só o pintado e o composite).

### 9.2 Usar `all` indiscriminadamente

```css
/* Evitar */
.elemento {
    transition: all 0.3s;
}
```

**Problemas:**

- Pode animar propiedades que non queres.
- Pode provocar cambios non desexados en propiedades herdadas.
- Dificulta o diagnóstico de problemas.

**Mellor:** lista as propiedades explícitamente.

### 9.3 Esquecer `animation-fill-mode: forwards`

```css
/* Mal: o elemento volve ao estado inicial despois da animación */
.aparece {
    animation: entrar 0.5s ease-out;
}

/* Ben */
.aparece {
    animation: entrar 0.5s ease-out forwards;
}
```

**Este é un dos erros máis comúns.** Cando a animación ten que deixar un estado permanente, hai que usar `forwards`.

### 9.4 Animacións moi longas ou moi lentas

```css
/* Demasiado lento */
.elemento {
    transition: transform 2s;
}
```

**Guía práctica de duracións:**

- **Micro-interaccións** (hover, focus): 100-200ms.
- **Cambios de estado** (menús, tarxetas): 200-300ms.
- **Animacións de entrada**: 300-500ms.
- **Animacións ambientais** (spinners, pulsos): 800ms-2s por ciclo.

**Se dura máis dun segundo, a persoa sente que a interface é lenta.** Se dura menos de 100ms, non se percibe o movemento.

### 9.5 Non respectar `prefers-reduced-motion`

```css
/* Mal: ignora a preferencia da persoa */
.animacion {
    animation: mover 1s infinite;
}
```

**Sempre hai que respectar esta preferencia.** É unha cuestión de accesibilidade e de respecto. O bloque xa o vimos na sección 5.

### 9.6 Abusar das animacións

**Demasiada animación distrae.** Unha páxina onde todo se move é unha experiencia agotadora. A animación é como a pementa: un chisco realza, demasiada estraga.

**Recomendación:** usa animacións para **comunicar algo** (un cambio de estado, unha acción pendente, unha entrada), non por decoración.

### 9.7 Animar `display`

```css
/* Non funciona */
.elemento {
    transition: display 0.3s;
}
```

`display` **non é animable**. Hai trucos (como usar `display: grid` con `grid-template-rows: 0fr / 1fr`, ou usar JavaScript), pero non é algo que se resolva cunha transición directa.

**Alternativa moderna:** usar `@starting-style` (Baseline 2024) e `transition-behavior: allow-discrete` para animar propiedades discretas. Explicado na sección 5 deste capítulo.

---

## 10. Compatibilidade (2026)

| Característica                        | Estado                      |
| ------------------------------------- | --------------------------- |
| `transition`                          | Universal desde hai décadas |
| `@keyframes` e `animation`            | Universal desde hai décadas |
| `transform`, `opacity` animables      | Universal                   |
| `cubic-bezier()`                      | Universal                   |
| `prefers-reduced-motion`              | Universal desde 2020        |
| `@starting-style`                     | Baseline desde 2024         |
| `transition-behavior: allow-discrete` | Baseline desde 2024         |
| `animation-composition`               | Baseline desde 2023         |

As transicións e animacións están completamente estabilizadas. As máis recentes (`@starting-style`, `allow-discrete`) están dispoñibles desde 2024.

---

## 11. Exercicios

### Exercicio 1: Transición de botón

Escribe CSS para que un botón cambie de cor de fondo suavemente (200ms) ao pasar o rato por riba.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.boton {
    background: #1a5c8a;
    transition: background 0.2s ease;
}

.boton:hover {
    background: #0d3a5c;
}
```

</details>


### Exercicio 2: Animación de rotación

Escribe unha animación que faga xirar un elemento continuamente.

<details>
<summary><b>Amosar a solución</b></summary>

```css
@keyframes xirar {
    to { transform: rotate(360deg); }
}

.elemento {
    animation: xirar 1s linear infinite;
}
```

</details>


### Exercicio 3: Animación de entrada

Crea unha animación que faga aparecer un elemento desprazándose cara arriba, deixándoo visible ao rematar.

<details>
<summary><b>Amosar a solución</b></summary>

```css
@keyframes entrar {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.elemento {
    animation: entrar 0.5s ease-out forwards;
}
```

</details>


### Exercicio 4: Transición de tarxeta

Escribe CSS para que unha tarxeta se eleve 4px ao pasar o rato, cunha sombra, de forma suave.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.tarxeta {
    transition: transform 0.25s ease-out, box-shadow 0.25s ease-out;
}

.tarxeta:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}
```

</details>


### Exercicio 5: Accesibilidade

Escribe o bloque que reduce as animacións para persoas que prefiren movemento reducido.

<details>
<summary><b>Amosar a solución</b></summary>

```css
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

</details>


### Exercicio 6: Detectar o erro

```css
@keyframes aparecer {
    from { opacity: 0; }
    to   { opacity: 1; }
}

.elemento {
    animation: aparecer 0.5s ease-out;
}
```

Se a animación remata e o elemento desaparece, cal é o problema?

<details>
<summary><b>Amosar a solución</b></summary>

Falta `animation-fill-mode: forwards`. Sen el, o elemento volve ao estado orixinal (`opacity: 0`, porque non está definida explicitamente, así que usa o valor por defecto). Corrección:

```css
.elemento {
    animation: aparecer 0.5s ease-out forwards;
}
```

</details>


---

## 12. Para profundar

- **MDN Web Docs:** [Using CSS transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions/Using_CSS_transitions) — guía completa.
- **MDN Web Docs:** [Using CSS animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations) — guía completa.
- **MDN Web Docs:** [@keyframes](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes) — referencia.
- **web.dev:** [Learn CSS: Transitions](https://web.dev/learn/css/transitions) — lección interactiva.
- **web.dev:** [Learn CSS: Animations](https://web.dev/learn/css/animations) — lección interactiva.
- **A11Y Project:** [Reduced motion](https://www.a11yproject.com/posts/understanding-prefers-reduced-motion/) — accesibilidade.
- **Cubic-Bezier** (https://cubic-bezier.com) — ferramenta visual para curvas.
- **W3C:** [CSS Transitions](https://www.w3.org/TR/css-transitions-1/) e [CSS Animations](https://www.w3.org/TR/css-animations-1/) — especificacións.

---

## 13. Referencias cruzadas

- **Capítulo 14: Propiedades personalizadas** — úsanse moito en animacións para parámetros dinámicos.
- **Capítulo 15: Aniñamento nativo** — o aniñado úsase moito coas transicións.
- **Capítulo 20: Transformacións 2D e 3D** — o seguinte capítulo, complementario ás animacións.
- **Capítulo 23: `@layer`, `@scope`, `@supports`** — `@starting-style` e `allow-discrete`.
- **Capítulo 26: Accesibilidade e CSS** — `prefers-reduced-motion` é fundamental.

---

**Data de creación:** 2026-09-17  
**Última revisión:** 2026-09-17  
**Estado:** Borrador para validación
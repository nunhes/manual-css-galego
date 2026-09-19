---
title: "Táboa de propiedades CSS máis usadas"
description: "Táboa de consulta rápida coas propiedades CSS máis usadas, os seus valores habituais e a súa finalidade."
bloque: 7
capitulo: 28
nivel: referencia
ultima_revision: "2026-09-17"
estado: "borrador_para_validacion"
compatibilidade: "non_aplicable"
palabras_chave:
  - tabla_propiedades
  - referencia
  - propiedades
  - valores
  - lookup
  - consulta_rapida
---

<!-- # Táboa de propiedades CSS máis usadas -->

Versión: 1.0
Uso: referencia rápida. Non é exhaustiva, senón unha selección das propiedades que aparecen con máis frecuencia na práctica.

---

## Layout e display

| Propiedade                          | Valores comúns                                            | Que fai                                          |
| ----------------------------------- | --------------------------------------------------------- | ------------------------------------------------ |
| `display`                           | `block`, `inline`, `inline-block`, `flex`, `grid`, `none` | Define como se comporta un elemento no layout.   |
| `position`                          | `static`, `relative`, `absolute`, `fixed`, `sticky`       | Define o posicionamento.                         |
| `top` / `right` / `bottom` / `left` | `auto`, lonxitudes                                        | Desprazamento respecto á posición de referencia. |
| `inset`                             | `0`, lonxitudes                                           | Atallos de `top`, `right`, `bottom`, `left`.     |
| `z-index`                           | Números enteiros                                          | Orde de apilamento.                              |
| `float`                             | `left`, `right`, `none`                                   | Flotar a esquerda ou dereita (legado).           |
| `clear`                             | `left`, `right`, `both`, `none`                           | Cancelar floats.                                 |
| `overflow`                          | `visible`, `hidden`, `scroll`, `auto`                     | Como tratar o contido que desborda.              |
| `overflow-x` / `overflow-y`         | Igual                                                     | Igual, por eixe.                                 |

---

## Modelo de caixa

| Propiedade                  | Valores comúns                                               | Que fai                            |
| --------------------------- | ------------------------------------------------------------ | ---------------------------------- |
| `width` / `height`          | Lonxitudes, `auto`, `min-content`, `max-content`, `fit-content` | Ancho / alto da caixa de contido.  |
| `min-width` / `max-width`   | Lonxitudes, `none`                                           | Ancho mínimo / máximo.             |
| `min-height` / `max-height` | Lonxitudes, `none`                                           | Alto mínimo / máximo.              |
| `padding`                   | Lonxitudes                                                   | Recheo interior.                   |
| `margin`                    | Lonxitudes, `auto`                                           | Marxe exterior.                    |
| `border`                    | `<width> <style> <color>`                                    | Bordo.                             |
| `border-radius`             | Lonxitudes, porcentaxes                                      | Esquinas redondeadas.              |
| `box-sizing`                | `content-box`, `border-box`                                  | Como se calcula o tamaño total.    |
| `outline`                   | `<width> <style> <color>`                                    | Contorno (non afecta ao layout).   |
| `outline-offset`            | Lonxitude                                                    | Separación entre contorno e bordo. |

---

## Tipografía

| Propiedade        | Valores comúns                                  | Que fai                          |
| ----------------- | ----------------------------------------------- | -------------------------------- |
| `font-family`     | Lista de fontes                                 | Familia tipográfica.             |
| `font-size`       | Lonxitudes, porcentaxes                         | Tamaño da fonte.                 |
| `font-weight`     | `100`-`900`, `normal`, `bold`                   | Grosor.                          |
| `font-style`      | `normal`, `italic`, `oblique`                   | Cursiva.                         |
| `line-height`     | Número, lonxitude, porcentaxe                   | Altura de liña.                  |
| `letter-spacing`  | Lonxitude                                       | Espazo entre letras.             |
| `word-spacing`    | Lonxitude                                       | Espazo entre palabras.           |
| `text-align`      | `left`, `right`, `center`, `justify`            | Aliñamento horizontal.           |
| `text-decoration` | `none`, `underline`, `line-through`, `overline` | Decoración do texto.             |
| `text-transform`  | `none`, `uppercase`, `lowercase`, `capitalize`  | Transformación do texto.         |
| `text-indent`     | Lonxitude                                       | Sangría da primeira liña.        |
| `text-shadow`     | `<offset-x> <offset-y> <blur> <color>`          | Sombra do texto.                 |
| `white-space`     | `normal`, `nowrap`, `pre`, `pre-wrap`           | Tratamento de espazos en branco. |

---

## Cores e fondos

| Propiedade              | Valores comúns                                            | Que fai                             |
| ----------------------- | --------------------------------------------------------- | ----------------------------------- |
| `color`                 | Cor                                                       | Cor do texto.                       |
| `background`            | Atallo                                                    | Todas as propiedades de fondo.      |
| `background-color`      | Cor                                                       | Cor de fondo.                       |
| `background-image`      | `url()`, `linear-gradient()`, `radial-gradient()`, `none` | Imaxe ou degradado de fondo.        |
| `background-position`   | Lonxitudes, porcentaxes, palabras clave                   | Posición do fondo.                  |
| `background-size`       | `cover`, `contain`, lonxitudes, porcentaxes               | Tamaño do fondo.                    |
| `background-repeat`     | `repeat`, `no-repeat`, `repeat-x`, `repeat-y`             | Repetición do fondo.                |
| `background-attachment` | `scroll`, `fixed`, `local`                                | Se o fondo se move co scroll.       |
| `background-blend-mode` | Modo de fusión                                            | Como se fusionan as capas de fondo. |
| `box-shadow`            | `<offset-x> <offset-y> <blur> <spread> <color>`           | Sombra da caixa.                    |

---

## Flexbox

| Propiedade        | Valores comúns                                               | Que fai                                             |
| ----------------- | ------------------------------------------------------------ | --------------------------------------------------- |
| `flex-direction`  | `row`, `column`, `row-reverse`, `column-reverse`             | Dirección do eixe principal.                        |
| `flex-wrap`       | `nowrap`, `wrap`, `wrap-reverse`                             | Se os fillos poden pasar á seguinte liña.           |
| `justify-content` | `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `space-evenly` | Distribución no eixe principal.                     |
| `align-items`     | `stretch`, `flex-start`, `flex-end`, `center`, `baseline`    | Aliñamento no eixe transversal.                     |
| `align-content`   | Igual                                                        | Distribución das liñas no eixe transversal.         |
| `gap`             | Lonxitude                                                    | Espazo entre fillos.                                |
| `flex`            | `grow shrink basis`                                          | Atallo de `flex-grow`, `flex-shrink`, `flex-basis`. |
| `flex-grow`       | Número                                                       | Canto pode medrar un fillo.                         |
| `flex-shrink`     | Número                                                       | Canto pode encoller.                                |
| `flex-basis`      | Lonxitude, `auto`                                            | Tamaño base.                                        |
| `align-self`      | Igual que `align-items`                                      | Aliñamento dun fillo concreto.                      |
| `order`           | Número                                                       | Orde visual.                                        |

---

## Grid

| Propiedade                             | Valores comúns                                    | Que fai                                 |
| -------------------------------------- | ------------------------------------------------- | --------------------------------------- |
| `grid-template-columns`                | Lonxitudes, `fr`, `repeat()`, `minmax()`          | Columnas da grella.                     |
| `grid-template-rows`                   | Igual                                             | Filas da grella.                        |
| `grid-template-areas`                  | Cadeas de texto                                   | Nomear rexións.                         |
| `grid-auto-columns` / `grid-auto-rows` | Lonxitudes                                        | Tamaño das filas / columnas implícitas. |
| `grid-auto-flow`                       | `row`, `column`, `dense`                          | Como se colocan os elementos.           |
| `grid-column` / `grid-row`             | `start / end`, `span n`                           | Posición na grella.                     |
| `grid-area`                            | Nome, `row-start / col-start / row-end / col-end` | Rexión ou posición.                     |
| `gap`                                  | Lonxitude                                         | Espazo entre celas.                     |

---

## Animacións e transicións

| Propiedade                  | Valores comúns                                        | Que fai                            |
| --------------------------- | ----------------------------------------------------- | ---------------------------------- |
| `transition`                | `<property> <duration> <timing> <delay>`              | Transición entre dous estados.     |
| `animation`                 | Atallo                                                | Todas as propiedades de animación. |
| `animation-name`            | Nome definido en `@keyframes`                         | Nome da animación.                 |
| `animation-duration`        | Tempo                                                 | Duración dun ciclo.                |
| `animation-timing-function` | `ease`, `linear`, `cubic-bezier()`                    | Curva de aceleración.              |
| `animation-delay`           | Tempo                                                 | Atraso antes de comezar.           |
| `animation-iteration-count` | Número, `infinite`                                    | Cantas veces se repite.            |
| `animation-direction`       | `normal`, `reverse`, `alternate`, `alternate-reverse` | Dirección.                         |
| `animation-fill-mode`       | `none`, `forwards`, `backwards`, `both`               | Estado antes e despois.            |
| `animation-play-state`      | `running`, `paused`                                   | Pausar ou continuar.               |
| `animation-timeline`        | `scroll()`, `view()`, nome                            | Liña temporal (scroll-driven).     |
| `animation-range`           | Palabras clave                                        | Cando empeza e remata a animación. |

---

## Transformacións

| Propiedade            | Valores comúns                                             | Que fai                                 |
| --------------------- | ---------------------------------------------------------- | --------------------------------------- |
| `transform`           | `translate()`, `rotate()`, `scale()`, `skew()`, `matrix()` | Transformación 2D ou 3D.                |
| `translate`           | Lonxitudes                                                 | Propiedade individual de desprazamento. |
| `rotate`              | Ángulo                                                     | Propiedade individual de rotación.      |
| `scale`               | Número                                                     | Propiedade individual de escala.        |
| `transform-origin`    | Lonxitudes, porcentaxes, palabras clave                    | Punto de referencia.                    |
| `transform-style`     | `flat`, `preserve-3d`                                      | Se os fillos manteñen 3D.               |
| `perspective`         | Lonxitude                                                  | Profundidade para transformacións 3D.   |
| `backface-visibility` | `visible`, `hidden`                                        | Se se ve a cara traseira.               |

---

## Filtros e efectos

| Propiedade        | Valores comúns                                              | Que fai                                        |
| ----------------- | ----------------------------------------------------------- | ---------------------------------------------- |
| `filter`          | `blur()`, `brightness()`, `contrast()`, `grayscale()`, etc. | Filtros visuais.                               |
| `backdrop-filter` | Igual                                                       | Filtros aplicados ao fondo detrás do elemento. |
| `mix-blend-mode`  | `normal`, `multiply`, `screen`, `overlay`, etc.             | Fusión co que hai detrás.                      |
| `clip-path`       | `circle()`, `ellipse()`, `polygon()`, `inset()`, `url()`    | Recorte a unha forma.                          |
| `mask`            | `url()`, degradados                                         | Máscara.                                       |
| `opacity`         | `0` a `1`                                                   | Opacidade.                                     |

---

## Adaptabilidade

| Propiedade        | Valores comúns                                   | Que fai                                             |
| ----------------- | ------------------------------------------------ | --------------------------------------------------- |
| `aspect-ratio`    | `16/9`, `1`, etc.                                | Proporción entre ancho e alto.                      |
| `object-fit`      | `fill`, `contain`, `cover`, `none`, `scale-down` | Como se axusta unha imaxe ou vídeo ao seu contedor. |
| `object-position` | Lonxitudes, porcentaxes                          | Posición do obxecto dentro do contedor.             |
| `scroll-behavior` | `auto`, `smooth`                                 | Comportamento do scroll nas ligazóns internas.      |

---

## Variables e persoalización

| Propiedade | Valores comúns                   | Que fai                                    |
| ---------- | -------------------------------- | ------------------------------------------ |
| `--nome`   | Calquera valor                   | Define unha variable CSS.                  |
| `var()`    | `var(--nome, fallback)`          | Usa unha variable.                         |
| `env()`    | `env(safe-area-inset-top)`, etc. | Valores do entorno (móbiles, notch, etc.). |

---

## Accesibilidade

| Propiedade               | Valores comúns            | Que fai                            |
| ------------------------ | ------------------------- | ---------------------------------- |
| `prefers-color-scheme`   | `light`, `dark`           | Consulta de preferencia de tema.   |
| `prefers-reduced-motion` | `reduce`, `no-preference` | Consulta de redución de movemento. |
| `prefers-contrast`       | `more`, `less`, `custom`  | Consulta de contraste.             |
| `:focus-visible`         | —                         | Foco visible só cando é necesario. |

---

## Rendemento

| Propiedade           | Valores comúns                                | Que fai                                               |
| -------------------- | --------------------------------------------- | ----------------------------------------------------- |
| `will-change`        | `transform`, `opacity`, `auto`                | Avisa o navegador de que unha propiedade vai cambiar. |
| `contain`            | `layout`, `style`, `paint`, `size`, `content` | Illa un elemento de optimizacións.                    |
| `content-visibility` | `visible`, `auto`, `hidden`                   | Salta o procesamento de elementos non visibles.       |
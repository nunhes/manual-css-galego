---
title: "Glosario específico de CSS"
description: "Glosario de termos específicos de CSS, con definicións breves e equivalentes ou explicacións en galego."
bloque: 7
capitulo: 27
nivel: referencia
ultima_revision: "2026-09-17"
estado: "borrador_para_validacion"
compatibilidade: "non_aplicable"
palabras_chave:
  - glosario
  - terminologia
  - termos_CSS
  - referencia
  - definicions
---

<!-- # Glosario específico de CSS -->

Versión: 1.0
<!-- Uso: complementa o glosario xeral (`glosario-en-gl.md`). Céntrase nos termos propios de CSS que non aparecen alí ou que teñen un significado particular neste contexto.-->

---

> ## Como usar este glosario
>
> - Se un termo xa está no glosario xeral, non se repite aquí.
> - Cando hai varias formas en galego, indícanse as alternativas.
> - Cando un termo se mantén en inglés, indícase en cursiva e explícase.
> - Orde: alfabética, ignorando maiúsculas.

---

## A

**Accesibilidade (accessibility).**
Conxunto de prácticas que aseguran que calquera persoa, independentemente das súas capacidades, poida usar un sitio web. En CSS, céntrase en contraste, tamaños, foco visible, animacións reducidas e mais.

**Aniñamento (nesting).**
Técnica que permite escribir regras CSS unhas dentro doutras. Nativa desde 2023.

**Aniñado / aniñada.**
Participio de aniñar. Úsase en frases como «compoñentes aniñados».

**Aniñar (to nest).**
Escribir unha regra dentro doutra. (Nunca "anidar").

**Ámbito (scope).**
Zona do documento onde se aplican uns estilos. Ver `@scope`.

**At-rule (regra `@`).**
Regra CSS que comeza por `@`. Exemplos: `@media`, `@import`, `@font-face`, `@layer`, `@scope`, `@supports`.

---

## B

**Bloque (block).**
1. Elemento HTML que ocupa todo o ancho dispoñible e comeza nunha liña nova. 
1. Conxunto de declaracións entre chaves nunha regra CSS.

**Bordo (border).**
Liña que rodea un elemento, entre o recheo e a marxe.

**Breakpoint.**
Punto (ancho de pantalla) no que un deseño adaptativo cambia. Termo adoptado do inglés, úsase tal cal.

---

## C

**Cabeceira (header).**
1. Parte superior dunha páxina. 
1. Elemento `<header>`.

**Cascada (cascade).**
Mecanismo polo que CSS resolve conflitos entre regras que afectan ao mesmo elemento. Involucra orde, especificidade e herdanza.

**Cela (cell).**
Intersección dunha fila e unha columna nunha grella.

**Colapso de marxes (margin collapsing).**
Fenómeno polo que dúas marxes verticais en contacto non se suman, senón que colapsan nunha soa.

**Composición (compositing).**
Fase final do procesamento do navegador, na que se combinan as capas gráficas para producir a imaxe final. As propiedades que só afectan á composición (como `transform`) son as máis eficientes de animar.

**Contedor (container).**
Elemento que contén outros elementos. En contextos modernos, elemento que serve de referencia para container queries.

**Contido (content).**
O que hai dentro dun elemento: texto, imaxes, outros elementos.

**Curva de aceleración (timing function).**
Función que define como evoluciona unha transición ou animación ao longo do tempo.

---

## D

**Deseño adaptativo (responsive design).**
Práctica de crear sitios que se adaptan a distintos tamaños de pantalla e dispositivos.

**Declaración (declaration).**
Cada unha das liñas dentro dun bloque CSS. Formada por unha propiedade e un valor.

---

## E

**Especificidade (specificity).**
Peso que ten un selector na cascada. Canto máis específico, maior prioridade.

**Estado (state).**
Situación na que se atopa un elemento. Exemplos: `:hover`, `:focus`, `:disabled`, `:checked`.

---

## F

**Fillo (child).**
Elemento directamente contido dentro doutro.

**Flexbox (Flexible Box Layout).**
Sistema de layout unidimensional de CSS.

**Fluxo normal (normal flow).**
Comportamento por defecto dos elementos HTML nun documento, sen intervención de CSS.

**Folla de estilo (stylesheet).**
Conxunto de regras CSS. Pode ser un arquivo externo, un bloque `<style>` ou estilos en liña.

---

## G

**Grella (grid).**
Sistema de layout bidimensional de CSS.

**Grosor (weight).**
En tipografía, o grosor dunha letra. En CSS, `font-weight`.

---

## H

**Herdanza (inheritance).**
Mecanismo polo que certas propiedades se transmiten de pais a fillos.

---

## L

**Layout.**
Disposición dos elementos nunha páxina. Termo adoptado do inglés, úsase tal cal.

**Liña de grella (grid line).**
División entre filas ou columnas nunha grella.

---

## M

**Marxe (margin).**
Espazo exterior a un elemento. Non forma parte do elemento e non herda a súa cor de fondo.

**Máscara (mask).**
Propiedade que define que partes dun elemento son visibles. A diferenza de `clip-path`, pode ter transparencia gradual.

**Media query (consulta de medios).**
Regra que aplica estilos só cando se cumpren certas condicións (tamaño de pantalla, tipo de dispositivo, preferencias...).

**Modelo de caixa (box model).**
Modelo que describe os elementos HTML como caixas con catro capas: contido, recheo, bordo e marxe.

---

## N

**Nivel de liña (inline).**
Elemento que flúe co texto e non ocupa todo o ancho. Exemplos: `<span>`, `<a>`.

---

## O

**Orixe (origin).**
Lugar do que procede unha regra CSS: autor (o programador), usuario (as preferencias do navegador) ou navegador (estilos por defecto).

---

## P

**Pai (parent).**
Elemento que contén outros elementos.

**Pseudo-clase (pseudo-class).**
Selector que se aplica a un elemento segundo o seu estado ou posición. Exemplos: `:hover`, `:first-child`, `:has()`.

**Pseudo-elemento (pseudo-element).**
Selector que se aplica a unha parte dun elemento. Exemplos: `::before`, `::after`, `::marker`.

**Pixel (px).**
Unidade absoluta de medida. 1px é un píxel CSS, que pode corresponder a varios píxeles físicos nunha pantalla de alta densidade.

---

## Q

**Query.**
Consulta. En CSS, úsase en `media query` e `container query`.

---

## R

**Recheo (padding).**
Espazo interior a un elemento, entre o contido e o bordo. Forma parte do elemento e herda a súa cor de fondo.

**Regra (rule).**
Conxunto formado por un selector e un bloque de declaracións.

**Rendemento (performance).**
Velocidade e fluidez coa que se executa unha páxina web.

---

## S

**Selector.**
Parte dunha regra CSS que indica a que elementos se aplica.

**Sintaxe.**
Conxunto de regras que definen como se escriben as cousas nunha linguaxe.

**Subgrella (subgrid).**
Característica que permite a un fillo dunha grella usar as mesmas liñas có seu pai.

**Suxeito (subject).**
Elemento que se anima nunha animación dirixida polo scroll.

---

## T

**Transición (transition).**
Cambio suave entre dous valores dunha propiedade.

**Transformación (transform).**
Operación visual que move, xira, escala ou deforma un elemento sen afectar ao layout.

**Tema (theme).**
Conxunto de cores, tipografías e estilos que definen a aparencia dun sitio. Adoita xestionarse con variables CSS.

---

## U

**Unidade (unit).**
Medida que se usa nun valor CSS. Pode ser absoluta (`px`, `cm`) ou relativa (`em`, `rem`, `vw`).

---

## V

**Variable CSS (custom property).**
Propiedade personalizada que comeza por `--` e que se usa con `var()`.

***Viewport*.**
Área visible do navegador. As unidades `vw` e `vh` son relativas a ela.

---

## X

**Xeito de apilamento (stacking context).**
Contexto no que se resolve a orde de apiado dos elementos (`z-index`).

---

## Z

**z-index.**
Propiedade que controla a orde de apiado de elementos posicionados.
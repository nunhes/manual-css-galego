---
title: "Que é este manual"
description: "Presentación do manual de CSS en galego, o seu alcance, estrutura, público destinatario e forma de actualización."
bloque: 0
capitulo: 0
nivel: introductorio
ultima_revision: "2026-09-17"
estado: "borrador_para_validacion"
compatibilidade: "non_aplicable"
palabras_chave:
  - manual
  - referencia
  - estrutura
  - bloques
  - aprendizaxe
---

<!-- # Que é este manual -->

> Este é un manual de referencia de **CSS** escrito en **galego**. Non é un curso con sesións, senón un documento ao que volver para consultar, estudar ou resolver dúbidas concretas. Cobre CSS desde o máis elemental ata técnicas avanzadas, cun enfoque que combina explicación humana e uso práctico.

------

## 1. A quen vai dirixido

Este manual está pensado para:

- **Persoas que están a aprender CSS desde cero.** Se nunca escribiches CSS, podes ler o manual de principio a fin. Os primeiros capítulos asumen que non sabes nada, e van introducindo conceptos gradualmente.
- **Persoas que xa programan e queren consultar un tema concreto.** Se xa sabes CSS pero tes unha dúbida puntual (por exemplo, «como fago unha grella adaptativa?», «como funcionan as *container queries*?», «como se anima un elemento eficientemente?»), podes ir directamente ao capítulo correspondente.
- **Persoas que dan clase de programación.** O manual está escrito cunha linguaxe clara e cunha estrutura que se pode usar como material didáctico. Os exemplos son autocontidos e pódense copiar e probar directamente.
- **Persoas que traballan con CSS e queren mellorar as súas prácticas.** Os capítulos finais (rendemento, accesibilidade, organización) están pensados para quen xa ten experiencia e quere subir de nivel.

------

## 2. Que se pode atopar neste manual

O manual está organizado en **sete bloques**, que van do máis básico ao máis avanzado:

0. **Introdución e guía de uso** (este bloque). Que é o manual, como usalo, que convencións segue, como probar os exemplos.
1. **Fundamentos.** Que é CSS, sintaxe, selectores básicos, cores, tipografía, unidades, modelo de caixa. É o punto de partida para quen non sabe nada.
2. **Maquetación clásica.** `display`, fluxo normal, posicionamento e floats. Técnicas que aínda se atopan en código legado.
3. **Maquetación moderna.** Flexbox, Grid e subgrid. As ferramentas actuais para organizar contido.
4. **Adaptabilidade.** Media queries, container queries, unidades relativas e funcións modernas. Como facer que un deseño funcione en calquera pantalla.
5. **CSS moderno.** Variables, aniñamento nativo, pseudo-clases e pseudo-elementos modernos, funcións de cor.
6. **Avanzado.** Transicións, animacións, transformacións, filtros, máscaras, animacións dirixidas polo scroll, `@layer`, `@scope`, `@supports`, *View Transitions*, compoñentes nativas, rendemento e accesibilidade.
7. **Bloque de anexos** con:
    - Un glosario específico de CSS.
    - Unha táboa de propiedades máis usadas.
    - Recursos externos para seguir aprendendo.
    - Caracteristicas emerxentes

<!--E tamén un arquivo de presentación: README.md; e outro que serve para referir o historial de revisións do manual: CHANGELOG.md.-->

------

## 3. Que NON se pode atopar

Para non xerar expectativas erróneas, convén dicir o que **non** cobre este manual:

- **Non é un manual de HTML.** Cando se usan etiquetas HTML nos exemplos, asúmese que xa as coñeces ou que as podes consultar noutra fonte. Hai excelentes recursos de HTML en galego e en inglés.
- **Non é un manual de JavaScript.** Nunca se explica JavaScript en profundidade. Só se menciona cando é relevante para CSS (por exemplo, para cambiar variables en tempo de execución).
- **Non é un manual de deseño.** Non se explica teoría da cor, tipografía profesional, composición visual ou deseño de interface. Iso é outra disciplina. O manual explica **como facer** as cousas en CSS, non **que facer** desde o punto de vista do deseño.
- **Non é un manual de frameworks.** Non se explica Bootstrap, Tailwind, Sass, React, Vue nin ningunha outra ferramenta externa. O manual céntrase en **CSS estándar**, que é a base de todas elas.
- **Non é un manual de navegadores antigos.** O manual está escrito pensando en navegadores modernos (2026). Cando hai diferenzas de compatibilidade, indícanse, pero non se explica como dar soporte a Internet Explorer(abandonado definitivamente en febreiro de 2023) ou a navegadores moi antigos.

------

## 4. Por que en galego

O galego é unha lingua cunha grande tradición científica e técnica. Existen recursos terminolóxicos (Termigal, Mancomún, o Vocabulario de informática da Universidade de Vigo) que permiten escribir sobre informática en galego con precisión.

Este manual quere demostrar que **é posible escribir material técnico de calidade en galego**, sen renunciar á precisión nin caer en castelanismos ou anglicismos innecesarios. Cando un termo se mantén en inglés (por exemplo, *flexbox*, *grid*, *markdown*), faise porque é o termo asentado na comunidade, ou por falta de consenso ou alternativa.

O obxectivo non é «traducir todo ao galego a forza», senón **escribir en galego con naturalidade**, usando a terminoloxía que a comunidade técnica galega xa usa.

------

## 5. Como se mantén actualizado

CSS evoluciona constantemente. Cada ano aparecen novas características, outras cambian de estado nos navegadores, e outras quedan obsoletas. Este manual recolle **o estado de CSS a setembro de 2026**, pero é un documento vivo:

- Cando unha característica cambia de estado (por exemplo, pasa de experimental a Baseline), actualízase o capítulo correspondente.
- Cando aparece unha característica nova que encaixa no manual, engádese.
- Cando unha práctica queda obsoleta, indícase ou elímínase.

Os cambios anótanse no arquivo `CHANGELOG.md` que se pode atopar no repositorio de Github do proxecto.

------

## 6. Que necesitas para seguir o manual

Para ler o manual non necesitas nada especial. Para **practicalo**, necesitas:

- **Un ordenador.** Calquera serve: Windows, macOS, Linux, ChromeOS.
- **Un navegador moderno.** Chrome, Firefox, Edge, Safari ou calquera outro actualizado.
- **Un editor de textos.** Pode ser un editor sinxelo (Notepad++, TextEdit, Gedit) ou un editor de código (VSCode, Sublime Text, Phoenix,…). Recomendamos VSCode por ser gratuíto e ter bo soporte para CSS.
- **Vontade de experimentar.** O CSS apréndese escribindo, probando, errando e corrixindo.

Se non queres instalar nada, podes usar unha ferramenta en liña (CodePen, JSFiddle, StackBlitz) para probar os exemplos directamente no navegador. No arquivo `03-probar-exemplos.md` explícase como.

------

## 7. Que esperar deste manual

Este manual está escrito cunhas conviccións:

- **A linguaxe humana vai antes do código.** Nunca se presenta un bloque de código sen unha explicación previa que diga que se vai facer e por que.
- **A profundidade é variable.** Algúns temas cobren poucas páxinas; outros requiren máis. Non hai unha extensión fixa por capítulo. A extensión vén determinada polo tema, non por unha norma artificial.
- **A lectura pode ser non lineal.** Cada capítulo é relativamente independente. Podes ler na orde que queiras, aínda que os primeiros capítulos asumen menos coñecementos ca os últimos.
- **O ritmo é importante.** Non hai présa. O obxectivo é entender, non rematar rápido. Se un tema require parar e reler, para e relé.
- **A accesibilidade non é opcional.** Ao longo do manual, insístese en prácticas que fan o CSS máis accesible. Non é un tema á parte: é parte do bo CSS.

------

## 8. Referencias cruzadas

- **`01-como-usalo.md`** — como ler o manual (consulta rápida vs. lectura secuencial).
- **`02-convencions.md`** — que convencións tipográficas e de código segue o manual.
- **`03-probar-exemplos.md`** — como probar os exemplos na túa contorna.
- **`README.md`** — índice xeral con ligazóns a todos os capítulos.

------

**Data de creación:** 2026-09-17
**Última revisión:** 2026-09-17
**Estado:** Borrador para validación
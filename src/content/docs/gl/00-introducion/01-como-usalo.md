---
title: "Como usar este manual"
description: "Guía para ler o manual como referencia rápida ou percorrido secuencial, usando índices, glosarios e referencias cruzadas."
bloque: 0
capitulo: 1
nivel: introductorio
ultima_revision: "2026-09-17"
estado: "borrador_para_validacion"
compatibilidade: "non_aplicable"
palabras_chave:
  - consulta_rapida
  - lectura_secuencial
  - navegacion
  - referencias_cruzadas
  - glosario
  - tabla_propiedades
---

<!-- # Como usar este manual -->

> Este manual pódese ler de dúas formas: **consulta rápida** (ir directamente ao tema que che interesa) ou **lectura secuencial** (de principio a fin). Este arquivo explica como aproveitar cada unha, que ferramentas de navegación hai, e como usar as referencias cruzadas.

------

## 1. Dúas formas de ler o manual

### 1.1 Consulta rápida

Se tes unha dúbida concreta, non hai que ler o manual enteiro. Podes ir directamente ao capítulo correspondente.

**Como facelo:**

1. **Usa o índice<!-- do `README.md`-->.** Cada capítulo ten unha liña que describe o seu contido. Busca o que che interesa.
2. **Le o resumo rápido.** Cada capítulo comeza cun **resumo rápido** de 2-3 liñas. Se o que buscas está alí, o capítulo é o axeitado. Se non, busca noutro.
3. **Usa a táboa de propiedades.** Se o que buscas é unha propiedade concreta, consulta `07-anexos/02-taboa-propiedades.md`. Alí están as propiedades máis usadas, con valores comúns e unha descrición.
4. **Usa o glosario.** Se o que buscas é un termo, consulta `glosario-en-gl.md` (xeral) ou `07-anexos/01-glosario-css.md` (específico de CSS).
5. **Usa o buscador do editor.** Se estás a ler o manual nun editor de textos (VSCode, etc.), usa Ctrl+F (ou Cmd+F) para buscar unha palabra clave en todos os arquivos.

**Exemplo:** se queres saber como facer unha grella adaptativa, podes:

- Ir ao capítulo 9 (Grid) directamente.
- Ou buscar «auto-fit» no manual.
- Ou consultar a táboa de propiedades, na sección de Grid.

### 1.2 Lectura secuencial

Se estás a aprender CSS desde cero, podes ler o manual de principio a fin. A orde dos bloques está pensada para que cada capítulo apoie no anterior.

**Orde recomendada:**

1. **Bloque 1 — Fundamentos.** Non podes saltar este bloque se non sabes CSS.
2. **Bloque 3 — Maquetación moderna.** Flexbox e Grid son as ferramentas actuais. Non os saltes.
3. **Bloque 4 — Adaptabilidade.** Como facer que o deseño funcione en calquera pantalla.
4. **Bloque 5 — CSS moderno.** Variables, aniñamento, pseudo-clases modernas, cores.
5. **Bloque 6 — Avanzado.** Animacións, transformacións, rendemento, accesibilidade.

**Bloque 2 — Maquetación clásica.** Pódese ler despois dos anteriores, ou saltar se non vas traballar con código legado. Non é imprescindible para entender CSS moderno.

### 1.3 Folla de ruta segundo o teu perfil

A continuación proponse unha **orde concreta de lectura** segundo o punto de partida. Non é obrigatorio seguila, pero axuda a non perderse nun manual con 34 capítulos.

#### Se estás a aprender CSS desde cero

Le os capítulos **na orde numérica**, sen saltar. A estrutura está pensada para que cada capítulo apoie no anterior.

**Ruta completa (recomendada):**

1. **Bloque 0 — Introdución.** `00-que-e-este-manual.md`, `01-como-usalo.md`, `02-convencions.md`, `03-probar-exemplos.md`.
2. **Bloque 1 — Fundamentos.** Capítulos 1 a 5, **incluído** o capítulo 6 sobre HTML semántico.
3. **Bloque 3 — Maquetación moderna.** Capítulos 8 e 9 (Flexbox e Grid). O capítulo 10 (subgrid) pódese deixar para despois.
4. **Bloque 4 — Adaptabilidade.** Capítulos 11 a 13.
5. **Bloque 5 — CSS moderno.** Capítulos 14 a 17.
6. **Bloque 2 — Maquetación clásica.** Capítulos 6 e 7 (pódense ler aquí, ou saltar se non vas traballar con código legado).
7. **Bloque 6 — Avanzado.** Capítulos 18 a 27, na orde numérica.
8. **Bloque 7 — Anexos.** Consulta puntual.

**Tempo estimado:** 40-60 horas de lectura + 40-60 horas de práctica.

#### Se xa sabes CSS básico e queres consolidar

Le primeiro os capítulos que che falten dos fundamentos (1-6), e despois céntrate en:

1. **Bloque 3 — Maquetación moderna** (capítulos 8-10).
2. **Bloque 4 — Adaptabilidade** (capítulos 11-13).
3. **Capítulo 24 — Arquitectura CSS.**
4. **Capítulo 25 — Depurar CSS.**
5. **Capítulo 28 — Accesibilidade.**

**Tempo estimado:** 15-25 horas.

#### Se xa traballas con CSS e queres mellorar prácticas

Podes ir directamente aos capítulos avanzados, pero convén revisar antes:

1. **Capítulo 3 (Selectores e especificidade)** e **capítulo 23 (`@layer`, `@scope`, `@supports`)** — para controlar a cascada.
2. **Capítulo 24 (Arquitectura CSS)** — para organizar proxectos grandes.
3. **Capítulo 25 (Depurar CSS)** — para diagnosticar problemas.
4. **Capítulo 26 (Rendemento)** — para optimizar.
5. **Capítulo 27 (Compoñentes nativos)** — para usar `dialog` e Popover API.
6. **Capítulo 28 (Accesibilidade)** — para garantir que o teu CSS é accesible.
7. **Anexos transversais** — escritura lóxica, impresión, seguridade, testing, SVG.

**Tempo estimado:** 10-15 horas.

#### Se só queres consultar un tema concreto

Usa o **índice do `README.md`** ou o **buscador do editor** (Ctrl+F). Cada capítulo comeza cun **resumo rápido** que che axuda a saber se é o que buscas. Consulta tamén:

- **`07-anexos/02-taboa-propiedades.md`** — para propiedades concretas.
- **`07-anexos/01-glosario-css.md`** — para termos.
- **`07-anexos/10-erros-comuns.md`** — para problemas frecuentes.

------

## 2. Estrutura interna de cada capítulo

Cada capítulo segue unha estrutura interna que facilita a lectura. Non todas as seccións aparecen en todos os capítulos, pero a maioría si.

| Sección                      | Que contén                                             |
| :--------------------------- | :----------------------------------------------------- |
| **Resumo rápido**            | 2-3 liñas ao comezo, para saber de que vai o capítulo. |
| **Introdución**              | O problema que resolve o tema, en linguaxe humana.     |
| **Conceptos fundamentais**   | Explicación clara, con exemplos visuais cando axudan.  |
| **Sintaxe**                  | A forma mínima de usar o que se explica.               |
| **Exemplo mínimo funcional** | HTML + CSS autocontido, comentado paso a paso.         |
| **Casos habituais**          | Os usos que aparecen na práctica diaria.               |
| **Erros frecuentes**         | O que adoita saír mal e como diagnosticalo.            |
| **Compatibilidade**          | Estado nos navegadores, con data de referencia.        |
| **Exercicios**               | Exercicios para practicar (non en todos os capítulos). |
| **Para profundar**           | Ligazóns a especificacións e recursos externos.        |
| **Referencias cruzadas**     | Que outros capítulos convén ler.                       |

**Consello:** se estás a facer unha consulta rápida, le o **resumo rápido** e o **exemplo mínimo funcional**. Se necesitas máis, le o resto.

------

## 3. Como usar as referencias cruzadas

Ao longo do manual hai **referencias cruzadas** que indican onde consultar temas relacionados. Por exemplo:

> 💡 **Ver tamén:** Capítulo 14 (Propiedades personalizadas) para entender como se usan as variables CSS nos exemplos deste capítulo.

Isto significa que, se non entendeches algo, podes ir ao capítulo indicado. **Non é necesario lelo enteiro**: abonda con ler a sección correspondente.

**Recomendación:** cando atopes unha referencia cruzada, abre o capítulo noutra lapela (ou nunha ventá distinta) e consulta a sección. Así podes volver rapidamente ao punto onde estabas.

------

## 4. Como usar o glosario

O manual ten dous glosarios:

- **`glosario-en-gl.md`** — glosario xeral inglés↔galego, con termos de programación e informática.
- **`07-anexos/01-glosario-css.md`** — glosario específico de CSS, con termos propios do contexto.

**Como usalos:**

- Se ves un termo en inglés que non coñeces, busca en `glosario-en-gl.md`.
- Se ves un termo en galego que non entendeches, busca en calquera dos dous.
- Se ves un termo que non está en ningún dos dous glosarios, é unha **mellora pendente**. Podes suxerir que se engada.

------

## 5. Como usar a táboa de propiedades

`07-anexos/02-taboa-propiedades.md` é unha **referencia rápida** das propiedades máis usadas en CSS. Está organizada por categoría:

- Layout e display.
- Modelo de caixa.
- Tipografía.
- Cores e fondos.
- Flexbox.
- Grid.
- Animacións e transicións.
- Transformacións.
- Filtros e efectos.
- Adaptabilidade.
- Variables e persoalización.
- Accesibilidade.
- Rendemento.

**Cando usala:** cando sabes que existe unha propiedade pero non lembras os valores que acepta. Por exemplo: «cales son os valores de `justify-content`?». A táboa dá a resposta nunha liña.

**Que non é:** a táboa non substitúe aos capítulos. Non explica **cando** usar cada propiedade, nin **como** se combinan. Para iso, hai que ler o capítulo correspondente.

------

## 6. Que facer se non entende algo

Se estás a ler un capítulo e non entendes algo:

1. **Relee o parágrafo con calma.** Ás veces, a segunda lectura aclara.
2. **Consulta o glosario.** Se o problema é un termo, probablemente estea explicado alí.
3. **Busca a referencia cruzada.** Se o capítulo menciona outro concepto (por exemplo, «especificidade»), hai un capítulo que o explica. Vai alí.
4. **Proba o exemplo.** O CSS apréndese probando. Se un concepto non queda claro, copia o exemplo e modifícao. Ves o que cambia.
5. **Consulta fontes externas.** O capítulo ten ligazóns a MDN, [web.dev](https://web.dev/) e outras fontes. Ás veces, outra explicación axuda.
6. **Deixa o tema e volve despois.** Ás veces, o cerebro necesita tempo para asimilar. Se un tema se atasca, segue adiante e volve a el noutro momento.

**Se nada diso funciona**, é probable que o capítulo non estea ben explicado. Nese caso, é unha **mellora pendente**. Podes suxerir que se mellore.

------

## 7. Consellos para aprender CSS

Aprender CSS non é memorizar propiedades. É entender uns poucos conceptos clave e saber practicalos.

**Consellos:**

1. **Practica todos os días.** Aínda que sexan 15 minutos. O CSS apréndese escribindo.
2. **Non copies sen entender.** Copiar un exemplo sen entendelo non serve. Modifícao, cambia valores, ve o que pasa.
3. **Aprende a usar DevTools.** O navegador ten ferramentas de desenvolvemento (F12) que permiten inspeccionar elementos, ver os estilos aplicados, probar cambios en tempo real. Son a mellor ferramenta de aprendizaxe de CSS.
4. **Non te obsesiones coa perfección.** O CSS ten moitas formas de facer o mesmo. Se funciona e é razoable, é bo.
5. **Aprende a organizar o código desde o principio.** Non esperes a ter un proxecto grande para pensar en variables, capas e convencións.
6. **Non ignores a accesibilidade.** É parte do traballo, non un extra.
7. **Paciencia.** O CSS ten moitos detalles. Ninguén o sabe todo. O importante é entender os fundamentos e saber buscar cando hai dúbidas.

------

## 8. Referencias cruzadas

- **`00-que-e-este-manual.md`** — que é o manual, a quen vai dirixido, que se pode atopar.
- **`02-convencions.md`** — convencións tipográficas e de código do manual.
- **`03-probar-exemplos.md`** — como probar os exemplos na túa contorna.
- **`README.md`** — índice xeral con ligazóns a todos os capítulos.

------

**Data de creación:** 2026-09-17
**Última revisión:** 2026-09-17
**Estado:** Borrador para validación


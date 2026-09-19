# Historial de revisións do manual

Este arquivo recolle os cambios importantes do manual ao longo do tempo. Cada vez que se actualice un capítulo (por cambios en CSS, por correccións terminolóxicas, por melloras de redacción), anótase aquí.

---

## Formato

As entradas seguen unha versión simplificada de [Keep a Changelog](https://keepachangelog.com/gl/1.1.0/).

- **Engadido:** novos capítulos, novas seccións.
- **Cambiado:** modificacións en contidos existentes.
- **Corrixido:** erros corrixidos.
- **Eliminado:** contidos eliminados.
- **Pendente:** tarefas de revisión en curso.

---

## [0.9.3] — 2026-09-18

### Engadido

- **Sistema de validación de exemplos CSS/HTML:**
  - `extraer-validar-exemplos.js`: script que extrae automaticamente todos os bloques de código dos capítulos e valida a súa sintaxe básica
  - `validacion-exemplos.html`: páxina HTML interactiva para validación manual de exemplos
  - `validacion-exemplos-gerado.html`: HTML xerado automaticamente con todos os exemplos extraídos e os seus estados de validación
  - `informe-validacion-exemplos.json`: informe JSON detallado con resultados da validación
  - `test-extraccion.js`: script de proba para verificar a extracción de bloques de código

### Cambiado

- **Melora na extracción de bloques de código:** o regex agora manexa correctamente as terminacións de liña Windows (\r\n) e é máis flexible con fragmentos de código educativos

### Notas

- A validación detecta 924 bloques CSS e 100 bloques HTML nos 34 capítulos
- Os erros detectados son principalmente falsos positivos debidos a que os exemplos educativos son a miúdo fragmentos incompletos (só propiedades, só selectores, etc.), o cal é normal en material didáctico
- O sistema de validación está deseñado para ser evolutivo: pódese mellorar cos validadores CSS/HTML reais do W3C

---

## [0.9.2] — 2026-09-18

### Engadido

- **Metadatos YAML:** engadidos metadatos estruturados a todos os capítulos do manual (bloques 0-7 e anexos). Cada capítulo agora inclúe:
  - `titulo`: título do capítulo
  - `bloque`: número de bloque (0-7)
  - `capitulo`: número de capítulo dentro do bloque
  - `nivel`: dificultade (introductorio, basico, intermedio, avanzado, referencia)
  - `ultima_revision`: data da última revisión
  - `estado`: estado actual (borrador_para_validacion)
  - `compatibilidade`: estado de compatibilidade (universal, baseline_XXXX, non_aplicable)
  - `palabras_chave`: lista de termos relevantes para busca e indexación

### Cambiado

- **`README.md`:** actualizada a sección «Ficheiros pendentes» para reflectir que `glosario-en-gl.md` xa está completado.

---

## [0.9.1] — 2026-09-18

### Corrixido

- **Codificación:** arranxada a codificación UTF-8 dos ficheiros `05-css-moderno/03-pseudoclases-pseudoelementos.md` e `06-avanzado/01-transicions-animacions.md`, que tiñan os acentos, emojis e símbolos corruptos (mojibake). O contido é agora lexible en calquera editor.
- **`05-css-moderno/03-pseudoclases-pseudoelementos.md`:** eliminado un comentario confuso na sección 6 sobre `:has()` con `label` que non se correspondía co exemplo real. Renomeada a clase `.eido` a `.campo` para coherencia co resto do manual.
- **`README.md`:** actualizado para reflectir o estado real do proxecto. Todos os ficheiros existentes están marcados con `[x]`. Engadido o anexo `04-caracteristicas-emerxentes.md`. Engadida a sección «Ficheiros pendentes» co `glosario-en-gl.md`. Actualizado o «Estado do proxecto».
- **`CHANGELOG.md`:** eliminados os placeholders («actualizar!!!»), corrixidas as entradas confusas («Capítulo 19: engadido. Capítulo 20: engadido.»), engadido o Bloque 0 e o anexo de características emerxentes, e eliminadas as referencias ao ficheiro `SKILL-docente-programacion-galego.md`, que non forma parte do proxecto.

### Pendente

- **Revisión de estilo global:** comprobar a coherencia de tuteo, linguaxe inclusiva e formato en todos os capítulos.
- **Revisión de exemplos:** comprobar que todos os exemplos de código son válidos e actualizados.
- **Revisión de ligazóns externas:** comprobar que todas as ligazóns de recursos externos funcionan.
- **Notas de compatibilidade:** unificar as datas de Baseline entre capítulos e anexos (hai discrepancias en `@scope`, consultas de estilo, `@starting-style` e `contrast-color()`).

---

## [0.9] — 2026-09-17

### Engadido

- **Bloque 0 — Introdución e guía de uso** (4 capítulos):
  - Que é este manual.
  - Como usar este manual (consulta rápida vs. lectura secuencial).
  - Convencións (tuteo, linguaxe inclusiva, formato, recadros de aviso).
  - Como probar os exemplos.
- **Bloque 1 — Fundamentos** (5 capítulos):
  - Que é CSS e como se aplica ao HTML.
  - Sintaxe.
  - Selectores básicos.
  - Cores, tipografía e unidades.
  - Modelo de caixa.
- **Bloque 2 — Maquetación clásica** (2 capítulos):
  - `display`, fluxo normal e posicionamento.
  - Floats.
- **Bloque 3 — Maquetación moderna** (3 capítulos):
  - Flexbox.
  - Grid.
  - Subgrid e grellas avanzadas.
- **Bloque 4 — Adaptabilidade** (3 capítulos):
  - Media queries.
  - Container queries.
  - Unidades relativas e funcións modernas.
- **Bloque 5 — CSS moderno** (4 capítulos):
  - Propiedades personalizadas.
  - Aniñamento nativo.
  - Pseudo-clases e pseudo-elementos modernos.
  - Funcións de cor modernas.
- **Bloque 6 — Avanzado** (9 capítulos):
  - Transicións e animacións.
  - View Transitions.
  - Transformacións 2D e 3D.
  - Filtros, blend modes e masking.
  - Animacións dirixidas polo scroll.
  - `@layer`, `@scope`, `@supports`.
  - Rendemento e boas prácticas.
  - Compoñentes nativos.
  - Accesibilidade e CSS.
- **Bloque 7 — Anexos** (4 documentos):
  - Glosario específico de CSS.
  - Táboa de propiedades máis usadas.
  - Recursos externos.
  - Características emerxentes (2026).
- `README.md` (índice xeral).
- `CHANGELOG.md` (este arquivo).

### Cambiado

- **Terminoloxía:** corrixiuse o uso de «anidación»/«anidar»/«anidado» por **«aniñamento»/«aniñar»/«aniñado»**, conforme á normativa do galego.
- **Capítulo 13:** revisada a sintaxe de `calc()` e `clamp()` para poñer exemplos máis claros.

### Pendente

- **Revisión de estilo global:** comprobar a coherencia de tuteo, linguaxe inclusiva e formato en todos os capítulos.
- **Revisión de exemplos:** comprobar que todos os exemplos de código son válidos e actualizados.
- **Revisión de ligazóns externas:** comprobar que todas as ligazóns de recursos externos funcionan.
- **Notas de compatibilidade:** revisar as notas de Baseline para reflectir o estado real a finais de 2026.



---

## [0.1] — 2026-09-17

### Engadido

- Estrutura xeral do manual.
- Plan detallado dos bloques 0 a 7.
- `SKILL-docente-programacion-galego.md` (documento de instrucións do asistente).
- `glosario-en-gl.md` (glosario xeral inglés-galego).

---

## Notas sobre versións

- As versións 0.x son **borradores para validación**.
- A versión 1.0 será a primeira **versión estable**, cando se rematen as revisións pendentes.
- As versións posteriores reflectirán **cambios en CSS** (novas características, cambios de estado) e **melloras do manual**.

---

## Criterios específicos para a versión 1.0:

- [ ] Todos os exemplos validados
- [ ] Todas as ligazóns verificadas
- [ ] Revisión de estilo completada
- [ ] Coherencia de compatibilidade unificada

---

## Como propoñer cambios

Se atopas un erro, queres engadir un exemplo ou suxerir unha mellora, abre unha incidencia ou envía unha suxestión. Anotaranse na sección **Pendente** e abordaranse na seguinte revisión.
---
title: "Convencións do manual"
description: "Descrición das convencións lingüísticas, terminolóxicas e de formato empregadas no manual."
bloque: 0
capitulo: 2
nivel: introductorio
ultima_revision: "2026-09-17"
estado: "borrador_para_validacion"
compatibilidade: "non_aplicable"
palabras_chave:
  - tuteo
  - linguaxe_inclusiva
  - formato_codigo
  - recadros_aviso
  - compatibilidade
  - accesibilidad
  - referencias_cruzadas
---

<!-- # Convencións do manual -->

> Este arquivo explica as convencións que segue o manual: tuteo, linguaxe inclusiva, formato dos bloques de código, recadros de aviso, e como se indican as notas de compatibilidade e accesibilidade. Coñecelas fai a lectura máis fluída.

------

## 1. Linguaxe

### 1.1 Tuteo directo

O manual usa **tuteo directo**. Diríxese a ti, lectora ou lector, en segunda persoa:

- «Vas ver...»
- «Podes probar...»
- «Fíxate en...»
- «Cando escribes...»

Isto fai o texto máis próximo e máis claro. Non se usa o rexistro formal nin o impersoal («pódese facer», «é necesario»), agás cando o contexto o require.

### 1.2 Linguaxe inclusiva

O manual usa **linguaxe inclusiva** de xeito sistemático:

- «Alumnado», non «alumnos».
- «Persoas programadoras», non «programadores».
- «Quen escribe código», non «o programador».
- «Usuario ou usuaria» cando non hai alternativa neutra.
- Evítase o masculino xenérico.

Cando hai unha forma neutra natural (como «alumnado» ou «persoal»), úsase. Cando non a hai, emprégase o dobre forma («usuario ou usuaria»), pero sen abusar.

### 1.3 Terminoloxía

- **Termos en galego** cando existen e están asentados.
- **Termos en inglés** cando son o estándar na comunidade (*flexbox*, *grid*, *markdown*, *framework*).
- **Termos en inglés en cursiva** cando se manteñen pero non están plenamente asentados (*mask*, *blend mode*).
- **Siglas en maiúsculas** (HTML, CSS, JSON, API), desenvolvidas a primeira vez.

Para máis detalle, consulta o `glosario-en-gl.md` e o `07-anexos/01-glosario-css.md`.

### 1.4 Aniñar, non anidar

Unha nota específica: en galego, o verbo é **aniñar**, non «anidar». Polo tanto:

- **aniñar** (verbo)
- **aniñado / aniñada** (participio)
- **aniñamento** (substantivo)

Non se usa «anidar», «anidado» nin «anidación». Isto é unha corrección terminolóxica aplicada ao longo de todo o manual.

------

## 2. Formato dos bloques de código

### 2.1 Explicación antes do código

**Nunca hai un bloque de código sen explicación previa.** Antes de cada bloque, hai un parágrafo que di que se vai facer e por que. Ás veces, despois do bloque hai outro parágrafo que explica o resultado.

**Exemplo:**

> Vexamos como se escribe unha regra CSS básica. O selector indica a que elementos se aplica, e o bloque entre chaves contén as declaracións:
>
> ```css
> p {
>     color: #333;
> }
> ```
> 
>
> Esta regra aplica a cor `#333` a todos os parágrafos do documento.

### 2.2 Linguaxe dos bloques

Os bloques de código indican sempre a linguaxe:

- **`css`** para CSS.
- **`html`** para HTML.
- **`javascript`** ou **`js`** para JavaScript.
- **`markdown`** para Markdown.
- **`mermaid`** para diagramas Mermaid.

Isto permite que o editor faga **resaltado de sintaxe**, o que facilita a lectura.

### 2.3 Comentarios no código

- **Comentarios en galego**, sempre.
- Identificadores (variables, funcións, clases) en **inglés** cando a convención da linguaxe o pida, ou cando o exemplo o require.
- Comentarios concisos, que expliquen o **por que**, non o **que** (agás cando o que non é evidente).

**Exemplo:**

```css
/* Ben: explica o por que */
.tarxeta {
    box-sizing: border-box; /* evita que o padding engada ancho */
}

/* Menos útil: explica o obvio */
.tarxeta {
    color: red; /* pon a cor vermella */
}
```

### 2.4 Código completo vs. fragmentos

- Cando un exemplo é **autocontido** (pódese copiar e probar), indícase cun comentario ao comezo.
- Cando é un **fragmento** (só unha parte), indícase claramente.
- Cando hai **HTML + CSS**, móstranse en bloques separados, coa indicación de que arquivo é cada un.

**Exemplo:**

> **Arquivo HTML (`index.html`):**
>
> ```html
> <!DOCTYPE html>
> <html lang="gl">
> ...
> ```
>
> **Arquivo CSS (`estilos/principal.css`):**
>
> ```css
> .tarxeta { ... }
> ```

------

## 3. Recadros de aviso

Ao longo do manual hai recadros de aviso que destacan información importante. Hai catro tipos:

### 3.1 💡 Para pensar

Reflexións, consellos ou ideas que axudan a entender mellor o tema.

> 💡 **Para pensar:** as transformacións non cambian o layout. Se queres mover algo sen afectar aos veciños, usa `transform`.

### 3.2 ⚠️ Atención

Avisos sobre erros frecuentes, problemas de compatibilidade ou cousas que hai que ter en conta.

> ⚠️ **Atención:** `display: none` fai que o elemento non se lea polos lectores de pantalla. Se queres ocultalo visualmente pero mantelo accesible, usa outra técnica.

### 3.3 🆕 Actualización

Cambios recentes, características novas ou información que pode quedar desactualizada.

> 🆕 **Actualización:** `contrast-color()` é unha característica moi recente (2026). Comproba o estado actual en [web.dev/baseline](https://web.dev/baseline) antes de usala en produción.

### 3.4 ♿ Accesibilidade

Información relacionada coa accesibilidade.

> ♿ **Accesibilidade:** o contraste entre texto e fondo debe ser de polo menos 4.5:1 para texto normal.

------

## 4. Notas de compatibilidade

Cada capítulo ten unha sección de **compatibilidade** que indica o estado das características nos navegadores. A información baséase en **Baseline** e indícase a data de referencia (normalmente setembro de 2026).

**Formato:**

| Característica   | Estado               |
| :--------------- | :------------------- |
| `display: flex`  | Universal desde 2015 |
| `gap` en Flexbox | Baseline desde 2021  |
| `:has()`         | Baseline desde 2024  |

**Estados posibles:**

- **Universal:** soportado por todos os navegadores modernos.
- **Baseline:** soportado pola maioría de navegadores modernos nunha data concreta.
- **Baseline novo:** soportado recentemente; pode haber usuarios con navegadores antigos.
- **Experimental:** só nalgúns navegadores; non se recomenda para produción.

------

## 5. Notas de accesibilidade

Cando un tema ten implicacións de accesibilidade, indícase cun recadro específico ou cunha sección ao final do capítulo. O obxectivo é que a accesibilidade non se trate como un tema á parte, senón como parte do bo CSS.

**Exemplo:**

> ♿ **Accesibilidade:** as animacións deben respectar a preferencia `prefers-reduced-motion`. Se non o fas, podes causar problemas a persoas con sensibilidade ao movemento.

O capítulo 24 recolle todas as prácticas de accesibilidade nun só lugar.

------

## 6. Referencias cruzadas

As referencias cruzadas indican onde consultar temas relacionados. Teñen este formato:

> **Ver tamén:** Capítulo 14 (Propiedades personalizadas) para entender como se usan as variables CSS.

As referencias indican o **número de capítulo** e o **título**, para que sexa fácil atopalo.

------

## 7. Exercicios

Algúns capítulos teñen unha sección de **exercicios** ao final. Os exercicios seguen este formato:


```markdown
#### Exercicio N: [Título]

[Enunciado]

**Solución:**
[Código ou explicación]
```

Os exercicios son **opcionais**. Serven para practicar, pero non é necesario facelos todos para entender o tema.

------

## 8. Convencións tipográficas

- **Negras** para destacar conceptos importantes.

- *Cursivas* para termos en inglés que non están asentados, ou para énfase.

- `Código en liña` para nomes de propiedades, valores, elementos HTML, etc.

- > Citas ou notas ao pé.

- Listas con guións ou números, segundo o caso.

------

## 9. Formato de datas

As datas do manual escríbense no formato **ISO 8601**:

- `2026-09-17` (ano-mes-día).

Isto evita ambigüidades e facilita o ordenamento.

------

## 10. Referencias cruzadas

- **`00-que-e-este-manual.md`** — que é o manual, a quen vai dirixido.
- **`01-como-usalo.md`** — como ler o manual (consulta rápida vs. lectura secuencial).
- **`03-probar-exemplos.md`** — como probar os exemplos na túa contorna.
- **`glosario-en-gl.md`** — glosario xeral inglés↔galego.
- **`07-anexos/01-glosario-css.md`** — glosario específico de CSS.

------

**Data de creación:** 2026-09-17
**Última revisión:** 2026-09-17
**Estado:** Borrador para validación
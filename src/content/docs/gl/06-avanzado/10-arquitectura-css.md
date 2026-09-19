---
title: "Arquitectura CSS: como organizar proxectos grandes"
description: "Patróns e estratexias para organizar proxectos CSS grandes, definir tokens e manter sistemas coherentes de espazado e tipografía."
bloque: 6
capitulo: 27
nivel: avanzado
ultima_revision: "2026-09-18"
estado: "borrador_para_validacion"
compatibilidade: "non_aplicable"
palabras_chave:
  - arquitectura
  - itcss
  - cube_css
  - bem
  - smacss
  - atomic_design
  - design_tokens
  - sistemas_espazado
  - escalas_tipograficas
  - organizacion
---

<!-- # Capítulo 27: Arquitectura CSS -->

> Cando un proxecto CSS medra, o problema deixa de ser «como escribir esta propiedade» e pasa a ser «como organizar todo isto para que non se volva inmanexable». Este capítulo explica os **patróns de arquitectura CSS** máis usados (ITCSS, CUBE CSS, BEM, SMACSS, Atomic Design), como definir **design tokens**, e como construír **sistemas coherentes de espazado e tipografía**.

---

## 1. Introdución: o problema do CSS a escala

Un CSS de 100 liñas organiza se facilmente. Un CSS de 5.000 liñas, con 20 compoñentes, 5 temas, e 3 persoas traballando nel, non. Nese punto, aparecen problemas:

- **Especificidade fora de control.** Selectores longos que compiten entre si, `!important` por todas partes.
- **Duplicación.** A mesma cor, o mesmo espazado, o mesmo radio de bordo, copiados en 30 sitios.
- **Filtración de estilos.** Un estilo para un compoñente afecta a outros sen querer.
- **Dificultade para atopar cousas.** «Onde está definido o estilo do botón?»
- **Dificultade para eliminar cousas.** «Podo borrar este CSS? Ninguén sabe.»
- **Onboarding lento.** Unha persoa nova tarda semanas en entender como está organizado.

**A arquitectura CSS** é o conxunto de decisións sobre **como se organiza o CSS** para evitar eses problemas. Non hai unha única forma boa; hai patróns con vantaxes e inconvenientes, e hai que escoller un segundo o proxecto.

> 💡 **Para pensar:** a arquitectura CSS non é unha cuestión de «ferramentas» (Sass, PostCSS, Tailwind), senón de **principios**. Pódese aplicar ITCSS con CSS puro, con Sass, ou con calquera ferramenta. O importante é ter unha estrutura clara.

---

## 2. Os patróns clásicos

### 2.1 ITCSS (Inverted Triangle CSS)

**ITCSS** (Harry Roberts, 2014) organiza o CSS en **capas** de xeral a específico. A idea é que **as capas inferiores teñen menos especificidade e afectan a máis cousas**, mentres que as superiores son específicas de compoñentes.

**Capas (de arriba a abaixo):**

1. **Settings.** Variables, configuración.
2. **Tools.** Mixins, funcións.
3. **Generic.** Reset, normalize.
4. **Elements.** Estilos de elementos HTML base (`h1`, `p`, `a`).
5. **Objects.** Patróns estruturais sen aparencia (`.o-layout`, `.o-container`).
6. **Components.** Compoñentes con aparencia (`.c-boton`, `.c-tarxeta`).
7. **Trumps.** Utilidades e overrides (`.u-oculto`, `.u-texto-centrado`).

**Vantaxes:**

- **Especificidade controlada.** Cada capa sabe o seu lugar.
- **Fácil de atopar cousas.** Se buscas o estilo dun botón, está en `Components`.
- **Escala ben.** En proxectos grandes, esta estrutura mantense.

**Inconvenientes:**

- **Moitas capas.** Para proxectos pequenos, pode ser excesivo.
- **Require disciplina.** Hai que respectar as capas.

**Aplicación con `@layer`:**

```css
@layer settings, tools, generic, elements, objects, components, trumps;

@layer settings {
    :root {
        --cor-primaria: #1a5c8a;
    }
}

@layer generic {
    *, *::before, *::after {
        box-sizing: border-box;
    }
}

@layer elements {
    h1 { font-size: 2rem; }
}

@layer components {
    .boton { background: var(--cor-primaria); }
}

@layer trumps {
    .u-oculto { display: none !important; }
}
```

### 2.2 CUBE CSS

**CUBE CSS** (Andy Bell, 2020) é unha evolución de ITCSS. A idea é organizar o CSS en catro capas:

- **Composition.** Layout: estrutura, espazado, fluxo.
- **Utility.** Utilidades: clases pequenas que fan unha cousa.
- **Block.** Compoñentes: unidades con sentido.
- **Exception.** Variacións: modificacións de bloques ou utilidades.

**Vantaxe principal:** menos capas ca ITCSS, máis adaptado ao CSS moderno (grid, flexbox, custom properties).

**Exemplo:**

```css
/* Composition: layout */
.composicion-lateral {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: var(--esp-4);
}

/* Utility: utilidades */
.texto-centrado { text-align: center; }

/* Block: compoñentes */
.tarxeta {
    background: white;
    padding: var(--esp-4);
    border-radius: var(--radio-md);
}

/* Exception: variacións */
.tarxeta.destacada {
    background: var(--cor-destacado);
}
```

### 2.3 BEM (Block Element Modifier)

**BEM** é unha **convención de nomes**, non unha arquitectura completa. Pódese combinar con ITCSS, CUBE CSS, ou calquera outra.

**Estrutura:**

- **Block.** Un compoñente independente: `.tarxeta`.
- **Element.** Unha parte do bloque: `.tarxeta__titulo`.
- **Modifier.** Unha variación: `.tarxeta--destacada`.

**Exemplo:**

```css
.tarxeta { }
.tarxeta__titulo { }
.tarxeta__descricion { }
.tarxeta--destacada { }
.tarxeta--destacada .tarxeta__titulo { }
```

**Vantaxes:**

- **Nomes predecibles.** Vese claramente a que compoñente pertence cada clase.
- **Especificidade baixa.** Todo é unha soa clase.
- **Funciona ben en equipo.**

**Inconvenientes:**

- **Nomes longos.** `.tarxeta__titulo--destacado` é verboso.
- **Non soluciona todo.** Hai que combinalo con outra arquitectura para organizar o proxecto.

### 2.4 SMACSS (Scalable and Modular Architecture for CSS)

**SMACSS** (Jonathan Snook, 2011) organiza o CSS en cinco categorías:

- **Base.** Reset e estilos de elementos.
- **Layout.** Estrutura da páxina.
- **Module.** Compoñentes reutilizables.
- **State.** Estados (`.is-active`, `.is-hidden`).
- **Theme.** Variacións visuais.

**Vantaxe:** moi clara para proxectos medianos.

**Inconveniente:** menos usada hoxe ca ITCSS ou CUBE CSS.

### 2.5 Atomic Design

**Atomic Design** (Brad Frost, 2013) é unha **metodoloxía de deseño**, non só de CSS. Organiza os compoñentes en cinco niveis:

1. **Atoms.** Elementos básicos: botón, input, etiqueta.
2. **Molecules.** Grupos de atoms: campo de formulario (label + input).
3. **Organisms.** Grupos de molecules: cabeceira, formulario completo.
4. **Templates.** Estrutura da páxina sen contido.
5. **Pages.** Páxinas con contido real.

**Uso en CSS:** a miúdo combínase con BEM ou CUBE CSS. Atomic Design di **que compoñentes crear**; ITCSS ou CUBE CSS din **como organizalos**.

---

## 3. Design tokens

### 3.1 Que son

Os **design tokens** son **valores reutilizables** que definen o sistema de deseño: cores, espazados, tamaños de fonte, radios, sombras, transicións. En CSS, represéntanse con **custom properties** (variables CSS).

```css
:root {
    /* Cores */
    --cor-primaria: #1a5c8a;
    --cor-secundaria: #ca8a04;
    --cor-texto: #333;
    --cor-fondo: #ffffff;

    /* Espazados */
    --esp-1: 0.25rem;
    --esp-2: 0.5rem;
    --esp-3: 1rem;
    --esp-4: 1.5rem;
    --esp-5: 2rem;

    /* Tipografía */
    --texto-sm: 0.875rem;
    --texto-base: 1rem;
    --texto-lg: 1.125rem;
    --texto-xl: 1.25rem;

    /* Radios */
    --radio-sm: 4px;
    --radio-md: 8px;
    --radio-lg: 16px;

    /* Sombras */
    --sombra-suave: 0 1px 2px rgba(0, 0, 0, 0.05);
    --sombra-forte: 0 4px 16px rgba(0, 0, 0, 0.1);
}
```

### 3.2 Nomenclatura

Hai dúas convencións comúns:

**1. Nomes descritivos:**

```css
--cor-primaria: #1a5c8a;
--esp-3: 1rem;
--radio-md: 8px;
```

**2. Nomes por escala (tipo Tailwind):**

```css
--cor-500: #1a5c8a;
--esp-4: 1rem;
--radio-2: 8px;
```

**Recomendación:** usar nomes descritivos para as cores (`--cor-primaria`, `--cor-erro`) e nomes por escala para espazados e tamaños (`--esp-1`, `--texto-base`).

### 3.3 Organización

```css
:root {
    /* ==============================
       1. Cores
       ============================== */
    --cor-primaria: #1a5c8a;
    --cor-primaria-escura: #0d3a5c;
    --cor-erro: #cc0000;
    --cor-exito: #2d7a3e;

    /* ==============================
       2. Espazados
       ============================== */
    --esp-1: 0.25rem;
    --esp-2: 0.5rem;
    --esp-3: 1rem;
    --esp-4: 1.5rem;
    --esp-5: 2rem;

    /* ==============================
       3. Tipografía
       ============================== */
    --fonte-base: system-ui, sans-serif;
    --fonte-titulos: Georgia, serif;
    --texto-sm: 0.875rem;
    --texto-base: 1rem;
    --texto-lg: 1.125rem;
    --texto-xl: 1.25rem;

    /* ==============================
       4. Bordos
       ============================== */
    --radio-sm: 4px;
    --radio-md: 8px;
    --radio-lg: 16px;

    /* ==============================
       5. Sombras
       ============================== */
    --sombra-suave: 0 1px 2px rgba(0, 0, 0, 0.05);
    --sombra-forte: 0 4px 16px rgba(0, 0, 0, 0.1);

    /* ==============================
       6. Transicións
       ============================== */
    --transicion-rapida: 0.15s ease;
    --transicion-normal: 0.3s ease;
}
```

---

## 4. Sistemas de espazado

### 4.1 Por que unha escala

Sen unha escala, os espazados do proxecto acaban sendo arbitrarios: `13px` aquí, `17px` alí, `22px` máis alá. Isto fai que o deseño se vexa **incoherente** sen saber por que.

**A solución:** definir unha **escala** de espazados e usala sempre.

### 4.2 Escalas comúns

**Escala lineal (paso fixo):**

```css
:root {
    --esp-1: 0.25rem;   /* 4px */
    --esp-2: 0.5rem;    /* 8px */
    --esp-3: 0.75rem;   /* 12px */
    --esp-4: 1rem;      /* 16px */
    --esp-5: 1.25rem;   /* 20px */
}
```

**Escala xeométrica (paso multiplicativo):**

```css
:root {
    --esp-1: 0.25rem;   /* 4px */
    --esp-2: 0.5rem;    /* 8px */
    --esp-3: 1rem;      /* 16px */
    --esp-4: 2rem;      /* 32px */
    --esp-5: 4rem;      /* 64px */
}
```

**Escala baseada en múltiplos:**

```css
:root {
    --esp-base: 0.25rem;   /* 4px */
    --esp-1: calc(var(--esp-base) * 1);    /* 4px */
    --esp-2: calc(var(--esp-base) * 2);    /* 8px */
    --esp-3: calc(var(--esp-base) * 4);    /* 16px */
    --esp-4: calc(var(--esp-base) * 6);    /* 24px */
    --esp-5: calc(var(--esp-base) * 8);    /* 32px */
}
```

**Recomendación:** usar unha escala que cubra desde 4px ata 96px, con 7-10 pasos.

### 4.3 Uso

```css
.tarxeta {
    padding: var(--esp-4);
    margin-bottom: var(--esp-5);
}

.boton {
    padding: var(--esp-2) var(--esp-4);
}
```

**Vantaxe:** se queres que todo o sitio teña un pouco máis de aire, cambias a escala unha vez.

---

## 5. Escalas tipográficas

### 5.1 Por que unha escala

Igual que co espazado, sen unha escala os tamaños de fonte son arbitrarios. Unha **escala tipográfica** define os tamaños de fonte do proxecto de forma coherente.

### 5.2 Escalas comúns

**Escala de razón 1.125 (major second):**

```css
:root {
    --texto-xs: 0.79rem;    /* 12.6px */
    --texto-sm: 0.889rem;   /* 14.2px */
    --texto-base: 1rem;     /* 16px */
    --texto-lg: 1.125rem;   /* 18px */
    --texto-xl: 1.266rem;   /* 20.3px */
    --texto-2xl: 1.424rem;  /* 22.8px */
    --texto-3xl: 1.602rem;  /* 25.6px */
}
```

**Escala de razón 1.25 (major third):**

```css
:root {
    --texto-xs: 0.64rem;    /* 10.2px */
    --texto-sm: 0.8rem;     /* 12.8px */
    --texto-base: 1rem;     /* 16px */
    --texto-lg: 1.25rem;    /* 20px */
    --texto-xl: 1.563rem;   /* 25px */
    --texto-2xl: 1.953rem;  /* 31.3px */
    --texto-3xl: 2.441rem;  /* 39.1px */
}
```

**Escala fluída con `clamp()`:**

```css
:root {
    --texto-sm: clamp(0.875rem, 0.8rem + 0.25vw, 1rem);
    --texto-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
    --texto-lg: clamp(1.125rem, 1rem + 0.5vw, 1.5rem);
    --texto-xl: clamp(1.5rem, 1.25rem + 1vw, 2rem);
    --texto-2xl: clamp(1.875rem, 1.5rem + 1.5vw, 2.5rem);
}
```

### 5.3 Uso

```css
h1 { font-size: var(--texto-2xl); }
h2 { font-size: var(--texto-xl); }
h3 { font-size: var(--texto-lg); }
p  { font-size: var(--texto-base); }
small { font-size: var(--texto-sm); }
```

### 5.4 Ferramentas

- **Utopia** (https://utopia.fyi/) — xera escalas fluídas a partir de tamaños mínimos e máximos.
- **Typescale** (https://typescale.com/) — xera escalas tipográficas a partir dunha razón.

---

## 6. Exemplo mínimo funcional

Vexamos un proxecto pequeno organizado con ITCSS + BEM + design tokens.

**Estrutura de ficheiros:**

```
estilos/
├── 1-settings/
│   └── tokens.css
├── 2-generic/
│   └── reset.css
├── 3-elements/
│   └── base.css
├── 4-objects/
│   └── layout.css
├── 5-components/
│   ├── boton.css
│   └── tarxeta.css
└── 6-trumps/
    └── utilidades.css
```

**`1-settings/tokens.css`:**

```css
:root {
    /* Cores */
    --cor-primaria: #1a5c8a;
    --cor-texto: #333;
    --cor-fondo: #fafafa;
    --cor-bordo: #e5e5e5;

    /* Espazados */
    --esp-2: 0.5rem;
    --esp-3: 1rem;
    --esp-4: 1.5rem;
    --esp-5: 2rem;

    /* Tipografía */
    --fonte-base: system-ui, sans-serif;
    --texto-sm: 0.875rem;
    --texto-base: 1rem;
    --texto-lg: 1.25rem;
    --texto-xl: 1.5rem;

    /* Bordos */
    --radio-md: 8px;

    /* Transicións */
    --transicion: 0.2s ease;
}
```

**`2-generic/reset.css`:**

```css
*, *::before, *::after {
    box-sizing: border-box;
}

* {
    margin: 0;
    padding: 0;
}
```

**`3-elements/base.css`:**

```css
body {
    font-family: var(--fonte-base);
    font-size: var(--texto-base);
    line-height: 1.6;
    color: var(--cor-texto);
    background: var(--cor-fondo);
}

h1 {
    font-size: var(--texto-xl);
}
```

**`4-objects/layout.css`:**

```css
.o-contido {
    max-width: 800px;
    margin: 0 auto;
    padding: var(--esp-4);
}
```

**`5-components/boton.css`:**

```css
.c-boton {
    padding: var(--esp-2) var(--esp-4);
    background: var(--cor-primaria);
    color: white;
    border: none;
    border-radius: var(--radio-md);
    cursor: pointer;
    transition: background var(--transicion);
}

.c-boton:hover {
    background: #0d3a5c;
}
```

**`5-components/tarxeta.css`:**

```css
.c-tarxeta {
    background: white;
    padding: var(--esp-4);
    border: 1px solid var(--cor-bordo);
    border-radius: var(--radio-md);
}

.c-tarxeta__titulo {
    font-size: var(--texto-lg);
    margin-bottom: var(--esp-3);
}

.c-tarxeta--destacada {
    background: #f5f8fc;
}
```

**`6-trumps/utilidades.css`:**

```css
.u-oculto { display: none; }
.u-texto-centrado { text-align: center; }
.u-mt-3 { margin-top: var(--esp-3); }
```

---

## 7. Casos habituais na práctica

### 7.1 Integración con librarías de terceiros

```css
@layer libraria, tokens, base, components, trumps;

@import url("bootstrap.css") layer(libraria);

@layer tokens {
    :root {
        --cor-primaria: #1a5c8a;
    }
}

@layer components {
    .c-boton {
        background: var(--cor-primaria);
    }
}
```

### 7.2 Temas con variables CSS

```css
:root {
    --cor-fondo: #ffffff;
    --cor-texto: #333;
}

[data-tema="escuro"] {
    --cor-fondo: #1a1a1a;
    --cor-texto: #e0e0e0;
}

body {
    background: var(--cor-fondo);
    color: var(--cor-texto);
}
```

### 7.3 Escala de espazado fluída

```css
:root {
    --esp-base: clamp(0.75rem, 0.5rem + 1vw, 1rem);
    --esp-1: calc(var(--esp-base) * 0.5);
    --esp-2: var(--esp-base);
    --esp-3: calc(var(--esp-base) * 1.5);
    --esp-4: calc(var(--esp-base) * 2);
}
```

---

## 8. Erros frecuentes

### 8.1 Mesturar arquitecturas

ITCSS e CUBE CSS son alternativas, non se combinan. Elixe unha e sé coherente.

### 8.2 Non documentar a arquitectura

Se non escribes **que capas hai e para que serve cada unha**, ninguén (nin ti dentro de 6 meses) saberá onde poñer as cousas.

### 8.3 Design tokens duplicados

```css
/* Mal: dous tokens para o mesmo */
--cor-primaria: #1a5c8a;
--cor-azul-principal: #1a5c8a;
```

### 8.4 Escalas con demasiados pasos

Unha escala con 20 pasos é tan mala como non ter escala. **7-10 pasos abondan.**

### 8.5 Usar `!important` como arquitectura

`!important` non é unha arquitectura. Se o usas moito, revisa a túa estrutura.

### 8.6 Non usar `@layer` cando hai librarías

Se integras Bootstrap, Tailwind ou calquera libraría, **úsaa nunha capa inferior**. Senón, loitarás contra a súa especificidade.

---

## 9. Compatibilidade (2026)

| Característica    | Estado               |
| ----------------- | -------------------- |
| `@layer`          | Baseline desde 2022  |
| Variables CSS     | Universal desde 2017 |
| `@scope`          | Baseline desde 2023  |
| `@property`       | Baseline desde 2024  |
| Aniñamento nativo | Baseline desde 2023  |

A arquitectura CSS é unha **práctica**, non unha característica. Todas as ferramentas que mencionamos están soportadas.

---

## 10. Exercicios

### Exercicio 1: Elixir arquitectura

Tes un proxecto con 10 compoñentes, 2 temas, e 3 persoas traballando. Que arquitectura elixirías e por que?

<details>
<summary><b>Amosar a solución</b></summary>


ITCSS + BEM, ou CUBE CSS. Ambas funcionan. ITCSS se queres moita separación por capas; CUBE CSS se queres algo máis lixeiro. BEM para os nomes dos compoñentes.

</details>

### Exercicio 2: Definir tokens

Escribe os design tokens para un proxecto con 3 cores, 5 espazados, 4 tamaños de fonte, 2 radios.

<details>
<summary><b>Amosar a solución</b></summary>


```css
:root {
    /* Cores */
    --cor-primaria: #1a5c8a;
    --cor-texto: #333;
    --cor-fondo: #fafafa;

    /* Espazados */
    --esp-1: 0.25rem;
    --esp-2: 0.5rem;
    --esp-3: 1rem;
    --esp-4: 1.5rem;
    --esp-5: 2rem;

    /* Tipografía */
    --texto-sm: 0.875rem;
    --texto-base: 1rem;
    --texto-lg: 1.25rem;
    --texto-xl: 1.5rem;

    /* Radios */
    --radio-sm: 4px;
    --radio-md: 8px;
}
```

</details>

### Exercicio 3: Estruturar un proxecto

Organiza estes ficheiros CSS nunha estrutura ITCSS: reset, tokens, botón, tarxeta, utilidades de espazado, layout principal.

<details>
<summary><b>Amosar a solución</b></summary>


```
estilos/
├── 1-settings/
│   └── tokens.css
├── 2-generic/
│   └── reset.css
├── 4-objects/
│   └── layout.css
├── 5-components/
│   ├── boton.css
│   └── tarxeta.css
└── 6-trumps/
    └── utilidades.css
```

</details>

---

## 11. Para profundar

- **Harry Roberts:** [ITCSS](https://www.creativebloq.com/web-design/manage-large-scale-web-projects-new-css-architecture-itcss-41514726) — artigo orixinal.
- **Andy Bell:** [CUBE CSS](https://cube.fyi/) — documentación oficial.
- **BEM:** [getbem.com](https://getbem.com/) — documentación oficial.
- **Jonathan Snook:** [SMACSS](http://smacss.com/) — libro online.
- **Brad Frost:** [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) — libro online.
- **Utopia:** [Fluid Responsive Design](https://utopia.fyi/) — ferramenta de escalas fluídas.

---

## 12. Referencias cruzadas

- **Capítulo 14: Propiedades personalizadas** — as variables CSS son a base dos design tokens.
- **Capítulo 23: `@layer`, `@scope`, `@supports`** — `@layer` é a ferramenta clave para implementar ITCSS.
- **Capítulo 26: Rendemento e boas prácticas** — a arquitectura tamén é rendemento.
- **Capítulo 28: Depurar CSS** — como diagnosticar problemas nun proxecto estruturado.

---

**Data de creación:** 2026-09-18  
**Última revisión:** 2026-09-18  
**Estado:** Borrador para validación
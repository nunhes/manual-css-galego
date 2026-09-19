---
title: "Que é CSS e como se aplica ao HTML"
description: "Introdución a CSS, á separación entre contido e presentación e ás formas de aplicar estilos ao HTML."
bloque: 1
capitulo: 1
nivel: basico
ultima_revision: "2026-09-17"
estado: "borrador_para_validacion"
compatibilidade: "universal"
palabras_chave:
  - CSS
  - HTML
  - folla_de_estilo
  - separacion_contido_presentacion
  - link
  - style
  - inline
  - cascada
---

<!-- # Capítulo 1: Que é CSS e como se aplica ao HTML -->

> CSS é a linguaxe que describe como se presenta o contido HTML. Sen CSS, todas as páxinas web serían texto plano sen cores, sen tipografía diferenciada e sen disposición visual. Este capítulo explica que é CSS, por que existe, como se conecta cun documento HTML e cales son as tres formas de aplicalo.

---

## 1. Introdución: o problema que resolve CSS

Cando escribes un documento HTML, estás a describir **que é** o contido: isto é un título, isto é un parágrafo, isto é unha ligazón, isto é unha imaxe. O HTML di o que é cada cousa, pero non di como ten que verse.

Imaxina que escribes unha páxina cun título, tres parágrafos e dúas ligazóns. O navegador amósao cunha tipografía por defecto, probablemente Times New Roman, sen cores, cunha marxe pequena e todas as ligazóns en azul subliñado. Isto funciona para ler, pero non che permite controlar nada: nin o tamaño do título, nin a separación entre parágrafos, nin a cor das ligazóns.

**CSS** (Cascading Style Sheets, *Follas de Estilo en Cascada*) resolve este problema. É unha linguaxe que che permite dicir como se presenta cada elemento HTML: que cor ten, que tamaño, que tipografía, canto espazo ocupa, onde se coloca na páxina, como se comporta cando a pantalla é pequena, etc.

A idea fundamental é a **separación entre contido e presentación**:

- **HTML**: describe o que é cada cousa (estrutura e significado).
- **CSS**: describe como se ve cada cousa (presentación visual).

Esta separación ten consecuencias prácticas moi importantes. Se mañá queres cambiar a cor de todas as ligazóns do teu sitio web, non tes que editar cada páxina HTML: abonda con cambiar unha regra no arquivo CSS. Se queres que o sitio se vexa diferente en móbil e en escritorio, escribes dúas regras CSS distintas e o navegador escolle a axeitada para cada caso. Se queres imprimir a páxina, podes ter unha folla de estilo específica para impresión.

> 💡 **Para pensar:** A separación entre contido e presentación é un dos principios máis importantes do desenvolvemento web. Cando HTML e CSS están mesturados (por exemplo, con atributos de estilo dentro das etiquetas HTML), o mantemento vólvese moito máis difícil. Volveremos sobre isto na sección de boas prácticas.

---

## 2. Un pouco de historia: de CSS1 a CSS modular

CSS naceu a mediados dos anos noventa. A primeira especificación, **CSS1**, publicouse en decembro de 1996 polo W3C (World Wide Web Consortium). Esta versión introduciu os selectores básicos e a maioría das propiedades que aínda usamos hoxe: cores, tipografía, marxes, bordos, etc.

Dous anos despois, en maio de 1998, apareceu **CSS2**, que engadiu posicionamento, z-index, e novas propiedades de fontes. CSS2 era moito máis grande que CSS1, e o W3C decatouse de que o proceso de estandarización se estaba a volver demasiado lento: mentres unha parte da especificación avanzaba, outras partes quedaban bloqueadas esperando.

A solución chegou con **CSS3**, que xa non é unha especificación única senón un conxunto de **módulos independentes**. Cada módulo (Selectors, Colors, Grid, Flexbox, Animations, etc.) avanza ao seu ritmo, sen depender dos demais. Os primeiros módulos de CSS3 publicáronse en 1999: Color Profiles, Multiple-column Layout e Paged Media.

Isto significa que hoxe en día **CSS non ten un número de versión único**. Cando alguén di «CSS3» ou «CSS moderno», está a referirse ao conxunto de módulos que os navegadores van implementando progresivamente. O W3C publica un documento chamado **CSS Snapshot** que recolle o estado de todos os módulos nun momento dado.

> ⚠️ **Terminoloxía:** No ámbito profesional evítase falar de «CSS3» como se fose unha versión pechada. É máis preciso dicir «CSS moderno» ou referirse a módulos concretos («CSS Grid Level 2», «Selectors Level 4», etc.).

---

## 3. As tres formas de aplicar CSS a un documento HTML

Existen tres maneiras de conectar CSS cun documento HTML. Cada unha ten os seus usos, vantaxes e inconvenientes. É importante que as coñezas todas, aínda que na práctica profesional só unha delas se usa de forma habitual.

### 3.1 Folla de estilo externa (recomendada)

Consiste en crear un arquivo separado con extensión `.css` e ligalo desde o HTML mediante a etiqueta `<link>` dentro do `<head>`. Este é o método recomendado para calquera proxecto real.

**Exemplo mínimo funcional:**

Primeiro, crea un arquivo chamado `index.html`:

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exemplo de CSS externo</title>
    <link rel="stylesheet" href="estilos/style.css">
</head>
<body>
    <h1>Ola, mundo!</h1>
    <p>Este parágrafo ten estilo aplicado desde un arquivo externo.</p>
    <a href="https://exemplo.gal">Unha ligazón de exemplo</a>
</body>
</html>
```

Despois, crea un arquivo chamado `style.css` dentro dunha carpeta `estilos/`:

```css
/* Arquivo: estilos/style.css */

/* Estilo para o título principal */
h1 {
    color: #1a5c8a;
    font-family: Georgia, serif;
    font-size: 2rem;
}

/* Estilo para os parágrafos */
p {
    color: #333333;
    font-family: Arial, sans-serif;
    line-height: 1.6;
}

/* Estilo para as ligazóns */
a {
    color: #c0392b;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
```

**Que está a pasar aquí:**

1. O navegador le o HTML e atopa a etiqueta `<link>` no `<head>`.
2. O atributo `href="estilos/style.css"` indica a ruta ao arquivo CSS.
3. O atributo `rel="stylesheet"` indica que ese arquivo é unha folla de estilo.
4. O navegador descarga o CSS, aplícao aos elementos que coinciden cos selectores (`h1`, `p`, `a`) e amosa o resultado.

Se abres `index.html` nun navegador, verás o título en azul escuro e tipografía serif, os parágrafos en gris escuro con liñas separadas e as ligazóns en vermello que se subliñan ao pasar o rato por riba.

> 💡 **Boas prácticas:** Garda os arquivos CSS nunha carpeta separada (por exemplo `estilos/` ou `css/`) para manter o proxecto organizado. O nome `style.css` ou `principal.css` son habituais, pero podes usar calquera nome descritivo.

### 3.2 Folla de estilo interna

Consiste en escribir o CSS dentro do propio documento HTML, utilizando a etiqueta `<style>` no `<head>`. Este método pode ser útil para prototipos rápidos ou para páxinas que só teñen un arquivo HTML, pero non é recomendable para proxectos con varias páxinas.

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <title>Exemplo de CSS interno</title>
    <style>
        h1 {
            color: #1a5c8a;
            font-family: Georgia, serif;
        }
        p {
            color: #333333;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <h1>Ola, mundo!</h1>
    <p>Este parágrafo ten estilo aplicado desde a etiqueta style.</p>
</body>
</html>
```

**Cando usar este método:**

- Cando estás a facer probas rápidas e non queres crear arquivos separados.
- Cando a páxina é unha soa e non precisa compartir estilos con outras.
- Cando o CSS é moi específico desa páxina e non se vai reutilizar.

**Cando non usalo:**

- Se o sitio ten máis dunha páxina, porque terías que copiar e pegar o mesmo CSS en cada arquivo HTML.
- Se o CSS é longo, porque o arquivo HTML vólvese difícil de ler.

### 3.3 Estilos en liña (inline)

Consiste en escribir o CSS directamente no atributo `style` dun elemento HTML. Este método só afecta a ese elemento concreto e ten a prioridade máis alta na cascada (aínda que hai excepcións que veremos máis adiante).

```html
<p style="color: #333333; line-height: 1.6;">
    Este parágrafo ten estilo aplicado directamente no atributo style.
</p>
```

**Cando usar este método:**

- Case nunca. Só en casos moi puntuais: cando xeras HTML desde JavaScript e necesitas aplicar un estilo dinámico, ou cando integras unha ferramenta externa que require estilos en liña.

**Por que evitalo:**

- Mestura contido con presentación, o que vai en contra do principio de separación.
- Non se pode reutilizar.
- Dificulta o mantemento: se queres cambiar ese estilo, tes que atopar o elemento concreto no HTML.
- A especificidade dos estilos en liña é moi alta, o que fai difícil sobrescribilos desde arquivos CSS externos.

---

## 4. Como le o navegador unha folla de estilo

Cando o navegador carga unha páxina web, segue unha secuencia para aplicar CSS:

1. **Descarga o HTML** e constrúe o DOM (Document Object Model), unha representación en árbore de todos os elementos da páxina.
2. **Descarga o CSS** (se é externo) ou le o CSS interno/inline.
3. **Aplica as regras CSS** aos elementos do DOM que coinciden cos selectores.
4. **Calcula os estilos finais** de cada elemento, tendo en conta a cascada, a especificidade e a herdanza.
5. **Renderiza a páxina** no ecrã segundo os estilos calculados.

Este proceso é importante porque explica por que ás veces un estilo non se aplica como esperabas: pode ser que o selector non coincida con ningún elemento, que outra regra teña maior especificidade, ou que a propiedade non se herde.

---

## 5. Casos habituais na práctica

### 5.1 Organización de arquivos CSS

Nun proxecto pequeno, un só arquivo CSS é suficiente:

```
proxecto/
├── index.html
├── sobre.html
├── contacto.html
└── estilos/
    └── principal.css
```

Nun proxecto mediano ou grande, convén dividir o CSS en varios arquivos:

```
proxecto/
├── index.html
├── estilos/
│   ├── base.css        ← reset, tipografía, variables
│   ├── layout.css      ← estrutura xeral da páxina
│   ├── componentes.css ← botóns, tarxetas, menús
│   └── utilidades.css  ← clases auxiliares
```

Todos os arquivos ligaríanse desde o HTML:

```html
<link rel="stylesheet" href="estilos/base.css">
<link rel="stylesheet" href="estilos/layout.css">
<link rel="stylesheet" href="estilos/componentes.css">
<link rel="stylesheet" href="estilos/utilidades.css">
```

> 💡 **Nota:** Cando se cargan varios arquivos CSS, o navegador aplícaos na orde en que aparecen no HTML. Isto importa para a cascada: as regras do último arquivo poden sobrescribir as do primeiro.

### 5.2 CSS para impresión

Podes ter unha folla de estilo específica para cando se imprime a páxina:

```html
<link rel="stylesheet" href="estilos/principal.css" media="screen">
<link rel="stylesheet" href="estilos/impresion.css" media="print">
```

O atributo `media` indica en que contexto se aplica cada folla: `screen` para pantalla, `print` para impresión.

### 5.3 Uso de `@import` (con precaución)

Dentro dun arquivo CSS podes importar outro arquivo:

```css
@import url("base.css");
@import url("componentes.css");
```

**Inconveniente:** `@import` bloquea a descarga dos arquivos importados ata que se descarga o arquivo principal, o que pode afectar o rendemento. É preferible usar varias etiquetas `<link>` no HTML.

---

## 6. Erros frecuentes

### 6.1 A ruta ao arquivo CSS é incorrecta

Se escribes `<link rel="stylesheet" href="style.css">` pero o arquivo está nunha carpeta `estilos/`, o navegador non o atopará e non aplicará ningún estilo.

**Solución:** comproba a ruta. Se o arquivo está nunha carpeta, a ruta debe ser `estilos/style.css`. Se estás nunha páxina dentro dunha subcarpeta, pode ser necesario usar `../estilos/style.css`.

### 6.2 Esquecerse do `rel="stylesheet"`

O atributo `rel` indica a relación entre o arquivo ligado e o documento actual. Sen `rel="stylesheet"`, o navegador non sabe que ese arquivo é CSS e non o aplica.

### 6.3 Escribir CSS no `<body>` en lugar do `<head>`

A etiqueta `<style>` debe ir dentro do `<head>`. Se a colocas no `<body>`, o navegador pode aplicala igualmente, pero é unha práctica incorrecta que pode causar problemas de renderizado.

### 6.4 Mesturar estilos en liña con arquivos externos

Se tes un elemento con `style="color: red"` e tamén tes unha regra no arquivo CSS que di `p { color: blue }`, o estilo en liña gañará porque ten maior prioridade. Isto pode ser confuso se non o sabes.

**Solución:** evita os estilos en liña. Se necesitas sobrescribir un estilo, faino desde o arquivo CSS cun selector máis específico.

---

## 7. Compatibilidade (2026)

As tres formas de aplicar CSS (externa, interna, en liña) están soportadas por todos os navegadores modernos desde hai décadas. Non hai problemas de compatibilidade que teñan que preocuparte neste aspecto.

A etiqueta `<link>` con `rel="stylesheet"` é universal. A etiqueta `<style>` tamén. Os estilos en liña tamén.

O que si pode variar entre navegadores é a **interpretación dalgunhas propiedades CSS**, pero iso é un tema que iremos vendo capítulo a capítulo.

**Referencia de estado:** os datos de compatibilidade deste manual están baseados no estado de Baseline a setembro de 2026. Para consultar o estado actualizado de calquera característica, podes visitar [web.dev/baseline](https://web.dev/baseline) ou [caniuse.com](https://caniuse.com).

---

## 8. Para profundar

- **MDN Web Docs:** [Getting started with CSS](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Getting_started) — a guía oficial de Mozilla sobre como aplicar CSS a HTML.
- **MDN Web Docs:** [How CSS is structured](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/What_is_CSS) — explica a estrutura básica de CSS e as tres formas de aplicalo.
- **W3C:** [CSS Snapshot](https://www.w3.org/TR/css-2026/) — documento que recolle o estado de todos os módulos CSS.
- **web.dev:** [Learn CSS](https://web.dev/learn/css) — curso completo e actualizado de Google sobre CSS moderno.

---

## 9. Referencias cruzadas

- **Capítulo 2: Sintaxe** — explica en detalle a estrutura dunha regra CSS (selector, propiedade, valor) e como se escriben os comentarios.
- **Capítulo 3: Selectores básicos** — aprofunda nos selectores de elemento, clase e ID que aparecen neste capítulo.
- **Capítulo 4: Cores, tipografía e unidades** — explica as propiedades `color`, `font-family`, `font-size` e as unidades como `rem` que se usaron nos exemplos.

---

**Data de creación:** 2026-09-17  
**Última revisión:** 2026-09-17  
**Estado:** Borrador para validación

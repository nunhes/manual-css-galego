---
title: "Como probar os exemplos"
description: "Métodos para probar, inspeccionar e depurar os exemplos CSS nunha contorna local ou mediante ferramentas en liña."
bloque: 0
capitulo: 3
nivel: introductorio
ultima_revision: "2026-09-17"
estado: "borrador_para_validacion"
compatibilidade: "non_aplicable"
palabras_chave:
  - proba
  - contorno_local
  - ferramentas_en_liña
  - DevTools
  - VSCode
  - CodePen
  - inspeccion
  - depuracion
---

<!-- # Como probar os exemplos -->

> Os exemplos deste manual pódense probar de varias formas: cunha contorna local (editor + navegador), cunha ferramenta en liña (CodePen, JSFiddle, StackBlitz), ou directamente no navegador. Este arquivo explica como facelo paso a paso, e que ferramentas usar para inspeccionar e depurar o CSS.

------

## 1. Por que probar os exemplos

O CSS apréndese **escribindo e probando**. Ler un exemplo sen practicalo é coma ler unha receita sen cociñar: podes entendela, pero non saberás facela ata que a fagas.

Probar os exemplos ten tres vantaxes:

1. **Entendes o que fai cada propiedade.** Cando cambias un valor e ves o resultado, o concepto fíxase moito mellor.
2. **Descobres casos que non están no manual.** Ao modificar un exemplo, podes atopar comportamentos que non se explicaron e que son útiles.
3. **Adquires soltura.** A escritura de CSS é como calquera outra habilidade: canto máis practicas, máis rápido e máis seguro te sentes.

**Recomendación:** non copies e pegues sen máis. **Modifica os exemplos.** Cambia cores, tamaños, posicionamentos. Ve o que pasa. Rompe cousas e arráñxas.

------

## 2. Opción A: contorna local (recomendada)

A forma máis completa de probar os exemplos é cunha **contorna local** no teu ordenador. Necesitas:

1. **Un editor de textos** para escribir HTML e CSS.
2. **Un navegador** para ver o resultado.
3. **Unha carpeta** para gardar os arquivos.

### 2.1 Editor de textos

Calquera editor serve, pero recomendamos **VSCode** por:

- Ser gratuíto e multiplataforma (Windows, macOS, Linux).
- Ter resaltado de sintaxe para HTML, CSS, JavaScript, Markdown.
- Ter extensións útiles para CSS.
- Ter unha terminal integrada.

**Alternativas:** Sublime Text, Atom, Notepad++, Gedit, TextEdit (macOS). Calquera editor que permita gardar arquivos `.html` e `.css` serve.

**Descarga de VSCode:** https://code.visualstudio.com/

### 2.2 Estrutura de arquivos

Para cada exemplo, crea unha carpeta cunha estrutura coma esta:

```text
exemplo-01/
├── index.html
└── estilos/
    └── principal.css
```



**Por que separar o CSS nunha carpeta?** Porque é o estándar na práctica profesional. O HTML vai na raíz, o CSS nunha carpeta `estilos/` (ou `css/`). Isto mantén o proxecto organizado.

**Exemplo de `index.html`:**

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exemplo 01</title>
    <link rel="stylesheet" href="estilos/principal.css">
</head>
<body>
    <h1>Ola, mundo!</h1>
    <p>Este é un exemplo de proba.</p>
</body>
</html>
```



**Exemplo de `estilos/principal.css`:**

```css
body {
    font-family: system-ui, sans-serif;
    line-height: 1.6;
    color: #333;
    padding: 2rem;
}

h1 {
    color: #1a5c8a;
}
```



**Para probalo:**

1. Garda os dous arquivos.
2. Abre `index.html` no navegador (arrastra o arquivo á ventá do navegador, ou fai dobre clic).
3. Ves o resultado.
4. Modifica o CSS, garda, e **recarga a páxina no navegador** (F5 ou Ctrl+R).

**Consello:** se usas VSCode, podes instalar a extensión **Live Server**. Fai que a páxina se recargue automaticamente cada vez que gardas un arquivo. Aforra moito tempo.

------

## 3. Opción B: ferramentas en liña

Se non queres instalar nada, ou se estás nun ordenador que non é teu, podes usar ferramentas en liña. As máis útiles:

### 3.1 CodePen

**URL:** https://codepen.io/

**Que é:** unha ferramenta en liña que permite escribir HTML, CSS e JavaScript nunha mesma páxina e ver o resultado en tempo real.

**Como usala:**

1. Abre a páxina principal.
2. Fai clic en «Create» → «Pen».
3. Escribe o HTML na pestana HTML, o CSS na pestana CSS.
4. Ves o resultado na parte inferior.

**Vantaxes:** moi rápida, ideal para probas pequenas.

**Desvantaxes:** non permite gardar arquivos nunha estrutura de carpetas.

### 3.2 JSFiddle

**URL:** https://jsfiddle.net/

Similar a CodePen, pero máis orientado a JavaScript. Útil para exemplos con interacción.

### 3.3 StackBlitz

**URL:** https://stackblitz.com/

**Que é:** unha contorna de desenvolvemento completa no navegador. Permite crear proxectos con estrutura de arquivos, instalar dependencias, etc.

**Cando usala:** cando o exemplo require varios arquivos ou unha estrutura máis complexa.

#### 3.4 MDN Playground

**URL:** https://developer.mozilla.org/en-US/play

**Que é:** unha ferramenta de Mozilla para probar HTML, CSS e JavaScript.

**Cando usala:** cando queres probar algo relacionado con MDN.

------

## 4. Opción C: probar directamente no navegador

Podes probar CSS **directamente no navegador**, sen escribir arquivos. Isto é útil para experimentar rapidamente.

### 4.1 DevTools

Todos os navegadores modernos teñen **ferramentas de desenvolvemento** (DevTools). Ábrense con:

- **F12** (Windows, Linux).
- **Cmd+Option+I** (macOS).
- **Ctrl+Shift+I** (Windows, Linux).

**Que permiten:**

- **Inspeccionar elementos.** Fai clic dereito nun elemento da páxina → «Inspeccionar». Ves o HTML e o CSS aplicados.
- **Modificar CSS en tempo real.** No panel de estilos, podes cambiar valores e ver o resultado inmediatamente.
- **Ver o modelo de caixa.** Cando inspeccionas un elemento, ves o modelo de caixa (contido, padding, border, margin) visualmente.
- **Ver os estilos herdados, aplicados e sobrescritos.** Os estilos sobrescritos aparecen tachados.
- **Probar estados.** Podes forzar `:hover`, `:focus`, etc.

**Uso recomendado:** cando esteas lendo un capítulo e vexas un exemplo, abre DevTools nunha páxina e proba a modificar os estilos. Isto axuda a entender.

### 4.2 Como inspeccionar un elemento

1. Abre DevTools (F12).
2. Fai clic na icona de selección (a frecha no recuncho superior esquerdo do panel).
3. Fai clic nun elemento da páxina.
4. No panel de HTML, ves o elemento seleccionado.
5. No panel de estilos (á dereita), ves todos os estilos aplicados.

**Consello:** se un estilo non se aplica como esperabas, DevTools amosa os estilos que foron sobrescritos cunha liña por riba. Isto axuda a entender a **cascada** e a **especificidade**.

------

## 5. Como probar os exemplos deste manual

A maioría dos exemplos do manual son **autocontidos**: teñen o HTML e o CSS necesarios para funcionar. Para practicalos:

1. **Crea unha carpeta** para o exemplo (por exemplo, `exemplo-css-01`).
2. **Crea o arquivo HTML** (`index.html`) e o arquivo CSS (`estilos/principal.css`) cos contidos do exemplo.
3. **Abre o HTML no navegador.**
4. **Modifica o CSS** para experimentar.
5. **Usa DevTools** para inspeccionar e depurar.

Se o exemplo ten **Mermaid** (diagramas), podes visualizalo nun visor de Mermaid en liña (por exemplo, https://mermaid.live/).

Se o exemplo ten **Marp** (presentacións), necesitas ter Marp instalado (VSCode ten unha extensión, e hai tamén unha ferramenta de liña de comandos). Consulta a documentación oficial: https://marp.app/.

------

## 6. Ferramentas útiles

Ademais do editor e do navegador, hai ferramentas que fan o traballo máis doado:

### 6.1 Para escribir CSS

- **VSCode** — editor recomendado.
- **Live Server** (extensión de VSCode) — recarga automática.
- **Prettier** (extensión de VSCode) — formatea o código automaticamente.
- **Stylelint** (extensión de VSCode) — detecta erros e malas prácticas de CSS.

### 6.2 Para inspeccionar CSS

- **DevTools** (integrado no navegador) — a ferramenta máis importante.
- **VisBug** (extensión de Chrome) — permite modificar elementos visualmente.
- **CSS Peeper** (extensión de Chrome) — inspecciona estilos dun xeito visual.

### 6.3 Para xerar CSS

- **Clippy** (https://bennettfeely.com/clippy/) — xerador de `clip-path`.
- **Cubic-Bezier** (https://cubic-bezier.com/) — curvas de animación.
- **OKLCH Color Picker** (https://oklch.com/) — cores en OKLCH.
- **Fancy Border Radius** (https://9elements.github.io/fancy-border-radius/) — `border-radius` complexos.

### 6.4 Para validar CSS

- **W3C CSS Validator** (https://jigsaw.w3.org/css-validator/) — comproba se o CSS é válido.
- **Lighthouse** (integrado en DevTools) — audita rendemento, accesibilidade, boas prácticas.

### 6.5 Para accesibilidade

- **axe DevTools** (extensión de navegador) — detecta problemas de accesibilidade.
- **WebAIM Contrast Checker** (https://webaim.org/resources/contrastchecker/) — comproba o contraste entre cores.

------

## 7. Erros frecuentes ao probar exemplos

### 7.1 Non gardar o arquivo antes de recargar

Se modificas o CSS e recargas a páxina, pero non gardaches o arquivo, os cambios non se ven. **Sempre garda antes de recargar** (ou usa Live Server, que o fai automaticamente).

### 7.2 Ruta incorrecta ao arquivo CSS

```html
<!-- Mal: o arquivo está en estilos/, non na raíz -->
<link rel="stylesheet" href="principal.css">

<!-- Ben -->
<link rel="stylesheet" href="estilos/principal.css">
```



Se o CSS non se aplica, comproba a ruta.

### 7.3 Esquecer a etiqueta `<link>`

```html
<!-- Mal: sen link, o CSS non se carga -->
<head>
    <title>Exemplo</title>
</head>

<!-- Ben -->
<head>
    <title>Exemplo</title>
    <link rel="stylesheet" href="estilos/principal.css">
</head>
```



### 7.4 Escribir CSS no HTML

```html
<!-- Mal: CSS no HTML, mestura contido e presentación -->
<h1 style="color: red;">Título</h1>

<!-- Ben: CSS nun arquivo separado -->
<h1 class="titulo">Título</h1>
```



Xa o vimos no capítulo 1. O CSS vai nun arquivo separado.

### 7.5 Non usar `lang="gl"` no HTML

```html
<!-- Mal: sen idioma -->
<html>

<!-- Ben -->
<html lang="gl">
```


O atributo `lang` indica o idioma do documento. É importante para a accesibilidade (os lectores de pantalla pronúnciano correctamente) e para o SEO.

------

## 8. Referencias cruzadas

- **`00-que-e-este-manual.md`** — que é o manual, a quen vai dirixido.
- **`01-como-usalo.md`** — como ler o manual (consulta rápida vs. lectura secuencial).
- **`02-convencions.md`** — convencións tipográficas e de código do manual.
- **Capítulo 1 (Que é CSS)** — explica como se aplica CSS a un documento HTML.
- **Capítulo 2 (Sintaxe)** — explica a sintaxe básica de CSS.

------

## 9. Para profundar

- **MDN Web Docs:** [Getting started with CSS](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Getting_started) — guía oficial.
- **[web.dev](https://web.dev/):** [Learn CSS](https://web.dev/learn/css) — curso interactivo.
- **Chrome DevTools:** [CSS documentation](https://developer.chrome.com/docs/devtools/css) — guía de DevTools.
- **VSCode:** [Documentation](https://code.visualstudio.com/docs) — guía oficial de VSCode.
- **Live Server** (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) — extensión de VSCode.

------

**Data de creación:** 2026-09-17
**Última revisión:** 2026-09-17
**Estado:** Borrador para validación
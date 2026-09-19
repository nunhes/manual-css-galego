---
title: "Accesibilidade e CSS"
description: "Boas prácticas de CSS para contraste, foco, movemento, formularios e interfaces accesibles para todas as persoas."
bloque: 6
capitulo: 26
nivel: intermedio
ultima_revision: "2026-09-17"
estado: "borrador_para_validacion"
compatibilidade: "universal"
palabras_chave:
  - accesibilidad
  - WCAG
  - contraste
  - foco
  - prefers_reduced_motion
  - prefers_color_scheme
  - screen_reader
  - semantica
  - ARIA
---

<!-- # Capítulo 26: Accesibilidade e CSS -->

> A **accesibilidade** consiste en asegurar que calquera persoa, independentemente das súas capacidades, poida usar a web. CSS ten un papel central nisto: as cores, os tamaños, o foco, as animacións, a orde visual e moitos outros aspectos afectan directamente á experiencia de persoas con baixa visión, daltónicas, con dificultades motrices, con sensibilidade ao movemento, ou que usan tecnoloxías de asistencia. Este capítulo recolle as boas prácticas de accesibilidade que **xa apareceron espalladas** ao longo do manual, e engade as que faltan. Non é un tema opcional: é unha parte máis do bo CSS.

---

## 1. Introdución: a accesibilidade non é un extra

En moitos manuais de CSS, a accesibilidade aparece coma un capítulo final, coma se fose un tema opcional que se engade ao final. Isto é un erro. **A accesibilidade debe estar presente desde o primeiro día**, non ser unha capa que se engade despois. E de feito, xa foi aparecendo ao longo de todo este manual:

- **Cores:** contraste suficiente (Cap. 4, 17).
- **Foco:** `:focus-visible`, non quitar o contorno (Cap. 16).
- **Movemento:** `prefers-reduced-motion` (Cap. 18, 20, 21, 22).
- **Tema:** `prefers-color-scheme` (Cap. 11).
- **Contraste:** `prefers-contrast` (Cap. 11).
- **Formularios:** `:user-invalid` en lugar de `:invalid` (Cap. 16).
- **Ocultar contido:** `display: none` vs `visibility: hidden` (Cap. 6).
- **Rendemento:** páxinas rápidas son máis accesibles (Cap. 24).

Este capítulo **recolle todas esas prácticas nun só lugar**, engade as que faltan, e explica **por que** cada unha importa. Non é para memorizar dunha vez, senón para consultar cando se escriba CSS.

> 💡 **Para pensar:** a accesibilidade non vai só de «cumprir normas». Vai de **respeto**. Cando escribes CSS, estás a deseñar a experiencia de persoas que non coñeces: persoas con baixa visión, persoas maiores, persoas con discapacidades motoras, persoas con dislexia, persoas con sensibilidade ao movemento. Todas elas teñen dereito a usar a túa web.

---

## 2. Cores e contraste

### 2.1 O contraste é a base da lexibilidade

O **contraste** é a diferenza entre a cor do texto e a cor do fondo. Se é insuficiente, o texto non se le.

As **WCAG** (Web Content Accessibility Guidelines) establecen niveis mínimos:

- **Nivel AA (mínimo recomendado):** contraste **4.5:1** para texto normal, **3:1** para texto grande (máis de 18pt ou 14pt en negra).
- **Nivel AAA (óptimo):** contraste **7:1** para texto normal, **4.5:1** para texto grande.

**Importante:** o contraste **non é unha recomendación opcional**. É un requisito legal en moitos países (a directiva europea de accesibilidade web, entre outras).

### 2.2 Como comprobar o contraste

Hai ferramentas en liña que calculan o contraste entre dúas cores:

- **WebAIM Contrast Checker** (https://webaim.org/resources/contrastchecker/).
- **Contrast Ratio** (https://contrast-ratio.com/).
- **DevTools do navegador:** Chrome e Firefox amosan o contraste cando inspeccionas un elemento de texto.

**Exemplo:**

```css
/* Mal: contraste 2.85:1 — non pasa AA */
p {
    color: #999999;
    background: #ffffff;
}

/* Ben: contraste 7.45:1 — pasa AAA */
p {
    color: #555555;
    background: #ffffff;
}
```

### 2.3 Non confiar só na cor

**Nunca transmitir información só a través da cor.** Unha persoa daltónica pode non distinguir vermello de verde. Hai que engadir outras pistas: iconas, texto, formas, posicións.

**Exemplo: formulario con erros**

```html
<!-- Mal: só a cor do bordo indica erro -->
<input type="email" class="erro">

<!-- Ben: cor + mensaxe + icona -->
<div class="campo erro">
    <input type="email" aria-invalid="true">
    <span class="icona-erro" aria-hidden="true">⚠</span>
    <span class="mensaxe-erro">O correo non é válido</span>
</div>
```

**CSS pode axudar a amosar a mensaxe só cando hai erro:**

```css
.campo .mensaxe-erro {
    display: none;
}

.campo:has(input[aria-invalid="true"]) .mensaxe-erro {
    display: block;
    color: #cc0000;
}
```

**Nota:** usamos `aria-invalid="true"` (atributo HTML) en lugar de `:invalid` (CSS). Isto é porque `:invalid` depende do navegador e pode non coincidir co que a persoa quere comunicar.

### 2.4 Texto sobre imaxes

Pór texto sobre imaxes é bonito, pero perigoso para a accesibilidade. A imaxe pode ter zonas claras e escuras, o que fai que o contraste varíe.

**Solucións:**

1. **Engadir unha capa semitransparente** entre a imaxe e o texto:

```css
.hero {
    position: relative;
}

.hero::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
}

.hero .texto {
    position: relative;
    color: white;
}
```

2. **Usar `text-shadow`** para mellorar o contraste:

```css
.texto-sobre-imaxe {
    color: white;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
}
```

3. **Usar un degradado** detrás do texto:

```css
.hero {
    background:
        linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 100%),
        url("imaxe.jpg") center/cover;
    color: white;
}
```

### 2.5 Modo escuro e `prefers-color-scheme`

Moitas persoas configuran o seu sistema para modo escuro (por comodidade, por sensibilidade á luz, ou por saúde ocular). CSS pode respectalo:

```css
:root {
    --cor-fondo: #ffffff;
    --cor-texto: #333333;
}

@media (prefers-color-scheme: dark) {
    :root {
        --cor-fondo: #1a1a1a;
        --cor-texto: #e0e0e0;
    }
}

body {
    background: var(--cor-fondo);
    color: var(--cor-texto);
}
```

**Importante:** se ofreces modo escuro, **asegura o contraste** en ambos os modos. Non abonda con inverter as cores.

### 2.6 Alto contraste con `prefers-contrast`

Algunhas persoas configuran o seu sistema para maior contraste (persoas con baixa visión). CSS pode respectalo:

```css
@media (prefers-contrast: more) {
    body {
        color: black;
        background: white;
    }

    .boton {
        border: 2px solid black;
    }

    a {
        text-decoration: underline;
    }
}
```

Valores: `more`, `less`, `custom`, `no-preference`.

**Importante:** respectar esta preferencia significa **aumentar o contraste**, non simplemente cambiar cores.

---

## 3. Tipografía e lexibilidade

### 3.1 Tamaños de texto axeitados

- **Tamaño mínimo do corpo de texto:** 16px (ou `1rem` se o tamaño base é 16px). Menos ca isto, a lectura cansa.
- **Texto secundario:** nunca menos de 14px (`0.875rem`).
- **Textos moi pequenos:** evitar por debaixo de 12px (`0.75rem`) para calquera cousa que se deba ler.

### 3.2 Usar unidades relativas

Xa o vimos no Cap. 4 e 13. **Usa `rem` para tamaños de texto**, non `px`.

```css
/* Mal: non se adapta ás preferencias do navegador */
body {
    font-size: 16px;
}

/* Ben: se a persoa amplía o tamaño no navegador, adáptase */
html {
    font-size: 100%;   /* 16px por defecto, respecta as preferencias */
}

body {
    font-size: 1rem;
}
```

**Importante:** se alguén configura un tamaño de fonte máis grande no navegador (por accesibilidade), usar `px` ignora esta preferencia. Usar `rem` respecta.

### 3.3 Altura de liña

Un `line-height` moi pequeno fai o texto difícil de ler.

```css
/* Ben para corpo de texto */
p {
    line-height: 1.6;
}

/* Ben para títulos */
h1, h2 {
    line-height: 1.2;
}

/* Evitar */
body {
    line-height: 1;   /* demasiado axustado */
}
```

### 3.4 Ancho de liña

Liñas moi longas fan que o ollo perda o fío. Liñas moi curtas rompen o ritmo.

```css
.articulo {
    max-width: 65ch;   /* uns 65 caracteres por liña */
    margin: 0 auto;
}
```

Isto tamén beneficia a persoas con dislexia.

### 3.5 Espazado entre letras e palabras

Para textos pequenos en maiúsculas ou con moita densidade visual, aumentar o espazado mellora a lexibilidade:

```css
.etiqueta {
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    word-spacing: 0.05em;
}
```

**Coidado co exceso:** demasiado espazado tamén dificulta a lectura.

### 3.6 Non xustificar o texto

A xustificación crea «ríos» de espazo entre palabras, o que dificulta a lectura, especialmente para persoas con dislexia.

```css
/* Evitar */
p {
    text-align: justify;
}

/* Preferir */
p {
    text-align: left;
}
```

### 3.7 Non usar só maiúsculas en textos longos

Os textos longos en maiúsculas son máis difíciles de ler (todas as letras teñen a mesma altura, o ollo non distingue as palabras).

```css
/* Evitar para textos longos */
.titulo-longo {
    text-transform: uppercase;
}

/* Ben para etiquetas curtas */
.etiqueta {
    text-transform: uppercase;
    font-size: 0.75rem;
}
```

---

## 4. Foco e navegación con teclado

### 4.1 O foco é fundamental

Moitas persoas navegan **só co teclado** (por discapacidade motora, por preferencia, ou por eficiencia). Cando un elemento recibe o foco (ao premer Tab), **debe verse claramente onde está**.

### 4.2 Non quitar o contorno de foco

**Este é un dos erros máis graves de accesibilidade.**

```css
/* MOI MAL: elimina o foco sen alternativa */
*:focus {
    outline: none;
}
```

**Solución:** substituír por un contorno visible e coherente co deseño.

```css
/* Ben */
:focus-visible {
    outline: 2px solid #1a5c8a;
    outline-offset: 2px;
    border-radius: 2px;
}
```

### 4.3 Usar `:focus-visible` en lugar de `:focus`

Xa o vimos no Cap. 16. `:focus-visible` aplícase só cando o foco debe ser visible (navegación con teclado), non cando se fai clic cun rato.

```css
/* Ben: só se ve o contorno cando se navega con teclado */
:focus-visible {
    outline: 2px solid #1a5c8a;
    outline-offset: 2px;
}
```

### 4.4 Contraste do foco

O contorno de foco debe ter **contraste suficiente** co fondo para ser visible.

```css
/* Mal: foco case invisible */
.boton:focus-visible {
    outline: 1px solid #eeeeee;
}

/* Ben */
.boton:focus-visible {
    outline: 3px solid #1a5c8a;
    outline-offset: 2px;
}
```

### 4.5 Orde lóxica no DOM

A orde do DOM (o HTML) determina a orde de navegación con teclado. Se cambias a orde visual con CSS (por exemplo, con `order` en Flexbox), **a orde de tabulación non cambia**.

```css
/* Isto cambia a orde visual, pero non a de tabulación */
.menu {
    display: flex;
    flex-direction: column;
}

.menu li:nth-child(3) {
    order: -1;   /* aparece primeiro visualmente, pero tabúlase en orde HTML */
}
```

**Recomendación:** se necesitas cambiar a orde visual, faino no HTML, non con CSS. Se é imprescindible con CSS, asegúrate de que a orde de tabulación segue sendo lóxica.

### 4.6 Ocultar contido correctamente

**Diferenza importante:**

- **`display: none`:** o elemento desaparece **e non se le** polos lectores de pantalla.
- **`visibility: hidden`:** o elemento é invisible **pero si se le** polos lectores de pantalla (aínda que non se vexa).

```css
/* Se queres que un elemento non exista para ninguén */
.desaparece {
    display: none;
}

/* Se queres ocultalo visualmente pero mantelo accesible */
.invisible-visual {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
```

**O segundo patrón** é o que se usa para textos que só os lectores de pantalla deben ler (por exemplo, «abre nunha nova xanela»).

---

## 5. Movemento e animacións

### 5.1 `prefers-reduced-motion`

Xa o vimos en varios capítulos. **Sempre respectar esta preferencia** cando hai animacións.

```css
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

**Importante:** non abonda con desactivar animacións; hai que **asegurar que o contido segue visible e usable**.

```css
@media (prefers-reduced-motion: reduce) {
    .elemento-que-aparece {
        animation: none;
        opacity: 1;
        transform: none;
    }
}
```

### 5.2 Evitar animacións que causan mareos

Movementos rápidos, cambios de escala bruscos, efecto parallax intenso e rotacións poden causar **mareos, náuseas e desorientación** en persoas con trastornos vestibulares.

**Recomendación:** usar movemento con moderación, e sempre respectar `prefers-reduced-motion`.

### 5.3 Non facer animacións que impidan ler

Unha animación que move o texto constantemente impide lelo. As animacións de texto (por exemplo, títulos con efecto máquina de escribir) deben ter unha alternativa accesible.

### 5.4 Coidado coas animacións automáticas

As animacións que se reproducen automaticamente (por exemplo, un carrusel) son problemáticas para persoas con dificultades de atención. Se son imprescindibles:

- **Dar control para pausalas.**
- **Non durar máis de 5 segundos por diapositiva.**
- **Non ser a única forma de acceder ao contido.**

---

## 6. Formularios accesibles

### 6.1 Etiquetas sempre

**Todo campo de formulario debe ter unha etiqueta (`<label>`).** Non abonda co `placeholder`.

```html
<!-- Mal: sen label -->
<input type="email" placeholder="O teu correo">

<!-- Ben -->
<label for="email">Correo electrónico</label>
<input type="email" id="email" placeholder="nome@exemplo.gal">
```

**Por que:** os lectores de pantalla len a etiqueta cando o campo recibe o foco. O `placeholder` desaparece ao escribir, o que dificulta saber que campo é.

### 6.2 Indicar campos obrigatorios

Non só cun asterisco visual, senón tamén con atributos HTML:

```html
<label for="nome">
    Nome <span aria-hidden="true">*</span>
    <span class="visualmente-oculto">(obrigatorio)</span>
</label>
<input type="text" id="nome" required>
```

**CSS:**

```css
.visualmente-oculto {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
}
```

### 6.3 Amosar erros correctamente

Xa o vimos na sección 2.3. Os erros deben:

- **Ser visibles** (contraste suficiente).
- **Estar cerca do campo** que os causa.
- **Ser lidos polos lectores de pantalla** (`aria-describedby`, `aria-invalid`).
- **Non depender só da cor.**

### 6.4 Non usar só `:invalid` para estilos

Xa o vimos no Cap. 16. Usar `:user-invalid` cando se queira, ou basearse en atributos HTML (`aria-invalid`).

### 6.5 Espazos grandes entre elementos interactivos

Os botóns, ligazóns e checkboxes deben ter tamaño suficiente para ser premidos sen precisión. **Mínimo 44×44 píxeles** (recomendación das WCAG).

```css
.boton {
    min-width: 44px;
    min-height: 44px;
    padding: 0.75rem 1.25rem;
}
```

---

## 7. Estrutura e semántica

### 7.1 Usar HTML semántico

**CSS non substitúe o HTML semántico.** Usa `<button>` para botóns, `<a>` para ligazóns, `<nav>` para navegación, etc.

```html
<!-- Mal: div con aparencia de botón -->
<div class="boton" onclick="facerAlgo()">Premer</div>

<!-- Ben: button real -->
<button class="boton" onclick="facerAlgo()">Premer</button>
```

**Por que importa:** os botóns reais son accesibles por teclado por defecto, os lectores de pantalla os anuncian correctamente, etc.

### 7.2 Xerarquía de títulos coherente

Os títulos (`<h1>`, `<h2>`, `<h3>`...) forman a **estrutura** da páxina. Deben seguir unha xerarquía lóxica, non usarse só para dar tamaño.

```html
<!-- Mal: h3 porque quero texto pequeno -->
<h3>Título principal</h3>

<!-- Ben: h1 para o título principal, estilo CSS para o tamaño -->
<h1 class="titulo-pequeno">Título principal</h1>
```

**CSS pode cambiar o tamaño sen cambiar o nivel:**

```css
.titulo-pequeno {
    font-size: 1.25rem;
}
```

### 7.3 Rexións da páxina

Usar elementos semánticos que definen rexións:

```html
<header>...</header>
<nav>...</nav>
<main>...</main>
<aside>...</aside>
<footer>...</footer>
```

Isto permite que os lectores de pantalla salten directamente ás rexións que interesan.

### 7.4 Non usar CSS para substituír HTML

Xa o vimos: non usar `<div>` con aparencia de botón, non usar `<span>` con aparencia de ligazón, etc. **CSS é para presentación; HTML é para estrutura e significado.**

---

## 8. Tamaño e layout

### 8.1 Permitir o zoom

**Non bloquear o zoom** con `user-scalable=no` no `meta viewport`.

```html
<!-- MAL: impide ampliar -->
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">

<!-- BEN: permite ampliar -->
<meta name="viewport" content="width=device-width, initial-scale=1">
```

**Por que:** moitas persoas con baixa visión amplían a páxina para ler. Bloquear o zoom impide isto.

### 8.2 Áreas de toque suficientes

Xa o vimos: mínimo 44×44 píxeles para elementos interactivos.

```css
.ligazón-menu {
    display: inline-block;
    padding: 0.75rem 1rem;
    min-height: 44px;
}
```

### 8.3 Espazado entre elementos interactivos

Elementos interactivos moi xuntos son difíciles de premer en móbil.

```css
.lista-ligazóns {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
```

### 8.4 Non dependencia de `hover`

Moitas persoas non usan rato (usan dedo, ou teclado). A información **non debe aparecer só con `:hover`**.

```css
/* Mal: só aparece ao pasar o rato */
.tooltip {
    display: none;
}

.elemento:hover .tooltip {
    display: block;
}

/* Ben: tamén aparece con foco */
.elemento:hover .tooltip,
.elemento:focus-within .tooltip {
    display: block;
}
```

**Uso de `:focus-within`** para que funcione tamén con teclado.

### 8.5 Texto que non desaparece

O texto non debe estar oculto detrás de interaccións que non son accesibles. Por exemplo, unha etiqueta que só se ve ao pasar o rato non serve para persoas que usan teclado.

---

## 9. Modo de alto contraste do sistema

Algunhas persoas usan **modo de alto contraste** a nivel de sistema operativo (Windows, macOS). Neste modo, o sistema **substitúe as cores** por outras de alto contraste.

**Coidado:** se usas imaxes de fondo para transmitir información, ou se dependes de cores específicas, o modo de alto contraste pode romper o deseño.

**Solución:** usar cores de sistema (`Canvas`, `CanvasText`, `ButtonText`...) cando sexa relevante:

```css
.boton {
    background: ButtonFace;
    color: ButtonText;
    border: 1px solid ButtonBorder;
}
```

Estas cores adáptanse automaticamente ás preferencias do sistema.

**Nota:** as cores de sistema úsanse pouco en proxectos modernos, pero é útil coñecelas.

---

## 10. Exemplo mínimo funcional

Vexamos un formulario que aplica todas as boas prácticas de accesibilidade deste capítulo.

**Arquivo HTML:**

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario accesible</title>
    <link rel="stylesheet" href="estilos/accesible.css">
</head>
<body>
    <main class="contido">
        <h1>Contacto</h1>

        <form class="formulario" novalidate>
            <div class="campo">
                <label for="nome">
                    Nome <span aria-hidden="true">*</span>
                    <span class="visualmente-oculto">(obrigatorio)</span>
                </label>
                <input
                    type="text"
                    id="nome"
                    name="nome"
                    required
                    autocomplete="name"
                    aria-describedby="erro-nome"
                >
                <p id="erro-nome" class="erro" role="alert"></p>
            </div>

            <div class="campo">
                <label for="email">
                    Correo electrónico <span aria-hidden="true">*</span>
                    <span class="visualmente-oculto">(obrigatorio)</span>
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    autocomplete="email"
                    aria-describedby="erro-email"
                >
                <p id="erro-email" class="erro" role="alert"></p>
            </div>

            <div class="campo">
                <label for="mensaxe">Mensaxe</label>
                <textarea
                    id="mensaxe"
                    name="mensaxe"
                    rows="4"
                ></textarea>
            </div>

            <button type="submit" class="boton">Enviar</button>
        </form>
    </main>
</body>
</html>
```

**Arquivo CSS:**

```css
/* ==============================
   Reset e base
   ============================== */
*, *::before, *::after {
    box-sizing: border-box;
}

* {
    margin: 0;
    padding: 0;
}

html {
    font-size: 100%;   /* respecta as preferencias do navegador */
}

body {
    font-family: system-ui, sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    color: #333;
    background: #fafafa;
    padding: 2rem 1rem;
}

.contido {
    max-width: 500px;
    margin: 0 auto;

    h1 {
        font-size: clamp(1.5rem, 1rem + 2vw, 2rem);
        color: #1a5c8a;
        margin-bottom: 2rem;
    }
}

/* ==============================
   Clase para ocultar visualmente
   pero manter accesible
   ============================== */
.visualmente-oculto {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

/* ==============================
   Formulario
   ============================== */
.formulario {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid #e5e5e5;
}

.campo {
    margin-bottom: 1.5rem;

    label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: #333;
    }

    input,
    textarea {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 1px solid #c0c0c0;   /* contraste suficiente */
        border-radius: 6px;
        font-size: 1rem;
        font-family: inherit;
        color: #333;
        background: white;

        /* Foco visible e con contraste */
        &:focus-visible {
            outline: 3px solid #1a5c8a;
            outline-offset: 2px;
            border-color: #1a5c8a;
        }

        /* Estado inválido: cor + texto */
        &[aria-invalid="true"] {
            border-color: #cc0000;
            background: #fff5f5;
        }
    }

    textarea {
        resize: vertical;
        min-height: 100px;
    }
}

/* Mensaxe de erro */
.erro {
    display: none;
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: #cc0000;
    font-weight: 500;
}

.erro:not(:empty) {
    display: block;
}

/* ==============================
   Botón
   ============================== */
.boton {
    width: 100%;
    padding: 0.875rem 1.5rem;
    min-height: 48px;   /* tamaño de toque suficiente */
    background: #1a5c8a;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s;

    &:hover {
        background: #0d3a5c;
    }

    &:focus-visible {
        outline: 3px solid #1a5c8a;
        outline-offset: 2px;
    }

    &:active {
        transform: scale(0.98);
    }
}

/* ==============================
   Modo escuro
   ============================== */
@media (prefers-color-scheme: dark) {
    body {
        background: #1a1a1a;
        color: #e0e0e0;
    }

    .formulario {
        background: #2a2a2a;
        border-color: #444;
    }

    .campo {
        label {
            color: #e0e0e0;
        }

        input,
        textarea {
            background: #1a1a1a;
            color: #e0e0e0;
            border-color: #555;

            &[aria-invalid="true"] {
                background: #3a1a1a;
                border-color: #ff6666;
            }
        }
    }

    .erro {
        color: #ff6666;
    }
}

/* ==============================
   Alto contraste
   ============================== */
@media (prefers-contrast: more) {
    body {
        color: black;
        background: white;
    }

    .campo input,
    .campo textarea {
        border: 2px solid black;
    }

    .boton {
        border: 2px solid black;
    }
}

/* ==============================
   Reducir animacións
   ============================== */
@media (prefers-reduced-motion: reduce) {
    * {
        transition-duration: 0.01ms !important;
        animation-duration: 0.01ms !important;
    }
}
```

**Que está a pasar aquí:**

1. **`html { font-size: 100%; }`** respecta as preferencias do navegador.
2. **`<label>` para cada campo**, con `for` que apunta ao `id` do campo.
3. **Texto «(obrigatorio)»** para lectores de pantalla, oculto visualmente coa clase `.visualmente-oculto`.
4. **`:focus-visible`** con contorno de 3px, ben visible.
5. **`aria-invalid="true"`** para marcar o estado inválido (non depende só da cor).
6. **`role="alert"`** nas mensaxes de erro para que os lectores de pantalla as anuncien.
7. **Botón con `min-height: 48px`** para área de toque suficiente.
8. **Modo escuro** con contraste suficiente.
9. **Alto contraste** con bordos máis grosos.
10. **Redución de animacións** cando a persoa o prefire.

---

## 11. Casos habituais na práctica

### 11.1 Texto só para lectores de pantalla

```css
.visualmente-oculto {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
```

### 11.2 Foco visible coherente

```css
:focus-visible {
    outline: 3px solid var(--cor-primaria);
    outline-offset: 2px;
    border-radius: 2px;
}
```

### 11.3 Contraste suficiente

```css
:root {
    --cor-texto: #333333;         /* sobre fondo branco: contraste 12.6:1 */
    --cor-texto-suave: #595959;   /* sobre fondo branco: contraste 7:1 */
}
```

### 11.4 Áreas de toque

```css
.ligazón {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 0.5rem 1rem;
}
```

### 11.5 Animacións accesibles

```css
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

### 11.6 Modo escuro coherente

```css
:root {
    --cor-fondo: #ffffff;
    --cor-texto: #333333;
}

@media (prefers-color-scheme: dark) {
    :root {
        --cor-fondo: #1a1a1a;
        --cor-texto: #e0e0e0;
    }
}
```

### 11.7 Formularios con erros accesibles

```css
.campo input[aria-invalid="true"] {
    border-color: #cc0000;
    background: #fff5f5;
}

.campo .erro {
    display: none;
    color: #cc0000;
}

.campo:has(input[aria-invalid="true"]) .erro {
    display: block;
}
```

---

## 12. Erros frecuentes

### 12.1 Quitar o contorno de foco

Xa o vimos mil veces. **Nunca quitar o foco sen alternativa visible.**

### 12.2 Contraste insuficiente

Gris claro sobre branco, amarelo sobre branco, cores moi saturadas... sempre comprobar o contraste.

### 12.3 Información só por cor

Indicar erros, estados ou categorías **só** con cor. Hai que engadir texto, iconas, formas.

### 12.4 Texto moi pequeno

Por debaixo de 14px, a lectura cansa. Por debaixo de 12px, é ilexible para moitas persoas.

### 12.5 Bloquear o zoom

`user-scalable=no` no `meta viewport` é un erro grave.

### 12.6 Non respectar `prefers-reduced-motion`

Especialmente problemático con animacións grandes, parallax ou rotacións.

### 12.7 Non usar etiquetas en formularios

O `placeholder` non substitúe a etiqueta.

### 12.8 Botóns moi pequenos

En móbil, áreas de toque menores de 44×44 píxeles son difíciles de premer.

### 12.9 Depender só de `:hover`

Información que só aparece ao pasar o rato non é accesible para quen usa teclado ou táctil.

### 12.10 Orde visual distinta da orde do DOM

`order` en Flexbox pode cambiar a orde visual sen cambiar a de tabulación, o que confunde a quen navega con teclado.

### 12.11 Usar só `px` para tamaños de texto

Ignora as preferencias do navegador. Usar `rem`.

### 12.12 Texto xustificado

Crea «ríos» de espazo que dificultan a lectura, especialmente para persoas con dislexia.

### 12.13 Non probar con lectores de pantalla

A mellor forma de detectar problemas de accesibilidade é **probar con lectores de pantalla** (NVDA, JAWS, VoiceOver) e con navegación só de teclado.

---

## 13. Ferramentas útiles

- **WebAIM Contrast Checker** (https://webaim.org/resources/contrastchecker/) — comprobar contraste.
- **Lighthouse** (en DevTools) — audita accesibilidade automaticamente.
- **axe DevTools** (extensión de navegador) — detecta problemas de accesibilidade.
- **WAVE** (https://wave.webaim.org/) — avaliación de accesibilidade en liña.
- **NVDA** (https://www.nvaccess.org/) — lector de pantalla gratuíto para Windows.
- **VoiceOver** — lector de pantalla integrado en macOS.
- **Colour Contrast Analyser** (https://www.tpgi.com/color-contrast-checker/) — aplicación de escritorio.

**Importante:** as ferramentas automáticas detectan só unha parte dos problemas. **A mellor proba é usar a web só co teclado e cun lector de pantalla.**

---

## 14. Compatibilidade (2026)

| Característica                 | Estado                  |
| ------------------------------ | ----------------------- |
| `:focus-visible`               | Baseline desde 2022     |
| `prefers-color-scheme`         | Universal desde 2020    |
| `prefers-reduced-motion`       | Universal desde 2020    |
| `prefers-contrast`             | Universal (con matices) |
| `aria-invalid` (atributo HTML) | Universal               |
| `rem`, `ch`                    | Universal               |

Todas estas técnicas están soportadas en navegadores modernos.

---

## 15. Exercicios

### Exercicio 1: Contraste

Dado este CSS:

```css
p {
    color: #999999;
    background: #ffffff;
}
```

Comproba o contraste. Pasa o nivel AA? Se non, que valor usarías?

<details>
<summary><b>Amosar a solución</b></summary>

O contraste é aproximadamente **2.85:1**. Non pasa AA (require 4.5:1). Para pasar AA, usar `#767676` (contraste 4.5:1) ou máis escuro, como `#595959` (7:1, pasa AAA).

</details>


### Exercicio 2: Foco visible

Reescribe este código para que o foco sexa visible sen afectar ao clic do rato:

```css
button:focus {
    outline: none;
}
```

<details>
<summary><b>Amosar a solución</b></summary>

```css
button:focus-visible {
    outline: 3px solid #1a5c8a;
    outline-offset: 2px;
}
```

</details>


### Exercicio 3: Reducir animacións

Escribe o bloque que reduce as animacións cando a persoa prefire movemento reducido.

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
        scroll-behavior: auto !important;
    }
}
```

</details>


### Exercicio 4: Modo escuro

Escribe CSS para que, en modo escuro, o fondo sexa `#1a1a1a` e o texto `#e0e0e0`.

<details>
<summary><b>Amosar a solución</b></summary>

```css
@media (prefers-color-scheme: dark) {
    :root {
        --cor-fondo: #1a1a1a;
        --cor-texto: #e0e0e0;
    }
}

body {
    background: var(--cor-fondo);
    color: var(--cor-texto);
}
```

</details>


### Exercicio 5: Non depender só da cor

Reescribe este CSS para que o erro non se indique só coa cor do bordo, senón tamén con texto.

<details>
<summary><b>Amosar a solución</b></summary>

```css
/* Mal */
input:invalid {
    border-color: red;
}

/* Ben */
input[aria-invalid="true"] {
    border-color: #cc0000;
    background: #fff5f5;
}

.campo:has(input[aria-invalid="true"]) .erro {
    display: block;
    color: #cc0000;
}
```

</details>


### Exercicio 6: Detectar erros

```css
button {
    outline: none;
    font-size: 12px;
    color: #cccccc;
    background: #ffffff;
    padding: 2px;
}
```

Atopa os problemas de accesibilidade.

<details>
<summary><b>Amosar a solución</b></summary>

1. `outline: none` elimina o foco sen alternativa.
2. `font-size: 12px` é demasiado pequeno.
3. `color: #cccccc` sobre `background: #ffffff` ten contraste de 1.6:1, moi insuficiente.
4. `padding: 2px` dá unha área de toque minúscula.

**Corrección:**

```css
button {
    font-size: 1rem;
    color: #333333;
    background: #ffffff;
    padding: 0.75rem 1.25rem;
    min-height: 44px;

    &:focus-visible {
        outline: 3px solid #1a5c8a;
        outline-offset: 2px;
    }
}
```

</details>

---

## 16. Para profundar

- **MDN Web Docs:** [Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility) — guía completa.
- **MDN Web Docs:** [Accessible CSS](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/CSS_and_JavaScript) — CSS e accesibilidade.
- **W3C:** [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/) — as normas.
- **The A11Y Project** (https://www.a11yproject.com/) — recursos prácticos.
- **Inclusive Components** (https://inclusive-components.design/) — patróns de compoñentes accesibles.
- **WebAIM** (https://webaim.org/) — recursos e ferramentas.
- **A11Y Style Guide** (https://a11y-style-guide.com/) — guía de estilos accesibles.
- **Sara Soueidan:** [A11Y resources](https://www.sarasoueidan.com/tags/accessibility/) — artigos moi recomendados.

---

## 17. Referencias cruzadas

- **Capítulo 4: Cores, tipografía e unidades** — contraste, unidades relativas.
- **Capítulo 6: `display`, fluxo normal e posicionamento** — `display: none` vs `visibility: hidden`.
- **Capítulo 11: Media queries** — `prefers-color-scheme`, `prefers-reduced-motion`, `prefers-contrast`.
- **Capítulo 13: Unidades relativas e funcións modernas** — `rem`, `ch`, `clamp()` para texto accesible.
- **Capítulo 16: Pseudo-clases e pseudo-elementos modernos** — `:focus-visible`, `:user-invalid`.
- **Capítulo 17: Funcións de cor modernas** — `contrast-color()`.
- **Capítulo 18: Transicións e animacións** — `prefers-reduced-motion`.
- **Capítulo 20: Transformacións 2D e 3D** — movemento e accesibilidade.
- **Capítulo 21: Filtros, blend modes e masking** — contraste e lexibilidade.
- **Capítulo 22: Scroll-driven animations** — paralaxe e sensibilidade ao movemento.
- **Capítulo 24: Rendemento e boas prácticas** — o rendemento tamén é accesibilidade.

---

**Data de creación:** 2026-09-17  
**Última revisión:** 2026-09-17  
**Estado:** Borrador para validación
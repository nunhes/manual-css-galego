---
title: "HTML semántico e CSS: por que importa a estrutura"
description: "Explicación da relación entre HTML semántico e CSS para mellorar a accesibilidade, o SEO e o mantemento das interfaces."
bloque: 1
capitulo: 6
nivel: basico
ultima_revision: "2026-09-18"
estado: "borrador_para_validacion"
compatibilidade: "universal"
palabras_chave:
  - html_semantico
  - estructura
  - accesibilidade
  - antipatrons
  - boton_vs_div
  - listas
  - titulos
  - secciones
---

# Capítulo 6: HTML semántico e CSS

> CSS describe **como se ve** o contido. Pero o contido ten que estar **ben estruturado** en HTML para que CSS poida traballar ben, para que os lectores de pantalla poidan lelo, e para que os buscadores entenden a páxina. Este capítulo explica a relación entre HTML semántico e CSS, por que importa, e cales son os anti-patróns máis comúns.

---

## 1. Introdución: CSS non substitúe o HTML

Un erro moi común entre quen empeza con CSS é pensar que **todo se pode resolver con `div` e CSS**. É dicir: usar `<div>` para todo, darlle aparencia de botón, aparencia de ligazón, aparencia de título, e listo. Isto funciona visualmente, pero **rompe moitas cousas**:

- **Accesibilidade:** os lectores de pantalla non saben que un `<div>` é un botón. Non se pode tabular, non se pode premer co teclado, non se anuncia correctamente.
- **SEO:** os buscadores non entenden a estrutura da páxina se todo son `div`s.
- **Mantemento:** cando todo é `div`, o CSS enchese de clases que só describen aparencia, non significado.
- **Comportamento nativo:** os botóns reais teñen comportamento nativo (foco, teclado, `disabled`, `type="submit"`) que hai que reimplementar a man se usas `div`.

**A idea clave:** o HTML di **que é** cada cousa. O CSS di **como se ve**. Se o HTML non di o que é, o CSS non pode facer o seu traballo ben.

> 💡 **Para pensar:** cando escribas CSS, pregúntate sempre: «este elemento, que é?». Se é un botón, usa `<button>`. Se é unha ligazón, usa `<a>`. Se é un título, usa `<h1>`–`<h6>`. Se é unha lista, usa `<ul>` ou `<ol>`. Só cando non hai un elemento semántico axeitado, usa `<div>` ou `<span>`.

---

## 2. Conceptos fundamentais

### 2.1 Que é o HTML semántico

O **HTML semántico** consiste en usar o elemento HTML **axeitado para cada cousa**, en lugar de usar sempre `<div>` ou `<span>`. Por exemplo:

| Cousa             | Elemento semántico | Elemento non semántico   |
| ----------------- | ------------------ | ------------------------ |
| Botón             | `<button>`         | `<div>`                  |
| Ligazón           | `<a href="...">`   | `<span>`                 |
| Título principal  | `<h1>`             | `<div class="titulo">`   |
| Lista             | `<ul>` ou `<ol>`   | `<div class="lista">`    |
| Navegación        | `<nav>`            | `<div class="menu">`     |
| Artigo            | `<article>`        | `<div class="artigo">`   |
| Sección           | `<section>`        | `<div class="seccion">`  |
| Cabeceira         | `<header>`         | `<div class="cabecera">` |
| Pé de páxina      | `<footer>`         | `<div class="pe">`       |
| Barra lateral     | `<aside>`          | `<div class="sidebar">`  |
| Contido principal | `<main>`           | `<div class="contido">`  |

### 2.2 Por que importa para CSS

Usar HTML semántico ten tres consecuencias directas para CSS:

**1. Selectores máis simples.** Se usas `<button>` para botóns, podes escribir `button { ... }` en lugar de `.boton { ... }` espallado por toda a folla.

**2. Comportamento nativo gratuíto.** Os botóns reais teñen foco, teclado, `disabled`, `type="submit"`, etc. Se usas `div`, tes que reimplementalo todo con CSS e JavaScript.

**3. Composición máis doada.** Os elementos semánticos teñen relacións entre si que se poden aproveitar: `article > header`, `nav > ul > li`, `main > section`, etc.

### 2.3 Por que importa para a accesibilidade

Os **lectores de pantalla** (NVDA, JAWS, VoiceOver) usan a estrutura semántica para navegar:

- Saltan de título en título (tecla `H`).
- Saltan de rexión en rexión (tecla `R`: `main`, `nav`, `aside`...).
- Anuncian listas, botóns, ligazóns, etc.

Se todo son `div`s, o lector de pantalla non pode facer nada disto. **A persoa queda atrapada.**

### 2.4 Por que importa para o SEO

Os buscadores usan a estrutura para entender a páxina:

- `<h1>`–`<h6>`: xerarquía de contidos.
- `<article>`: contido principal.
- `<nav>`: navegación.
- `<main>`: contido central.

Unha páxina con boa estrutura semántica **posiciona mellor** ca unha con todo `div`s.

---

## 3. Anti-patróns comúns

### 3.1 `div` con aparencia de botón

```html
<!-- Mal: div con aparencia de botón -->
<div class="boton" onclick="facerAlgo()">Premer</div>
```

**Problemas:**

- Non se pode tabular (a menos que engadas tabindex="0").
- Non se pode premer co teclado (teclas Enter ou Espazo).
- Non se anuncia como botón nos lectores de pantalla.
- Non se comporta como botón dentro dun formulario.

**Solución:**

```html
<!-- Ben: button real -->
<button type="button" class="boton" onclick="facerAlgo()">Premer</button>
```

No CSS, o estilo é exactamente o mesmo:

```css
.boton {
    padding: 0.75rem 1.5rem;
    background: #1a5c8a;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}
```

### 3.2 `span` con aparencia de ligazón

```html
<!-- Mal: span con aparencia de ligazón -->
<span class="ligazon" onclick="irA('sobre.html')">Sobre nós</span>
```

**Solución:**

```html
<!-- Ben: ligazón real -->
<a href="sobre.html" class="ligazon">Sobre nós</a>
```

**Diferenzas clave:** a ligazón real pódese abrir nunha nova pestana, pódese copiar o enderezo, pódese gardar en marcadores, e anúnciase como ligazón.

### 3.3 `div` con aparencia de título

```html
<!-- Mal: div con aparencia de título -->
<div class="titulo-principal">O meu sitio</div>
```

**Solución:**

```html
<!-- Ben: título real -->
<h1 class="titulo-principal">O meu sitio</h1>
```

Se queres que o título se vexa pequeno, **non cambies o elemento**: cambia o CSS.

```css
.titulo-principal {
    font-size: 1.25rem;   /* pequeno visualmente, pero h1 no HTML */
}
```

### 3.4 `div` con aparencia de lista

```html
<!-- Mal: divs con aparencia de lista -->
<div class="lista">
    <div class="elemento">Primeiro</div>
    <div class="elemento">Segundo</div>
</div>
```

**Solución:**

```html
<!-- Ben: lista real -->
<ul class="lista">
    <li>Primeiro</li>
    <li>Segundo</li>
</ul>
```

**Por que importa:** os lectores de pantalla anuncian «lista de 2 elementos» e poden navegar por ela. Cos `div`s, non.

### 3.5 Saltar niveis de título

```html
<!-- Mal: salta de h1 a h3 -->
<h1>Título principal</h1>
<h3>Subtítulo</h3>
```

**Solución:**

```html
<!-- Ben: xerarquía lóxica -->
<h1>Título principal</h1>
<h2>Subtítulo</h2>
```

Os niveis de título forman a **estrutura** da páxina. Non se deben usar para dar tamaño (iso é traballo de CSS).

### 3.6 Usar `br` para separar parágrafos

```html
<!-- Mal: br para separar parágrafos -->
<p>Primeiro parágrafo.<br><br>Segundo parágrafo.</p>
```

**Solución:**

```html
<!-- Ben: parágrafos separados -->
<p>Primeiro parágrafo.</p>
<p>Segundo parágrafo.</p>
```

**Por que importa:** os parágrafos reais teñen `margin-bottom` por defecto, os lectores de pantalla fan pausas entre eles, e o CSS pode estilizalos individualmente.

### 3.7 Usar `table` para maquetar

```html
<!-- Mal: table para maquetar -->
<table>
    <tr>
        <td>Barra lateral</td>
        <td>Contido</td>
    </tr>
</table>
```

**Solución:**

```html
<!-- Ben: CSS Grid ou Flexbox -->
<div class="layout">
    <aside>Barra lateral</aside>
    <main>Contido</main>
</div>
```

```css
.layout {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 1rem;
}
```

As táboas son para **datos tabulares**, non para maquetar.

---

## 4. Exemplo mínimo funcional

Vexamos a diferenza cun exemplo completo: unha tarxeta de produto.

**Versión con `div`s (anti-patrón):**

```html
<div class="tarxeta">
    <div class="imaxe">...</div>
    <div class="titulo">Nome do produto</div>
    <div class="descricion">Descrición breve.</div>
    <div class="boton" onclick="mercarr()">Mercarr</div>
</div>
```

**Versión semántica (recomendada):**

```html
<article class="tarxeta">
    <img src="produto.jpg" alt="Nome do produto" class="tarxeta-imaxe">
    <h3 class="tarxeta-titulo">Nome do produto</h3>
    <p class="tarxeta-descricion">Descrición breve.</p>
    <button type="button" class="boton">Mercarr</button>
</article>
```

**O CSS é o mesmo, pero o HTML é moito mellor:**

1. `<article>` indica que é un contido autónomo.
2. `<img>` ten `alt` (obrigatorio para accesibilidade).
3. `<h3>` é un título real, non un `div` con clase.
4. `<p>` é un parágrafo real.
5. `<button>` é un botón real, con foco e teclado.

**Resultado:** a mesma aparencia visual, pero accesible, indexable, e mantible.

---

## 5. Casos habituais na práctica

### 5.1 Formularios

```html
<!-- Ben: formulario semántico -->
<form>
    <label for="email">Correo electrónico</label>
    <input type="email" id="email" name="email" required>

    <label for="mensaxe">Mensaxe</label>
    <textarea id="mensaxe" name="mensaxe" rows="4"></textarea>

    <button type="submit">Enviar</button>
</form>
```

**Claves:**

- `<label for="...">` asociado ao `<input id="...">`.
- `<input type="email">` con tipo axeitado (móbiles amosan teclado de correo).
- `<button type="submit">` para enviar.

### 5.2 Navegación

```html
<!-- Ben: navegación semántica -->
<nav aria-label="Principal">
    <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/cursos">Cursos</a></li>
        <li><a href="/contacto">Contacto</a></li>
    </ul>
</nav>
```

**Claves:**

- `<nav>` indica que é unha rexión de navegación.
- `<ul>` para a lista de ligazóns.
- `<a>` para as ligazóns (non `<span>`).

### 5.3 Artigo con seccións

```html
<article>
    <header>
        <h1>Título do artigo</h1>
        <p>Por <strong>Autor</strong>, <time datetime="2026-09-18">18 de setembro</time></p>
    </header>

    <section>
        <h2>Introdución</h2>
        <p>...</p>
    </section>

    <section>
        <h2>Desenvolvemento</h2>
        <p>...</p>
    </section>

    <footer>
        <p>Etiquetas: <a href="/tag/css">CSS</a>, <a href="/tag/galego">galego</a></p>
    </footer>
</article>
```

### 5.4 Cabeceira e pé de páxina

```html
<body>
    <header>
        <h1>O meu sitio</h1>
        <nav>...</nav>
    </header>

    <main>
        <!-- Contido principal -->
    </main>

    <footer>
        <p>© 2026 O meu sitio</p>
    </footer>
</body>
```

---

## 6. Erros frecuentes

### 6.1 Usar `div` para todo

```html
<!-- Mal -->
<div class="cabecera">
    <div class="titulo">O meu sitio</div>
    <div class="menu">...</div>
</div>
```

**Solución:** usar `<header>`, `<h1>`, `<nav>`.

### 6.2 Non usar `alt` nas imaxes

```html
<!-- Mal -->
<img src="produto.jpg">
```

**Solución:**

```html
<!-- Ben: descrición -->
<img src="produto.jpg" alt="Camiseta azul de algodón">

<!-- Ben: decorativa -->
<img src="decoracion.svg" alt="" aria-hidden="true">
```

**Regra:** se a imaxe transmite información, ten `alt` descritivo. Se é decorativa, `alt=""` (baleiro, pero presente).

### 6.3 Usar `onclick` en vez de `<button>` ou `<a>`

```html
<!-- Mal -->
<div onclick="facerAlgo()">Premer</div>
```

**Solución:**

```html
<!-- Ben -->
<button type="button" onclick="facerAlgo()">Premer</button>
```

### 6.4 Usar `tabindex` para facer elementos focables

```html
<!-- Mal: div focable -->
<div tabindex="0" onclick="...">Premer</div>
```

**Solución:** usar `<button>`, que xa é focable por defecto.

### 6.5 Ocultar contido sen semántica

```css
/* Mal: ocultar visualmente sen alternativa */
.titulo {
    display: none;
}
```

**Solución:** se só queres ocultalo visualmente pero mantelo accesible:

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

### 6.6 Non usar `<main>`

Sen `<main>`, os lectores de pantalla non poden saltar directamente ao contido principal. **Sempre** debe haber un `<main>` por páxina.

---

## 7. Compatibilidade (2026)

Todos os elementos HTML semánticos están soportados por todos os navegadores modernos desde hai anos. Non hai problemas de compatibilidade.

O que si varía é o **comportamento dos lectores de pantalla** con elementos HTML5 (`<main>`, `<section>`, `<article>`). Pero en 2026, todos os lectores modernos recoñécenos.

---

## 8. Exercicios

### Exercicio 1: Detectar anti-patróns

```html
<div class="boton" onclick="enviar()">Enviar</div>
<div class="titulo">O meu sitio</div>
<div class="lista">
    <div>Elemento 1</div>
    <div>Elemento 2</div>
</div>
```

Reescribe o HTML de forma semántica.

<details>
<summary><b>Amosar a solución</b></summary>


```html
<button type="button" onclick="enviar()">Enviar</button>
<h1>O meu sitio</h1>
<ul>
    <li>Elemento 1</li>
    <li>Elemento 2</li>
</ul>
```

</details>

### Exercicio 2: Formulario semántico

Reescribe este formulario usando HTML semántico:

```html
<div class="form">
    <div>Nome</div>
    <input type="text">
    <div>Correo</div>
    <input type="email">
    <div class="boton" onclick="enviar()">Enviar</div>
</div>
```

<details>
<summary><b>Amosar a solución</b></summary>


```html
<form>
    <label for="nome">Nome</label>
    <input type="text" id="nome" name="nome">

    <label for="email">Correo</label>
    <input type="email" id="email" name="email">

    <button type="submit">Enviar</button>
</form>
```

</details>

### Exercicio 3: Estrutura dunha páxina

Escribe a estrutura semántica dunha páxina con cabeceira, navegación, artigo, barra lateral e pé de páxina.

<details>
<summary><b>Amosar a solución</b></summary>


```html
<body>
    <header>
        <h1>O meu sitio</h1>
        <nav aria-label="Principal">
            <ul>
                <li><a href="/">Inicio</a></li>
                <li><a href="/cursos">Cursos</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <article>
            <h2>Título do artigo</h2>
            <p>Contido.</p>
        </article>

        <aside>
            <h3>Relacionados</h3>
            <ul>
                <li><a href="#">Outro artigo</a></li>
            </ul>
        </aside>
    </main>

    <footer>
        <p>© 2026 O meu sitio</p>
    </footer>
</body>
```

</details>

---

## 9. Para profundar

- **MDN Web Docs:** [HTML: A good basis for accessibility](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML) — guía de HTML semántico e accesibilidade.
- **MDN Web Docs:** [HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) — referencia de todos os elementos HTML.
- **W3C:** [HTML Standard](https://html.spec.whatwg.org/) — especificación oficial.
- **The A11Y Project:** [HTML](https://www.a11yproject.com/) — recursos de accesibilidade.
- **Inclusive Components:** https://inclusive-components.design/ — patróns de compoñentes accesibles.

---

## 10. Referencias cruzadas

- **Capítulo 3: Selectores básicos** — como se seleccionan os elementos semánticos.
- **Capítulo 26: Accesibilidade e CSS** — amplía o tema da accesibilidade.
- **Capítulo 27: Compoñentes nativos** — `dialog` e Popover API como exemplos de elementos nativos accesibles.

---

**Data de creación:** 2026-09-18  
**Última revisión:** 2026-09-18  
**Estado:** Borrador para validación
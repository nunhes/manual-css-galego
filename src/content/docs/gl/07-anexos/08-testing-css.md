---
title: "Testing de CSS"
description: "Estratexias para validar CSS e detectar regresións mediante análise de sintaxe, probas visuais e ferramentas automatizadas."
bloque: 7
capitulo: 34
nivel: avanzado
ultima_revision: "2026-09-18"
estado: "borrador_para_validacion"
compatibilidade: "non_aplicable"
palabras_chave:
  - testing
  - regression_visual
  - screenshot_testing
  - unit_testing
  - css_tests
  - percy
  - chromatic
  - playwright
  - cypress
---

# Anexo: Testing de CSS

> O CSS é difícil de testar: non é código que devolve valores, senón que describe aparencia. Con todo, hai formas de **detectar regresións** e **validar comportamento**. Este anexo explica as principais estratexias: validación de sintaxe, tests visuais, tests de regresión, e ferramentas.

---

## 1. Introdución: por que testar CSS

Cando fas un cambio nun ficheiro CSS, podes romper algo **sen decatarte**. Unha cor que cambia, un layout que se move, un botón que desaparece. Os tests axudan a detectalo **antes** de que chegue a producción.

**Tipos de tests de CSS:**

1. **Validación de sintaxe.** Comprobar que o CSS é válido.
2. **Tests unitarios.** Comprobar que unha regra concreta se aplica.
3. **Tests visuais (screenshot).** Comparar capturas de pantalla antes e despois.
4. **Tests de regresión visual.** Detectar cambios visuais non intencionados.
5. **Tests de accesibilidade.** Comprobar contrastes, foco, etc.

---

## 2. Validación de sintaxe

### 2.1 Validadores en liña

- **W3C CSS Validator** (https://jigsaw.w3.org/css-validator/) — valida CSS estándar.
- **Stylelint** (https://stylelint.io/) — linter de CSS, integrable no editor.

### 2.2 Stylelint

**Stylelint** é o linter de CSS máis usado. Detecta:

- Erros de sintaxe.
- Propiedades descoñecidas.
- Valores inválidos.
- Inconsistencias de estilo.

**Instalación:**

```bash
npm install --save-dev stylelint stylelint-config-standard
```

**Configuración (`.stylelintrc.json`):**

```json
{
  "extends": "stylelint-config-standard",
  "rules": {
    "color-no-invalid-hex": true,
    "declaration-block-no-duplicate-properties": true,
    "no-descending-specificity": true
  }
}
```

**Uso:**

```bash
npx stylelint "**/*.css"
```

---

## 3. Tests visuais (screenshot testing)

### 3.1 Que son

Os **tests visuais** consisten en:

1. **Capturar** unha imaxe da páxina (ou dun compoñente).
2. **Comparar** con outra imaxe de referencia.
3. **Detectar** diferenzas.

Se hai diferenzas, o test falla. Así se detectan cambios visuais non intencionados.

### 3.2 Ferramentas

- **Percy** (https://percy.io/) — servizo comercial, moi usado.
- **Chromatic** (https://www.chromatic.com/) — para Storybook.
- **Playwright** (https://playwright.dev/) — framework de tests, con soporte de screenshot.
- **Cypress** (https://www.cypress.io/) — framework de tests, con `cy.screenshot()`.
- **BackstopJS** (https://github.com/garris/BackstopJS) — open source.

### 3.3 Exemplo con Playwright

```javascript
import { test, expect } from '@playwright/test';

test('a tarxeta ten o estilo correcto', async ({ page }) => {
    await page.goto('http://localhost:3000/tarxeta.html');
    await expect(page).toHaveScreenshot('tarxeta.png');
});
```

A primeira vez, xera a imaxe de referencia. As seguintes veces, compara.

### 3.4 Exemplo con Cypress

```javascript
describe('Tarxeta', () => {
    it('ten o estilo correcto', () => {
        cy.visit('http://localhost:3000/tarxeta.html');
        cy.get('.tarxeta').toMatchImageSnapshot();
    });
});
```

---

## 4. Tests unitarios de CSS

### 4.1 Comprobar que unha regra se aplica

Podes usar JavaScript para comprobar que un elemento ten un estilo concreto:

```javascript
test('o botón ten fondo azul', () => {
    document.body.innerHTML = '<button class="boton">Premer</button>';
    const boton = document.querySelector('.boton');
    const estilo = getComputedStyle(boton);
    expect(estilo.backgroundColor).toBe('rgb(26, 92, 138)');
});
```

**Nota:** isto require cargar o CSS no test. Podes usar JSDOM ou un navegador real.

### 4.2 Comprobar contraste

```javascript
test('o texto ten contraste suficiente', () => {
    const contraste = calcularContraste('#333', '#fff');
    expect(contraste).toBeGreaterThanOrEqual(4.5);
});
```

---

## 5. Tests de accesibilidade

### 5.1 axe-core

**axe-core** é unha libraría que detecta problemas de accesibilidade. Pódese integrar en tests.

```javascript
import { injectAxe, checkA11y } from 'axe-playwright';

test('a páxina é accesible', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await injectAxe(page);
    await checkA11y(page);
});
```

**Detecta:**

- Contrastes insuficientes.
- Falta de `alt` en imaxes.
- Orde incorrecta de títulos.
- Foco non visible.

### 5.2 Lighthouse

**Lighthouse** é unha ferramenta de Google que audita rendemento, accesibilidade, SEO. Pódese executar desde DevTools ou desde liña de comandos.

```bash
npx lighthouse http://localhost:3000 --view
```

---

## 6. Tests de regresión

### 6.1 Que son

Os **tests de regresión** comparan o estado actual cun estado de referencia. Se algo cambia (visualmente ou funcionalmente), o test falla.

### 6.2 Estratexia

1. **Capturar o estado de referencia** unha vez.
2. **Executar os tests** cada vez que se fai un cambio.
3. **Comparar** coa referencia.
4. **Aceptar** os cambios intencionados, **rexeitar** os non intencionados.

### 6.3 Ferramentas

As mesmas que para tests visuais: Percy, Chromatic, Playwright, Cypress.

---

## 7. Exemplo práctico completo

### 7.1 Configurar Playwright

```bash
npm install --save-dev @playwright/test
npx playwright install
```

**`playwright.config.js`:**

```javascript
import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    use: {
        baseURL: 'http://localhost:3000',
        screenshot: 'only-on-failure',
    },
});
```

### 7.2 Escribir un test visual

**`tests/tarxeta.spec.js`:**

```javascript
import { test, expect } from '@playwright/test';

test('a tarxeta ten o estilo correcto', async ({ page }) => {
    await page.goto('/tarxeta.html');
    await expect(page).toHaveScreenshot('tarxeta.png', {
        maxDiffPixels: 100,   // tolerancia
    });
});
```

### 7.3 Executar

```bash
npx playwright test
```

A primeira vez, xera a imaxe de referencia. As seguintes veces, compara.

### 7.4 Actualizar a referencia

Cando os cambios son intencionados:

```bash
npx playwright test --update-snapshots
```

---

## 8. Erros frecuentes

### 8.1 Non testar CSS

**O erro máis común.** Moitos proxectos non testan CSS. Isto significa que as regresións detéctanse en producción.

### 8.2 Tests visuais sen tolerancia

Se non se configura unha tolerancia (`maxDiffPixels`), calquera cambio dun píxel fai fallar o test. Isto xera moito ruído.

### 8.3 Non actualizar as referencias

Cando os cambios son intencionados, hai que actualizar as referencias. Se non, o test falla sempre.

### 8.4 Testar demasiado

Non hai que testar todo. Os tests visuais son **caros** (tempo, almacenamento). Hai que testar os compoñentes críticos, non cada elemento.

### 8.5 Ignorar os tests de accesibilidade

Os tests de accesibilidade son tan importantes coma os visuais. Hai que integralos.

---

## 9. Compatibilidade (2026)

O testing de CSS é unha **práctica**, non unha característica. As ferramentas mencionadas están todas activas en 2026.

---

## 10. Exercicios

### Exercicio 1: Stylelint

Configura Stylelint para detectar cores hexadecimais inválidas.

<details>
<summary><b>Amosar a solución</b></summary>


```json
{
  "extends": "stylelint-config-standard",
  "rules": {
    "color-no-invalid-hex": true
  }
}
```

</details>

### Exercicio 2: Test visual

Escribe un test con Playwright que comproba o estilo dun botón.

<details>
<summary><b>Amosar a solución</b></summary>


```javascript
import { test, expect } from '@playwright/test';

test('o botón ten o estilo correcto', async ({ page }) => {
    await page.goto('/boton.html');
    await expect(page.locator('.boton')).toHaveScreenshot('boton.png');
});
```

</details>

### Exercicio 3: Test de accesibilidade

Escribe un test con axe-playwright que comproba a accesibilidade dunha páxina.

<details>
<summary><b>Amosar a solución</b></summary>


```javascript
import { test } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test('a páxina é accesible', async ({ page }) => {
    await page.goto('/');
    await injectAxe(page);
    await checkA11y(page);
});
```

</details>

---

## 11. Para profundar

- **Stylelint** — https://stylelint.io/
- **Playwright** — https://playwright.dev/
- **Cypress** — https://www.cypress.io/
- **Percy** — https://percy.io/
- **Chromatic** — https://www.chromatic.com/
- **axe-core** — https://github.com/dequelabs/axe-core
- **Lighthouse** — https://developer.chrome.com/docs/lighthouse/overview

---

## 12. Referencias cruzadas

- **Capítulo 24: Rendemento e boas prácticas** — os tests axudan a manter a calidade.
- **Capítulo 28: Depurar CSS** — o testing complementa a depuración.
- **Capítulo 30: Accesibilidade** — os tests de accesibilidade.

---

**Data de creación:** 2026-09-18  
**Última revisión:** 2026-09-18  
**Estado:** Borrador para validación
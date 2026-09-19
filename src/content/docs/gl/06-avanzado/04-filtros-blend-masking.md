---
title: "Filtros, blend modes e masking"
description: "Guía de filtros, modos de fusión, máscaras e recortes CSS para crear efectos visuais avanzados."
bloque: 6
capitulo: 21
nivel: avanzado
ultima_revision: "2026-09-17"
estado: "borrador_para_validacion"
compatibilidade: "universal"
palabras_chave:
  - filter
  - backdrop_filter
  - blend_mode
  - mix_blend_mode
  - mask
  - clip_path
  - efectos_visuales
  - composicion
  - rendimento
---

<!-- # Capítulo 21: Filtros, blend modes e masking -->

> CSS moderno ofrece tres grupos de ferramentas para **efectos visuais avanzados**: **filtros** (`filter`, `backdrop-filter`), que aplican transformacións de cor e nitidez; **modos de fusión** (`mix-blend-mode`, `background-blend-mode`), que determinan como se combinan as cores de elementos superpostos; e **máscaras** (`mask`, `clip-path`), que recortan a forma visible dun elemento. Este capítulo explica cada un, cando usalos, e como evitalos problemas de rendemento e accesibilidade.

---

## 1. Introdución: os tres piares dos efectos visuais

Nos capítulos anteriores vimos dúas formas de transformar elementos visualmente:

- **Transformacións** (Cap. 20): mover, xirar, escalar.
- **Transicións e animacións** (Cap. 18): cambiar valores ao longo do tempo.

Este capítulo engade **tres piares máis** que operan sobre a **aparencia visual** do elemento:

1. **Filtros** (`filter`): modificacións da imaxe do elemento — desenfoque, cambio de brillo, saturación, tons, sombras...
2. **Modos de fusión** (`mix-blend-mode`): como se mesturan as cores do elemento co que hai detrás.
3. **Máscaras e recortes** (`mask`, `clip-path`): que partes do elemento se ven e cales non.

Estas ferramentas estaban reservadas a software de deseño gráfico (Photoshop, Illustrator) hai só uns anos. Hoxe son CSS estándar, cun soporte universal en navegadores modernos.

> 💡 **Para pensar:** a combinación destas tres ferramentas con transformacións e animacións (Cap. 18 e 20) abre un abano enorme de posibilidades visuais que antes só se conseguían con imaxes ou vídeos. Unha mesma imaxe pode dar lugar a decenas de variacións visuais con só unhas liñas de CSS. Isto ten vantaxes: menos peso, máis flexibilidade, e mellor accesibilidade (se se fai con coidado).

**Pero atención:** con grande poder vén grande responsabilidade. Os efectos visuais avanzados poden:

- **Reducir o rendemento** (especialmente se se combinan moitos filtros en elementos grandes).
- **Comprometer a accesibilidade** (baixo contraste, dificultade de lectura, problemas con lectores de pantalla).
- **Sobrecargar visualmente** a interface.

Este capítulo explica as ferramentas e mais os coidados.

---

## 2. Filtros: `filter`

### 2.1 Que é un filtro

Un **filtro** modifica a **imaxe visual** dun elemento aplicando unha función de procesamento. É coma se colleses o elemento, o pasases por un programa de retoque, e o devolveses modificado.

**Sintaxe:**

```css
.elemento {
    filter: <función> <función> ... ;
}
```

As funcións aplícanse **en orde, de esquerda a dereita**. Se hai varias, cada unha opera sobre o resultado da anterior.

### 2.2 As funcións de filtro

CSS ofrece dez funcións de filtro predefinidas. Son as mesmas que as de SVG, e a súa semántica é a mesma:

| Función         | Que fai                          | Valor típico                               |
| --------------- | -------------------------------- | ------------------------------------------ |
| `blur()`        | Desenfoque.                      | `blur(4px)`                                |
| `brightness()`  | Brillo.                          | `brightness(1.2)`                          |
| `contrast()`    | Contraste.                       | `contrast(1.5)`                            |
| `grayscale()`   | Escala de grises.                | `grayscale(1)`                             |
| `hue-rotate()`  | Rota o ton.                      | `hue-rotate(90deg)`                        |
| `invert()`      | Inverte as cores.                | `invert(1)`                                |
| `opacity()`     | Opacidade (igual que `opacity`). | `opacity(0.5)`                             |
| `saturate()`    | Saturación.                      | `saturate(1.5)`                            |
| `sepia()`       | Tono sepia.                      | `sepia(1)`                                 |
| `drop-shadow()` | Sombra.                          | `drop-shadow(2px 2px 4px rgba(0,0,0,0.3))` |

**Exemplos básicos:**

```css
/* Desenfoque */
.desenfocado { filter: blur(8px); }

/* Escala de grises */
.gris { filter: grayscale(1); }

/* Múltiples filtros */
.efecto {
    filter: contrast(1.2) saturate(1.5) brightness(0.9);
}
```

### 2.3 Exemplos prácticos de cada filtro

**`blur()` — desenfoque**

```css
.fondo-desenfocado {
    filter: blur(10px);
}
```

Úsase moito para fondos desenfocados detrás de modais.

**`brightness()` — brillo**

```css
.imaxe-escura { filter: brightness(0.6); }
.imaxe-clara  { filter: brightness(1.3); }
```

Útil para crear variacións dunha mesma imaxe (por exemplo, unha imaxe que se escurece ao pasar o rato).

**`contrast()` — contraste**

```css
.alto-contraste { filter: contrast(1.5); }
```

**`grayscale()` — escala de grises**

```css
.foto-bn { filter: grayscale(1); }
```

**Efecto hover típico:** pasar de branco e negro a cor ao pasar o rato.

```css
.foto {
    filter: grayscale(1);
    transition: filter 0.4s;
}

.foto:hover {
    filter: grayscale(0);
}
```

**`hue-rotate()` — rotación de ton**

```css
.rotado-90  { filter: hue-rotate(90deg); }
.rotado-180 { filter: hue-rotate(180deg); }
```

Útil para crear variacións de cor dun mesmo elemento sen cambiar o valor. **Coidado:** o efecto pode ser moi rápido e agresivo.

**`invert()` — inversión**

```css
.invertido { filter: invert(1); }
```

Úsase en modo escuro para invertir imaxes claras.

**`opacity()` — opacidade**

```css
.semitransparente { filter: opacity(0.5); }
```

Equivalente a `opacity: 0.5`, pero como filtro. Case sempre é mellor usar a propiedade `opacity` directamente.

**`saturate()` — saturación**

```css
.moi-saturado { filter: saturate(2); }
.desaturado   { filter: saturate(0.5); }
```

**`sepia()` — ton sepia**

```css
.foto-antiga { filter: sepia(0.8); }
```

**`drop-shadow()` — sombra**

```css
.elemento {
    filter: drop-shadow(2px 4px 8px rgba(0, 0, 0, 0.3));
}
```

**Diferenza con `box-shadow`:** `drop-shadow()` ten en conta a **forma real** do elemento (por exemplo, o contorno dunha imaxe PNG con transparencia), mentres que `box-shadow` só debuxa arredor da caixa rectangular.

```css
/* box-shadow: sombra rectangular */
.elemento { box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.3); }

/* drop-shadow: sombra que segue o contorno */
.elemento { filter: drop-shadow(2px 4px 8px rgba(0, 0, 0, 0.3)); }
```

Para imaxes PNG con transparencia, `drop-shadow` dá un resultado moito mellor.

### 2.4 Múltiples filtros

```css
.efecto-completo {
    filter:
        brightness(1.1)
        contrast(1.2)
        saturate(1.3)
        drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
}
```

**Coidado:** cada filtro engade custo de procesamento. En elementos grandes ou animados, isto pode afectar ao rendemento.

### 2.5 Casos de uso

- **Desenfoque de fondos:** modais, cabeceiras con imaxe de fondo.
- **Escala de grises:** fotos que recuperan a cor ao pasar o rato.
- **Variacións de cor:** crear unha versión «escura» dun logo sen ter dúas imaxes.
- **Sombras realistas:** `drop-shadow` en imaxes con transparencia.
- **Efectos de transición:** por exemplo, unha imaxe que se satura ao pasar o rato.

---

## 3. `backdrop-filter`: filtros no fondo

`backdrop-filter` aplica filtros ao **fondo que hai detrás do elemento**, non ao propio elemento.

```css
.cristal {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
}
```

**Efecto:** o fondo vese desenfocado a través do elemento, creando un efecto de «vidro esmerilado» (frosted glass).

**Uso típico:** menús, modais, cabeceiras que quedan fixas ao facer scroll, tarxetas superpostas a imaxes.

**Exemplo completo:**

```css
.cabecera-fixa {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 1rem 2rem;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px) saturate(1.5);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
```

A cabeceira ten fondo semitransparente e desenfoque. Ao facer scroll, o contido pasa por debaixo e vese desenfocado.

**Compatibilidade:** `backdrop-filter` ten soporte universal desde 2022. **Pero hai un matiz:** cando o efecto non está soportado, o fondo vese **sen desenfoque** (só coa cor semitransparente). Hai que asegurar que o deseño funcione mesmo sen o efecto.

**Rendemento:** `backdrop-filter` é **custoso** de calcular, porque o navegador ten que procesar o fondo en tempo real. En elementos grandes ou con moitas capas, pode afectar ao rendemento. Úsao con moderación.

---

## 4. Modos de fusión: `mix-blend-mode` e `background-blend-mode`

### 4.1 Que son os blend modes

Os **modos de fusión** definen **como se combinan as cores** de dous elementos superpostos. Son os mesmos que hai en Photoshop ou GIMP.

**Propiedades:**

- `mix-blend-mode`: como se fusiona o elemento co que hai detrás.
- `background-blend-mode`: como se fusionan as capas de fondo dun mesmo elemento.

### 4.2 `mix-blend-mode`

```css
.elemento {
    mix-blend-mode: <modo>;
}
```

**Modos máis útiles:**

| Modo                                       | Efecto                                    |
| ------------------------------------------ | ----------------------------------------- |
| `normal`                                   | (por defecto) sen fusión.                 |
| `multiply`                                 | Multiplica as cores (escurece).           |
| `screen`                                   | Inverte, multiplica, inverte (aclara).    |
| `overlay`                                  | Combina multiply e screen.                |
| `darken`                                   | Queda coa cor máis escura.                |
| `lighten`                                  | Queda coa cor máis clara.                 |
| `color-dodge`                              | Aclara moito.                             |
| `color-burn`                               | Escurece moito.                           |
| `difference`                               | Diferenza absoluta (efecto de inversión). |
| `exclusion`                                | Similar a difference, máis suave.         |
| `hue`, `saturation`, `color`, `luminosity` | Toma un compoñente da cor fonte.          |

**Exemplo básico:**

```css
.texto-sobre-imaxe {
    mix-blend-mode: difference;
    color: white;
}
```

O texto aparece invertido respecto ao fondo, o que garante un contraste variable pero sempre visible.

**Exemplo: multiply para escurecer**

```css
.elemento {
    background: #1a5c8a;
    mix-blend-mode: multiply;
}
```

**Coidado:** `mix-blend-mode` fai que o elemento se fusione con **todo o que hai detrás**, non só co seu pai. Isto pode dar resultados inesperados.

**Solución habitual:** envolver o elemento nun contedor con `isolation: isolate`, que crea un contexto de fusión illado.

```css
.contedor {
    isolation: isolate;   /* só se fusiona co que hai dentro deste contedor */
}
```

### 4.3 `background-blend-mode`

Fusiona as **capas de fondo** dun mesmo elemento (por exemplo, unha imaxe de fondo cunha cor).

```css
.hero {
    background-image: url("imaxe.jpg");
    background-color: #1a5c8a;
    background-blend-mode: multiply;
    /* a imaxe fusiónase coa cor azul */
}
```

**Uso típico:** aplicar un «tinte» a unha imaxe de fondo sen cambiar a imaxe.

```css
.hero {
    background:
        linear-gradient(rgba(26, 92, 138, 0.7), rgba(26, 92, 138, 0.7)),
        url("imaxe.jpg") center/cover;
}
```

Esta é outra forma (con degradado semitransparente) que non require `background-blend-mode`, e ás veces é máis simple.

### 4.4 Casos de uso

- **Texto que contrasta automaticamente** sobre imaxes (`difference`, `exclusion`).
- **Efectos de «tinte»** sobre imaxes (`multiply`, `overlay`).
- **Efectos creativos** en cabeceiras, portadas, tarxetas.
- **Fusión de varias imaxes de fondo.**

**Recomendación:** úsao con moderación e sempre con contraste suficiente para a accesibilidade.

---

## 5. Máscaras: `mask`

### 5.1 Que é unha máscara

Unha **máscara** define que partes dun elemento son **visibles** e cales están **ocultas**. A diferenza de `clip-path` (que veremos despois), unha máscara pode ter **transparencia gradual**, o que permite efectos de degradado.

**Sintaxe básica:**

```css
.elemento {
    mask-image: url("mascara.png");
    mask-size: cover;
    mask-position: center;
}
```

A imaxe de máscara úsase como canle alpha: onde a máscara é opaca, o elemento vese; onde é transparente, o elemento ocúltaSe.

### 5.2 Máscaras con degradados

Un uso moi común é crear un efecto de **desvanecimiento gradual**.

```css
.fade-inferior {
    mask-image: linear-gradient(to bottom, black, transparent);
}
```

O elemento vese arriba e vaise desvanecendo cara abaixo.

**Exemplos:**

**Desvanecer cara un lado:**

```css
.fade-lateral {
    mask-image: linear-gradient(to right, black 60%, transparent);
}
```

**Desvanecer nas dúas beiras:**

```css
.fade-centro {
    mask-image: linear-gradient(to right, transparent, black, transparent);
}
```

**Máscara circular:**

```css
.mascara-circular {
    mask-image: radial-gradient(circle, black 50%, transparent 70%);
}
```

### 5.3 Máscaras con imaxes

```css
.elemento {
    mask-image: url("formas/estrela.svg");
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-position: center;
}
```

A forma do SVG determina a parte visible. Moi útil para dar formas orgánicas a imaxes.

### 5.4 Propiedades relacionadas

```css
.elemento {
    mask-image: url("mascara.png");
    mask-mode: alpha;                /* alpha ou luminance */
    mask-repeat: no-repeat;
    mask-position: center;
    mask-size: cover;
    mask-origin: border-box;
    mask-clip: border-box;
    mask-composite: add;
}
```

**Atallo:**

```css
.elemento {
    mask: url("mascara.png") center / cover no-repeat;
}
```

### 5.5 Compatibilidade

`mask` ten soporte universal, pero durante anos requiriu o prefixo `-webkit-`. Na actualidade, todos os navegadores modernos soportan `mask` sen prefixo. Aínda así, se tes que dar soporte a navegadores antigos, podes engadir o prefixo:

```css
.elemento {
    -webkit-mask-image: linear-gradient(to bottom, black, transparent);
    mask-image: linear-gradient(to bottom, black, transparent);
}
```

**Recomendación:** para proxectos novos, usa `mask` sen prefixo.

---

## 6. Recortes: `clip-path`

### 6.1 Que é `clip-path`

`clip-path` **recorta** un elemento a unha forma específica. A diferenza de `mask`, non hai transparencia gradual: ou se ve, ou non se ve.

**Sintaxe:**

```css
.elemento {
    clip-path: <forma>;
}
```

### 6.2 Formas básicas

**Círculo:**

```css
.circulo {
    clip-path: circle(50% at center);
}

.circulo-descentrado {
    clip-path: circle(30% at 30% 70%);
}
```

**Elipse:**

```css
.elipse {
    clip-path: ellipse(60% 40% at center);
}
```

**Rectángulo con esquinas redondeadas:**

```css
.rectangulo {
    clip-path: inset(10px 20px 30px 40px round 8px);
}
```

**Polígono:**

```css
.triangulo {
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

.flecha {
    clip-path: polygon(0 0, 80% 0, 100% 50%, 80% 100%, 0 100%);
}
```

Os puntos do polígono indícanse en porcentaxes (respecto ao tamaño do elemento).

### 6.3 Formas máis complexas

**Estrela:**

```css
.estrela {
    clip-path: polygon(
        50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%,
        50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%
    );
}
```

**Hexágono:**

```css
.hexagono {
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
}
```

**Diagonal (efecto de corte):**

```css
.recortado {
    clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
}
```

Este último é moi útil para seccións que se «cortan» en diagonal, un efecto moi común en webs modernas.

### 6.4 SVG como referencia

`clip-path` tamén pode usar un SVG externo:

```css
.elemento {
    clip-path: url(#formas/miña-forma);
}
```

Moi útil cando a forma é moi complexa (por exemplo, unha silueta).

### 6.5 Animación de `clip-path`

`clip-path` é **animable** se as dúas formas teñen a mesma estrutura (mesmo número de puntos):

```css
@keyframes revelar {
    from { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); }
    to   { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
}

.revelar {
    animation: revelar 0.5s ease-out forwards;
}
```

Este é un efecto moi usado para revelar contido cunha animación de «pano que se ergue».

### 6.6 Casos de uso

- **Avatares circulares:** alternativa a `border-radius: 50%`.
- **Seccións diagonais:** efectos de corte entre seccións.
- **Formas decorativas:** estrelas, hexágonos, corazóns.
- **Animacións de revelado:** mostrar contido cunha transición de forma.

---

## 7. Exemplo mínimo funcional

Vexamos unha páxina que combina filtros, blend modes e clip-path.

**Arquivo HTML:**

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Filtros, blend e máscaras</title>
    <link rel="stylesheet" href="estilos/efectos.css">
</head>
<body>
    <main class="contido">
        <h1>Efectos visuais</h1>

        <section class="demo">
            <h2>Filtros</h2>
            <div class="galeria">
                <img src="https://picsum.photos/200/200?random=1" alt="Foto 1" class="foto-gris">
                <img src="https://picsum.photos/200/200?random=2" alt="Foto 2" class="foto-desenfocada">
                <img src="https://picsum.photos/200/200?random=3" alt="Foto 3" class="foto-saturada">
            </div>
        </section>

        <section class="demo">
            <h2>Filtro de fondo (backdrop-filter)</h2>
            <div class="tarxeta-cristal">
                <p>Contido dentro dunha tarxeta con efecto de vidro esmerilado.</p>
            </div>
        </section>

        <section class="demo">
            <h2>Clip-path</h2>
            <div class="formas">
                <div class="forma forma-circulo"></div>
                <div class="forma forma-hexagono"></div>
                <div class="forma forma-diagonal"></div>
            </div>
        </section>
    </main>
</body>
</html>
```

**Arquivo CSS:**

```css
/* ==============================
   Reset
   ============================== */
*, *::before, *::after {
    box-sizing: border-box;
}

* {
    margin: 0;
    padding: 0;
}

body {
    font-family: system-ui, sans-serif;
    line-height: 1.6;
    background: #fafafa;
    color: #333;
    padding: 2rem 1rem;
}

.contido {
    max-width: 800px;
    margin: 0 auto;

    h1 {
        font-size: clamp(1.5rem, 1rem + 2vw, 2rem);
        color: #1a5c8a;
        margin-bottom: 2rem;
    }

    h2 {
        font-size: 1.125rem;
        color: #666;
        margin-bottom: 1rem;
        font-weight: 500;
    }
}

.demo {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    margin-bottom: 1.5rem;
    border: 1px solid #e5e5e5;
}

/* ==============================
   Filtros
   ============================== */
.galeria {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.galeria img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
    transition: filter 0.4s;
}

.foto-gris {
    filter: grayscale(1);
}

.foto-gris:hover {
    filter: grayscale(0);
}

.foto-desenfocada {
    filter: blur(3px);
}

.foto-desenfocada:hover {
    filter: blur(0);
}

.foto-saturada {
    filter: saturate(2) contrast(1.1);
}

/* ==============================
   backdrop-filter
   ============================== */
.demo:has(.tarxeta-cristal) {
    background: url("https://picsum.photos/800/400?random=10") center / cover;
    padding: 4rem 2rem;
}

.tarxeta-cristal {
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(12px) saturate(1.5);
    border: 1px solid rgba(255, 255, 255, 0.6);
    padding: 2rem;
    border-radius: 12px;
    color: #1a1a1a;
    font-weight: 500;
    text-align: center;
}

/* ==============================
   Clip-path
   ============================== */
.formas {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
}

.forma {
    width: 120px;
    height: 120px;
    background: linear-gradient(135deg, #1a5c8a, #0d3a5c);
}

.forma-circulo {
    clip-path: circle(50% at center);
}

.forma-hexagono {
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
}

.forma-diagonal {
    clip-path: polygon(0 0, 100% 0, 100% 70%, 0 100%);
}
```

**Que está a pasar aquí:**

1. **Filtros:** tres fotos co mesmo contido, con diferentes efectos (`grayscale`, `blur`, `saturate`). Ao pasar o rato, a foto gris e a desenfocada recuperan o estado normal.
2. **`backdrop-filter`:** a tarxeta ten fondo semitransparente e desenfoque, o que produce un efecto de «vidro esmerilado» sobre a imaxe de fondo.
3. **`clip-path`:** tres elementos div con formas diferentes: círculo, hexágono e diagonal.

---

## 8. Casos habituais na práctica

### 8.1 Tarxeta con efecto «vidro»

```css
.tarxeta {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
}
```

### 8.2 Foto que recupera a cor

```css
.foto {
    filter: grayscale(1);
    transition: filter 0.4s;
}

.foto:hover {
    filter: grayscale(0);
}
```

### 8.3 Sección diagonal

```css
.seccion-diagonal {
    clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
    padding: 4rem 2rem;
}
```

### 8.4 Avatar circular

```css
.avatar {
    clip-path: circle(50%);
    /* alternativa a border-radius: 50% */
}
```

### 8.5 Texto que contrasta automaticamente

```css
.texto-fusionado {
    mix-blend-mode: difference;
    color: white;
}
```

### 8.6 Sombra realista para imaxes PNG

```css
.icone {
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}
```

### 8.7 Revelar contido con animación

```css
@keyframes revelar {
    from { clip-path: inset(0 100% 0 0); }
    to   { clip-path: inset(0 0 0 0); }
}

.revelar {
    animation: revelar 0.6s ease-out forwards;
}
```

---

## 9. Erros frecuentes

### 9.1 Abusar dos filtros

Cada filtro engade custo de procesamento. Moitos filtros en elementos grandes poden **ralentar a páxina**, especialmente en móbiles.

```css
/* Evitar: catro filtros nunha imaxe grande */
.imaxe {
    filter: blur(4px) saturate(1.5) contrast(1.2) drop-shadow(0 4px 8px rgba(0,0,0,0.3));
}
```

**Recomendación:** úsaos con moderación, e comproba o rendemento en dispositivos reais.

### 9.2 Esquecer a accesibilidade

**Os efectos visuais poden comprometer a accesibilidade:**

- **Baixo contraste:** texto claro sobre fondo claro.
- **Texto deformado:** con `skew`, `blur` ou `mix-blend-mode` extremo.
- **Dificultade de lectura:** fondos con moito ruído.

**Solución:** sempre comprobar o contraste e a lexibilidade. Se un efecto fai o contido inaccesible, hai que cambialo.

### 9.3 Non comprobar o rendemento

`filter` e `backdrop-filter` son **custosos**. Especialmente se se aplican a elementos grandes, animados ou con moitos efectos superpostos.

**Solución:** usa o panel de rendemento de DevTools para comprobar o custo.

### 9.4 `mix-blend-mode` afecta a máis elementos dos esperados

```css
/* Mal: fusiónase con todo o que hai detrás, non só co pai */
.elemento {
    mix-blend-mode: multiply;
}
```

**Solución:** usar `isolation: isolate` nun contedor para limitar o efecto.

```css
.contedor {
    isolation: isolate;
}
```

### 9.5 `backdrop-filter` sen fallback

Se o navegador non soporta `backdrop-filter`, o elemento ten só a cor semitransparente (sen desenfoque). Hai que asegurar que o deseño funcione igualmente.

**Solución:** comprobar a aparencia sen o efecto.

### 9.6 Usar `clip-path` con formas animadas

`clip-path` só se pode animar se as dúas formas teñen a **mesma estrutura** (mesmo número de puntos).

```css
/* Non funciona: número de puntos distinto */
@keyframes mal {
    from { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
    to   { clip-path: circle(50%); }
}
```

**Solución:** usar sempre o mesmo tipo de forma e o mesmo número de puntos.

### 9.7 Esquecer que `filter` crea un contexto de apilamento

`filter` distinto de `none` crea un **contexto de apilamento** (igual que `transform`). Isto pode afectar ao `z-index` de fillos.

**Solución:** se hai problemas de apilamento, revisar os `z-index` dos antepasados.

### 9.8 Ignorar `prefers-reduced-motion`

**Os filtros animados tamén se deben reducir** cando a persoa o prefire. Aplicar o bloque estándar.

---

## 10. Compatibilidade (2026)

| Característica                 | Estado                    |
| ------------------------------ | ------------------------- |
| `filter`                       | Universal desde hai anos  |
| `backdrop-filter`              | Universal desde 2022      |
| `mix-blend-mode`               | Universal desde hai anos  |
| `background-blend-mode`        | Universal desde hai anos  |
| `isolation`                    | Universal                 |
| `mask` (sen prefixo)           | Universal desde 2021-2022 |
| `clip-path` con formas básicas | Universal                 |
| `clip-path` con polígonos      | Universal                 |

**Recomendación:** todas estas ferramentas se poden usar sen preocupacións en 2026.

---

## 11. Exercicios

### Exercicio 1: Filtro de desenfoque

Escribe CSS para que unha imaxe se vexa desenfocada (blur de 5px) e, ao pasar o rato por riba, recupere a nitidez.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.imaxe {
    filter: blur(5px);
    transition: filter 0.4s;
}

.imaxe:hover {
    filter: blur(0);
}
```

</details>


### Exercicio 2: `drop-shadow`

Escribe CSS para que unha imaxe PNG con transparencia teña unha sombra que siga o contorno, non que debuxe un rectángulo.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.imaxe {
    filter: drop-shadow(2px 4px 8px rgba(0, 0, 0, 0.3));
}
```

</details>


### Exercicio 3: `backdrop-filter`

Escribe CSS para unha cabeceira fixa con fondo semitransparente e desenfoque do contido que pasa por debaixo.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.cabecera {
    position: fixed;
    top: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    padding: 1rem 2rem;
}
```

</details>


### Exercicio 4: `clip-path`

Escribe CSS para que un elemento teña forma de triángulo.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.triangulo {
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}
```

</details>


### Exercicio 5: Blend mode

Escribe CSS para que un texto branco sobre unha imaxe teña contraste variable, usando un blend mode.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.texto {
    color: white;
    mix-blend-mode: difference;
}
```

</details>


### Exercicio 6: Detectar o erro

```css
.contedor {
    background: url("imaxe.jpg");
}

.elemento {
    mix-blend-mode: multiply;
    background: #1a5c8a;
}
```

Se `.elemento` se fusiona co fondo da páxina en lugar de coa imaxe do contedor, cal pode ser o problema?

<details>
<summary><b>Amosar a solución</b></summary>

`mix-blend-mode` fusiónase con **todo o que hai detrás**, non só co pai directo. Se queres limitar o efecto ao contedor, hai que engadir `isolation: isolate` no contedor:

```css
.contedor {
    isolation: isolate;
}
```

</details>


---

## 12. Para profundar

- **MDN Web Docs:** [filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter) — referencia completa.
- **MDN Web Docs:** [backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter) — referencia.
- **MDN Web Docs:** [mix-blend-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode) — referencia.
- **MDN Web Docs:** [clip-path](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path) — referencia.
- **MDN Web Docs:** [mask](https://developer.mozilla.org/en-US/docs/Web/CSS/mask) — referencia.
- **web.dev:** [Learn CSS: Filters](https://web.dev/learn/css/filters) — lección interactiva.
- **Bennett Feely:** [Clippy](https://bennettfeely.com/clippy/) — ferramenta visual para xerar `clip-path`.
- **CSS-Tricks:** [The Complete Guide to CSS Filters](https://css-tricks.com/almanac/properties/f/filter/) — guía.
- **W3C:** [Filter Effects Module Level 1](https://www.w3.org/TR/filter-effects-1/) — especificación.

---

## 13. Referencias cruzadas

- **Capítulo 4: Cores, tipografía e unidades** — as cores que se ven afectadas polos filtros.
- **Capítulo 18: Transicións e animacións** — os filtros son propiedades animables.
- **Capítulo 20: Transformacións 2D e 3D** — complementarias aos filtros e clip-path.
- **Capítulo 22: Scroll-driven animations** — combinación de efectos co scroll.
- **Capítulo 24: Rendemento e boas prácticas** — os filtros poden ter custo.
- **Capítulo 26: Accesibilidade e CSS** — contraste, lexibilidade, redución de efectos.

---

**Data de creación:** 2026-09-17  
**Última revisión:** 2026-09-17  
**Estado:** Borrador para validación
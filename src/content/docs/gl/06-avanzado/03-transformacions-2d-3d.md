---
title: "Transformacións 2D e 3D"
description: "Uso de transformacións 2D e 3D para desprazar, xirar, escalar e deformar elementos sen alterar o layout."
bloque: 6
capitulo: 20
nivel: avanzado
ultima_revision: "2026-09-17"
estado: "borrador_para_validacion"
compatibilidade: "universal"
palabras_chave:
  - transform
  - translate
  - rotate
  - scale
  - skew
  - perspective
  - transform_origin
  - 3d
  - 2d
  - rendimento
  - compositing
---

<!-- # Capítulo 20: Transformacións 2D e 3D -->

> As **transformacións** permiten modificar a forma, o tamaño, a posición e a orientación dun elemento **sen afectar ao layout dos demais**. Pódense aplicar en dúas dimensións (2D: desprazar, xirar, escalar, deformar) ou en tres dimensións (3D: engadir perspectiva, xirar sobre eixes X, Y, Z). Son a base das animacións modernas, dos efectos de «levantamento» das tarxetas, dos cubos xiratorios e de moitos outros efectos visuais. Este capítulo explica como funcionan, en que se diferencian doutras propiedades como `top`/`left`, e como evitalos problemas típicos.

---

## 1. Introdución: transformar sen mover o layout

Cando queres desprazar un elemento, tes dúas opcións:

1. **Usar `top`, `left`, `margin` ou `position`.** Isto **cambia o layout**: o elemento ocupa un sitio distinto, os veciños recalcúlanse, e o navegador ten que rehacer os cálculos.
2. **Usar `transform: translate(...)`.** Isto **non cambia o layout**: o elemento «móvese» visualmente, pero o seu espazo orixinal resérvase. Os veciños non se moven.

Esta diferenza é fundamental. As transformacións son **operacións visuais**, non de layout. O elemento segue ocupando o mesmo sitio no fluxo; só se debuxa noutra posición, noutra orientación, ou con outro tamaño.

Isto ten tres consecuencias moi importantes:

- **Rendemento:** as transformacións son **moito máis eficientes** que mover elementos con `top`/`left`. O navegador só ten que repintar o elemento, non recalcular todo o layout.
- **Flexibilidade:** podes superpoñer elementos, xiralos, escalalos, sen que iso afecte ao resto da páxina.
- **Animación:** as transformacións son **animables** de forma moi fluída, o que as fai perfectas para transicións e animacións.

As transformacións poden ser **2D** (só no plano) ou **3D** (con profundidade). Este capítulo cobre as dúas, porque comparten a mesma propiedade `transform` e moitos conceptos.

> 💡 **Para pensar:** case todos os efectos visuais modernos que ves en webs profesionais (tarxetas que se elevan ao pasar o rato, botóns que rebotan, imaxes que xiran, menús que se desprazan) están feitos con `transform`. Se entendes esta propiedade, abres a porta a un mundo de posibilidades.

---

## 2. A propiedade `transform`

A propiedade `transform` aplica unha ou máis **funcións de transformación** a un elemento.

```css
.elemento {
    transform: translate(20px, 10px);
    /* despraza 20px á dereita e 10px abaixo */
}
```

Pódense aplicar **varias funcións á vez**, separadas por espazos:

```css
.elemento {
    transform: translate(20px, 10px) rotate(45deg) scale(1.2);
    /* despraza, xira e escala, nesta orde */
}
```

**Importante:** a **orde importa**. `translate(50px) rotate(45deg)` non dá o mesmo resultado que `rotate(45deg) translate(50px)`. Pensa nisto coma se fosen operacións matemáticas que se aplican unha tras outra.

---

## 3. Transformacións 2D

As transformacións 2D actúan no plano da pantalla. Son as máis usadas no día a día.

### 3.1 `translate()`: desprazar

Despraza o elemento horizontal e/ou verticalmente.

```css
/* Sintaxe completa */
transform: translate(x, y);

/* Exemplos */
transform: translate(20px, 10px);    /* 20px á dereita, 10px abaixo */
transform: translate(50%, 0);        /* 50% do seu propio ancho á dereita */
transform: translate(-10px, -10px);  /* 10px á esquerda e arriba */

/* Formas individuais */
transform: translateX(20px);         /* só horizontal */
transform: translateY(-10px);        /* só vertical */
```

**Diferencia coas porcentaxes:** cando usas `%`, a porcentaxe é **respecto ao tamaño do propio elemento**, non do contedor.

```css
/* Centrar horizontalmente cun transform */
.centrado {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* -50% do seu propio ancho e alto, o que centra perfectamente */
}
```

Este é un dos trucos clásicos de CSS: `top: 50%; left: 50%; transform: translate(-50%, -50%)` centra calquera elemento absoluto no seu contedor.

### 3.2 `rotate()`: xirar

Xira o elemento ao redor dun punto.

```css
transform: rotate(45deg);     /* 45 graos no sentido das agullas do reloxo */
transform: rotate(-90deg);    /* 90 graos en sentido antihorario */
transform: rotate(0.25turn);  /* 1/4 de volta (equivalente a 90deg) */
transform: rotate(0.5rad);    /* radianes */
```

**Unidades:** `deg` (graos), `rad` (radianes), `grad` (gradianes), `turn` (voltas).

**O punto de xiro por defecto é o centro do elemento.** Pódese cambiar con `transform-origin` (ver 5).

### 3.3 `scale()`: escalar

Aumenta ou reduce o tamaño do elemento.

```css
transform: scale(2);          /* dobre de tamaño */
transform: scale(0.5);        /* metade de tamaño */
transform: scale(1.5, 0.8);   /* ancho × 1.5, alto × 0.8 */

/* Formas individuais */
transform: scaleX(1.5);       /* só ancho */
transform: scaleY(0.8);       /* só alto */
```

**Importante:** `scale()` **non cambia o layout**. O elemento segue ocupando o mesmo espazo, pero vese máis grande ou pequeno. Isto pode facer que se solape con outros elementos.

**Un valor de `1` significa tamaño normal.** Valores maiores que `1` agrandan; entre `0` e `1` reducen.

### 3.4 `skew()`: deformar

Inclina o elemento nun ou nos dous eixes, creando un efecto de «paralelogramo».

```css
transform: skew(10deg);         /* inclina no eixe X */
transform: skew(10deg, 5deg);   /* inclina nos dous eixes */
transform: skewX(15deg);        /* só eixe X */
transform: skewY(-5deg);        /* só eixe Y */
```

**Uso:** efectos decorativos, bandas inclinadas, seccións «dinámicas». Úsase con moderación, porque deforma o texto e pode dificultar a lectura.

### 3.5 `matrix()`: a forma matemática

Todas as transformacións 2D poden reducirse a unha **matriz de 6 valores**. `matrix()` permite escribila directamente.

```css
transform: matrix(a, b, c, d, e, f);
```

**Na práctica, case nunca se usa directamente.** É a forma interna que o navegador calcula cando escribes `translate`, `rotate`, etc. Só se usa en casos moi avanzados (animacións calculadas con JavaScript).

---

## 4. Transformacións 3D

As transformacións 3D engaden **profundidade**. O elemento pode xirar sobre os eixes X, Y e Z, e pode colocarse en profundidade.

### 4.1 Os tres eixes

Imaxina un sistema de coordenadas:

- **Eixe X:** horizontal (esquerda ↔ dereita).
- **Eixe Y:** vertical (arriba ↔ abaixo).
- **Eixe Z:** profundidade (preto ↔ lonxe).

As transformacións 2D só moven nos eixes X e Y. As 3D engaden o eixe Z.

### 4.2 `translate3d()`

```css
transform: translate3d(x, y, z);
transform: translateZ(50px);   /* afástase 50px cara a ti */
transform: translateZ(-50px);  /* alónxase 50px de ti */
```

**Coidado:** `translateZ` só ten efecto visible se o contedor ten **perspectiva** definida (ver 4.5).

### 4.3 `rotate3d()` e as rotacións nos eixes

```css
transform: rotateX(45deg);    /* xira sobre o eixe horizontal */
transform: rotateY(45deg);    /* xira sobre o eixe vertical */
transform: rotateZ(45deg);    /* xira sobre o eixe de profundidade (igual que rotate) */

/* Rotación sobre un eixe calquera */
transform: rotate3d(1, 1, 0, 45deg);  /* eixe (1,1,0), 45 graos */
```

**Exemplo clásico: tarxeta que xira ao pasar o rato**

```css
.tarxeta {
    transition: transform 0.6s;
    transform-style: preserve-3d;
}

.tarxeta:hover {
    transform: rotateY(180deg);
}
```

Isto fai que a tarxeta se xire 180 graos sobre o eixe vertical, mostrando o seu reverso (se hai unha cara traseira preparada).

### 4.4 `scale3d()`

```css
transform: scale3d(sx, sy, sz);
transform: scaleZ(2);   /* escala no eixe de profundidade */
```

Menos usado ca `scale()` normal.

### 4.5 `perspective`: profundidade

A propiedade `perspective` define a **distancia** entre o observador e o plano Z=0. Sen ela, as transformacións 3D vense «planas», sen efecto de profundidade.

**Dúas formas de aplicala:**

**1. Na propiedade `perspective` (no contedor):**

```css
.contedor {
    perspective: 1000px;
}

.fillo {
    transform: rotateY(45deg);   /* vese con perspectiva */
}
```

**2. Na función `perspective()` (no propio elemento):**

```css
.elemento {
    transform: perspective(1000px) rotateY(45deg);
}
```

**Diferenza:** cando se aplica no contedor, a perspectiva afecta a **todos os fillos**, e o punto de fuga é común. Cando se aplica na función, a perspectiva aplícase só a ese elemento.

**Valores típicos:** entre `500px` e `2000px`. Valores pequenos = efecto máis dramático; valores grandes = efecto máis sutil.

- `500px`: moi dramático, como ollos de peixe.
- `1000px`: o máis común, efecto natural.
- `2000px`: moi sutil, case plano.

### 4.6 `transform-style: preserve-3d`

Por defecto, os fillos dun elemento transformado en 3D **acháganse** ao plano do pai. Con `transform-style: preserve-3d`, os fillos **manteñen** as súas propias transformacións 3D.

```css
.contedor {
    transform-style: preserve-3d;
    perspective: 1000px;
}

.fillo {
    transform: translateZ(50px);   /* sen preserve-3d, isto non se ve */
}
```

**Este é o segredo dos cubos 3D e das escenas con profundidade.**

### 4.7 `backface-visibility`: cara traseira

Cando un elemento xira 180 graos, vese a súa **cara traseira**. Con `backface-visibility: hidden`, esa cara ocúltase.

```css
.cara {
    backface-visibility: hidden;
}
```

**Uso típico:** tarxetas que xiran e amosan contido distinto por diante e por detrás. As dúas caras teñen `backface-visibility: hidden`, e só se ve a que mira cara a ti.

---

## 5. `transform-origin`: o punto de referencia

Por defecto, as transformacións aplícanse respecto ao **centro** do elemento. `transform-origin` cambia ese punto.

```css
transform-origin: center center;   /* por defecto */
transform-origin: top left;        /* esquina superior esquerda */
transform-origin: bottom right;    /* esquina inferior dereita */
transform-origin: 50% 50%;         /* centro (igual ca "center center") */
transform-origin: 0 0;             /* esquina superior esquerda */
transform-origin: left center;     /* bordo esquerdo, centro vertical */
transform-origin: 20px 80px;       /* 20px á dereita, 80px abaixo */
```

**Exemplo:**

```css
/* Xirar respecto á esquina superior esquerda */
.etiqueta {
    transform-origin: top left;
    transform: rotate(-5deg);
}
```

**En 3D**, pódese engadir un terceiro valor (eixe Z):

```css
transform-origin: center center 50px;
```

---

## 6. Exemplo mínimo funcional: tarxeta que se eleva e xira

Vexamos un exemplo que combina varias transformacións.

**Arquivo HTML:**

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transformacións</title>
    <link rel="stylesheet" href="estilos/transformacions.css">
</head>
<body>
    <main class="contido">
        <h1>Transformacións</h1>

        <section class="demo">
            <h2>Tarxetas interactivas</h2>
            <div class="tarxetas">
                <article class="tarxeta">
                    <h3>Elevar</h3>
                    <p>Pasa o rato por riba.</p>
                </article>
                <article class="tarxeta tarxeta-xirar">
                    <h3>Xirar</h3>
                    <p>Pasa o rato por riba.</p>
                </article>
                <article class="tarxeta tarxeta-escalar">
                    <h3>Escalar</h3>
                    <p>Pasa o rato por riba.</p>
                </article>
            </div>
        </section>

        <section class="demo">
            <h2>Tarxeta que xira en 3D</h2>
            <div class="escena">
                <div class="tarxeta-3d">
                    <div class="cara cara-diante">
                        <h3>Fronte</h3>
                        <p>Pasa o rato por riba para ver a parte traseira.</p>
                    </div>
                    <div class="cara cara-tras">
                        <h3>Reverso</h3>
                        <p>Aquí está a información da parte traseira.</p>
                    </div>
                </div>
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
   Tarxetas interactivas
   ============================== */
.tarxetas {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}

.tarxeta {
    background: #f5f5f5;
    padding: 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;

    h3 {
        color: #1a5c8a;
        margin-bottom: 0.5rem;
        font-size: 1.125rem;
    }

    p {
        color: #666;
        font-size: 0.95rem;
    }
}

/* Elevar */
.tarxeta:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

/* Xirar */
.tarxeta-xirar:hover {
    transform: rotate(-3deg) translateY(-4px);
}

/* Escalar */
.tarxeta-escalar:hover {
    transform: scale(1.05);
}

/* ==============================
   Tarxeta que xira en 3D
   ============================== */
.escena {
    perspective: 1000px;
    display: flex;
    justify-content: center;
}

.tarxeta-3d {
    position: relative;
    width: 280px;
    height: 180px;
    transform-style: preserve-3d;
    transition: transform 0.8s ease-in-out;
    cursor: pointer;
}

.tarxeta-3d:hover {
    transform: rotateY(180deg);
}

.cara {
    position: absolute;
    inset: 0;                        /* atallo de top:0;right:0;bottom:0;left:0 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
    border-radius: 12px;
    backface-visibility: hidden;
    text-align: center;

    h3 {
        font-size: 1.25rem;
        margin-bottom: 0.5rem;
    }

    p {
        font-size: 0.9rem;
        opacity: 0.9;
    }
}

.cara-diante {
    background: #1a5c8a;
    color: white;
}

.cara-tras {
    background: #ca8a04;
    color: white;
    transform: rotateY(180deg);   /* a cara traseira está xa xirada */
}

/* ==============================
   Accesibilidade
   ============================== */
@media (prefers-reduced-motion: reduce) {
    .tarxeta,
    .tarxeta-3d {
        transition-duration: 0.01ms !important;
    }
}
```

**Que está a pasar aquí:**

1. **As tarxetas interactivas** usan `transform` para elevarse, xirar ou escalar ao pasar o rato. A transición fai que o cambio sexa suave.
2. **A tarxeta 3D** ten dúas caras (`cara-diante` e `cara-tras`), cada unha con `backface-visibility: hidden`.
3. **`transform-style: preserve-3d`** no contedor mantén a profundidade.
4. **`perspective: 1000px`** na escena dá a sensación de profundidade.
5. **A cara traseira** está pre-xirada 180 graos (`transform: rotateY(180deg)`), o que fai que cando a tarxeta xira 180 graos, se vexa correctamente.
6. **`inset: 0`** é un atallo moderno para `top: 0; right: 0; bottom: 0; left: 0;`.

---

## 7. Casos habituais na práctica

### 7.1 Botóns que se elevan

```css
.boton {
    transition: transform 0.15s ease-out, box-shadow 0.15s ease-out;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    &:active {
        transform: translateY(0);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }
}
```

### 7.2 Iconas que xiran

```css
@keyframes xirar {
    to { transform: rotate(360deg); }
}

.spinner {
    animation: xirar 1s linear infinite;
}
```

### 7.3 Menús que se desprazan

```css
.menu {
    transform: translateX(-100%);
    transition: transform 0.3s ease-out;
}

.menu.aberto {
    transform: translateX(0);
}
```

**Vantaxe:** o menú non afecta ao layout. Pódese superpoñer ao contido.

### 7.4 Tarxetas con efecto hover elaborado

```css
.tarxeta {
    transition: transform 0.3s ease-out;

    &:hover {
        transform: translateY(-4px) scale(1.02);
    }

    &:hover .imaxe {
        transform: scale(1.05);
    }
}
```

**Efecto:** a tarxeta elévase e escálase lixeiramente, e a imaxe dentro tamén se escala. Moito máis rico que só cambiar a cor.

### 7.5 Efecto parallax (simplificado)

```css
@keyframes flotar {
    from { transform: translateY(0); }
    to   { transform: translateY(-10px); }
}

.decoracion {
    animation: flotar 2s ease-in-out infinite alternate;
}
```

### 7.6 Ferramentas de ampliación

```css
.zoom-contedor {
    overflow: hidden;
}

.zoom-contedor img {
    transition: transform 0.5s ease-out;

    &:hover {
        transform: scale(1.1);
    }
}
```

**Nota:** `overflow: hidden` no contedor evita que a imaxe ampliada desborde.

### 7.7 Cubo 3D

```css
.cubo {
    width: 200px;
    height: 200px;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 1s;

    &:hover {
        transform: rotateX(-20deg) rotateY(30deg);
    }
}

.cara {
    position: absolute;
    width: 200px;
    height: 200px;
    backface-visibility: hidden;
}

.cara-fronte { transform: translateZ(100px); }
.cara-tras   { transform: rotateY(180deg) translateZ(100px); }
.cara-dereita { transform: rotateY(90deg) translateZ(100px); }
.cara-esquerda { transform: rotateY(-90deg) translateZ(100px); }
.cara-arriba { transform: rotateX(90deg) translateZ(100px); }
.cara-abaixo { transform: rotateX(-90deg) translateZ(100px); }
```

**Nota:** as caras «pre-xiradas» e logo desprazadas en Z. Isto é un patrón clásico dos cubos 3D.

### 7.8 Centrado perfecto

```css
.centrado {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

Este patrón é moi útil cando se quere centrar un elemento cuxo tamaño non se coñece.

---

## 8. Erros frecuentes

### 8.1 Confundir `transform` con propiedades de layout

```css
/* Mal: move o elemento pero cambia o layout */
.elemento:hover {
    top: -8px;
    left: 20px;
}

/* Ben: só cambia o visual */
.elemento:hover {
    transform: translate(20px, -8px);
}
```

As transformacións **non cambian o layout**. Se queres mover algo sen afectar aos veciños, usa `transform`.

### 8.2 Esquecer `transform-style: preserve-3d`

```css
/* Non funciona: os fillos acháganse ao plano do pai */
.contedor {
    perspective: 1000px;
}

.fillo {
    transform: rotateY(45deg);   /* vese plano */
}

/* Ben */
.contedor {
    perspective: 1000px;
    transform-style: preserve-3d;
}
```

Para que os fillos manteñan as súas transformacións 3D, o pai necesita `transform-style: preserve-3d`.

### 8.3 Esquecer `perspective`

```css
/* Sen perspectiva, as transformacións 3D vense planas */
.elemento {
    transform: rotateY(45deg);   /* vese como unha escala horizontal */
}

/* Ben */
.contedor {
    perspective: 1000px;
}

.elemento {
    transform: rotateY(45deg);   /* agora ten profundidade */
}
```

### 8.4 Esquecer `backface-visibility`

```css
/* Mal: vense as dúas caras superpostas */
.cara {
    position: absolute;
    /* falta backface-visibility: hidden; */
}
```

### 8.5 Orde incorrecta de transformacións

```css
/* Mal: escala antes de xirar */
transform: scale(2) rotate(45deg);

/* Ben: xira antes de escalar (normalmente o que se quere) */
transform: rotate(45deg) scale(2);
```

**Regra xeral:** as transformacións aplícanse de **dereita a esquerda**, coma as funcións matemáticas.

### 8.6 Esquecer o `transition`

```css
/* Sen transición, o cambio é instantáneo */
.tarxeta:hover {
    transform: translateY(-8px);
}

/* Ben */
.tarxeta {
    transition: transform 0.3s ease-out;
}

.tarxeta:hover {
    transform: translateY(-8px);
}
```

### 8.7 Usar `transform` en elementos con `position: fixed`

**Coidado:** se un elemento ten `transform` ou `perspective` distinto de `none`, convértese en **contedor de referencia** para os fillos `position: fixed`. Isto pode romper layouts que contan con que `fixed` se refira á ventá.

**Solución:** se necesitas `fixed` que se refira á ventá, non poñas `transform` no elemento pai.

### 8.8 Non respectar `prefers-reduced-motion`

As transformacións **tamén** se deben reducir cando a persoa o prefire. Inclúe sempre o bloque de accesibilidade.

### 8.9 Abusar de `skew()`

`skew()` **deforma o texto**, o que dificulta a lectura. Úsase con moderación e nunca en textos longos.

### 8.10 Animar `transform` sen considerar o rendemento en 3D

As transformacións 3D son potentes, pero poden ter **custo de rendemento** en dispositivos antigos ou en páxinas con moitos elementos animados. **Comproba o rendemento** en dispositivos reais.

---

## 9. Compatibilidade (2026)

| Característica                                   | Estado                   |
| ------------------------------------------------ | ------------------------ |
| `transform` 2D                                   | Universal desde hai anos |
| `transform` 3D                                   | Universal desde hai anos |
| `perspective`                                    | Universal                |
| `transform-style: preserve-3d`                   | Universal                |
| `backface-visibility`                            | Universal                |
| `transform-origin` con 3 valores                 | Universal                |
| `translate()`, `rotate()`, `scale()` individuais | Baseline desde 2022      |

**Nota:** CSS moderno permite usar `translate`, `rotate` e `scale` **como propiedades individuais**, non só como funcións dentro de `transform`:

```css
.elemento {
    translate: 20px 10px;
    rotate: 45deg;
    scale: 1.2;
}
```

Isto ten dúas vantaxes:

1. **Pódense animar individualmente** sen conflitos.
2. **A orde aplícase sempre igual** (translate → rotate → scale), sen depender da orde de escritura.

**Recomendación:** para proxectos novos, considera usar as propiedades individuais. Para compatibilidade con código antigo, `transform` segue funcionando perfectamente.

---

## 10. Exercicios

### Exercicio 1: Desprazamento

Escribe CSS para que un elemento se desprace 10px cara arriba ao pasar o rato por riba.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.elemento {
    transition: transform 0.3s ease-out;
}

.elemento:hover {
    transform: translateY(-10px);
}
```

</details>


### Exercicio 2: Centrado

Escribe CSS para centrar un elemento cun tamaño descoñecido nun contedor.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.contedor {
    position: relative;
}

.centrado {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

</details>


### Exercicio 3: Rotación

Escribe CSS para que unha icona xire 360 graos continuamente.

<details>
<summary><b>Amosar a solución</b></summary>

```css
@keyframes xirar {
    to { transform: rotate(360deg); }
}

.icone {
    animation: xirar 1s linear infinite;
}
```

</details>


### Exercicio 4: Tarxeta 3D

Escribe o CSS mínimo para unha tarxeta que xira 180 graos sobre o eixe Y ao pasar o rato por riba, con dúas caras.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.escena {
    perspective: 1000px;
}

.tarxeta {
    position: relative;
    width: 200px;
    height: 150px;
    transform-style: preserve-3d;
    transition: transform 0.8s;
}

.tarxeta:hover {
    transform: rotateY(180deg);
}

.cara {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
}

.cara-tras {
    transform: rotateY(180deg);
}
```

</details>


### Exercicio 5: Escala nunha imaxe

Escribe CSS para que unha imaxe dentro dun contedor se amplíe un 10% ao pasar o rato, sen desbordar.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.contedor {
    overflow: hidden;
}

.contedor img {
    transition: transform 0.4s ease-out;
}

.contedor img:hover {
    transform: scale(1.1);
}
```

</details>


### Exercicio 6: Detectar o erro

```css
.tarxeta-3d {
    transform: rotateY(45deg);
    transform-style: preserve-3d;
}

.contedor {
    /* sen perspective */
}
```

Por que a tarxeta non se ve en 3D?

<details>
<summary><b>Amosar a solución</b></summary>

Falta `perspective` no contedor. Sen perspectiva, as transformacións 3D vense planas. Corrección:

```css
.contedor {
    perspective: 1000px;
}

.tarxeta-3d {
    transform: rotateY(45deg);
    transform-style: preserve-3d;
}
```

</details>

---

## 11. Para profundar

- **MDN Web Docs:** [Using CSS transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transforms/Using_CSS_transforms) — guía completa.
- **MDN Web Docs:** [transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) — referencia da propiedade.
- **MDN Web Docs:** [transform-origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin) — referencia.
- **MDN Web Docs:** [perspective](https://developer.mozilla.org/en-US/docs/Web/CSS/perspective) — referencia.
- **MDN Web Docs:** [translate](https://developer.mozilla.org/en-US/docs/Web/CSS/translate), [rotate](https://developer.mozilla.org/en-US/docs/Web/CSS/rotate), [scale](https://developer.mozilla.org/en-US/docs/Web/CSS/scale) — propiedades individuais.
- **web.dev:** [Learn CSS: Transforms](https://web.dev/learn/css/transforms) — lección interactiva.
- **David DeSandro:** [Intro to CSS 3D transforms](https://3dtransforms.desandro.com/) — guía visual excelente.
- **W3C:** [CSS Transforms Module Level 1](https://www.w3.org/TR/css-transforms-1/) e [Level 2](https://www.w3.org/TR/css-transforms-2/) — especificacións.

---

## 12. Referencias cruzadas

- **Capítulo 6: `display`, fluxo normal e posicionamento** — as transformacións son alternativas a `top`/`left`.
- **Capítulo 18: Transicións e animacións** — as transformacións son unha das propiedades máis animadas.
- **Capítulo 21: Filtros, blend modes e masking** — outro grupo de propiedades visuais avanzadas.
- **Capítulo 22: Scroll-driven animations** — as transformacións poden depender do scroll.
- **Capítulo 24: Rendemento e boas prácticas** — as transformacións son moi eficientes, pero hai que usalas con coidado.
- **Capítulo 26: Accesibilidade e CSS** — `prefers-reduced-motion` tamén se aplica aquí.

---

**Data de creación:** 2026-09-17  
**Última revisión:** 2026-09-17  
**Estado:** Borrador para validación
---
title: "Propiedades personalizadas (variables CSS)"
description: "Uso das propiedades personalizadas CSS para reutilizar valores, manter a coherencia e crear temas dinámicos."
bloque: 5
capitulo: 14
nivel: intermedio
ultima_revision: "2026-09-17"
estado: "borrador_para_validacion"
compatibilidade: "universal"
palabras_chave:
  - propiedades_personalizadas
  - variables_CSS
  - custom_properties
  - var
  - tema
  - reutilizacion
  - maintainability
  - scope
  - cascada
---

<!-- # Capítulo 14: Propiedades personalizadas (variables CSS) -->

> As **propiedades personalizadas** (tamén chamadas **variables CSS**) permiten gardar valores reutilizables nunha folla de estilo. Unha vez definidas, pódense usar en calquera regra. Isto evita repetir valores, fai o CSS máis fácil de manter, e permite cambiar todo un tema (cores, tamaños, espazados) modificando só unhas poucas liñas. Este capítulo explica que son, como se definen, como se usan, e que diferenzas teñen con outras solucións como as variables de preprocesadores (Sass, Less).

---

## 1. Introdución: o problema da repetición

Imaxina que estás a escribir CSS para un sitio web cunha cor principal azul (`#1a5c8a`). Esta cor aparece en decenas de sitios: na cor de fondo da cabeceira, nos títulos, nos botóns, nas ligazóns, nos bordos de certos elementos, etc.

```css
.cabecera { background: #1a5c8a; }
h1, h2 { color: #1a5c8a; }
.boton { background: #1a5c8a; color: white; }
a { color: #1a5c8a; }
.tarxeta { border-left: 4px solid #1a5c8a; }
```

Agora imaxina que queres cambiar esa cor por un verde. Tes que buscar todas as ocurrencias de `#1a5c8a` no arquivo e cambialas unha a unha. Se esqueces algunha, o sitio queda con cores mesturadas. Se o arquivo é grande, isto pode ser moi tedioso e propenso a erros.

**As propiedades personalizadas** resolven este problema. Defines a cor unha vez, cun nome, e despois usas ese nome en todas as regras:

```css
:root {
    --cor-primaria: #1a5c8a;
}

.cabecera { background: var(--cor-primaria); }
h1, h2 { color: var(--cor-primaria); }
.boton { background: var(--cor-primaria); color: white; }
a { color: var(--cor-primaria); }
.tarxeta { border-left: 4px solid var(--cor-primaria); }
```

Agora, se queres cambiar a cor, só tes que modificar unha liña:

```css
:root {
    --cor-primaria: #2d7a3e;   /* agora é verde */
}
```

**Todo o sitio actualízase automaticamente.** Este é o poder das propiedades personalizadas: son o mecanismo que permite ter un **sistema de deseño coherente** en CSS.

Ademais das cores, úsanse para:

- Espazados consistentes (`--espazado-sm`, `--espazado-md`, `--espazado-lg`).
- Tamaños de fonte dunha escala tipográfica.
- Radios de bordo.
- Sombras.
- Transicións e animacións.
- Practicamente calquera valor que se repita.

> 💡 **Para pensar:** as propiedades personalizadas son un dos cambios máis grandes que experimentou CSS na última década. Antes delas, para ter variables había que usar preprocesadores como Sass ou Less. Agora xa non é necesario: CSS ten as súas propias variables, que ademais son **dinámicas** (pódense cambiar en tempo de execución, mesmo con JavaScript). Isto é algo que os preprocesadores non poden facer.

---

## 2. Conceptos fundamentais

### 2.1 Que é unha propiedade personalizada

Unha **propiedade personalizada** é unha propiedade CSS que **comeza por dous guións** (`--`) e que **ti defines**. Non son propiedades estándar de CSS, senón que as inventas ti para gardar valores.

```css
--cor-primaria: #1a5c8a;
--espazado: 1rem;
--radio-bordo: 8px;
```

**Características:**

- O nome **debe** empezar por `--`.
- O nome é **sensible a maiúsculas e minúsculas** (`--Cor` e `--cor` son diferentes).
- O valor pode ser calquera cousa: unha cor, unha lonxitude, unha palabra, unha función, unha lista de valores...
- Defínense coma calquera propiedade, dentro dunha regra CSS.
- **Herédanse** dos pais aos fillos (isto é moi importante, ver 2.4).

#### 2.2 Como se usan: a función `var()`

Para usar unha propiedade personalizada, úsase a función `var()`:

```css
.boton {
    background: var(--cor-primaria);
    padding: var(--espazado);
    border-radius: var(--radio-bordo);
}
```

`var()` substitúe o nome da variable polo seu valor. O navegador calcula isto en tempo real.

### 2.3 Onde se definen

O lugar máis común para definir variables é a **pseudo-clase `:root`**, que representa o elemento `<html>`:

```css
:root {
    --cor-primaria: #1a5c8a;
    --cor-texto: #333;
    --espazado: 1rem;
}
```

`:` `root` é equivalente a escribir `html`, pero ten unha especificidade lixeiramente maior e é a convención para variables globais. **Usa `:root` para variables globais.**

Tamén podes definir variables **locais** dentro dun compoñente concreto:

```css
.tarxeta {
    --cor-tarxeta: #f5f5f5;
    background: var(--cor-tarxeta);
}
```

Estas variables só existen dentro de `.tarxeta` e os seus descendentes.

### 2.4 Herdanza: a propiedade máis importante

As propiedades personalizadas **herédanse** coma `color` ou `font-family`. Isto significa que se defines unha variable nun elemento, todos os seus descendentes poden usala.

```css
:root {
    --cor-primaria: #1a5c8a;
}

body {
    color: var(--cor-primaria);   /* funciona */
}

.boton {
    background: var(--cor-primaria);   /* funciona */
}

.tarxeta a {
    color: var(--cor-primaria);   /* funciona */
}
```

Todos os elementos do documento poden acceder a `--cor-primaria` porque está definida en `:root`, que é o antepasado de todo.

**Pero tamén se poden redefinir localmente:**

```css
:root {
    --cor-primaria: #1a5c8a;
}

.alerta {
    --cor-primaria: #cc0000;   /* redefine localmente */
    background: var(--cor-primaria);   /* usa o local: vermello */
    color: white;
}

.outro-elemento {
    background: var(--cor-primaria);   /* usa o global: azul */
}
```

Isto é moi útil para crear variantes de compoñentes: defines unha variable global e redefínela en casos concretos.

### 2.5 Diferencia coas variables de Sass

Se vés do mundo de Sass ou Less, hai unha diferenza clave que hai que entender:

| Aspecto                        | Variables Sass          | Variables CSS         |
| ------------------------------ | ----------------------- | --------------------- |
| Cando se calculan              | En tempo de compilación | En tempo de execución |
| Pódense cambiar con JavaScript | Non                     | Si                    |
| Poden cambiar segundo contexto | Non                     | Si (herdanza)         |
| Poden usarse en media queries  | Non                     | Si                    |
| Necesitan compilador           | Si                      | Non                   |

**Exemplo práctico:** cunha variable Sass, o valor `--cor-primaria` queda fixado no CSS compilado. Nunha variable CSS, o valor é dinámico e pódese cambiar en calquera momento.

```javascript
// Con variables CSS, pódese cambiar dende JavaScript
document.documentElement.style.setProperty('--cor-primaria', '#2d7a3e');
```

Isto permite **cambiar o tema dun sitio en tempo real**, sen recargar a páxina.

---

## 3. Sintaxe

### 3.1 Definir unha variable

```css
:root {
    --nome-da-variable: valor;
}
```

**Exemplos:**

```css
:root {
    --cor-primaria: #1a5c8a;
    --cor-secundaria: #ca8a04;
    --cor-texto: #333;
    --cor-fondo: #fafafa;

    --espazado-xs: 0.25rem;
    --espazado-sm: 0.5rem;
    --espazado-md: 1rem;
    --espazado-lg: 2rem;
    --espazado-xl: 4rem;

    --radio-sm: 4px;
    --radio-md: 8px;
    --radio-lg: 16px;
    --radio-circular: 50%;

    --sombra-suave: 0 2px 8px rgba(0, 0, 0, 0.06);
    --sombra-forte: 0 4px 16px rgba(0, 0, 0, 0.12);

    --transicion-rapida: 0.15s ease;
    --transicion-normal: 0.3s ease;
}
```

### 3.2 Usar unha variable

```css
.boton {
    background: var(--cor-primaria);
    padding: var(--espazado-md) var(--espazado-lg);
    border-radius: var(--radio-md);
    box-shadow: var(--sombra-suave);
    transition: transform var(--transicion-rapida);
}
```

### 3.3 Valores de reserva (fallback)

`var()` acepta un segundo argumento: un **valor de reserva** que se usa se a variable non está definida.

```css
.boton {
    background: var(--cor-primaria, #1a5c8a);
    /* se --cor-primaria non existe, usa #1a5c8a */
}
```

**Cando usar fallback:** cando queres que un compoñente funcione aínda que a variable global non estea definida. Moi útil en compoñentes reutilizables.

```css
.boton {
    background: var(--cor-boton, var(--cor-primaria, #1a5c8a));
    /* intenta --cor-boton, despois --cor-primaria, despois #1a5c8a */
}
```

**Nota:** o fallback só se usa se a variable **non está definida** ou se o seu valor é **inválido**. Non se usa se a variable está definida cun valor «baleiro» (aínda que isto é un caso estraño).

### 3.4 Variables que usan outras variables

Unha variable pode usar outra:

```css
:root {
    --cor-base: #1a5c8a;
    --cor-hover: color-mix(in oklch, var(--cor-base) 80%, black);
    --cor-suave: color-mix(in oklch, var(--cor-base) 20%, white);
}
```

Isto permite construír **sistemas de deseño** moi flexibles: cambias a cor base e todas as súas variacións actualízanse automaticamente.

---

## 4. Exemplo mínimo funcional

Vexamos un exemplo completo: un sistema de cores e espazados que se usa nunha pequena páxina.

**Arquivo HTML:**

```html
<!DOCTYPE html>
<html lang="gl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Variables CSS</title>
    <link rel="stylesheet" href="estilos/variables.css">
</head>
<body>
    <header class="cabecera">
        <h1>O meu sitio</h1>
    </header>

    <main class="contido">
        <article class="tarxeta">
            <h2>Un artigo</h2>
            <p>Un texto de exemplo.</p>
            <button class="boton">Ler máis</button>
        </article>

        <article class="tarxeta tarxeta-destacada">
            <h2>Outro artigo destacado</h2>
            <p>Este ten unha cor diferente porque redefine a variable.</p>
            <button class="boton">Ler máis</button>
        </article>
    </main>
</body>
</html>
```

**Arquivo CSS:**

```css
/* ==============================
   Sistema de deseño (variables)
   ============================== */
:root {
    /* Cores */
    --cor-primaria: #1a5c8a;
    --cor-primaria-escura: #0d3a5c;
    --cor-texto: #333;
    --cor-texto-suave: #666;
    --cor-fondo: #fafafa;
    --cor-fondo-tarxeta: #ffffff;
    --cor-bordo: #e5e5e5;

    /* Espazados */
    --espazado-xs: 0.25rem;
    --espazado-sm: 0.5rem;
    --espazado-md: 1rem;
    --espazado-lg: 1.5rem;
    --espazado-xl: 2rem;

    /* Bordos */
    --radio-sm: 4px;
    --radio-md: 8px;
    --radio-lg: 16px;

    /* Sombras */
    --sombra-suave: 0 2px 8px rgba(0, 0, 0, 0.06);
    --sombra-forte: 0 4px 16px rgba(0, 0, 0, 0.12);

    /* Transicións */
    --transicion: 0.2s ease;
}

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
    color: var(--cor-texto);
    background: var(--cor-fondo);
}

/* ==============================
   Cabeceira
   ============================== */
.cabecera {
    background: var(--cor-primaria);
    color: white;
    padding: var(--espazado-lg) var(--espazado-xl);
}

/* ==============================
   Contido
   ============================== */
.contido {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
    gap: var(--espazado-lg);
    padding: var(--espazado-xl);
    max-width: 1200px;
    margin: 0 auto;
}

.tarxeta {
    background: var(--cor-fondo-tarxeta);
    padding: var(--espazado-lg);
    border-radius: var(--radio-md);
    border: 1px solid var(--cor-bordo);
    box-shadow: var(--sombra-suave);
    transition: box-shadow var(--transicion);
}

.tarxeta:hover {
    box-shadow: var(--sombra-forte);
}

.tarxeta h2 {
    color: var(--cor-primaria);
    margin-bottom: var(--espazado-md);
}

.tarxeta p {
    color: var(--cor-texto-suave);
    margin-bottom: var(--espazado-lg);
}

/* ==============================
   Variante de tarxeta: redefine variables localmente
   ============================== */
.tarxeta-destacada {
    --cor-primaria: #ca8a04;   /* só afecta a esta tarxeta */
    --cor-bordo: #f5e6a8;
}

/* ==============================
   Botóns
   ============================== */
.boton {
    background: var(--cor-primaria);
    color: white;
    padding: var(--espazado-sm) var(--espazado-lg);
    border: none;
    border-radius: var(--radio-sm);
    cursor: pointer;
    font-size: 1rem;
    transition: background var(--transicion);
}

.boton:hover {
    background: var(--cor-primaria-escura);
}
```

**Que está a pasar aquí:**

1. **`:root`** define un sistema completo de deseño: cores, espazados, bordos, sombras, transicións.
2. **Todas as regras usan variables** en lugar de valores literais. Non hai ningún `#1a5c8a` espallado polo arquivo.
3. **`.tarxeta-destacada`** redefine `--cor-primaria` localmente. Isto fai que os elementos dentro desa tarxeta (o título, o botón) usen unha cor distinta, **sen tocar ningunha outra regra**.
4. **Cambiar o tema** é tan simple como modificar unhas poucas liñas en `:root`.

**Se cambias `--cor-primaria` en `:root` a `#2d7a3e`**, toda a páxina pasa a verde, excepto a tarxeta destacada, que mantén a súa cor local (amarela).

---

## 5. Casos habituais na práctica

### 5.1 Sistema de cores

```css
:root {
    --cor-primaria: #1a5c8a;
    --cor-secundaria: #ca8a04;
    --cor-exito: #2d7a3e;
    --cor-erro: #cc0000;
    --cor-aviso: #cc6600;
    --cor-info: #0d3a5c;

    --cor-texto: #333;
    --cor-texto-suave: #666;
    --cor-fondo: #fafafa;
    --cor-bordo: #e5e5e5;
}
```

### 5.2 Escala de espazados

```css
:root {
    --esp-1: 0.25rem;   /* 4px */
    --esp-2: 0.5rem;    /* 8px */
    --esp-3: 1rem;      /* 16px */
    --esp-4: 1.5rem;    /* 24px */
    --esp-5: 2rem;      /* 32px */
    --esp-6: 3rem;      /* 48px */
    --esp-7: 4rem;      /* 64px */
}
```

**Vantaxe:** usar unha escala coherente fai que todos os espazados da páxina estean relacionados. Xa non hai «1.3rem aquí, 1.7rem alí, 2.1rem máis alá». Hai unha escala que se usa sempre.

### 5.3 Escala tipográfica

```css
:root {
    --texto-xs: 0.75rem;
    --texto-sm: 0.875rem;
    --texto-base: 1rem;
    --texto-lg: 1.125rem;
    --texto-xl: 1.25rem;
    --texto-2xl: 1.5rem;
    --texto-3xl: 1.875rem;
    --texto-4xl: 2.25rem;
}

h1 { font-size: var(--texto-4xl); }
h2 { font-size: var(--texto-3xl); }
h3 { font-size: var(--texto-2xl); }
p  { font-size: var(--texto-base); }
```

**Escala modular:** a maioría das escalas tipográficas seguen unha progresión (por exemplo, multiplicar por 1.2 cada vez). Definir a escala como variables fai que todos os tamaños estean relacionados.

### 5.4 Temas claros e escuros

```css
:root {
    --cor-fondo: #ffffff;
    --cor-texto: #333333;
    --cor-bordo: #e5e5e5;
}

@media (prefers-color-scheme: dark) {
    :root {
        --cor-fondo: #1a1a1a;
        --cor-texto: #e0e0e0;
        --cor-bordo: #333333;
    }
}

body {
    background: var(--cor-fondo);
    color: var(--cor-texto);
}
```

**Só redefinindo as variables**, toda a páxina cambia a modo escuro. Non hai que duplicar o CSS.

### 5.5 Redefinición local en compoñentes

```css
.boton {
    --cor-boton: var(--cor-primaria);
    background: var(--cor-boton);
    color: white;
}

.boton-erro {
    --cor-boton: var(--cor-erro);
}

.boton-exito {
    --cor-boton: var(--cor-exito);
}
```

Os botóns comparten estrutura pero cambian a cor dun xeito moi limpo.

### 5.6 Variables calculadas con `calc()`

```css
:root {
    --espazado-base: 1rem;
    --espazado-pequeno: calc(var(--espazado-base) * 0.5);
    --espazado-grande: calc(var(--espazado-base) * 2);
}

.tarxeta {
    padding: var(--espazado-base);
    margin-bottom: var(--espazado-grande);
}
```

Isto permite que todas as variables de espazado estean relacionadas. Se cambias `--espazado-base`, todo se actualiza.

### 5.7 Redefinir con `@media`

```css
:root {
    --espazado-seccion: clamp(2rem, 5vw, 5rem);
}

@media (min-width: 1024px) {
    :root {
        --espazado-seccion: clamp(4rem, 6vw, 8rem);
    }
}
```

Útil para adaptar temas enteiros a distintos contextos.

---

## 6. A regra `@property`: variables con tipo

En 2024, CSS engadiu unha característica que amplía as posibilidades das variables: **`@property`**. Permite **declarar unha variable cun tipo, un valor inicial e se se herda ou non**.

### 6.1 Sintaxe

```css
@property --cor-primaria {
    syntax: "<color>";
    initial-value: #1a5c8a;
    inherits: true;
}
```

**Compoñentes:**

- **`syntax`:** o tipo de valor. Algúns valores: `<color>`, `<length>`, `<number>`, `<percentage>`, `<length-percentage>`, `*` (calquera cousa).
- **`initial-value`:** valor por defecto.
- **`inherits`:** se se herda (`true`) ou non (`false`).

### 6.2 Por que isto é útil

Tres cousas:

1. **Validación:** se unha variable ten tipo `<color>` e lle dás un valor inválido, o navegador ignora o valor inválido e usa o inicial. Sen tipo, calquera cousa é aceptada (ata que se usa e falla).

2. **Animación:** as variables sen tipo **non se poden animar**. As variables con `@property` si.

```css
@property --rotacion {
    syntax: "<angle>";
    initial-value: 0deg;
    inherits: false;
}

.boton {
    --rotacion: 0deg;
    transform: rotate(var(--rotacion));
    transition: --rotacion 0.3s;
}

.boton:hover {
    --rotacion: 5deg;
}
```

O botón xira suavemente ao pasar o rato por riba. Sen `@property`, isto non funcionaría.

3. **Valor inicial:** garante que a variable teña sempre un valor, mesmo se non foi definida explicitamente.

**Estado en 2026:** `@property` está en Baseline desde 2024. Pódese usar, pero hai que comprobar en [web.dev/baseline](https://web.dev/baseline) a compatibilidade exacta en función do caso.

---

## 7. Variables CSS e JavaScript

Unha das grandes vantaxes das variables CSS é que se poden manipular desde JavaScript en tempo de execución.

**Ler unha variable:**

```javascript
const valor = getComputedStyle(document.documentElement)
    .getPropertyValue('--cor-primaria');
```

**Modificar unha variable:**

```javascript
document.documentElement.style.setProperty('--cor-primaria', '#2d7a3e');
```

**Modificar localmente nun elemento:**

```javascript
const elemento = document.querySelector('.tarxeta-destacada');
elemento.style.setProperty('--cor-primaria', '#ca8a04');
```

**Exemplo práctico: un interruptor de tema**

```html
<button id="cambiar-tema">Cambiar tema</button>
```

```javascript
const raiz = document.documentElement;
const boton = document.getElementById('cambiar-tema');

boton.addEventListener('click', () => {
    const actual = raiz.style.getPropertyValue('--cor-fondo');
    if (actual === '#1a1a1a') {
        raiz.style.setProperty('--cor-fondo', '#ffffff');
        raiz.style.setProperty('--cor-texto', '#333333');
    } else {
        raiz.style.setProperty('--cor-fondo', '#1a1a1a');
        raiz.style.setProperty('--cor-texto', '#e0e0e0');
    }
});
```

Unha funcionalidade que cambiaría moito CSS agora require só unhas liñas de JavaScript.

---

## 8. Erros frecuentes

### 8.1 Esquecer os dous guións

```css
/* Mal: isto non é unha variable, é unha propiedade CSS descoñecida */
:root {
    cor-primaria: #1a5c8a;
}

/* Ben */
:root {
    --cor-primaria: #1a5c8a;
}
```

O nome **debe** comezar por `--`. Sen iso, non é unha variable.

### 8.2 Usar `var()` sen parénteses ou mal escrito

```css
/* Mal */
background: var --cor-primaria;
background: var(--cor-primaria;
background: var-(-cor-primaria);

/* Ben */
background: var(--cor-primaria);
```

A sintaxe é sempre `var(--nome-da-variable)`.

### 8.3 Usar unha variable non definida

```css
.boton {
    background: var(--cor-primaria);   /* se non existe, non se aplica nada */
}
```

Se a variable non existe e non hai fallback, a propiedade **ignórase completamente**. Isto pode levar a estilos que «non se aplican» sen unha mensaxe de erro clara.

**Solución:** usar fallback, ou asegurar que a variable estea definida.

```css
.boton {
    background: var(--cor-primaria, #1a5c8a);
}
```

### 8.4 Esperar que as variables funcionen en nomes de propiedades

```css
/* Isto NON funciona */
:root {
    --propiedade: background-color;
}

.boton {
    var(--propiedade): red;   /* erro */
}
```

As variables **non substitúen nomes de propiedades**, só valores. Isto non é posible en CSS estándar.

### 8.5 Esperar que as variables funcionen en media queries

```css
/* Isto NON funciona directamente */
:root {
    --breakpoint: 768px;
}

@media (min-width: var(--breakpoint)) {   /* non se pode */
    /* ... */
}
```

As variables **non se poden usar en condicións de media queries**, porque as media queries se avalían antes de que existan as variables. Isto é unha limitación do CSS actual.

**Solución:** usar valores literais nas media queries, ou agrupar os breakpoints nun arquivo de constantes (con Sass ou unha ferramenta similar).

### 8.6 Usar variables sen herdar

```css
.tarxeta {
    --cor: red;
}

.boton {
    background: var(--cor);   /* funciona, herédase */
}

.irmao {
    background: var(--cor);   /* NON funciona: non é descendente */
}
```

As variables só se herdan **cara abaixo** (de pais a fillos). Nun elemento irmán non están dispoñibles.

### 8.7 Confundir `var()` con nomes de propiedades

```css
/* Mal */
var(--cor-primaria): red;

/* Ben */
background-color: var(--cor-primaria);
```

`var()` **só se usa no lado do valor**, nunca no lado da propiedade.

### 8.8 Non poñer espazos ao redor dos dous guións

```css
/* Mal: isto non define unha variable, define unha propiedade chamada "--" cun valor raro */
:root {
    -- cor-primaria: #1a5c8a;
}

/* Ben */
:root {
    --cor-primaria: #1a5c8a;
}
```

Os dous guións van xuntos, sen espazo.

---

## 9. Compatibilidade (2026)

| Característica                         | Estado                  |
| -------------------------------------- | ----------------------- |
| Variables CSS (`--nome` e `var()`)     | Universal desde 2017    |
| Fallback en `var()`                    | Universal               |
| Variables en `calc()`                  | Universal               |
| `@property`                            | Baseline desde 2024     |
| Animación de variables con `@property` | Baseline desde 2024     |
| `env()` e variables do sistema         | Universal (con matices) |

As variables CSS están completamente estabilizadas. Podes usalas sen preocupacións.

---

## 10. Exercicios

### Exercicio 1: Definir variables

Define en `:root` tres variables: `--cor-primaria`, `--espazado` e `--radio`.

<details>
<summary><b>Amosar a solución</b></summary>

```css
:root {
    --cor-primaria: #1a5c8a;
    --espazado: 1rem;
    --radio: 8px;
}
```

</details>


### Exercicio 2: Usar variables

Dado este CSS, cambia os valores literais por variables:

```css
.boton {
    background: #1a5c8a;
    padding: 1rem;
    border-radius: 8px;
    color: white;
}

.tarxeta {
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #1a5c8a;
}
```

<details>
<summary><b>Amosar a solución</b></summary>

```css
:root {
    --cor-primaria: #1a5c8a;
    --espazado: 1rem;
    --radio: 8px;
}

.boton {
    background: var(--cor-primaria);
    padding: var(--espazado);
    border-radius: var(--radio);
    color: white;
}

.tarxeta {
    padding: var(--espazado);
    border-radius: var(--radio);
    border: 1px solid var(--cor-primaria);
}
```

</details>


### Exercicio 3: Redefinición local

Crea unha variante `.boton-perigo` que redefina `--cor-primaria` a `#cc0000` localmente, sen tocar a definición global.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.boton-perigo {
    --cor-primaria: #cc0000;
}

.boton-perigo {
    background: var(--cor-primaria);
}
```

</details>


### Exercicio 4: Fallback

Escribe un `.boton` que use `--cor-boton` se existe, senón `--cor-primaria`, e se tampouco existe, use `#1a5c8a`.

<details>
<summary><b>Amosar a solución</b></summary>

```css
.boton {
    background: var(--cor-boton, var(--cor-primaria, #1a5c8a));
}
```

</details>

### Exercicio 5: Tema escuro

Define variables de cor para un tema claro e, nunha media query de `prefers-color-scheme: dark`, redefineas para un tema escuro.

<details>
<summary><b>Amosar a solución</b></summary>

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

</details>

 
### Exercicio 6: Detectar o erro

```css
:root {
    cor-primaria: #1a5c8a;
    --espazado = 1rem;
    --radio-bordo: 8px;
}

.boton {
    background: var(cor-primaria);
    padding: var(--espazado);
    border-radius: var(--radio-bordo, 4px);
}
```

Atopa tres erros.

<details>
<summary><b>Amosar a solución</b></summary>

1. `cor-primaria: #1a5c8a;` non ten os dous guións. Debe ser `--cor-primaria: #1a5c8a;`.
2. `--espazado = 1rem;` usa `=` en lugar de `:`. Debe ser `--espazado: 1rem;`.
3. `var(cor-primaria)` non ten os dous guións dentro de `var()`. Debe ser `var(--cor-primaria)`.

</details>

---

## 11. Para profundar

- **MDN Web Docs:** [Using CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) — guía completa.
- **MDN Web Docs:** [var()](https://developer.mozilla.org/en-US/docs/Web/CSS/var) — referencia da función.
- **MDN Web Docs:** [@property](https://developer.mozilla.org/en-US/docs/Web/CSS/@property) — referencia da at-rule.
- **web.dev:** [Learn CSS: Custom properties](https://web.dev/learn/css/custom-properties) — lección interactiva.
- **Ahmad Shadeed:** [Everything about CSS Variables](https://ishadeed.com/article/css-variables/) — artigo detallado.
- **Lea Verou:** [CSS Variables](https://lea.verou.me/2016/09/css-variables/) — artigo histórico de Lea Verou sobre as variables.
- **W3C:** [CSS Custom Properties for Cascading Variables Module Level 1](https://www.w3.org/TR/css-variables-1/) — especificación.

---

## 12. Referencias cruzadas

- **Capítulo 4: Cores, tipografía e unidades** — as variables úsanse para gardar cores, tamaños e unidades.
- **Capítulo 11: Media queries** — as variables redefínense a miúdo en media queries para temas.
- **Capítulo 12: Container queries** — as style queries traballan con variables CSS.
- **Capítulo 13: Unidades relativas e funcións modernas** — as variables combínanse con `clamp()`, `calc()`, etc.
- **Capítulo 15: Aniñamento nativo** — as variables e o aniñado combínanse moi ben.
- **Capítulo 17: Funcións de cor modernas** — `color-mix()` e outras funcións son moi útiles con variables.
- **Capítulo 24: Rendemento e boas prácticas** — como organizar variables para non perder o control.

---

**Data de creación:** 2026-09-17  
**Última revisión:** 2026-09-17  
**Estado:** Borrador para validación
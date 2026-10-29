# Manual de CSS Moderno en Galego

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Un manual de referencia de CSS en galego, escrito para ser útil tanto a quen está a aprender desde cero como a quen xa programa e quere consultar un tema concreto.

## 📖 Descripción

Este manual cobre CSS desde o máis elemental ata técnicas avanzadas, cun enfoque que combina explicación humana e uso práctico. Está organizado en sete bloques:

- **Bloque 0**: Introdución e guía de uso
- **Bloque 1**: Fundamentos (sintaxe, selectores, cores, modelo de caixa)
- **Bloque 2**: Maquetación clásica (display, fluxo, posicionamento, floats)
- **Bloque 3**: Maquetación moderna (Flexbox, Grid, Subgrid)
- **Bloque 4**: Adaptabilidade (media queries, container queries, unidades modernas)
- **Bloque 5**: CSS moderno (variables, aniñamento, pseudo-clases, funcións de cor)
- **Bloque 6**: Avanzado (animacións, transformacións, filtros, @layer, @scope, @supports)
- **Bloque 7**: Anexos (glosario, táboa de propiedades, recursos externos)

## 🚀 Desenvolvemento

Este proxecto está construído con [Astro](https://astro.build/) e [Starlight](https://starlight.astro.build/).

### Estrutura do proxecto

```
.
├── public/
├── src/
│   ├── assets/
│   ├── content/
│   │   ├── docs/          # Contido do manual en markdown
│   │   └── i18n/          # Traducións da interfaz
│   └── content.config.ts
├── astro.config.mjs       # Configuración de Astro/Starlight
├── package.json
└── tsconfig.json
```

### Comandos

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Instala as dependencias                          |
| `npm run dev`             | Inicia servidor local en `localhost:4321`        |
| `npm run build`           | Constrúe o sitio de produción en `./dist/`      |
| `npm run preview`         | Previsualiza a construción localmente            |
| `npm run generate-pdf`     | Xera un PDF do manual completo                   |

### Validacións

O proxecto inclúe validacións automáticas que se executan antes de cada commit:

- `node check-utf8.cjs` - Verifica codificación UTF-8
- `node lint-css-examples.cjs` - Valida sintaxe CSS dos exemplos
- `node check-links.cjs` - Verifica ligazóns markdown

## 🤝 Contribución

Contribucións son benvidas! Por favor le o arquivo [CONTRIBUTING.md](CONTRIBUTING.md) para máis información sobre como contribuír.

Para informar de erros ou suxerir melloras, abre unha incidencia en [GitHub Issues](https://github.com/nunhes/manual-css-galego/issues).

## � Licenza

Este proxecto está baixo a licenza MIT. Consulta o arquivo [LICENSE](LICENSE) para máis detalles.

## 🌟 Características

- Contido completo en galego estándar
- Sitio web estático construído con Astro/Starlight
- Validacións automáticas de contido
- Xeración automática de PDF
- Metadatos estruturados para cada capítulo
- Sistema de busca integrado
- Diseño responsivo
- Modo escuro automático

## 📚 Recursos

- [Documentación de Starlight](https://starlight.astro.build/)
- [Documentación de Astro](https://docs.astro.build)
<!-- [Manual orixinal de CSS](../manual/) -->

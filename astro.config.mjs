// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://nunhes.github.io",
  base: "/manual-css-galego",

  integrations: [
    starlight({
      title: "CSS Moderno",
      description:
        "Manual de referencia de CSS en galego, desde fundamentos ata técnicas avanzadas",
      components: {
        SiteTitle: "./src/components/CustomSiteTitle.astro",
        PageTitle: "./src/components/CustomPageTitle.astro",
      },
      logo: {
        src: "./public/logo.png",
        alt: "Logo do manual de CSS en galego",
      },
      favicon: "/favicon.svg",
      /*theme: "dark",
       themeConfig: {
        darkMode: "class",
      }, */
      /* footer: {
        text: "© 2017 nunhes",
        links: [
          {
            label: "GitHub",
            href: "https://github.com/nunhes/manual-css-galego",
          },
        ],
      }, */
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/nunhes/manual-css-galego",
        },
      ],
      /* editLink: {
        label: "Editar esta páxina",
        href: ({ filePath }) => {
          return `https://github.com/nunhes/manual-css-galego/edit/main/src/content/docs/${filePath}`;
        },
      }, */
      defaultLocale: "gl",
      locales: {
        gl: {
          label: "Galego",
          dir: "ltr",
          lang: "gl",
        },
      },
      sidebar: [
        {
          label: "Introdución e guía de uso",
          collapsed: true,
          items: [
            {
              label: "Que é este manual",
              slug: "00-introducion/00-que-e-este-manual",
            },
            {
              label: "Como usar este manual",
              slug: "00-introducion/01-como-usalo",
            },
            { label: "Convencións", slug: "00-introducion/02-convencions" },
            {
              label: "Probar exemplos",
              slug: "00-introducion/03-probar-exemplos",
            },
          ],
        },
        {
          label: "Fundamentos",
          collapsed: true,
          items: [
            { label: "Que é CSS", slug: "01-fundamentos/01-que-e-css" },
            { label: "Sintaxe", slug: "01-fundamentos/02-sintaxe" },
            {
              label: "Selectores básicos",
              slug: "01-fundamentos/03-selectores-basicos",
            },
            {
              label: "Cores, tipografía e unidades",
              slug: "01-fundamentos/04-cores-tipografia-unidades",
            },
            {
              label: "Modelo de caixa",
              slug: "01-fundamentos/05-modelo-caixa",
            },
            {
              label: "HTML semántico e CSS",
              slug: "01-fundamentos/06-html-semantico-css",
            },
          ],
        },
        {
          label: "Maquetación clásica",
          collapsed: true,
          items: [
            {
              label: "\`display\`, fluxo e posicionamento",
              slug: "02-maquetacion-clasica/01-display-fluxo-posicionamento",
            },
            { label: "\`float\`",
              slug: "02-maquetacion-clasica/02-floats" },
          ],
        },
        {
          label: "Maquetación moderna",
          collapsed: true,
          items: [
            { label: "Flexbox",
              slug: "03-maquetacion-moderna/01-flexbox" },
            { label: "Grid", slug: "03-maquetacion-moderna/02-grid" },
            {
              label: "Subgrid e grellas avanzadas",
              slug: "03-maquetacion-moderna/03-subgrid-grellas-avanzadas",
            },
          ],
        },
        {
          label: "Adaptabilidade",
          collapsed: true,
          items: [
            {
              label: "Media queries",
              slug: "04-adaptabilidade/01-media-queries",
            },
            {
              label: "Container queries",
              slug: "04-adaptabilidade/02-container-queries",
            },
            {
              label: "Unidades e funcións modernas",
              slug: "04-adaptabilidade/03-unidades-funcions-modernas",
            },
          ],
        },
        {
          label: "CSS moderno",
          collapsed: true,
          items: [
            {
              label: "Propiedades personalizadas",
              slug: "05-css-moderno/01-propiedades-personalizadas",
            },
            {
              label: "Aniñado nativo",
              slug: "05-css-moderno/02-aninamento-nativo",
            },
            {
              label: "Pseudoclases e pseudoelementos",
              slug: "05-css-moderno/03-pseudoclases-pseudoelementos",
            },
            {
              label: "Funcións de cor modernas",
              slug: "05-css-moderno/04-funcions-cor-modernas",
            },
          ],
        },
        {
          label: "Avanzado",
          collapsed: true,
          items: [
            {
              label: "Transicións e animacións",
              slug: "06-avanzado/01-transicions-animacions",
            },
            {
              label: "View Transitions",
              slug: "06-avanzado/02-view-transitions",
            },
            {
              label: "Transformacións 2D e 3D",
              slug: "06-avanzado/03-transformacions-2d-3d",
            },
            {
              label: "Filtros, blend e masking",
              slug: "06-avanzado/04-filtros-blend-masking",
            },
            {
              label: "Scroll-driven animations",
              slug: "06-avanzado/05-scroll-driven-animations",
            },
            {
              label: "Layer, scope e supports",
              slug: "06-avanzado/06-layer-scope-supports",
            },
            {
              label: "Rendemento e boas prácticas",
              slug: "06-avanzado/07-rendemento-boas-practicas",
            },
            {
              label: "Compoñentes nativos",
              slug: "06-avanzado/08-componentes-nativos",
            },
            {
              label: "Accesibilidade CSS",
              slug: "06-avanzado/09-accesibilidade-css",
            },
            {
              label: "Arquitectura CSS",
              slug: "06-avanzado/10-arquitectura-css",
            },
            {
              label: "Depurar CSS",
              slug: "06-avanzado/11-depurar-css",
            },
          ],
        },
        {
          label: "Anexos",
          collapsed: true,
          items: [
            { label: "Glosario CSS", slug: "07-anexos/01-glosario-css" },
            {
              label: "Táboa de propiedades",
              slug: "07-anexos/02-taboa-propiedades",
            },
            {
              label: "Recursos externos",
              slug: "07-anexos/03-recursos-externos",
            },
            {
              label: "Características emerxentes",
              slug: "07-anexos/04-caracteristicas-emerxentes",
            },
            {
              label: "Escritura lóxica e internacionalización",
              slug: "07-anexos/05-escritura-loxica",
            },
            {
              label: "CSS para impresión",
              slug: "07-anexos/06-css-impresion",
            },
            {
              label: "Seguridade CSS",
              slug: "07-anexos/07-seguridade-css",
            },
            {
              label: "Testing de CSS",
              slug: "07-anexos/08-testing-css",
            },
            {
              label: "CSS e SVG",
              slug: "07-anexos/09-css-svg",
            },
          ],
        },
      ],
    }),
  ],
});

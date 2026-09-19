// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
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
        text: "© 2024 Manuel Núñez",
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
              link: "/00-introducion/00-que-e-este-manual",
            },
            {
              label: "Como usar este manual",
              link: "/00-introducion/01-como-usalo",
            },
            { label: "Convencións", link: "/00-introducion/02-convencions" },
            {
              label: "Probar exemplos",
              link: "/00-introducion/03-probar-exemplos",
            },
          ],
        },
        {
          label: "Fundamentos",
          collapsed: true,
          items: [
            { label: "Que é CSS", link: "/01-fundamentos/01-que-e-css" },
            { label: "Sintaxe", link: "/01-fundamentos/02-sintaxe" },
            {
              label: "Selectores básicos",
              link: "/01-fundamentos/03-selectores-basicos",
            },
            {
              label: "Cores, tipografía e unidades",
              link: "/01-fundamentos/04-cores-tipografia-unidades",
            },
            {
              label: "Modelo de caixa",
              link: "/01-fundamentos/05-modelo-caixa",
            },
            {
              label: "HTML semántico e CSS",
              link: "/01-fundamentos/06-html-semantico-css",
            },
          ],
        },
        {
          label: "Maquetación clásica",
          collapsed: true,
          items: [
            {
              label: "\`display\`, fluxo e posicionamento",
              link: "/02-maquetacion-clasica/01-display-fluxo-posicionamento",
            },
            { label: "\`float\`", link: "/02-maquetacion-clasica/02-floats" },
          ],
        },
        {
          label: "Maquetación moderna",
          collapsed: true,
          items: [
            { label: "Flexbox", link: "/03-maquetacion-moderna/01-flexbox" },
            { label: "Grid", link: "/03-maquetacion-moderna/02-grid" },
            {
              label: "Subgrid e grellas avanzadas",
              link: "/03-maquetacion-moderna/03-subgrid-grellas-avanzadas",
            },
          ],
        },
        {
          label: "Adaptabilidade",
          collapsed: true,
          items: [
            {
              label: "Media queries",
              link: "/04-adaptabilidade/01-media-queries",
            },
            {
              label: "Container queries",
              link: "/04-adaptabilidade/02-container-queries",
            },
            {
              label: "Unidades e funcións modernas",
              link: "/04-adaptabilidade/03-unidades-funcions-modernas",
            },
          ],
        },
        {
          label: "CSS moderno",
          collapsed: true,
          items: [
            {
              label: "Propiedades personalizadas",
              link: "/05-css-moderno/01-propiedades-personalizadas",
            },
            {
              label: "Aniñamento nativo",
              link: "/05-css-moderno/02-aninamento-nativo",
            },
            {
              label: "Pseudoclases e pseudoelementos",
              link: "/05-css-moderno/03-pseudoclases-pseudoelementos",
            },
            {
              label: "Funcións de cor modernas",
              link: "/05-css-moderno/04-funcions-cor-modernas",
            },
          ],
        },
        {
          label: "Avanzado",
          collapsed: true,
          items: [
            {
              label: "Transicións e animacións",
              link: "/06-avanzado/01-transicions-animacions",
            },
            {
              label: "View Transitions",
              link: "/06-avanzado/02-view-transitions",
            },
            {
              label: "Transformacións 2D e 3D",
              link: "/06-avanzado/03-transformacions-2d-3d",
            },
            {
              label: "Filtros, blend e masking",
              link: "/06-avanzado/04-filtros-blend-masking",
            },
            {
              label: "Scroll-driven animations",
              link: "/06-avanzado/05-scroll-driven-animations",
            },
            {
              label: "Layer, scope e supports",
              link: "/06-avanzado/06-layer-scope-supports",
            },
            {
              label: "Rendemento e boas prácticas",
              link: "/06-avanzado/07-rendemento-boas-practicas",
            },
            {
              label: "Compoñentes nativos",
              link: "/06-avanzado/08-componentes-nativos",
            },
            {
              label: "Accesibilidade CSS",
              link: "/06-avanzado/09-accesibilidade-css",
            },
            {
              label: "Arquitectura CSS",
              link: "/06-avanzado/10-arquitectura-css",
            },
            {
              label: "Depurar CSS",
              link: "/06-avanzado/11-depurar-css",
            },
          ],
        },
        {
          label: "Anexos",
          collapsed: true,
          items: [
            { label: "Glosario CSS", link: "/07-anexos/01-glosario-css" },
            {
              label: "Táboa de propiedades",
              link: "/07-anexos/02-taboa-propiedades",
            },
            {
              label: "Recursos externos",
              link: "/07-anexos/03-recursos-externos",
            },
            {
              label: "Características emerxentes",
              link: "/07-anexos/04-caracteristicas-emerxentes",
            },
            {
              label: "Escritura lóxica e internacionalización",
              link: "/07-anexos/05-escritura-loxica",
            },
            {
              label: "CSS para impresión",
              link: "/07-anexos/06-css-impresion",
            },
            {
              label: "Seguridade CSS",
              link: "/07-anexos/07-seguridade-css",
            },
            {
              label: "Testing de CSS",
              link: "/07-anexos/08-testing-css",
            },
            {
              label: "CSS e SVG",
              link: "/07-anexos/09-css-svg",
            },
          ],
        },
      ],
    }),
  ],
});

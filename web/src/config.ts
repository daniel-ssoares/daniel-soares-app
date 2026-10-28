// Dados do site que não dependem de idioma.
// Os textos traduzidos ficam em src/i18n/ui.ts e os cases em src/content/cases/.
import type { ImageMetadata } from 'astro';

// Imagens dos projetos (src/assets/projects/<projeto>/). Importadas aqui para o Astro otimizar.
import portfolioCover from './assets/projects/daniel-soares-app/capa.webp';
import enxovalInicio from './assets/projects/enxoval/01-inicio.png';
import enxovalItens from './assets/projects/enxoval/02-itens.png';
import enxovalLoja from './assets/projects/enxoval/03-loja.png';

// Variáveis PUBLIC_* vêm do .env (local) ou das Environment Variables da Vercel.
// String vazia vira null, para que os componentes saibam que o arquivo ainda não existe.
const env = (value: string | undefined) => (value && value.trim() !== '' ? value : null);

export const site = {
  name: 'Daniel Soares',
  location: 'São Paulo, Brasil',

  contact: {
    email: 'daniemcristo.ds@gmail.com',
    linkedin: 'https://www.linkedin.com/in/daniels-soares',
    github: 'https://github.com/daniel-ssoares',
  },

  // Vídeo de apresentação (Supabase Storage). Enquanto mp4 for null, o hero mostra a janela de terminal.
  video: {
    mp4: env(import.meta.env.PUBLIC_VIDEO_MP4),
    webm: env(import.meta.env.PUBLIC_VIDEO_WEBM),
    poster: env(import.meta.env.PUBLIC_VIDEO_POSTER),
    // Legendas servidas a partir de public/video/
    captions: {
      pt: '/video/legendas-pt.vtt',
      en: '/video/legendas-en.vtt',
    },
  },

  // Foto da seção "Sobre" (coloque o arquivo em public/, ex.: '/daniel.jpg'). null = placeholder.
  photo: env(import.meta.env.PUBLIC_PHOTO),

  // Currículo para download. Padrão: arquivos em public/cv/; as variáveis PUBLIC_CV_* permitem apontar para outro lugar.
  cv: {
    pt: env(import.meta.env.PUBLIC_CV_PT) ?? '/cv/daniel-soares-cv.pdf',
    en: env(import.meta.env.PUBLIC_CV_EN) ?? '/cv/daniel-soares-cv-en.pdf',
  },

  // Projetos pessoais, exibidos em cards no topo da seção de trabalhos (na ordem desta lista).
  // images: a primeira é a capa; as demais formam a galeria (até 3). Lista vazia = card sem imagem.
  //   Prints verticais (celular) aparecem lado a lado em molduras de celular;
  //   horizontais, numa moldura de navegador.
  // live: URL publicada (null = botão "Deploy em breve" desabilitado)
  // repo: URL do repositório (null = sem botão de repositório)
  projects: [
    {
      name: 'baby-layette-app',
      title: {
        pt: 'Enxoval — app de organização para casais',
        en: 'Enxoval — baby layette planner for couples',
      },
      description: {
        pt: 'App mobile-first, instalável na tela inicial do celular, para planejar o enxoval do bebê: itens por categoria, progresso, orçamento, modo loja para registrar compras, fotos dos itens e exportação da lista em PDF e Excel.',
        en: "Mobile-first app, installable on the phone's home screen, for planning a baby's layette: items by category, progress, budget, a store mode to log purchases, item photos and list export to PDF and Excel.",
      },
      highlights: {
        pt: [
          'Login com dados isolados por conta',
          'Regras de negócio com testes automatizados (back-end e front-end)',
          'Integração com API de clima para avisar itens fora da estação',
        ],
        en: [
          'Login with per-account data isolation',
          'Business rules covered by automated tests (back end and front end)',
          'Weather API integration that flags out-of-season items',
        ],
      },
      images: [
        {
          src: enxovalInicio,
          alt: {
            pt: 'Painel do app Enxoval: progresso do enxoval, clima previsto para os primeiros meses e resumo do orçamento',
            en: 'Enxoval dashboard: layette progress, forecast weather for the first months and budget summary',
          },
        },
        {
          src: enxovalItens,
          alt: {
            pt: 'Lista de itens por categoria, com busca, filtros, valores pagos e quantidades',
            en: 'Items by category, with search, filters, amounts paid and quantities',
          },
        },
        {
          src: enxovalLoja,
          alt: {
            pt: 'Modo loja: quanto falta comprar e itens pendentes por categoria, com botão para registrar a compra',
            en: 'Store mode: amount left to buy and pending items by category, with a button to log each purchase',
          },
        },
      ],
      live: 'https://baby-layette-app.vercel.app',
      repo: null,
      status: 'live',
      stack: ['React', 'TypeScript', 'MUI', 'TanStack Query', '.NET 10', 'EF Core', 'SQLite', 'xUnit', 'Vitest'],
    },
    {
      name: 'daniel-soares-app',
      description: {
        pt: 'Este portfólio: site estático em Astro com API .NET 10 em container, PostgreSQL no Supabase, testes xUnit e CI no GitHub Actions.',
        en: 'This portfolio: a static Astro site with a containerized .NET 10 API, PostgreSQL on Supabase, xUnit tests and CI on GitHub Actions.',
      },
      images: [
        {
          src: portfolioCover,
          alt: {
            pt: 'Página inicial deste portfólio, com o título e a janela de terminal',
            en: 'Home page of this portfolio, with the headline and the terminal window',
          },
        },
      ],
      live: 'https://daniel-soares-app.vercel.app',
      repo: 'https://github.com/daniel-ssoares/daniel-soares-app',
      status: 'live',
      stack: ['Astro', 'TypeScript', '.NET 10', 'PostgreSQL', 'Docker'],
    },
  ] satisfies Project[] as Project[],
};

export type Lang = 'pt' | 'en';

export type ProjectImage = {
  src: ImageMetadata;
  alt: Record<Lang, string>;
};

export type Project = {
  name: string;
  title?: Record<Lang, string>;
  description: Record<Lang, string>;
  highlights?: Record<Lang, string[]>;
  images: ProjectImage[];
  live: string | null;
  repo: string | null;
  status: 'building' | 'live';
  stack: string[];
};

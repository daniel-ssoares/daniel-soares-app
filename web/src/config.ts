// Dados do site que não dependem de idioma.
// Os textos traduzidos ficam em src/i18n/ui.ts e os cases em src/content/cases/.

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

  // Vídeo de apresentação (Supabase Storage). Enquanto mp4 for null, o hero mostra um placeholder.
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

  // Projetos pessoais, exibidos em cards no topo da seção de trabalhos.
  // media: imagem (.webp/.png/.jpg/.gif) ou vídeo curto (.mp4/.webm) em public/projects/
  // live: URL publicada (null = botão "Deploy em breve" desabilitado)
  projects: [
    {
      name: 'daniel-soares-app',
      description: {
        pt: 'Este portfólio: site estático em Astro com API .NET 10 em container, PostgreSQL no Supabase, testes xUnit e CI no GitHub Actions.',
        en: 'This portfolio: a static Astro site with a containerized .NET 10 API, PostgreSQL on Supabase, xUnit tests and CI on GitHub Actions.',
      },
      media: { src: '/projects/daniel-soares-app.webp', width: 1440, height: 900 },
      live: 'https://daniel-soares-app.vercel.app',
      repo: 'https://github.com/daniel-ssoares/daniel-soares-app',
      status: 'building',
      stack: ['Astro', 'TypeScript', '.NET 10', 'PostgreSQL', 'Docker'],
    },
  ] satisfies Project[] as Project[],
};

export type Lang = 'pt' | 'en';

export type Project = {
  name: string;
  description: Record<Lang, string>;
  media: { src: string; width: number; height: number } | null;
  live: string | null;
  repo: string;
  status: 'building' | 'live';
  stack: string[];
};

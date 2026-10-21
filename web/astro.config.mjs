// @ts-check
import { defineConfig } from 'astro/config';

// Configuração do Astro: https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // Troque pelo domínio definitivo quando ele for registrado (ex.: https://danielsoares.dev)
  site: 'https://daniel-soares.vercel.app',

  // i18n nativo: português na raiz (/) e inglês em /en/
  i18n: {
    locales: ['pt', 'en'],
    defaultLocale: 'pt',
    routing: { prefixDefaultLocale: false },
  },

  // Barra de ferramentas do Astro que aparece no rodapé durante o `npm run dev`
  // (nunca vai para o site publicado). Desligada para não confundir com o design.
  devToolbar: { enabled: false },

  vite: {
    server: {
      // Em desenvolvimento, encaminha /api/* para a API .NET rodando localmente (dotnet run)
      proxy: { '/api': 'http://localhost:5080' },
    },
  },
});

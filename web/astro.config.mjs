// @ts-check
import { defineConfig } from 'astro/config';

// Configuração do Astro: https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // Endereço público do site (usado em canonical, hreflang e Open Graph)
  site: 'https://daniel-soares-app.vercel.app',

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

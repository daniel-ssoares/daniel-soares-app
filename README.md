# daniel-soares-app

Portfólio de Daniel Soares, desenvolvedor full stack.

**Stack:** Astro · TypeScript · .NET 10 (Minimal API) · EF Core · PostgreSQL (Supabase) · xUnit · Docker · Vercel

```
.
├── web/                     # Site em Astro (estático, PT e EN)
├── api/
│   ├── Portfolio.Api/       # API .NET 10: /api/contato, /api/cases, /api/visitas, /api/health
│   ├── Portfolio.Api.Tests/ # testes xUnit
│   └── Dockerfile.vercel
├── supabase/migrations/     # esquema do banco
├── vercel.json
└── .github/workflows/ci.yml
```

## Rodando localmente

Pré-requisitos: Node 24+ e .NET SDK 10.

```bash
# API (http://localhost:5080)
cd api
dotnet user-secrets set "ConnectionStrings:Supabase" "<connection string>" --project Portfolio.Api
dotnet run --project Portfolio.Api

# Site (http://localhost:4321), em outro terminal
cd web
npm install
npm run dev
```

## Testes

```bash
cd api && dotnet test
cd web && npm run build
```

## Configuração

| Variável | Uso |
|---|---|
| `ConnectionStrings__Supabase` | connection string do Postgres (API) |
| `PUBLIC_VIDEO_MP4`, `PUBLIC_VIDEO_WEBM`, `PUBLIC_VIDEO_POSTER` | vídeo de apresentação (site) |
| `PUBLIC_PHOTO` | foto (site) |
| `PUBLIC_CV_PT`, `PUBLIC_CV_EN` | currículo (site) |

Modelo das variáveis do site em [web/.env.example](web/.env.example).

using Portfolio.Api.Cases;
using Portfolio.Api.Contact;
using Portfolio.Api.Data;
using Portfolio.Api.Http;
using Portfolio.Api.Notifications;
using Portfolio.Api.Visits;

// API do portfólio (.NET 10 Minimal API).
// Na Vercel roda como container (Dockerfile.vercel) e recebe as rotas /api/* (ver vercel.json na raiz).
// O site estático NÃO depende desta API para abrir: se ela estiver fria ou fora do ar, o front usa o conteúdo estático.

// Slim builder: menos dependências carregadas = container sobe mais rápido (importante quando ele "acorda")
var builder = WebApplication.CreateSlimBuilder(args);

// A Vercel informa a porta pela variável PORT. Localmente vale o launchSettings.json (http://localhost:5080).
var port = Environment.GetEnvironmentVariable("PORT");
if (!string.IsNullOrEmpty(port))
    builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

// Connection string do Postgres do Supabase.
// Na Vercel: Environment Variable "ConnectionStrings__Supabase". Localmente: dotnet user-secrets.
var connectionString = builder.Configuration.GetConnectionString("Supabase");
builder.Services.AddNpgsql<PortfolioDbContext>(connectionString);

builder.Services.AddProblemDetails();
builder.Services.AddPortfolioRateLimits();

// Aviso por e-mail de mensagens novas (Resend). Sem Resend__ApiKey e Resend__To, a mensagem só é gravada.
builder.Services.AddContactNotifier(builder.Configuration);

var app = builder.Build();

if (string.IsNullOrWhiteSpace(connectionString))
    app.Logger.LogWarning("ConnectionStrings:Supabase não configurada: endpoints que usam o banco vão falhar.");

app.UseExceptionHandler();
app.UseStatusCodePages();
app.UseRateLimiter();

app.MapGet("/api/health", () => Results.Ok(new { status = "ok" }));
app.MapContactEndpoints();
app.MapCasesEndpoints();
app.MapVisitsEndpoints();

app.Run();

// Permite que os testes de integração (WebApplicationFactory<Program>) enxerguem esta classe
public partial class Program;

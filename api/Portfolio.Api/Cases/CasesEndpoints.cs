using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Data;

namespace Portfolio.Api.Cases;

/// <summary>Número grande do case em destaque, ex.: { value: "−47 min", label: "por execução" }.</summary>
public record CaseMetric(string Value, string Label);

/// <summary>Formato devolvido para o front (o mesmo da Content Collection em web/src/content.config.ts).</summary>
public record CaseResponse(
    string Title,
    string Client,
    string? Context,
    string? Problem,
    string Summary,
    string? Result,
    CaseMetric? Metric,
    string[] Tags);

public static class CasesEndpoints
{
    public static void MapCasesEndpoints(this IEndpointRouteBuilder app)
    {
        // GET /api/cases?lang=pt — cases publicados, na ordem definida no banco (o primeiro vira destaque)
        app.MapGet("/api/cases", async (string? lang, PortfolioDbContext db, HttpContext http, CancellationToken ct) =>
        {
            var language = lang == "en" ? "en" : "pt";

            var rows = await db.Cases
                .AsNoTracking()
                .Where(c => c.Published && c.Lang == language)
                .OrderBy(c => c.SortOrder)
                .ToListAsync(ct);

            var cases = rows.Select(c => new CaseResponse(
                c.Title,
                c.Client,
                c.Context,
                c.Problem,
                c.Summary,
                c.Result,
                c.MetricValue is not null && c.MetricLabel is not null ? new CaseMetric(c.MetricValue, c.MetricLabel) : null,
                c.Tags));

            // Deixa a CDN da Vercel guardar a resposta por 5 min: menos acessos ao banco e menos containers frios
            http.Response.Headers.CacheControl = "public, s-maxage=300, stale-while-revalidate=86400";
            return Results.Ok(cases);
        });
    }
}

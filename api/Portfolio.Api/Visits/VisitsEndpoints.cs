using Portfolio.Api.Data;
using Portfolio.Api.Http;

namespace Portfolio.Api.Visits;

public record VisitRequest(string? Path, string? Referrer);

public static class VisitsEndpoints
{
    public const int PathMax = 200;

    public static void MapVisitsEndpoints(this IEndpointRouteBuilder app)
    {
        // POST /api/visitas — contador simples. Guarda só o caminho e o domínio de origem (sem IP, sem cookies).
        app.MapPost("/api/visitas", async (VisitRequest request, PortfolioDbContext db, CancellationToken ct) =>
        {
            var path = request.Path?.Trim();
            if (string.IsNullOrEmpty(path) || !path.StartsWith('/') || path.Length > PathMax)
                return Results.BadRequest();

            db.PageViews.Add(new PageView
            {
                Path = path,
                ReferrerHost = ReferrerHost(request.Referrer),
                CreatedAt = DateTimeOffset.UtcNow,
            });
            await db.SaveChangesAsync(ct);

            return Results.NoContent();
        })
        .RequireRateLimiting(RateLimits.Visits);
    }

    /// <summary>De "https://www.linkedin.com/feed/?x=1" fica só "www.linkedin.com".</summary>
    public static string? ReferrerHost(string? referrer) =>
        Uri.TryCreate(referrer, UriKind.Absolute, out var uri) && uri.Scheme is "http" or "https"
            ? uri.Host
            : null;
}

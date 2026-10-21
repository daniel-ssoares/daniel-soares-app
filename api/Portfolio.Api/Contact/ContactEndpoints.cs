using Portfolio.Api.Data;
using Portfolio.Api.Http;

namespace Portfolio.Api.Contact;

public static class ContactEndpoints
{
    public static void MapContactEndpoints(this IEndpointRouteBuilder app)
    {
        // POST /api/contato — valida, aplica rate limit (ver Http/RateLimits.cs) e grava em contact_messages
        app.MapPost("/api/contato", async (ContactRequest request, PortfolioDbContext db, CancellationToken ct) =>
        {
            // Honeypot preenchido = robô. Respondemos "sucesso" para não dar pistas, mas não gravamos nada.
            if (!string.IsNullOrEmpty(request.Website))
                return Results.Accepted();

            var errors = ContactValidator.Validate(request);
            if (errors.Count > 0)
                return Results.ValidationProblem(errors);

            db.ContactMessages.Add(new ContactMessage
            {
                Name = request.Name!.Trim(),
                Email = request.Email!.Trim(),
                Kind = request.Kind!,
                Message = request.Message!.Trim(),
                Lang = request.Lang == "en" ? "en" : "pt",
                CreatedAt = DateTimeOffset.UtcNow,
            });
            await db.SaveChangesAsync(ct);

            return Results.Accepted();
        })
        .RequireRateLimiting(RateLimits.Contact);
    }
}

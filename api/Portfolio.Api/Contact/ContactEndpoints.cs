using Portfolio.Api.Data;
using Portfolio.Api.Http;
using Portfolio.Api.Notifications;

namespace Portfolio.Api.Contact;

public static class ContactEndpoints
{
    public static void MapContactEndpoints(this IEndpointRouteBuilder app)
    {
        // POST /api/contato — valida, aplica rate limit (ver Http/RateLimits.cs), grava em contact_messages e avisa por e-mail
        app.MapPost("/api/contato", async (ContactRequest request, PortfolioDbContext db, IContactNotifier notifier, ILoggerFactory loggers, CancellationToken ct) =>
        {
            // Honeypot preenchido = robô. Respondemos "sucesso" para não dar pistas, mas não gravamos nada.
            if (!string.IsNullOrEmpty(request.Website))
                return Results.Accepted();

            var errors = ContactValidator.Validate(request);
            if (errors.Count > 0)
                return Results.ValidationProblem(errors);

            var message = new ContactMessage
            {
                Name = request.Name!.Trim(),
                Email = request.Email!.Trim(),
                Kind = request.Kind!,
                Message = request.Message!.Trim(),
                Lang = request.Lang == "en" ? "en" : "pt",
                CreatedAt = DateTimeOffset.UtcNow,
            };
            db.ContactMessages.Add(message);
            await db.SaveChangesAsync(ct);

            // A mensagem já está salva: se o aviso falhar, só registramos no log e respondemos sucesso
            try
            {
                await notifier.NotifyAsync(message, ct);
            }
            catch (Exception ex) when (ex is HttpRequestException or TaskCanceledException)
            {
                loggers.CreateLogger("Portfolio.Api.Contact").LogWarning(ex, "Falha ao enviar o aviso da mensagem {Id}.", message.Id);
            }

            return Results.Accepted();
        })
        .RequireRateLimiting(RateLimits.Contact);
    }
}

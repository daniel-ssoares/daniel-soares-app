using System.Threading.RateLimiting;
using Microsoft.AspNetCore.RateLimiting;

namespace Portfolio.Api.Http;

/// <summary>
/// Políticas de rate limit por IP do visitante.
/// Obs.: o contador fica na memória de cada container; é uma proteção contra abuso, não um limite exato.
/// </summary>
public static class RateLimits
{
    public const string Contact = "contact";
    public const string Visits = "visits";

    public static IServiceCollection AddPortfolioRateLimits(this IServiceCollection services) =>
        services.AddRateLimiter(options =>
        {
            options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

            // Formulário: 5 mensagens a cada 10 minutos por IP
            options.AddPolicy(Contact, http => RateLimitPartition.GetFixedWindowLimiter(
                ClientIp(http),
                _ => new FixedWindowRateLimiterOptions { PermitLimit = 5, Window = TimeSpan.FromMinutes(10) }));

            // Contador de visitas: 30 por minuto por IP
            options.AddPolicy(Visits, http => RateLimitPartition.GetFixedWindowLimiter(
                ClientIp(http),
                _ => new FixedWindowRateLimiterOptions { PermitLimit = 30, Window = TimeSpan.FromMinutes(1) }));
        });

    /// <summary>
    /// IP real do visitante. Na Vercel a requisição chega por proxy, que informa o IP original
    /// no primeiro item do cabeçalho X-Forwarded-For.
    /// </summary>
    public static string ClientIp(HttpContext http)
    {
        var forwarded = http.Request.Headers["X-Forwarded-For"].ToString();
        if (!string.IsNullOrWhiteSpace(forwarded))
            return forwarded.Split(',')[0].Trim();

        return http.Connection.RemoteIpAddress?.ToString() ?? "unknown";
    }
}

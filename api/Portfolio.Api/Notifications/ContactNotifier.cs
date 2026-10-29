using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json.Serialization;
using Portfolio.Api.Data;

namespace Portfolio.Api.Notifications;

/// <summary>Avisa que uma mensagem nova chegou pelo formulário de contato.</summary>
public interface IContactNotifier
{
    Task NotifyAsync(ContactMessage message, CancellationToken ct);
}

/// <summary>Configuração do aviso por e-mail (seção "Resend"; na Vercel: Resend__ApiKey, Resend__To, Resend__From).</summary>
public class ResendOptions
{
    public string? ApiKey { get; set; }
    /// <summary>Endereço que recebe o aviso.</summary>
    public string? To { get; set; }
    /// <summary>Remetente. Sem domínio próprio verificado no Resend, use o endereço de teste deles.</summary>
    public string From { get; set; } = "Portfólio <onboarding@resend.dev>";

    public bool IsConfigured => !string.IsNullOrWhiteSpace(ApiKey) && !string.IsNullOrWhiteSpace(To);
}

/// <summary>Envia o aviso pela API HTTP do Resend (https://resend.com/docs/api-reference/emails/send-email).</summary>
public class ResendContactNotifier(HttpClient http, ResendOptions options, ILogger<ResendContactNotifier> logger) : IContactNotifier
{
    private static readonly Dictionary<string, string> KindLabels = new()
    {
        ["project"] = "Um projeto",
        ["proposal"] = "Uma proposta",
        ["other"] = "Outro assunto",
    };

    public async Task NotifyAsync(ContactMessage message, CancellationToken ct)
    {
        if (!options.IsConfigured)
        {
            logger.LogInformation("Resend não configurado: mensagem {Id} gravada sem aviso por e-mail.", message.Id);
            return;
        }

        var kind = KindLabels.GetValueOrDefault(message.Kind, message.Kind);
        var email = new ResendEmail(
            From: options.From,
            To: [options.To!],
            ReplyTo: message.Email,
            Subject: SingleLine($"[portfólio] {kind} — {message.Name}"),
            // Só texto puro: o conteúdo vem de fora e não deve virar HTML
            Text: $"""
                Nome: {message.Name}
                E-mail: {message.Email}
                Tipo: {kind}
                Idioma: {message.Lang}
                Recebida em: {message.CreatedAt:yyyy-MM-dd HH:mm} UTC

                {message.Message}

                Responda este e-mail para falar direto com quem enviou.
                """);

        using var request = new HttpRequestMessage(HttpMethod.Post, "emails")
        {
            Content = JsonContent.Create(email),
        };
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", options.ApiKey);

        using var response = await http.SendAsync(request, ct);
        if (!response.IsSuccessStatusCode)
            logger.LogWarning("Resend recusou o aviso da mensagem {Id}: {Status} {Body}",
                message.Id, (int)response.StatusCode, await response.Content.ReadAsStringAsync(ct));
    }

    private static string SingleLine(string value) => value.ReplaceLineEndings(" ").Trim();

    private record ResendEmail(
        [property: JsonPropertyName("from")] string From,
        [property: JsonPropertyName("to")] string[] To,
        [property: JsonPropertyName("reply_to")] string ReplyTo,
        [property: JsonPropertyName("subject")] string Subject,
        [property: JsonPropertyName("text")] string Text);
}

public static class ContactNotifierRegistration
{
    public static IServiceCollection AddContactNotifier(this IServiceCollection services, IConfiguration configuration)
    {
        var options = configuration.GetSection("Resend").Get<ResendOptions>() ?? new ResendOptions();
        services.AddSingleton(options);
        services.AddHttpClient<IContactNotifier, ResendContactNotifier>(http =>
        {
            http.BaseAddress = new Uri("https://api.resend.com/");
            // O container da Vercel pode ser pausado depois da resposta: o aviso é enviado antes, com prazo curto
            http.Timeout = TimeSpan.FromSeconds(5);
        });
        return services;
    }
}

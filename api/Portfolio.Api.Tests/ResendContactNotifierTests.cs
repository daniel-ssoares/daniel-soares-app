using System.Net;
using System.Text.Json;
using Microsoft.Extensions.Logging.Abstractions;
using Portfolio.Api.Data;
using Portfolio.Api.Notifications;

namespace Portfolio.Api.Tests;

public class ResendContactNotifierTests
{
    private static readonly ContactMessage Sample = new()
    {
        Id = 42,
        Name = "Ana\r\nSouza",
        Email = "ana@empresa.com.br",
        Kind = "proposal",
        Message = "<b>Olá</b>, tenho uma proposta.",
        Lang = "pt",
        CreatedAt = new DateTimeOffset(2026, 10, 28, 13, 5, 0, TimeSpan.Zero),
    };

    private static (ResendContactNotifier Notifier, CapturingHandler Handler) Create(ResendOptions options)
    {
        var handler = new CapturingHandler();
        var http = new HttpClient(handler) { BaseAddress = new Uri("https://api.resend.com/") };
        return (new ResendContactNotifier(http, options, NullLogger<ResendContactNotifier>.Instance), handler);
    }

    [Fact]
    public async Task Sends_plain_text_email_with_reply_to_sender()
    {
        var (notifier, handler) = Create(new ResendOptions { ApiKey = "re_test", To = "eu@exemplo.com" });

        await notifier.NotifyAsync(Sample, CancellationToken.None);

        var request = Assert.Single(handler.Requests);
        Assert.Equal("https://api.resend.com/emails", request.Uri);
        Assert.Equal("Bearer re_test", request.Authorization);

        using var body = JsonDocument.Parse(request.Body);
        var root = body.RootElement;
        Assert.Equal("eu@exemplo.com", root.GetProperty("to")[0].GetString());
        Assert.Equal("ana@empresa.com.br", root.GetProperty("reply_to").GetString());
        Assert.Equal("[portfólio] Uma proposta — Ana Souza", root.GetProperty("subject").GetString());
        Assert.Contains("<b>Olá</b>, tenho uma proposta.", root.GetProperty("text").GetString());
        Assert.False(root.TryGetProperty("html", out _));
    }

    [Theory]
    [InlineData(null, "eu@exemplo.com")]
    [InlineData("re_test", null)]
    [InlineData("", "")]
    public async Task Does_nothing_when_not_configured(string? apiKey, string? to)
    {
        var (notifier, handler) = Create(new ResendOptions { ApiKey = apiKey, To = to });

        await notifier.NotifyAsync(Sample, CancellationToken.None);

        Assert.Empty(handler.Requests);
    }

    private class CapturingHandler : HttpMessageHandler
    {
        public List<(string Uri, string? Authorization, string Body)> Requests { get; } = [];

        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken ct)
        {
            Requests.Add((request.RequestUri!.ToString(), request.Headers.Authorization?.ToString(), await request.Content!.ReadAsStringAsync(ct)));
            return new HttpResponseMessage(HttpStatusCode.OK) { Content = new StringContent("""{"id":"x"}""") };
        }
    }
}

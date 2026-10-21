using System.Net;
using System.Net.Http.Json;
using Microsoft.EntityFrameworkCore;

namespace Portfolio.Api.Tests;

public class ContactEndpointTests(PortfolioApiFactory factory) : IClassFixture<PortfolioApiFactory>
{
    private static object Message(string email = "ana@empresa.com.br", string? website = null) => new
    {
        name = "Ana Souza",
        email,
        kind = "project",
        message = "Olá Daniel, preciso de um site para a minha empresa.",
        website,
        lang = "pt",
    };

    [Fact]
    public async Task Valid_message_is_saved()
    {
        var client = factory.CreateClientWithIp("10.0.0.1");

        var response = await client.PostAsJsonAsync("/api/contato", Message("salva@empresa.com"));

        Assert.Equal(HttpStatusCode.Accepted, response.StatusCode);
        var saved = await factory.WithDbAsync(db => db.ContactMessages.SingleAsync(m => m.Email == "salva@empresa.com"));
        Assert.Equal("Ana Souza", saved.Name);
        Assert.Equal("project", saved.Kind);
        Assert.Equal("pt", saved.Lang);
    }

    [Fact]
    public async Task Invalid_message_returns_validation_problem()
    {
        var client = factory.CreateClientWithIp("10.0.0.2");

        var response = await client.PostAsJsonAsync("/api/contato", Message(email: "invalido"));

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        Assert.Contains("email", await response.Content.ReadAsStringAsync());
    }

    [Fact]
    public async Task Honeypot_filled_is_accepted_but_not_saved()
    {
        var client = factory.CreateClientWithIp("10.0.0.3");

        var response = await client.PostAsJsonAsync("/api/contato", Message("robo@spam.com", website: "http://spam"));

        Assert.Equal(HttpStatusCode.Accepted, response.StatusCode);
        Assert.False(await factory.WithDbAsync(db => db.ContactMessages.AnyAsync(m => m.Email == "robo@spam.com")));
    }

    [Fact]
    public async Task Sixth_message_in_ten_minutes_is_rate_limited()
    {
        var client = factory.CreateClientWithIp("10.0.0.4");

        for (var i = 0; i < 5; i++)
            Assert.Equal(HttpStatusCode.Accepted, (await client.PostAsJsonAsync("/api/contato", Message())).StatusCode);

        var blocked = await client.PostAsJsonAsync("/api/contato", Message());
        Assert.Equal(HttpStatusCode.TooManyRequests, blocked.StatusCode);
    }
}

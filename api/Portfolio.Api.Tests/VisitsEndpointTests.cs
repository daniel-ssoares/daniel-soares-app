using System.Net;
using System.Net.Http.Json;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Visits;

namespace Portfolio.Api.Tests;

public class VisitsEndpointTests(PortfolioApiFactory factory) : IClassFixture<PortfolioApiFactory>
{
    [Fact]
    public async Task Visit_is_saved_with_only_the_referrer_host()
    {
        var client = factory.CreateClientWithIp("10.0.1.1");

        var response = await client.PostAsJsonAsync("/api/visitas",
            new { path = "/en/", referrer = "https://www.linkedin.com/feed/?trk=abc" });

        Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
        var visit = await factory.WithDbAsync(db => db.PageViews.SingleAsync(v => v.Path == "/en/"));
        Assert.Equal("www.linkedin.com", visit.ReferrerHost);
    }

    [Theory]
    [InlineData("")]
    [InlineData("sem-barra")]
    public async Task Invalid_path_is_rejected(string path)
    {
        var client = factory.CreateClientWithIp("10.0.1.2");

        var response = await client.PostAsJsonAsync("/api/visitas", new { path });

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Theory]
    [InlineData(null, null)]
    [InlineData("", null)]
    [InlineData("javascript:alert(1)", null)]
    [InlineData("https://google.com/search?q=daniel", "google.com")]
    public void ReferrerHost_keeps_only_http_hosts(string? referrer, string? expected)
    {
        Assert.Equal(expected, VisitsEndpoints.ReferrerHost(referrer));
    }
}

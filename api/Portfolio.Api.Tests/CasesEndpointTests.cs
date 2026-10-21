using System.Net.Http.Json;
using Portfolio.Api.Cases;
using Portfolio.Api.Data;

namespace Portfolio.Api.Tests;

public class CasesEndpointTests(PortfolioApiFactory factory) : IClassFixture<PortfolioApiFactory>
{
    private static PortfolioCase Case(string lang, int order, string title, bool published = true) => new()
    {
        Lang = lang,
        SortOrder = order,
        Title = title,
        Client = "um banco de investimentos suíço",
        Summary = "Resumo",
        Tags = ["C#", ".NET"],
        Published = published,
    };

    [Fact]
    public async Task Returns_only_published_cases_of_the_language_in_order()
    {
        await factory.WithDbAsync(db =>
        {
            db.Cases.AddRange(
                Case("pt", 2, "Segundo"),
                Case("pt", 1, "Primeiro"),
                Case("pt", 3, "Rascunho", published: false),
                Case("en", 1, "English"));
            return db.SaveChangesAsync();
        });
        var client = factory.CreateClient();

        var pt = await client.GetFromJsonAsync<List<CaseResponse>>("/api/cases?lang=pt");
        var en = await client.GetFromJsonAsync<List<CaseResponse>>("/api/cases?lang=en");

        Assert.Equal(["Primeiro", "Segundo"], pt!.Select(c => c.Title));
        Assert.Equal(["C#", ".NET"], pt![0].Tags);
        Assert.Equal(["English"], en!.Select(c => c.Title));
    }

    [Fact]
    public async Task Metric_is_returned_only_when_value_and_label_exist()
    {
        // Banco próprio, para não misturar com os cases do outro teste
        await using var own = new PortfolioApiFactory();
        await own.WithDbAsync(db =>
        {
            var featured = Case("pt", 1, "Destaque");
            featured.MetricValue = "−47 min";
            featured.MetricLabel = "por execução";
            var onlyValue = Case("pt", 2, "Só valor");
            onlyValue.MetricValue = "10x";
            db.Cases.AddRange(featured, onlyValue);
            return db.SaveChangesAsync();
        });

        var cases = await own.CreateClient().GetFromJsonAsync<List<CaseResponse>>("/api/cases?lang=pt");

        Assert.Equal(new CaseMetric("−47 min", "por execução"), cases![0].Metric);
        Assert.Null(cases[1].Metric);
    }

    [Fact]
    public async Task Response_is_cacheable_by_the_cdn()
    {
        var response = await factory.CreateClient().GetAsync("/api/cases");

        Assert.Contains("s-maxage", response.Headers.CacheControl?.ToString());
    }
}

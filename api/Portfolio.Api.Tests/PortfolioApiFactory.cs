using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Portfolio.Api.Data;

namespace Portfolio.Api.Tests;

/// <summary>Sobe a API em memória trocando o Postgres por um banco InMemory exclusivo de cada factory.</summary>
public class PortfolioApiFactory : WebApplicationFactory<Program>
{
    private readonly string _databaseName = $"portfolio-tests-{Guid.NewGuid()}";

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment("Testing");
        builder.ConfigureTestServices(services =>
        {
            services.RemoveAll<DbContextOptions<PortfolioDbContext>>();
            services.RemoveAll<IDbContextOptionsConfiguration<PortfolioDbContext>>();
            services.AddDbContext<PortfolioDbContext>(o => o.UseInMemoryDatabase(_databaseName));
        });
    }

    /// <summary>Executa algo direto no banco (preparar dados ou conferir o que foi gravado).</summary>
    public async Task<T> WithDbAsync<T>(Func<PortfolioDbContext, Task<T>> action)
    {
        using var scope = Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<PortfolioDbContext>();
        return await action(db);
    }

    /// <summary>Cliente HTTP com um IP próprio, para que o rate limit de um teste não afete os outros.</summary>
    public HttpClient CreateClientWithIp(string ip)
    {
        var client = CreateClient();
        client.DefaultRequestHeaders.Add("X-Forwarded-For", ip);
        return client;
    }
}

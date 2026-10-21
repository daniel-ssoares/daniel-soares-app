using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;

namespace Portfolio.Api.Data;

/// <summary>
/// Acesso ao Postgres do Supabase. O esquema é criado pelo SQL em supabase/migrations/
/// (não usamos migrations do EF), então aqui só mapeamos as tabelas existentes.
/// </summary>
public partial class PortfolioDbContext(DbContextOptions<PortfolioDbContext> options) : DbContext(options)
{
    public DbSet<ContactMessage> ContactMessages => Set<ContactMessage>();
    public DbSet<PortfolioCase> Cases => Set<PortfolioCase>();
    public DbSet<PageView> PageViews => Set<PageView>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ContactMessage>().ToTable("contact_messages");
        modelBuilder.Entity<PortfolioCase>().ToTable("cases");
        modelBuilder.Entity<PageView>().ToTable("page_views");

        // Postgres usa snake_case: SortOrder -> sort_order, CreatedAt -> created_at
        foreach (var entity in modelBuilder.Model.GetEntityTypes())
            foreach (var property in entity.GetProperties())
                property.SetColumnName(ToSnakeCase(property.Name));
    }

    private static string ToSnakeCase(string name) => UpperCase().Replace(name, "_$1").ToLowerInvariant();

    [GeneratedRegex("(?<!^)([A-Z])")]
    private static partial Regex UpperCase();
}

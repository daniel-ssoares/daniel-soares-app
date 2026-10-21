namespace Portfolio.Api.Data;

/// <summary>Visita a uma página (tabela page_views). Não guarda IP nem identificadores do visitante.</summary>
public class PageView
{
    public long Id { get; set; }
    public required string Path { get; set; }
    public string? ReferrerHost { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}

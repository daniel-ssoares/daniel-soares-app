namespace Portfolio.Api.Data;

/// <summary>
/// Case exibido na seção "$ ls trabalhos/" (tabela cases).
/// Client é a descrição do cliente exibida no card (ex.: "um banco de investimentos suíço").
/// O case de menor SortOrder aparece em destaque no site.
/// </summary>
public class PortfolioCase
{
    public long Id { get; set; }
    public required string Lang { get; set; }
    public int SortOrder { get; set; }
    public required string Title { get; set; }
    public required string Client { get; set; }
    public string? Context { get; set; }
    public string? Problem { get; set; }
    public required string Summary { get; set; }
    public string? Result { get; set; }
    public string? MetricValue { get; set; }
    public string? MetricLabel { get; set; }
    public string[] Tags { get; set; } = [];
    public bool Published { get; set; } = true;
}

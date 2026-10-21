namespace Portfolio.Api.Data;

/// <summary>Mensagem enviada pelo formulário de contato (tabela contact_messages).</summary>
public class ContactMessage
{
    public long Id { get; set; }
    public required string Name { get; set; }
    public required string Email { get; set; }
    /// <summary>"project", "proposal" ou "other" (ver ContactValidator.Kinds).</summary>
    public required string Kind { get; set; }
    public required string Message { get; set; }
    public required string Lang { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}

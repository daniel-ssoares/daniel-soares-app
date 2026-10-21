namespace Portfolio.Api.Contact;

/// <summary>
/// Corpo do POST /api/contato. Kind: "project", "proposal" ou "other".
/// "Website" é o honeypot anti-spam (precisa vir vazio).
/// </summary>
public record ContactRequest(string? Name, string? Email, string? Kind, string? Message, string? Website, string? Lang);

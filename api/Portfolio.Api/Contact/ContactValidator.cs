using System.Net.Mail;

namespace Portfolio.Api.Contact;

/// <summary>
/// Regras de validação do formulário de contato.
/// Mantenha em sincronia com web/src/scripts/contact-form.ts.
/// </summary>
public static class ContactValidator
{
    public const int NameMin = 2, NameMax = 120;
    public const int EmailMax = 200;
    public const int MessageMin = 10, MessageMax = 2000;

    /// <summary>Tipos de contato do formulário: um projeto, uma proposta ou outro assunto.</summary>
    public static readonly string[] Kinds = ["project", "proposal", "other"];

    /// <summary>Retorna os erros por campo; dicionário vazio = válido.</summary>
    public static Dictionary<string, string[]> Validate(ContactRequest request)
    {
        var errors = new Dictionary<string, string[]>();
        var name = request.Name?.Trim() ?? "";
        var email = request.Email?.Trim() ?? "";
        var message = request.Message?.Trim() ?? "";

        if (name.Length is < NameMin or > NameMax)
            errors["name"] = [$"O nome deve ter entre {NameMin} e {NameMax} caracteres."];

        if (email.Length > EmailMax || !IsValidEmail(email))
            errors["email"] = ["Informe um e-mail válido."];

        if (!Kinds.Contains(request.Kind))
            errors["kind"] = ["Escolha o tipo: um projeto, uma proposta ou outro assunto."];

        if (message.Length is < MessageMin or > MessageMax)
            errors["message"] = [$"A mensagem deve ter entre {MessageMin} e {MessageMax} caracteres."];

        return errors;
    }

    private static bool IsValidEmail(string email) =>
        MailAddress.TryCreate(email, out var address)
        && address.Address == email
        && address.Host.Contains('.');
}

using Portfolio.Api.Contact;

namespace Portfolio.Api.Tests;

public class ContactValidatorTests
{
    private static ContactRequest Valid() =>
        new("Ana Souza", "ana@empresa.com.br", "proposal", "Olá Daniel, gostaria de conversar sobre uma proposta.", null, "pt");

    [Fact]
    public void Valid_request_has_no_errors()
    {
        Assert.Empty(ContactValidator.Validate(Valid()));
    }

    [Theory]
    [InlineData("")]
    [InlineData("A")]
    [InlineData("   ")]
    public void Short_name_is_invalid(string name)
    {
        var errors = ContactValidator.Validate(Valid() with { Name = name });
        Assert.Contains("name", errors.Keys);
    }

    [Theory]
    [InlineData("")]
    [InlineData("sem-arroba")]
    [InlineData("ana@localhost")]
    [InlineData("Ana <ana@empresa.com>")]
    public void Invalid_email_is_rejected(string email)
    {
        var errors = ContactValidator.Validate(Valid() with { Email = email });
        Assert.Contains("email", errors.Keys);
    }

    [Theory]
    [InlineData("project")]
    [InlineData("proposal")]
    [InlineData("other")]
    public void Known_kinds_are_valid(string kind)
    {
        Assert.Empty(ContactValidator.Validate(Valid() with { Kind = kind }));
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("job")]
    public void Unknown_kind_is_rejected(string? kind)
    {
        Assert.Contains("kind", ContactValidator.Validate(Valid() with { Kind = kind }).Keys);
    }

    [Fact]
    public void Message_must_respect_length_limits()
    {
        Assert.Contains("message", ContactValidator.Validate(Valid() with { Message = "curta" }).Keys);
        Assert.Contains("message", ContactValidator.Validate(Valid() with { Message = new string('x', 2001) }).Keys);
    }
}

// Envio do formulário de contato para POST /api/contato.
// As mensagens de status vêm de data-attributes do <form> (já traduzidas no Contact.astro).

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const KINDS = ['project', 'proposal', 'other'];
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 2000;

type Payload = { name: string; email: string; kind: string; message: string };

/**
 * Valida com as mesmas regras da API (Portfolio.Api/Contact/ContactValidator.cs)
 * e devolve um erro por campo, já com o texto traduzido.
 */
function validate(p: Payload, msg: DOMStringMap): { field: string; text: string }[] {
  const errors: { field: string; text: string }[] = [];
  const fill = (template: string | undefined, n: number) => (template ?? '').replace('{n}', String(n));

  if (p.name.length < 2 || p.name.length > 120) errors.push({ field: 'name', text: msg.errName ?? '' });
  if (!EMAIL_RE.test(p.email) || p.email.length > 200) errors.push({ field: 'email', text: msg.errEmail ?? '' });
  if (!KINDS.includes(p.kind)) errors.push({ field: 'kind', text: msg.errKind ?? '' });
  if (p.message.length < MESSAGE_MIN)
    errors.push({ field: 'message', text: fill(msg.errMessageShort, MESSAGE_MIN - p.message.length) });
  if (p.message.length > MESSAGE_MAX)
    errors.push({ field: 'message', text: fill(msg.errMessageLong, p.message.length - MESSAGE_MAX) });

  return errors;
}

export function setupContactForm(form: HTMLFormElement) {
  const status = form.querySelector<HTMLElement>('.status')!;
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const msg = form.dataset;

  const show = (text: string | undefined, kind: 'info' | 'success' | 'error') => {
    status.textContent = text ?? '';
    status.dataset.kind = kind;
  };

  // Campo (ou grupo de rádios) que recebe a borda vermelha
  const fieldElement = (field: string) =>
    field === 'kind' ? form.querySelector<HTMLElement>('fieldset.kind') : form.querySelector<HTMLElement>(`[name="${field}"]`);

  const clearInvalid = () => form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));

  // O erro de um campo some assim que a pessoa volta a mexer nele
  form.addEventListener('input', (event) => {
    const target = event.target as HTMLElement;
    (target.closest('fieldset') ?? target).removeAttribute('aria-invalid');
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const payload = {
      name: data.name?.trim() ?? '',
      email: data.email?.trim() ?? '',
      kind: data.kind ?? '',
      message: data.message?.trim() ?? '',
      website: data.website ?? '', // honeypot
      lang: msg.lang ?? 'pt',
    };

    clearInvalid();
    const errors = validate(payload, msg);
    if (errors.length > 0) {
      for (const { field } of errors) fieldElement(field)?.setAttribute('aria-invalid', 'true');
      show(errors.map((e) => e.text).join('\n'), 'error');
      const first = fieldElement(errors[0].field);
      (first?.matches('fieldset') ? first.querySelector<HTMLElement>('input') : first)?.focus();
      return;
    }

    button.disabled = true;
    show(msg.msgSending, 'info');

    try {
      const res = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        // A API pode estar "fria" (container desligado); damos tempo para ela acordar
        signal: AbortSignal.timeout(15000),
      });

      if (res.ok) {
        form.reset();
        show(msg.msgSuccess, 'success');
      } else if (res.status === 429) {
        show(msg.msgRate, 'error');
      } else if (res.status === 400) {
        show(msg.msgInvalid, 'error');
      } else {
        show(msg.msgError, 'error');
      }
    } catch {
      show(msg.msgError, 'error');
    } finally {
      button.disabled = false;
    }
  });
}

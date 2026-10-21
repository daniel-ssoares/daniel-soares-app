// Envio do formulário de contato para POST /api/contato.
// As mensagens de status vêm de data-attributes do <form> (já traduzidas no Contact.astro).

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const KINDS = ['project', 'proposal', 'other'];

export function setupContactForm(form: HTMLFormElement) {
  const status = form.querySelector<HTMLElement>('.status')!;
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const msg = form.dataset;

  const show = (text: string | undefined, kind: 'info' | 'success' | 'error') => {
    status.textContent = text ?? '';
    status.dataset.kind = kind;
  };

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

    // Mesmas regras da API (Portfolio.Api/Contact/ContactValidator.cs)
    const valid =
      payload.name.length >= 2 &&
      payload.name.length <= 120 &&
      EMAIL_RE.test(payload.email) &&
      payload.email.length <= 200 &&
      KINDS.includes(payload.kind) &&
      payload.message.length >= 10 &&
      payload.message.length <= 2000;

    if (!valid) {
      show(msg.msgInvalid, 'error');
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

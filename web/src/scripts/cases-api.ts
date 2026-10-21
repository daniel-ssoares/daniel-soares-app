// Busca os cases na API .NET (/api/cases) e substitui os cards estáticos.
// Se a API estiver fria, fora do ar ou demorar demais, nada acontece: os cards estáticos continuam na tela.
// Os moldes HTML (<template data-template="...">) ficam em src/components/Cases.astro.

type ApiCase = {
  title: string;
  client: string;
  context?: string | null;
  problem?: string | null;
  summary: string;
  result?: string | null;
  metric?: { value: string; label: string } | null;
  tags: string[];
};

const TIMEOUT_MS = 2500;

function isApiCase(value: unknown): value is ApiCase {
  const c = value as ApiCase;
  return (
    typeof c?.title === 'string' &&
    typeof c.client === 'string' &&
    typeof c.summary === 'string' &&
    Array.isArray(c.tags)
  );
}

// textContent (e não innerHTML) para nunca interpretar HTML vindo do banco
function setText(root: Element, selector: string, text: string) {
  root.querySelector(selector)!.textContent = text;
}

function fillTags(root: Element, tags: string[]) {
  const list = root.querySelector('.tags')!;
  for (const tag of tags) {
    const li = document.createElement('li');
    li.textContent = String(tag);
    list.append(li);
  }
}

function clone(name: string) {
  const template = document.querySelector<HTMLTemplateElement>(`template[data-template="${name}"]`)!;
  return template.content.firstElementChild!.cloneNode(true) as HTMLElement;
}

const meta = (c: ApiCase) => [c.client, c.context].filter(Boolean).join(' · ');

function renderFeatured(c: ApiCase) {
  const node = clone('featured');
  setText(node, '.meta', meta(c));
  setText(node, 'h3', c.title);

  const metric = node.querySelector('.metric')!;
  if (c.metric) {
    setText(metric, '.metric-value', c.metric.value);
    setText(metric, '.metric-label', c.metric.label);
  } else {
    metric.remove();
  }

  const steps: Record<string, string | null | undefined> = {
    problem: c.problem,
    solution: c.summary,
    result: c.result,
  };
  for (const [step, text] of Object.entries(steps)) {
    const row = node.querySelector(`[data-step="${step}"]`)!;
    if (text) setText(row, 'dd', text);
    else row.remove();
  }

  fillTags(node, c.tags);
  return node;
}

function renderCase(c: ApiCase) {
  const node = clone('case');
  setText(node, '.meta', meta(c));
  setText(node, 'h3', c.title);
  setText(node, '.summary', c.summary);
  fillTags(node, c.tags);
  return node;
}

export async function loadCasesFromApi(container: HTMLElement) {
  const lang = container.dataset.lang ?? 'pt';

  let data: unknown;
  try {
    const res = await fetch(`/api/cases?lang=${lang}`, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return;
    data = await res.json();
  } catch {
    return; // fallback estático
  }

  if (!Array.isArray(data) || data.length === 0 || !data.every(isApiCase)) return;

  const [featured, ...others] = data;
  const grid = clone('grid');
  grid.append(...others.map(renderCase));

  container.replaceChildren(renderFeatured(featured), grid);
}

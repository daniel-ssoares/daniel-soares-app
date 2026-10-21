// Contador de visitas (opcional): avisa a API sem atrasar a página e sem cookies.
// sendBeacon entrega a requisição mesmo se o visitante fechar a aba; falhas são ignoradas.

export function trackVisit() {
  try {
    const body = JSON.stringify({ path: location.pathname, referrer: document.referrer || null });
    navigator.sendBeacon('/api/visitas', new Blob([body], { type: 'application/json' }));
  } catch {
    // sem contador, sem problema
  }
}

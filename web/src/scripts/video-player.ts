// Controles do vídeo de apresentação: som, pausar/reproduzir e legendas.
// O HTML do player está em src/components/VideoPlayer.astro.

export function setupVideoPlayer(root: HTMLElement) {
  const video = root.querySelector('video');
  const soundBtn = root.querySelector<HTMLButtonElement>('[data-action="sound"]');
  const playBtn = root.querySelector<HTMLButtonElement>('[data-action="play"]');
  const ccBtn = root.querySelector<HTMLButtonElement>('[data-action="captions"]');
  if (!video || !soundBtn || !playBtn || !ccBtn) return;

  // Legenda do idioma da página (a <track> marcada como default), ou a primeira disponível
  const lang = document.documentElement.lang.startsWith('en') ? 'en' : 'pt';
  const tracks = Array.from(video.textTracks);
  const track = tracks.find((t) => t.language === lang) ?? tracks[0];

  const setCaptions = (on: boolean) => {
    tracks.forEach((t) => (t.mode = t === track && on ? 'showing' : 'disabled'));
    ccBtn.setAttribute('aria-pressed', String(on));
    ccBtn.setAttribute('aria-label', (on ? ccBtn.dataset.labelOn : ccBtn.dataset.labelOff) ?? '');
  };

  const syncPlayButton = () => {
    const paused = video.paused;
    root.dataset.paused = String(paused);
    playBtn.setAttribute('aria-label', (paused ? playBtn.dataset.labelPlay : playBtn.dataset.labelPause) ?? '');
  };

  const syncSoundButton = () => {
    const label = video.muted ? soundBtn.dataset.labelOn : soundBtn.dataset.labelOff;
    soundBtn.querySelector('span')!.textContent = label ?? '';
  };

  // Legendas ligadas por padrão, porque o vídeo começa mudo
  setCaptions(true);
  syncPlayButton();
  syncSoundButton();

  soundBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    // Quem ativou o som quer assistir: volta ao início na primeira vez e garante que está tocando
    if (!video.muted && !root.dataset.unmutedOnce) {
      root.dataset.unmutedOnce = 'true';
      video.currentTime = 0;
    }
    if (!video.muted && video.paused) void video.play();
    syncSoundButton();
  });

  playBtn.addEventListener('click', () => {
    if (video.paused) void video.play();
    else video.pause();
  });

  ccBtn.addEventListener('click', () => {
    setCaptions(ccBtn.getAttribute('aria-pressed') !== 'true');
  });

  video.addEventListener('play', syncPlayButton);
  video.addEventListener('pause', syncPlayButton);
  video.addEventListener('volumechange', syncSoundButton);
}

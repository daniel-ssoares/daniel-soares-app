// Tipos das variáveis de ambiente públicas usadas em src/config.ts
interface ImportMetaEnv {
  readonly PUBLIC_VIDEO_MP4?: string;
  readonly PUBLIC_VIDEO_WEBM?: string;
  readonly PUBLIC_VIDEO_POSTER?: string;
  readonly PUBLIC_PHOTO?: string;
  readonly PUBLIC_CV_PT?: string;
  readonly PUBLIC_CV_EN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

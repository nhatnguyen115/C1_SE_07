/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // Thêm biến khác ở đây nếu cần
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

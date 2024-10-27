interface ImportMetaEnv {
    readonly VITE_AUTH_SERVICE_URL: string;
    readonly VITE_TOKEN_SERVICE_URL: string;
    readonly VITE_MACHINE_SERVICE_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

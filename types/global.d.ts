declare interface ViteEnv {
    VITE_NODE_ENV: "development" | "production" | "stage";
    VITE_PUBLIC_PATH: string;
    VITE_BASE_URL: string;
    VITE_BUILD_COMPRESS: "gzip" | "brotli" | "gzip,brotli" | "none";
}
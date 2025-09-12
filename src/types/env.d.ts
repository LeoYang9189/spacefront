// 环境变量类型定义
declare namespace NodeJS {
  interface ProcessEnv {
    // 公共环境变量（客户端可访问）
    NEXT_PUBLIC_API_BASE_URL: string;
    NEXT_PUBLIC_APP_ENV: "development" | "production" | "test";
    NEXT_PUBLIC_DEBUG: string;
    NEXT_PUBLIC_APP_NAME: string;
    NEXT_PUBLIC_APP_VERSION: string;
    NEXT_PUBLIC_DEFAULT_LANGUAGE: string;

    // 私有环境变量（仅服务端可访问）
    DATABASE_URL?: string;
    JWT_SECRET?: string;
    API_TIMEOUT?: string;
  }
}

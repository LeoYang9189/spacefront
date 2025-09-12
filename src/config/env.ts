// 环境变量配置文件
export const env = {
  // 公共环境变量（客户端可访问）
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  appEnv:
    (process.env.NEXT_PUBLIC_APP_ENV as
      | "development"
      | "production"
      | "test") || "development",
  debug: process.env.NEXT_PUBLIC_DEBUG === "true",
  appName: process.env.NEXT_PUBLIC_APP_NAME || "Z-Space",
  appVersion: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
  defaultLanguage: process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE || "zh-CN",

  // 私有环境变量（仅服务端可访问）
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  apiTimeout: parseInt(process.env.API_TIMEOUT || "15000", 10),

  // 环境判断
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  isTest: process.env.NODE_ENV === "test",
} as const;

// 验证必需的环境变量
export const validateEnv = () => {
  const requiredVars = ["NEXT_PUBLIC_API_BASE_URL"];

  const missing = requiredVars.filter((varName) => !process.env[varName]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }
};

// 开发环境下的环境变量打印（仅用于调试）
export const logEnvInDevelopment = () => {
  if (env.isDevelopment && env.debug) {
    console.log("🔧 Environment Variables:", {
      apiBaseUrl: env.apiBaseUrl,
      appEnv: env.appEnv,
      debug: env.debug,
      appName: env.appName,
      appVersion: env.appVersion,
      defaultLanguage: env.defaultLanguage,
    });
  }
};

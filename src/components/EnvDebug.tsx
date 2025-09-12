"use client";

import { env } from "@/config/env";

/**
 * 环境变量调试组件
 * 仅在开发环境且启用调试时显示
 */
export default function EnvDebug() {
  // 只在开发环境且启用调试时显示
  if (!env.isDevelopment || !env.debug) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-4 rounded-lg text-xs max-w-sm">
      <h3 className="font-bold mb-2">🔧 Environment Debug</h3>
      <div className="space-y-1">
        <div>
          <strong>App Name:</strong> {env.appName}
        </div>
        <div>
          <strong>Version:</strong> {env.appVersion}
        </div>
        <div>
          <strong>Environment:</strong> {env.appEnv}
        </div>
        <div>
          <strong>API URL:</strong> {env.apiBaseUrl}
        </div>
        <div>
          <strong>Language:</strong> {env.defaultLanguage}
        </div>
        <div>
          <strong>Debug Mode:</strong> {env.debug ? "ON" : "OFF"}
        </div>
      </div>
    </div>
  );
}

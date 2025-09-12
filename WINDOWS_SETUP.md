# Windows 系统环境变量配置指南

## 问题描述

在 Windows 系统下运行以下命令时会出现错误：

```bash
NODE_ENV=production next build
```

错误信息：`'NODE_ENV' 不是内部或外部命令，也不是可运行的程序`

## 解决方案

### ✅ 方案 1：使用 cross-env（推荐）

项目已安装 `cross-env` 包，现在所有脚本都支持跨平台：

```bash
# 开发环境
npm run dev

# 使用生产环境配置开发
npm run dev:prod

# 生产环境构建
npm run build

# 生产环境启动
npm run start:prod

# 构建分析
npm run build:analyze
```

### 方案 2：Windows 原生语法

如果不使用 cross-env，可以使用 Windows 原生语法：

#### Windows 命令提示符 (CMD)

```cmd
set NODE_ENV=production && next build
set NODE_ENV=production && next dev
```

#### Windows PowerShell

```powershell
$env:NODE_ENV="production"; next build
$env:NODE_ENV="production"; next dev
```

#### 批处理文件 (.bat)

创建 `build-prod.bat` 文件：

```batch
@echo off
set NODE_ENV=production
next build
```

### 方案 3：使用 npm 脚本

在 package.json 中定义脚本（已配置）：

```json
{
  "scripts": {
    "dev": "next dev",
    "dev:prod": "cross-env NODE_ENV=production next dev",
    "build": "cross-env NODE_ENV=production next build",
    "start": "next start -p 8088",
    "start:prod": "cross-env NODE_ENV=production next start -p 8088"
  }
}
```

## 环境变量文件

创建以下环境变量文件（在项目根目录）：

### .env（默认）

```bash
NEXT_PUBLIC_APP_NAME=Z-Space
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_DEFAULT_LANGUAGE=zh-CN
```

### .env.development（开发环境）

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_DEBUG=true
```

### .env.production（生产环境）

```bash
NEXT_PUBLIC_API_BASE_URL=https://api.zspace.com/api
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_DEBUG=false
```

## 验证配置

运行以下命令验证配置是否正确：

```bash
# 检查环境变量是否正确加载
npm run dev:prod

# 构建生产版本
npm run build

# 启动生产服务器
npm run start:prod
```

## 常见问题

### Q: 为什么需要 cross-env？

A: Windows 和 Unix 系统（macOS/Linux）设置环境变量的语法不同。cross-env 提供了跨平台的统一接口。

### Q: 可以不用 cross-env 吗？

A: 可以，但需要为不同操作系统编写不同的脚本，增加了维护成本。

### Q: 环境变量文件在哪里？

A: 放在项目根目录，与 package.json 同级。

### Q: 如何确认环境变量生效？

A: 在代码中使用 `console.log(process.env.NODE_ENV)` 或在浏览器开发者工具中查看网络请求的 URL。

## 推荐工作流

1. **开发时**：使用 `npm run dev`
2. **测试生产配置**：使用 `npm run dev:prod`
3. **构建生产版本**：使用 `npm run build`
4. **启动生产服务器**：使用 `npm run start:prod`

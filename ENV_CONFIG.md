# Next.js 环境变量配置指南

## 环境变量文件类型

### 1. 文件优先级（从高到低）

- `.env.local` - 本地环境变量（所有环境，会被 git 忽略）
- `.env.development` - 开发环境
- `.env.production` - 生产环境
- `.env` - 默认环境变量（所有环境）

### 2. 环境变量命名规则

#### 客户端环境变量（暴露到浏览器）

- 必须以 `NEXT_PUBLIC_` 开头
- 可以在客户端代码中访问
- 会被打包到最终的 JavaScript 文件中

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_DEBUG=true
```

#### 服务端环境变量（仅服务端访问）

- 不以 `NEXT_PUBLIC_` 开头
- 只能在服务端代码中访问
- 不会暴露到客户端

```bash
DATABASE_URL=postgresql://localhost:5432/zspace_dev
JWT_SECRET=your-jwt-secret-here
API_TIMEOUT=10000
```

### 3. 创建环境变量文件

#### .env（默认）

```bash
# 默认环境变量（所有环境共享）
NEXT_PUBLIC_APP_NAME=Z-Space
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_DEFAULT_LANGUAGE=zh-CN
```

#### .env.development（开发环境）

```bash
# 开发环境变量
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_DEBUG=true

# 开发环境私有变量
DATABASE_URL=postgresql://localhost:5432/zspace_dev
JWT_SECRET=dev-jwt-secret
API_TIMEOUT=10000
```

#### .env.production（生产环境）

```bash
# 生产环境变量
NEXT_PUBLIC_API_BASE_URL=https://api.zspace.com/api
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_DEBUG=false

# 生产环境私有变量
DATABASE_URL=postgresql://prod-server:5432/zspace_prod
JWT_SECRET=prod-jwt-secret-very-long-and-secure
API_TIMEOUT=5000
```

### 4. 在代码中使用环境变量

#### 客户端组件

```typescript
// 只能访问 NEXT_PUBLIC_ 开头的变量
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const isDebug = process.env.NEXT_PUBLIC_DEBUG === "true";
```

#### 服务端组件/API 路由

```typescript
// 可以访问所有环境变量
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const dbUrl = process.env.DATABASE_URL; // 私有变量
const jwtSecret = process.env.JWT_SECRET; // 私有变量
```

### 5. 运行不同环境

```bash
# 开发环境（自动加载 .env.development）
npm run dev

# 使用生产环境配置进行开发
npm run dev:prod

# 生产环境构建（自动加载 .env.production）
npm run build
npm run start

# 使用生产环境配置启动
npm run start:prod

# 构建分析
npm run build:analyze
```

### 6. Windows 系统兼容性

项目已安装 `cross-env` 包来确保跨平台兼容性：

- ✅ **Windows**: 使用 `cross-env` 自动处理环境变量
- ✅ **macOS/Linux**: 使用 `cross-env` 保持一致性

如果不使用 `cross-env`，Windows 系统需要使用以下语法：

```bash
# Windows 命令提示符 (CMD)
set NODE_ENV=production && next build

# Windows PowerShell
$env:NODE_ENV="production"; next build

# Unix/macOS/Linux
NODE_ENV=production next build
```

### 7. 注意事项

1. **安全性**: 不要将敏感信息放在 `NEXT_PUBLIC_` 变量中
2. **类型安全**: 建议创建类型定义文件
3. **验证**: 在应用启动时验证必需的环境变量
4. **Git 忽略**: 确保 `.env.local` 在 `.gitignore` 中
5. **跨平台兼容**: 使用 `cross-env` 确保 Windows/macOS/Linux 兼容性

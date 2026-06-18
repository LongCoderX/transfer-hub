# Astro 静态站架构

这个站点使用 **Astro** 从 Markdown + JSON 数据源构建纯静态 HTML，通过 GitHub Pages 部署。

## 目录结构

```
src/
├── layouts/
│   └── Base.astro            # 全站共享布局（header 导航、footer）
├── components/               # 可复用组件（预留）
├── content/
│   └── posts/
│       └── domestic-ai-recharge.md  # 知识文章（Markdown + frontmatter）
├── content.config.ts         # 内容集合 schema 定义
└── pages/
    ├── index.astro           # 首页
    ├── knowledge/
    │   ├── index.astro       # 知识库列表页（从 content/posts 自动生成）
    │   └── [...slug].astro   # 文章详情页（动态路由）
    ├── relays/
    │   ├── index.astro       # 中转站聚合页
    │   └── [slug].astro      # 中转站详情页（从 data/relays.json 生成）
    └── tools/
        └── index.astro       # 工具箱页

data/
└── relays.json               # 中转站结构化数据

public/
├── assets/
│   └── site.css              # 共享样式（构建时自动复制到 dist/）
└── go/
    └── suixiang/
        └── index.html        # 跳转页（含推广链接，直出到 dist/）

assets/site.css               # 样式源文件（同步到 public/assets/）

astro.config.mjs              # Astro 配置（base: /transfer-hub/）
package.json                  # 依赖和脚本
tsconfig.json
```

## 关键设计

### Markdown → HTML 工作流

- 知识文章用 Markdown 写在 `src/content/posts/` 目录
- 每篇文章用 frontmatter 定义元数据（标题、日期、标签、摘要）
- Astro 构建时自动读取、渲染为 HTML，并生成列表页
- **新增文章只需在 posts/ 下新建 .md 文件**，无需改任何 HTML

### 统一导航

所有页面共用 `Base.astro` 布局组件，通过 `current` prop 控制当前页高亮。
导航项永远一致：首页 / 知识库 / API·中转 / 我的工具箱。

### 数据驱动的中转站

`data/relays.json` 是单一日源，中转站聚合页和详情页都从它生成。
新增中转站流程：
1. 在 `data/relays.json` 里新增一条记录
2. 创建 `public/go/<slug>/index.html` 跳转页（含推广链接和自动跳转脚本）

中转站详情页自动渲染。

### 部署

`.github/workflows/deploy-pages.yml` 会：
1. Setup Node.js 20
2. `npm ci`
3. `npm run build`（输出到 `dist/`）
4. 上传 `dist/` 到 GitHub Pages

### 本地开发

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 构建到 dist/
npm run preview  # 预览构建结果
```

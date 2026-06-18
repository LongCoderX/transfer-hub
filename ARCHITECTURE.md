# 静态聚合站架构

这个站点按 GitHub Pages 直接部署设计，不依赖服务器、数据库或后端运行时。

## 目录

- `index.html`：当前主推落地页。
- `relays/`：中转站聚合页。
- `relays/<slug>/`：单个中转站详情页。
- `knowledge/`：知识分享文章。
- `go/<slug>/`：站内跳转页，集中管理推广链接。
- `data/relays.json`：中转站结构化数据，方便后续迁移到 Astro/Next。
- `data/posts.json`：文章结构化数据。
- `assets/site.css`：聚合站共享样式。

## 新增中转站流程

1. 在 `data/relays.json` 里新增一条记录。
2. 新建 `relays/<slug>/index.html`。
3. 新建 `go/<slug>/index.html`，把推广链接集中放进去。
4. 在 `relays/index.html` 聚合页新增对应卡片。

## 部署

当前 `.github/workflows/deploy-pages.yml` 会把仓库根目录作为静态站点上传到 GitHub Pages。

## 后续升级

当页面和文章数量变多后，可以迁移到 Astro：

- `data/*.json` 继续作为内容源。
- `relays/` 和 `knowledge/` 页面可以变成模板生成。
- `go/` 跳转页仍然可以静态生成。

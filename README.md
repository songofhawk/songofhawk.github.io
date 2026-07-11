# songofhawk.github.io

songofhawk 的个人主页，使用 React、Vite 和 GitHub Pages 构建。公开项目来自 GitHub API，博客文章来自当前仓库的 GitHub Issues。

## 本地运行

```bash
npm install
npm run dev
```

提交前检查：

```bash
npm run lint
npm run build
```

## 发布双语文章

每个语言版本使用一个独立 Issue。所有文章都需要 `blog` 标签，并按语言添加以下标签之一：

- 中文：`lang:zh`
- 英文：`lang:en`

网站会根据当前界面语言直接从 GitHub API 拉取对应标签的文章。

### 文章元数据

在 Issue 正文最顶部加入：

```md
<!-- blog-meta
slug: article-slug
comments: 3
-->
```

- `slug`：文章的稳定地址标识，只能使用小写字母、数字和连字符。中英文版本必须使用相同的 `slug`。
- `comments`：用于讨论的 GitHub Issue 编号。中英文版本填写同一个编号即可共享评论入口；省略时使用当前 Issue。

示例：

```text
中文 Issue：blog + lang:zh，slug: github-personal-homepage
英文 Issue：blog + lang:en，slug: github-personal-homepage
```

文章地址为：

```text
#/blog/github-personal-homepage
```

用户切换界面语言时，网站会加载同一 `slug` 的对应译文。如果译文尚不存在，详情页会显示另一语言的原文和明确提示；文章列表只展示当前语言已有的文章。

旧的 Issue 编号链接（例如 `#/blog/3`）仍然有效，并会自动升级为对应的 slug 地址。

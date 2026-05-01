# Content

Write posts as MDX files in `content/posts`.

```mdx
---
title: My Post
date: "2026-05-02"
---

import { ThemeSwitcher } from '@site/components'

# Hello

<ThemeSwitcher />
```

Use `@site/components` for components that the site intentionally exposes to posts.
Internal source paths under `src/` can move without forcing posts to change.

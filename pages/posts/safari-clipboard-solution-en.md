---
title: The Challenge of Clipboard Writing in Safari  
date: 2025-03-03 14:10:52  
lang: en-US  
duration: 10min  
pid: 0c14b5c5eca8994709886f1ce46d45cbdd70  
tags: TS  
categories: TypeScript  
lastEdit: 2025-03-03 14:10:52
draft: false  
---

[[toc]]

> [原文](/posts/safari-clipboard-solution) ｜ Translation from DeepSeek

Since playing Genshin Impact, I’ve been browsing posts on the MiHoYo Community and noticed their fun stickers, which unfortunately can’t be used directly outside the platform. To use these stickers on other social platforms, I recently developed a project called [MiHoYo Sticker](https://mhy-sticker.ctong.top/). Its core feature is simple: clicking a sticker copies the image to the clipboard using the `navigator.clipboard.write()` API.

Back in 2018, as web apps grew more complex, browsers began enforcing stricter security policies to prevent abuse of user permissions. Sensitive operations like clipboard access now require explicit user consent. Modern browsers typically enforce these restrictions by requiring such APIs to be called within user-triggered event handlers, e.g.:

```tsx
function App() {
  function onCopyHandler() {
    navigator.clipboard.write('hello world')
  }

  return (
    <Button onClick={onCopyHandler}>Copy</Button>
  )
}
```

This works perfectly in Chrome and even Safari—until you try copying images. In Safari, things get messy. To copy images, we need to convert them into a `Blob` and write it to the clipboard:

```tsx
function writeBlob(blob: Blob, type: string = blob.type) {
  const data = [new ClipboardItem({ [type]: blob })]
  return navigator.clipboard.write(data)
}

async function onCopy(event: MouseEvent<HTMLImageElement>, sticker: Sticker) {
  const img = event.currentTarget

  const canvas = document.createElement('canvas')
  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight

  const ctx = canvas.getContext('2d')
  ctx?.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)

  canvas.toBlob(async (blob) => {
    try {
      if (!blob)
        return
      await writeBlob(blob)

      toast(`You copied 「${sticker.name}」`, {
        position: 'top-right',
        icon: <BellIcon />,
      })
    }
    catch (e) {
      console.error(e)
    }
  }, 'image/png')
}
```

While this works in Chrome, Safari throws an error:

<div class="p-2 border-red-500 border-1 rounded-xl text-red-500 bg-red-500/10 mb-4">
  The request is not allowed by the user agent or the platform in the current context, possibly because the user denied permission.
</div>

Initially, I suspected OS-level clipboard permissions, but found no such settings. After checking <a href="https://webkit.org/blog/10247/new-webkit-features-in-safari-13-1" target="_blank">WebKit's documentation</a>, I realized Safari restricts `clipboard.write` to direct event handler calls. Asynchronous operations like `canvas.toBlob` → `write` are blocked.

To fix this, I bypassed `canvas.toBlob` and implemented a synchronous workflow:

```ts
function toBlob(canvas: HTMLCanvasElement) {
  const dataURL = canvas.toDataURL()

  const byteString = atob(dataURL.split(',')[1])
  const mimeString = dataURL.match(/^data:([^;]+);base64,/)?.[1]

  const buffer = new ArrayBuffer(byteString.length)
  const intArray = new Uint8Array(buffer)

  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i)
  }

  return new Blob([intArray.buffer], { type: mimeString })
}
```

This converts the canvas to a `dataURL`, decodes its Base64 content, and reconstructs the `Blob` manually. While efficiency compared to `canvas.toBlob` is unclear, it works in Safari :)

```ts
async function onCopy(event: React.MouseEvent<HTMLImageElement>, sticker: Sticker) {
  const img = event.currentTarget

  const canvas = imgToConvas(img)
  if (!canvas)
    return

  const blob = toBlob(canvas)
  if (!blob)
    return

  const clipboardItem = [new ClipboardItem({ [blob.type]: blob })]
  await navigator.clipboard.write(clipboardItem)
}
```

**Final Result**  
With this workaround, clipboard writing now works smoothly in Safari!  

Thank you for reading! Feel free to try the project:  
- Live Demo: [MiHoYo Sticker](https://mhy-sticker.ctong.top/)  
- GitHub Repo: [Clover-You/mihoyo-sticker](https://github.com/Clover-You/mihoyo-sticker)  

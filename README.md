<p align="center">
    <img src="./logo/logo-animate.svg" width="100%" height="300" alt="clippy the assistant">
</p>

<p align="center">
    Fork of <a href="https://github.com/dolanmiu/docx">dolanmiu/docx</a> with native SVG image support.
</p>

<p align="center">
    Easily generate and modify .docx files with JS/TS. Works for Node and on the Browser.
</p>

---

[![NPM version][npm-image]][npm-url]
[![Downloads per month][downloads-image]][downloads-url]
[![GitHub Action Workflow Status][github-actions-workflow-image]][github-actions-workflow-url]
[![PRs Welcome][pr-image]][pr-url]

<p align="center">
    <img src="https://i.imgur.com/QeL1HuU.png" alt="drawing"/>
</p>

# SVG Image Support

This fork adds native SVG image support to the docx library.

## Installation

```bash
npm install @jamesainslie/docx
```

## Usage

```typescript
import { ImageRun } from '@jamesainslie/docx';

// Embed SVG image using the mimeType option
const svgImage = new ImageRun({
  data: svgBytes,                    // Uint8Array of SVG XML
  mimeType: 'image/svg+xml',         // Signals SVG format
  transformation: {
    width: 600,
    height: 400,
  },
});
```

## Requirements

- Microsoft Word 2016 or later
- Microsoft 365

Older Word versions may not render SVG images correctly.

---

# Demo

## Browser

Here are examples of `docx` being used with basic `HTML/JS` in a browser environment:

-   https://codepen.io/dolanmiu/pen/RwNeObg
-   https://jsfiddle.net/dolanmiu/onadx1gu/

Here are examples of `docx` working in `Angular`:

-   https://stackblitz.com/edit/angular-docx
-   https://stackblitz.com/edit/angular-wmd6k3

Here are examples of `docx` working in `React`:

-   https://stackblitz.com/edit/react-docx
-   https://stackblitz.com/edit/react-docx-images (adding images to Word Document)

Here is an example of `docx` working in `Vue.js`:

-   https://stackblitz.com/edit/vuejs-docx

## Node

Press `endpoint` on the `RunKit` website:

![RunKit Instructions](https://user-images.githubusercontent.com/2917613/38582539-f84311b6-3d07-11e8-90db-5885ae02c3c4.png)

-   https://runkit.com/dolanmiu/docx-demo1 - Simple paragraph and text
-   https://runkit.com/dolanmiu/docx-demo2 - Advanced Paragraphs and text
-   https://runkit.com/dolanmiu/docx-demo3 - Bullet points
-   https://runkit.com/dolanmiu/docx-demo4 - Simple table
-   https://runkit.com/dolanmiu/docx-demo5 - Images
-   https://runkit.com/dolanmiu/docx-demo6 - Margins
-   https://runkit.com/dolanmiu/docx-demo7 - Landscape
-   https://runkit.com/dolanmiu/docx-demo8 - Header and Footer
-   https://runkit.com/dolanmiu/docx-demo10 - **My CV generated with docx**

More [here](https://github.com/jamesainslie/docx/tree/feature/svg-image-support/demo)

# How to use & Documentation

Please refer to the [documentation at https://docx.js.org/](https://docx.js.org/) for details on how to use this library, examples and much more!

# Playground

Experience `docx` in action through [Docx.js Editor][docxjs-editor-url], an interactive playground where you can code and preview the results in real-time.

# Examples

Check the [demo folder](https://github.com/jamesainslie/docx/tree/feature/svg-image-support/demo) for examples.

# Contributing

Read the contribution guidelines [here](https://docx.js.org/#/contribution-guidelines).

# Used by

[<img src="https://i.imgur.com/zy5qWmI.png" alt="drawing" height="50"/>](https://hfour.com/)
[<img src="https://i.imgur.com/OYP5tgS.png" alt="drawing" height="50"/>](https://fuzzproductions.com/)
[<img src="https://i.imgur.com/zUDMfZ3.png" alt="drawing" height="50"/>](https://www.mettzer.com/)
[<img src="https://i.imgur.com/wtNB1uq.png" alt="drawing" height="50"/>](https://www.wisedoc.net/)
[<img src="https://i.imgur.com/suiH2zc.png" alt="drawing" height="50"/>](https://www.dabblewriter.com/)
[<img src="https://i.imgur.com/1LjuK2M.png" alt="drawing" height="50"/>](https://turbopatent.com/)
[<img src="https://i.imgur.com/dHMg0wF.gif" alt="drawing" height="50"/>](http://www.madisoncres.com/)
[<img src="https://i.imgur.com/QEZXU5b.png" alt="drawing" height="50"/>](https://www.beekast.com/)
[<img src="https://i.imgur.com/XVU6aoi.png" alt="drawing" height="50"/>](https://herraizsoto.com/)
[<img src="https://i.imgur.com/fn1xccG.png" alt="drawing" height="50"/>](http://www.ativer.com.br/)
[<img src="https://i.imgur.com/cmykN7c.png" alt="drawing"/>](https://www.arity.co/)
[<img src="https://i.imgur.com/PXo25um.png" alt="drawing" height="50"/>](https://www.circadianrisk.com/)
[<img src="https://i.imgur.com/AKGhtlh.png" alt="drawing"/>](https://lexense.com/)
[<img src="https://i.imgur.com/9tqJaHw.png" alt="drawing" height="50"/>](https://novelpad.co/)
[<img src="https://i.imgur.com/5bLKFeP.png" alt="drawing" height="50"/>](https://proton.me/)

...and many more!

---

This fork is based on the excellent work by [Dolan Miu](https://github.com/dolanmiu) and contributors on [dolanmiu/docx](https://github.com/dolanmiu/docx).

[npm-image]: https://badge.fury.io/js/@jamesainslie%2Fdocx.svg
[npm-url]: https://npmjs.org/package/@jamesainslie/docx
[downloads-image]: https://img.shields.io/npm/dm/@jamesainslie/docx.svg
[downloads-url]: https://npmjs.org/package/@jamesainslie/docx
[github-actions-workflow-image]: https://github.com/jamesainslie/docx/workflows/Publish%20to%20npm/badge.svg
[github-actions-workflow-url]: https://github.com/jamesainslie/docx/actions
[pr-image]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[pr-url]: http://makeapullrequest.com

# Astro + eleventy-img

A tiny script intended to be used with [Astro](https://astro.build/) for generating images with [eleventy-img](https://github.com/11ty/eleventy-img)

It was mostly made for my own website and I do not intend to really support this as more modern solutions are in the work for Astro

## Installation

```shell
npm install astro-eleventy-img
```

Due to an issue in the current version of Vite used by Astro, you need to add the following to your astro project config file:

```js
vite: {
    ssr: {
      external: ["@11ty/eleventy-img"],
    },
},
```

## Usage

The best way to use this in my opinion is to use it to generate images in the `public` folder. That way, they're copied directly to the result website. This is the default behavior.

### Javascript Usage

```astro
---
import { generateImage } from "astro-eleventy-img"

const myImage = generateImage("/src/assets/my_image.png", {
  // The options here are passed directly to eleventy-img
  widths: [300],
  formats: ["webp", "avif"],
})
---

<img src={myImage.webp[0].url} />
```

`generateImage` returns an object containing all the formats generated and metadata you can use in your HTML, so myImage is equal to:

```js
{
  webp: [
    {
      format: 'webp',
      width: 300,
      height: 240,
      url: '/assets/images/RfSNa8TCUW-300.webp',
      sourceType: 'image/webp',
      srcset: '/assets/images/RfSNa8TCUW-300.webp 300w',
      filename: 'RfSNa8TCUW-300.webp',
      outputPath: 'public/assets/images/RfSNa8TCUW-300.webp'
    }
  ],
  avif: [
    {
      format: 'avif',
      width: 300,
      height: 240,
      url: '/assets/images/RfSNa8TCUW-300.avif',
      sourceType: 'image/avif',
      srcset: '/assets/images/RfSNa8TCUW-300.avif 300w',
      filename: 'RfSNa8TCUW-300.avif',
      outputPath: 'public/assets/images/RfSNa8TCUW-300.avif'
    }
  ]
}
```

The following files will be generated in the `public/assets/images` folder:

```shell
RfSNa8TCUW-300.webp
RfSNa8TCUW-300.avif
```

### Component Usage

Alternatively, it can also be used through a provided component to automatically generate proper HTML for you:

```astro
---
import { Image } from "astro-eleventy-img"
---

<Image src="/src/assets/my_image.png" alt="My super image!" caption="This is my favorite image." />
```

will generate the following HTML:

```html
<figure>
  <picture>
    <source type="image/avif" srcset="/assets/images/4dWK95ygTq-640.avif 640w" />
    <source type="image/webp" srcset="/assets/images/4dWK95ygTq-640.webp 640w" />
    <img
      alt="My super image!"
      loading="lazy"
      decoding="async"
      src="/assets/images/4dWK95ygTq-640.png"
      width="640"
      height="514"
    />
  </picture>
  <figcaption>
    <p>This is my favorite image.</p>
  </figcaption>
</figure>
```

and the following files will be generated in the `public/assets/images` folder:

```shell
4dWK95ygTq-640.avif
4dWK95ygTq-640.webp
4dWK95ygTq-640.png
```

The included `Image` component is a thin wrapper around `generateImage`, it works for most needs but do not hesitate to build your own!

## [Complete Docs available here](./Docs.md)

## Troubleshooting

### require is not defined

Make sure to add the following to your `astro.config.js` config:

```js
vite: {
    ssr: {
      external: ["@11ty/eleventy-img"],
    },
},
```

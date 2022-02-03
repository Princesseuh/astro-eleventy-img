# Astro + eleventy-img

A tiny script and component intended to be used with [Astro](https://astro.build/) for generating images with [eleventy-img](https://github.com/11ty/eleventy-img). It also supports creating blurry placeholders for said images

It was mostly made for my own website and I do not intend to really support this outside of my own needs as more modern and generalist solutions are in the work for Astro

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

#### Generating images

```astro
---
import { generateImage } from "astro-eleventy-img"

const myImage = generateImage("src/assets/my_image.png", {
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

#### Generating placeholders

```astro
---
import { generatePlaceholder } from "astro-eleventy-img"

const myPlaceholder = generatePlaceholder("src/assets/my_image.png")
---

<img src={myPlaceholder.dataURI} width={myPlaceholder.width} height={myPlaceholder.height} />
```

`generatePlaceholder` return an object containing all the properties needed for showing the image. So `myPlaceholder` in this example is equal to:

```js
{
  dataURI: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAHCAIAAABV+fA3AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAz0lEQVQImQHEADv/AJ7Ho7PYwTt5UhdkNjmLSUOPUCB4MSFzMkGMNACixqksb04WUy4wdz9cnFxPnksbaS0HTCo3hDUAnLmcRnFLQ289ZpZXn7Z9MpA+OYU9EFstVZpHAJ3GaqnPbJXFW5iyZNzLqZWvco+9YHeqVlKXSACu1myt13Cc1GW6ynnFrIjK4ouSzFZ/vlNsskgAytqD1d6Q3+Kevsl/xb951+OXyt6FstVytNRzAIS0S4i2S5u8TK3NXrPOZ57CYqLGXWiqOoi4Rz9UYMGpm241AAAAAElFTkSuQmCC"
  width: 640
  height: 514
  quality: 60
}
```

### Component Usage

Alternatively, it can also be used through a provided component to automatically generate the proper HTML for including the image and its placeholder:

```astro
---
import { Image } from "astro-eleventy-img"
---

<Image src="src/assets/my_image.png" alt="My super image!" caption="This is my favorite image." />
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
      style="
      background-size: cover;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAHCAIAAABV+fA3AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAz0lEQVQImQHEADv/AJ7Ho7PYwTt5UhdkNjmLSUOPUCB4MSFzMkGMNACixqksb04WUy4wdz9cnFxPnksbaS0HTCo3hDUAnLmcRnFLQ289ZpZXn7Z9MpA+OYU9EFstVZpHAJ3GaqnPbJXFW5iyZNzLqZWvco+9YHeqVlKXSACu1myt13Cc1GW6ynnFrIjK4ouSzFZ/vlNsskgAytqD1d6Q3+Kevsl/xb951+OXyt6FstVytNRzAIS0S4i2S5u8TK3NXrPOZ57CYqLGXWiqOoi4Rz9UYMGpm241AAAAAElFTkSuQmCC);
    "
      onload="this.style.backgroundImage='none'"
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

The included `Image` component is a thin wrapper around `generateImage` and `generatePlaceholder`, it works for most needs but do not hesitate to build your own!

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

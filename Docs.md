# Docs

## JS usage

The `generateImage` returns an object containing the different formats generated (see main README for example) and takes the following parameters:

### src

The path to the image, this is relative to your project root

### options

An object containing options that `eleventy-img` will use for generating your image. See [eleventy-img's documentation](https://www.11ty.dev/docs/plugins/image/) for a list of accepted parameters

By default:

```js
{
  outputDir: "public/assets/images",
  urlPath: "/assets/images",
}
```

## Component usage

The `Image` component return the complete HTML needed to show the image on your website and takes the following parameters:

### src

See [JS usage#src](#src)

### options

See [JS usage#options](#options). However, it should be noted that the default settings also include the following in addition to the previously mentionned ones:

```js
{
    widths: [null],
    formats: ["avif", "webp", "png"],
    sharpWebpOptions: {
      quality: quality, // See #quality below for explanation
    },
    sharpAvifOptions: {
      quality: quality, // Same
    },
}
```

### alt

Add an alt text to your image, by `eleventy-img`'s rules, this is not optional. Accessibility is important

### caption

Since the component generate a `figure`, this option allows for the addition of a `figcaption`

### sizes

See [the MDN page](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/sizes) on `sizes`

### classes

CSS classes to add to the `figure` element

### quality

Set the quality of the generated images, by default `90`

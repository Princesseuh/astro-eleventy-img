# Docs

## JS usage

### `generateImage`

The `generateImage` returns an object containing the different formats generated (see main README for example) and takes the following parameters:

#### src

The path to the image, this is relative to your project root

#### options

An object containing options that `eleventy-img` will use for generating your image. See [eleventy-img's documentation](https://www.11ty.dev/docs/plugins/image/) for a list of accepted parameters

By default:

```js
{
  outputDir: "public/assets/images",
  urlPath: "/assets/images",
}
```

### `generatePlaceholder`

The `generatePlaceholder` function returns an object containing the different properties you might need to show the placeholder, example:

```js
{
  dataURI: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAHCAIAAABV+fA3AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAz0lEQVQImQHEADv/AJ7Ho7PYwTt5UhdkNjmLSUOPUCB4MSFzMkGMNACixqksb04WUy4wdz9cnFxPnksbaS0HTCo3hDUAnLmcRnFLQ289ZpZXn7Z9MpA+OYU9EFstVZpHAJ3GaqnPbJXFW5iyZNzLqZWvco+9YHeqVlKXSACu1myt13Cc1GW6ynnFrIjK4ouSzFZ/vlNsskgAytqD1d6Q3+Kevsl/xb951+OXyt6FstVytNRzAIS0S4i2S5u8TK3NXrPOZ57CYqLGXWiqOoi4Rz9UYMGpm241AAAAAElFTkSuQmCC';
  width: 640;
  height: 514;
  quality: 60;
}
```

and takes the following parameters:

#### src

The path to the image to generate your placeholder from, this is relative to your project root

#### options

An object containing options used to generate the placeholder

By default:

```js
{
  quality: 60,
  outputDir: "src/assets/placeholders",
}
```

##### About the outputDir

It should be noted that unlike images, placeholders should be in `src` and not in `public` as they're never accessed directly by the user but only at build time. It could also be in a `cache` folder somewhere as it's only for cache purpose that it's written to disk

##### Caution about quality

Please note that `quality` might not work like you think it does, it does not define the image blurryness or anything like that but the amount of pixel your final image will be made of, that means that if you have a square image and you put a value less than 4, you'll only have corners of a blurry image showing

The default value should accommodate more or less all kind of images but you might need to set an higher value for certain formats

## Component usage

The `Image` component return the complete HTML needed to show the image and its placeholder on your website and takes the following parameters:

### src

See [generateImage#src](#src)

### options

See [generateImage#options](#options). However, it should be noted that the default settings also include the following in addition to the previously mentionned ones:

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

### placeholderOptions

See [generatePlaceholder#options](#options-1)

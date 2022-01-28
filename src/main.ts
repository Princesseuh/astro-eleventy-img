import Image from "@11ty/eleventy-img"

const defaultOptions: ImageOptions = {
  outputDir: "public/assets/images",
  urlPath: "/assets/images",
}

export function generateImage(src: string, options: ImageOptions): Record<string, ImageFormat[]> {
  // Merge with default settings
  const settings = Object.assign(options, defaultOptions)

  // Generate the image
  ;(async () => {
    await Image(src, settings)
  })()

  // Return the images info
  return Image.statsSync(src, settings)
}

// Please Eleventy, adopt TypeScript!
export interface ImageFormat {
  format: string
  width: number
  height: number
  filename: string
  outputPath: string
  url: string
  sourceType: string
  srcset: string
  size: number
}

export interface ImageOptions {
  widths?: number[]
  formats?: string[]
  outputDir?: string
  urlPath?: string
  [key: string]: unknown
}

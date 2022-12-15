import type { ImageFormat, ImageOptions } from '@11ty/eleventy-img';
import Image from '@11ty/eleventy-img';

const defaultOptions: ImageOptions = {
	outputDir: 'public/assets/images',
	urlPath: '/assets/images',
};

export async function generateImage(src: string, options: ImageOptions): Promise<Image.Metadata> {
	// Merge with default settings
	const settings = Object.assign(defaultOptions, options);

	// Generate the image and returns its info
	return await Image(src, settings);
}

export type { ImageOptions, ImageFormat };

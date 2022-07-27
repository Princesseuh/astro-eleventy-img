import type { ImageOptions } from '@11ty/eleventy-img';
import Image from '@11ty/eleventy-img';

const defaultOptions: ImageOptions = {
	outputDir: 'public/assets/images',
	urlPath: '/assets/images',
};

export function generateImage(src: string, options: ImageOptions): Image.Metadata {
	// Merge with default settings
	const settings = Object.assign(defaultOptions, options);

	// Generate the image
	(async () => {
		await Image(src, settings);
	})();

	// Return the images info
	return Image.statsSync(src, settings);
}

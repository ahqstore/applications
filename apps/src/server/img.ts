import * as sizeOf from "image-size";
import { getImage } from "astro:assets";

import { readFileSync } from "node:fs";

import type { ImageMetadata } from "astro";

const responsiveWidths = [
  32,
  48,
  64,
  96,
  128,
  256,
  512,
  100,
  200,
  284,
  320, // Small mobile
  640, // Medium mobile / Small tablet
  768, // Tablet / Small desktop
  1024, // Desktop
  1280, // Larger Desktop
  // You might want to include a width up to the maximum display size you expect,
  // but avoid going over the actual display size needed.
  // For a 2000x2000 source, consider the actual space the image will occupy on screen.
  // If your hero section is max 1400px wide, no need for widths > 1400px.
  1440, // Example: common max width for hero on larger screens
];

export async function getImageParsed(
  data: Record<string, { default: ImageMetadata }>,
  iconUrl: string,
  absoluteIcon: string
) {
  let h: any = { width: undefined, height: undefined, inferSize: true };
  let override: string | undefined = undefined;

  try {
    const { height, width } = sizeOf.default(readFileSync(absoluteIcon));

    h.height = height;
    h.width = width;
    h.inferSize = false;
  } catch (e) {
    override = (() => {
      try {
        console.error(`✨ Using fallback strat ${absoluteIcon}`);
        return readFileSync(absoluteIcon).toString();
      } catch (e) {
        console.error(`🚨 Failed to load sizeof & icon of ${absoluteIcon}`);
        return "";
      }
    })();

    if (override == "") {
      override = "/1064x1064.png";
      h.height = 1064;
      h.width = 1064;
      h.inferSize = false;
    }
  }

  // @ts-ignore
  const imgSrc = override || data[iconUrl.replace("{ASSET}", "0")].default;

  return await getImage({
    // @ts-ignore
    src: imgSrc,
    format: "webp",
    // For LCP, ensure `sizes` attribute is passed to the img tag
    // to help browser pick the right size quickly.
    // This height is for the *output* image. If it's a background, it's just a hint.
    widths: responsiveWidths, // Generate multiple widths
    quality: 80,
    ...h,
  });
}
// Standard 8x8 Bayer ordered-dither threshold matrix (values 0-63). Shared by
// AnimatedBackground and DitheredPhoto so both surfaces use the same 8-bit
// dither language instead of two different filter techniques.
export const BAYER_8X8 = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
];

// Renders the matrix to an 8x8 canvas and returns a data URL. Draw at native
// size and scale up via CSS `background-size` + `image-rendering: pixelated`
// so each cell reads as a crisp block (the 8-bit look) rather than a smooth
// gradient.
export function createBayerDitherDataUrl(): string {
  const canvas = document.createElement("canvas");
  canvas.width = 8;
  canvas.height = 8;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(8, 8);
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const v = Math.round((BAYER_8X8[y][x] / 63) * 255);
      const i = (y * 8 + x) * 4;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL("image/png");
}

const CLOUD_NAME = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME ?? 'dytkrko2h';

type CloudinaryOptions = {
  width?: number;
  height?: number;
  quality?: string | number;
  format?: string;
  crop?: string;
  gravity?: string;
};

export function cloudinaryUrl(publicId: string, options: CloudinaryOptions = {}): string {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto',
  } = options;

  const transforms: string[] = [`f_${format}`, `q_${quality}`];

  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (width || height) {
    transforms.push(`c_${crop}`);
    transforms.push(`g_${gravity}`);
  }

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms.join(',')}/${publicId}`;
}

export function cloudinaryFetch(url: string, options: CloudinaryOptions = {}): string {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
  } = options;

  const transforms: string[] = [`f_${format}`, `q_${quality}`];
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);

  const encoded = encodeURIComponent(url);
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/fetch/${transforms.join(',')}/${encoded}`;
}

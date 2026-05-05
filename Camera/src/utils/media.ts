import path from 'path';

export const SUPPORTED_VIDEO_EXTENSIONS = ['.m4v', '.mp4', '.mov'];
export const SUPPORTED_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

export type MediaCategory = 'image' | 'video' | 'unknown';

export const determineMediaCategory = (uri: string): MediaCategory => {
  const fileExtension = path.extname(uri).toLowerCase();

  return SUPPORTED_IMAGE_EXTENSIONS.includes(fileExtension)
    ? 'image'
    : SUPPORTED_VIDEO_EXTENSIONS.includes(fileExtension)
      ? 'video'
      : 'unknown';
};

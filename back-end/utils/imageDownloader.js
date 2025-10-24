import download from 'image-downloader';
import mime from 'mime-types';

export const downloadImage = async (link, destination) => {
  const mineType = mime.lookup(link);
  const contentType = mime.contentType(mineType);
  const extension = mime.extension(contentType);

  const filename = `${Date.now()}.${extension}`;
  const fullPath = `${destination}${filename}`;

  try {
    const options = {
      url: link,
      dest: fullPath,
    };
    await download.image(options);
    return filename;
  } catch (error) {
    throw new Error('Erro ao baixar a imagem!');
  }
};

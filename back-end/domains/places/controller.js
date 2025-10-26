import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { __dirname } from '../../server.js';
import 'dotenv/config.js';
import download from 'image-downloader';
import mime from 'mime-types';
import fs from 'fs';
import multer from 'multer';

const { S3_ACCESS_KEY, S3_SECRET_KEY, BUCKET } = process.env;

const getExtension = (path) => {
  const mimeType = mime.lookup(path);
  const contentType = mime.contentType(mimeType);
  const extension = mime.extension(contentType);

  return { extension, mimeType };
};

export const sendToS3 = async (filename, path, mimeType) => {
  const client = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: S3_ACCESS_KEY,
      secretAccessKey: S3_SECRET_KEY,
    },
  });
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: filename,
    Body: fs.readFileSync(path),
    ContentType: mimeType,
    ACL: 'public-read',
  });
  try {
    await client.send(command);

    return `https://${BUCKET}.s3.us-east-1.amazonaws.com/${filename}`;
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw new Error('Error uploading to S3');
  }
};

export const downloadImage = async (link) => {
  const { extension, mimeType } = getExtension(link);
  const destination = `${__dirname}/tmp/`;

  const filename = `${Date.now()}.${extension}`;
  const fullPath = `${destination}${filename}`;

  try {
    const options = {
      url: link,
      dest: fullPath,
    };
    await download.image(options);
    return { filename, fullPath, mimeType };
  } catch (error) {
    throw new Error('Erro ao baixar a imagem!');
  }
};

export const uploadImage = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${__dirname}/tmp/`);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Math.round(Math.random() * 1e9);
      const { extension } = getExtension(file.originalname);

      cb(null, `${Date.now()}-${uniqueSuffix}.${extension}`);
    },
  });

  return multer({ storage });
};

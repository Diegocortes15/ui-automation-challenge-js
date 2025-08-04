import { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';

process.loadEnvFile();

const { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_PUBLIC_KEY, AWS_SECRET_KEY } = process.env;

class S3Service {
  _client;

  constructor() {
    this._client = new S3Client({
      region: AWS_BUCKET_REGION,
      credentials: {
        accessKeyId: AWS_PUBLIC_KEY,
        secretAccessKey: AWS_SECRET_KEY,
      },
    });
  }

  async uploadFile(imagePath) {
    try {
      console.log('🎨 Uploading file:', imagePath);

      const stream = fs.createReadStream(imagePath);

      // Extract filename from path
      const fileName = imagePath.split(/[\\/]/).pop(); // Works for both Windows and Unix paths
      console.log('Extracted filename:', fileName);

      const uploadParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: fileName,
        Body: stream,
      };

      const command = new PutObjectCommand(uploadParams);
      const result = await this._client.send(command);
      console.log('✅ Upload successful:', result);
      return result;
    } catch (error) {
      throw new Error(` Upload failed for file ${imagePath}: ${error.message}`, {
        cause: error,
      });
    }
  }

  async getFiles() {
    const command = new ListObjectsCommand({
      Bucket: AWS_BUCKET_NAME,
    });

    return await this._client.send(command);
  }

  async getFile(fileName) {
    const command = new GetObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: fileName,
    });

    return await this._client.send(command);
  }

  async downloadFile(fileName, fileNameLocation) {
    const command = new GetObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: fileName,
    });

    const result = await this._client.send(command);

    await fs.promises.mkdir(fileNameLocation, { recursive: true });

    result.Body.pipe(fs.createWriteStream(path.join(fileNameLocation, fileName)));
  }
}

export default new S3Service();

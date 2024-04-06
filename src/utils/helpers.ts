import jwt from 'jsonwebtoken';
import type formidable from 'formidable';
import { existsSync, mkdirSync, renameSync } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ValidateFileType } from '@dto/validate-filetype.dto';
import { ValidateFileResult } from '@entities/validate-fileresult.entity';
import { config } from './config';

export const generateUUID = (): string => uuidv4();

export const validateFile = (file: formidable.File, { config }: { config: ValidateFileType }): ValidateFileResult => {
  const defaultName = generateUUID();
  const { originalFilename } = file;
  const { filename: configFilename, allowedExtension, allowedMimetypes } = config;

  if (originalFilename == null) {
    return { error: 'Nama File tidak valid' };
  }

  const extension = path.extname(originalFilename);

  if (!allowedExtension.includes(extension as unknown as any)) {
    return {
      error: `Extension tidak valid. Extension yang diperbolehkan ${allowedExtension.join(',')}`,
    };
  }

  if (!allowedMimetypes.includes(file.mimetype as unknown as any)) {
    return {
      error: `Mimetype tidak valid. Mimetype yang diperbolehkan ${allowedMimetypes.join(',')}`,
    };
  }

  const fileSize = file.size / (1024 * 1024);
  if (fileSize > config.allowedSize) {
    return {
      error: `File terlalu besar. Ukurang yang diperbolehkan ${config.allowedSize} Mb`,
    };
  }

  const name = configFilename !== undefined ? `${config.filename}` : `${defaultName}${extension}`;

  return { name };
};

export const moveFile = (
  /// /public/images/image.jpg
  oldPath: string,
  newPath: string,
): void => {
  const dir = path.dirname(newPath);

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  renameSync(oldPath, newPath);
};

export const generateTokenJWT = (payload: any) => {
  const secretKey = config.SECRET_KEY;
  const token = jwt.sign(payload, secretKey, { expiresIn: '1 days' });

  return token;
};

export const isNumber = (value: any) => {
  return !isNaN(value);
};

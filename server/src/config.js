import dotenv from 'dotenv';
import path from 'path';

const devEnvPath = path.resolve(process.cwd(), './config/dev.env');

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: devEnvPath, debug: true });
}

const {
  DATABASE_URL,
  PORT,
  NODE_ENV,
  JSON_WEB_SECRET_KEY,
} = process.env;

const SALT_WORK_FACTOR = parseInt(process.env.SALT_WORK_FACTOR, 10);

export {
  DATABASE_URL,
  PORT,
  NODE_ENV,
  JSON_WEB_SECRET_KEY,
  SALT_WORK_FACTOR,
};

import { initMongoDB } from './db/initMongoDB.js';
import serverStart from './server.js';

export const boostrap = async () => {
  await initMongoDB();
  serverStart();
};

boostrap();

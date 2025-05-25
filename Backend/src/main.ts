import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

const start = async () => {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

start();

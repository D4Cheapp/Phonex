import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';

const start = async () => {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalGuards(new AuthGuard(app.get(AuthService), app.get(Reflector)));

  const swaggerConfig = new DocumentBuilder().setTitle('Phonex API').setVersion('1.0').build();
  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/swagger', app, documentFactory);

  await app.listen(PORT, () => console.log(`Server started on port ${PORT ?? 3000}`));
};

start();

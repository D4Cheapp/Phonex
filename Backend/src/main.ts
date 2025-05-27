import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { AuthService } from './auth/auth.service';
import { RoleGuard } from './role/role.guard';

const start = async () => {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalGuards(new RoleGuard(app.get(AuthService), app.get(Reflector)));

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

start();

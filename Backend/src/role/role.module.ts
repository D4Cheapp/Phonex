import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';

import { Role } from './role.entity';
import { RoleGuard } from './role.guard';
import { RoleService } from './role.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), AuthModule],
  providers: [RoleService, RoleGuard],
  exports: [RoleService, RoleGuard],
})
export class RoleModule {}

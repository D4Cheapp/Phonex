import { SetMetadata } from '@nestjs/common';

export const RolesD = (roles: string[]) => SetMetadata('roles', roles);

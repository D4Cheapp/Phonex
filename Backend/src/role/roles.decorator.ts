import { SetMetadata, applyDecorators } from '@nestjs/common';
import { ApiCookieAuth } from '@nestjs/swagger';

import { RolesE } from 'src/constants/roles';

const ROLES_KEY = 'roles';

export const RolesD = (roles: RolesE[]) => {
  return applyDecorators(SetMetadata(ROLES_KEY, roles), ApiCookieAuth());
};

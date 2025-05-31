import { SetMetadata, applyDecorators } from '@nestjs/common';
import { ApiCookieAuth } from '@nestjs/swagger';

import { Roles } from 'src/constants/roles';

const ROLES_KEY = 'roles';

export const RolesD = (roles: Roles[]) => {
  return applyDecorators(SetMetadata(ROLES_KEY, roles), ApiCookieAuth());
};

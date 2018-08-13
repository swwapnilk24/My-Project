import { RoleType } from './ActionType';

export function fetchRoleTypes(data) {
  return { type: RoleType.GET_ROLES, data };
}

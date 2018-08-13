import { RolesApprovalType } from './ActionType';
// import { PerformanceManagementUrl } from './ActionURL';

export function RolesApprovalData(data) {
  return { type: RolesApprovalType.GET_ROLES_APPROVAL, data };
}
export function updateRolesApprovalData(data) {
  return { type: RolesApprovalType.UPDATE_ROLES_APPROVAL_DATA, data };
}

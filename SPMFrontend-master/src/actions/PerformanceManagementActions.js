// import axios from 'axios';
import { PerformanceManagementType } from './ActionType';
// import { PerformanceManagementUrl } from './ActionURL';

export function performanceManagementData(data) {
  return { type: PerformanceManagementType.GET_PERFORMANCE_MANAGEMENT_DATA, data };
}
export function updatePerformanceManagementData(data) {
  return { type: PerformanceManagementType.UPDATE_PERFORMANCE_MANAGEMENT_DATA, data };
}


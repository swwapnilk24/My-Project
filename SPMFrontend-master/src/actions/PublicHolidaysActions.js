import { PublicHolidaysType } from './ActionType';
// import { PerformanceManagementUrl } from './ActionURL';

export function PublicHolidaysData(data) {
  return { type: PublicHolidaysType.GET_PUBLIC_HOLIDAYS_DATA, data };
}
export function updatePublicHolidaysData(data) {
  return { type: PublicHolidaysType.UPDATE_PUBLIC_HOLIDAYS_DATA, data };
}

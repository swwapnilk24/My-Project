import { DashboardType } from './ActionType';

export function testDashboard() {
  return function (dispatch) {
    dispatch({ type: DashboardType.TEST, mesage: 'Testing' });
  };
}

import axios from 'axios';
import { BandsAndPlans } from './ActionURL';

export function planDetails() {
  return (dispatch) => {
    axios.get(BandsAndPlans.GET_PLANS)
    .then((response) => {
      // console.log(response);
      dispatch({ type: 'BAND_AND_PLAN_DETAILS', bandaAndPlanDetails: response });
    });
  };
}
export function bandDetails() {
  return (dispatch) => {
    axios.get(BandsAndPlans.GET_BANDS)
    .then((response) => {
      // console.log(response);
      dispatch({ type: 'BAND_DETAILS', bandDetails: response });
    });
  };
}
export function targetPlanDetails() {
  return (dispatch) => {
    axios.get(BandsAndPlans.TARGET_PLANS)
    .then((response) => {
     // console.log(response);
      dispatch({ type: 'TARGET_PLAN_DETAILS', targetPlanDetails: response.data });
    });
  };
}
export function addNewRecord(plans) {
  console.log(plans);
  return (dispatch) => {
    axios.post(BandsAndPlans.BANDS_APPLICABLE_PLANS, plans)
    .then((response) => {
     // console.log(response);
      dispatch({ type: 'BANDS_APPLICABLE_PLANS', bandsApplicablePlans: response });
    }).catch((error) => {
      console.log(error);
    });
  };
}
export function addNewPlan(newPlanData) {
  console.log(newPlanData);
  return (dispatch) => {
    axios.post(BandsAndPlans.TARGET_PLANS, newPlanData)
    .then((response) => {
      // console.log(response);
      dispatch({ type: 'NEW_PLAN_DETAILS', newPlanData: response });
    })
    .catch((error) => {
      console.log(error);
    });
  };
}
export function editPlan(plans) {
  console.log(plans, 'h1');
  return (dispatch) => {
    dispatch({ type: 'EDIT_PLANS', editPlans: plans });
  };
}
export function updatePlan(plan, id) {
  console.log(plan, 'plan');
  return (dispatch) => {
    axios.put(`${BandsAndPlans.TARGET_PLANS}/${id}`, plan)
    .then((response) => {
     // console.log(response);
      dispatch({ type: 'UPDATE_PLAN', updatePlan: response.data });
    }).catch((error) => {
      console.log(error);
    });
  };
}
export function updateBandsApplicablePlans(plans, id) {
  console.log(plans, id);
  return (dispatch) => {
    axios.post(BandsAndPlans.BANDS_APPLICABLE_PLANS, plans)
    .then((response) => {
     // console.log(response);
      dispatch({ type: 'UPDATE_BANDS_APPLICABLE_PLANS', updateBandsApplicablePlans: response.data });
    }).catch((error) => {
      console.log(error);
    });
  };
}
export function deletePlan(id) {
  console.log(id);
  return (dispatch) => {
    axios.delete(`${BandsAndPlans.TARGET_PLANS}/${id}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
    dispatch({ type: 'DELETE_PLANS', planid: id });
  };
}

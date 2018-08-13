const initialState = {
  plansData: [],
  bandsandplansData: {
    data: []
  },
  targetPlansData: [],
  bandsApplicablePlans: [],
  editPlans: []
};

export default function plansReducer(state = initialState, action) {
  let st = state;
  switch (action.type) {
    case 'BAND_AND_PLAN_DETAILS' : {
     // console.log(action.bandaAndPlanDetails);
      st = { ...state, bandsAndPlansData: action.bandaAndPlanDetails };
      break;
    }
    case 'BAND_DETAILS' : {
     // console.log(action.bandDetails);
      st = { ...state, bandsData: action.bandDetails };
      break;
    }
    case 'TARGET_PLAN_DETAILS' : {
      // console.log(action.targetPlanDetails);
      st = { ...state, targetPlansData: action.targetPlanDetails };
      break;
    }
    case 'BANDS_APPLICABLE_PLANS' : {
      // console.log(action.bandsApplicablePlans);
      // st = { ...state, bandsApplicablePlans: action.bandsApplicablePlans };
      break;
    }
    case 'EDIT_PLANS' : {
      // console.log(action.editPlans);
      // console.log(action.editPlans.name);
      const updatePlan = [];
      updatePlan.push(action.editPlans);
      // console.log(updatePlan, 'up');
      st = { ...state, editPlans: updatePlan };
      break;
    }
    case 'UPDATE_PLAN' : {
      console.log(action.updatePlan);
      const editedPlan = [];
      editedPlan.push(action.updatePlan);
      console.log(editedPlan, 'updated');
      //st = { ...state, updateBandsApplicablePlans: update };
      break;
    }
    case 'UPDATE_BANDS_APPLICABLE_PLANS' : {
      //console.log(action.updateBandsApplicablePlans);
      const update = [];
      update.push(action.updateBandsApplicablePlans);
      console.log(update, 'up');
      //st = { ...state, updateBandsApplicablePlans: update };
      break;
    }
    case 'NEW_PLAN_DETAILS' : {
      // console.log(action.newPlanData);
      break;
    }
    default: {
      return state;
    }
  }
  return st;
}

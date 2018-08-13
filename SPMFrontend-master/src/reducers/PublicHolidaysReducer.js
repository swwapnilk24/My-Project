import { PublicHolidaysType } from '../actions/ActionType';

const publicHolidaysTypeObj = {
  publicHolidays: [{
    company: '',
    country: '',
    city: '',
    holidayDescription: '',
    date: '',
    createdBy: '',
    createdDate: '',
    approvedBy: '',
    approvedDate: ''
  }]
};

const initialState = {
  publicHolidaysInfo: Object.assign({}, publicHolidaysTypeObj)
};

const publicHolidaysData = (state, action) => {
  console.log('MenuMaster', action.data);
  console.log('MenuMaster', state);
  const newState = {};
  Object.assign(newState, state, { publicHolidaysInfo: action.data[0] });
  console.log('bugin', newState);
  return newState;
};

const updatePublicHolidaysData = (state, action) => {
  console.log(state, action.data);
  const newpublicHolidaysData = {};
  Object.assign(newpublicHolidaysData, state.publicHolidaysInfo);
  console.log(newpublicHolidaysData);
  if (action.data.type === 'add') {
    let flag = true;
    action.data.field.forEach((element, index) => {
      const fieldArr = element.split('_');
      const step = fieldArr[0];
      const section = fieldArr[1];
      console.log(step);
      console.log(section);
      if (flag) {
        if (step === 'publicHolidays') {
          console.log(newpublicHolidaysData[step]);
          newpublicHolidaysData[step].push({});
          flag = false;
        }
      }
      if (step === 'publicHolidays') {
        const rowIndex = newpublicHolidaysData[step].length;
        const addIndex = rowIndex - 1;
        console.log('KeyJobAttribute length is', typeof rowIndex);
        console.log('printing field array', step, section, addIndex);
        newpublicHolidaysData[step][addIndex][section] = action.data.value[index];
        console.log('Value:', action.data.value);
        // console.log('your new value updated', newpublicHolidaysData[section][addIndex][field]);
      }
    });
  } if (action.data.type === 'edit') {
    action.data.field.forEach((element, index) => {
      console.log(action.data);
      console.log('test', newpublicHolidaysData);
      const fieldArr = element.split('_');
      const step = fieldArr[0];
      const section = fieldArr[1];
      console.log(step);
      console.log(section);
      if ((step === 'publicHolidays')) {
        newpublicHolidaysData[step].reverse();
        newpublicHolidaysData[step][action.data.id][section] = action.data.value[index];
        newpublicHolidaysData[step].reverse();
        console.log('Value:', action.data.value);
        console.log('value after edit', newpublicHolidaysData[step]);
      }
    });
  }
  const newState = {};
  Object.assign(newState, state, { publicHolidaysInfo: newpublicHolidaysData });
  console.log(newState);
  return newState;
};

export default function reducer(state = initialState, action) {
  // const st = state;
  switch (action.type) {
    case PublicHolidaysType.GET_PUBLIC_HOLIDAYS_DATA:
      return publicHolidaysData(state, action);
    case PublicHolidaysType.UPDATE_PUBLIC_HOLIDAYS_DATA:
      return updatePublicHolidaysData(state, action);
    default:
      return state;
  }
}

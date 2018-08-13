import { filter, findIndex, remove } from 'lodash';
import { TalentManagementType } from '../actions/ActionType';

const DEFAULT_STATE = {
  myEmployees: [],
  myFilteredWorkers: [],
  isChecked: [],
  menuSubmenuList: []
};
const setAllEmployee = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { myEmployees: action.data, myFilteredWorkers: action.data });
  return newState;
};
const setMenuSubmenu = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { menuSubmenuList: action.data });
  return newState;
};
const setFilteredWorkers = (state, action) => {
  const menuSubmenuList = [];
  Object.assign(menuSubmenuList, state.menuSubmenuList);
  const newState = {};
  const newCurrentEmployee = [];
  const indexMenu = findIndex(menuSubmenuList.userMenu, ['id', action.menuId]);
  if (indexMenu > -1) {
    const indexSubMenu = findIndex(menuSubmenuList.userMenu[indexMenu].subMenu, ['id', action.subMenuId]);
    if (indexSubMenu > -1) {
      menuSubmenuList.userMenu[indexMenu].subMenu[indexSubMenu].checked = !menuSubmenuList.userMenu[indexMenu].subMenu[indexSubMenu].checked;
      // Checked Unchecked Filter
      if (menuSubmenuList.userMenu[indexMenu].subMenu[indexSubMenu].checked) {
        if (menuSubmenuList.userMenu[indexMenu].primaryKeyType) {
          state.isChecked.push({ objectKey: action.key, objectValue: action.value, isMultiple: menuSubmenuList.userMenu[indexMenu].primaryKey });
        } else {
          state.isChecked.push({ objectKey: action.key, objectValue: action.value });
        }
      } else {
        remove(state.isChecked, { objectKey: action.key, objectValue: action.value });
      }
    }
  }
  if (state.isChecked.length > 0) {
    for (let k = 0; k < state.isChecked.length; k += 1) {
      const currentObject = state.isChecked[k];
      let filteredArray = [];
      if (currentObject.isMultiple) {
        for (let m = 0; m < state.myEmployees.length; m += 1) {
          console.log(currentObject.isMultiple, 'currentObject.isMultiple');
          const firstLoop = state.myEmployees[m][currentObject.isMultiple];
          for (let n = 0; n < firstLoop.length; n += 1) {
            if (firstLoop[n][currentObject.objectKey] === currentObject.objectValue) {
              filteredArray.push(state.myEmployees[m]);
            }
          }
        }
      } else {
        filteredArray = filter(state.myEmployees, [currentObject.objectKey, currentObject.objectValue]);
      }
      for (let m = 0; m < filteredArray.length; m += 1) {
        const currentFileteredObject = filteredArray[m];
        newCurrentEmployee.push(currentFileteredObject);
      }
    }
  } else {
    const filteredArray = state.myEmployees;
    for (let m = 0; m < filteredArray.length; m += 1) {
      const currentFileteredObject = filteredArray[m];
      newCurrentEmployee.push(currentFileteredObject);
    }
  }
  Object.assign(newState, state, { myFilteredWorkers: newCurrentEmployee });
  return newState;
};
export default function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case TalentManagementType.GET_ALL_EMPLOYEE:
      return setAllEmployee(state, action);
    case TalentManagementType.GET_FILTERED_WORKERS:
      return setFilteredWorkers(state, action);
    case TalentManagementType.GET_MENU_SUBMENU:
      return setMenuSubmenu(state, action);
    default:
      return state;
  }
}

import { ModuleDesigner } from '../actions/ActionType';

function intialState() {
  const modules = {
    modules: [
      {
        name: '',
        type: '',
        sortOrder: 0,
        pages: [
          {
            name: '',
            layout: '',
            children: []
          }
        ]
      }
    ]
  };

  return modules;
}

/*const component = {
  id: '',
  type: '',
  isContainer: true,
  properties: {},
  props: {},
  layout: {},
  style: {}
}*/

/*const currentPageObj = {
  source: '',
  target: '',
  id: 'ContainerBox',
 // dropId: null,
  icon: 'fa fa-plus-circle',
  type: 'ContainerBox',
  title: 'Panel',
  description: 'Renders a container that can contain other components',
  isContainer: true,
  properties: {},
  props: { className: 'box' },
  layout: {},
  style: { width: 1100, height: 550 },
  events: {},
  children: []
};*/

const currentPageObj = {
  id: '',
  source: '',
  target: '',
  tag: 'ContainerBox',
  type: 'ContainerBox',
  isContainer: true,
  layout: {},
  props: {},
  styles: { className: '', style: { width: 1150, height: 600 } },
  events: {},
  children: []
};

const model = {
  name: '',
  plural: '',
  base: 'PersistedModel',
  options: {
    idInjection: false,
    dataSource: 'memory_test_ds',
    oracle: {
      schema: 'LOOPBACK',
      table: 'CUSTOMER_TEST'
    }
  },
  properties: {
    id: {
      type: 'String',
      length: 20,
      id: 1
    },
    name: {
      type: 'String',
      required: false,
      length: 40
    },
    email: {
      type: 'String',
      required: false,
      length: 40
    },
    age: {
      type: 'Number',
      required: false
    }
  }
};

const dataSource = {
  name: 'memory_test_ds',
  models: [Object.assign({}, model)],
  apis: [],
  operations: []
};

const dbDesigner = {
  dataSources: [Object.assign({}, dataSource)]
};


const DEFAULT_STATE = {
  modules: intialState(),
  currentPageObj: Object.assign({}, currentPageObj),
  selectedControl: {},
  hoverControl: {},
  dbDesigner: Object.assign({}, dbDesigner),
  currentModel: Object.assign({}, model),
  apiList: {}
};

const findNested = (obj, key, value, fieldToUpdate, updateObj, action = '') => {
  // Base case
  console.log('KEY', key, 'obj[key]', obj[key], 'value', value);
  if (obj[key] === value) {
    const newObj = obj;
    switch (action) {
      case 'addToArray':
        newObj[fieldToUpdate].push(updateObj);
        break;
      default: newObj[fieldToUpdate] = updateObj;
    }
    return newObj;
  }
  const keys = Object.keys(obj);
  for (let i = 0, len = Object.keys(obj).length; i < len; i += 1) {
    //console.log(JSON.stringify(Object.keys(obj)));
    //console.log('typeof obj[i]', obj[keys[i]], typeof obj[keys[i]]);
    if (typeof obj[keys[i]] === 'object') {
      const found = findNested(obj[keys[i]], key, value, fieldToUpdate, updateObj, action);
      if (found) {
        // If the object was found in the recursive call, bubble it up.
        return found;
      }
    }
  }
  return false;
};

const addComponent = (state, action) => {
  console.log('ADDING COMPONENT', action.data);
  console.log('state.currentPageObj', state.currentPageObj);
  const newCurrentPageObj = {};
  Object.assign(newCurrentPageObj, state.currentPageObj);
  //const id = `${action.data.target}_${action.data.id}`;
  const child = action.data;
  /*const newChildren = Object.assign([], newCurrentPageObj.children);
  newChildren.push(action.data);*/
  //newCurrentPageObj.children.push(action.data);
  const foundObj = findNested(newCurrentPageObj, 'id', action.data.target, 'children', child, 'addToArray');
  console.log('FOUND OBJECT', foundObj);
  if (!foundObj) {
    const newChildren = Object.assign([], newCurrentPageObj.children);
    newChildren.push(action.data);
    newCurrentPageObj.children = newChildren;
    //newCurrentPageObj.target = action.data.target;
  }
  const newState = {};
  Object.assign(newState, state, { currentPageObj: newCurrentPageObj });
  return newState;
};

const layoutChange = (state, action) => {
  console.log('Layout change', action.data);
  const control = action.data.control;
  const layout = action.data.layout;
  const newCurrentPageObj = {};
  Object.assign(newCurrentPageObj, state.currentPageObj);
  const foundObj = findNested(newCurrentPageObj, 'id', control.id, 'layout', layout);
  console.log('FOUND OBJECT', foundObj);
  const newState = {};
  Object.assign(newState, state, { currentPageObj: newCurrentPageObj });
  return newState;
};

const selectControl = (state, action) => {
  console.log('SELECT CONTROL', action.data);
  const control = action.data;
  const newState = {};
  Object.assign(newState, state, { selectedControl: control });
  return newState;
};

const setHoverControl = (state, action) => {
  console.log('HOVER CONTROL', action.data);
  const control = action.data;
  const newState = {};
  Object.assign(newState, state, { hoverControl: control });
  return newState;
};

const changeProperties = (state, action) => {
  console.log('SELECT CONTROL', action.data);
  const category = action.data.category;
  const obj = action.data.obj;
  const newCurrentPageObj = {};
  Object.assign(newCurrentPageObj, state.currentPageObj);
  console.log('FINDING OBJECT WITH ID', state.selectedControl.id);
  console.log('category', category);
  console.log('obj', obj);
  console.log('newCurrentPageObj', JSON.stringify(newCurrentPageObj));
  const foundObj = findNested(newCurrentPageObj, 'id', state.selectedControl.id, `${category}`, obj);
  console.log('FOUND OBJECT', foundObj);
  const newState = {};
  Object.assign(newState, state, { currentPageObj: newCurrentPageObj });
  return newState;
};

const onChangePlural = (state, action) => {
  const newCurrentModel = {};
  Object.assign(newCurrentModel, state.currentModel);
  newCurrentModel.plural = action.data;
  const newState = {};
  Object.assign(newState, state, { currentModel: newCurrentModel });
  return newState;
};

const onChangeModelName = (state, action) => {
  const newCurrentModel = {};
  Object.assign(newCurrentModel, state.currentModel);
  newCurrentModel.name = action.data;
  const newState = {};
  Object.assign(newState, state, { currentModel: newCurrentModel });
  return newState;
};

const onSaveModel = (state, action) => {
  console.log('onSaveModel reducer', action.data);
  /*const newCurrentModel = {};
  Object.assign(newCurrentModel, state.currentModel);
  newCurrentModel.name = action.data;*/
  const newState = {};
  Object.assign(newState, state);
  return newState;
};

const setApiList = (state, action) => {
  console.log('setApiList reducer', action.data);
  const newState = {};
  Object.assign(newState, state, { apiList: action.data });
  return newState;
};


export default function reducer(state = DEFAULT_STATE, action) {
  //console.log('IS IN REDUCER ');
  switch (action.type) {
    case ModuleDesigner.ADD_COMPONENT:
      return addComponent(state, action);
    case ModuleDesigner.LAYOUT_CHANGE:
      return layoutChange(state, action);
    case ModuleDesigner.SELECT_CONTROL:
      return selectControl(state, action);
    case ModuleDesigner.CHANGE_PROPERTIES:
      return changeProperties(state, action);
    case ModuleDesigner.SET_HOVER_CONTROL:
      return setHoverControl(state, action);
    case ModuleDesigner.ON_CHANGE_PLURAL:
      return onChangePlural(state, action);
    case ModuleDesigner.ON_CHANGE_MODEL_NAME:
      return onChangeModelName(state, action);
    case ModuleDesigner.SAVE_MODEL:
      return onSaveModel(state, action);
    case ModuleDesigner.SET_API_LIST:
      return setApiList(state, action);
    default:
      return state;
  }
}

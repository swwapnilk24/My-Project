import axios from 'axios';
import { ModuleDesigner } from './ActionType';


export function addComponent(data) {
  return { type: ModuleDesigner.ADD_COMPONENT, data };
}

export function changeLayout(data) {
  return { type: ModuleDesigner.LAYOUT_CHANGE, data };
}

export function selectControl(data) {
  return { type: ModuleDesigner.SELECT_CONTROL, data };
}
export function setHoverControl(data) {
  return { type: ModuleDesigner.SET_HOVER_CONTROL, data };
}

export function changeProperties(data) {
  return { type: ModuleDesigner.CHANGE_PROPERTIES, data };
}

export function onChangePlural(data) {
  return { type: ModuleDesigner.ON_CHANGE_PLURAL, data };
}

export function onChangeModelName(data) {
  return { type: ModuleDesigner.ON_CHANGE_MODEL_NAME, data };
}

export function getAPIList() {
  return function (dispatch) {
    axios
      .get('http://localhost:3000/explorer/swagger.json')
      .then(response => {
        console.log('APIs Saved', response.data);
        const respData = response.data;
        dispatch({ type: ModuleDesigner.SET_API_LIST, data: respData });
      })
      .catch(err => {
        dispatch({ type: 'ERROR_LOG', mesage: err.message });
      });
  };
}

export function onSaveModel(model) {
  return function (dispatch) {
    const dynamicModel = {
      name: `${model.name}`,
      application: 'SPM',
      schemaDef: JSON.stringify(model)
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    };

    axios
      .post('http://localhost:3000/api/DynamicModels', JSON.stringify(dynamicModel), config)
      .then(response => {
        console.log('Model Saved', response.data[0]);
        const respData = response.data[0];
        dispatch({ type: ModuleDesigner.SAVE_MODEL, data: respData });
      })
      .catch(err => {
        dispatch({ type: 'ERROR_LOG', mesage: err.message });
      });
  };
}

export function onExecuteApi(data) {
  return function (dispatch) {
    const endPoint = `http://localhost:3000/api/${data.apiName}`;
    const postExecuteFn = data.postExecuteFunction;
    /*const config = {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    };*/
    axios
      .get(endPoint)
      .then(response => {
        console.log('Model Saved', response.data[0]);
        postExecuteFn(response);
        //const respData = response.data[0];
        //dispatch({ type: ModuleDesigner.SAVE_MODEL, data: respData });
      })
      .catch(err => {
        dispatch({ type: 'ERROR_LOG', mesage: err.message });
      });
  };
}


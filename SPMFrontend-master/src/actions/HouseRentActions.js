import axios from 'axios';
import AppConfig from '../config';
import { houseRent } from './ActionType';

export function addNewRent() {
  return (dispatch) => {
    dispatch({ type: houseRent.ADD_NEW_RENT });
  };
}

export function updateRentProperty(value, objType, id) {
  return (dispatch) => {
    dispatch({ type: houseRent.UPDATE_RENT_PROPERTY, value, objType, id });
  };
}

export function deleteHouseRent(houseRentObj) {
  let id = '';
  /* eslint-disable */
  id = houseRentObj._id;
  /* eslint-enable */
  return (dispatch) => {
    if (houseRentObj.addeddocument !== undefined) {
      dispatch({ type: houseRent.DELETE_HOUSE_RENT, houseRentObj });
    } else {
      axios.get(`${AppConfig.BASE_URL}employees/deletehouserent/5a4f7dfe6de8d49ee38f73e4/${id}`)
      .then((response) => {
        console.log(response);
        dispatch({ type: houseRent.DELETE_HOUSE_RENT, houseRentObj });
      });
    }
  };
}
export function resetUploadDocs() {
  return (dispatch) => {
    dispatch({ type: houseRent.RESET_HOUSE_UPLOAD_DOCS });
  };
}

export function getHouseRent() {
  return (dispatch) => {
    axios.get(`${AppConfig.BASE_URL}employees/houserent/5a4f7dfe6de8d49ee38f73e4`)
    .then((response) => {
      dispatch({ type: houseRent.GET_HOUSE_RENT, houseRent: response.data[0].houseRent });
    });
  };
}

export function postHouseRent(data) {
  const obj = { id: '5a4f7dfe6de8d49ee38f73e4', houseRent: data };
  return (dispatch) => {
    axios.post(`${AppConfig.BASE_URL}employees/houserent`, obj)
    .then((response) => {
      dispatch({ type: houseRent.GET_HOUSE_RENT, houseRent: response.data[0].houseRent });
    });
  };
}
export function postFile(data) {
  const uploaders = data.map(file => {
    // Initial FormData
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', '898989898989');
    // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
    return axios.post(`${AppConfig.BASE_URL}employees/upload/898989898989`, formData
    ).then(response => {
      console.log(response.data);
    });
  });

    // Once all the files are uploaded
  return (dispatch) => {
    axios.all(uploaders).then(() => {
      dispatch({ type: houseRent.UPLOAD_HOUSE_RECIEPTS, message: 'success' });
    });
  };
}


// export function deleteFile(filename, empid) {
//   return (dispatch) => {
//     axios
//       .delete(`${AppConfig.BASE_URL}employees/deletefile`,
//       { params: { empid, filename } })
//       .then(response => {
//         dispatch({
//           type: houseRent.FILE_DELETE_SUCCESS,
//           empid,
//           filename,
//           message: response.data
//         });
//       })
//       .catch(() => {
//         dispatch({ type: houseRent.HOUSE_RENT_ERROR, message: 'unable to delete file' });
//       });
//   };
// }

export function deleteFile(id, filename) {
  return (dispatch) => {
    axios
      .get(`${AppConfig.BASE_URL}employees/deletefile/898989898989/${filename}`)
      .then(response => {
        dispatch({
          type: houseRent.FILE_DELETE_SUCCESS,
          id,
          filename,
          message: response.data
        });
      })
      .catch(() => {
        dispatch({ type: houseRent.HOUSE_RENT_ERROR, message: 'unable to delete file' });
      });
  };
}


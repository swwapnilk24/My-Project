import axios from 'axios';
import AppConfig from '../config';
import { CurrentEmployeeType } from './ActionType';
// import { CurrentEmployeeType } from './ActionType';

// export function postFile(data, empid, updateFileDetails) {
export function postClaims(data, empid, dispatch) {
  const fileArray = [];
  const uploaders = data.acceptedFilesData.map((file) => {
    // Initial FormData
    console.log('append', empid, file);
    // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
    return axios.post(`${AppConfig.BASE_URL}employees/docupload/${empid}`, file)
    .then(response => {
      console.log('hsjdhska', file, response.data);
      const fileobj = {};
      fileobj.filepath = response.data.destination;
      fileobj.orgName = response.data.originalname;
      fileobj.uniqueName = response.data.filename;
      fileArray.push(fileobj);
    });
  });

  console.log('fileArray', fileArray);
  const claim = data.newRow;
  claim.documents = fileArray;
  console.log('before axios execu', uploaders);
  axios.all(uploaders).then(() => {
    console.log('claim Docs are uploaded');
  }).then(() => {
    axios.post(`${AppConfig.BASE_URL}employees/submitclaims/${empid}`, claim)
    .then((response) => {
      console.log('submitclaimResponse', response);
      dispatch({ type: CurrentEmployeeType.ADD_CLAIM, data: claim });
    });
  }).catch((err) => {
    console.error(err);
    alert('Failed to submit- Please retry it');
  });
}

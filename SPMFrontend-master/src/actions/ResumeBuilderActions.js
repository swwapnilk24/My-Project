import axios from 'axios';
import { ResumeBuilder, ErrorType } from './ActionType';
import { ResumeBuilderUrl } from './ActionURL';

export function updateResumeBuilderAndAuditData(data) {
  return { type: ResumeBuilder.UPDATE_RESUME_BUILDER_AND_AUDIT_DATA, data };
}

export function fetchFromDataBase(resumeKey) {
  const Url = `${ResumeBuilderUrl.FETCH_FROM_DB}${resumeKey}`;
  return function (dispatch) {
    axios
      .get(Url)
      .then(response => {
        console.log('resumebuilder data', response.data);
        dispatch({ type: ResumeBuilder.FETCH_RESUME_BUILDER_DATA_AND_AUDIT, data: response.data });
      })
      .catch(err => {
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
}

export function sendToDatabase(resumeDataAndAudit) {
  return function (dispatch) {
    console.log('sendresumeBuilderAudit', resumeDataAndAudit);
    axios
      .post(ResumeBuilderUrl.SEND_RESUME_BUILDER_DATA_AND_AUDIT, resumeDataAndAudit)
      .then(response => {
        console.log('resumebuilder data', response.data);
        dispatch({ type: ResumeBuilder.FETCH_RESUME_BUILDER_DATA_AND_AUDIT, data: response.data });
      })
      .catch(err => {
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
}

export function updateProfileSummary(resumeKey, profileSummaryData) {
  const Url = `${ResumeBuilderUrl.UPDATE_PROFILE_SUMMARY_DATA}${resumeKey}`;
  return function (dispatch) {
    axios
      .put(Url, profileSummaryData)
      .then(response => {
        console.log('resumebuilder data', response.data);
        dispatch({ type: ResumeBuilder.FETCH_RESUME_BUILDER_DATA_AND_AUDIT, data: response.data });
      })
      .catch(err => {
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
}

export function updateContacts(resumeKey, profileSummaryData) {
  const Url = `${ResumeBuilderUrl.UPDATE_CONTACTS_DATA}${resumeKey}`;
  return function (dispatch) {
    axios
      .put(Url, profileSummaryData)
      .then(response => {
        console.log('resumebuilder data', response.data);
        dispatch({ type: ResumeBuilder.FETCH_RESUME_BUILDER_DATA_AND_AUDIT, data: response.data });
      })
      .catch(err => {
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
}

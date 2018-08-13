import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { resuumeBuilderModal } from '.'

export const create = (req, res, next) => {
  const queryData = {
    "entityInformation.employeeId": req.body.resumeBuilderData.entityInformation.employeeId
  }
  resuumeBuilderModal.findOneAndUpdate(queryData,req.body.resumeBuilderData,{ new: true, upsert: true}, (err, resp) => {
          if (err) {
            res.send('validations error');
          } else {
           
          }
          
  });
}

//These Block of code is to update Profile summary - Beginning

const createAndUpdate = (queryData, updateMethodHolder, req, res, next) => {
  const newInsertData = _.cloneDeep(queryData);
  newInsertData.contacts = {};
  newInsertData.educational = [];
   resuumeBuilderModal.create(newInsertData, (err, resp) => {
      if (err) {
        res.send(err);
      } else {
        updateMethodHolder(queryData, req, res, next);
      }
   });

}

export const updateProfileSummary = (req, res, next) => {
  const queryData = {
    "entityInformation.employeeId": req.params.resume_key
  };
  resuumeBuilderModal.find(queryData, (error, resp) => {
     if (resp.length === 0) {
         createAndUpdate(queryData, updateProfileSummaryFunc, req, res, next);
         } else {
        updateProfileSummaryFunc(queryData, req, res, next);
     }
  });

};

const updateProfileSummaryFunc = (queryData, req, res, next) => {
   resuumeBuilderModal.update(queryData,{ $set: { profileSummary: req.body }},{ upsert: true, new: true }, (err, resp) => {
    if (err) {
      res.send(err);
    } else {
      showResumeData(req, res, next);
    }
   });
}
//These Block of code is to update Profile summary  - Ending

//These Block of code is to update Contacts - Beginning

    export const updateContacts = (req, res, next) => {
      const queryData = {
        "entityInformation.employeeId": req.params.resume_key
      };
      resuumeBuilderModal.find(queryData, (error, resp) => {
          if (resp.length === 0) {
              createAndUpdate(queryData, updateContactsFunc,  req, res, next);
              } else {
                updateContactsFunc(queryData, req, res, next);
          }
      });

    };

    const updateContactsFunc = (queryData, req, res, next) => {
        resuumeBuilderModal.update(queryData,{ $set: { contacts: req.body }},{ upsert: true, new: true }, (err, resp) => {
        if (err) {
          res.send(err);
        } else {
          showResumeData(req, res, next);
        }
        });
    }

//These Block of code is to update Contacts  - Ending

export const showResumeData = (req, res, next) => {
  const queryData = {
    "entityInformation.employeeId": req.params.resume_key
  };
  resuumeBuilderModal.find(queryData, (err, resp) => {
      if (err) {
        res.send('handle error');
      } else {
        res.send(resp);
      }
  });
  
};

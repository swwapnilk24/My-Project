import _ from 'lodash'
import fs from 'fs'
import uuid from 'uuid-v4';
import moment from 'moment';
import { success, notFound } from '../../services/response/'
import { Employee } from '.'
import { LeavesMasterData } from '../leaves-master';
import { LeavesIndividual } from '../leaves-individual';
import { Master } from '../master';
import { request } from 'http';
import { sendVerificationEmail } from '../../services/emailAuth/emailAuth';
import CompanySubscription from '../company-subscription/model';
import RegToken from '../registration-tokens/model';

export const create = (data, res, next) => {
    console.log(JSON.stringify(data.body.employee));
    Employee.create(data.body.employee)
        .then((employee) => employee.view(false))
        .then(success(res, 201))
        .catch(next)
}

const insertIntoRegTokens = (result, newData, res) => {
  RegToken.create(newData, (err, response) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

export const createNewEmployee = (req, res, next) => {
  const emailInformation = {
    emailAddress: req.body.emailId,
    emailType: 'official',
    isPrimary: 'Yes'
  };
  const empObj = {
    'identify.identify.identify.company': req.body.company,
    'personalInformation.personalInformation.personalInformation.firstName': req.body.firstName,
    'personalInformation.personalInformation.personalInformation.lastName': req.body.lastName,
    'personalInformation.contactInformation.emailInformation': [emailInformation],
    'password': req.body.password,
    'role': 'HrAdmin'
  };
  Employee.create(empObj, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      const token = uuid();
      const newData = {};
      newData.company = req.body.company;
      newData.token = token;
      newData.email = req.body.emailId;
      sendVerificationEmail(newData);
      insertIntoRegTokens(result, newData, res);
      // res.send(result);
    }
  }); 
};

export const updateNewEmployee = (data, res, next) => {
  //console.log(JSON.stringify(data.body.employee));
  var query = {
    'entityInformation.owner': data.body.employee.entityInformation.owner,
    'entityInformation.status': data.body.employee.entityInformation.status,
    'entityInformation.customer': data.body.employee.entityInformation.customer,
  };
  delete data.body.employee.__v;
  console.log(data.body);
  //console.log(query, 'QUERY');
  Employee.findOneAndUpdate(query, data.body.employee, { new: true, upsert: true })
    .then((employee) => employee.view(true))
    .then(success(res, 201))
    .catch(next)
}

export const findNewEmployee = (data, res, next) => {
  //console.log(JSON.stringify(data.body.employee));
  var query = {
    'entityInformation.owner': data.body.employee.entityInformation.owner,
    'entityInformation.status': data.body.employee.entityInformation.status,
    'entityInformation.customer': data.body.employee.entityInformation.customer,
  };
  //console.log(query, 'QUERY');
  //Employee.findOne(query, function(err,obj) { console.log(obj,'FIND_RESULT'); });
  Employee.findOne(query)
    .then((employee) => employee ? employee.view(true) : updateNewEmployee(data, res, next))
    .then(success(res))
    .catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Employee.find(query, select, cursor)
    .then((employees) => employees.map((employee) => employee.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Employee.findById(params.id)
    .then(notFound(res))
    .then((employee) => employee ? employee.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Employee.findById(params.id)
    .then(notFound(res))
    .then((employee) => employee ? _.merge(employee, body).save() : null)
    .then((employee) => employee ? employee.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Employee.findById(params.id)
    .then(notFound(res))
    .then((employee) => employee ? employee.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const showEmpData = (data, res, next) => {
  Employee.find({}, function (err, empDtls) {
    if (err)
      throw err
    else
      res.json(empDtls)
  })
}

export const listOfMyEmployees = (data, res, next) => {
  Employee.find({}, function (err, resultSet) {
    if (err)
      throw err
    else
      res.json(resultSet)
  })
  // console.log(params);
}

export const getLastEmployeeData = (data, res, next) => {
  Employee.find({}, {
    "personalInformation.biographicalInformation.biographicalInformation.employeeId": 1
  }).sort({ '_id': -1 }).limit(1)
    // .then((employees) => employees.map((employee) => employee.view()))
    .then(success(res))
    .catch(next)

  // Employee.find({},{"personalInformation.biographicalInformation.biographicalInformation.employeeId": 1}, function(err, empDtls) {
  //   if(err)
  //     throw err
  //   else
  //     res.json(empDtls)
  // })
}

//Get table top record 
export const getFirstRecordData = (data, res, next) => {
  Employee.find({ "personalInformation.biographicalInformation.biographicalInformation.employeeId": data.params.id })
    .sort({ _id: 1 }).limit(1)
    .then(success(res))
    .catch(next)
}

export const creditTimeOff = (data, res, next) => {
  console.log(data.body);
  var key = "_id";
  const query = {
    "personalInformation.addressInformation.addressInformation.country": { $eq: data.body.timeOffType.country },
    "jobInformation.employmentDetail.keyJobAttribute.position": { $eq: data.body.timeOffType.role },
    "personalInformation.addressInformation.addressInformation.addressType": { $eq: '1' }
  }
  const leavesMasterQuery = {
    'leavesMasterData._id': data.body.timeOffType._id
  };
  const set = {
    $set: { "leavesMasterData.status": "Processed" }
  };
  Employee.find(query, (err, resp) => {
    let dataToBeUpdated = [];
    dataToBeUpdated = resp;
    //aggregation logic
    Employee.aggregate([{
      $match: {
        $and: [
          {
            "personalInformation.addressInformation.addressInformation.country": { $eq: data.body.timeOffType.country },
            "jobInformation.employmentDetail.keyJobAttribute.position": { $eq: data.body.timeOffType.role },
            "personalInformation.addressInformation.addressInformation.addressType": { $eq: '1' }
          }
        ]
      }
    }, {
      $project: {
        "_id": 1,
        "timeOff.timeOffOverview.timeOffBalance": {
          $filter: {
            input: "$timeOff.timeOffOverview.timeOffBalance",
            as: 'item',
            cond: { $eq: ["$$item.timeOffType", data.body.timeOffType.timeOffType] }
          }
        }
      }
    }
    ], (err, response) => {
      if (resp.length !== 0) {
        const finalUpdateResponse = [];
        const finalPushResponse = [];
        response.map((filteredUpdatedData, index) => {
          if (filteredUpdatedData.timeOff.timeOffOverview.timeOffBalance.length !== 0) {
            finalUpdateResponse.push(filteredUpdatedData);
          } else {
            finalPushResponse.push(filteredUpdatedData);
          }
        });
        const insert = creditTimeOffInsert(finalPushResponse, data, key, res);
        const update = creditTimeOffUpdate(finalUpdateResponse, data, key, res);
        LeavesMasterData.findOneAndUpdate(leavesMasterQuery, set, { new: true }, (error, response) => {
          if (err) {
            res.send(err)
          } else {
            res.send(response);
          }
        });
      } else {
        res.send('No employees found');
      }

    });
  });
};

const creditTimeOffInsert = (finalPushResponse, data, key, res) => {
  finalPushResponse.map(employees => {
    Employee.findOne({ "_id": employees[key] }, (err, employeesresponse) => {
      if (err) {
        return err;
      } else {
        const setTimeOff = {};
        setTimeOff.timeOffType = data.body.timeOffType.timeOffType;
        setTimeOff.days = data.body.timeOffType.numberOfDays
        employeesresponse.timeOff.timeOffOverview.timeOffBalance.push(setTimeOff);
      }
      Employee.update({ "_id": employeesresponse[key] }, employeesresponse, (err, result) => {
        if (err) {
          return err;
        }
      });
    });
  });
};

const creditTimeOffUpdate = (finalUpdateResponse, data, key) => {
  finalUpdateResponse.map(employee => {
    Employee.findOne({ "_id": employee[key] }, (err, employeeResponse) => {
      if (err) {
        return err;
      } else {
        employeeResponse.timeOff.timeOffOverview.timeOffBalance.map((dataInn, index) => {
          if (dataInn.timeOffType === data.body.timeOffType.timeOffType) {
            employeeResponse.timeOff.timeOffOverview.timeOffBalance[index].days = employee.timeOff.timeOffOverview.timeOffBalance[0].days + parseInt(data.body.timeOffType.numberOfDays);
          }
        });
        Employee.update({ "_id": employeeResponse[key] }, employeeResponse, (err, result) => {
          if (err) {
            return err;
          }
        });
      }
    });
  });
};

export const creditIndividualTimeOff = (req, res, next) => {
  const leavesIndividual = { ...req.body };
  leavesIndividual.status = 'Processed';
  console.log(req.body, leavesIndividual);
  const id = req.body.employeeID;
  Employee.findOne({ _id: id }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      let finalData = result;
      let matchedIndex = '';
      finalData.timeOff.timeOffOverview.timeOffBalance.map((types, index) => {
        if (types.timeOffType === req.body.timeOffType) {
          matchedIndex = index;
        }
      });
      if (matchedIndex !== '') {
        // finalData.timeOff.timeOffOverview.timeOffBalance[matchedIndex].days = finalData.timeOff.timeOffOverview.timeOffBalance[matchedIndex].days + req.body.numberOfDays;
        res.send({message: 'Data already exists'});
      } else {
        finalData.timeOff.timeOffOverview.timeOffBalance.push({ timeOffType: req.body.timeOffType, days: req.body.numberOfDays });
        Employee.findOneAndUpdate({ _id: id }, finalData, (error, response) => {
          if (error) {
            res.send(error);
          } else {
            LeavesIndividual.create({ leavesIndividual }, (er, resp) => {
              if (er) {
                res.send(er);
              } else {
                // delete resp.__v;
                res.send(resp)
              }
            });
          }
        });
      }
      Employee.findOneAndUpdate({ _id: id }, finalData, (error, response) => {
        if (error) {
          res.send(error);
        } else {
          LeavesIndividual.create({ leavesIndividual }, (er, resp) => {
            if (er) {
              res.send(er);
            } else {
              // delete resp.__v;
              res.send(resp)
            }
          });
        }
      });
    }
  });
};

export const postHouseRent = (req, res, next) => {
  const id = req.body.id
  const houseRent = req.body.houseRent

  Employee.update({ _id: id }, { $set: { houseRent: [] } }, (err, affected) => {
    if (err) {
      next(err)
    }
    if (affected) {
      Employee.update({ _id: id }, { '$pushAll': { 'houseRent': houseRent } }, { safe: true, upsert: true }
      ).exec((err, employee) => {
        if (err) {
          next(err)
        }
        if (!employee) {
          next(new Error('No post with that id'))
        } else {
          Employee.find({ _id: id }).select('houseRent -_id').exec((err, rent) => {
            if (err) {
              next(err)
            }
            if (!rent) {
              next(new Error('No houserent with that id'))
            } else {
              res.send(rent)
            }
          })
        }
      })
    }
  })
}

export const getHouseRent = (req, res, next) => {
  const id = req.params.id
  Employee.find({ _id: id }).select('houseRent -_id').exec((err, rent) => {
    if (err) {
      next(err)
    }
    if (!rent) {
      next(new Error('No houserent with that id'))
    } else {
      res.send(rent)
    }
  })
}

export const deleteHouseRent = (req, res, next) => {
  const id = req.params.id
  const houseRentId = req.params.rentid

  Employee.findByIdAndUpdate(
    id,
    { $pull: { 'houseRent': { _id: houseRentId } } }, (err, model) => {
      if (err) {
        res.send(err)
      }
      res.send({ 'message': 'house rent deleted successfullyy' })
    })
}

export const postfile = (req, res, next) => {
  const file = req.file // file passed from client
  // const meta = req.body // all other values passed from the client, like name, etc..
  res.send(file)
}

export const performAndPostFile = (req, res, next) => {
  const file = req.file // file passed from client
  console.log('hellofile', file);
  // const meta = req.body // all other values passed from the client, like name, etc..
  res.send(file);
}
export const fillFileDetails = (req, res, next) => {
  console.log('hirequest');
  res.send({msg: 'success'});
}
export const deleteFile = (req, res, next) => {
  const filename = req.params.filename // filename passed from client
  const employeeid = req.params.id // employee id to serach directory name
  fs.unlink(`./files/${employeeid}/${filename}`, () => {
    res.send({
      message: 'success'
    })
  })
}

export const postMedicalBills = (req, res, next) => {
  const id = req.body.id
  const savings = req.body.savings

  Employee.update({ _id: id }, { $set: { medicalBills: [] } }, (err, affected) => {
    if (err) {
      next(err)
    }
    if (affected) {
      Employee.update({ _id: id }, { '$pushAll': { medicalBills: savings } }, { safe: true, upsert: true }
      ).exec((err, employee) => {
        if (err) {
          next(err)
        }
        if (!employee) {
          next(new Error('No post with that id'))
        } else {
          Employee.find({ _id: id }).select(`medicalBills -_id`).exec((err, rent) => {
            if (err) {
              next(err)
            }
            if (!rent) {
              next(err)
            } else {
              res.send(rent)
            }
          })
        }
      })
    }
  })
}

export const getMedicalBills = (req, res, next) => {
  const id = req.params.id
  Employee.find({ _id: id }).select(`medicalBills -_id`).exec((err, bills) => {
    if (err) {
      next(err)
    }
    if (!bills) {
      next(new Error('No houserent with that id'))
    } else {
      res.send(bills)
    }
  })
}
export const postLtaBills = (req, res, next) => {
  const id = req.body.id
  const savings = req.body.savings

  Employee.update({ _id: id }, { $set: { ltaBills: [] } }, (err, affected) => {
    if (err) {
      next(err)
    }
    if (affected) {
      Employee.update({ _id: id }, { '$pushAll': { ltaBills: savings } }, { safe: true, upsert: true }
      ).exec((err, employee) => {
        if (err) {
          next(err)
        }
        if (!employee) {
          next(new Error('No post with that id'))
        } else {
          Employee.find({ _id: id }).select(`ltaBills -_id`).exec((err, bills) => {
            if (err) {
              next(err)
            }
            if (!bills) {
              next(err)
            } else {
              res.send(bills)
            }
          })
        }
      })
    }
  })
}

export const getLtaBills = (req, res, next) => {
  const id = req.params.id
  Employee.find({ _id: id }).select(`ltaBills -_id`).exec((err, bills) => {
    if (err) {
      next(err)
    }
    if (!bills) {
      next(new Error('No houserent with that id'))
    } else {
      res.send(bills)
    }
  })
}

export const deleteOtherBills = (req, res, next) => {
  const id = req.params.id
  const deleteId = req.params.savingsid
  const savingType = req.params.savingtype

  if (savingType === 'medicalBills') {
    Employee.findByIdAndUpdate(
      id,
      { $pull: { medicalBills: { _id: deleteId } } }, (err, model) => {
        if (err) {
          res.send(err)
        }
        res.send({ 'message': 'Medical bill deleted successfullyy' })
      })
  }
  if (savingType === 'ltaBills') {
    Employee.findByIdAndUpdate(
      id,
      { $pull: { ltaBills: { _id: deleteId } } }, (err, model) => {
        if (err) {
          res.send(err)
        }
        res.send({ 'message': 'lta bill deleted successfullyy' })
      })
  }
}

export const postIndTaxSavings = (req, res, next) => {
  const id = req.body.id
  const savings = req.body.savings

  Employee.update({ _id: id }, { $set: { taxSavingBills: [] } }, (err, affected) => {
    if (err) {
      next(err)
    }
    if (affected) {
      Employee.update({ _id: id }, { '$pushAll': { taxSavingBills: savings } }, { safe: true, upsert: true }
      ).exec((err, employee) => {
        if (err) {
          next(err)
        }
        if (!employee) {
          next(new Error('No post with that id'))
        } else {
          Employee.find({ _id: id }).select(`taxSavingBills -_id`).exec((err, bills) => {
            if (err) {
              next(err)
            }
            if (!bills) {
              next(err)
            } else {
              res.send(bills)
            }
          })
        }
      })
    }
  })
}

export const getIndTaxSavings = (req, res, next) => {
  const id = req.params.id
  Employee.find({ _id: id }).select(`taxSavingBills -_id`).exec((err, bills) => {
    if (err) {
      next(err)
    }
    if (!bills) {
      next(new Error('No houserent with that id'))
    } else {
      res.send(bills)
    }
  })
}

export const getRetiralBenifits = (req, res, next) => {
  const id = req.params.id
  Employee.find({ _id: id }).select(`retiralBenifits -_id`).populate('retiralBenifits.retiralId').exec((err, bills) => {
    if (err) {
      next(err)
    }
    if (!bills) {
      next(new Error('No retiral benifits with that id'))
    } else {
      res.send(bills)
    }
  })
}

export const postRetiralBenifits = (req, res, next) => {
  const id = req.body.id
  const savings = req.body.savings
  Employee.update({ _id: id }, { '$push': { retiralBenifits: savings } }, { safe: true, upsert: true }
  ).exec((err, employee) => {
    if (err) {
      next(err)
    }
    if (!employee) {
      next(new Error('No post with that id'))
    } else {
      Employee.find({ _id: id })
        .select(`retiralBenifits -_id`)
        .populate('retiralBenifits.retiralId')
        .exec((err, bills) => {
          if (err) {
            next(err)
          }
          if (!bills) {
            next(err)
          } else {
            res.send(bills)
          }
        })
    }
  })
}

export const deleteRetiralBenifits = (req, res, next) => {
  const id = req.params.id
  const deleteid = req.params.deleteid
  Employee.findByIdAndUpdate(
    id,
    { $pull: { retiralBenifits: { _id: deleteid } } }, (err, model) => {
      if (err) {
        res.send(err)
      }
      Employee.find({ _id: id })
        .select(`retiralBenifits -_id`)
        .populate('retiralBenifits.retiralId')
        .exec((err, bills) => {
          if (err) {
            next(err)
          }
          if (!bills) {
            next(err)
          } else {
            res.send(bills)
          }
        })
    })
}

export const getTaxBenifits = (req, res, next) => {
  const id = req.params.id
  Employee.find({ _id: id })
    .select(`taxBenifits -_id`)
    .populate('taxBenifits.benifitId')
    .exec((err, bills) => {
      if (err) {
        next(err)
      }
      if (!bills) {
        next(new Error('No retiral benifits with that id'))
      } else {
        res.send(bills)
      }
    })
}

export const postTaxBenifits = (req, res, next) => {
  const id = req.body.id
  const savings = req.body.savings
  Employee.update({ _id: id },
    { '$push': { taxBenifits: savings } },
    { safe: true, upsert: true }
  ).exec((err, employee) => {
    if (err) {
      next(err)
    }
    if (!employee) {
      next(new Error('No post with that id'))
    } else {
      Employee.find({ _id: id })
        .select(`taxBenifits -_id`)
        .populate('taxBenifits.benifitId')
        .exec((err, bills) => {
          if (err) {
            next(err)
          }
          if (!bills) {
            next(err)
          } else {
            res.send(bills)
          }
        })
    }
  })
}

export const deleteTaxBenifits = (req, res, next) => {
  const id = req.params.id
  const deleteid = req.params.deleteid
  Employee.findByIdAndUpdate(
    id,
    { $pull: { taxBenifits: { _id: deleteid } } }, (err, model) => {
      if (err) {
        res.send(err)
      }
      Employee.find({ _id: id })
        .select(`taxBenifits -_id`)
        .populate('taxBenifits.benifitId')
        .exec((err, bills) => {
          if (err) {
            next(err)
          }
          if (!bills) {
            next(err)
          } else {
            res.send(bills)
          }
        })
    })
}

export const postSkills = (req, res, next) => {
  const id = req.body.id
  const skills = req.body.skillInformation
  Employee.update({ _id: id }, { '$push': { skillInformation: skills } }, { safe: true, upsert: true }
  ).exec((err, employee) => {
    if (err) {
      next(err)
    }
    if (!employee) {
      next(new Error('No post with that id'))
    } else {
      Employee.find({ _id: id })
        .select(`retiralBenifits -_id`)
        .populate('retiralBenifits.retiralId')
        .exec((err, bills) => {
          if (err) {
            next(err)
          }
          if (!bills) {
            next(err)
          } else {
            res.send(bills)
          }
        })
    }
  })
}

export const updateApproveSkills = (req, res, next) => {
  req.body.result.map((data) => {
    Employee.update({ "_id": data.empObjectId, "skillInformation._id": data.skillObjectId }, { $set: { "skillInformation.$.status": 'Aprroved' } }, { safe: true, upsert: true }
    ).exec((err, employee) => {
      if (err) {
        next(err)
      }
      if (!employee) {
        next(new Error('No post with that id'))
      } else {
        Employee.find({ "_id": "5a6f2eee397aca1c3c093e01" })
          .select(`retiralBenifits -_id`)
          .populate('retiralBenifits.retiralId')
          .exec((err, bills) => {
            if (err) {
              next(err)
            }
            if (!bills) {
              next(err)
            } else {
              res.send(bills)
            }
          })
      }
    })
  });
}

export const postClaims = (req, res, next) => {
  console.log('jahjhd', req.params.id, req.body);
  const data = req.body;
  const newClaim = {
    "approvalDate": data.approvalDate,
    "approvedBy": data.approvedBy,
    "status": data.status,
    "comment": data.comment,
    "requestedDate": data.requestedDate,
    "frequency": data.frequency,
    "currency": data.currency,
    "amount": data.amount,
    "claimType": data.claimType,
    "documents": data.documents
  }
  Employee.update({ _id: req.params.id}, { '$push': { "benefits.claims.inprocessClaims": newClaim } }, { safe: true, upsert: true }
  ).exec((err, employee) => {
    if (err) {
      next(err)
    }
    if (!employee) {
      next(new Error('No post with that id'))
    } else {
      res.send({message: true});
    }
  });
};

export const approveClaims = (req, res, next) => {
  req.body.result.map((data) => {
    Employee.findByIdAndUpdate(data.empObjectId, { $pull: { "benefits.claims.inprocessClaims" : { _id: data.claimObjectId } } }, (err, model) => {
      if (err) {
        res.send(err)
      }
      const newClaim = {
        "approvalDate": data.approvalDate,
        "approvedBy": data.approvedBy,
        "status": data.status,
        "comment": data.comment,
        "requestedDate": data.requestedDate,
        "frequency": data.frequency,
        "currency": data.currency,
        "amount": data.amount,
        "claimType": data.claimType
      }
      Employee.update({ _id: data.empObjectId }, { '$push': { "benefits.claims.processedClaims": newClaim } }, { safe: true, upsert: true }
      ).exec((err, employee) => {
        if (err) {
          next(err)
        }
        if (!employee) {
          next(new Error('No post with that id'))
        } else {
          Employee.find({ _id: data.empObjectId })
            .select(`retiralBenifits -_id`)
            .populate('retiralBenifits.retiralId')
            .exec((err, bills) => {
              if (err) {
                next(err)
              }
              if (!bills) {
                next(err)
              } else {
                res.send(bills)
              }
            })
        }
      })
    })
  });
}

export const rejectClaims = (req, res, next) => {
  req.body.result.map((data) => {
    Employee.findByIdAndUpdate(data.empObjectId, { $pull: { "benefits.claims.processedClaims" : { _id: data.claimObjectId } } }, (err, model) => {
      if (err) {
        res.send(err)
      }
      const newClaim = {
        "approvalDate": data.approvalDate,
        "approvedBy": data.approvedBy,
        "status": data.status,
        "comment": data.comment,
        "requestedDate": data.requestedDate,
        "frequency": data.frequency,
        "currency": data.currency,
        "amount": data.amount,
        "claimType": data.claimType
      }
      Employee.update({ _id: data.empObjectId }, { '$push': { "benefits.claims.inprocessClaims": newClaim } }, { safe: true, upsert: true }
      ).exec((err, employee) => {
        if (err) {
          next(err)
        }
        if (!employee) {
          next(new Error('No post with that id'))
        } else {
          Employee.find({ _id: data.empObjectId })
            .select(`retiralBenifits -_id`)
            .populate('retiralBenifits.retiralId')
            .exec((err, bills) => {
              if (err) {
                next(err)
              }
              if (!bills) {
                next(err)
              } else {
                res.send(bills)
              }
            })
        }
      })
    })
  });
}
export const approveEnrollments = (req, res, next) => {
  req.body.result.map((data) => {
    Employee.update({ "_id": data.empObjectId, "benefits.enrollments._id": data.enrollmentObjectId },
    { 
      $set: {   "benefits.enrollments.$.status": data.status, 
                "benefits.enrollments.$.comment": data.comment, 
                "benefits.enrollments.$.amount": data.amount, 
                "benefits.enrollments.$.startDate": data.startDate, 
                "benefits.enrollments.$.endDate": data.endDate 
            } 
    },
      { safe: true, upsert: true }
    ).exec((err, employee) => {
      if (err) {
        next(err)
      }
      if (!employee) {
        next(new Error('No post with that id'))
      } else {
        Employee.find({ "_id": "5a6f2eee397aca1c3c093e01" })
          .select(`retiralBenifits -_id`)
          .populate('retiralBenifits.retiralId')
          .exec((err, bills) => {
            if (err) {
              next(err)
            }
            if (!bills) {
              next(err)
            } else {
              res.send(bills)
            }
          })
      }
    })
  });
}
export const getNominee = (req, res, next) => {
  const id = req.params.id
  const nomineeType = req.params.nomineeType
  Employee.find({ '_id': id, 'nominees.nominationType': nomineeType })
    .select('nominees -_id').exec((err, nominees) => {
      if (err) {
        next(err)
      }
      if (!nominees) {
        next(err)
      } else {
        res.send(nominees)
      }
    })
}

export const postNominee = (req, res, next) => {
  const id = req.body.id
  const nomineeType = req.body.nomineeType
  const nominee = req.body.nominee
  Employee.findByIdAndUpdate({ _id: id },
    { '$push': { 'nominees': nominee } },
    { safe: true, upsert: true, new: true }
  ).exec((err, nominees) => {
    if (err) {
      next(err)
    }
    if (!nominees) {
      next(err)
    } else {
      Employee.find({ '_id': id, 'nominees.nominationType': nomineeType })
        .select('nominees -_id').exec((err, nominees) => {
          if (err) {
            next(err)
          }
          if (!nominees) {
            next(err)
          } else {
            res.send(nominees[0])
          }
        })
    }
  })
}

export const deleteNominee = (req, res, next) => {
  const id = req.params.id
  const deleteid = req.params.deleteid

  Employee.findByIdAndUpdate(
    id,
    { $pull: { 'nominees': { _id: deleteid } } }, (err, model) => {
      if (err) {
        res.send(err)
      } else {
        res.send({ 'message': 'successfully deleted' })
      }
    })
}

// export const getPlan = (req, res, next) => {
//    res.send( { id: req.params.id, position: req.params.position });
//    Employee.find({ "_id": req.params.id }, { })
// }

export const getLeaveByEmpId = ({ params }, res, next) => {
  const startDt = params.date + "-01";
  const endDt = params.date + "-31";
  console.log('Date', params.date);
  Employee.aggregate([
    // Unwind the array
    {
      $unwind: '$timeOff.timeOffOverview.myRequests'
    },
    // Group on the "_id" and "name" and $sum "value"
    {
      $group: {
        _id: {
          employee_id: '$personalInformation.biographicalInformation.biographicalInformation.employeeId',
          annual_salary: '$compensationInformation.compensationInformation.compensationGroup.annualizedSalary',
          name: '$timeOff.timeOffOverview.myRequests.timeOffType'
        },
        value: {
          $sum: {
            $cond: [{
              $and: [
                {
                  $eq: ['$timeOff.timeOffOverview.myRequests.status', 'Approved']
                },
                {
                  $gte: ['$timeOff.timeOffOverview.myRequests.startDate', new Date(startDt)]
                },
                {
                  $lt: ['$timeOff.timeOffOverview.myRequests.startDate', new Date(endDt)]
                }
              ]
            },
              '$timeOff.timeOffOverview.myRequests.days', null
            ]
          }
        },
        difference_type: {
          $first: '$timeOff.timeOffOverview.timeOffBalance.timeOffType'
        },
        difference: {
          $first: '$timeOff.timeOffOverview.timeOffBalance.days'
        }
      }
    },
    // Put things into an array for "nice" processing
    {
      $group: {
        _id: { $eq: ['$_id.employee_id', params.id] }, //'$_id.employee_id',
        annual_salary: {
          $first: '$_id.annual_salary'
        },
        balance_leave_type: {
          $first: '$difference_type'
        },
        balance_value: {
          $first: '$difference'
        },
        leaves_availed: {
          $push: {
            name: '$_id.name',
            value: '$value',
            employee_id: '$_id.employee_id'
          }
        }
      }
    }
  ], (err, resp) => {
    if (err) {
      res.send(err)
    } else {
      let temp = [...resp]
      let flag = true
      const finalBalance = {}
      temp.map(leaves => {
        let firstTime = true
        leaves.balance_leave_type.map((name, index) => {
          if (firstTime) {
            finalBalance.monthlySalary = leaves.annual_salary
            finalBalance.id = leaves._id
            firstTime = false
          }
          if (finalBalance.id === true) {
            finalBalance[name] = {}
            finalBalance[name]['eligible'] = leaves.balance_value[index]
            let allow = true
            leaves.leaves_availed.map(availed => {
              if (name === availed.name) {
                finalBalance[name]['consumed'] = availed.value
                allow = false
              }
            })
            if (allow) {
              finalBalance[name]['consumed'] = 0
            }
          } else {
            flag = false
          }
        })
      }
      )
      if (flag) {
        res.send(finalBalance)
      } else {
        res.send({ message: 'No data found' });
      }

    }
  })
}
export const postPosition = (req, res, next) => {
  console.log('restapi');
  res.send('shree');
  // const id = req.body.id
  // const skills = req.body.skillInformation
  // Employee.update({_id: id}, { '$push': { skillInformation: skills } }, { safe: true, upsert: true }
  // ).exec((err, employee) => {
  //   if (err) {
  //     next(err)
  //   }
  //   if (!employee) {
  //     next(new Error('No post with that id'))
  //   } else {
  //     Employee.find({_id: id})
  //     .select(`retiralBenifits -_id`)
  //     .populate('retiralBenifits.retiralId')
  //     .exec((err, bills) => {
  //       if (err) {
  //         next(err)
  //       }
  //       if (!bills) {
  //         next(err)
  //       } else {
  //         res.send(bills)
  //       }
  //     })
  //   }
  // })
}

export const getEmpPayRoll = (req, res, next) => {
  const id = req.params.id
  Employee.findById(
    id,
    { 'timeOff.timeOffOverview': 1,
      'compensationInformation.compensationInformation.compensationGroup': 1,
      'benefits.currentBenefits': 1,
      'jobInformation.employmentDetail.jobInformation': 1,
      'compensationInformation.recurringPayment.recurringPayment': 1,
      'compensationInformation.compensationInformation.compensation': 1,
      'personalInformation.personalInformation.personalInformation': 1
    },
    (err, model) => {
      if (err) {
        res.send(err)
      } else {
        let vacationDays = 0
        let casualLeaveDays = 0
        let sickLeaveDays = 0

        let eligibleVacationDays = 0
        let eligibleCasualLeaveDays = 0
        let eligibleSickLeaveDays = 0
        const benefitsDataArr = []
        const socialDeductionsArr = []
        const allowanceDataArr = []
        const otherDeductionsArr = []
        let familyAllowance = {}
        const noOfChildrens = model.personalInformation.personalInformation.personalInformation.numberOfChildren

        const myRequestsArr = _.map(model.timeOff.timeOffOverview.myRequests, function (o) {
          if (o.timeOffType === 'Vacation') {
            vacationDays += o.days
            return vacationDays
          }
          if (o.timeOffType === 'Casual Leave') {
            casualLeaveDays += o.days
            return casualLeaveDays
          }
          if (o.timeOffType === 'Sick Leave') {
            sickLeaveDays += o.days
            return sickLeaveDays
          }
        })
        const timeOffBalanceArr = _.map(model.timeOff.timeOffOverview.timeOffBalance, function (e) {
          if (e.timeOffType === 'Vacation') {
            eligibleVacationDays += e.days
            return eligibleVacationDays
          }
          if (e.timeOffType === 'Casual Leave') {
            eligibleCasualLeaveDays += e.days
            return eligibleCasualLeaveDays
          }
          if (e.timeOffType === 'Sick Leave') {
            eligibleSickLeaveDays += e.days
            return eligibleSickLeaveDays
          }
        })
        const socialDeductionsData = _.map(model.compensationInformation.recurringPayment.recurringPayment, function (socialDeductionsData) {
          console.log('Test Data', socialDeductionsData)
          if (socialDeductionsData.socialContributionRelevant === 'Yes') {
            const postSocialDeductionsDataJson = {
              name: socialDeductionsData.payComponent,
              // code: socialContributionData,
              empCont: socialDeductionsData.contributionFromEmployee,
              employerCont: socialDeductionsData.markContributionForEmployer,
              mandatory: socialDeductionsData.mandatory,
              code: socialDeductionsData.code,
              _id: socialDeductionsData._id
            }
            socialDeductionsArr.push(postSocialDeductionsDataJson)
          }
          if (socialDeductionsData.socialContributionRelevant === 'No') {
            const postSocialOtherDeductionsJson = {
              name: socialDeductionsData.payComponent,
              // code: socialContributionData,
              empCont: socialDeductionsData.contributionFromEmployee,
              employerCont: socialDeductionsData.markContributionForEmployer,
              mandatory: socialDeductionsData.mandatory,
              code: socialDeductionsData.code,
              _id: socialDeductionsData._id
            }
            otherDeductionsArr.push(postSocialOtherDeductionsJson)
          }
        })
        // Fetching the allownace data
        const allowanceData = _.map(model.compensationInformation.compensationInformation.compensation, function (allowanceRsltSetDt) {
          if (allowanceRsltSetDt.socialContributionRelevant === 'Yes') {
            if (allowanceRsltSetDt.payComponent === 'School Benefits(SB)' || allowanceRsltSetDt.payComponent === 'Housing Allowance(HA)') {
              const benifitsJsonDt = {
                name: allowanceRsltSetDt.payComponent,
                amount: Number(allowanceRsltSetDt.amount),
                rate: 0,
                _id: allowanceRsltSetDt._id
              }
              benefitsDataArr.push(benifitsJsonDt)
              // console.log('Benifits', benifitsJsonDt)
            } else {
              const allowanceJsonDt = {
                name: allowanceRsltSetDt.payComponent,
                empBaseAmount: Number(allowanceRsltSetDt.amount),
                rate: 0,
                _id: allowanceRsltSetDt._id
              }
              allowanceDataArr.push(allowanceJsonDt)
            }
          } else {
            if (allowanceRsltSetDt.payComponent === 'Family and Child Allowance (FCA)') {
              const familyAllowanceJsonDt = {
                name: allowanceRsltSetDt.payComponent,
                empBaseAmount: Number(allowanceRsltSetDt.amount),
                dependants: Number(noOfChildrens),
                rate: 0,
                _id: allowanceRsltSetDt._id
              }
              familyAllowance = familyAllowanceJsonDt
              // familyAllowanceArr.push(familyAllowanceJsonDt)
            }
          }
        })
        // console.log('Test', postSocialContributionJson)
        const resultJson = {
          'annualSalary': model.compensationInformation.compensationInformation.compensationGroup.annualizedSalary,
          'monthlySalary': _.round(Number(model.compensationInformation.compensationInformation.compensationGroup.annualizedSalary) / 12, 2),
          'weeklyHours': model.jobInformation.employmentDetail.jobInformation[0].standardWeeklyHours,
          'sickLeaves': { 'eligible' : eligibleSickLeaveDays, 'consumed': sickLeaveDays },
          'annualLeaves': { 'eligible' : eligibleCasualLeaveDays, 'consumed': casualLeaveDays },
          'vacation': { 'eligible' : eligibleVacationDays, 'consumed': vacationDays },
          'benefits': benefitsDataArr,
          'socialDeductions': socialDeductionsArr,
          'allowance': allowanceDataArr,
          'otherDeductions': otherDeductionsArr,
          'familyAllowance': familyAllowance
        }
        res.send(resultJson)
      }
    })
  // db.getCollection('employees').find({_id: ObjectId("5a64b588174f83463c06af9c")},{"timeOff.timeOffOverview":1})
}

export const getAllEmpData = (req, res, next) => {
  Employee.find({}, { 'timeOff.timeOffOverview': 1, 'compensationInformation': 1 }, (err, respData) => {
    let eligibleVacationDays = 0
    let eligibleCasualLeaveDays = 0
    let eligibleSickLeaveDays = 0
    if (err) {
      res.send(err)
    } else {
      const payrollArr = []
      let arrData
      // const uniqueEmpId = _.uniqBy(respData, 'id')
      const uniqueEmpId = _.map(respData, function (e) {
        return e.id
      })
      // console.log('e.id', uniqueEmpId)
     // console.log('d', uniqueEmpId)
      respData.map((payrollData, i) => {
        // const id = payrollData[uniqueEmpId]
        let itemD
        let dataD
        // console.log('payrollData', payrollData.id)
        uniqueEmpId.map((dataSet, i) => {
          if (payrollData.id === dataSet) {
            //console.log('Daysasd', payrollData.timeOff.timeOffOverview.timeOffBalance)
            const timeOffBalanceArr = _.map(payrollData.timeOff.timeOffOverview.timeOffBalance, function (e) {
              if (e.timeOffType === 'Vacation') {
                eligibleVacationDays = e.days
                return eligibleVacationDays
              }
            })
            // if (payrollData.timeOff.timeOffOverview.timeOffBalance.timeOffType === 'Vacation') {
            //   console.log('Days', payrollData.timeOff.timeOffOverview.timeOffBalance.days)
            //   eligibleVacationDays += payrollData.timeOff.timeOffOverview.timeOffBalance.days
            //   return eligibleVacationDays
            // }
          }
          // console.log('eligibleVacationDays', eligibleVacationDays)
        })
        console.log('eligibleVacationDays', eligibleVacationDays)
        // uniqueEmpId.map((item, i) => {         
        //   dataD = item['_id']
        //   // console.log('Loop Id', d)
        // })
        // console.log('Loop Id', dataD)
        // console.log('id', payrollData[uniqueEmpId], uniqueEmpId)
       
        arrData = _.map(payrollData, function (s) {
          // console.log('Loop Data', s[0].timeOff)
          // if (s.timeOff.timeOffOverview.timeOffBalance.timeOffType === 'Vacation' && dataD === s._id) {
          //   eligibleVacationDays += s.days
          //   return eligibleVacationDays
          // }
          // if (s.timeOff.timeOffOverview.timeOffBalance.timeOffType.timeOffType === 'Casual Leave') {
          //   eligibleCasualLeaveDays += s.days
          //   return eligibleCasualLeaveDays
          // }
          // if (s.timeOff.timeOffOverview.timeOffBalance.timeOffType.timeOffType === 'Sick Leave') {
          //   eligibleSickLeaveDays += s.days
          //   return eligibleSickLeaveDays
          // }
        })
        // console.log('eligibleVacationDays', eligibleVacationDays, 'eligibleCasualLeaveDays', eligibleCasualLeaveDays, 'eligibleSickLeaveDays', eligibleSickLeaveDays)
        payrollArr.push(payrollData)
        return i
      })
      res.send(payrollArr)
    }
    // res.send({ 'eligibleSickLeaveDays': eligibleSickLeaveDays, 'eligibleCasualLeaveDays': eligibleCasualLeaveDays, 'eligibleVacationDays': eligibleVacationDays })
  })
}

export const verifyLogin = (req, res, next) => {
  const query = {
    "personalInformation.contactInformation.emailInformation.emailAddress": req.body.email,
    "password": req.body.password
  };
  const projection = {
    "identify.identify.identify.company": 1
  };
  Employee.find(query, projection, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      const company = result[0].identify.identify.identify.company;
      CompanySubscription.find(
        { company }, (error, response) => {
          if (error) {
            res.send(error);
          } else {
            const endDate = response[0].endDate;
            const subscriptionValid = verifySubscription(endDate);
            if (response[0].isActive && subscriptionValid) {
              res.send(response);
            } else {
              res.send({ message: 'Sorry, your subscription plan has expired' });
            }
          }
        }
      )
    }
  }
  ).limit(1)
}

const verifySubscription = (date) => {
  const today = new Date();
  const endDate = new Date(date);
  const isValid = moment(today).isSameOrBefore(endDate);
  if (isValid) {
    return true;
  } else {
    return false;
  }
};

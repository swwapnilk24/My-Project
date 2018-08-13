import { filter, findIndex } from 'lodash';
import { EmployeeType, AddressType, CurrentEmployeeType } from '../actions/ActionType';
import { BenefitsType } from '../components/Benefits/BenefitsConstants';


function intialState() {
  const employeeObj = {
    entityInformation: {
      owner: 'Mcbitss17',
      approver: 'efgh',
      status: 'new',
      customer: 'McBitss',
      approval_date: new Date()
    },
    identify: {
      identify: {
        identify: {
          hireDate: new Date(),
          company: '',
          eventReason: '',
          corporateCompany: ''
        }
      }
    },
    personalInformation: {
      biographicalInformation: {
        biographicalInformation: {
          dob: null,
          countryOfBirth: '',
          regionOfBirth: '',
          dateOfDeath: null,
          employeeId: '',
          employeeGlobalId: ''
        }
      },
      personalInformation: {
        personalInformation: {
          firstName: '',
          middleName: '',
          lastName: '',
          suffix: '',
          displayName: '',
          formalName: '',
          title: '',
          birthName: '',
          initials: '',
          prefix: '',
          gender: '',
          maritalStatus: '',
          maritalStatusSinceDate: new Date(),
          secondNationality: '',
          thirdNationality: '',
          preferredLanguage: '',
          challengeStatus: ''
        },
        countrySpecificFields: {
          us: {
            ethnicGroup: '',
            veteran: '',
            challengedVeteran: ''
          }
        }

      },
      nationalIdInformation: [],
      addressInformation: {
        addressInformation: []
      },
      workPermitInformation: {
        workPermitInformation: []
      },
      contactInformation: {
        emailInformation: [],
        phoneInformation: []
      },
      emergencyContactDetails: {
        emergencyContactDetails: []
      },
      educationalInformation: {
        educationalInformation: []
      },
      priorWorkExperienceDetails: {
        priorWorkExperienceDetails: []
      }
    },
    jobInformation: {
      employmentDetail: {
        keyJobAttribute: {
          jobCode: '',
          position: ''
        },
        organizationalInformation: [],
        jobInformation: [],
        timeInformation: {
          holidayCalendar: '',
          workSchedule: '',
          timeProfile: ''
        },
        countrySpecificFields: {
          us: {
            isFullTime: '',
            notes: '',
            employeeClass: '',
            flsaStatus: '',
            isShiftEmployee: '',
            shiftCode: '',
            shiftRate: '',
            shiftPercent: '',
            isCrossBorderWorker: '',
            eeoJobGroup: '',
            contractType: '',
            continuedSicknessPayPeriod: '',
            continuedSicknessPayMeasure: '',
            noticePeriod: '',
            initialEntry: '',
            entryIntoGroup: '',
            corporation: '',
            eeoCategory1: '',
            eeoCategory2: '',
            eeoCategory3: '',
            eeoCategory4: '',
            eeoCategory5: '',
            eeoCategory6: ''
          }
        }
      },
      jobRelationships: {
        globalFields: []
      },
      employmentDetails: {
        globalFields: {
          hireDate: null,
          originalStartDate: null,
          seniorityStartDate: null,
          serviceDate: null,
          professionalServiceDate: null,
          retireDate: null
        }
      }
    },
    compensationInformation: {
      compensationInformation: {
        compensationGroup: {
          payType: '',
          payGroup: '',
          isEligibleForBenefit: '',
          isEligibleForCar: '',
          benefitRate: '',
          compaRatio: '',
          rangePenetration: '',
          annualizedSalary: '',
          teo: ''
        },
        compensation: []
      },
      oneTimePayment: {
        oneTimePayment: []
      },
      recurringPayment: {
        recurringPayment: []
      }
    },
    companyInformation: {
      companyInformation: {
        companyName: '',
        countryName: '',
        cityName: '',
        stateName: '',
        zipCode: '',
        countryList: '',
        countriesList: '',
        addressLine1: '',
        addressLine2: '',
        numberOfEmployees: '',
        add1: 'v-2'
      },
      addressInformation: {
        addressInformation: {
          addressType: 'Home Address',
          country: '',
          line1: '',
          line2: '',
          city: '',
          state: '',
          zip: ''
        },
        mailingAddress: {
          addressType: 'Mailing Address',
          country: '',
          line1: '',
          line2: '',
          city: '',
          state: '',
          zip: ''
        }
      }
    },
    benefits: {
      currentBenefits: {
        allowance: [],
        psrPlans: []
      },
      enrollments: [],
      claims: {
        inprocessClaims: [],
        processedClaims: []
      }
    },
    timeOff: {
      timeOffOverview: {
        myRequests: [],
        timeOffBalance: []
      }
    }
  };
  return employeeObj;
}
// const employeeObj = {
//   entityInformation: {
//     owner: 'Mcbitss17',
//     approver: 'efgh',
//     status: 'new',
//     customer: 'McBitss',
//     approval_date: new Date()
//   },
//   identify: {
//     identify: {
//       identify: {
//         hireDate: new Date(),
//         company: '',
//         eventReason: ''
//       }
//     }
//   },
//   personalInformation: {
//     biographicalInformation: {
//       biographicalInformation: {
//         dob: null,
//         countryOfBirth: '',
//         regionOfBirth: '',
//         dateOfDeath: null,
//         employeeId: '',
//         employeeGlobalId: ''
//       }
//     },
//     personalInformation: {
//       personalInformation: {
//         firstName: '',
//         middleName: '',
//         lastName: '',
//         suffix: '',
//         displayName: '',
//         formalName: '',
//         title: '',
//         birthName: '',
//         initials: '',
//         prefix: '',
//         gender: '',
//         maritalStatus: '',
//         maritalStatusSinceDate: new Date(),
//         secondNationality: '',
//         thirdNationality: '',
//         preferredLanguage: '',
//         challengeStatus: ''
//       },
//       countrySpecificFields: {
//         us: {
//           ethnicGroup: '',
//           veteran: '',
//           challengedVeteran: ''
//         }
//       }

//     },
//     nationalIdInformation: [],
//     addressInformation: {
//       addressInformation: []
//     },
//     workPermitInformation: {
//       workPermitInformation: []
//     },
//     contactInformation: {
//       emailInformation: [],
//       phoneInformation: []
//     }

//   },
//   jobInformation: {
//     employmentDetail: {
//       keyJobAttribute: [],
//       organizationalInformation: [],
//       jobInformation: [],
//       timeInformation: {
//         holidayCalendar: '',
//         workSchedule: '',
//         timeProfile: ''
//       },
//       countrySpecificFields: {
//         us: {
//           isFullTime: '',
//           notes: '',
//           employeeClass: '',
//           flsaStatus: '',
//           isShiftEmployee: '',
//           shiftCode: '',
//           shiftRate: '',
//           shiftPercent: '',
//           isCrossBorderWorker: '',
//           eeoJobGroup: '',
//           contractType: '',
//           continuedSicknessPayPeriod: '',
//           continuedSicknessPayMeasure: '',
//           noticePeriod: '',
//           initialEntry: '',
//           entryIntoGroup: '',
//           corporation: '',
//           eeoCategory1: '',
//           eeoCategory2: '',
//           eeoCategory3: '',
//           eeoCategory4: '',
//           eeoCategory5: '',
//           eeoCategory6: ''
//         }
//       }
//     },
//     jobRelationships: {
//       globalFields: []
//     },
//     employmentDetails: {
//       globalFields: {
//         hireDate: null,
//         originalStartDate: null,
//         seniorityStartDate: null,
//         serviceDate: null,
//         professionalServiceDate: null,
//         retireDate: null
//       }
//     }
//   },
//   compensationInformation: {
//     compensationInformation: {
//       compensationGroup: {
//         payType: '',
//         payGroup: '',
//         isEligibleForBenefit: '',
//         isEligibleForCar: '',
//         benefitRate: '',
//         compaRatio: '',
//         rangePenetration: '',
//         annualizedSalary: '',
//         teo: ''
//       },
//       compensation: []
//     },
//     oneTimePayment: {
//       oneTimePayment: []
//     },
//     recurringPayment: {
//       recurringPayment: []
//     }
//   },
//   companyInformation: {
//     companyInformation: {
//       companyName: '',
//       countryName: '',
//       cityName: '',
//       stateName: '',
//       zipCode: '',
//       countryList: '',
//       countriesList: '',
//       addressLine1: '',
//       addressLine2: '',
//       numberOfEmployees: '',
//       add1: 'v-2'
//     },
//     addressInformation: {
//       addressInformation: {
//         addressType: 'Home Address',
//         country: '',
//         line1: '',
//         line2: '',
//         city: '',
//         state: '',
//         zip: ''
//       },
//       mailingAddress: {
//         addressType: 'Mailing Address',
//         country: '',
//         line1: '',
//         line2: '',
//         city: '',
//         state: '',
//         zip: ''
//       }
//     }
//   },
//   benefits: {
//     claims: {
//       inprocessClaims: [],
//       processedClaims: []
//     }
//   },
//   timeOff: {
//     timeOffOverview: {
//       balanceAsOfSection: {
//         vacation: {
//           type: 'Vacation',
//           days: '16'
//         },
//         sickLeave: {
//           type: 'Sick Leave',
//           days: '10'
//         },
//         casualLeave: {
//           type: 'Casual Leave',
//           days: '4'
//         },
//         other: {
//           type: 'Other',
//           otherTypes: [
//             {
//               unpaidIll: {
//                 type: 'Unpaid Ill'
//                 // days: ''
//               }
//             }
//           ]
//         }
//       },
//       timeOffCalendar: {
//         timeOffType: '',
//         startDate: new Date(),
//         endDate: new Date(),
//         fullOrHalf: '',
//         comment: []
//       },
//       viewTeamCalendar: {
//         approve: ''
//       },
//       myRequests: []
//     }
//   }
// };

const currentEmployeeObj = {
  entityInformation: {
    owner: 'abcd',
    approver: 'efgh',
    status: 'active',
    customer: 'McBitss',
    approval_date: new Date()
  },
  identify: {
    identify: {
      identify: {
        hireDate: new Date(),
        company: '',
        corporateCompany: '',
        eventReason: ''
      }
    }
  },
  personalInformation: {
    biographicalInformation: {
      biographicalInformation: {
        dob: '',
        countryOfBirth: '',
        regionOfBirth: '',
        dateOfDeath: '',
        employeeId: '',
        employeeGlobalId: ''
      }
    },
    personalInformation: {
      personalInformation: {
        firstName: '',
        middleName: '',
        lastName: '',
        suffix: '',
        displayName: '',
        formalName: '',
        title: '',
        birthName: '',
        initials: '',
        prefix: '',
        gender: '',
        maritalStatus: '',
        numberOfChildren: '',
        maritalStatusSinceDate: new Date(),
        secondNationality: '',
        thirdNationality: '',
        preferredLanguage: '',
        challengeStatus: ''
      },
      countrySpecificFields: {
        us: {
          ethnicGroup: '',
          veteran: '',
          challengedVeteran: ''
        }
      }

    },
    nationalIdInformation: [],
    addressInformation: {
      homeAddress: []
    },
    workPermitInformation: {
      workPermitInformation: []
    },
    contactInformation: {
      emailInformation: [{
        emailType: '',
        emailAddress: '',
        isPrimary: ''
      }],
      phoneInformation: [{
        phoneType: '',
        number: '',
        extension: '',
        isPrimary: ''
      }]
    },
    emergencyContactDetails: {
      emergencyContactDetails: []
    },
    educationalInformation: {
      educationalInformation: []
    },
    priorWorkExperienceDetails: {
      priorWorkExperienceDetails: []
    }
  },
  jobInformation: {
    employmentDetail: {
      keyJobAttribute: {
        jobCode: '',
        position: ''
      },
      organizationalInformation: [],
      jobInformation: [],
      timeInformation: {
        holidayCalendar: '',
        workSchedule: '',
        timeProfile: ''
      },
      countrySpecificFields: {
        us: {
          isFullTime: '',
          notes: '',
          employeeClass: '',
          flsaStatus: '',
          isShiftEmployee: '',
          shiftCode: '',
          shiftRate: '',
          shiftPercent: '',
          isCrossBorderWorker: '',
          eeoJobGroup: '',
          contractType: '',
          continuedSicknessPayPeriod: '',
          continuedSicknessPayMeasure: '',
          noticePeriod: '',
          initialEntry: '',
          entryIntoGroup: '',
          corporation: '',
          eeoCategory1: '',
          eeoCategory2: '',
          eeoCategory3: '',
          eeoCategory4: '',
          eeoCategory5: '',
          eeoCategory6: ''
        }
      }
    },
    jobRelationships: {
      globalFields: []
    },
    employmentDetails: {
      globalFields: {
        hireDate: '',
        originalStartDate: '',
        seniorityStartDate: '',
        serviceDate: '',
        professionalServiceDate: '',
        retireDate: ''
      }
    }
  },
  compensationInformation: {
    compensationInformation: {
      compensationGroup: [],
      compensation: []
    },
    oneTimePayment: {
      oneTimePayment: []
    },
    recurringPayment: {
      recurringPayment: []
    }
  },
  companyInformation: {
    companyInformation: {
      companyName: '',
      countryName: '',
      cityName: '',
      stateName: '',
      zipCode: '',
      countryList: '',
      countriesList: '',
      addressLine1: '',
      addressLine2: '',
      numberOfEmployees: '',
      add1: 'v-2'
    },
    addressInformation: {
      homeAddress: {
        addressType: '',
        country: '',
        line1: '',
        line2: '',
        city: '',
        state: '',
        zip: ''
      },
      mailingAddress: {
        addressType: '',
        country: '',
        line1: '',
        line2: '',
        city: '',
        state: '',
        zip: ''
      }
    }
  },
  benefits: {
    currentBenefits: {
      allowance: [],
      psrPlans: []
    },
    enrollments: [],
    claims: {
      inprocessClaims: [],
      processedClaims: []
    }
  },
  timeOff: {
    timeOffOverview: {
      myRequests: [],
      timeOffBalance: []
    }
  }
};

const lastEmployeeObj = {
  personalInformation: {
    biographicalInformation: {
      biographicalInformation: {
        employeeId: ''
      }
    }
  }
};

const DEFAULT_STATE = {
  newEmployee: intialState(),
  myEmployees: [],
  myTempEmployees: [],
  currentEmployee: Object.assign({}, currentEmployeeObj),
  lastEmployee: Object.assign({}, lastEmployeeObj),
  totalAddressInGridonLoad: [],
  lastTempEmployee: Object.assign({}, lastEmployeeObj)
};

const modifyHireDate = (state, action) => {
  const newCurrentEmployeeState = {};
  Object.assign(newCurrentEmployeeState, state.newEmployee);
  newCurrentEmployeeState.identify.identify.identify.hireDate = action.date;
  const newState = {};
  Object.assign(newState, state, { newEmployee: newCurrentEmployeeState });
  return newState;
};
const modifyEventReason = (state, action) => {
  const newCurrentEmployeeState = {};
  Object.assign(newCurrentEmployeeState, state.newEmployee);
  newCurrentEmployeeState.identify.identify.identify.eventReason = action.data;
  const newState = {};
  Object.assign(newState, state, { newEmployee: newCurrentEmployeeState });
  return newState;
};

const emptyNewEmployee = (state) => {
  const newState = {};
  console.log('old state', intialState());
  const newEmployee = Object.assign({}, intialState());
  // newEmployee.identify.identify.identify.company = '';
  // newEmployee.identify.identify.identify.eventReason = '';
  Object.assign(newState, state, { newEmployee });
  return newState;
};
const getCurrentEmployee = (state) => {
  const newCurrentEmployeeState = {};
  Object.assign(newCurrentEmployeeState, state.newEmployee);
  newCurrentEmployeeState.identify.hireDate = new Date();
  newCurrentEmployeeState.identify.company = '';
  newCurrentEmployeeState.identify.eventReason = '';
  newCurrentEmployeeState.identify.corporateCompany = '';
  newCurrentEmployeeState.personalInformation.biographicalInformation.DOB = new Date();
  newCurrentEmployeeState.personalInformation.biographicalInformation.CountryOfBirth = '';
  newCurrentEmployeeState.personalInformation.biographicalInformation.DateOfDeath = new Date();
  const newState = {};
  Object.assign(newState, state, { newEmployee: newCurrentEmployeeState });
  return newState;
};

const setCompanyData = (state, action) => {
  console.log('current employee DB', action.data);
  const newCurrentEmployeeState = Object.assign({}, state.newEmployee);
  newCurrentEmployeeState.identify.identify.identify.company = action.data.company;
  newCurrentEmployeeState.identify.identify.identify.corporateCompany = action.data.corporateCompany;
  const newState = {};
  Object.assign(newState, state, { currentEmployee: newCurrentEmployeeState });
  return state;
};

const setEventReasonData = (state, action) => {
  const newCurrentEmployeeState = {};
  Object.assign(newCurrentEmployeeState, state.currentEmployee.identify);
  newCurrentEmployeeState[0].eventReason = action.id;
  const newState = {};
  Object.assign(newState, state, { currentEmployee: newCurrentEmployeeState });
  return newState;
};

const modifyDOB = (state, action) => {
  const newCurrentEmployeeState = {};
  Object.assign(newCurrentEmployeeState, state.newEmployee);
  newCurrentEmployeeState.personalInformation.biographicalInformation.DOB = action.date;
  const newState = {};
  Object.assign(newState, state, { newEmployee: newCurrentEmployeeState });
  return newState;
};

const setCountryOfBirth = (state, action) => {
  const newCurrentEmployeeState = {};
  Object.assign(newCurrentEmployeeState, state.currentEmployee.personalInformation.biographicalInformation);
  newCurrentEmployeeState[0].CountryOfBirth = action.id;
  const newState = {};
  Object.assign(newState, state, { currentEmployee: newCurrentEmployeeState });
  return newState;
};

const modifyDateOfDeath = (state, action) => {
  const newCurrentEmployeeState = [];
  Object.assign(newCurrentEmployeeState, state.currentEmployee);
  newCurrentEmployeeState[0].personalInformation.biographicalInformation.DateOfDeath = action.date;
  const newState = {};
  Object.assign(newState, state, { currentEmployee: newCurrentEmployeeState });
  return newState;
};

const modifyCertificateStartDate = (state, action) => {
  const newCurrentEmployeeState = [];
  Object.assign(newCurrentEmployeeState, state.currentEmployee.personalInformation.personalInformation);
  newCurrentEmployeeState[0].CertificateStartDate = action.date;
  const newState = {};
  Object.assign(newState, state, { currentEmployee: newCurrentEmployeeState });
  return newState;
};

const modifyCertificateEndDate = (state, action) => {
  const newCurrentEmployeeState = [];
  Object.assign(newCurrentEmployeeState, state.currentEmployee.personalInformation.personalInformation);
  newCurrentEmployeeState[0].CertificateEndDate = action.date;
  const newState = {};
  Object.assign(newState, state, { currentEmployee: newCurrentEmployeeState });
  return newState;
};
const addFieldsForArrayType = (state, action) => {
  console.log('testbug', action);
  const newCurrentEmployeeState = {};
  Object.assign(newCurrentEmployeeState, state.newEmployee);
  newCurrentEmployeeState.compensationInformation.compensationInformation.compensation[0] = {};
  newCurrentEmployeeState.compensationInformation.compensationInformation.compensation[0].payComponent = '';
  newCurrentEmployeeState.compensationInformation.compensationInformation.compensation[0].amount = '';
  newCurrentEmployeeState.compensationInformation.compensationInformation.compensation[0].currency = '';
  newCurrentEmployeeState.compensationInformation.compensationInformation.compensation[0].frequency = '';
  newCurrentEmployeeState.compensationInformation.compensationInformation.compensation[0].markPaymentIsEligibleForEmployee = '';
  newCurrentEmployeeState.compensationInformation.compensationInformation.compensation[0].markTaxDeductionAtSource = '';
  newCurrentEmployeeState.compensationInformation.compensationInformation.compensation[0].markContributionForEmployer = '';
  newCurrentEmployeeState.compensationInformation.compensationInformation.compensation[0].socialContributionRelevant = '';
  newCurrentEmployeeState.compensationInformation.compensationInformation.compensation[0].contributionFromEmployee = '';
  newCurrentEmployeeState.compensationInformation.oneTimePayment.oneTimePayment[0] = {};
  newCurrentEmployeeState.compensationInformation.oneTimePayment.oneTimePayment[0].payComponent = '';
  newCurrentEmployeeState.compensationInformation.oneTimePayment.oneTimePayment[0].amount = '';
  newCurrentEmployeeState.compensationInformation.oneTimePayment.oneTimePayment[0].currency = '';
  newCurrentEmployeeState.compensationInformation.oneTimePayment.oneTimePayment[0].paymentDate = null;
  newCurrentEmployeeState.compensationInformation.recurringPayment.recurringPayment[0] = {};
  newCurrentEmployeeState.compensationInformation.recurringPayment.recurringPayment[0].payComponent = '';
  newCurrentEmployeeState.compensationInformation.recurringPayment.recurringPayment[0].amount = '';
  newCurrentEmployeeState.compensationInformation.recurringPayment.recurringPayment[0].currency = '';
  newCurrentEmployeeState.compensationInformation.recurringPayment.recurringPayment[0].startDate = null;
  newCurrentEmployeeState.compensationInformation.recurringPayment.recurringPayment[0].endDate = null;
  newCurrentEmployeeState.compensationInformation.recurringPayment.recurringPayment[0].markPaymentIsEligibleForEmployee = '';
  newCurrentEmployeeState.compensationInformation.recurringPayment.recurringPayment[0].markTaxDeductionAtSource = '';
  newCurrentEmployeeState.compensationInformation.recurringPayment.recurringPayment[0].markContributionForEmployer = '';
  // newCurrentEmployeeState.jobInformation.employmentDetail.keyJobAttribute[0] = {};
  // newCurrentEmployeeState.jobInformation.employmentDetail.keyJobAttribute[0].jobCode = '';
  // newCurrentEmployeeState.jobInformation.employmentDetail.keyJobAttribute[0].position = '';
  newCurrentEmployeeState.jobInformation.employmentDetail.organizationalInformation[0] = {};
  newCurrentEmployeeState.jobInformation.employmentDetail.organizationalInformation[0].company = '';
  newCurrentEmployeeState.jobInformation.employmentDetail.organizationalInformation[0].businessUnit = '';
  newCurrentEmployeeState.jobInformation.employmentDetail.organizationalInformation[0].division = '';
  newCurrentEmployeeState.jobInformation.employmentDetail.organizationalInformation[0].department = '';
  newCurrentEmployeeState.jobInformation.employmentDetail.organizationalInformation[0].location = '';
  newCurrentEmployeeState.jobInformation.employmentDetail.organizationalInformation[0].timeZone = '';
  newCurrentEmployeeState.jobInformation.employmentDetail.organizationalInformation[0].costCenter = '';
  newCurrentEmployeeState.jobInformation.employmentDetail.jobInformation[0] = {};
  newCurrentEmployeeState.jobInformation.employmentDetail.jobInformation[0].employmentStatus = '';
  newCurrentEmployeeState.jobInformation.employmentDetail.jobInformation[0].supervisor = '';
  newCurrentEmployeeState.jobInformation.employmentDetail.jobInformation[0].jobClassification = '';
  newCurrentEmployeeState.jobInformation.employmentDetail.jobInformation[0].jobTitle = '';
  newCurrentEmployeeState.jobInformation.employmentDetail.jobInformation[0].localJobTitle = '';
  newCurrentEmployeeState.jobInformation.employmentDetail.jobInformation[0].payGrade = '';
  newCurrentEmployeeState.jobInformation.employmentDetail.jobInformation[0].regularOrTemporary = '';
  newCurrentEmployeeState.jobInformation.employmentDetail.jobInformation[0].standardWeeklyHours = '';
  newCurrentEmployeeState.jobInformation.employmentDetail.jobInformation[0].fte = '';
  newCurrentEmployeeState.jobInformation.jobRelationships.globalFields[0] = {};
  newCurrentEmployeeState.jobInformation.jobRelationships.globalFields[0].relationshipType = '';
  newCurrentEmployeeState.jobInformation.jobRelationships.globalFields[0].name = '';
  const newState = {};
  Object.assign(newState, state, { newEmployee: newCurrentEmployeeState });
  return newState;
};
const updateData = (state, action) => {
  // console.log('updating employee data');
  // console.log(action);
  console.log(action.data, 'adding new');
  const newCurrentEmployeeState = {};
  Object.assign(newCurrentEmployeeState, state.newEmployee);
  const fieldArr = action.data.field.split('.');
  const step = fieldArr[0];
  const section = fieldArr[1];
  const subSection = fieldArr[2];
  const field = fieldArr[3];
  console.log(step, section, subSection, field);
  const newState = {};
  if (step === 'personalInformation') {
    if (subSection === 'countrySpecificFields') {
      const country = field;
      const countryField = fieldArr[4];
      newCurrentEmployeeState[step][section][subSection][country][countryField] = action.data.value;
    } else if (field === '' || field === undefined) {
      newCurrentEmployeeState[step][section][subSection] = action.data.value;
    } else {
      newCurrentEmployeeState[step][section][subSection][field] = action.data.value;
    }
  }
  if (step === 'jobInformation') {
    if (section === 'employmentDetail') {
      if (subSection === 'organizationalInformation' || subSection === 'jobInformation') {
        newCurrentEmployeeState[step][section][subSection][0][field] = action.data.value;
      } else if (subSection === 'countrySpecificFields') {
        const country = field;
        const countryField = fieldArr[4];
        newCurrentEmployeeState[step][section][subSection][country][countryField] = action.data.value;
      } else {
        console.log(newCurrentEmployeeState[step][section][subSection][field]);
        newCurrentEmployeeState[step][section][subSection][field] = action.data.value;
      }
    }
    if (section === 'employmentDetails') {
      console.log(action.data.value, action);
      newCurrentEmployeeState[step][section][subSection][field] = action.data.value;
    }
    if (section === 'jobRelationships') {
      newCurrentEmployeeState[step][section][subSection][0][field] = action.data.value;
    }
  }
  if (step === 'compensationInformation') {
    if (section === 'compensationInformation') {
      if (subSection === 'compensationGroup') {
        newCurrentEmployeeState[step][section][subSection][field] = action.data.value;
      }
      if (subSection === 'compensation') {
        newCurrentEmployeeState[step][section][subSection][0][field] = action.data.value;
      }
    }
    if (section === 'oneTimePayment') {
      newCurrentEmployeeState[step][section][subSection][0][field] = action.data.value;
    }
    if (section === 'recurringPayment') {
      newCurrentEmployeeState[step][section][subSection][0][field] = action.data.value;
    }
  }
  Object.assign(newState, state, { newEmployee: newCurrentEmployeeState });
  return newState;
};
// const updateCurrentEmployeeData = (state, action) => {
//   console.log('updateCurrentEmployeeData');
//   console.log(action);

//   const newCurrentEmployeeState = {};
//   Object.assign(newCurrentEmployeeState, state.currentEmployee);
//   const fieldArr = action.data.field.split('.');
//   const step = fieldArr[0];
//   const section = fieldArr[1];
//   const subSection = fieldArr[2];
//   const field = fieldArr[3];

//   if (subSection === 'countrySpecificFields') {
//     const country = field;
//     const countryField = fieldArr[4];
//     newCurrentEmployeeState[step][section][subSection][country][countryField] = action.data.value;
//     console.log('printing field array', step, section, subSection, country, countryField);
//     console.log('Value:', action.data.value);
//   } else if (field === '' || field === undefined) {
//     newCurrentEmployeeState[step][section][subSection] = action.data.value;
//   } else {
//     newCurrentEmployeeState[step][section][subSection][field] = action.data.value;
//     console.log('printing field array', step, section, subSection, field);
//     console.log('Value:', action.data.value);
//     console.log('your new value updated', newCurrentEmployeeState[step][section][subSection][field]);
//   }
//   const newState = {};
//   Object.assign(newState, state, { currentEmployee: newCurrentEmployeeState });
//   return newState;
// };

const updateNewEmployeeCompensation = (state, action) => {
  const newEmployeeState = {};
  Object.assign(newEmployeeState, state.newEmployee);
  if (action.data.subsection === 'compensation') {
    newEmployeeState.compensationInformation.compensationInformation.compensation = action.data.newData;
  }
  if (action.data.subsection === 'oneTimePayment') {
    newEmployeeState.compensationInformation.oneTimePayment.oneTimePayment = action.data.newData;
  }
  if (action.data.subsection === 'recurringPayment') {
    newEmployeeState.compensationInformation.recurringPayment.recurringPayment = action.data.newData;
  }
  const newState = {};
  Object.assign(newState, state, { newEmployee: newEmployeeState });
  return newState;
};

const updateCurrentEmployeeData = (state, action) => {
  const newCurrentEmployeeState = {};
  Object.assign(newCurrentEmployeeState, state.currentEmployee);
  // console.log('triggerReducer', action.data.newData);
  if (action.data.subsection === 'compensation') {
    // console.log('updateCurrentEmployeeData');
    // console.log(action);
    newCurrentEmployeeState.compensationInformation.compensationInformation.compensation = action.data.newData;
  }
  if (action.data.subsection === 'oneTimePayment') {
    newCurrentEmployeeState.compensationInformation.oneTimePayment.oneTimePayment = action.data.newData;
  }
  if (action.data.subsection === 'recurringPayment') {
    newCurrentEmployeeState.compensationInformation.recurringPayment.recurringPayment = action.data.newData;
  }
  if (action.data.subsection === 'compensationGroup') {
    newCurrentEmployeeState.compensationInformation.compensationInformation.compensationGroup = action.data.newData;
  }
  const newState = {};
  Object.assign(newState, state, { currentEmployee: newCurrentEmployeeState });
  // const newCurrentEmployeeState = {};
  // Object.assign(newCurrentEmployeeState, state.currentEmployee);
  // const fieldArr = action.data.field.split('.');
  // const step = fieldArr[0];
  // const section = fieldArr[1];
  // const subSection = fieldArr[2];
  // const field = fieldArr[3];

  // if (subSection === 'countrySpecificFields') {
  //   const country = field;
  //   const countryField = fieldArr[4];
  //   newCurrentEmployeeState[step][section][subSection][country][countryField] = action.data.value;
  //   console.log('printing field array', step, section, subSection, country, countryField);
  //   console.log('Value:', action.data.value);
  // } else if (field === '' || field === undefined) {
  //   newCurrentEmployeeState[step][section][subSection] = action.data.value;
  // } else {
  //   newCurrentEmployeeState[step][section][subSection][field] = action.data.value;
  //   console.log('printing field array', step, section, subSection, field);
  //   console.log('Value:', action.data.value);
  //   console.log('your new value updated', newCurrentEmployeeState[step][section][subSection][field]);
  // }
  // const newState = {};
  // Object.assign(newState, state, { currentEmployee: newCurrentEmployeeState });
  return newState;
};

// Update mailing address data
const updateAddressData = (state, action) => {
  console.log('State', state);
  const newCurrentEmployeeState = {};
  Object.assign(newCurrentEmployeeState, state.currentEmployee);
  const fieldArr = action.data.field.split('.');
  const step = fieldArr[0];
  const section = fieldArr[1];
  const field = fieldArr[2];
  console.log(step, section, field);
  // const field = fieldArr[3];
  if (section === 'companyInformation') {
    newCurrentEmployeeState[step][section][field] = action.data.value;
  } else {
    console.log('Else');
    // newCurrentEmployeeState[step][section][field] = action.data.value;
  }
  const newState = {};
  Object.assign(newState, state, { currentEmployee: newCurrentEmployeeState });
  console.log('newState ', newState);
  return newState;
};

const totalAddressInGridonLoad = (state, action) => {
  console.log('state', state);
  console.log('action', action);
  const newState = {};
  Object.assign(newState, state, { totalAddressInGridonLoad: action.data });
  console.log('newState', newState);
  return newState;
};

const addressInGridEdited = (state, action) => {
  console.log('this is in state', state);
  console.log('this is in action', action.data);
  const newState = {};
  Object.assign(newState, state, { totalAddressInGridonLoad: action.data });
  console.log('newState', newState);
  return newState;
};

const addedNewAddress = (state, action) => {
  console.log('this is in state', state);
  console.log('this is in action', action.data);
  const newState = {};
  Object.assign(newState, state, { totalAddressInGridonLoad: action.data });
  console.log('newState', newState);
  return newState;
};

const setNewEmployee = (state, action) => {
  console.log('new Employee DB', action.data);
  // const newCurrentEmployeeState = action.payload;
  // Object.assign(newCurrentEmployeeState, state.newEmployee);
  // newCurrentEmployeeState[0].company = action.id;
  const newState = {};
  Object.assign(newState, state, { newEmployee: action.data[0] });
  return newState;
};

// Get last employee record by id
const getLastEmployeeId = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { lastEmployee: action.data });
  console.log('newState data', newState);
  return newState;
};

const setCurrentEmployee = (state, action) => {
  // console.log('State', state);
  // console.log('action', action.data);
  console.log(action);
  const newState = {};
  Object.assign(newState, state, { currentEmployee: action.data[0] });
  console.log('Current State ', newState);
  return newState;
};

const createNewEmployeeData = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { newEmployee: action.data });
  console.log('New Employee', action.data);
  return newState;
};

// Adding a anational id information of employee
const addNationalIdInformationData = (state, action) => {
  const newCurrentEmployeeState = {};
  Object.assign(newCurrentEmployeeState, state.newEmployee);
  newCurrentEmployeeState.personalInformation.nationalIdInformation = action.data.newRows;
  const newState = {};
  Object.assign(newState, state, { newEmployee: newCurrentEmployeeState });
  console.log('newState', newState);
  return newState;
};

// Adding email id information
const addEmailIdInformationData = (state, action) => {
  const newCurrentEmployeeState = {};
  Object.assign(newCurrentEmployeeState, state.newEmployee);
  newCurrentEmployeeState.personalInformation.contactInformation.emailInformation = action.data.newRows;
  const newState = {};
  Object.assign(newState, state, { newEmployee: newCurrentEmployeeState });
  console.log('newState', newState);
  return newState;
};

// Adding Phone information data
const addPhoneInformationData = (state, action) => {
  const newCurrentEmployeeState = {};
  Object.assign(newCurrentEmployeeState, state.newEmployee);
  newCurrentEmployeeState.personalInformation.contactInformation.phoneInformation = action.data.newRows;
  const newState = {};
  Object.assign(newState, state, { newEmployee: newCurrentEmployeeState });
  console.log('newState', newState);
  return newState;
};

//adding work permit info
const addWorkPermitInfoData = (state, action) => {
  const newCurrentEmployeeState = {};
  Object.assign(newCurrentEmployeeState, state.newEmployee);
  newCurrentEmployeeState.personalInformation.workPermitInformation.workPermitInformation = action.data.newRows;
  const newState = {};
  Object.assign(newState, state, { newEmployee: newCurrentEmployeeState });
  console.log('newState', newState);
  return newState;
};

//adding address info
const addAddressInfoData = (state, action) => {
  const newCurrentEmployeeState = {};
  Object.assign(newCurrentEmployeeState, state.newEmployee);
  newCurrentEmployeeState.personalInformation.addressInformation.addressInformation = action.data.newRows;
  const newState = {};
  Object.assign(newState, state, { newEmployee: newCurrentEmployeeState });
  console.log('newState', newState);
  return newState;
};
const getListofMyTempEmployees = (state, action) => {
  console.log('bugin', action);
  const newMyEmployees = {};
  Object.assign(newMyEmployees, state, { myTempEmployees: action.data });
  console.log('bugin', newMyEmployees);
  return newMyEmployees;
};
//Get list of my employees
const getListOfMyEmployeesData = (state, action) => {
  console.log('bugin', action);
  const newMyEmployees = {};
  Object.assign(newMyEmployees, state, { myEmployees: action.data });
  console.log('bugin', newMyEmployees);
  return newMyEmployees;
};

//search employeess data by id
const searchEmployeeById = (state, action) => {
  // console.log('bugin');
  const newStateEmployeeId = {};
  // console.log('bugin', action.data);
  Object.assign(newStateEmployeeId, state, { currentEmployee: action.data[0] });
  // console.log('bugin', newStateEmployeeId);
  return newStateEmployeeId;
};

const updateNewEmployee = (state, action) => {
  const newEmployeeState = {};
  Object.assign(newEmployeeState, state, { newEmployee: action.data });
  return newEmployeeState;
};

const getLastTempEmployeeId = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { lastTempEmployee: action.data });
  console.log('newState data', newState);
  return newState;
};

const updateCurrentEmployeeJobInfo = (state, action) => {
  console.log('In updateCurrentEmployeeJobInfo');
  const newCurrentEmployeeState = {};
  Object.assign(newCurrentEmployeeState, state.currentEmployee);
  let flag = true; // Flag to push a new empty objecy -- for add
  action.data.field.forEach((element, index) => {
    const fieldArr = element.split('_');
    const step = fieldArr[0];
    const section = fieldArr[1];
    const subSection = fieldArr[2];
    const field = fieldArr[3];
    if (action.data.type === 'add') {
      if (flag) {
        newCurrentEmployeeState[step][section][subSection].push({});
        flag = false;
      }
      const rowIndex = newCurrentEmployeeState[step][section][subSection].length;
      const addIndex = rowIndex - 1;
      console.log(`${newCurrentEmployeeState[step][section][subSection]} length is`, typeof rowIndex);
      newCurrentEmployeeState[step][section][subSection][addIndex][field] = action.data.value[index];
    }
    if (action.data.type === 'edit') {
      if (subSection === 'keyJobAttribute' || subSection === 'timeInformation' || section === 'employmentDetails') {
        newCurrentEmployeeState[step][section][subSection][field] = action.data.value[index];
      } else if (subSection === 'countrySpecificFields') {
        const country = field;
        const countryField = fieldArr[4];
        newCurrentEmployeeState[step][section][subSection][country][countryField] = action.data.value[index];
      } else {
        newCurrentEmployeeState[step][section][subSection].reverse();
        newCurrentEmployeeState[step][section][subSection][action.data.id][field] = action.data.value[index];
        newCurrentEmployeeState[step][section][subSection].reverse();
      }
    }
  });
  const newState = {};
  Object.assign(newState, state, { currentEmployee: newCurrentEmployeeState });
  return newState;
};

const updateCurrentEmployeePersonalInfo = (state, action) => {
  console.log('In updateCurrentEmployeePersonalInfo');
  console.log(action.data);
  console.log(action.data.value.length);
  // console.log(action.data.value[0]);
  const newCurrentEmployeeState = {};
  Object.assign(newCurrentEmployeeState, state.currentEmployee);
  console.log(newCurrentEmployeeState);
  if (action.data.type === 'add') {
    let flag = true;
    action.data.field.forEach((element, index) => {
      const fieldArr = element.split('_');
      const step = fieldArr[0];
      const section = fieldArr[1];
      const subSection = fieldArr[2];
      const field = fieldArr[3];
      console.log(step);
      console.log(section);
      console.log(subSection);
      console.log(field);
      if (flag) {
        if (section === 'nationalIdInformation') {
          newCurrentEmployeeState[step][section].push({});
          flag = false;
        } else if (section === 'addressInformation' || section === 'workPermitInformation') {
          console.log(step);
          console.log(section);
          console.log(subSection);
          newCurrentEmployeeState[step][section][subSection].push({});
          flag = false;
        } else {
          console.log(step);
          console.log(section);
          console.log(subSection);
          newCurrentEmployeeState[step][section][subSection].push({});
          flag = false;
        }
      }
      if (section === 'nationalIdInformation') {
        const rowIndex = newCurrentEmployeeState[step][section].length;
        const addIndex = rowIndex - 1;
        console.log('KeyJobAttribute length is', typeof rowIndex);
        console.log('printing field array', step, section, addIndex, field);
        newCurrentEmployeeState[step][section][addIndex][subSection] = action.data.value[index];
        console.log('Value:', action.data.value);
        console.log('your new value updated', newCurrentEmployeeState[step][section][addIndex][field]);
      } else if (section === 'addressInformation' || section === 'workPermitInformation') {
        const rowIndex = newCurrentEmployeeState[step][section][subSection].length;
        const addIndex = rowIndex - 1;
        console.log('KeyJobAttribute length is', typeof rowIndex);
        console.log('printing field array', step, section, addIndex, field);
        newCurrentEmployeeState[step][section][subSection][addIndex][field] = action.data.value[index];
        console.log('Value:', action.data.value);
        console.log('your new value updated', newCurrentEmployeeState[step][section][subSection][addIndex][field]);
      } else {
        const rowIndex = newCurrentEmployeeState[step][section][subSection].length;
        const addIndex = rowIndex - 1;
        console.log('KeyJobAttribute length is', typeof rowIndex);
        console.log('printing field array', step, section, addIndex, field);
        newCurrentEmployeeState[step][section][subSection][addIndex][field] = action.data.value[index];
        console.log('Value:', action.data.value);
        console.log('your new value updated', newCurrentEmployeeState[step][section][subSection][addIndex][field]);
      }
    });
  } if (action.data.type === 'edit') {
    action.data.field.forEach((element, index) => {
      console.log(index);
      const fieldArr = element.split('_');
      const step = fieldArr[0];
      const section = fieldArr[1];
      const subSection = fieldArr[2];
      const field = fieldArr[3];
      console.log(step);
      console.log(section);
      console.log(subSection);
      console.log(field);
      if (subSection === 'personalInformation' || subSection === 'biographicalInformation') {
        console.log(action.data);
        newCurrentEmployeeState[step][section][subSection][field] = action.data.value[index];
      } else if (subSection === 'countrySpecificFields') {
        const country = field;
        const countryField = fieldArr[4];
        newCurrentEmployeeState[step][section][subSection][country][countryField] = action.data.value[index];
      } else if ((section === 'nationalIdInformation')) {
        newCurrentEmployeeState[step][section].reverse();
        newCurrentEmployeeState[step][section][action.data.id][subSection] = action.data.value[index];
        newCurrentEmployeeState[step][section].reverse();
        console.log('Value:', action.data.value);
        console.log('value after edit', newCurrentEmployeeState[step][section][subSection]);
      } else {
        console.log('printing field array', step, section, action.data.id, subSection);
        console.log(newCurrentEmployeeState[step][section][subSection]);
        newCurrentEmployeeState[step][section][subSection].reverse();
        newCurrentEmployeeState[step][section][subSection][action.data.id][field] = action.data.value[index];
        newCurrentEmployeeState[step][section][subSection].reverse();
        console.log(newCurrentEmployeeState[step][section][subSection]);
        console.log('Value:', action.data.value);
      }
    });
  }
  console.log(newCurrentEmployeeState);
  const newState = {};
  Object.assign(newState, state, { currentEmployee: newCurrentEmployeeState });
  return newState;
};

const getCurrentEmployeeBenefitsInfo = (state, action) => {
  console.log(action.type);
  // const newCurrentEmployeeState = {};
  // Object.assign(newCurrentEmployeeState, state.currentEmployee);
  // console.log(action.type);
  // newCurrentEmployeeState.benefits.inprocessClaims = ipClaims;
  // newCurrentEmployeeState.benefits.processedClaims = pClaims;
  // const newState = {};
  // Object.assign(newState, state, { currentEmployee: newCurrentEmployeeState });
  return state;
};
/*
const updateCurrentEmployeeBenefitsInfo = (state, action) => {
  console.log('UpdateBenefitsreducer123', action.type, action.data);
  const newCurrentEmployeeState = {};
  Object.assign(newCurrentEmployeeState, state.currentEmployee);
  let flag = true;

  action.data.field.forEach((element, index) => {
    const fieldArr = element.split('_');
    const step = fieldArr[0];
    const section = fieldArr[1];
    const subSection = fieldArr[2];
    const field = fieldArr[3];
    console.log('benefitsupdate1', index, element, fieldArr, step, section, subSection, field);
    if (action.data.type === 'add') {
      if (flag) {
        newCurrentEmployeeState[step][section][subSection].push({});
        flag = false;
      }
      const rowIndex = newCurrentEmployeeState[step][section][subSection].length;
      const addIndex = rowIndex - 1;
      console.log(`${newCurrentEmployeeState[step][section][subSection]} length is`, rowIndex);
      newCurrentEmployeeState[step][section][subSection][addIndex][field] = action.data.value[index];
    }
    if (action.data.type === 'edit') {
      console.log('editbenefits', index, field, action.data.value);
      newCurrentEmployeeState[step][section][subSection][action.data.id][field] = action.data.value[index];
    }
  });
  console.log('wehavetoseethecurre', newCurrentEmployeeState);
  const newState = {};
  Object.assign(newState, state, { currentEmployee: newCurrentEmployeeState });
  return state;
};
*/
const updateCurrentEmployeeBenefitsInfo = (state, action) => {
  console.log('UpdateBenefitsreducer123', action.type, action.data);
  const newCurrentEmployeeState = {};
  Object.assign(newCurrentEmployeeState, state.currentEmployee);
  if (action.data.type === 'add') {
    let flag = true;
    action.data.field.forEach((element, index) => {
      const fieldArr = element.split('_');
      const step = fieldArr[0];
      const section = fieldArr[1];
      const subSection = fieldArr[2];
      let field = fieldArr[3];
      console.log('benefitsupdate1', index, element, fieldArr, step, section, subSection, field);
      let rowIndex = {};
      let addIndex = {};
      //check for the section and add a row
      if (flag) {
        if (section === 'enrollments') {
          newCurrentEmployeeState[step][section].push({});
          flag = false;
        } else {
          newCurrentEmployeeState[step][section][subSection].push({});
          flag = false;
        }
        console.log('currentemployeeafter pushing row', newCurrentEmployeeState[step][section], section);
      }
      //check for sections and update the field value
      if (section === 'enrollments') {
        field = subSection;
        rowIndex = newCurrentEmployeeState[step][section].length;
        addIndex = rowIndex - 1;
        newCurrentEmployeeState[step][section][addIndex][field] = action.data.value[index];
        console.log('after change', section, field, newCurrentEmployeeState[step][section][addIndex][field]);
      } else {
        rowIndex = newCurrentEmployeeState[step][section][subSection].length;
        addIndex = rowIndex - 1;
        newCurrentEmployeeState[step][section][subSection][addIndex][field] = action.data.value[index];
      }
    });
  } else if (action.data.type === 'edit') {
    action.data.field.forEach((element, index) => {
      console.log('fieldname1', element);
      const fieldArr = element.split('_');
      const step = fieldArr[0];
      const section = fieldArr[1];
      const subSection = fieldArr[2];
      let field = fieldArr[3];
      console.log('benefitsupdateedit', index, element, fieldArr, step, section, subSection, field);
      if (section === BenefitsType.ENROLLMENTS_SECTION) { // Enrolments Section
        console.log('editbenefits', index, field, action.data.value);
        field = subSection;
        newCurrentEmployeeState[step][section][action.data.id][field] = action.data.value[index];
      } else { // All other Sections
        console.log('editbenefits', index, field, action.data.value);
        newCurrentEmployeeState[step][section][subSection][action.data.id][field] = action.data.value[index];
      }
    });
  }
  console.log('newcurrentEmployee.benefits', newCurrentEmployeeState.benefits);
  const newState = {};
  Object.assign(newState, state, { currentEmployee: newCurrentEmployeeState });
  return newState;
};
/*  Common Method to cancel the Benefits for cancelling the records
 */
const cancelCurrentEmployeeBenefitsInfo = (state, action) => {
  console.log('cancelCurrentEmployeeBenefitsInfo-reducer', action.data);
  const newCurrentEmployeeState = {};
  Object.assign(newCurrentEmployeeState, state.currentEmployee);
  const rowid = action.data.index;
  console.log('rowid12356', rowid);
  const fieldArr = action.data.subsection.split('_');
  const step = fieldArr[0];
  const section = fieldArr[1];
  const subSection = fieldArr[2];
  console.log('benefitsCancel123', fieldArr, step, section, subSection);

  if (section === 'enrollments') {
    console.log(Array.isArray(newCurrentEmployeeState[step][section]));
    newCurrentEmployeeState[step][section][rowid].status = 'Cancelled';
    newCurrentEmployeeState[step][section][rowid].requestedDate = new Date();
    newCurrentEmployeeState[step][section][rowid].actionDate = new Date();
  } else {
    console.log(Array.isArray(newCurrentEmployeeState[step][section][subSection]));
    newCurrentEmployeeState[step][section][subSection][rowid].status = 'Cancelled';
    newCurrentEmployeeState[step][section][subSection][rowid].requestedDate = new Date();
    newCurrentEmployeeState[step][section][subSection][rowid].actionDate = new Date();
  }

  console.log('currentEmployeeStateobj', newCurrentEmployeeState[step][section]);
  const newState = {};
  Object.assign(newState, state, { currentEmployee: newCurrentEmployeeState });
  return newState;
};

const approveBenefitsEnrollments = (state, action) => {
  console.log('In approval benefits', action);
  const newRecord = action.data.record;
  // newRecord.approvedBy = action.data.approvedBy;
  // newRecord.approvalDate = action.data.approvalDate;
  // calculating the no of rows to be inserted in the Claims
  // const startdate = newRow.startDate;
  // const enddate = newRow.endDate;
  // const freqquency = newRow.frequency
  console.log('newRecordaaaa', newRecord);
  return state;
};

const updateTimeOffData = (state, action) => {
  console.log(action.data);
  const newCurrentEmployeeState = Object.assign({}, state.currentEmployee);
  if (action.data.subSection === 'timeOffCalendar') {
    newCurrentEmployeeState.timeOff.timeOffOverview.myRequests.push(action.data.newData);
    newCurrentEmployeeState.timeOff.timeOffOverview.timeOffBalance[action.data.index].days -= action.data.daysCount;
  }
  const newState = {};
  Object.assign(newState, state, { currentEmployee: newCurrentEmployeeState });
  return newState;
};

const approveOrRejectTimeOff = (state, action) => {
  console.log(action.data.rowId, action.data.status);
  const newCurrentEmployeeState = Object.assign({}, state.currentEmployee);
  newCurrentEmployeeState.timeOff.timeOffOverview.myRequests.reverse();
  newCurrentEmployeeState.timeOff.timeOffOverview.myRequests[action.data.rowId].status = action.data.status;
  if (action.data.comments) {
    newCurrentEmployeeState.timeOff.timeOffOverview.myRequests[action.data.rowId].comments.push(action.data.comments);
  }
  newCurrentEmployeeState.timeOff.timeOffOverview.myRequests.reverse();
  const newState = Object.assign({}, state, { currentEmployee: newCurrentEmployeeState });
  return newState;
};

const updateTimeOffCommentsData = (state, action) => {
  console.log(action.data);
  const newCurrentEmployeeState = Object.assign({}, state.currentEmployee);
  console.log(newCurrentEmployeeState);
  newCurrentEmployeeState.timeOff.timeOffOverview.myRequests.reverse();
  newCurrentEmployeeState.timeOff.timeOffOverview.myRequests[action.data.rowId].comments.push(action.data.comments);
  newCurrentEmployeeState.timeOff.timeOffOverview.myRequests[action.data.rowId].status = action.data.status;
  newCurrentEmployeeState.timeOff.timeOffOverview.myRequests.reverse();
  const newState = Object.assign({}, state, { currentEmployee: newCurrentEmployeeState });
  return newState;
};
const setAllEmployee = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { myEmployees: action.data });
  return newState;
};
const setCurrentEmployeeNew = (state, action) => {
  const newState = {};
  const newCurrentEmployee = filter(state.myEmployees, ['personalInformation.biographicalInformation.biographicalInformation.employeeId', action.id]);
  Object.assign(newState, state, { currentEmployee: newCurrentEmployee });
  return newState;
};
const claimApprove = (state, action) => {
  const newMyEmployees = [];
  const myFilteredWorkers = state.myEmployees;
  for (let k = 0; k < myFilteredWorkers.length; k += 1) {
    const currentEmployee = myFilteredWorkers[k];
    const id = '_id';
    const indexMenu = findIndex(action.claimsInfo.result, ['empObjectId', currentEmployee[id]]);
    if (indexMenu > -1) {
      // inprocessClaims
      const claimInprocessInformationArray = myFilteredWorkers[k].benefits.claims.inprocessClaims;
      const claimProcessedInformationArray = myFilteredWorkers[k].benefits.claims.processedClaims;
      const newInprocessClaimInformation = [];
      for (let i = 0; i < claimInprocessInformationArray.length; i += 1) {
        const claimInformation = claimInprocessInformationArray[i];
        const indexSubMenu = findIndex(action.claimsInfo.result, ['claimObjectId', claimInformation[id]]);
        if (indexSubMenu > -1) {
          claimProcessedInformationArray.push(claimInformation);
        } else {
          newInprocessClaimInformation.push(claimInformation);
        }
      }
      currentEmployee.benefits.claims.inprocessClaims = newInprocessClaimInformation;
    }
    newMyEmployees.push(currentEmployee);
  }
  const newState = {};
  Object.assign(newState, state, { myEmployees: newMyEmployees });
  return newState;
};
const claimReject = (state, action) => {
  const newMyEmployees = [];
  const myFilteredWorkers = state.myEmployees;
  for (let k = 0; k < myFilteredWorkers.length; k += 1) {
    const currentEmployee = myFilteredWorkers[k];
    const id = '_id';
    const indexMenu = findIndex(action.claimsInfo.result, ['empObjectId', currentEmployee[id]]);
    if (indexMenu > -1) {
      // processedClaims
      const claimInprocessInformationArray = myFilteredWorkers[k].benefits.claims.inprocessClaims;
      const claimProcessedInformationArray = myFilteredWorkers[k].benefits.claims.processedClaims;
      const newProcessedClaimInformation = [];
      for (let i = 0; i < claimProcessedInformationArray.length; i += 1) {
        const claimInformation = claimProcessedInformationArray[i];
        const indexSubMenu = findIndex(action.claimsInfo.result, ['claimObjectId', claimInformation[id]]);
        if (indexSubMenu > -1) {
          claimInprocessInformationArray.push(claimInformation);
        } else {
          newProcessedClaimInformation.push(claimInformation);
        }
      }
      currentEmployee.benefits.claims.processedClaims = newProcessedClaimInformation;
    }
    newMyEmployees.push(currentEmployee);
  }
  const newState = {};
  Object.assign(newState, state, { myEmployees: newMyEmployees });
  return newState;
};
const skillApprove = (state, action) => {
  const newMyEmployees = [];
  const myFilteredWorkers = state.myEmployees;
  for (let k = 0; k < myFilteredWorkers.length; k += 1) {
    const currentEmployee = myFilteredWorkers[k];
    const id = '_id';
    const indexMenu = findIndex(action.skillsInfo.result, ['empObjectId', currentEmployee[id]]);
    if (indexMenu > -1) {
      const skillInformationArray = myFilteredWorkers[k].skillInformation;
      const newSkillInformationArray = [];
      for (let i = 0; i < skillInformationArray.length; i += 1) {
        const skillInformation = skillInformationArray[i];
        const indexSubMenu = findIndex(action.skillsInfo.result, ['skillObjectId', skillInformation[id]]);
        if (indexSubMenu > -1) {
          skillInformation.status = 'Approved';
        }
        newSkillInformationArray.push(skillInformation);
      }
      currentEmployee.skillInformation = newSkillInformationArray;
    }
    newMyEmployees.push(currentEmployee);
  }
  const newState = {};
  Object.assign(newState, state, { myEmployees: newMyEmployees });
  return newState;
};
const setSkills = (state, action) => {
  const newMyEmployees = [];
  const myFilteredWorkers = state.myEmployees;
  for (let k = 0; k < myFilteredWorkers.length; k += 1) {
    const currentEmployee = myFilteredWorkers[k];
    const id = '_id';
    if (action.skillsInfo.id === currentEmployee[id]) {
      const skillInformationArray = myFilteredWorkers[k].skillInformation;
      skillInformationArray.push(action.skillsInfo.skillInformation);
      currentEmployee.skillInformation = skillInformationArray;
    }
    newMyEmployees.push(currentEmployee);
  }
  const newState = {};
  Object.assign(newState, state, { myEmployees: newMyEmployees });
  return newState;
};
const enrollmentApprove = (state, action) => {
  console.log(state, 'state');
  const newMyEmployees = [];
  const myFilteredWorkers = state.myEmployees;
  for (let k = 0; k < myFilteredWorkers.length; k += 1) {
    const currentEmployee = myFilteredWorkers[k];
    const id = '_id';
    const indexMenu = findIndex(action.enrollmentInfo.result, ['empObjectId', currentEmployee[id]]);
    if (indexMenu > -1) {
      const enrollmentInformationArray = myFilteredWorkers[k].benefits.enrollments;
      const newEnrollmentInformationArray = [];
      for (let i = 0; i < enrollmentInformationArray.length; i += 1) {
        const enrollmentInformation = enrollmentInformationArray[i];
        const indexSubMenu = findIndex(action.enrollmentInfo.result, ['enrollmentObjectId', enrollmentInformation[id]]);
        if (indexSubMenu > -1) {
          enrollmentInformation.status = action.enrollmentInfo.result[indexSubMenu].status;
          enrollmentInformation.comment = action.enrollmentInfo.result[indexSubMenu].comment;
        }
        newEnrollmentInformationArray.push(enrollmentInformation);
      }
      currentEmployee.benefits.enrollments = newEnrollmentInformationArray;
    }
    newMyEmployees.push(currentEmployee);
  }
  const newState = {};
  Object.assign(newState, state, { myEmployees: newMyEmployees });
  return newState;
};
export default function reducer(state = DEFAULT_STATE, action) {
  console.log('IS IN REDUCER ');
  switch (action.type) {
    case EmployeeType.MODIFY_HIRE_DATE:
      return modifyHireDate(state, action);

    case EmployeeType.GET_CURRENT_EMPLOYEE:
      return getCurrentEmployee(state);

    case EmployeeType.UPDATE_COMPANY_DATA:
      return setCompanyData(state, action);

    case EmployeeType.UPDATE_EVENT_REASON_DATA:
      return setEventReasonData(state);

    case EmployeeType.MODIFY_DOB:
      return modifyDOB(state, action);

    case EmployeeType.UPDATE_COUNTRY_OF_BIRTH:
      return setCountryOfBirth(state);

    case EmployeeType.MODIFY_DATEOFDEATH:
      return modifyDateOfDeath(state, action);

    case EmployeeType.MODIFY_CERTIFICATE_START_DATE:
      return modifyCertificateStartDate(state, action);

    case EmployeeType.MODIFY_CERTIFICATE_END_DATE:
      return modifyCertificateEndDate(state, action);

    case EmployeeType.UPDATE_EMPLOYEE_DATA:
      return updateData(state, action);

    case EmployeeType.SET_NEW_EMPLOYEE:
      return setNewEmployee(state, action);

    case AddressType.UPDATE_ADDRESS_DATA:
      return updateAddressData(state, action);

    case AddressType.TOTAL_ADDRESS_IN_GRID_ONLOAD:
      return totalAddressInGridonLoad(state, action);

    case AddressType.ADDRESS_IN_GRID_EDITED:
      return addressInGridEdited(state, action);

    case AddressType.ADDED_NEW_ADDRESS:
      return addedNewAddress(state, action);

    case EmployeeType.SET_CURRENT_EMPLOYEE: {
      console.log('Set Emp Data', action.data);
      return setCurrentEmployee(state, action);
    }

    // case CurrentEmployeeType.UPDATE_JOB_INFO_DATA:
    //   return updateCurrentEmployeeData(state, action);

    case CurrentEmployeeType.UPDATE_COMPENSATION_DATA:
      return updateCurrentEmployeeData(state, action);
    // ssd
    case CurrentEmployeeType.UPDATE_JOB_INFO:
      return updateCurrentEmployeeJobInfo(state, action);
    case CurrentEmployeeType.UPDATE_PERSONAL_INFO_DATA:
      return updateCurrentEmployeePersonalInfo(state, action);
    case EmployeeType.CREATE_NEW_EMPLOYEE:
      return createNewEmployeeData(state, action);
    case EmployeeType.GET_LAST_EMPLOYEE_ID:
      return getLastEmployeeId(state, action);
    case EmployeeType.ADD_NATIONALID_DATA:
      return addNationalIdInformationData(state, action);
    case EmployeeType.LIST_MYEMPLOYEES:
      return getListOfMyEmployeesData(state, action);
    case EmployeeType.SEARCH_EMPLOYEE_ID:
      return searchEmployeeById(state, action);
    case EmployeeType.ADD_EMAILID_DATA:
      return addEmailIdInformationData(state, action);
    case EmployeeType.ADD_PHONE_INFO_DATA:
      return addPhoneInformationData(state, action);
    case EmployeeType.ADD_WORKPERMIT_INFO_DATA:
      return addWorkPermitInfoData(state, action);
    case EmployeeType.ADD_ADDRESS_INFO_DATA:
      return addAddressInfoData(state, action);
    case EmployeeType.MODIFY_EVENT_REASON:
      return modifyEventReason(state, action);
    case EmployeeType.ADD_FIELDS_FOR_ARRAY:
      return addFieldsForArrayType(state, action);
    case EmployeeType.GET_BENEFITS_DATA:
      return getCurrentEmployeeBenefitsInfo(state, action);
    case CurrentEmployeeType.UPDATE_BENEFITS_DATA:
      return updateCurrentEmployeeBenefitsInfo(state, action);
    case CurrentEmployeeType.CANCEL_CURRENT_BENEFITS_ALLOWANCE:
      return cancelCurrentEmployeeBenefitsInfo(state, action);
    case CurrentEmployeeType.APPROVE_BENEFITS_ENROLLMENT:
      return approveBenefitsEnrollments(state, action);
    case EmployeeType.EMPTY_NEW_EMPLOYEE:
      return emptyNewEmployee(state);
    case EmployeeType.TEMP_LIST_MYEMPLOYEES:
      return getListofMyTempEmployees(state, action);
    case EmployeeType.UPDATE_NEW_EMPLOYEE:
      return updateNewEmployee(state, action);
    case EmployeeType.GET_LAST_TEMP_EMPLOYEE_ID:
      return getLastTempEmployeeId(state, action);
    case CurrentEmployeeType.UPDATE_TIME_OFF:
      return updateTimeOffData(state, action);
    case CurrentEmployeeType.APPROVE_REJECT_TIME_OFF:
      return approveOrRejectTimeOff(state, action);
    case CurrentEmployeeType.UPDATE_TIME_OFF_COMMENTS: {
      return updateTimeOffCommentsData(state, action);
    }
    case EmployeeType.GET_ALL_EMPLOYEE:
      return setAllEmployee(state, action);
    case EmployeeType.GET_CURRENT_WORKER:
      return setCurrentEmployeeNew(state, action);
    case EmployeeType.CLAIM_APPROVE:
      return claimApprove(state, action);
    case EmployeeType.CLAIM_REJECT:
      return claimReject(state, action);
    case EmployeeType.SKILLS_APPROVE:
      return skillApprove(state, action);

    case EmployeeType.SKILLS_SAVE_DATA:
      return setSkills(state, action);

    case EmployeeType.ENROLLMENT_APPROVE:
      return enrollmentApprove(state, action);
    case EmployeeType.UPDATE_NEW_EMPLOYEE_COMPENSATION:
      return updateNewEmployeeCompensation(state, action);
    default:
      return state;
  }
}

import mongoose, { Schema } from 'mongoose'

const personalInformationSchema = new Schema({
  insertedBy: {
    type: String,
    required: false,
    trim: true
  },
  insertedDate: {
    type: Date,
    required: false,
    index: false
  },
  firstName: {
    type: String,
    default: '',
    required: true,
    index: false,
    trim: true
  },
  middleName: {
    type: String,
    default: '',
    required: false,
    index: false,
    trim: true
  },
  lastName: {
    type: String,
    default: '',
    required: false,
    index: false,
    trim: true
  },
  suffix: {
    type: String,
    default: '',
    required: false,
    index: false,
    trim: true
  },
  displayName: {
    type: String,
    default: '',
    required: false,
    index: false,
    trim: true
  },
  formalName: {
    type: String,
    default: '',
    required: false,
    index: false,
    trim: true
  },
  title: {
    type: String,
    default: '',
    required: false,
    index: false,
    trim: true
  },
  birthName: {
    type: String,
    default: '',
    required: false,
    index: false,
    trim: true
  },
  initials: {
    type: String,
    default: '',
    required: false,
    index: false,
    trim: true
  },
  prefix: {
    type: String,
    default: '',
    required: false,
    index: false,
    trim: true
  },
  gender: {
    type: String,
    default: 'm',
    required: false,
    index: false,
    trim: true,
    enum: ['m', 'f']
  },
  dob: {
    type: Date,
    required: false,
    index: false
  },
  countryOfBirth: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  dateOfDeath: {
    type: Date,
    required: false,
    index: false
  },
  maritalStatus: {
    type: String,
    required: false,
    index: false,
    min: 0,
    max: 3,
    default: 0
  },
  numberOfChildren: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  maritalStatusSinceDate: {
    type: Date,
    required: false,
    index: false
  },
  secondNationality: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  thirdNationality: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  preferredLanguage: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  challengeStatus: {
    type: String,
    required: false,
    index: false,
    trim: true
  }
});

const biographicalInformationSchema = new Schema({
    insertedBy: {
      type: String,
      required: false,
      trim: true
    },
    insertedDate: {
      type: Date,
      required: false,
      index: false
    },
    dob: {
      type: Date,
      required: false,
      index: false
    },
    countryOfBirth: {
      type: String,
      default: '',
      required: false,
      index: false,
      trim: true
    },
    regionOfBirth: {
      type: String,
      default: '',
      required: false,
      index: false,
      trim: true
    },
    dateOfDeath: {
      type: Date,
      required: false,
      index: false
    },
    employeeId: {
      type: String,
      default: '',
      required: false,
      index: false,
      trim: true
    },
    employeeGlobalId: {
      type: String,
      default: '',
      required: false,
      index: false,
      trim: true
    },
});

const countrySpecificFieldsSchema = new Schema({
  // us: {
    insertedBy: {
      type: String,
      required: false,
      trim: true
    },
    insertedDate: {
      type: Date,
      required: false,
      index: false
    },
    ethnicGroup: {
      type: String,
      required: false,
      index: false,
      trim: true
    },
    veteran: {
      type: String,
      required: false,
      index: false,
      trim: true
    },
    challengedVeteran: {
      type: String,
      required: false,
      index: false,
      trim: true
    }
  // }

});

const nationalIdInformationSchema = new Schema({
  insertedBy: {
    type: String,
    required: false,
    trim: true
  },
  insertedDate: {
    type: Date,
    required: false,
    index: false
  },
  country: {
    type: String,
    // required: false,
    index: false,
    trim: true
  },
  nationalIdCardType: {
    type: String,
    // required: false,
    index: false,
    trim: true
  },
  nationalId: {
    type: String,
    // required: false,
    index: false,
    trim: true
  },
  isPrimary: {
    type: String,
    // required: false,
    // default:'no',
    index: false,
    trim: true
  }
});

const addressInformationSchema = new Schema({
  insertedBy: {
    type: String,
    required: false,
    trim: true
  },
  insertedDate: {
    type: Date,
    required: false,
    index: false
  },
  addressType: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  country: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  line1: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  line2: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  city: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  state: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  zip: {
    type: String,
    required: false,
    index: false,
    trim: true
  }
}
);

const workPermitInformationSchema = new Schema({
  insertedBy: {
    type: String,
    required: false,
    trim: true
  },
  insertedDate: {
    type: Date,
    required: false,
    index: false
  },
  country: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  documentType: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  documentTitle: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  documentNumber: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  issueDate: {
    type: Date,
    required: false,
    index: false
  },
  issuePlace: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  issuingAuthority: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  expirationDate: {
    type: Date,
    required: false,
    index: false
  },
  validated: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  attachments: {
    type: String,
    required: false,
    index: false,
    trim: true
  }
}
);
const emailInformationSchema = new Schema({
    insertedBy: {
      type: String,
      required: false,
      trim: true
    },
    insertedDate: {
      type: Date,
      required: false,
      index: false
    },
    emailType: {
      type: String,
      required: false,
      index: false,
      trim: true
    },
    emailAddress: {
      type: String,
      required: false,
      index: false,
      trim: true
    },
    isPrimary: {
      type: String,
      required: false,
      default: 'no',
      index: false,
      trim: true
    }
  });
const phoneInformationSchema = new Schema({
    insertedBy: {
      type: String,
      required: false,
      trim: true
    },
    insertedDate: {
      type: Date,
      required: false,
      index: false
    },
    phoneType: {
      type: String,
      required: false,
      index: false,
      trim: true
    },
    number: {
      type: String,
      required: false,
      index: false,
      trim: true
    },
    extension: {
      type: String,
      required: false,
      index: false,
      trim: true
    },
    isPrimary: {
      type: String,
      required: false,
      default: 'no',
      index: false,
      trim: true
    }
  });

  const emergencyContactDetailsSchema = new Schema({
    firstName: {
      type: String,
      required: false,
      index: false,
      trim: true
    },
    lastName: {
      type: String,
      required: false,
      index: false,
      trim: true
    },
    phoneNumber: {
      type: String,
      required: false,
      index: false,
      trim: true
    },
    address: {
      type: String,
      required: false,
      index: false,
      trim: true
    },
    insertedBy: {
      type: String,
      required: false,
      trim: true
    },
    insertedDate: {
      type: Date,
      required: false,
      index: false
    }
  });
  
  const educationalInformationSchema = new Schema({
    degreeName: {
      type: String,
      required: false,
      index: false,
      trim: true
    },
    yearFrom: {
      type: String,
      required: false,
      index: false,
      trim: true
    },
    yearTo: {
      type: String,
      required: false,
      index: false,
      trim: true
    },
    percentage: {
      type: String,
      required: false,
      index: false,
      trim: true
    },
    insertedBy: {
      type: String,
      required: false,
      trim: true
    },
    insertedDate: {
      type: Date,
      required: false,
      index: false
    }
  });
  
  const  priorWorkExperienceDetailsSchema = new Schema({
    totalExperience: {
      type: String,
      required: false,
      index: false,
      trim: true
    },
    relevantWorkExperience: {
      type: String,
      required: false,
      index: false,
      trim: true
    },
    insertedBy: {
      type: String,
      required: false,
      trim: true
    },
    insertedDate: {
      type: Date,
      required: false,
      index: false
    }
  });

const keyJobAttributeSchema = new Schema({
  insertedBy: {
    type: String,
    required: false,
    trim: true
  },
  insertedDate: {
    type: Date,
    required: false,
    index: false
  },
  jobCode: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  position: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  operation: {
    type: String,
    required: false,
    trim: true,
    index: false
  }
});

const organizationalInformationSchema = new Schema({
  insertedBy: {
    type: String,
    required: false,
    trim: true
  },
  insertedDate: {
    type: Date,
    required: false,
    index: false
  },
  company: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  businessUnit: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  division: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  department: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  location: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  timeZone: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  costCenter: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  operation: {
    type: String,
    required: false,
    trim: true,
    index: false
  }
});

const jobInformationSchema = new Schema({
  insertedBy: {
    type: String,
    required: false,
    trim: true
  },
  insertedDate: {
    type: Date,
    required: false,
    index: false
  },
  employmentStatus: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  supervisor: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  jobClassification: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  jobTitle: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  localJobTitle: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  payGrade: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  regularOrTemporary: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  standardWeeklyHours: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  fte: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  operation: {
    type: String,
    required: false,
    trim: true,
    index: false
  }
});

const jobCountrySpecificFieldsSchema = new Schema({
  insertedBy: {
    type: String,
    required: false,
    trim: true
  },
  insertedDate: {
    type: Date,
    required: false,
    index: false
  },
  isFullTime: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  notes: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  employeeClass: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  flsaStatus: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  isShiftEmployee: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  shiftCode: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  shiftRate: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  shiftPercent: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  isCrossBorderWorker: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  eeoJobGroup: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  contractType: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  continuedSicknessPayPeriod: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  continuedSicknessPayMeasure: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  noticePeriod: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  initialEntry: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  entryIntoGroup: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  corporation: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  eeoCategory1: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  eeoCategory2: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  eeoCategory3: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  eeoCategory4: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  eeoCategory5: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  eeoCategory6: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  operation: {
    type: String,
    required: false,
    trim: true,
    index: false
  }
});

const jobRelationshipsSchema = new Schema({
  insertedBy: {
    type: String,
    required: false,
    trim: true
  },
  insertedDate: {
    type: Date,
    required: false,
    index: false
  },
  relationshipType: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  name: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  operation: {
    type: String,
    required: false,
    trim: true,
    index: false
  }
});

const timeInformationSchema = new Schema({
  insertedBy: {
    type: String,
    required: false,
    trim: true
  },
  insertedDate: {
    type: Date,
    required: false,
    index: false
  },
  holidayCalendar: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  workSchedule: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  timeProfile: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  operation: {
    type: String,
    required: false,
    trim: true,
    index: false
  }
});

const employmentDetailsSchema = new Schema({
  insertedBy: {
    type: String,
    required: false,
    trim: true
  },
  insertedDate: {
    type: Date,
    required: false,
    index: false
  },
  hireDate: {
    type: Date,
    required: false,
    index: false
  },
  originalStartDate: {
    type: Date,
    required: false,
    index: false
  },
  seniorityStartDate: {
    type: Date,
    required: false,
    index: false
  },
  serviceDate: {
    type: Date,
    required: false,
    index: false
  },
  professionalServiceDate: {
    type: Date,
    required: false,
    index: false
  },
  retireDate: {
    type: Date,
    required: false,
    index: false
  },
  operation: {
    type: String,
    required: false,
    trim: true,
    index: false
  }
});

const compensationGroupSchema = new Schema({
  insertedBy: {
    type: String,
    required: false,
    trim: true
  },
  insertedDate: {
    type: Date,
    required: false,
    index: false
  },
  operation: {
    type: String,
    required: false,
    index: false
  },
  payType: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  payGroup: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  isEligibleForBenefit: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  isEligibleForCar: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  benefitRate: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  compaRatio: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  rangePenetration: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  annualizedSalary: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  teo: {
    type: String,
    required: false,
    index: false,
    trim: true
  }
});

const compensationSchema = new Schema({
  insertedBy: {
    type: String,
    required: false,
    trim: true
  },
  insertedDate: {
    type: Date,
    required: false,
    index: false
  },
  operation: {
    type: String,
    required: false,
    index: false
  },
  payComponent: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  amount: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  currency: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  frequency: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  markPaymentIsEligibleForEmployee: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  markTaxDeductionAtSource: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  markContributionForEmployer: {
    type: String,
    required: false,
    index: false,
    trim: true
  }
});

const oneTimePaymentSchema = new Schema({
  insertedBy: {
    type: String,
    required: false,
    trim: true
  },
  insertedDate: {
    type: Date,
    required: false,
    index: false
  },
  operation: {
    type: String,
    required: false,
    index: false
  },
  payComponent: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  amount: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  currency: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  paymentDate: {
    type: Date,
    required: false,
    index: false
  }
});

const recurringPaymentSchema = new Schema({
  insertedBy: {
    type: String,
    required: false,
    trim: true
  },
  insertedDate: {
    type: Date,
    required: false,
    index: false
  },
  operation: {
    type: String,
    required: false,
    index: false
  },
  payComponent: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  amount: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  currency: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  startDate: {
    type: Date,
    required: false,
    index: false
  },
  endDate: {
    type: Date,
    required: false,
    index: false
  },
  markPaymentIsEligibleForEmployee: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  markTaxDeductionAtSource: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  markContributionForEmployer: {
    type: String,
    required: false,
    index: false,
    trim: true
  }
});

const entityInformationSchema = new Schema({
  insertedBy: {
    type: String,
    required: false,
    trim: true
  },
  insertedDate: {
    type: Date,
    required: false,
    index: false
  },
  owner: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  approver: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  status: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  customer: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  approval_date: {
    type: Date,
    required: false,
    index: false
  },
  employeeId: {
    type:String,
    required: false,
    index: false,
    trim: true,
  }
});

const identifySchema = new Schema({
  identify: {
    identify: {
      insertedBy: {
        type: String,
        required: false,
        trim: true
      },
      insertedDate: {
        type: Date,
        required: false,
        index: false
      },
      hireDate: {
        type: Date,
        required: false,
        index: false
      },
      company: {
        type: String,
        required: false,
        index: false,
        trim: true
      },
      eventReason: {
        type: String,
        required: false,
        index: false,
        trim: true
      }
    }
  }
});

const companyInfoSchema = new Schema({
  insertedBy: {
    type: String,
    required: false,
    trim: true
  },
  insertedDate: {
    type: Date,
    required: false,
    index: false
  },
  companyName: {
    type: String,
    required: false
  },
  countryName: {
    type: String,
    required: false
  },
  cityName: {
    type: String,
    required: false
  },
  stateName: {
    type: String,
    required: false
  },
  zipCode: {
    type: String,
    required: false
  },
  addressLine1: {
    type: String,
    required: false
  },
  addressLine2: {
    type: String,
    required: false
  },
  numberOfEmployees: {
    type: String,
    required: false
  }
});

const currentBenefitsSchema = new Schema({
  insertedBy: {
    type: String,
    required: false,
    trim: true
  },
  insertedDate: {
    type: Date,
    required: false,
    index: false
  },
  operation: {
    type: String,
    required: false,
    index: false
  },
  allowanceType: {
    type: String,
    required: false
  },
  amount: {
    type: String,
    required: false,
    index: false,
    trim: false 
  },
  currency: {
    type: String,
    required: false
  },
  frequency: {
    type: String,
    required: false
  },
  startDate: {
    type: Date,
    required: false
  },
  endDate: {
    type: Date,
    required: false
  },
  lastUpdatedDate: {
    type: Date,
    required: false
  },
   requestedDate: {
    type: Date,
    required: false
  },
  actionDate: {
    type: Date,
    required: false
  },
  status: {
    type: String,
    required: false
  }
});

const enrollmentsSchema = new Schema({
  insertedBy: {
    type: String,
    required: false,
    trim: true
  },
  insertedDate: {
    type: Date,
    required: false,
    index: false
  },
  operation: {
    type: String,
    required: false,
    index: false
  },
  enrollmentType: {
    type: String,
    required: false
  },
  amount: {
    type: String,
    required: false,
    index: false,
  },
  currency: {
    type: String,
    required: false
  },
  frequency: {
    type: String,
    required: false
  },
  startDate: {
    type: String,
    required: false
  },
  endDate: {
    type: String,
    required: false
  },
  lastUpdatedDate: {
    type: Date,
    required: false
  },
   requestedDate: {
    type: Date,
    required: false
  },
  actionDate: {
    type: Date,
    required: false
  },
  status: {
    type: String,
    required: false
  }
});

const inprocessClaimsSchema = new Schema({
  insertedBy: {
    type: String,
    required: false,
    trim: true
  },
  insertedDate: {
    type: Date,
    required: false,
    index: false
  },
  operation: {
    type: String,
    required: false,
    index: false
  },
  claimType: {
    type: String,
    required: false
  },
  amount: {
    type: String,
    required: false,
    index: false,
  },
  currency: {
    type: String,
    required: false
  },
  frequency: {
    type: String,
    required: false
  },
  requestedDate: {
    type: Date,
    required: false
  },
  status: {
    type: String,
    required: false
  }
});

const createdBySchema = new Schema({
  createdBy: {
    type: String,
    required: false,
    trim: true
  }
});

const publicHolidaysSchema = new Schema({
  insertedBy: {
    type: String,
    required: false,
    trim: true
  },
  insertedDate: {
    type: Date,
    required: false,
    index: false
  },
  company: {
    type: String,
    default: '',
    required: false,
    index: false,
    trim: true
  },
  country: {
    type: String,
    default: '',
    required: false,
    index: false,
    trim: true
  },
  city: {
    type: String,
    default: '',
    required: false,
    index: false,
    trim: true
  },
  holidayDescription: {
    type: String,
    default: '',
    required: false,
    index: false,
    trim: true
  },
  date: {
    type: Date,
    default: '',
    required: false,
    index: false,
    trim: true
  },
  createdBy: {
    type: String,
    default: '',
    required: false,
    index: false,
    trim: true
  },
  createdDate: {
    type: Date,
    default: '',
    required: false,
    index: false,
    trim: true
  },
  approvedBy: {
    type: String,
    default: '',
    required: false,
    index: false,
    trim: true
  },
  approvedDate: {
    type: Date,
    default: '',
    required: false,
    index: false,
    trim: true
  }  
});

const individualGoalsSchema = new Schema({
  insertedBy: {
    type: String,
    required: false,
    trim: true
  },
  insertedDate: {
    type: Date,
    required: false,
    index: false
  },
  goalText: {
    type: String,
    default: '',
    required: true,
    index: false,
    trim: true
  },
  startDate: {
    type: Date,
    required: false,
    index: false
  },
  endDate: {
    type: Date,
    required: false,
    index: false
  },
  expectedOutcome: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  addedBy: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  weightage: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  performanceRating: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  comments: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  managerRating: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  managerComments: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  performanceYear: {
    type: String,
    default: '2017-2018',
    required: false,
    trim: true
  }
});

const knowledgeManagementSchema = new Schema({
  insertedBy: {
    type: String,
    required: false,
    trim: true
  },
  insertedDate: {
    type: Date,
    required: false,
    index: false
  },
  goalText: {
    type: String,
    default: '',
    required: true,
    index: false,
    trim: true
  },
  startDate: {
    type: Date,
    required: false,
    index: false
  },
  endDate: {
    type: Date,
    required: false,
    index: false
  },
  expectedOutcome: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  addedBy: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  weightage: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  performanceRating: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  comments: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  managerRating: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  managerComments: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  performanceYear: {
    type: String,
    default: '2017-2018',
    required: false,
    trim: true
  }
});

const employeeAuditSchema = new Schema({
  entityInformation: entityInformationSchema,
  identify: identifySchema,
  personalInformation: {
    biographicalInformation: {biographicalInformation: [biographicalInformationSchema]},
    personalInformation: { personalInformation: [personalInformationSchema], countrySpecificFields: { us: [countrySpecificFieldsSchema]} },
    nationalIdInformation: [nationalIdInformationSchema],
    addressInformation: { addressInformation: [addressInformationSchema] },
    workPermitInformation: { workPermitInformation: [workPermitInformationSchema] },
    contactInformation: { emailInformation: [emailInformationSchema], phoneInformation: [phoneInformationSchema]},
    emergencyContactDetails: { emergencyContactDetails: [emergencyContactDetailsSchema] },
    educationalInformation: { educationalInformation: [educationalInformationSchema] },
    priorWorkExperienceDetails: { priorWorkExperienceDetails: [priorWorkExperienceDetailsSchema] },
  },
  jobInformation: {
    employmentDetail: {
      keyJobAttribute: [keyJobAttributeSchema],
      organizationalInformation: [organizationalInformationSchema],
      jobInformation: [jobInformationSchema],
      timeInformation: [timeInformationSchema],
      countrySpecificFields: {us: [jobCountrySpecificFieldsSchema]}
    },
    jobRelationships: {
      globalFields: [jobRelationshipsSchema]
    },
    employmentDetails: {
      globalFields: [employmentDetailsSchema]
    }
  },
  compensationInformation: {
    compensationInformation: {
      compensationGroup: [compensationGroupSchema],
      compensation: [compensationSchema]
    },
    oneTimePayment: {
      oneTimePayment: [oneTimePaymentSchema]
    },
    recurringPayment: {
      recurringPayment: [recurringPaymentSchema]
    }
  },
  companyInformation: {
    addressInformation: {addressInformation: [addressInformationSchema]},
    companyInformation: [companyInfoSchema]
  },
  benefits: {
    currentBenefits: {
      allowance: [currentBenefitsSchema],
      psrPlans: [currentBenefitsSchema]
    },
    enrollments: [enrollmentsSchema],
    claims: {
      inprocessClaims: [inprocessClaimsSchema]
    }
  },
  publicHolidays: [publicHolidaysSchema],
  goalSettingScreen: { individualGoals: [individualGoalsSchema], knowledgeManagement: [knowledgeManagementSchema] },
  createdBy: createdBySchema
},
  {
    timestamps: true
  })

employeeAuditSchema.methods = {
  view(full) {
    const fullView = {
      // simple view
      id: this.id,
      createdAt: this.createdAt,
      entityInformation: this.entityInformation,
      identify: this.identify,
      personalInformation: this.personalInformation,
      jobInformation: this.jobInformation,
      compensationInformation: this.compensationInformation,
      companyInformation: this.companyInformation,
      benefits: this.benefits,
      publicHolidays: this.publicHolidays,
      goalSettingScreen: this.goalSettingScreen,
      createdBy: this.createdBy
    }

    const partialView = {
      // simple view
      id: this.id,
      createdAt: this.createdAt,
      createdBy: this.createdBy
    }

    return full ? {
      ...fullView
      // add properties for a full view
    } : { ...partialView }
  }
}

const model = mongoose.model('Audit', employeeAuditSchema)

export const schema = model.schema
export default model

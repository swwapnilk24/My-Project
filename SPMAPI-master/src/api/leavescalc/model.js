import mongoose, { Schema } from 'mongoose'

const biographicalInformationSchema = new Schema({
    biographicalInformation: {
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
    }
  });

  const personalInformationSchema = new Schema({
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
    maritalStatusSinceDate: {
      type: Date,
      required: false,
      index: false
    },
    numberOfChildren: {
      type: String,
      required: false,
      index: false,
      trim: true
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

const myRequestsSchema = new Schema({
    name: {
      type: String,
      required: false,
      index: false,
      trim: true
    },
    timeOffType: {
      type: String,
      required: false,
      index: false,
      trim: true
    },
    fullOrHalf: {
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
    comments: [
      {
        comment: {
          type: String,
          required: false,
          index: false,
          trim: true
        },
        role: {
          type: String,
          required: false,
          index: false,
          trim: true
        },
        insertedDate: {
          type: Date,
          required: false,
          index: false
        }
      }
    ],
    status: {
      type: String,
      required: false,
      index: false,
      trim: true
    }
  });

const timeOffBalance = new Schema({
  timeOffType: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  days: {
    type: Number,
    required: false
  }
});
  const viewLeaveSchema = new Schema({
    personalInformation: {
      biographicalInformation: biographicalInformationSchema,
      personalInformation: { personalInformation: personalInformationSchema }
    },
    timeOff: {
        timeOffOverview: {
          myRequests: [myRequestsSchema],
          timeOffBalance: [timeOffBalance]
        }
    }
})

viewLeaveSchema.methods = {
    view (full) {
      const view = {
        // simple view
        personalInformation: this.personalInformation,
        timeOff: this.timeOff
        // id: this.id,
        // issueType: this.issueType,
        // requestDate: this.requestDate,
        // subject: this.subject,
        // issueDesc: this.issueDesc,
        // filePath: this.filePath,
        // notification: this.notification,
        // status: this.status,
        // approvalDate: this.approvalDate,
        // approvedBy: this.approvedBy,
        // createdBy: this.createdBy,
        // comments: this.comments,
        // createdAt: this.createdAt,
        // updatedAt: this.updatedAt
      }  
      return full ? {
        ...view
        // add properties for a full view
      } : view
    }
  }

const model = mongoose.model('vw_employe', viewLeaveSchema)

export const schema = model.schema
export default model
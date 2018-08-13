import mongoose, { Schema } from 'mongoose'

const profileSummarySchema = new Schema({
  resumeTitle: {
    type: String,
    index: false,
    trim: true,
    required: false,
    default: ""
  },
  displayName: {
    type: String,
    index: false,
    trim: true,
    required: false,
    default: ""
  },
  firstName: {
    type: String,
    index: false,
    trim: true,
    required: false,
    default: ""
  },
  lastName: {
    type: String,
    index: false,
    trim: true,
    required: false,
    default: ""
  },
  dob: {
    type: Date,
    index: false,
    trim: true,
    required: false,
    default: ""
  },
  gender: {
    type: String,
    index: false,
    trim: true,
    required: false,
    default: ""
  },
  maritalStatus: {
    type: String,
    index: false,
    trim: true,
    required: false,
    default: ""
  },
  profileType: {
    type: String,
    index: false,
    trim: true,
    required: false,
    default: ""
  },
  experienceYears: {
    type: String,
    index: false,
    trim: true,
    required: false,
    default: ""
  },
  experienceMonths: {
    type: String,
    index: false,
    trim: true,
    required: false,
    default: ""
  },
  currency: {
    type: String,
    index: false,
    trim: true,
    required: false,
    default: ""
  },
  ctc: {
    type: String,
    index: false,
    trim: true,
    required: false,
    default: ""
  },
  videoLink: {
    type: String,
    index: false,
    trim: true,
    required: false,
    default: ""
  },
  linkedIn: {
    type: String,
    index: false,
    trim: true,
    required: false,
    default: ""
  },
  whatsappNumber: {
    type: String,
    index: false,
    trim: true,
    required: false,
    default: ""
  },
  keepConfidential: {
    type: String,
    index: false,
    trim: true,
    required: false,
    default: ""
  },
  currentLocation: {
    type: String,
    index: false,
    trim: true,
    required: false,
    default: ""
  },
  currentIndustry: {
    type: String,
    index: false,
    trim: true,
    required: false,
    default: ""
  },
  profileSummary: {
    type: String,
    index: false,
    trim: true,
    required: false,
    default: ""
  }
},{
  timestamps: true
});

const contactsSchema = new Schema({
  country: {
    type: String,
    index: false,
    trim: true,
    required: false,
    default: ""
  },
  state: {
    type: String,
    index: false,
    trim: true,
    required: false,
    default: ""
  },
  city: {
    type: String,
    index: false,
    trim: true,
    required: false,
    default: ""
  },
  zip: {
    type: String,
    index: false,
    trim: true,
    required: false,
    default: ""
  },
  Email: {
    type: String,
    index: false,
    trim: true,
    required: false,
    default: ""
  },
  contacts: {
    type: String,
    index: false,
    trim: true,
    required: false,
    default: ""
  },
  currentAddress: {
    type: String,
    index: false,
    trim: true,
    required: false,
    default: ""
  }
},{
  timestamps: true
});

const educationalSchema = new Schema({
  qualification: {
    type: String,
    index: false,
    trim: true,
    required: false,
    default: ""
  },
  college: {
    type: String,
    index: false,
    trim: true,
    required: false,
    default: ""
  },
  year: {
    type: Date,
    index: false,
    trim: true,
    required: false,
    default: null
  },
  university: {
    type: String,
    index: false,
    trim: true,
    required: false,
    default: ""
  },
  percentage: {
    type: String,
    index: false,
    trim: true,
    required: false,
    default: ""
  },
  qualificationDetails: {
    type: String,
    index: false,
    trim: true,
    required: false,
    default: ""
  }
},{
  timestamps: true
});
const entityInformationSchema = new Schema({
  employeeId: {
    type: String,
    index: false,
    trim: true
  }
});
const resumeBuilderSchema = new Schema({
  entityInformation: entityInformationSchema,
  profileSummary:  profileSummarySchema ,
  contacts:  contactsSchema ,
  educational: [educationalSchema] 
});


resumeBuilderSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      profileSummary: this.profileSummary,
      contacts: this.contacts,
      educational: this.educational,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('resumeBuilder', resumeBuilderSchema)
 
export const schema = model.schema;
export default model;

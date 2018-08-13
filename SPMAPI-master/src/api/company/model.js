import mongoose, { Schema } from 'mongoose'

const companySchema = new Schema({
  companyName: {
    type: String,
    index: true,
    trim: true,
    default: ''
  },
  country: {
    type: String,
    index: true,
    trim: true,
    default: ''
  },
  state: {
    type: String,
    index: true,
    trim: true,
    default: ''
  },
  city: {
    type: String,
    index: true,
    trim: true,
    default: ''
  },
  addressLine1: {
    type: String,
    index: true,
    trim: true,
    default: ''
  },
  addressLine2: {
    type: String,
    index: true,
    trim: true,
    default: ''
  },
  zip: {
    type: String,
    index: true,
    trim: true,
    default: ''
  },
  numberOfEmployees: {
    type: String,
    index: true,
    trim: true,
    default: ''
  },
  phoneNumber: {
    type: String,
    index: true,
    trim: true,
    default: ''
  },
  faxNumber: {
    type: String,
    index: true,
    trim: true,
    default: ''
  },
  mailId: {
    type: String,
    index: true,
    trim: true,
    default: ''
  },
  website: {
    type: String,
    index: true,
    trim: true,
    default: ''
  },
  companyCode: {
    type: Number,
    required: false,
    index: true
  }
}, {
  timestamps: true
});

const CompanyInformationSchema = new Schema({
  corporateAddress: companySchema,
  branches: [companySchema],
  registeredEmail: {
    type: String,
    required: true,
    index: true
  }
  // isActive: {
  //   type: Boolean,
  //   default: false
  // }
});
CompanyInformationSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      companyName: this.companyName,
      country: this.country,
      state: this.state,
      city: this.city,
      addressLine1: this.addressLine1,
      addressLine2: this.addressLine2,
      zip: this.zip,
      numberOfEmployees: this.numberOfEmployees,
      phoneNumber: this.phoneNumber,
      faxNumber: this.faxNumber,
      mailId: this.mailId,
      website: this.website,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Company', CompanyInformationSchema)

export const schema = model.schema
export default model

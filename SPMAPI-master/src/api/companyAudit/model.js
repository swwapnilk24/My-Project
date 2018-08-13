import mongoose, { Schema } from 'mongoose'

const companySchema = new Schema({
  companyName: {
    type: String,
    index: true,
    trim: true
  },
  country: {
    type: String,
    index: true,
    trim: true
  },
  state: {
    type: String,
    index: true,
    trim: true
  },
  city: {
    type: String,
    index: true,
    trim: true
  },
  addressLine1: {
    type: String,
    index: true,
    trim: true
  },
  addressLine2: {
    type: String,
    index: true,
    trim: true
  },
  zip: {
    type: String,
    index: true,
    trim: true
  },
  numberOfEmployees: {
    type: String,
    index: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    index: true,
    trim: true
  },
  faxNumber: {
    type: String,
    index: true,
    trim: true
  },
  mailId: {
    type: String,
    index: true,
    trim: true
  },
  website: {
    type: String,
    index: true,
    trim: true
  },
  insertedDate: {
    type: Date,
    index: true,
    trim: true
  },
  insertedBy: {
    type: String,
    index: true,
    trim: true
  },
    operationType:{
      type: String,
      index: true,
      trim: true
    }
}, {
  timestamps: true
});

const CompanyInformationSchema = new Schema({
  corporateAddress: [companySchema],
  branches: [companySchema]
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

const model = mongoose.model('CompanyAudit', CompanyInformationSchema)

export const schema = model.schema
export default model

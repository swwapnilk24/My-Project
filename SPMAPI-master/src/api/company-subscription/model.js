import mongoose, { Schema } from 'mongoose';

const companySubscription = new Schema({
  // companyCode: {
  //   type: Number,
  //   required: true,
  //   index: true
  // },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
  },
  startDate: {
    type: Date,
    // required: true,
    // default: Date.now
  },
  endDate: {
    type: Date,
    // required: true,
    // default: Date.now
  },
  isActive: {
    type: Boolean,
    default: false
  }
}, {
    timestamps: true
});

companySubscription.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      companyCode: this.companyCode,
      startDate: this.startDate,
      endDate: this.endDate,
      isActive: this.isActive
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('CompanySubscription', companySubscription)

export const schema = model.schema
export default model

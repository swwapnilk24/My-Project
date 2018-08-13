import mongoose, { Schema } from 'mongoose'

const companyCounter = new Schema({
  companyId: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
  },
  companyName: {
     type: String,
     required: true
  },
  nextCounterValue: {
      type: Number,
      required: true
  }
});

const model = mongoose.model('CompanyCounter', companyCounter);

export const schema = model.schema;

export default model;

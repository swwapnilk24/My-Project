import mongoose, { Schema } from 'mongoose'
const AutoIncSchema = new Schema({
  employeeObjId: {
    type: String,
    required: true
  },
  employeeId: {
     type: String,
     required: false
  },
  nextCounterValue: {
      type: Number,
      required: true
  }
});
const model = mongoose.model('AutoIncTempEmp', AutoIncSchema);
export const schema = model.schema
export default model;
import mongoose, { Schema } from 'mongoose'
// import budgetplan from '../budgetplan/model'

const actualSpentSchema = new Schema({
    actualspent: {
        type: String
    },
    budgetallocated: {  type: String },
    countryname: {  type: String },
    divisionname: {  type: String }
  }, {
      timestamps: true
});

actualSpentSchema.methods = {
    view (full) {
        const view = {
          // simple view
          actualSpent: this.actualspent,
          budgetAllocated: this.budgetallocated,
          countryName: this.countryname,
          divisionName: this.divisionname,
          createdAt: this.createdAt,
          updatedAt: this.updatedAt
        }
    
        return full ? {
          ...view
          // add properties for a full view
        } : view
      }
}
const model = mongoose.model('actualspent', actualSpentSchema)

export const schema = model.schema
export default model
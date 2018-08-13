import mongoose, { Schema } from 'mongoose'

const employeeBandSchema = new Schema({
  bandname: {
      type: String
  },
  bandcode: {
      type: String
  }
}, {
    timestamps: true
});

employeeBandSchema.methods = {
    view (full) {
        const view = {
          // simple view
          id: this.id,
          bandName: this.bandname,
          bandCode: this.bandcode,
          createdAt: this.createdAt,
          updatedAt: this.updatedAt
        }
    
        return full ? {
          ...view
          // add properties for a full view
        } : view
      }
}
const model = mongoose.model('Employeeband', employeeBandSchema)

export const schema = model.schema
export default model
import mongoose, { Schema } from 'mongoose'

const employeeSchema = new Schema({
  name: {
      type: String
  },
  jobtitle: {
      type: String
  },
  profile_picture: {
      type: String
  },
  band: { 
    type: Object 
  }
}, {
    timestamps: true
});

employeeSchema.methods = {
    view (full) {
        const view = {
          // simple view
          id: this.id,
          name: this.name,
          jobtitle: this.jobtitle,
          profile_picture: this.profile_picture,
          band: this.band
        }
    
        return full ? {
          ...view
          // add properties for a full view
        } : view
      }
}
const model = mongoose.model('employee', employeeSchema)

export const schema = model.schema
export default model
import mongoose, { Schema } from 'mongoose'

const swizzdeductionsSchema = new Schema({
  name: {
    type: String
  },
  empCont: {
    type: String
  },
  employerCont: {
    type: String
  },
  code: {
    type: String
  },
  mandatory: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

swizzdeductionsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      empCont: this.empCont,
      employerCont: this.employerCont,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Swizzdeductions', swizzdeductionsSchema)

export const schema = model.schema
export default model

import mongoose, { Schema } from 'mongoose'

const swisscontonsSchema = new Schema({
  name: {
    type: String
  },
  code: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

swisscontonsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      code: this.code,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Swisscontons', swisscontonsSchema)

export const schema = model.schema
export default model

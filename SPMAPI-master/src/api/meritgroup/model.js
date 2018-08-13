import mongoose, { Schema } from 'mongoose'

const meritgroupSchema = new Schema({
  name: {
    type: String
  },
  min: {
    type: Number
  },
  max: {
    type: Number
  }
}, {
  timestamps: true
})

meritgroupSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      min: this.min,
      max: this.max,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Meritgroup', meritgroupSchema)

export const schema = model.schema
export default model

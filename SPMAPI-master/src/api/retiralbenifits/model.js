import mongoose, { Schema } from 'mongoose'

const retiralbenifitsSchema = new Schema({
  name: {
    type: String
  },
  country: {
    type: String
  },
  company: {
    type: String
  },
  position: {
    type: String
  },
  region: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

retiralbenifitsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      country: this.country,
      company: this.company,
      region: this.region,
      position: this.position,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Retiralbenifits', retiralbenifitsSchema)

export const schema = model.schema
export default model

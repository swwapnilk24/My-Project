import mongoose, { Schema } from 'mongoose'

const divisionsSchema = new Schema({
    name: {
        type: String,
    },
    cColor: {
      type: String
    },
    wColor: {
      type: String
    }
}, {
    timestamps: true
});

divisionsSchema.methods = {
    view (full) {
      const view = {
        // simple view
        id: this.id,
        name: this.name,
        cColor: this.cColor,
        wColor: this.wColor,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
      }
  
      return full ? {
        ...view
        // add properties for a full view
      } : view
    }
  }

const model = mongoose.model('Divisions', divisionsSchema)

export const schema = model.schema
export default model
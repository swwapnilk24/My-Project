import mongoose, { Schema } from 'mongoose'

const countriesSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    code: {
        type: String,
        required: false,
    }
}, {
    timestamps: true
});

countriesSchema.methods = {
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

const model = mongoose.model('Countries', countriesSchema)

export const schema = model.schema
export default model
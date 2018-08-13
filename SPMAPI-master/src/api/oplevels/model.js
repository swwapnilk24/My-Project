import mongoose, { Schema } from 'mongoose'

const oplevelsSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    division: {
        type: String,
        required: false,
    }
}, {
    timestamps: true
});

oplevelsSchema.methods = {
    view (full) {
      const view = {
        // simple view
        id: this.id,
        name: this.name,
        division: this.division,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
      }
  
      return full ? {
        ...view
        // add properties for a full view
      } : view
    }
  }

const model = mongoose.model('Oplevels', oplevelsSchema)

export const schema = model.schema
export default model
import mongoose, { Schema } from 'mongoose'

const meritGuideLinesSchema = new Schema({
    band: {
        type: String,
        required: false
    },
    min: {
        type: Number,
        required: false,
    },
    mid: {
      type: Number,
      required: false,
    },
    max: {
      type: Number,
      required: false,
    },
    performance_year: {
      type: String,
      required: false,
    } 
}, {
    timestamps: true
});

meritGuideLinesSchema.methods = {
    view (full) {
      const view = {
        // simple view
        id: this.id,
        band: this.band,
        min: this.min,
        mid: this.mid,
        max: this.max,
        performance_year: this.performance_year,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
      }
  
      return full ? {
        ...view
        // add properties for a full view
      } : view
    }
  }

const model = mongoose.model('Meritguidelines', meritGuideLinesSchema)

export const schema = model.schema
export default model
import mongoose, { Schema } from 'mongoose'

const bandsapplicableplansSchema = new Schema({
    plan: {
        type: Object,
        required: false,
    },
    band: {
        type: Object,
        required: false,
    },
    performance_year: {
        type: String,
        required: false,
    }
}, {
    timestamps: true
});

bandsapplicableplansSchema.methods = {
    view (full) {
        const view = {
          // simple view
          plan: this.plan,
          band: this.band,
          performance_year: this.performance_year
        }
    
        return full ? {
          ...view
          // add properties for a full view
        } : view
      }
  }

const model = mongoose.model('bands_applicable_plan', bandsapplicableplansSchema)

export const schema = model.schema
export default model
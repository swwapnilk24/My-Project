import mongoose, { Schema } from 'mongoose'

const bandsandplansSchema = new Schema({
    plan: [
        {
            id: String,
            name: String,
            description: String
        }
    ],
    band: {
        type: String,
        required: false,
    },
    performance_year: {
        type: String,
        required: false,
    }
}, {
    timestamps: true
});

bandsandplansSchema.methods = {
    view (full) {
        const view = {
          // simple view
          bandsandplansId: this.id,
          plan: this.plan,
          bandId: this.band,
          performanceYear: this.performance_year
        }
    
        return full ? {
          ...view
          // add properties for a full view
        } : view
      }
  }

const model = mongoose.model('Bandsandplan', bandsandplansSchema)

export const schema = model.schema
export default model
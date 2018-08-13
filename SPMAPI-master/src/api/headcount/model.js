import mongoose, { Schema } from 'mongoose'

const headcountSchema = new Schema({
    country: {
        type: String,
        required: false
    },
    division: {
        type: String,
        required: false,
    },
    merit_hc: {
      type: Number,
      required: false,
    },
    sti_hc: {
      type: Number,
      required: false,
    },
    lti_hc: {
      type: Number,
      required: false,
    } 
}, {
    timestamps: true
});

headcountSchema.methods = {
    view (full) {
      const view = {
        // simple view
        id: this.id,
        country: this.country,
        division: this.division,
        merit_hc: this.merit_hc,
        sti_hc: this.sti_hc,
        lti_hc: this.lti_hc,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
      }
  
      return full ? {
        ...view
        // add properties for a full view
      } : view
    }
  }

const model = mongoose.model('Countrydivisionheadcount', headcountSchema)

export const schema = model.schema
export default model
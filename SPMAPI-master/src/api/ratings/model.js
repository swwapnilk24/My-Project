import mongoose, { Schema } from 'mongoose'

const ratingsSchema = new Schema({
    objective: {
      type: Number
    }, 
    behaviour: {
      type: Number
    }, 
    min: {
      type: Number
    }, 
    mid: {
      type: Number
    }, 
    max: {
      type: Number
    }
}, {
    timestamps: true
});

ratingsSchema.methods = {
    view (full) {
      const view = {
        // simple view
        objective: this.objective,
        behaviour: this.behaviour,
        min: this.min,
        mid: this.mid,
        max: this.max
      }
  
      return full ? {
        ...view
        // add properties for a full view
      } : view
    }
  }

const model = mongoose.model('Ratings', ratingsSchema)

export const schema = model.schema
export default model
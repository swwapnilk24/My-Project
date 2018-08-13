import mongoose, { Schema } from 'mongoose'

const targetPlansSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    vesting_period: {
      type: Number
    },
    special_plan: {
        type: Boolean
      }
}, {
    timestamps: true
});

targetPlansSchema.methods = {
    view (full) {
        const view = {
          // simple view
          id: this.id,
          name: this.name,
          description: this.description,
          vesting_period: this.vesting_period,
          special_plan: this.special_plan
        }
    
        return full ? {
          ...view
          // add properties for a full view
        } : view
      }
  }

const model = mongoose.model('TargetPlans', targetPlansSchema)

export const schema = model.schema
export default model
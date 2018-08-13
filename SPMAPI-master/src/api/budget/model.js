import mongoose, { Schema } from 'mongoose'

const budgetSchema = new Schema({
    country: {
        type: String,
        required: false
    },
    division: {
        type: String,
        required: false,
    },
    budget: {
      type: Number,
      required: false,
    },
    spent: {
      type: Number,
      required: false,
    } 
}, {
    timestamps: true
});

budgetSchema.methods = {
    view (full) {
      const view = {
        // simple view
        id: this.id,
        country: this.country,
        division: this.division,
        budget: this.budget,
        spent: this.spent,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
      }
  
      return full ? {
        ...view
        // add properties for a full view
      } : view
    }
  }

const model = mongoose.model('Budget', budgetSchema)

export const schema = model.schema
export default model
import mongoose, { Schema } from 'mongoose'

const employeeTargetsSchema = new Schema({
    employeeid: {
        type: Object,
    },
    plan: {
        type: Object,
    },
    vesting_year: {
      type: String
    },
    performance_year: {
      type: String
    },
    percentage: {
      type: String
    },
    abs: {
      type: String
    },
    currency: {
      type: String
    },
    amount: {
      type: String
    }
}, {
    timestamps: true
});

employeeTargetsSchema.methods = {
    view (full) {
      const view = {
        // simple view
        id: this.id,
        employeeid : this.employeeid,
        plan : this.plan,
        vesting_year : this.vesting_year,
        performance_year : this.performance_year,
        percentage : this.percentage,
        abs : this.abs,
        currency : this.currency,
        amount : this.amount,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
      }
  
      return full ? {
        ...view
        // add properties for a full view
      } : view
    }
  }

const model = mongoose.model('Employeetarget', employeeTargetsSchema)

export const schema = model.schema
export default model
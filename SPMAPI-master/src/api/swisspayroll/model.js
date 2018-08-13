import mongoose, { Schema } from 'mongoose'

const swisspayrollSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee'
  },
  branch: {
    type: String
  },
  payroll: [{
    employmentType: String,
    weeklyHours: Number,
    salarymonth: String,
    salaryYear: String,
    monthlySalary: Number,
    employerCost: Number,
    empTotal: Number,
    incomeTaxRate: Number,
    familyAllowance: {
      name: String,
      dependants: Number,
      rate: Number,
      amount: Number
    },
    status: {
      type: String,
      default: 'Pending',
      enum: ['Pending', 'Processed']
    },
    annualLeaves: {
      eligible: Number,
      consumed: Number
    },
    sickLeaves: {
      eligible: Number,
      consumed: Number
    },
    benefits: [
      {
        name: String,
        amount: Number
      }
    ],
    socialDeductions: [
      {
        name: String,
        empCont: String,
        employerCont: String,
        code: String,
        mandatory: Boolean
      }
    ],
    allowance: [
      {
        name: String,
        empBaseAmount: Number,
        rate: Number
      }
    ],
    otherDeductions: [
      {
        name: String,
        amount: Number
      }
    ]
  }]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

swisspayrollSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      company: this.company,
      employee: this.employee,
      branch: this.branch,
      payroll: this.payroll,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Swisspayroll', swisspayrollSchema)

export const schema = model.schema
export default model

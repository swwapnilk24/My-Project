import mongoose, { Schema } from 'mongoose'
import _ from 'lodash'

const compensationplanSchema = new Schema({
  employeeid: {
    type: String
  },
  employee: [
    {
      name: String,
      jobtitle: String,
      profile_picture: String,
      band: String,
      meritguidelines: [
        {
          min: Number,
          max: Number
        }
      ]
    }
  ],
  reviewrating: {
    type: String
  },
  prerating: {
    type: Number
  },
  objective: {
    type: Number
  },
  behaviour: {
    type: Number
  },
  currencycode: {
    type: String
  },
  currentsalary: {
    type: Number
  },
  increasedate: {
    type: Date
  },
  compratio: {
    type: Number
  },
  meritamount: {
    type: Number, default: 0
  },
  lumpsum: {
    type: Number
  },
  ltAmount: {
    type: Number, default: 0
  },
  adjustment: {
    type: Number
  },
  promotion: {
    type: Number
  },
  paygrade: {
    type: Number
  },
  performance_year: {
    type: String
  },
  sti: [
    {
      amount: Number,
      abs: Number,
      beginDate: Date,
      endDate: Date,
      caldays: Number,
      fte: Number,
      stitarget: Number,
      performance_year: String
    }
  ],
  target: [
    {
      abs: Number,
      amount: Number,
      plandetails: [
        {
          name: String,
          description: String
        }
      ],
      percentage: Number,
      performance_year: String,
      vesting_year: String
    }
  ],
  effectivedate: {
    type: Date
  },
  status:{
    type: String
  }
}, {
  timestamps: true
})

compensationplanSchema.methods = {
  view (full) {
    const finaltargetamount = _.sumBy(this.target, 'amount')
    const finalstiamount = _.sumBy(this.sti, 'amount')
    const finalAnSalary = this.meritamount + this.currentsalary;
    const finaltotalIncrease = this.meritamount + finalstiamount + finaltargetamount;
    const view = {
      // simple view
      id: this.id,
      employeeid: new mongoose.Types.ObjectId(this.employeeid),
      reviewRating: this.reviewrating,
      preRating: this.prerating,
      currencyCode: this.currencycode,
      currentSalary: this.currentsalary,
      increaseDate: this.increasedate,
      compRatio: this.compratio,
      meritAmount: this.meritamount,
      ltAmount: this.ltAmount,
      merit: this.merit,
      lumpsum: this.lumpsum,
      adjustment: this.adjustment,
      promotion: this.promotion,
      paygrade: this.paygrade,
      effectiveDate: this.effectivedate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      sti: this.sti,
      target: this.target,
      targetAmount: finaltargetamount,
      stiAmount: finalstiamount,
      finalAnnualSalary: finalAnSalary,
      totalIncrease: finaltotalIncrease,
      performance_year: this.performance_year,
      employee: this.employee,
      objective: this.objective,
      behaviour: this.behaviour,
      status: this.status
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Compensationplanning', compensationplanSchema)

export const schema = model.schema
export default model

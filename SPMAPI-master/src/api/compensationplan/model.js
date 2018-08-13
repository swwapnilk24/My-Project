import mongoose, { Schema } from 'mongoose'
import _ from 'lodash'

const compensationplanSchema = new Schema({
  ipf: {
    type: Number
  }, 
  bpf: {
    type: Number
  }, 
  cpf: {
    type: Number
  }, 
  meritamount: {
    type: Number
  }, 
  employeeid: {
    type: Object
  },
  objective: {
    type: Number
  },
  behaviour: {
    type: Number
  },
  reviewrating: {
    type: String
  },
  prerating: {
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
  status: {
    type: String
  },
  effectivedate: {
    type: Date
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
      employeeid: this.employeeid,
      ipf: this.ipf,
      bpf: this.bpf,
      cpf: this.cpf,
      reviewRating: this.reviewrating,
      preRating: this.prerating,
      currencyCode: this.currencycode,
      currentSalary: this.currentsalary,
      increaseDate: this.increasedate,
      compRatio: this.compratio,
      meritAmount: this.meritamount,
      ltAmount: this.ltAmount,
      merit: this.merit,
      objective: this.objective,
      behaviour: this.behaviour,
      lumpsum: this.lumpsum,
      adjustment: this.adjustment,
      promotion: this.promotion,
      paygrade: this.paygrade,
      effectiveDate: this.effectivedate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      status: this.status,
      // sti: this.sti,
      //target: this.target,
      targetAmount: finaltargetamount,
      stiAmount: finalstiamount,
      finalAnnualSalary: finalAnSalary,
      totalIncrease: finaltotalIncrease,
      performance_year: this.performance_year
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Compensationplan', compensationplanSchema)

export const schema = model.schema
export default model

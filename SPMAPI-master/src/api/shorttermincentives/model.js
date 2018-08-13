import mongoose, { Schema } from 'mongoose'
import dateformat from 'dateformat'

const stiSchema = new Schema({
  employeeid: {
      type: Object,
      required: false
  },
  amount: {
    type: Number,
    required: false
  },
  ipf: {
    type: Number,
    required: false
  },
  bpf: {
    type: Number,
    required: false
  },
  cpf: {
    type: Number,
    required: false
  },
  abs: {
    type: Number,
    required: false
  },
  beginDate: {
      type: Date,
      required: false,
  },
  endDate: {
    type: Date,
    required: false,
  },
  caldays: {
    type: Number
  },
  fte: {
    type: Number
  },
  stitarget: {
    type: Number
  },
  performance_year: {
    type: String
  }
}, {
    timestamps: true
});

stiSchema.methods = {
    view (full) {
      const view = {
        // simple view
        _id: this.id,
        employeeid: this.employeeid,
        amount: this.amount,
        ipf: this.ipf,
        bpf: this.bpf,
        cpf: this.cpf,
        abs: this.abs,
        beginDate: dateformat(this.beginDate, "dd-mm-yyyy"),
        endDate: dateformat(this.endDate, "dd-mm-yyyy"),
        caldays: this.caldays,
        fte: this.fte,
        performance_year: this.performance_year,
        stitarget: this.stitarget,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
      }
  
      return full ? {
        ...view
        // add properties for a full view
      } : view
    }
  }

const model = mongoose.model('Shorttermincentives', stiSchema)

export const schema = model.schema
export default model
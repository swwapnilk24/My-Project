import mongoose, { Schema } from 'mongoose'
import _ from 'lodash'

const orgchartSchema = new Schema({
  key: {
    type: String
  },
  name: {
    type: String
  },
  abs: {
    type: Number
  },
  target: {
    type: Number
  },
  budget: {
    type: Number
  },
  title: {
    type: String
  },
  parent: {
    type: String
  },
  parentName: {
    type: String
  },
  merit: {
    type: Number
  },
  ipf: {
    type: String
  },
  bpf: {
    type: String
  },
  cpf: {
    type: Number
  },
  performance: {
    type: Number
  }
}, {
  timestamps: true
})

orgchartSchema.methods = {
  view (full) {
    const view = {
      id: this.id,
      key: this.key,
      name: this.name,
      title: this.title,
      abs: this.abs,
      target: this.target,
      budget: this.budget,
      parent: this.parent,
      parentName: this.parentName,
      merit: this.merit,
      ipf: this.ipf,
      bpf: this.bpf,
      cpf: this.cpf,
      performance: this.performance,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('orgchart', orgchartSchema)

export const schema = model.schema
export default model

import mongoose, { Schema } from 'mongoose'
import _ from 'lodash'

const roleSchema = new Schema({
  role: {
    type: String,
    required: true
  },
  emailId: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  companyCode: {
    type: Number,
    required: true
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
  },
}, {
    timestamps: true
  })

roleSchema.methods = {
  view(full) {
    const fullView = {
      // simple view
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      role: this.role,
      emailId: this.emailId,
      password: this.password,
      confirmPassword: this.confirmPassword,
      firstName: this.firstName,
      lastName: this.lastName,
      company: this.company,
      companyCode: this.companyCode
    }

    const partialView = {
      // simple view
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...fullView
      // add properties for a full view
    } : { ...partialView }
  }
}

const model = mongoose.model('Role', roleSchema)

export const schema = model.schema
export default model

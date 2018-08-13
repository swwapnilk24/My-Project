import mongoose, { Schema } from 'mongoose'
import _ from 'lodash'

const registrationSchema = new Schema({
    userName: {
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
        type: String
    },
    lastName: {
        type: String
    },
    company: {
        type: String
    }
}, {
    timestamps: true
})

registrationSchema  .methods = {
    view (full) {
      const fullView = {
        // simple view
        id: this.id,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        userName: this.userName,
        emailId: this.emailId,
        password: this.password,
        confirmPassword: this.confirmPassword,
        firstName: this.firstName,
        lastName: this.lastName,
        company: this.company
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
      } : {...partialView}
    }
  }

  const model = mongoose.model('Registration', registrationSchema)
  export const schema = model.schema
  export default model
  
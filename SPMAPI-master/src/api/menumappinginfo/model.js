import mongoose, { Schema } from 'mongoose'

const menuMappingInfoSchema = new Schema({
  employeeId: {
    type: String,
    default: '',
    required: false,
    index: false,
    trim: true
  },
  employeeRole: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  roleId: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  screenName: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  screenId: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  createdDate: {
    type: Date,
    required: false,
    index: true
  }
}, {
  timestamps: true
})

menuMappingInfoSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      employeeId: this.employeeId,
      employeeRole: this.employeeRole,
      roleId: this.roleId,
      screenName: this.screenName,
      screenId: this.screenId,
      createdDate: this.createdDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('MenuMappingInfo', menuMappingInfoSchema)

export const schema = model.schema
export default model

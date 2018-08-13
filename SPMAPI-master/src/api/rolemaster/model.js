import mongoose, { Schema } from 'mongoose'

const roleMasterSchema = new Schema({
  roleName: {
    type: String,
    required: false,
    trim: true
  },
  roleCode: {
    type: String,
    required: false,
    trim: true
  }
}, {
  timestamps: true
})

roleMasterSchema.methods = {
  view (full) {
    const view = {
      // simple view
      _id: this.id,
      roleName: this.roleName,
      roleCode: this.roleCode,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('RoleMaster', roleMasterSchema)

export const schema = model.schema
export default model

import mongoose, { Schema } from 'mongoose'

const roleApprovalSchema = new Schema({
    empName: {
      type: String,
      required: false
    },
    empNumber: {
      type: String,
      required: false
    },
    roleName: {
      type: String,
      required: false
    },
    roleCode: {
      type: String,
      required: false
    },
    status: {
      type: String,
      required: false
    },
    comments: {
      type: String,
      required: false
    }
  });

  const rolesApprovalSchema = new Schema({
    roleApproval: [roleApprovalSchema]
  },
      {
    timestamps: true
  })

  rolesApprovalSchema.methods = {
    view (full) {
      const view = {
        // simple view
        _id: this.id,
        roleApproval: this.roleApproval,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
      }
  
      return full ? {
        ...view
        // add properties for a full view
      } : view
    }
  }
  
  const model = mongoose.model('RoleApproval', rolesApprovalSchema)
  
  export const schema = model.schema
  export default model
import mongoose, { Schema } from 'mongoose'

const orgHierarchySchema = new Schema({
    employeeid: {
        type: Object
    },cpm_manager: {
        type: Object
    },operational_manager: {
        type: Object
    }
},{
    timestamps: true
});

orgHierarchySchema.methods = {
    view (full) {
        const view = {
          // simple view
          id: this.id,
          employeeid: this.employeeid,
          cpm_manager: this.cpm_manager,
          operational_manager: this.operational_manager,
          createdAt: this.createdAt,
          updatedAt: this.updatedAt
        }
    
        return full ? {
          ...view
          // add properties for a full view
        } : view
      }
}

const model = mongoose.model('org_hierarchy', orgHierarchySchema)

export const schema = model.schema
export default model
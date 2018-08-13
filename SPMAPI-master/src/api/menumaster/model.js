import mongoose, { Schema } from 'mongoose'

const menuMasterSchema = new Schema({
  menuName: {
    type: String,
    default: '',
    required: false,
    index: false,
    trim: true
  },
  menuCode: {
    type: String,
    default: '',
    required: false,
    index: false,
    trim: true
  }
}, {
  timestamps: true
})

menuMasterSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      menuName: this.menuName,
      menuCode: this.menuCode,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('MenuMaster', menuMasterSchema)

export const schema = model.schema
export default model

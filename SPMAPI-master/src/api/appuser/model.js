import mongoose, { Schema } from 'mongoose'

const appUserSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    userId: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        default: 'user'
    },
    status: {
        type: String,
        default: 'active'
    }
}, {
    timestamps: true
})

appUserSchema.methods = {
    view (full) {
      const view = {
        // simple view
        id: this.id,
        name: this.name,
        email: this.email,
        userId: this.userId,
        password: this.password,
        role: this.role,
        status: this.status,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
      }  
      return full ? {
        ...view
        // add properties for a full view
      } : view
    }
  }

const model = mongoose.model('app_user', appUserSchema)

export const schema = model.schema
export default model
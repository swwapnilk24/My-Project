import mongoose, {Schema} from 'mongoose'

const masterDataValueSchema = new Schema({
    type_id: {
        type: String,
        required: false,
        trim: true
    },
    code: {
        type: String,
        index:true,
        required: true,
        trim: true
    },
    names:{
        en_label: {
            type: String,
            required: false,
            trim: true
        },
        fr_label: {
             type: String,
             required: false,
             trim: true
        }
    },
    status: {
     type: String,
     default: 'Active',
     required: false,
     index: false,
     trim: true,
     enum: ['Active', 'Obsolete']
    },
    info: [{type: String}]
 })

const masterValueSchema = new Schema({   
    masterDataValue: masterDataValueSchema
});

masterValueSchema.methods = {
    view (full) {
      const fullView = {
        // simple view
        id: this.id,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,       
        masterDataValue: this.masterDataValue
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

 const model = mongoose.model('MasterValue', masterValueSchema)
 
 export const schema = model.schema
 export default model


import mongoose, { Schema } from 'mongoose'

const masterDataTypeSchema = new Schema({
  customer_id: {
    type: String,
    required: false,
    trim: true
  },
  code: {
    type: String,
    required: false,
    index: true,
    trim: true
  },
  status: {
    type: String,
    default: 'Active',
    required: false,
    index: false,
    trim: true,
    enum: ['Active', 'Obsolete']
  },
  names: [{
    code: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false
    }
  }]
});

// var dataTypes  = mongoose.model('DataTypes', masterDataTypeSchema);

// const masterDataValueSchema = new Schema({
//    type_id: [{ type: Schema.Types.ObjectId, ref: 'DataTypes' }],
//    code: {
//        type: String,
//        index:true,
//        required: true,
//        trim: true
//    },
//    en_label: {
//        type: String,
//        required: false,
//        trim: true
//    },
//    fr_label: {
//         type: String,
//         required: false,
//         trim: true
//    },
//    status: {
//     type: String,
//     default: 'Active',
//     required: false,
//     index: false,
//     trim: true,
//     enum: ['Active', 'Obsolete']
//    },
//    info: [{type: String}]
// })

const masterDataSchema = new Schema({
  masterDataType: masterDataTypeSchema
  // masterDataValue: masterDataValueSchema
  // // masterDataValue: [masterDataValuesSchema]
});

masterDataSchema.methods = {
  view(full) {
    const fullView = {
      // simple view
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      masterDataType: this.masterDataType
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

const model = mongoose.model('Master', masterDataSchema)

const masterDataSchemaComp = new Schema({
  masterDataType1: masterDataTypeSchema,
  masterDataType2: masterDataTypeSchema
  // masterDataValue: masterDataValueSchema
  // // masterDataValue: [masterDataValuesSchema]
});
const modelComp = mongoose.model('MasterComp', masterDataSchemaComp);
export const MasterComp = modelComp;
export const schema = model.schema
export default model
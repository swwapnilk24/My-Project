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
    index: false,
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
    Canton: {
      type: String,
      required: false,
    },
    Type: {
      type: String,
      required: false,
    },
    MonthlyGrossTo: {
      type: Number,
      required: false,
    },
    MonthlyGrossFrom: {
      type: Number,
      required: false
    },
    B0N: {
      type: String,
      required: false
    },
    B1N: {
      type: String,
      required: false
    },
    B2N: {
      type: String,
      required: false
    },
    B3N: {
      type: String,
      required: false
    },
    B4N: {
      type: String,
      required: false
    },
    B5N: {
      type: String,
      required: false
    },
    B6N: {
      type: String,
      required: false
    },
    status: {
      type: String,
      required: false
    }
  }]
});


const contonTaxesSchema = new Schema({
  masterDataType: masterDataTypeSchema
});

contonTaxesSchema.methods = {
  view(full) {
    const fullView = {
   
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      masterDataType: this.masterDataType
    }

    const partialView = {
     
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...fullView
      
    } : { ...partialView }
  }
}

const model = mongoose.model('CantonTaxes', contonTaxesSchema)

export const schema = model.schema
export default model
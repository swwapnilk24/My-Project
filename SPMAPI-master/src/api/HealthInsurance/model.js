import mongoose, { Schema } from 'mongoose'

const Data = new Schema({
    country: {
      type: String,
      required: false,
      default: ""
    },
    empPosition: {
      type: String,
      required: false,
      default: ""
    },
    plan: {
      type: String,
      required: false,
      default: ""
    }
});


const HealthInsuraceSchema = new Schema({
  company_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  healthInsuranceBenefits:  [Data]
});

HealthInsuraceSchema.methods = {
  view(full) {
    const fullView = {
   
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      healthInsuraceData: this.healthInsuraceData
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

const model = mongoose.model('HealthInsuranceBenefit', HealthInsuraceSchema)

export const schema = model.schema
export default model
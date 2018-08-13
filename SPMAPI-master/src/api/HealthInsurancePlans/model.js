import mongoose, { Schema } from 'mongoose'

const Data = new Schema({
    plan: {
      type: String,
      required: false,
      default: ''
    },
    amount: {
      type: Number,
      required: false,
      default: 0
    },
    frequency: {
      type: Number,
      required: false,
      default: 0
    },
    contributionFromEmployee: {
      type: Number,
      required: false,
      default: 0
    }, 
    contributionFromEmployer: {
      type: Number,
      required: false,
      default: 0
    },
    pdfData: {
      type: String,
      required: false,
      default: 0
    }

});


const HealthInsuraceSchema = new Schema({
  company_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  healthInsurancePlans:  [Data]
});

HealthInsuraceSchema.methods = {
  view(full) {
    const fullView = {
   
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      healthInsurancePlans: this.healthInsurancePlans
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

const model = mongoose.model('HealthInsurancePlans', HealthInsuraceSchema)

export const schema = model.schema
export default model
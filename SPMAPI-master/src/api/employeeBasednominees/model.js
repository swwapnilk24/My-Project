import mongoose, { Schema } from 'mongoose'

const NomineesSchema = new Schema({
    nominationType: {
      type: String,
      required: false
    },
    nomineeFirstName: {
      type: String,
      required: false
    },
    nomineeLastName: {
      type: String,
      required: false
    },
    nomineeRelationShip: {
      type: String,
      required: false
    }, 
    dob: {
      type: Date,
      require: true
    }
});


const EmployeeBasedNomineesSchema = new Schema({
  employeeId: {
    type: String,
    required: true
  },
  nominees:  [NomineesSchema]
});

EmployeeBasedNomineesSchema.methods = {
  view(full) {
    const fullView = {
   
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      EmployeeBasedNominees: this.EmployeeBasedNominees
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

const model = mongoose.model('EmployeeBasedNominees', EmployeeBasedNomineesSchema)

export const schema = model.schema
export default model
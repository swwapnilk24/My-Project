import mongoose, { Schema } from 'mongoose';

const leavesIndividualSchema = new Schema({
  employeeID: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  firstNameAndEmpId: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  country: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  role: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  timeOffType: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  numberOfDays: {
    type: Number,
    required: false,
    index: false
  },
  yearStartDate: {
    type: Date,
    required: false,
    index: false
  },
  yearEndDate: {
    type: Date,
    required: false,
    index: false
  },
  status: {
    type: String,
    required: false,
    index: false,
    trim: true,
    default: 'Pending'
  }
}, {
    timestamps: true
  });

const leavesIndividual = new Schema({
  leavesIndividual: leavesIndividualSchema
});

leavesIndividual.methods = {
  view(isTrue) {
    const fullView = {
      // simple view
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      leavesIndividual: this.leavesIndividual
    }

    const partialView = {
      // simple view
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return isTrue ? {
      ...fullView
      // add properties for a full view
    } : { ...partialView }
  }
}

const model = mongoose.model('LeavesIndividual', leavesIndividual);

export const schema = model.schema;
export default model;

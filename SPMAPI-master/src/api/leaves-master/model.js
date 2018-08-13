import mongoose, { Schema } from 'mongoose';

const leavesMasterSchema = new Schema({
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

const leavesMasterData = new Schema({
  leavesMasterData: leavesMasterSchema
});

leavesMasterData.methods = {
  view(isTrue) {
    const fullView = {
      // simple view
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      leavesMasterData: this.leavesMasterData
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

const model = mongoose.model('LeavesMasterData', leavesMasterData);

export const schema = model.schema;
export default model;

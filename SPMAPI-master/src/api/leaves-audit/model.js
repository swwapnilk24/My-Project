import mongoose, { Schema } from 'mongoose';

const leavesAuditSchema = new Schema({
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
  },
  insertedBy: {
    type: String,
    required: false,
    index: false,
    trim: true
  },
  insertedDate: {
    type: Date,
    required: false,
    index: false
  },
  operation: {
    type: String,
    required: false,
    index: false,
    trim: true
  }
}, {
  timestamps: true
});

const leavesAuditData = new Schema({
  leavesAudit: [leavesAuditSchema]
});

leavesAuditData.methods = {
  view(full) {
    const fullView = {
      // simple view
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      leavesAuditData: this.leavesAuditData
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

const model = mongoose.model('LeavesAudit', leavesAuditData);

export const schema = model.schema;
export default model;
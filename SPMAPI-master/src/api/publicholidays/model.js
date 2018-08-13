import mongoose, { Schema } from 'mongoose'

const publicHolidaysSchema = new Schema({
  company: {
    type: String,
    default: '',
    required: false,
    index: false,
    trim: true
  },
  country: {
    type: String,
    default: '',
    required: false,
    index: false,
    trim: true
  },
  city: {
    type: String,
    default: '',
    required: false,
    index: false,
    trim: true
  },
  holidayDescription: {
    type: String,
    default: '',
    required: false,
    index: false,
    trim: true
  },
  date: {
    type: Date,
    default: '',
    required: false,
    index: false,
    trim: true
  },
  createdBy: {
    type: String,
    default: '',
    required: false,
    index: false,
    trim: true
  },
  createdDate: {
    type: Date,
    default: '',
    required: false,
    index: false,
    trim: true
  },
  approvedBy: {
    type: String,
    default: '',
    required: false,
    index: false,
    trim: true
  },
  approvedDate: {
    type: Date,
    default: '',
    required: false,
    index: false,
    trim: true
  }   
});

const publicHolidaySchema = new Schema({
    publicHolidays: [publicHolidaysSchema]
  },
      {
    timestamps: true
  })

publicHolidaySchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      publicHolidays: this.publicHolidays,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('PublicHolidays', publicHolidaySchema)

export const schema = model.schema
export default model

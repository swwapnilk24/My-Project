import mongoose, { Schema } from 'mongoose';

const regToken = new Schema({
  token: {
    type: String,
    required: true
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
  }
},{ 
  timestamps: true 
}); 

regToken.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      token: this.token,
      company: this.company
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('RegToken', regToken);

export const schema = model.schema;

export default model;

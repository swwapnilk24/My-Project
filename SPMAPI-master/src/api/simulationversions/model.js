import mongoose, { Schema } from 'mongoose'

const simulationVersionsSchema = new Schema({
    employeeid: {
        type: Object
    },
    versionName: {
      type: String
    },
    meritRange: {
      type: String
    }, 
    ipfRange: {
      type: String
    }, 
    ltiRange: {
      type: String
    },
    versionData: [
      {
        ABS: Number, 
        BPF: Number, 
        IPF: Number, 
        CPF: Number, 
        LTI: Number, 
        LtiBudget: Number, 
        MERIT: Number, 
        MeritBudget: Number, 
        NewABS: Number, 
        STI: Number, 
        StiBudget: Number, 
        TGT: Number, 
        employeeid: String, 
        key: String, 
        name: String, 
        parent: String, 
        rating: String, 
        title: String
      }
    ]
}, {
    timestamps: true
});

simulationVersionsSchema.methods = {
    view (full) {
      const view = {
        // simple view
        id: this.id,
        versionName: this.versionName,
        employeeid: this.employeeid,
        meritRange: this.meritRange,
        ipfRange: this.ipfRange,
        ltiRange: this.ltiRange,
        versionData: this.versionData
      }
  
      return full ? {
        ...view
        // add properties for a full view
      } : view
    }
  }

const model = mongoose.model('SimulationVersion', simulationVersionsSchema)

export const schema = model.schema
export default model
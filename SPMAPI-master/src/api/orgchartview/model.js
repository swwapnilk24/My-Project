import mongoose, { Schema } from 'mongoose'
import _ from 'lodash'

const orgChartViewSchema = new Schema({
    employeeid: {
      type: Object
    },
    cpm_manager: {
      type: Object
    },
    operational_manager: {
      type: Object
    },
    employee: [
     {
        name: String,
        jobtitle: String
     }
    ],
    cpmManager: [
     {
       name: String,
       jobtitle: String
     }
    ],
    operationalManager: [
        {
            name: String,
            jobtitle: String
        }
    ],
    compensationPlan: [
        {
            currentsalary: Number,
            merit: Number,
            performance_year: Date,
            ipf: Number,
            bpf: Number,
            cpf: Number,
            objective: Number,
            behaviour: Number
        }
    ]
},{
    timestamps: true
})

orgChartViewSchema.methods ={
    view (full) {
        const view = {
            id: this.id,
            employeeid: new mongoose.Types.ObjectId(this.employeeid),
            employee: this.employee[0],
            cpm_manager : this.cpm_manager,
            operational_manager: this.operational_manager,
            cpmManager: this.cpmManager[0],
            operationalManager: this.operationalManager[0],
            compensationPlan: this.compensationPlan[0]
        }
        return full ? {
            ...view
            // add properties for a full view
          } : view
    }
}
const model = mongoose.model('orgcharts', orgChartViewSchema)

export const schema = model.schema
export default model

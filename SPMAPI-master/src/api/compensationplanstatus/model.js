import mongoose, { Schema } from 'mongoose'
import _ from 'lodash'

const compensationPlanStatusSchema = new Schema({
    code: {
        type: String
    },
    name: {
        type: String
    },
    type: {
      type: Number
    }
},{
    timestamps: true
})

compensationPlanStatusSchema.methods = {
    view (full) {
        const view = {
            statusCode: this.code,
            statusName: this.name,
            type: this.type
        }
        return full ? {
        ...view
        // add properties for a full view
        } : view
    }
}

const model = mongoose.model('compensation_plan_statu', compensationPlanStatusSchema)

export const schema = model.schema
export default model

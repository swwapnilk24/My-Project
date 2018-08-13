import mongoose, { Schema } from 'mongoose'

const nominationPlanSchema = new Schema({
    bandId: {
        type: Object
    },
    planId: {
        type: Object
    },
    nominationPlan: {
        type: String
    }
},{
    timestamps: true
});

nominationPlanSchema.methods = {
    view (full) {
        const view = {
            // simple view
            id: this.id,
            bandId: this.bandId,
            planId: this.planId,
            nominationPlan: this.nominationPlan,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
        return full ? {
            ...view
            // add properties for a full view
        } : view
    }
}
const model = mongoose.model('nomination_plan', nominationPlanSchema)

export const schema = model.schema
export default model
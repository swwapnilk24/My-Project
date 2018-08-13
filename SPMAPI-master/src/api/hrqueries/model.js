import mongoose, { Schema } from 'mongoose'

const hrQueriesSchema = new Schema({
    issueType: {
        type: String
    },
    requestDate: {
        type: Date
    },
    subject: {
        type: String
    },
    issueDesc: {
        type: String
    },
    filePath: {
        type: String
    },
    notification: {
        type: String
    },
    status: {
      type: String,
      default: 'active'
    },
    approvalDate: {
      type: Date
    },
    approvedBy: {
        type: String
    },
    createdBy: {
        type: String
    },
    comments: {
        type: String
    }
}, {
    timestamps: true
});

hrQueriesSchema.methods = {
    view (full) {
      const view = {
        // simple view
        id: this.id,
        issueType: this.issueType,
        requestDate: this.requestDate,
        subject: this.subject,
        issueDesc: this.issueDesc,
        filePath: this.filePath,
        notification: this.notification,
        status: this.status,
        approvalDate: this.approvalDate,
        approvedBy: this.approvedBy,
        createdBy: this.createdBy,
        comments: this.comments,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
      }
      return full ? {
        ...view
        // add properties for a full view
      } : view
    }
  }

const model = mongoose.model('hrqueries', hrQueriesSchema);

export const schema = model.schema
export default model
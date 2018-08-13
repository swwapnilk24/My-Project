import mongoose, { Schema } from 'mongoose'

const individualGoalsSchema = new Schema({
  goalText: {
    type: String,
    default: '',
    required: true,
    index: false,
    trim: true
  },
  startDate: {
    type: Date,
    required: false,
    index: false
  },
  endDate: {
    type: Date,
    required: false,
    index: false
  },
  expectedOutcome: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  addedBy: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  weightage: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  performanceRating: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  comments: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  managerRating: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  managerComments: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  performanceYear: {
    type: String,
    default: '2017-2018',
    required: false,
    trim: true
  }
});

const knowledgeManagementSchema = new Schema({
  goalText: {
    type: String,
    default: '',
    required: true,
    index: false,
    trim: true
  },
  startDate: {
    type: Date,
    required: false,
    index: false
  },
  endDate: {
    type: Date,
    required: false,
    index: false
  },
  expectedOutcome: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  addedBy: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  weightage: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  performanceRating: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  comments: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  managerRating: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  managerComments: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  performanceYear: {
    type: String,
    default: '2017-2018',
    required: false,
    trim: true
  }
});

const goalApprovalSchema = new Schema({
  approvalBymanager: {
    type: String,
    default: '',
    required: false,
    index: true
  }
});

const appraisalsSchema = new Schema({
  displayGoals: {
    type: String,
    default: '',
    required: false,
    index: false,
    trim: true
  },
  selfEvaluation: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  selfEvaluationRating: {
    type: String,
    default: '',
    required: false,
    trim: true
  }
});

const appraiserSchema = new Schema({
  displayGoals: {
    type: String,
    default: '',
    required: false,
    index: false,
    trim: true
  },
  selfEvaluationText: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  selfEvaluationRating: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  appraiserComments: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  appraiserRating: {
    type: String,
    default: '',
    required: false,
    trim: true
  }
});

const normalisationProcessSchema = new Schema({
  tbd: {
    type: String,
    default: '',
    required: false,
    trim: true,
    index: false
  }
});

const positionAndRolesSchema = new Schema({
  position: {
    type: String,
    default: '',
    required: false,
    trim: true,
    index: false
  },
  goalText: {
    type: String,
    default: '',
    required: true,
    index: false,
    trim: true
  },
  startDate: {
    type: Date,
    required: false,
    index: false
  },
  endDate: {
    type: Date,
    required: false,
    index: false
  },
  expectedOutcome: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  weightage: {
    type: String,
    default: '',
    required: false,
    trim: true
  },
  addedBy: {
    type: String,
    default: '',
    required: false,
    trim: true
  }
});

const performanceManagementSchema = new Schema({
  goalSettingScreen: { individualGoals: [individualGoalsSchema], knowledgeManagement: [knowledgeManagementSchema] },
  goalApproval: [goalApprovalSchema],
  appraisals: [appraisalsSchema],
  appraiser: [appraiserSchema],
  normalisationProcess: [normalisationProcessSchema],
  positionAndRoles: [positionAndRolesSchema]
},
    {
  timestamps: true
})

performanceManagementSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      goalSettingScreen: this.goalSettingScreen,
      goalApproval: this.goalApproval,
      appraisals: this.appraisals,
      appraiser: this.appraiser,
      normalisationProcess: this.normalisationProcess,
      positionAndRoles: this.positionAndRoles
    }

    // const partialView = {
    //   // simple view
    //   id: this.id,
    //   createdAt: this.createdAt,
    //   updatedAt: this.updatedAt
    // }

    return full ? {
      ...view
      // add properties for a full view
    } : {...view}
  }
}

const model = mongoose.model('PerformanceManagement', performanceManagementSchema)

export const schema = model.schema
export default model

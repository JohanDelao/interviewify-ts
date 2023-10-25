import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const QAFeedbackSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  interview_id: {
    type: Schema.Types.ObjectId,
    ref: 'Interview',
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  
})

export default mongoose.model('QAFeedback', QAFeedbackSchema);
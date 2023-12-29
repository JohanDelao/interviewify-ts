import mongoose from 'mongoose';
import qa_feedbackModel from '../Models/qa_feedbackModel';
import interviewModel from '../Models/interviewModel';

export function saveToMongo(userId, evaluations): void {
  const interviewID = new mongoose.Types.ObjectId();
  const newInterview = new interviewModel({
    _id: interviewID,
    user_id: userId,
    qa_feedbacks: [],
  });

  for (const evaluation of evaluations) {
    const QAFeedbackEntry = new qa_feedbackModel({
      _id: new mongoose.Types.ObjectId(),
      interview_id: interviewID,
      question: evaluation.question,
      explanation: evaluation.explanation,
      answer: evaluation.answer,
      feedback: evaluation.feedback,
      score: evaluation.score,
    });
    newInterview.qa_feedbacks.push(QAFeedbackEntry._id);
    QAFeedbackEntry.save().catch((err) =>
      console.log('❌ Error saving QAFeedback: ', err, evaluation)
    );
  }
  newInterview
    .save()
    .catch((err) => console.log('❌ Error saving interview: ' + err));
}

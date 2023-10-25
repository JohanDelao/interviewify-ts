import mongoose from 'mongoose';
import qa_feedbackModel from '../Models/qa_feedbackModel';
import interviewModel from '../Models/interviewModel';

export function saveToMongo(resp, transcriptions): void {
  const interviewID = new mongoose.Types.ObjectId();
  const newInterview = new interviewModel({
    _id: interviewID,
    user_id: new mongoose.Types.ObjectId(), // TODO: need to put the current user id here (possibly comes from frontend / atleast the email should come then server can query)
    qa_feedbacks: [],
  });

  for (let i = 0; i < resp.length; i++) {
    const QAFeedbackEntry = new qa_feedbackModel({
      _id: new mongoose.Types.ObjectId(),
      interview_id: interviewID,
      question: resp[i].question,
      explanation: resp[i].explanation,
      answer: transcriptions[i],
      feedback: resp[i].feedback,
      score: resp[i].score,
    });
    newInterview.qa_feedbacks.push(QAFeedbackEntry._id);
    QAFeedbackEntry.save().catch((err) =>
      console.log('❌ Error saving QAFeedback: ' + err)
    );
  }
  newInterview
    .save()
    .catch((err) => console.log('❌ Error saving interview: ' + err));
}

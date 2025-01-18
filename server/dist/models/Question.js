import { Schema, model } from 'mongoose';
const QuestionSchema = new Schema({
    question: { type: String, required: true },
    answers: [
        {
            text: { type: String, required: true },
            isCorrect: { type: Boolean, required: true }
        }
    ]
});
const Question = model('Question', QuestionSchema);
export { Question };

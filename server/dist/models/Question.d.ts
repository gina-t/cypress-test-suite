import { type Document } from 'mongoose';
interface IAnswer extends Document {
    text: string;
    isCorrect: boolean;
}
interface IQuestion extends Document {
    question: string;
    answers: IAnswer[];
}
declare const Question: import("mongoose").Model<IQuestion, {}, {}, {}, Document<unknown, {}, IQuestion> & IQuestion & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { IQuestion, Question };

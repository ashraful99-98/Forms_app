import mongoose, { Document, Schema, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

// Response entry structure for each question
interface IAnswer {
  questionId: string;
  optionId: string;
}

// Response document structure
export interface IResponse extends Document {
  formId: mongoose.Types.ObjectId;
  userId: string;
  response: IAnswer[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Create schema
const ResponseSchema = new Schema<IResponse>(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Form',
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    response: [
      {
        questionId: { type: String, required: true },
        optionId: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

// Add pagination plugin
ResponseSchema.plugin(mongoosePaginate);

// Export the model with pagination
const ResponseModel = mongoose.model<IResponse, PaginateModel<IResponse>>('Response', ResponseSchema, 'Response');
export default ResponseModel;


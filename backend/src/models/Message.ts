import mongoose, {
  Schema,
  Document,
} from "mongoose";

export interface IMessage
  extends Document {
  courseId: Schema.Types.ObjectId;

  senderId: Schema.Types.ObjectId;

  senderName: string;

  message: string;

  createdAt: Date;
}

const messageSchema =
  new Schema<IMessage>(
    {
      courseId: {
        type:
          Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },

      senderId: {
        type:
          Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      senderName: {
        type: String,
        required: true,
      },

      message: {
        type: String,
        required: true,
        trim: true,
      },
    },
    {
      timestamps: true,
    }
  );

export const Message =
  mongoose.model<IMessage>(
    "Message",
    messageSchema
  );
import mongoose, {
  Schema,
  Document,
} from "mongoose";

export interface INotification
  extends Document {
  title: string;
  message: string;
  type: string;
  userId: mongoose.Types.ObjectId;
  isRead: boolean;
}

const notificationSchema =
  new Schema(
    {
      title: {
        type: String,
        required: true,
      },

      message: {
        type: String,
        required: true,
      },

      type: {
        type: String,
        required: true,
      },

      userId: {
        type:
          Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      isRead: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

export const Notification =
  mongoose.model<INotification>(
    "Notification",
    notificationSchema
  );
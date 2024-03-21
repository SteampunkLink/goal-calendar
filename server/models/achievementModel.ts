import { InferSchemaType, Schema, model } from "mongoose";

const achievementSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  goalText: { type: String, required: true },
  stickerStyle: { type: String, required: true },
  stickerNumber: { type: Number, default: 0 },
  dateAchieved: { type: Date, default: Date.now() },
});

type Achievement = InferSchemaType<typeof achievementSchema>;

export default model<Achievement>("Achievement", achievementSchema);

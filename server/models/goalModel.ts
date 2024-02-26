import { InferSchemaType, Schema, model } from "mongoose";

const goalSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  text: String,
  sticker: { type: Number, default: 0 },
});

type Goal = InferSchemaType<typeof goalSchema>;

export default model<Goal>("Goal", goalSchema);

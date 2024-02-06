import { InferSchemaType, Schema, model } from "mongoose";

const goalSchema = new Schema(
  {
    displayText: { type: String, required: true },
    descText: { type: String },
    category: { type: Schema.Types.ObjectId, required: true },
    sticker: { type: Number, default: 0 },
  },
  { timestamps: true }
);

type Goal = InferSchemaType<typeof goalSchema>;

export default model<Goal>("Goal", goalSchema);

// TODO link to user

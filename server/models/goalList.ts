import { InferSchemaType, Schema, model } from "mongoose";

const goalListSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    desc: { type: String },
    style: { type: String, required: true },
    goals: [
      {
        text: String,
        sticker: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

type GoalList = InferSchemaType<typeof goalListSchema>;

export default model<GoalList>("GoalList", goalListSchema);

import { InferSchemaType, Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    style: { type: String, required: true },
    goals: [{ type: Schema.Types.ObjectId, ref: "Goal" }],
  },
  { timestamps: true }
);

type Category = InferSchemaType<typeof categorySchema>;

export default model<Category>("Category", categorySchema);

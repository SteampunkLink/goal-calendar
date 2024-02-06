import { InferSchemaType, Schema, model } from "mongoose";

const goalCategorySchema = new Schema(
  {
    title: { type: String, required: true },
    style: { type: String, required: true },
  },
  { timestamps: true }
);

type GoalCategory = InferSchemaType<typeof goalCategorySchema>;

export default model<GoalCategory>("GoalCategory", goalCategorySchema);

// TODO add default to style, perhaps enum evaluator as well
// TODO link to user

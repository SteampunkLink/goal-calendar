import mongoose, { isValidObjectId } from "mongoose";
import createHttpError from "http-errors";
import Category from "../models/categoryModel";

interface isValidRequestInput {
  authenticatedUserId: mongoose.Types.ObjectId;
  categoryId: string;
}

const isValidRequest = async ({
  authenticatedUserId,
  categoryId,
}: isValidRequestInput) => {
  if (!isValidObjectId(categoryId)) {
    throw createHttpError(401, "Invalid Id");
  }
  const category = await Category.findById(categoryId).populate("goals");
  if (!category) {
    throw createHttpError(404, "Goal list not found.");
  }
  if (!category.userId.equals(authenticatedUserId)) {
    throw createHttpError(401, "Unauthorized");
  }
  return category;
};

export default isValidRequest;

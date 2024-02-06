import { RequestHandler } from "express";
import { isValidObjectId } from "mongoose";
import GoalCategoryModel from "../models/goalCategory";
import GoalModel from "../models/goal";
import GoalCategoryBodyInterface from "../interfaces/GoalCategoryBodyInterface";
import createHttpError from "http-errors";
import UpdateGoalParamsInterface from "../interfaces/UpdateGoalParamsInterface";

export const getAllCategories: RequestHandler = async (req, res, next) => {
  try {
    const categories = await GoalCategoryModel.find().exec();
    res.status(200).json({ categories });
  } catch (error) {
    next(error);
  }
};

export const getOneGoalCategory: RequestHandler = async (req, res, next) => {
  const goalCategoryId = req.params.id;
  try {
    if (!isValidObjectId(goalCategoryId)) {
      throw createHttpError(400, "Invalid goal id.");
    }
    const goalCategory = await GoalCategoryModel.findById(
      goalCategoryId
    ).exec();
    if (!goalCategory) {
      throw createHttpError(404, "Goal not found.");
    }
    res.status(200).json(goalCategory);
  } catch (error) {
    next(error);
  }
};

export const createGoalCategory: RequestHandler<
  unknown,
  unknown,
  GoalCategoryBodyInterface,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const style = req.body.style;
  try {
    if (!title) {
      throw createHttpError(400, "Category must have a title.");
    }
    const newGoalCategory = await GoalCategoryModel.create({ title, style });
    res.status(201).json(newGoalCategory);
  } catch (error) {
    next(error);
  }
};

export const updateGoalCategory: RequestHandler<
  UpdateGoalParamsInterface,
  unknown,
  GoalCategoryBodyInterface,
  unknown
> = async (req, res, next) => {
  const goalCategoryId = req.params.id;

  try {
    if (!isValidObjectId(goalCategoryId)) {
      throw createHttpError(400, "Invalid goal id.");
    }

    const goalCategory = await GoalCategoryModel.findById(goalCategoryId);
    if (!goalCategory) {
      throw createHttpError(404, "Goal not found.");
    }
    goalCategory.title = req.body.title || goalCategory.title;
    goalCategory.style = req.body.style || goalCategory.style;

    const updatedGoalCategory = await goalCategory.save();

    res.status(200).json(updatedGoalCategory);
  } catch (error) {
    next(error);
  }
};

export const deleteGoalCategory: RequestHandler = async (req, res, next) => {
  const goalCategoryId = req.params.id;

  try {
    if (!isValidObjectId(goalCategoryId)) {
      throw createHttpError(400, "Invalid goal id.");
    }

    const goalCategory = await GoalCategoryModel.findById(goalCategoryId);

    if (!goalCategory) {
      throw createHttpError(404, "Goal not found.");
    }

    await GoalCategoryModel.findByIdAndDelete(goalCategoryId);
    await GoalModel.deleteMany({ category: goalCategoryId });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

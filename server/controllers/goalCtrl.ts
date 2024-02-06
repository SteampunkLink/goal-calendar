import { RequestHandler } from "express";
import { isValidObjectId } from "mongoose";
import GoalModel from "../models/goal";
import GoalBodyInterface from "../interfaces/GoalBodyInterface";
import UpdateGoalParamsInterface from "../interfaces/UpdateGoalParamsInterface";
import createHttpError from "http-errors";

export const getAllGoals: RequestHandler = async (req, res, next) => {
  try {
    const goals = await GoalModel.find().exec();
    res.status(200).json({ goals });
  } catch (error) {
    next(error);
  }
};

export const getOneGoal: RequestHandler = async (req, res, next) => {
  const goalId = req.params.id;
  try {
    if (!isValidObjectId(goalId)) {
      throw createHttpError(400, "Invalid goal id.");
    }

    const goal = await GoalModel.findById(goalId).exec();

    if (!goal) {
      throw createHttpError(404, "Goal not found.");
    }

    res.status(200).json(goal);
  } catch (error) {
    next(error);
  }
};

export const createGoal: RequestHandler<
  unknown,
  unknown,
  GoalBodyInterface,
  unknown
> = async (req, res, next) => {
  const displayText = req.body.displayText;
  const descText = req.body.descText;
  const category = req.body.category;
  const sticker = req.body.sticker;
  try {
    if (!displayText) {
      throw createHttpError(400, "Display text is required.");
    }
    // TODO check if category exists too
    if (!category) {
      throw createHttpError(
        400,
        "Goal must be associated with a valid category."
      );
    }
    const newGoal = await GoalModel.create({
      displayText,
      descText,
      category,
      sticker,
    });
    res.status(201).json(newGoal);
  } catch (error) {
    next(error);
  }
};

export const updateGoal: RequestHandler<
  UpdateGoalParamsInterface,
  unknown,
  GoalBodyInterface,
  unknown
> = async (req, res, next) => {
  const goalId = req.params.id;

  try {
    if (!isValidObjectId(goalId)) {
      throw createHttpError(400, "Invalid goal id.");
    }

    const goal = await GoalModel.findById(goalId).exec();

    if (!goal) {
      throw createHttpError(404, "Goal not found.");
    }
    goal.displayText = req.body.displayText || goal.displayText;
    goal.descText = req.body.descText || goal.descText;
    goal.sticker = req.body.sticker || goal.sticker;

    const updatedGoal = await goal.save();

    res.status(200).json(updatedGoal);
  } catch (error) {
    next(error);
  }
};

export const deleteGoal: RequestHandler = async (req, res, next) => {
  const goalId = req.params.id;

  try {
    if (!isValidObjectId(goalId)) {
      throw createHttpError(400, "Invalid goal id.");
    }

    const goal = await GoalModel.findById(goalId);

    if (!goal) {
      throw createHttpError(404, "Goal not found.");
    }

    await GoalModel.findByIdAndDelete(goalId);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

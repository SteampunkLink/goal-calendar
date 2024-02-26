import { RequestHandler } from "express";
import mongoose, { ObjectId } from "mongoose";
import createHttpError from "http-errors";
import assertIsDefined from "../util/assertIsDefined";
import Goal from "../models/goalModel";
import isValidRequest from "../util/isValidRequest";

interface CreateGoalParamsInterface {
  categoryId: string;
}

interface CreateGoalBodyInterface {
  goalText?: string;
}

interface EditGoalParamsInterface {
  goalId: string;
  categoryId: string;
}

interface EditGoalBodyInterface {
  newSticker?: number;
}

interface DeleteGoalParamsInterface {
  goalId: mongoose.Types.ObjectId;
  categoryId: string;
}

// @desc create a new goal
// @path POST /api/goals/:categoryId
export const createGoal: RequestHandler<
  CreateGoalParamsInterface,
  unknown,
  CreateGoalBodyInterface,
  unknown
> = async (req, res, next) => {
  const categoryId = req.params.categoryId;
  const goal = req.body.goalText;
  const authenticatedUserId = req.session.userId;
  try {
    assertIsDefined(authenticatedUserId);
    if (!goal) {
      throw createHttpError(400, "Goal cannot be empty.");
    }

    const foundCategory = await isValidRequest({
      authenticatedUserId,
      categoryId,
    });

    const newGoal = await Goal.create({
      category: foundCategory._id,
      text: goal,
      sticker: 0,
    });

    foundCategory.goals.push(newGoal._id);
    await foundCategory.save();

    res.status(200).json(newGoal);
  } catch (error) {
    next(error);
  }
};

// @desc change a goal's sticker
// @path PATCH /api/goals/:goalId/:categoryId
export const updateGoalSticker: RequestHandler<
  EditGoalParamsInterface,
  unknown,
  EditGoalBodyInterface,
  unknown
> = async (req, res, next) => {
  const categoryId = req.params.categoryId;
  const goalId = req.params.goalId;
  const newSticker = req.body.newSticker;
  const authenticatedUserId = req.session.userId;
  console.log("New Sticker", newSticker);
  try {
    assertIsDefined(authenticatedUserId);

    await isValidRequest({ authenticatedUserId, categoryId });
    const goalToUpdate = await Goal.findById(goalId).exec();

    if (!goalToUpdate) {
      throw createHttpError(404, "Goal not found.");
    }

    goalToUpdate.sticker = newSticker || 0;
    const updatedGoal = await goalToUpdate.save();
    res.status(200).json(updatedGoal);
  } catch (error) {
    next(error);
  }
};

// @desc delete a goal and remove it from the category
// @path DELETE /api/goals/:goalId/:categoryId
export const deleteGoal: RequestHandler<
  DeleteGoalParamsInterface,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const categoryId = req.params.categoryId;
  const goalId = req.params.goalId;
  const authenticatedUserId = req.session.userId;
  try {
    assertIsDefined(authenticatedUserId);

    if (!goalId) {
      throw createHttpError(400, "No goal to delete.");
    }

    const foundCategory = await isValidRequest({
      authenticatedUserId,
      categoryId,
    });

    let newFuckingGoalsArray: any[] = [];

    foundCategory.goals.map((goal): any => {
      if (!goal._id.equals(goalId)) {
        newFuckingGoalsArray.push(goal);
      }
    });
    foundCategory.goals = newFuckingGoalsArray;
    foundCategory.save();

    await Goal.findByIdAndDelete(goalId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

import { RequestHandler } from "express";
import { isValidObjectId } from "mongoose";
import createHttpError from "http-errors";
import GoalList from "../models/goalList";
import assertIsDefined from "../util/assertIsDefined";

export const getAllLists: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  try {
    assertIsDefined(authenticatedUserId);

    const goalLists = await GoalList.find({
      userId: authenticatedUserId,
    }).exec();
    res.status(200).json(goalLists);
  } catch (error) {
    next(error);
  }
};

export const getOneList: RequestHandler = async (req, res, next) => {
  const goalListId = req.params.id;
  const authenticatedUserId = req.session.userId;
  try {
    assertIsDefined(authenticatedUserId);

    if (!isValidObjectId(goalListId)) {
      throw createHttpError(400, "Invalid id.");
    }

    const goalList = await GoalList.findById(goalListId).exec();

    if (!goalList) {
      throw createHttpError(404, "Goal not found.");
    }

    if (!goalList.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, "Unauthorized");
    }

    res.status(200).json(goalList);
  } catch (error) {
    next(error);
  }
};

interface GoalListBodyInterface {
  title?: string;
  desc?: string;
  style?: string;
  goals?: [{ text?: string; sticker?: number }];
}

export const createGoalList: RequestHandler<
  unknown,
  unknown,
  GoalListBodyInterface,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const desc = req.body.desc;
  const style = req.body.style; // TODO add default style
  const goals = req.body.goals;
  const authenticatedUserId = req.session.userId;
  try {
    assertIsDefined(authenticatedUserId);

    if (!title) {
      throw createHttpError(400, "Title is required.");
    }

    const newGoalList = await GoalList.create({
      userId: authenticatedUserId,
      title,
      desc,
      style,
      goals,
    });

    res.status(201).json(newGoalList);
  } catch (error) {
    next(error);
  }
};

export default interface UpdateGoalListParamsInterface {
  id: string;
}

export const updateGoalList: RequestHandler<
  UpdateGoalListParamsInterface,
  unknown,
  GoalListBodyInterface,
  unknown
> = async (req, res, next) => {
  const goalListId = req.params.id;
  const authenticatedUserId = req.session.userId;
  try {
    assertIsDefined(authenticatedUserId);

    if (!isValidObjectId(goalListId)) {
      throw createHttpError(400, "Invalid id.");
    }

    const goalList = await GoalList.findById(goalListId).exec();

    if (!goalList) {
      throw createHttpError(404, "Goal list not found.");
    }

    if (!goalList.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, "Unauthorized");
    }

    goalList.title = req.body.title || goalList.title;
    goalList.desc = req.body.desc || goalList.desc;
    goalList.style = req.body.style || goalList.style;

    const updatedGoalList = await goalList.save();

    res.status(200).json(updatedGoalList);
  } catch (error) {
    next(error);
  }
};

export interface EditGoalInListInterface {
  goal?: { text?: string; sticker?: number };
}

export const addGoalToList: RequestHandler<
  UpdateGoalListParamsInterface,
  unknown,
  EditGoalInListInterface,
  unknown
> = async (req, res, next) => {
  const goalListId = req.params.id;
  const goal = req.body.goal;
  const authenticatedUserId = req.session.userId;
  try {
    assertIsDefined(authenticatedUserId);

    if (!goal || !goal.text) {
      throw createHttpError(400, "Goal cannot be empty.");
    }

    if (!isValidObjectId(goalListId)) {
      throw createHttpError(400, "Invalid id.");
    }

    const goalList = await GoalList.findById(goalListId).exec();

    if (!goalList) {
      throw createHttpError(404, "Goal list not found.");
    }

    if (!goalList.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, "Unauthorized");
    }

    const newGoal = {
      text: goal.text,
      sticker: goal.sticker || 0,
    };

    goalList.goals.push(newGoal);
    await goalList.save();
    res.status(200).json(goalList);
  } catch (error) {
    next(error);
  }
};

export const removeGoalFromList: RequestHandler<
  UpdateGoalListParamsInterface,
  unknown,
  EditGoalInListInterface,
  unknown
> = async (req, res, next) => {
  const goalListId = req.params.id;
  const goal = req.body.goal;
  const authenticatedUserId = req.session.userId;
  try {
    assertIsDefined(authenticatedUserId);

    if (!goal || !goal.text) {
      throw createHttpError(400, "No goal to delete.");
    }

    if (!isValidObjectId(goalListId)) {
      throw createHttpError(400, "Invalid id.");
    }

    const goalList = await GoalList.findById(goalListId).exec();

    if (!goalList) {
      throw createHttpError(404, "Goal list not found.");
    }

    if (!goalList.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, "Unauthorized");
    }

    goalList.goals.pull({ text: goal.text });
    await goalList.save();
    res.status(200).json(goalList);
  } catch (error) {
    next(error);
  }
};

export const deleteGoalList: RequestHandler = async (req, res, next) => {
  const goalListId = req.params.id;
  const authenticatedUserId = req.session.userId;
  try {
    assertIsDefined(authenticatedUserId);

    if (!isValidObjectId(goalListId)) {
      throw createHttpError(400, "Invalid id.");
    }

    const goalList = await GoalList.findById(goalListId).exec();

    if (!goalList) {
      throw createHttpError(404, "Goal list not found.");
    }

    if (!goalList.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, "Unauthorized");
    }

    await GoalList.findByIdAndDelete(goalListId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Achievement from "../models/achievementModel";
import formatDatesForSearch from "../util/formatDatesForSearch";
import assertIsDefined from "../util/assertIsDefined";

interface RequestAchievementsMonthParams {
  start?: string;
  end?: string;
}

interface RequestAchievementsDayParams {
  date?: string;
}

// @desc  get a user's achievements for a selected month
// @path  GET /api/achievements/month/:date
export const getAchievementsByMonth: RequestHandler<
  RequestAchievementsMonthParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  try {
    assertIsDefined(authenticatedUserId);
    if (!req.params.start || !req.params.end) {
      throw createHttpError(400, "Date range is required");
    }

    const start = new Date(req.params.start);
    const end = new Date(req.params.end);

    const thisMonthsAchievements = await Achievement.find({
      userId: authenticatedUserId,
      dateAchieved: { $gte: start, $lte: end },
    }).exec();

    res.status(200).json(thisMonthsAchievements);
  } catch (error) {
    next(error);
  }
};

// @desc  get a user's achievements for a selected day
// @path  GET /api/achievements/day/:date
export const getAchievementsByDay: RequestHandler<
  RequestAchievementsDayParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  try {
    assertIsDefined(authenticatedUserId);
    if (!req.params.date) {
      throw createHttpError(400, "Date is required");
    }

    const start = new Date(req.params.date);

    const todaysAchievements = await Achievement.find({
      userId: authenticatedUserId,
      dateAchieved: { $gte: start, $lte: start },
    }).exec();

    res.status(200).json(todaysAchievements);
  } catch (error) {
    next(error);
  }
};

interface AchievementBodyInterface {
  goalText?: string;
  stickerStyle?: string;
  stickerNumber?: number;
  dateAchieved?: string;
}

// @desc  create a new achievement
// @path  POST /api/achievements
export const createAchievement: RequestHandler<
  unknown,
  unknown,
  AchievementBodyInterface,
  unknown
> = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  try {
    assertIsDefined(authenticatedUserId);
    if (!req.body.goalText || !req.body.dateAchieved) {
      throw createHttpError(400, "Data is missing.");
    }
    const goalText = req.body.goalText;
    const stickerStyle = req.body.stickerStyle || "stars";
    const stickerNumber = req.body.stickerNumber || 0;
    const dateAchieved = new Date(req.body.dateAchieved!);

    const newAchievement = await Achievement.create({
      userId: authenticatedUserId,
      goalText,
      stickerStyle,
      stickerNumber,
      dateAchieved,
    });

    res.status(201).json(newAchievement);
  } catch (error) {
    next(error);
  }
};

interface UpdateAchievementParams {
  achievementId: string;
}

// @desc  update an achievement
// @path  PATCH /api/:achievementId
export const updateAchievement: RequestHandler<
  UpdateAchievementParams,
  unknown,
  AchievementBodyInterface,
  unknown
> = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  const achievementId = req.params.achievementId;
  try {
    assertIsDefined(authenticatedUserId);
    const achievementToUpdate = await Achievement.findById(
      achievementId
    ).exec();

    if (!achievementToUpdate) {
      throw createHttpError("404", "Achievement not found.");
    }
    if (achievementToUpdate.userId !== authenticatedUserId) {
      throw createHttpError("401", "Unauthorized");
    }
    if (req.body.goalText) achievementToUpdate.goalText = req.body.goalText;
    if (req.body.stickerStyle)
      achievementToUpdate.stickerStyle = req.body.stickerStyle;
    if (req.body.stickerNumber)
      achievementToUpdate.stickerNumber = req.body.stickerNumber;

    const updatedAchievement = await achievementToUpdate.save();
    res.status(200).json(updatedAchievement);
  } catch (error) {
    next(error);
  }
};

// @desc  delete an achievement
// @path  DELETE /api/:achievementId
export const deleteAchievement: RequestHandler<
  UpdateAchievementParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  const achievementId = req.params.achievementId;
  try {
    assertIsDefined(authenticatedUserId);
    const achievementToUpdate = await Achievement.findById(
      achievementId
    ).exec();

    if (!achievementToUpdate) {
      throw createHttpError("404", "Achievement not found.");
    }
    if (achievementToUpdate.userId !== authenticatedUserId) {
      throw createHttpError("401", "Unauthorized");
    }
    await Achievement.findByIdAndDelete(achievementId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

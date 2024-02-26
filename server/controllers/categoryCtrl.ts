import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Category from "../models/categoryModel";
import Goal from "../models/goalModel";
import assertIsDefined from "../util/assertIsDefined";
import isValidRequest from "../util/isValidRequest";

interface CategoryBodyInterface {
  title?: string;
  style?: string;
}

export default interface UpdateCategoryParamsInterface {
  id: string;
}

// @desc  get all of a user's goal lists
// @path  GET /api/categories
export const getAllCategories: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  try {
    assertIsDefined(authenticatedUserId);
    const categories = await Category.find({ userId: authenticatedUserId })
      .populate("goals")
      .exec();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

// @desc  create a new goal category
// @path  POST /api/categories
export const createCategory: RequestHandler<
  unknown,
  unknown,
  CategoryBodyInterface,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  let style = req.body.style || "stars";
  const authenticatedUserId = req.session.userId;
  try {
    assertIsDefined(authenticatedUserId);

    if (!title) {
      throw createHttpError(400, "Title is required.");
    }

    const newCategory = await Category.create({
      userId: authenticatedUserId,
      title,
      style,
    });

    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

// @desc  update a goal list
// @path  PATCH /api/categories/:id
export const updateCategory: RequestHandler<
  UpdateCategoryParamsInterface,
  unknown,
  CategoryBodyInterface,
  unknown
> = async (req, res, next) => {
  const categoryId = req.params.id;
  const authenticatedUserId = req.session.userId;
  try {
    assertIsDefined(authenticatedUserId);

    const category = await isValidRequest({ authenticatedUserId, categoryId });

    category.title = req.body.title || category.title;
    category.style = req.body.style || category.style;

    const updatedCategory = await category.save();

    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

// @desc   deletes an entire goal list
// @route  DELETE /api/categories/:id
export const deleteCategory: RequestHandler = async (req, res, next) => {
  const categoryId = req.params.id;
  const authenticatedUserId = req.session.userId;
  try {
    assertIsDefined(authenticatedUserId);

    const category = await isValidRequest({ authenticatedUserId, categoryId });

    await Goal.deleteMany({ category: category._id });
    await Category.findByIdAndDelete(category);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

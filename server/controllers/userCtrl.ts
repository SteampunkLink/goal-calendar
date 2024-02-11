import { RequestHandler } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import User from "../models/user";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId)
      .select("+email")
      .exec();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

interface RegisterBodyInterface {
  username?: string;
  email?: string;
  password?: string;
}

export const register: RequestHandler<
  unknown,
  unknown,
  RegisterBodyInterface,
  unknown
> = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      throw createHttpError(400, "All fields are required.");
    }
    const existingUsername = await User.findOne({ username }).exec();
    if (existingUsername) {
      throw createHttpError(
        409,
        "Username already taken. Please choose a different name."
      );
    }
    const existingEmail = await User.findOne({ email }).exec();
    if (existingEmail) {
      throw createHttpError(
        409,
        "Email already in use. Please log in instead."
      );
    }
    const passwordHashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: passwordHashed,
    });

    req.session.userId = newUser._id;
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

interface LoginBodyInterface {
  username?: string;
  password?: string;
}

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBodyInterface,
  unknown
> = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      throw createHttpError(400, "All fields are required.");
    }
    const user = await User.findOne({ username })
      .select("+password +email")
      .exec();

    if (!user) {
      throw createHttpError(401, "Invalid credentials.");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw createHttpError(401, "Invalid credentials.");
    }

    req.session.userId = user._id;
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
};

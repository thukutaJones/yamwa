"use server";

import jwt from "jsonwebtoken";

export async function getUserId(token: string) {

  if (!token) {
    return null;
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
        userId: string;
    };


    return decoded?.userId;
  } catch (error) {
    return null;
  }
}

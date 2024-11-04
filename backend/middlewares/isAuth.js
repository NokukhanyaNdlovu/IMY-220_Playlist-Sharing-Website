import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("Token:", token);
    if (!token)
      return res.status(403).json({
        message: "Please Login",
      });

    const decodedData = jwt.verify(token, process.env.Jwt_secret);
    console.log("Decoded User ID:", decodedData?.id);
    if (!decodedData)
      return res.status(403).json({
        message: "token expired",
      });

      console.log("User from DB:", req.user);
    req.user = await User.findById(decodedData.id);

    next();
  } catch (error) {
    res.status(500).json({
      message: "Please Login",
    });
  }
};

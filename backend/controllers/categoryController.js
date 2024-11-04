// for catorgory tbl
import { Category } from "../models/Category.js";
import TryCatch from "../utils/TryCatch.js";

export const getCategories = TryCatch(async (req, res) => {

  const categories = await Category.find();
  console.log("RESPONSEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
  console.log(categories);
  res.json(categories);
});

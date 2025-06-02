import express from "express";
import {
  allBlog,
  authorBlog,
  createBlog,
  deleteBlog,
  singleAuthorBlog,
  singleBlog,
  updateBlog,
} from "../controllers/blog.controller.js";
import { authorizeRole, protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", allBlog);

router.get("/my-posts", protect, authorBlog);

router.get("/:id", singleBlog);


router.get("/my-posts/:id", protect, singleAuthorBlog);


router.post("/", protect, authorizeRole, createBlog);

router.patch("/:id", protect, authorizeRole, updateBlog);

router.delete("/:id", protect, authorizeRole, deleteBlog);

export default router;

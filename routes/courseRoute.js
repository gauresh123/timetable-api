import express from "express";

import {
  addCourse,
  deleteCourse,
  getCourses,
  updateCourse,
} from "../controllers/courseController.js";

const router = express.Router();

router.get("/courses", getCourses);
router.put("/:id/updatecourse", updateCourse);
router.post("/addcourse", addCourse);
router.delete("/deletecourse", deleteCourse);

export default router;

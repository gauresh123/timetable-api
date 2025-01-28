import express from "express";
import {
  addTimeTable,
  deleteTimeTable,
  getTimeTables,
  updateTimeTable,
} from "../controllers/timeTableController.js";

const router = express.Router();

router.get("/timetables", getTimeTables);
router.post("/:id/updatetable", updateTimeTable);
router.post("/addtable", addTimeTable);
router.post("/deletetable", deleteTimeTable);

export default router;

import express from "express";
import {
  addTimeTable,
  getTimeTables,
  updateTimeTable,
} from "../controllers/timeTableController.js";

const router = express.Router();

router.get("/timetables", getTimeTables);
router.put("/:id/updatetable", updateTimeTable);
router.post("/addtable", addTimeTable);

export default router;

import express from "express";
import {
  getCategories,
  getProductDetail,
  getProducts,
} from "../controllers/productControler.js";

const router = express.Router();

router.post("/getProduct", getProducts);
router.get("/getCategories", getCategories);
router.get("/productdetail", getProductDetail);

export default router;

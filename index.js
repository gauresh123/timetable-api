import express from "express";
import { Sequelize } from "sequelize";
import cors from "cors";
import dotenv from "dotenv/config";
import productRoute from "./routes/productRoute.js";
import timetableRoute from "./routes/timetableRoute.js";
import courseRoute from "./routes/courseRoute.js";

const app = express();
const PORT = "8000";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.PGHOST,
  port: 5432,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  dialectOptions: {
    ssl: true,
  },
});

app.use(cors());
app.use(express.json());
app.use("/api/product", productRoute);
app.use("/api", timetableRoute);
app.use("/api", courseRoute);

app;
app.listen(PORT, () => {
  console.log(`your app started successfully and is running at port: ${PORT}`);
});

sequelize
  .authenticate()
  .then(() => {
    console.log("DB Connected successfully !!!");
  })
  .catch((err) => {
    console.log(err);
  });

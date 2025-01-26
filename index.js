import express from "express";
import { Sequelize } from "sequelize";
import cors from "cors";
import dotenv from "dotenv/config";
import productRoute from "./routes/productRoute.js";
import timetableRoute from "./routes/timetableRoute.js";
import courseRoute from "./routes/courseRoute.js";
import axios from "axios";
import cron from "node-cron";

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

const corsOptions = {
  origin: "*", // Allow only this origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow only GET and POST methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/product", productRoute);
app.use("/api", timetableRoute);
app.use("/api", courseRoute);

cron.schedule("* * * * * *", () => {
  console.log("Cron job running every 1 minutes");

  axios
    .get("https://timetable-api-ls83.onrender.com/")
    .then((response) => {
      console.log("Response from internal API call:");
    })
    .catch((error) => {
      console.error("Error calling internal API:");
    });
});

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

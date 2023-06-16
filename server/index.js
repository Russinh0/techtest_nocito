import express from "express";

import routes from "./routes/index.js";
import db from "./config/db/index.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(bodyParser.json());
const router = express.Router();
app.use(express.json());

app.use("/api", routes);

const initServer = async () => {
  try {
    await db.sync({ force: false });

    app.listen(process.env.PORT, () => {
      console.log(`SERVER UP AT PORT ${process.env.PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
};

initServer();

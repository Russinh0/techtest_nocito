import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME } = process.env;

const db = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  logging: false,
});

export default db;

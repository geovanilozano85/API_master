import { Sequelize } from "sequelize";

const db = new Sequelize(
  "railway",
  "root",
  "yzYppTVJttZkoOIBwVZevxJusBhipzUQ",
  {
    host: "roundhouse.proxy.rlwy.net",
    dialect: "mysql",
    port: 46391,
  }
);

export default db;

import { DataTypes } from "sequelize";
import db from "../db/connection.js";

const User = db.define(
  "User",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    documento: {
      type: DataTypes.INTEGER,
    },

    nombres: {
      type: DataTypes.STRING,
    },

    correo: {
      type: DataTypes.STRING,
    },

    contrasena: {
      type: DataTypes.STRING,
    },
    id_rol: {
      type: DataTypes.INTEGER,
    },

    blocked: {
      type: DataTypes.BOOLEAN,
    },

    failed_login: {
      type: DataTypes.INTEGER,
    },

    last_Failed_Login: {
      type: DataTypes.DATE,
    },
    contraseVista: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "usuario",
  }
);

export default User;

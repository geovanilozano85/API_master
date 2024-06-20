import { DataTypes } from "sequelize";
import db from "../db/connection.js";

const Clientes = db.define(
  "Clientes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },

    nombre: {
      type: DataTypes.STRING,
    },

    correo: {
      type: DataTypes.STRING,
    },
    telefono: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "clientes",
  }
);
export default Clientes;

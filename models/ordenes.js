import { DataTypes } from "sequelize";
import db from "../db/connection.js";

const Ordenes = db.define(
  "Ordenes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    id_cliente: {
      type: DataTypes.INTEGER,
    },

    fecha: {
      type: DataTypes.DATE,
    },
    precio_total: {
      type: DataTypes.DOUBLE,
    },
    estado_pedido: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "ordenes",
  }
);
export default Ordenes;

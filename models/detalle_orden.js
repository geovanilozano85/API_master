import { DataTypes } from "sequelize";
import db from "../db/connection.js";

const Detalle_ordenes = db.define(
  "Detalle_ordenes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },

    id_orden: {
      type: DataTypes.INTEGER,
    },

    id_producto: {
      type: DataTypes.INTEGER,
    },
    cantidad: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "detalle_orden",
  }
);
export default Detalle_ordenes;

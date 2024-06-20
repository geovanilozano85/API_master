import { DataTypes } from "sequelize";
import db from "../db/connection.js"


const Productos  = db.define('Productos',{
    id: {
        type : DataTypes.INTEGER,
        primaryKey: true
    },

    nombre:{
        type : DataTypes.STRING
    },
    
    descripcion :{
        type : DataTypes.STRING
    },
    precio:{
        type : DataTypes.DOUBLE
    },

    imagen:{
        type : DataTypes.STRING
    },
}
, {
    tableName:"productos",
}

)
export default Productos;
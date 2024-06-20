import { DataTypes } from "sequelize";
import db from "../db/connection.js"


const Rol  = db.define('Rol',{
    id: {
        type : DataTypes.INTEGER,
        primaryKey: true
    },

    nombre:{
        type : DataTypes.STRING
    },
    

}
, {
    tableName:"rol",
}

)
export default Rol;
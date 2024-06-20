import Product from "../models/productos.js";
import Order from "../models/ordenes.js";
import Order_Detail from "../models/detalle_orden.js";
import User from "../models/user.js";
import Client from "../models/clientes.js";

Order.belongsTo(Client, {
  foreignKey: "id_cliente",
  as: "clientes",
});
Client.hasMany(Order, {
  foreignKey: "id_cliente",
  as: "clientes",
});

Order.belongsTo(User, { foreignKey: "id", as: "usuario" });
// User.hasMany(Order, { foreignKey: "id_user", as: "orders" });

Order.hasMany(Order_Detail, { foreignKey: "id_orden", as: "detalles" });
Order_Detail.belongsTo(Order, { foreignKey: "id", as: "ordenes" });

Product.hasMany(Order_Detail, {
  foreignKey: "id_producto",
  as: "productos",
});
Order_Detail.belongsTo(Product, {
  foreignKey: "id_producto",
  as: "productos",
});

export { Order, Product, Order_Detail, User, Client };

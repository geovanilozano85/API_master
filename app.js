import express from "express";
import cors from "cors";
import RoutesUser from "./router/user.js";
import RoutesClient from "./router/clientes.js";
import RoutesProduct from "./router/productos.js";
import RoutesOrder from "./router/ordenes.js";
import RoutesOrderDetail from "./router/detalle_orden.js";
import RoutesRol from "./router/rol.js";
import auth from "./router/auth.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("API de ZTecnology");
});

app.use("/api/user", RoutesUser);
app.use("/api/client", RoutesClient);
app.use("/api/product", RoutesProduct);
app.use("/api/order", RoutesOrder);
app.use("/api/orderDetail", RoutesOrderDetail);
app.use("/api/rol", RoutesRol);
app.use("/api/login", auth);

app.get("*", (req, res) => {
  res.status(404).json("Error modulo no encontrado");
});

app.listen(3000, () => {
  console.log("Escuchando en el puerto http://localhost:3000");
});

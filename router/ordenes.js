import { Router } from "express";
import { Order, Client, Order_Detail } from "../relaciones/relaciones.js";

const order = Router();
//CRUD
// Consultar todas las órdenes
order.get("/consult-allOrders", async (req, res) => {
  try {
    const orders = await Order.findAll({
      attributes: ["id", "fecha", "precio_total", "estado_pedido"],
      include: [
        {
          model: Client,
          as: "clientes",
          attributes: ["nombre", "correo"],
        },
      ],
    });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Consultar orden por ID
order.get("/consultOrder/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ msg: `La orden no ha sido encontrada` });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear orden
order.post("/createOrder", async (req, res) => {
  const { id_cliente, precio_total, productos } = req.body;
  const fechaActual = new Date();
  const dia = fechaActual.getDate();
  const mes = fechaActual.getMonth() + 1;
  const año = fechaActual.getFullYear();

  const fechaEnFormato = `${año}-${mes.toString().padStart(2, "0")}-${dia
    .toString()
    .padStart(2, "0")}`;

  console.log(fechaEnFormato);

  try {
    const newOrder = await Order.create({
      id_cliente,
      fecha: fechaEnFormato,
      precio_total,
      estado_pedido: "1",
    });

    const id_order = newOrder.dataValues.id;

    for (const producto of productos) {
      console.log(producto.id);
      await Order_Detail.create({
        id_orden: id_order,
        id_producto: producto.id_producto,
        cantidad: producto.cantidad,
      });
    }

    res
      .status(200)
      .json(`La orden ha sido creada correctamente: id ${id_order}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar orden
order.put("/updateOrder", async (req, res) => {
  const { id, estado_pedido } = req.body;

  try {
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json("La orden no ha sido encontrada");
    }

    await order.update({ estado_pedido });

    res.status(200).json("La orden ha sido actualizada correctamente");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar orden
order.delete("/deleteOrder/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await Order.destroy({ where: { id } });
    const deletedOrderDetail = await Order_Detail.destroy({
      where: { id_orden: id },
    });

    if (deletedOrder === 0) {
      return res.status(404).json("La orden no existe");
    }

    if (deletedOrderDetail === 0) {
      return res.status(404).json("La orden no existe");
    }

    res
      .status(200)
      .json(`La orden con el ID ${id} ha sido eliminada correctamente`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default order;

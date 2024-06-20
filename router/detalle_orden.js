import { Router } from "express";
import { Order_Detail, Product } from "../relaciones/relaciones.js";

const orderDetail = Router();
//CRUD
// Consultar todos los detalles de órdenes
orderDetail.get("/consult-allOrderDetails", async (req, res) => {
  try {
    const orderDetails = await Order_Detail.findAll({
      include: [
        {
          model: Product,
          as: "productos",
          attributes: ["nombre", "precio"],
        },
      ],
    });
    res.status(200).json(orderDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Consultar detalle de orden por ID
orderDetail.get("/consultOrderDetail/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const orderDetails = await Order_Detail.findAll({
      where: {
        id_orden: id,
      },
      include: [
        {
          model: Product,
          as: "productos",
          attributes: ["nombre", "precio", "descripcion", "imagen"],
        },
      ],
    });

    if (orderDetails.length === 0) {
      return res
        .status(404)
        .json({ msg: `El detalle de la orden no ha sido encontrado` });
    }

    res.status(200).json(orderDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear detalle de orden
orderDetail.post("/createOrderDetail", async (req, res) => {
  const { id_orden, id_producto, cantidad } = req.body;

  try {
    const newOrderDetail = await Order_Detail.create({
      id_orden,
      id_producto,
      cantidad,
    });

    res.status(200).json("El detalle de la orden ha sido creado correctamente");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar detalle de orden
orderDetail.put("/updateOrderDetail/:id", async (req, res) => {
  const { id } = req.params;
  const { id_orden, id_producto, cantidad } = req.body;

  try {
    const orderDetail = await Order_Detail.findByPk(id);

    if (!orderDetail) {
      return res
        .status(404)
        .json("El detalle de la orden no ha sido encontrado");
    }

    await orderDetail.update({ id_orden, id_producto, cantidad });

    res
      .status(200)
      .json("El detalle de la orden ha sido actualizado correctamente");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar detalle de orden
orderDetail.delete("/deleteOrderDetail/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrderDetail = await Order_Detail.destroy({ where: { id } });

    if (deletedOrderDetail === 0) {
      return res.status(404).json("El detalle de la orden no existe");
    }

    res
      .status(200)
      .json(
        `El detalle de la orden con el ID ${id} ha sido eliminado correctamente`
      );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default orderDetail;

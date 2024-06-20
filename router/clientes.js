import { Router } from "express";
import { Client } from "../relaciones/relaciones.js";

const client = Router();
//CRUD
// Consultar todos los clientes
client.get("/consult-allClients", async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Consultar cliente por ID
client.get("/consultClient/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(404).json({ msg: `El cliente no ha sido encontrado` });
    }

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear cliente
client.post("/createClient", async (req, res) => {
  const { nombre, correo, telefono } = req.body;

  try {
    const newClient = await Client.create({ nombre, correo, telefono });

    res.status(200).json("El cliente ha sido creado correctamente");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar cliente
client.put("/updateClient/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, telefono } = req.body;

  try {
    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(404).json("El cliente no ha sido encontrado");
    }

    await client.update({ nombre, correo, telefono });

    res.status(200).json("El cliente ha sido actualizado correctamente");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar cliente
client.delete("/deleteClient/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedClient = await Client.destroy({ where: { id } });

    if (deletedClient === 0) {
      return res.status(404).json("El cliente no existe");
    }

    res
      .status(200)
      .json(`El cliente con el ID ${id} ha sido eliminado correctamente`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default client;

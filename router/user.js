import { Router } from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

const user = Router();
//CRUD
//consultar todos los usuarios
user.get("/consult-allUser", async (req, res) => {
  const usuario = await User.findAll();
  res.json(usuario);
});

//consultar usuario por ID
user.get("/consultUser/:id", async (req, res) => {
  const { id } = req.params;

  const usuario = await User.findOne({
    where: {
      id,
    },
  });

  if (!usuario) {
    res.status(404).json({ msg: `El usuario no ha sido encontrado` });
  }

  res.status(200).json(usuario);
});

//guardar usuario
user.post("/saveUser", async (req, res) => {
  const { documento, nombres, correo, contrasena, id_rol } = req.body;
  const usuarioExiste = await User.findOne({ where: { correo } });
  if (usuarioExiste) {
    res.status(400).json("El usuario ya existe");
  }

  const hashedPassword = await bcrypt.hash(contrasena, 10);

  const nuevoUsuario = await User.create({
    documento,
    nombres,
    correo,
    contrasena: hashedPassword,
    contraseVista: contrasena,
    id_rol,
  });

  res.status(200).json("El usuario ha sido creado correctamente");
});

//actualizar usuario
user.put("/updateUser", async (req, res) => {
  const { id, documento, nombres, correo, contrasena, id_rol } = req.body;

  const hashedPassword = await bcrypt.hash(contrasena, 10);

  const nuevoUsuario = await User.update(
    {
      documento,
      nombres,
      correo,
      contrasena: hashedPassword,
      contraseVista: contrasena,
      id_rol,
    },
    { where: { id } }
  );

  res.status(200).json("El usuario ha sido actualizado correctamente");
});

//Eliminar usuario
user.delete("/deleteUser/:id", async (req, res) => {
  const { id } = req.params;

  const eleiminarUsuario = await User.destroy({ where: { id } });
  if (!eleiminarUsuario) {
    res.status(400).json("El usuario no existe");
  }

  res
    .status(200)
    .json(`El usuario con el id ${id} ha sido eliminado correctamente`);
});

export default user;

import { Router } from "express";
import Rol from '../models/rol.js';

const rol = Router();

//CRUD
// Consultar todos los roles
rol.get('/consult-allRoles', async (req, res) => {
    try {
        const roles = await Rol.findAll();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Consultar rol por ID
rol.get('/consultRol/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const rol = await Rol.findByPk(id);

        if (!rol) {
            return res.status(404).json({ msg: `El rol no ha sido encontrado` });
        }

        res.status(200).json(rol);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Guardar rol
rol.post('/saveRol', async (req, res) => {
    const { nombre } = req.body;

    try {
        const nuevoRol = await Rol.create({ nombre });

        res.status(200).json('El rol ha sido creado correctamente');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar rol
rol.put('/updateRol/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    try {
        const rol = await Rol.findByPk(id);

        if (!rol) {
            return res.status(404).json('El rol no ha sido encontrado');
        }

        await rol.update({ nombre });

        res.status(200).json('El rol ha sido actualizado correctamente');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default rol;

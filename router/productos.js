import { Router } from "express";
import Product from '../models/productos.js'

const product = Router()
//CRUD
//consultar todos los productos
product.get('/consult-allProducts', async (req, res) => {
    try {
        const productos = await Product.findAll()
        res.status(200).json(productos)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//consultar producto por ID
product.get('/consultProduct/:id', async (req, res) => {
    const { id } = req.params

    try {
        const producto = await Product.findByPk(id)

        if (!producto) {
            return res.status(404).json({ msg: `El producto no ha sido encontrado` })
        }

        res.status(200).json(producto)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//guardar producto
product.post('/saveProduct', async (req, res) => {
    const { nombre, descripcion, precio, imagen } = req.body

    try {
        const nuevoProducto = await Product.create({ nombre, descripcion, precio, imagen })

        res.status(200).json('El producto ha sido creado correctamente')
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//actualizar producto
product.put('/updateProduct/:id', async (req, res) => {
    const { id } = req.params
    const { nombre, descripcion, precio, imagen } = req.body

    try {
        const producto = await Product.findByPk(id)

        if (!producto) {
            return res.status(404).json('El producto no ha sido encontrado')
        }

        await producto.update({ nombre, descripcion, precio, imagen })

        res.status(200).json('El producto ha sido actualizado correctamente')
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//Eliminar producto
product.delete('/deleteProduct/:id', async (req, res) => {
    const { id } = req.params

    try {
        const eliminarProducto = await Product.destroy({ where: { id } })

        if (eliminarProducto === 0) {
            return res.status(404).json('El producto no existe')
        }

        res.status(200).json(`El producto con el id ${id} ha sido eliminado correctamente`)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default product

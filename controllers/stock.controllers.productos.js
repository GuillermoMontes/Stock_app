import { getConnection, sql } from "../database/conexion.js";
import querys from "../database/querys.js";

export const getProductos = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getTodosProductos);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const crearProducto = async (req, res) => {
  try {
    const { nombre, precio, descripcion, cantidad, categoria_id } = req.body;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("nombre", sql.VarChar, nombre)
      .input("precio", sql.Float, precio)
      .input("descripcion", sql.VarChar, descripcion)
      .input("cantidad", sql.Int, cantidad)
      .input("categoria_id", sql.Int, categoria_id)
      .query(querys.crearProducto);

    res.json({ nombre, precio, descripcion, precio, cantidad, categoria_id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actProducto = async (req, res) => {
  try {
    const { nombre, precio, descripcion, cantidad, categoria_id } = req.body;
    if (!nombre || !precio || !descripcion || !cantidad || !categoria_id) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .input("nombre", sql.VarChar, nombre)
      .input("precio", sql.Float, precio)
      .input("descripcion", sql.VarChar, descripcion)
      .input("cantidad", sql.Int, cantidad)
      .input("categoria_id", sql.Int, categoria_id)
      .query(querys.actProd);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({
      id: req.params.id,
      nombre: nombre,
      precio: precio,
      descripcion: descripcion,
      cantidad: cantidad,
      categoria_id: categoria_id,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Id", sql.Int, id)
      .query(querys.elimProd);

    if (result.rowsAffected[0] === 0) {
      res.status(404).json({ message: "Producto no encontrado" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Id", sql.Int, id)
      .query(querys.getProd);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

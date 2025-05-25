import { getConnection, sql } from "../database/conexion.js";
import querys from "../database/querys.js";

// categorias

export const getCategorias = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getCategorias);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const crearCategoria = async (req, res) => {
  try {
    const { nombre } = req.body;
    const pool = await getConnection();
    await pool
      .request()
      .input("nombre", sql.VarChar, nombre)
      .query(querys.crearCategoria);

    res.json({ nombre });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actCategoria = async (req, res) => {
  try {
    if (!req.body.nombre) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .input("nombre", sql.VarChar, req.body.nombre)
      .query(querys.actCateg);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Categoria no encontrada" });
    }

    res.json({
      id: req.params.id,
      nombre: req.body.nombre,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const eliminarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Id", sql.Int, id)
      .query(querys.elimCategoria);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Categoria no encontrada" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Id", sql.Int, id)
      .query(querys.getCateg);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Categoria no encontrada" });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// productos

export const getProductos = (req, res) => {
  res.send("Mostrando todos los productos");
};

export const crearProducto = (req, res) => {
  res.send("Crear producto");
};

export const actProducto = (req, res) => {
  res.send("actualizando producto");
};

export const eliminarProducto = (req, res) => {
  res.send("Eliminando producto");
};

export const getProducto = (req, res) => {
  res.send("Mostrando un producto");
};

//filtro de producto
export const getProdbyCat = (req, res) => {
  res.send("Filtrando producto por categoria");
};

//usuarios

export const getUsuarios = (req, res) => {
  res.send("Mostrando todos los usuarios");
};

export const postUsuarios = (req, res) => {
  res.send("Login de usarios");
};

//movimientos de stock

export const getMovimientos = (req, res) => {
  res.send("Mostrando todos los movimientos de stock");
};

export const regMovimientos = (req, res) => {
  res.send("registrando entrada o salida de stock");
};

export const getMovimiento = (req, res) => {
  res.send("Mostrando un movimiento del stock");
};

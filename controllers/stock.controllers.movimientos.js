import { getConnection, sql } from "../database/conexion.js";
import querys from "../database/querys.js";

export const getMovimientos = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getTodosMov);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const regMovimientos = async (req, res) => {
   try {
    const { producto_id, cantidad, tipo, usuario_id } = req.body;

    if (!producto_id || !cantidad || !tipo) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const pool = await getConnection();

    // Verifico si el stock actual permite el movimiento
    if (tipo === "salida") {
      const result = await pool
        .request()
        .input("producto_id", sql.Int, producto_id)
        .query("SELECT cantidad FROM productos WHERE id = @producto_id");

      const stockActual = result.recordset[0]?.cantidad;

      if (stockActual === undefined) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }

      if (stockActual < cantidad) {
        return res.status(400).json({
          message: `No hay suficiente stock para realizar la salida. Stock disponible: ${stockActual}`,
        });
      }
    }

    // Registro el movimiento
    await pool
      .request()
      .input("producto_id", sql.Int, producto_id)
      .input("cantidad", sql.Int, cantidad)
      .input("tipo", sql.VarChar, tipo)
      .input("usuario_id", sql.Int, usuario_id || null)
      .query(querys.regMov);

    // Actualizar el stock
    const signo = tipo === "entrada" ? "+" : "-";

    await pool
      .request()
      .input("producto_id", sql.Int, producto_id)
      .input("cantidad", sql.Int, cantidad)
      .query(`
        UPDATE productos
        SET cantidad = cantidad ${signo} @cantidad
        WHERE id = @producto_id
      `);

    res.status(201).json({ message: "Movimiento registrado y stock actualizado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMovimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Id", sql.Int, id)
      .query(querys.getMov);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Movimiento no encontrado" });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

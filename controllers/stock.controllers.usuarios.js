import { getConnection, sql } from "../database/conexion.js";
import querys from "../database/querys.js";

export const getUsuarios = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getUsers);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postUsuarios = async (req, res) => {
  try {
    const { nombre, email } = req.body;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("nombre", sql.VarChar, nombre)
      .input("email", sql.VarChar, email)
      .query(querys.crearUsuario);

    res.json({ nombre, email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

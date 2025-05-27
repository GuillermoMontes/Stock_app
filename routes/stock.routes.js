import { Router } from "express";
import {
  getCategorias,
  crearCategoria,
  actCategoria,
  eliminarCategoria,
  getCategoria,
} from "../controllers/stock.controllers.categorias.js";
import {
  getProductos,
  crearProducto,
  actProducto,
  eliminarProducto,
  getProducto,
} from "../controllers/stock.controllers.productos.js";
import {
  getUsuarios,
  postUsuarios,
} from "../controllers/stock.controllers.usuarios.js";
import {
  getMovimientos,
  regMovimientos,
  getMovimiento,
} from "../controllers/stock.controllers.movimientos.js";

const router = Router();

//enpoints categorias
router.get("/api/categorias", getCategorias);
router.post("/api/categorias", crearCategoria);
router.put("/api/categorias/:id", actCategoria);
router.delete("/api/categorias/:id", eliminarCategoria);
router.get("/api/categorias/:id", getCategoria);

//endpoints productos
router.get("/api/productos", getProductos);
router.post("/api/productos", crearProducto);
router.put("/api/productos/:id", actProducto);
router.delete("/api/productos/:id", eliminarProducto);
router.get("/api/productos/:id", getProducto);

//enpoints usuarios
router.get("/api/usuarios", getUsuarios);
router.post("/api/usuarios", postUsuarios);

//endpoints mov stock
router.get("/api/mov-stock", getMovimientos);
router.post("/api/mov-stock", regMovimientos);
router.get("/api/mov-stock/:id", getMovimiento);

export default router;

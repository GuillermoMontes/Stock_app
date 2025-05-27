export default {
  // querys categorias
  getCategorias: "SELECT * FROM categorias",
  crearCategoria: "INSERT INTO categorias (nombre) VALUES (@nombre)",
  elimCategoria: "DELETE FROM categorias WHERE Id = @Id",
  getCateg: "SELECT * FROM categorias WHERE Id = @id",
  actCateg: "UPDATE categorias SET nombre = @nombre WHERE id = @id",

  //querys  productos
  getTodosProductos: "SELECT * FROM productos",
  crearProducto:
    "INSERT INTO productos (nombre,precio,descripcion,cantidad,categoria_id) VALUES (@nombre, @precio, @descripcion, @cantidad, @categoria_id)",
  getProd: "SELECT * FROM productos WHERE Id = @id",
  actProd:
    "UPDATE productos SET nombre = @nombre, precio= @precio, descripcion = @descripcion, cantidad= @cantidad,categoria_id = @categoria_id WHERE Id = @id",
  elimProd: "DELETE FROM productos WHERE Id = @id",

  //querys usuarios
  getUsers: "SELECT * FROM usuarios",
  crearUsuario: "INSERT INTO usuarios (nombre,email) VALUES (@nombre, @email)",

  //querys movimientos de stock
  getTodosMov: "SELECT * FROM movimientos_stock",
  getMov: "SELECT * FROM movimientos_stock WHERE Id = @id",
  regMov: `INSERT INTO movimientos_stock (producto_id, cantidad, tipo, usuario_id)
    VALUES (@producto_id, @cantidad, @tipo, @usuario_id)`,
};

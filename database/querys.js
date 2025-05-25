export default {
    getCategorias: "SELECT * FROM categorias",
    crearCategoria: "INSERT INTO categorias (nombre) VALUES (@nombre)",
    elimCategoria: "DELETE FROM categorias WHERE Id = @Id",
    getCateg: "SELECT * FROM categorias WHERE Id = @id",
    actCateg: "UPDATE categorias SET nombre = @nombre WHERE id = @id"

}
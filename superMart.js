const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
 
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
 
const port = 3000;
 
mongoose.connect("mongodb://127.0.0.1:27017/supermart", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
const UsuarioSchema = new mongoose.Schema({
    email: { type: String, required: true },
    senha: { type: String }
});
 
const Usuario = mongoose.model("Usuario", UsuarioSchema);
 
const ProdutoMercadoSchema = new mongoose.Schema({
    id_produtomercado: { type: String, required: true },
    descricao: { type: String},
    marca: { type: String},
    dataValidade: { type: Date},
    quantidadeEstoque: { type: Number}
});
 
const ProdutoMercado = mongoose.model("ProdutoMercado", ProdutoMercadoSchema);
 
app.post("/cadastrousuario", async (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;
 
    const usuario = new Usuario({
      email: email,
      senha: senha
    });
 
    try {
      const newUsuario = await usuario.save();
      res.json({ error: null, msg: "Cadastro concluído", UsuarioId: newUsuario._id });
    } catch (error) {}
});
 
app.post("/cadastroprodutomercado", async (req, res) => {
    const id_produtomercado = req.body.id_produtomercado;
    const descricao = req.body.descricao;
    const marca = req.body.marca;
    const dataValidade = req.body.dataValidade;
    const quantidadeEstoque = req.body.quantidadeEstoque;
 
    const produtoMercado = new ProdutoMercado({
      id_produtomercado: id_produtomercado,
      descricao: descricao,
      marca: marca,
      dataValidade: dataValidade,
      quantidadeEstoque: quantidadeEstoque
    });
 
    try {
      const newProdutoMercado = await produtoMercado.save();
      res.json({ error: null, msg: "Cadastro ok", ProdutoMercadoId:newProdutoMercado._id });
    } catch (error) {}
 
  });
 
 
app.get("/", async (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
 
app.get("/cadastropessoa", async(req, res)=>{
  res.sendFile(__dirname + "/cadastropessoa.html")
})

app.get("/cadastroprodutomercado", async(req, res)=>{
  res.sendFile(__dirname + "/cadastroprodutomercado.html")
})
 
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/dbsupermart", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UsuarioSchema = new mongoose.Schema({
    email: { type: String, required: true },
    senha: { type: String, required: true }
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

const produto = new mongoose.Schema({
    id_produtomercado: { type: String, required: true },
    descricao: { type: String},
    marca: { type: String},
    dataValidade: { type: Date},
    quantidadeEstoque: { type: Number}
});

const produto= mongoose.model("Produto", ProdutoSchema);

app.post("/cadastroUsuario", async (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;
  
    if(email == null || senha == null){
      return res.status(400).json({error : "Por favor, preencha todos os campos"});
    }
  
    const emailExiste = await Usuario.findOne({email : email});
  
    if(emailExiste){
      return res.status(400).json({error : "O email já está em uso"});
    }
  
    const usuario = new Usuario({
      email: email,
      senha: senha
    });
  
    try {
      const newUsuario = await usuario.save();
      res.json({ error: null, msg: "Cadastro concluído", UsuarioId: newUsuario._id });
    } catch (error) {}
});

app.post("/cadastroProduto", async (req, res) => {
    const id_produtomercado = req.body.id_produtomercado;
    const descricao = req.body.descricao;
    const marca = req.body.marca;
    const dataValidade = req.body.dataValidade;
    const quantidadeEstoque = req.body.quantidadeEstoque;
  
    if(id_produtomercado == null || descricao == null || marca == null || dataValidade == null || quantidadeEstoque == null){
      return res.status(400).json({error : "Por favor, preencha todos os campos"});
}
    const produtoMercado = new produtoMercado({
      id_produtomercado: id_produtomercado
      descricao: descricao,
      marca: marca,
      dataValidade: dataValidade,
      quantidadeEstoque: quantidadeEstoque
    });
}
  

app.get("/", async (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/cadastroUsuario", async (req, res) => {
    res.sendFile(__dirname + "/usuario.html");
});

app.get("/cadastroProduto", async (req, res) => {
    res.sendFile(__dirname + "/produto.html");
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
  
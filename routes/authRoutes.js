const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/usuario.js");


router.post("/usuario", async(req, res)=>{

const email = req.body.email;
const senha = req.body.senha;



if (email ==null || password == null){
return res.status(400).json({error : "Por favor, preencha todos os campos"});
}
});

module.exports = router;

const Produtos = require("../models/produto.js");

router.post("/produtos", async(req, res)=>{

    const id_produto = req.body.id;
    const descriçao = req.body.descriçao;
    const marca = req.body.marca; 
    const validade = req.body.validade;
    const estoque = req.body.estoque;
    

    
    if (email ==null || password == null){
    return res.status(400).json({error : "Por favor, preencha todos os campos"});
    }
    });
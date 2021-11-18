const express = require("express"); 
const app = express();  
require('dotenv').config();

app.use(express.json());  

const Conn = require("./API/models/conn/index"); 
Conn(); 

app.get('/', (req,res) => {
    res.status(200).json({message:"Bem vindo, Desafio Técnico em BKE na Blue!!!"});
});

const usuariosModel = require("./API/routers/usuarios"); 
app.use("/users", usuariosModel);

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
});
const mongoose = require("mongoose"); 

const usuariosModel = new mongoose.Schema({ 
    nome: { type: String, required: true }, 
    user: { type: String, required: true }, 
    password: { type: String, required: true }, 
    dataCriacao: { type: Date, default: Date.now } 
});

const Usuario = mongoose.model("usuarios", usuariosModel); 

module.exports = Usuario; 



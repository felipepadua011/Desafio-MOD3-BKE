const Usuario = require('../models/usuario');


exports.adicionar = async (req,res) => {
    try{
        if (!req.body.nome){
            res.status(400).json({message: "Nome não definido"});
            return;
        } else if (!req.body.user){
            res.status(400).json({message: "Nome de usuario não definido"});
            return;
        } else if (!req.body.password){
            res.status(400).json({message: "Senha indefinida"});
            return;
        };
        const result = await Usuario.create(req.body)
        return res.status(201).json(result)
    } catch(err){
        console.error(err.message)
        return res.status(400).json({message:"ERRO"})
    };
};

exports.listarTudo = async (req,res) => {
    try{
        const result = await Usuario.find({})
        return res.status(200).json(result)
    } catch(err){
        console.error(err.message)
        return res.status(400).json({message:"ERRO"})
    }
};

exports.buscaPorId = async (req,res) => {
    try{
        if(req.params.id.length != 24){
            res.status(400).json({message: "Parâmetro incorreto"});
            return
        }
        const result = await Usuario.findById({_id:req.params.id})
        return res.status(200).json(result)
    } catch(err){
        console.error(err.message)
        return res.status(400).json({message:"ERRO"})
    }
};

exports.apagar = async (req,res) => {
    try{
        if(req.params.id.length != 24){
            res.status(400).json({message: "Parâmetro incorreto"});
            return
        }
        await Usuario.findByIdAndDelete({_id:req.params.id})
        return res.status(200).json({message:"Deletado com sucesso"})
    } catch(err){
        console.error(err.message)
        return res.status(400).json({message:"ERRO"})
    }
};

exports.atualizar = async (req,res) => {
    try{
        if(req.params.id.length != 24){
            res.status(400).json({message: "Parâmetro incorreto"});
            return
        } 
        if (!req.body.nome){
            res.status(400).json({message: "Nome não definido"});
            return;
        } else if (!req.body.user){
            res.status(400).json({message: "Nome de usuario não definido"});
            return;
        } else if (!req.body.password){
            res.status(400).json({message: "Senha indefinida"});
            return;
        };
        const result = await Usuario.findByIdAndUpdate({_id:req.params.id}, req.body)
        return res.status(200).json({message:"Atualizado com sucesso"})
    } catch(err){
        console.error(err.message)
        return res.status(400).json({message:"ERRO"})
    };
};
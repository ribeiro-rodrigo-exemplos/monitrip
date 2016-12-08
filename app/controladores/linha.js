let mongoose = require('mongoose');

module.exports = function(){

    let controlador = {};

    controlador.obter = (req,res) =>{

        let numero = req.query.numero; 
        let dataAtualizacao = req.query.dataAtualizacao;
        let clienteId = 209;

        let linha = mongoose.model('Linha');

        let filtro = {clienteId:clienteId};

        if(numero)
            filtro.numero = numero;
        
        if(dataAtualizacao)
            filtro.atualizacao = {"$gte":new Date(dataAtualizacao)};

        linha.find(filtro,{numero:1,descr:1,"trajetos.nome":1,"trajetos.sentido":1,atualizacao:1},function(err,linhas){
            
            if(err){
                res.status(500)
                    .send('Ocorreu um erro ao processar a requisição solicitada, tente novamente mais tarde');
                return;
            }

            if(!linhas || linhas.length == 0){
                res.sendStatus(204);
                return;
            }

            if(numero && !dataAtualizacao && linhas.length > 0 || numero && dataAtualizacao && linhas.length)
                res.json(linhas[0]);
            else
                res.json(linhas);
        }); 
    }

    return controlador;
}
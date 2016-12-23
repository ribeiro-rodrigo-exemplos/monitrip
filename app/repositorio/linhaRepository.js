let GenericRepository = require('./genericRepository')();
let mongoose = require('mongoose');

class LinhaRepository extends GenericRepository{
    constructor(){
        super();
        this._linha = mongoose.model('Linha');
    }

    filtrarLinhas(clienteId,numero,dataAtualizacao){
        let criteria = {};

        if(clienteId && !numero && !dataAtualizacao)
            criteria.clienteId = clienteId;
                
        if(dataAtualizacao)
            criteria.atualizacao = {"$gte": new Date(dataAtualizacao)};

        if(numero)
            criteria.numero = numero;

        return this.prepareResult(criteria,{numero:1,descr:1,"trajetos.nome":1,"trajetos.sentido":1, "_id":0});
    }

    prepareResult(criteria,fields){
        return new Promise((resolve,reject) => {
            this._linha.find(criteria,fields,(erro,result) => this.prepare(erro,result,resolve,reject));
        });
    }
}

module.exports = () => LinhaRepository;


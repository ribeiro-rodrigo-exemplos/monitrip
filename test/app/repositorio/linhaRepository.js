let GenericRepository = require('./genericRepository')();

class LinhaRepository extends GenericRepository{
    constructor(app){
        super(app.modelo.linha);
    }

    filtrarLinhas(clienteId,numero,dataAtualizacao){
        let criteria = {};

        if(clienteId && !numero && !dataAtualizacao)
            criteria.clienteId = clienteId;
                
        if(dataAtualizacao)
            criteria.atualizacao = {gte:new Date(dataAtualizacao)};

        if(numero){
            criteria.numero = numero;
            return this.prepareUniqueResult(criteria);
        }

        return this.prepareResult(criteria);
    }
}

let repository;

module.exports = (app) => {
    if(!repository)
        repository = new LinhaRepository(app);
    
    return repository;
}
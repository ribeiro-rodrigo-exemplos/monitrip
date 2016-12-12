let GenericRepository = require('./genericRepository')();

class MotoristaRepository extends GenericRepository{
    constructor(app){
        super(app.modelo.motorista);
    }

    filtrarMotoristas(clienteId,cpf,dataAtualizacao){
        let criteria = {};

        if(clienteId && !cpf && !dataAtualizacao)
            criteria["id_cliente"] = clienteId;
                
        if(dataAtualizacao)
            criteria["dt_atualizacao"] = {gte:new Date(dataAtualizacao)};

        if(cpf){
            criteria["nm_cpf"] = cpf;
            return this.prepareUniqueResult(criteria);
        }

        return this.prepareResult(criteria);   
    }
}

let repository;

module.exports = app => {
    if(!repository)
        repository = new MotoristaRepository(app);
    
    return repository;
}


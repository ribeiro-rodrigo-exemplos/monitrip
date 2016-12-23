let GenericRepository = require('./genericRepository')();

class MotoristaRepository{
    constructor(app){
        this._Motorista = app.modelo.motorista;
    }

    filtrarMotoristas(clienteId,cpf,dataAtualizacao){

        let criteria = {};

        if(clienteId)
            criteria["id_cliente"] = clienteId;

        if(dataAtualizacao)
            criteria["dt_atualizacao"] = {$gte:dataAtualizacao}; 

        if(cpf)
            criteria["nm_cpf"] = cpf;

        return new Promise((resolve,reject) =>{
            this._Motorista.findAll({where:criteria,attributes:['dt_atualizacao','nm_cpf']})
                            .then(result => resolve(result))
                            .catch(erro => reject(erro));
        });  
    }
}

module.exports = app =>  new MotoristaRepository(app);



let GenericRepository = require('./genericRepository')();

class VeiculoRepository extends GenericRepository{
    
    constructor(app){
        super(app.modelo.veiculo);
    }

    filtrarVeiculos(idCliente,placa,dataAtualizacao){
        
        let criteria = {};
                
        if(dataAtualizacao)
            criteria["dt_atualizacao"] = {gte:new Date(dataAtualizacao)};
        
        if(idCliente && !dataAtualizacao && !placa)
            criteria["id_cliente"] = idCliente; 

        if(placa){
            criteria["vl_placa"] = placa;
            return this.prepareUniqueResult(criteria);
        }

        return this.prepareResult(criteria);  
    }
}

let repository;

module.exports = app => {
    if(!repository)
        repository = new VeiculoRepository(app);

    return repository;
}
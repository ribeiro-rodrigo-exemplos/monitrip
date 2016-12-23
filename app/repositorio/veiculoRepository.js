
let GenericRepository = require('./genericRepository')();

class VeiculoRepository{
    
    constructor(app){
        this._Veiculo = app.modelo.veiculo;
    }

    filtrarVeiculos(idCliente,placa,dataAtualizacao){

       let filtro = {};
       
       if(idCliente && !placa && !dataAtualizacao)
            filtro["id_cliente"] = idCliente; 
        
        if(dataAtualizacao)
            filtro["dt_atualizacao"] = {$gte:dataAtualizacao}; 

        if(placa)
            filtro["vl_placa"] = placa; 

        return new Promise((resolve,reject) => {
            this._Veiculo.findAll({where:filtro,attributes:['vl_placa','fl_ativo']})    
                            .then(result => resolve(result.length ? result:null))
                            .catch(erro => reject(erro))
        });
    }
}

module.exports = app => new VeiculoRepository(app);


class VeiculoDAO{
    constructor(connection){
        this.connection = connection;
    }

    listarVeiculosDoCliente(idCliente){
        let query = `select * from veiculo where id_cliente='${idCliente}'`;
        return this._prepareQuery(query);
    }

    obterVeiculoPelaPlaca(placa){
        
        let query = `select * from veiculo where vl_placa='${placa}'`;
        return this._prepareQueryUniqueResult(query);
    }

    listarVeiculosPorDataAtualizacao(data,idCliente){
        
        let query = `select * from veiculo where dt_atualizacao>='${data}'`;
        return this._prepareQuery(query);
    }

    listarVeiculosPorPlacaEDataAtualizacao(placa,data){
        let query = `select * from veiculo where vl_placa='${placa}' and dt_atualizacao>='${data}'`;
        return this._prepareQueryUniqueResult(query);
    }

    _prepareQuery(query){
        
        return new Promise((resolve,reject) => {
            this.connection.query(query,(erro,retorno) => {
            if(erro)
                reject(erro);
            else
                resolve(!retorno || !retorno.length ? null:retorno);
            });
        });
    }

    _prepareQueryUniqueResult(query){
        return new Promise((resolve,reject) => {
            this.connection.query(query,(erro,retorno) => {

                if(erro)
                    reject(erro);
                else{
                    resolve(retorno != undefined && retorno.length > 0 ? retorno[0]:null);
                }      
            });
        })
    }
}

module.exports = function(){
    return VeiculoDAO;
}
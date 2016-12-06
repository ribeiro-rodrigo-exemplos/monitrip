class VeiculoDAO{
    constructor(connection){
        this.connection = connection;
    }

    listarVeiculos(callback){
        return new Promise((resolve,reject) => {

            this.connection.query('select * from veiculo',(erro,retorno) => {
                console.log(retorno);
                if(erro)
                    reject(erro);
                else
                    resolve(retorno);
            });
        });
    }
}

module.exports = function(){
    return VeiculoDAO;
}
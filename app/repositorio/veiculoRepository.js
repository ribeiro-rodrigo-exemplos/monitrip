
let GenericRepository = require('./genericRepository')();

class VeiculoRepository extends GenericRepository{
    
    constructor(connection){
        super(connection);
    }

    filtrarVeiculos(idCliente,placa,dataAtualizacao){
              
        if(!idCliente || dataAtualizacao || placa)
            idCliente = `id_cliente like '%' or id_cliente is null`; 
        else
            idCliente = `id_cliente=${idCliente}`;
        
        if(!dataAtualizacao)
            dataAtualizacao = `dt_atualizacao >= '0000-00-00' or dt_atualizacao is null`
        else
            dataAtualizacao = `dt_atualizacao >= '${dataAtualizacao}'`

        if(!placa)
            placa = `vl_placa like '%' or vl_placa is null`
        else
            placa = `vl_placa='${placa}'`;

        const query = `select id_veiculo, cod_veiculo, fl_ativo, vl_placa, dt_atualizacao, id_cliente 
                       from veiculo where (${dataAtualizacao}) and (${idCliente}) and (${placa})`

        return this.prepareResult(query);  
    }
}

module.exports = () => VeiculoRepository;


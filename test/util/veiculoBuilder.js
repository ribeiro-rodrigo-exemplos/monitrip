class VeiculoBuilder{
    constructor(connection){
        this._connection = connection;
    }

    cliente(cliente){
        this._cliente = cliente;
        return this;
    }

    descricaoDoTipo(desc){
        this._descricaoTipo = desc;
        return this;
    }

    placa(placa){
        this._placa = placa;
        return this;
    }

    ativo(ativo){
        this._ativo = ativo ? 1:0;
        return this;
    }

    dataAtualizacao(data){
        this._dataAtualizacao = data;
        return this;
    }
    
    construir(done){
        this._connection.query(`insert into veiculo_tipo(ds_descricao) values('${this._descricaoTipo}')`,(erroTipoVeiculo,insertTipoVeiculo) =>{
            this._connection.query(`insert into cliente(nome,nm_worker,ds_timezone,nm_worker_sinotico) values ('${this._cliente}',4,'America/Sao_Paulo',2)`,(erroCliente,insertCliente) => {
                this._connection.query(`insert into veiculo(vl_placa,fl_ativo,id_veiculo_tipo,fl_excluido,dt_atualizacao,id_cliente) values('${this._placa}',${this._ativo},${insertTipoVeiculo.insertId},0,'${this._dataAtualizacao}','${insertCliente.insertId}')`,(erroVeiculo,inserirVeiculo) => {
                        this._connection.query(`select cod_veiculo,dt_atualizacao,fl_ativo,id_cliente,id_veiculo,vl_placa from veiculo where id_veiculo=${inserirVeiculo.insertId}`,(err,result) => {
                        
                           if(result && result.length > 0){
                               this._veiculo = result[0];
                           }
                           else
                            this._veiculo = null;
                            
                           done();
                        });
                    });
                });
            });
    }

    get veiculo(){
        return this._veiculo;
    }
}

module.exports = VeiculoBuilder;
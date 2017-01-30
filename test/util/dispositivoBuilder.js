class DispositivoBuilder{
    constructor(connection){
        this._connection = connection;
    }

    cliente(cliente){
        this._cliente = cliente;
        return this;
    }

    imei(imei){
        this._imei = imei;
        return this;
    }

    descricao(descricao){
        this._descricao = descricao;
        return this;
    }

    excluido(excluido){
        this._excluido = excluido ? 1:0;
        return this;
    }

    get dispositivo(){
        return this._dispositivo;
    }

    construir(done){
        this._connection.query(`insert into cliente(nome,nm_worker,ds_timezone,nm_worker_sinotico) 
        values ('${this._cliente}',4,'America/Sao_Paulo',2)`,(erroCliente,insertCliente) => {
            this._connection.query(`insert into dispositivo(nu_imei,tx_descricao,id_cliente,fl_excluido) values('${this._imei}','${this._descricao}',${insertCliente.insertId},${this._excluido})`,
            (erroDispositivo,insertDispositivo) => {
                this._connection.query(`select nu_imei,tx_descricao,id_cliente,fl_excluido from dispositivo where id_dispositivo=${insertDispositivo.insertId}`,(erro,result) => {
                    this._dispositivo = result[0];
                    done();
                });
            });
        });
    }
}

module.exports = DispositivoBuilder;
let util = require('../util/util.js')();

class DispositivoRepository{
    constructor(connection){
        this.connection = connection;
    }

    consultarImei(cliente, imei, licenca){
        return new Promise((resolve,reject) => {
            this.connection.query(`select * from dispositivo where id_cliente = ${cliente} and nu_imei = '${imei}'` ,(erro,retorno) => {
                if(erro){
                    reject(erro);
                }else{
                    let dispositivo = retorno[0];

                    if (dispositivo){
                        if(dispositivo.fl_excluido == 0){
                            let mensagem = {"param": "imei", "msg": "imei já cadastrado", "value": "" };
                            reject(mensagem);
                        }else{
                            this.verificaLicenca(cliente, licenca)
                                .then(licenca => {
                                    this.atualizarImei(cliente, imei)
                                        .then(retorno2 => {
                                            resolve(retorno2);
                                        }).catch (erro => {
                                            console.log(erro)  
                                        });
                                });                            
                        }
                        
                    }
                    resolve(retorno);
                }
            });  
        });
    }

    atualizarImei(cliente, imei){
        return new Promise((resolve,reject) => {
            this.connection.query(`update dispositivo set fl_excluido = ${util.excluido.NAO} where nu_imei = '${imei}'` ,(erro,retorno) => {
                if(erro){
                    reject(erro);
                }else{                    
                    resolve("Alterado com sucesso");
                }
            });  
        });
    }

    verificaLicenca(cliente, licenca){
        return new Promise((resolve,reject) => {
            this.connection.query(`select count(*) from dispositivo where id_cliente = ${cliente} and fl_excluido = 0` ,(erro,retorno) => {
                if(erro){
                    reject(erro);
                }else{
                    if(retorno[0]["count(*)"] >= licenca){
                        let mensagem = {"param": "licenca", "msg": "Atingiu o limite de licenças.", "value": "" };
                        reject(mensagem);
                    }
                    resolve(retorno);
                }
            });  
        });
    }

    cadastrar(dispositivo, licenca, cliente){
        return new Promise((resolve,reject) => {
            
            this.connection.query(`insert into dispositivo (nu_imei, tx_descricao, id_cliente, fl_excluido) values ('${dispositivo.imei}', '${dispositivo.descricao}', 
                                    ${cliente}, ${dispositivo.excluido})` ,(erro,retorno2) => {

                if(erro){
                    reject(erro);
                }else{
                    resolve("Salvo com sucesso");
                }
            
            });
        });
    }

    obterDispositivoHabilitadoPorImei(idCliente,imei){
        return new Promise((resolve,reject) => {
            this.connection.query('select * from dispositivo where id_cliente=? and nu_imei like ? and fl_excluido=0',[idCliente,imei],(erro,result) => {
                if(erro){
                    reject(erro);
                    return;
                }
                resolve(result.length == 0 ? null:result[0]);
            });
        });
    }
}

module.exports = () => DispositivoRepository;

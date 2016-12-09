let util = require('../util/util.js')();

class DispositivoDAO{
    constructor(connection){
        this.connection = connection;
    }

    consultarImei(cliente, imei, licenca){
        return new Promise((resolve,reject) => {
            this.connection.query(`select * from dispositivo where id_cliente = ${cliente} and nu_imei = ${imei}` ,(erro,retorno) => {
                if(erro){
                    reject(erro);
                }else{
                    let dispositivo = retorno[0];

                    if (dispositivo){
                        if(dispositivo.fl_excluido == 0){
                            reject(new Error("imei já cadastrado"));
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
            this.connection.query(`update dispositivo set fl_excluido = ${util.excluido.NAO} where nu_imei = ${imei}` ,(erro,retorno) => {
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
            this.connection.query(`select count(*) from dispositivo where id_cliente = ${cliente}` ,(erro,retorno) => {
                if(erro){
                    reject(erro);
                }else{
                    if(retorno[0]["count(*)"] >= licenca){
                        reject(new Error("Atingiu o limite de licenças."));
                    }
                    resolve(retorno);
                }
            });  
        });
    }

    
    cadastrar(dispositivo, licenca, cliente){
        return new Promise((resolve,reject) => {
            this.connection.query(`insert into dispositivo values (${dispositivo.imei}, '${dispositivo.descricao}', 
                                    ${cliente}, ${dispositivo.excluido})` ,(erro,retorno2) => {
                if(erro){
                    reject(erro);
                }else{
                    resolve("Salvo com sucesso");
                }
            
            });
        });
    }
}

module.exports = function(){
    return DispositivoDAO;
}

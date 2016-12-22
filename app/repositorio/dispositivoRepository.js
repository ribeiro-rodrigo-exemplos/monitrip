let util = require('../util/util.js')();

class DispositivoRepository{
    constructor(connection_zn4, connection_sso){
        this.connection_zn4 = connection_zn4;
        this.connection_sso = connection_sso;
    }

    consultarLicenca(cliente, funcionalidade){
        return new Promise((resolve, reject) => {
            this.connection_sso.query(`select nu_licenca from cliente_funcionalidade where id_cliente = ${cliente} and id_funcionalidade = ${funcionalidade}`, (erro, retorno) => {
                if(erro){
                    reject(erro);
                }else{
                    resolve(retorno[0]);
                }
            });
        });
    }
    
    consultarImei(cliente, imei){
        return new Promise((resolve,reject) => {
            this.connection_zn4.query(`select * from dispositivo where id_cliente = ${cliente} and nu_imei = '${imei}'` ,(erro,retorno) => {
                if(erro){
                    reject(erro);
                }else{
                    let dispositivo = retorno[0];

                    if (dispositivo){
                        if(dispositivo.fl_excluido == 0){
                            let mensagem = {"param": "imei", "msg": "imei já cadastrado", "value": "" };
                            reject(mensagem);
                        }else{
                            this.verificaLicenca(cliente)
                                .then((licenca) => {
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
            this.connection_zn4.query(`update dispositivo set fl_excluido = ${util.excluido.NAO} where nu_imei = '${imei}'` ,(erro,retorno) => {
                if(erro){
                    reject(erro);
                }else{                    
                    resolve("Alterado com sucesso");
                }
            });  
        });
    }

    verificaLicenca(cliente){
        return new Promise((resolve,reject) => {
            this.connection_zn4.query(`select count(*) from dispositivo where id_cliente = ${cliente} and fl_excluido = 0` ,(erro,retorno) => {
                if(erro){
                    reject(erro);
                }else{
                    this.consultarLicenca(cliente, util.funcionalidade.MONITRIP)
                        .then(licenca => {
                            if(retorno[0]["count(*)"] >= licenca.nu_licenca){
                                let mensagem = {"param": "licenca", "msg": "Atingiu o limite de licenças.", "value": "" };
                                reject(mensagem);
                            }else{
                                resolve(licenca);
                            }
                        }).catch (erro => {
                            reject(erro);
                        });
                }
            });  
        });
    }

    cadastrar(dispositivo, cliente){
        return new Promise((resolve,reject) => {
            
            this.connection_zn4.query(`insert into dispositivo (nu_imei, tx_descricao, id_cliente, fl_excluido) values ('${dispositivo.imei}', '${dispositivo.descricao}', 
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
            this.connection_zn4.query('select * from dispositivo where id_cliente=? and nu_imei like ? and fl_excluido=0',[idCliente,imei],(erro,result) => {
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

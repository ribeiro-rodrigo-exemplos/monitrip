let util = require('../util/util.js')();

class MotoristaDAO{
    constructor(connection){
        this.connection = connection;
    }

    obterTodos(cliente, callback){
        return new Promise((resolve,reject) => {
            var camposRetorno = "nm_matricula, nm_nomeFuncionario, nm_cpf, vl_sexo, dt_atualizacao, fl_ativo";
                        
            this.connection.query(`select ${camposRetorno} from funcionario where id_cliente = ${cliente} 
                                    and id_tipoFuncionario = ${util.tipoFuncionario.MOTORISTA}` ,(erro,retorno) => {
                if(erro)
                    reject(erro);
                else
                    resolve(retorno);
            });
        });
    }

    obter(cliente, cpf, dataAtualizacao, callback){
        return new Promise((resolve,reject) => {
            var camposRetorno = "nm_matricula, nm_nomeFuncionario, nm_cpf, vl_sexo, dt_atualizacao, fl_ativo";
                        
                this.connection.query(`select ${camposRetorno} from funcionario 
                            where id_cliente = ${cliente} 
                            and id_tipoFuncionario = ${util.tipoFuncionario.MOTORISTA}
                            and nm_cpf = ${cpf} 
                            and dt_atualizacao >= '${dataAtualizacao}'` ,(erro,retorno) => {

                if(erro)
                    reject(erro);
                else
                    resolve(retorno);
            });
        });
    }

    obterPorCpf(cliente, cpf){
        return new Promise((resolve,reject) => {
            var camposRetorno = "nm_matricula, nm_nomeFuncionario, nm_cpf, vl_sexo, dt_atualizacao, fl_ativo";
                        
            this.connection.query(`select ${camposRetorno} from funcionario 
                                   where id_cliente = ${cliente} 
                                   and id_tipoFuncionario = ${util.tipoFuncionario.MOTORISTA}
                                   and nm_cpf = ${cpf}`,(erro,retorno) => {

                if(erro)
                    reject(erro);
                else
                    resolve(retorno);
            });
        });
    }

    obterPorDataAtualizacao(cliente, dataAtualizacao){
        return new Promise((resolve,reject) => {
            var camposRetorno = "nm_matricula, nm_nomeFuncionario, nm_cpf, vl_sexo, dt_atualizacao, fl_ativo";
            
            this.connection.query(`select ${camposRetorno} from funcionario 
                                   where id_cliente = ${cliente} 
                                   and id_tipoFuncionario = ${util.tipoFuncionario.MOTORISTA}
                                   and dt_atualizacao >= '${dataAtualizacao}'` ,(erro,retorno) => {
                
                if(erro)
                    reject(erro);
                else
                    resolve(retorno);
            });
        });
    }
}

module.exports = function(){
    return MotoristaDAO;
}

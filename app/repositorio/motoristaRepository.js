let GenericRepository = require('./genericRepository')();

class MotoristaRepository extends GenericRepository{
    constructor(connection){
        super(connection);
    }

    filtrarMotoristas(clienteId,cpf,dataAtualizacao){

        if(!clienteId || dataAtualizacao || cpf)
            clienteId = `id_cliente like '%' or id_cliente is null`; 
        else
            clienteId = `id_cliente=${clienteId}`;
        
        if(!dataAtualizacao)
            dataAtualizacao = `dt_atualizacao >= '0000-00-00' or dt_atualizacao is null`
        else
            dataAtualizacao = `dt_atualizacao >= '${dataAtualizacao}'`

        if(!cpf)
            cpf = `nm_cpf like '%' or nm_cpf is null`
        else
            cpf = `nm_cpf='${cpf}'`;

        const query = `select nm_nomeFuncionario, nm_cpf, fl_ativo 
                from funcionario where (${dataAtualizacao}) and (${clienteId}) and (${cpf})`
        
        return this.prepareResult(query);   
    }
}

module.exports = () =>  MotoristaRepository;


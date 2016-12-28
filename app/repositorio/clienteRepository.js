class ClienteRepository{
    constructor(app){
        this._Cliente = app.modelo.cliente;
        this._Dispositivo = app.modelo.dispositivo;
    }

    obterQuantidadeMaximaDeLicencasDoCliente(idCliente){
        return this._Cliente
                    .findById(idCliente)
                        .then(cliente => cliente.getFuncionalidades())
                        .then(funcionalidades => 
                            funcionalidades.filter(funcionalidade => funcionalidade.dataValues.nome == 'Monitrip')
                        )
                        .then(funcionalidades => funcionalidades.length ? funcionalidades[0].dataValues.licenca.quantidade : 0)
    }

    obterQuantidadeDeDispositivosAtivosCadastrados(idCliente){
        return this._Dispositivo.count({where:{idCliente:idCliente,excluido:0}})
        .then(count => count)
    }
}

module.exports = app => new ClienteRepository(app);
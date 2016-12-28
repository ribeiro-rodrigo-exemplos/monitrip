class DispositivoService{
    constructor(app){
        this._dispositivoRepository = app.repositorio.dispositivoRepository;
        this._clienteRepository = app.repositorio.clienteRepository;
    }

    cadastrar(dispositivo,idCliente){
       return this._clienteRepository
                    .obterQuantidadeMaximaDeLicencasDoCliente(idCliente)
                    .then(qtMaximaDeLicencas => this._verificaSePossuiLicencasDisponiveis(qtMaximaDeLicencas,idCliente))
                    .then(() => this._dispositivoRepository.obterDispositivoPorImei(dispositivo.imei,idCliente))
                    .then(dispositivoEncontrado => this._atualizarOuCadastrarDispositivo(dispositivoEncontrado || dispositivo,idCliente))
    }

    _verificaSePossuiLicencasDisponiveis(qtMaximaLicencas,idCliente){
        return this._clienteRepository
                        .obterQuantidadeDeDispositivosAtivosCadastrados(idCliente)
                        .then(qtDispositivos => {
                            if(!qtMaximaLicencas || qtDispositivos >= qtMaximaLicencas){
                                throw this._criarErro('A quantidade de licenças disponíveis é insuficiente',403);
                            }
                        })
    }

    _atualizarOuCadastrarDispositivo(dispositivo,idCliente){
        dispositivo.idCliente = idCliente

        if(dispositivo.id){
            if(dispositivo.excluido == 1){
                dispositivo.excluido = 0;
                return this._dispositivoRepository.atualizar(dispositivo);
            }
                
            throw this._criarErro('Dispositivo já cadastrado',422);
        }     
        else
            return this._dispositivoRepository.cadastrar(dispositivo);
    }

    _criarErro(mensagem,status){
        let erro = new Error(mensagem);
        erro.status = status;
        return erro;
    } 
}

module.exports = app => new DispositivoService(app);
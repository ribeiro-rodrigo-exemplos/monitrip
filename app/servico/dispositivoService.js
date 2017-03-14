const logger = require('../util/log');

module.exports = () =>
    class DispositivoService {
        constructor(dispositivoRepository, clienteRepository) {
            this._dispositivoRepository = dispositivoRepository;
            this._clienteRepository = clienteRepository;
        }

        cadastrar(dispositivo, idCliente) {
            logger.info(`DispositivoService - cadastrar - idCliente: ${idCliente} - dispositivo: ${dispositivo}`);

            return this._clienteRepository
                .obterQuantidadeMaximaDeLicencasDoCliente(idCliente)
                .then(qtMaximaDeLicencas => this._verificaSePossuiLicencasDisponiveis(qtMaximaDeLicencas, idCliente))
                .then(() => this._dispositivoRepository.obterDispositivoPorImei(dispositivo.imei, idCliente))
                .then(dispositivoEncontrado => this._mesclaDispositivoEncontradoComDadosDeCadastro(dispositivoEncontrado, dispositivo))
                .then(dispositivoMesclado => this._atualizarOuCadastrarDispositivo(dispositivoMesclado || dispositivo, idCliente))
        }

        _mesclaDispositivoEncontradoComDadosDeCadastro(dispositivoEncontrado, dispositivoCadastrado) {
            if (dispositivoEncontrado)
                dispositivoEncontrado.descricao = dispositivoCadastrado.descricao;
            else
                dispositivoEncontrado = dispositivoCadastrado;

            return dispositivoEncontrado;
        }

        _verificaSePossuiLicencasDisponiveis(qtMaximaLicencas, idCliente) {
            logger.info(`DispositivoService - _verificaSePossuiLicencasDisponiveis - idCliente: ${idCliente} - qtMaximaLicencas: ${qtMaximaLicencas}`);

            return this._clienteRepository
                .obterQuantidadeDeDispositivosAtivosCadastrados(idCliente)
                .then(qtDispositivos => {
                    if (!qtMaximaLicencas || qtDispositivos >= qtMaximaLicencas) {
                        throw this._criarErro('A quantidade de licenças disponíveis é insuficiente', 403);
                    }
                })
        }

        _atualizarOuCadastrarDispositivo(dispositivo, idCliente) {
            dispositivo.idCliente = idCliente;

            logger.info(`DispositivoService - _atualizarOuCadastrarDispositivo - idCliente: ${idCliente} - dispositivo: ${dispositivo}`);

            if (dispositivo.id) {
                if (dispositivo.excluido == 1) {
                    dispositivo.excluido = 0;
                    return this._dispositivoRepository.atualizar(dispositivo);
                }

                throw this._criarErro('Dispositivo já cadastrado', 422);
            }
            else
                return this._dispositivoRepository.cadastrar(dispositivo);
        }

        _criarErro(mensagem, status) {
            let erro = new Error(mensagem);
            erro.status = status;
            logger.error(`DispositivoService - _criarErro - error: ${erro}`);

            return erro;
        }
    };


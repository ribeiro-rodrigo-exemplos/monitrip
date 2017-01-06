/**
 * Created by rodrigo.santos on 05/01/2017.
 */
module.exports = () =>
    class LicencaService{
        constructor(dispositivoRepository,clienteRepository){
            this._dispositivoRepository = dispositivoRepository;
            this._clienteRepository = clienteRepository;
        }

        obterLicencasDoCliente(idCliente){

            let licencas = {};

            return this._dispositivoRepository
                        .obterQuantidadeDeDispositivosAtivosDoCliente(idCliente)
                        .then(quantidade => licencas.usadas = quantidade)
                        .then(() => this._clienteRepository.obterQuantidadeMaximaDeLicencasDoCliente(idCliente))
                        .then(quantidadeMaxima => licencas.disponiveis = quantidadeMaxima >= licencas.usadas ? quantidadeMaxima - licencas.usadas : quantidadeMaxima)
                        .then(() => licencas);
        }
    }
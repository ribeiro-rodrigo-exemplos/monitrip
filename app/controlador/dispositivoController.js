let logger = require('../util/log');

module.exports = () =>
    class DispositivoController {
        constructor(dispositivoService, dispositivoRepository, ssoService) {
            this._dispositivoService = dispositivoService;
            this._ssoService = ssoService;
            this._dispositivoRepository = dispositivoRepository;
        }

        cadastrarPelaApi(req, res, next) {

            let erros = this._validarDispositivoApi(req);

            if (erros) {
                res.status(422)
                    .json(erros);
                return;
            }

            const credenciais = req.body.credenciais;

            logger.info(`DispositivoController - cadastrarPelaApi  - credenciais: ${credenciais.usuario} - imei: ${credenciais.imei}`);

            this._ssoService.autenticar(credenciais)
                .then(authResult => this._ssoService.decodificarToken(authResult.IdentificacaoLogin))
                .then(decoded => this._dispositivoService.cadastrar(req.body.dispositivo, decoded.idCliente))
                .then(() => res.sendStatus(200))
                .catch(erro => next(erro));
        }

        cadastrarPelaWeb(req, res, next) {

            let erros = this._validarDispositivoWeb(req);

            if (erros) {
                res.status(422)
                    .json(erros);
                return;
            }

            logger.info(`DispositivoController - cadastrarPelaWeb  - idCliente: ${req.idCliente}`);

            this._dispositivoService
                .cadastrar(req.body, req.idCliente)
                .then(() => res.sendStatus(200))
                .catch(erro => next(erro));
        }

        obter(req, res, next) {
            logger.info(`DispositivoController - obter  - idCliente: ${req.idCliente} - id: ${req.params.id}`);

            this._dispositivoRepository
                .obter(req.idCliente, req.params.id)
                .then(dispositivo => dispositivo ? res.json(dispositivo) : res.sendStatus(204))
                .catch(erro => next(erro));
        }

        editar(req, res, next) {

            let dispositivo = req.body;

            this._excluirCamposSomenteLeitura(dispositivo);

            dispositivo.id = req.params.id;
            dispositivo.idCliente = req.idCliente;

            logger.info(`DispositivoController - editar  - idCliente: ${req.idCliente} - id: ${req.params.id}`);

            this._dispositivoRepository
                .atualizar(dispositivo)
                .then(() => res.sendStatus(204))
                .catch(erro => next(erro));
        }

        alterarEstado(req, res, next) {

            if (!req.query.ativo) {
                res.status(400)
                    .send('É necessário informar o parametro ativo=true ou ativo=false na query string');
                return;
            }

            let ativo = req.query.ativo == 'true' ? 0 : 1;

            logger.info(`DispositivoController - alterarEstado  - idCliente: ${req.idCliente} - id: ${req.params.id} - ativo: ${ativo}`);

            this._dispositivoRepository
                .excluir(req.idCliente, req.params.id, ativo)
                .then(result => res.sendStatus(204))
                .catch(erro => next(erro));
        }

        listar(req, res) {
            logger.info(`DispositivoController - listar  - idCliente: ${req.idCliente} - ativo: ${req.query.ativo} - imei: ${req.query.imei} - descricao: ${req.query.descricao}`);

            this._dispositivoRepository
                .filtrarDispositivosDoCliente(req.idCliente, req.query.ativo, req.query.imei, req.query.descricao)
                .then(dispositivos => {
                    if (dispositivos)
                        res.json(dispositivos);
                    else
                        res.sendStatus(204);
                });
        }


        _validarDispositivoWeb(req) {

            this._excluirCamposSomenteLeitura(Object.assign(req.body));

            req.assert('imei', 'imei obrigatório').notEmpty();
            req.assert('descricao', 'descrição é obrigatória').notEmpty();

            return req.validationErrors();
        }

        _validarDispositivoApi(req) {
            if (req.body.dispositivo) {
                this._excluirCamposSomenteLeitura(req.body.dispositivo)
            }

            req.assert('dispositivo.imei', 'imei obrigatório').notEmpty();
            req.assert('dispositivo.descricao', 'descrição é obrigatória').notEmpty();
            req.assert('credenciais.usuario', 'nome de usuário é obrigatório').notEmpty();
            req.assert('credenciais.senha', 'senha é obrigatória').notEmpty();
            return req.validationErrors();
        }

        _excluirCamposSomenteLeitura(dispositivo) {
            if ("excluido" in dispositivo)
                delete dispositivo.excluido;

            if ("id" in dispositivo)
                delete dispositivo.id;
        }
    };




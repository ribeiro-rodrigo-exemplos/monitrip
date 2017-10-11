const safira = require('safira');
const GenericTokenInterceptor = require('./GenericTokenInterceptor').class;

class ApiTokenInterceptor extends GenericTokenInterceptor {
    constructor(ssoService, app, logger) {
        super();
        this._ssoService = ssoService;
        this.liberar({method: ['POST'], path: /api\/v1\/dispositivos/});
        this._app = app;
        this._logger = logger;
    }

    created(){
        this._app.use('/api/*',this.intercept.bind(this));
    }

    intercept(req, res, next) {

        if (this.recursoLiberado(req)) {
            next();
            return;
        }

        let token = this.obterToken(req);

        if (!token) {
            this._logger.error(`ApiTokenInterceptor - intercept - O recurso requisitado exige autenticação.`);

            res.status(401)
                .send('O recurso requisitado exige autenticação.');
            return;
        }

        this._ssoService.decodificarToken(token)
            .then(decoded => {
                if (this._ssoService.possuiPermissaoParaOMonitrip(decoded)) {
                    req.idCliente = decoded.idCliente;
                    req.gmtCliente = decoded.timezone;
                    next();
                }
                else {
                    this._logger.error(`ApiTokenInterceptor - decodificarToken - A credencial informada não possui autorização para consumir o recurso.`);
                    res.status(403)
                        .send('A credencial informada não possui autorização para consumir o recurso.');
                }
            })
            .catch(
                erro =>
                res.status(401)
                    .send('Token inválido. O recurso requisitado exige autenticação.')
        );
    }
};

safira.define(ApiTokenInterceptor)
      .build()
      .eager();
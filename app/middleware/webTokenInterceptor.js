const safira = require('safira');
const genericTokenInterceptor = require('./GenericTokenInterceptor').class;

class WebTokenInterceptor extends genericTokenInterceptor {
    constructor(ssoService, app, logger) {
        super();
        this._ssoService = ssoService;
        this._app = app;
        this._logger = logger;
    }

    created(){
        this._app.use('/web/*',this.intercept.bind(this));
    }

    intercept(req, res, next) {
        if (this.recursoLiberado(req)) {
            next();
            return;
        }

        let token = this.obterToken(req);

        if (!token) {
            this._logger.error(`WebTokenInterceptor - intercept - O recurso exige autenticação`);

            res.status(401)
                .send('O recurso exige autenticação');
            return;
        }

        token = token.replace("Bearer ", "");

        this._ssoService.decodificarWebToken(token)
            .then(decoded => {
                req.idCliente = decoded.idCliente;
                req.gmtCliente = decoded.gmtCliente
            })
            .then(() => next())
            .catch(erro => res.status(401).send('Token inválido. O recurso requisitado exige autenticação.'));
    }
};

safira.define(WebTokenInterceptor)
      .build()
      .eager();

const safira = require('safira');
const basicAuth = require('basic-auth');

class BasicAuthInterceptor {
    constructor(app) {
        this._app = app;
    }

    created(){
        this._app.use('/info',this.intercept.bind(this));
    }

    intercept(req, res, next) {
        const usuario = basicAuth(req);

        if (!usuario || usuario.name != 'm2m' || usuario.pass != 'm2m')
            return this._naoAutorizado(res);

        next();
    }

    _naoAutorizado(res) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.send(401);
    }
};

safira.define(BasicAuthInterceptor)
      .build()
      .eager();
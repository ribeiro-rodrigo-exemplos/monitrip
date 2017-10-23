const safira = require('safira');

class ErrorInterceptor {
    constructor(app, logger) {
        this._app = app;
        this._logger = logger;
    }
    
    created(){
        this._app.use(this.intercept.bind(this));
    }

    intercept(error, req, res, next) {
        if (error.status) {
            res.status(error.status)
                .send(error.message);
            return;
        }

        this._logger.error(`ErrorInterceptor - intercept - errorStatus: ${error.status} - errorMessage: ${error.message}`);

        res.status(500)
            .send('Ocorreu um erro ao processar a requisição solicitada, tente novamente mais tarde');
    }
};

safira.define(ErrorInterceptor)
      .build()
      .eager();
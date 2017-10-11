const safira = require('safira');

class Runner{
    constructor(app,config,logger){
        this._app = app;
        this._port = config.server.port; 
        this._logger = logger;
    }

    created(){
        this._app.listen(this._port, () =>{
            this._logger.info(`Servidor rodando na porta ${this._port}`);
        });
    }
}

safira.define(Runner)
      .build()
      .eager();

let log = require('../util/log');

module.exports = () =>
    class ErrorInterceptor{
        constructor(){}

        static intercept(error,req,res,next){
            if(error.status){
                res.status(error.status)
                    .send(error.message);
                return;
            }
           
            log.debug(error);
            log.info(error);
    
             
            res.status(500)
                .send('Ocorreu um erro ao processar a requisição solicitada, tente novamente mais tarde');
        }
    }

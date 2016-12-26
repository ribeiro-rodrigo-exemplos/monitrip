class ErrorInterceptor{
    constructor(){}

    intercept(error,req,res,next){
        console.log(error)
        if(error.status){
            res.status(error.status)
                .send(error.message);
            return;
        }
        
        res.status(500)
            .send('Ocorreu um erro ao processar a requisição solicitada, tente novamente mais tarde');
    }
}

module.exports = () => new ErrorInterceptor();
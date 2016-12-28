class CORSInterceptor{
    constructor(){}

    intercept(req,res,next){
        res.header('Access-Control-Allow-Origin','*');
        res.header("Access-Control-Allow-Headers","Authorization, Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
        next();
    }
}

module.exports = () => new CORSInterceptor();
const safira = require('safira');

class CORSInterceptor{

    static intercept(req,res,next){
        res.header('Access-Control-Allow-Origin','*');
        res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PUT, DELETE, OPTIONS, HEAD, PATCH");
        next();
    }
};

const app = safira.bean('app');
app.use(CORSInterceptor.intercept);



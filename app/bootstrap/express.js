let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let compression = require('compression');
const safira = require('safira');
let logger = safira.bean('logger');
let mung = require('express-mung');
let etag = require('etag');

let app = express();

app.use(morgan("common",{
    stream:{
        write(mensagem){
            logger.info(mensagem);
        }
    }
}));

app.use(compression({
    filter(req,res){
        return req.headers['accept-encoding'] && req.headers['accept-encoding'].split(',').includes('gzip');
    }
}));

app.use(mung.json(function(body,req,res){
    
    res.etag = etag(JSON.stringify(body));
    const etagRequest = req.headers['if-none-match'];

    if(etagRequest != res.etag)
        return body;

    res.cacheControl = true;

    return null;
}));
   
app.use(mung.headers(function(req,res){
    
    if(res.cacheControl)
        res.status(304);
    
    if(res.etag)
        res.set('ETag',res.etag);

})); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('jwt_api_key','M2MParceiroKey');
app.set('jwt_web_key','m2m');

safira.defineObject(app,'app');



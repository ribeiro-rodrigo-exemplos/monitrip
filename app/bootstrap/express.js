let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let compression = require('compression');
const safira = require('safira');
let logger = safira.bean('logger');

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('jwt_api_key','M2MParceiroKey');
app.set('jwt_web_key','m2m');

safira.defineObject(app,'app');



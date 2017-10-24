const compression = require('compression');
const safira = require('safira');

const app = safira.bean('app');

app.use(compression({
    filter(req,res){
        return req.headers['accept-encoding'] && req.headers['accept-encoding'].split(',').includes('gzip');
    }
}));
const safira = require('safira');
const mung = require('express-mung');
const etag = require('etag');

const app = safira.bean('app');

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
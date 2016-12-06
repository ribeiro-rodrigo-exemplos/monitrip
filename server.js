let app = require('./app/config/express-config.js')();

app.listen(3000,function(){
    console.log('servidor rodando');
});
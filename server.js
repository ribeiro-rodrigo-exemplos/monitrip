let app = require('./app/config/express-config.js')();

app.listen(3001,function(){
    console.log('servidor rodando');
});
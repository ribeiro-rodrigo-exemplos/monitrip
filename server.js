require('./app/database/mongodbConnectionFactory')
let app = require('./config/express-config.js')();

app.listen(3001,function(){
    console.log('servidor rodando');
});
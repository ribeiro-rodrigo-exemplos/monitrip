let app = require('./app/bootstrap/express-bootstrap')();

app.listen(3001,function(){
    console.log('servidor rodando');
}); 

/*const yaml = require('js-yaml');
const fs = require('fs');

try{
    const config = yaml.safeLoad(fs.readFileSync('./config/config.yml','utf-8'));
}
catch(e){
    console.log(e); 
}*/
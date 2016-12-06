let express = require('express');
let bodyParser = require('body-parser');
let consign = require('consign');

module.exports = function(){
    let app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    consign({cwd:'app'})
        .include('controladores')
        .then('rotas')
        .into(app);

    return app;
}


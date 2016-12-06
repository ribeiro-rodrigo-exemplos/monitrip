let express = require('express');
let bodyParser = require('body-parser');
let consign = require('consign');

module.exports = () => {
    let app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    consign({cwd:'app'})
        .include('controladores')
        .then('rotas')
        .then('database')
        .into(app);

    return app;
}


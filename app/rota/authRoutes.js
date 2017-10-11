const safira = require('safira');

let app = safira.bean('app');  
let controlador = safira.bean('authController');

let apiTokenInterceptor = safira.bean('apiTokenInterceptor');
let webTokenInterceptor = safira.bean('webTokenInterceptor');
let basicAuthInterceptor = safira.bean('basicAuthInterceptor');

app.post('/auth',controlador.autenticar.bind(controlador));

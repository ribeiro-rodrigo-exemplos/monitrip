module.exports = app => {
    
    let controlador = app.beans.factory.authController;
    let apiTokenInterceptor = app.beans.factory.apiTokenInterceptor;
    let webTokenInterceptor = app.beans.factory.webTokenInterceptor; 

    app.post('/auth',controlador.autenticar.bind(controlador));

    app.use('/api/*',apiTokenInterceptor.intercept.bind(apiTokenInterceptor));
    app.use('/web/*',webTokenInterceptor.intercept.bind(webTokenInterceptor)); 
}
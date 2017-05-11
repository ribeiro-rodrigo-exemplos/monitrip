module.exports = app => {
    
    let controlador = app.beans.factory.authController;

    let apiTokenInterceptor = app.beans.factory.apiTokenInterceptor;
    let webTokenInterceptor = app.beans.factory.webTokenInterceptor;
    let basicAuthInterceptor = app.beans.factory.basicAuthInterceptor;

    app.post('/auth',controlador.autenticar.bind(controlador));

    app.use('/api/*',apiTokenInterceptor.intercept.bind(apiTokenInterceptor));
    app.use('/web/*',webTokenInterceptor.intercept.bind(webTokenInterceptor));
    app.use('/info',basicAuthInterceptor.intercept.bind(basicAuthInterceptor));
};
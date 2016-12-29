module.exports = app => {
    
    let controlador = app.beans.factory.authController;
    let tokenInterceptor = app.beans.factory.tokenInterceptor;

    app.post('/auth',controlador.autenticar.bind(controlador));
    app.use(tokenInterceptor.intercept.bind(tokenInterceptor));
}
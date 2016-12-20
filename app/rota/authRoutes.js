module.exports = app => {
    let controlador = app.controlador.authController;
    let tokenInterceptor = app.middleware.tokenInterceptor;

    app.post('/auth',controlador.autenticar.bind(controlador));
    app.use(tokenInterceptor.intercept.bind(tokenInterceptor));
}
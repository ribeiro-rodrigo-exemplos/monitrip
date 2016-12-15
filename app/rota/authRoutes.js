module.exports = app => {
    let controlador = app.controlador.authController;
    app.post('/auth',controlador.autenticar.bind(controlador));
}
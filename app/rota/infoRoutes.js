/**
 * Created by rodrigo on 10/03/17.
 */
module.exports = app => {
    let controlador = app.beans.factory.infoController;
    app.get('/info',controlador.obterInformacoesDaAplicacao.bind(controlador));
};

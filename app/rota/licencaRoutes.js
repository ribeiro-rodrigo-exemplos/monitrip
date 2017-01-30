/**
 * Created by rodrigo.santos on 05/01/2017.
 */

module.exports = app => {
    let controlador = app.beans.factory.licencaController;

    app.get('/web/v1/licencas',controlador.obterLicencasDoCliente.bind(controlador));
    app.get('/web/v1/clientes/:id/licencas',controlador.obterLicencasDoClientePorId.bind(controlador));

}

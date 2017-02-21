/**
 * Created by rodrigo on 20/02/17.
 */
module.exports = app => {
    const controlador = app.beans.factory.servicoController;

    app.route('/api/v1/servicos')
        .get(controlador.obter.bind(controlador));
}
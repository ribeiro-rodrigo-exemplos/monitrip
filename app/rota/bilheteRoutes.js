/**
 * Created by rodrigo on 23/02/17.
 */
module.exports = app => {
    const controlador = app.beans.factory.bilheteController;

    app.route('/web/v1/bilhetes')
        .get(controlador.obterBilhetes);

    app.route('/web/v1/bilhetes/:id')
        .get(controlador.obterBilhete);
}
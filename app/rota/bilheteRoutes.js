/**
 * Created by rodrigo on 23/02/17.
 */
module.exports = app => {
    const controlador = app.beans.factory.bilheteController;

    app.route('/api/v1/bilhetes')
        .get(controlador.obterBilhetes.bind(controlador));
};
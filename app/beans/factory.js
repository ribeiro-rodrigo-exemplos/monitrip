module.exports = app => {
    return {
        get veiculo() {
            return app.modelo.veiculo;
        },

        get cliente() {
            return app.modelo.cliente;
        },

        get dispositivo() {
            return app.modelo.dispositivo;
        },

        get funcionalidade() {
            return app.modelo.funcionalidade;
        },

        get licenca() {
            return app.modelo.licenca;
        },

        get bilhete() {
            return app.modelo.bilhete;
        },

        get motorista() {
            return app.modelo.motorista
        },

        get veiculoRepository() {
            return new app.repositorio.veiculoRepository(this.veiculo);
        },

        get bilheteRepository() {
            return new app.repositorio.bilheteRepository(this.bilhete);
        },

        get clienteRepository() {
            return new app.repositorio.clienteRepository(this.cliente, this.dispositivo);
        },

        get logRepository() {
            return new app.repositorio.logRepository();
        },

        get dispositivoRepository() {
            return new app.repositorio.dispositivoRepository(this.dispositivo);
        },

        get linhaRepository() {
            return new app.repositorio.linhaRepository(this.linha);
        },

        get motoristaRepository() {
            return new app.repositorio.motoristaRepository(this.motorista);
        },

        get servicoRepository() {
            return new app.repositorio.servicoRepository();
        },

        get veiculoController() {
            return new app.controlador.veiculoController(this.veiculoRepository, this.validadorDeData, this.retornoDTO);
        },

        get servicoController(){
            return new app.controlador.servicoController(this.servicoRepository, this.retornoDTO);
        },
        get bilheteController() {
            return new app.controlador.bilheteController(this.bilheteRepository, this.retornoDTO);
        },

        get authController() {
            return new app.controlador.authController(this.ssoService, this.dispositivoRepository);
        },

        get dispositivoController() {
            return new app.controlador.dispositivoController(this.dispositivoService, this.dispositivoRepository, this.ssoService);
        },

        get linhaController() {
            return new app.controlador.linhaController(this.linhaRepository, this.validadorDeData, this.retornoDTO);
        },

        get logController() {
            return new app.controlador.logController(this.workerProcessamentoService,this.servicoPersistenciaService,this.logRepository, this.bilheteRepository, this.util, this.dateUtil);
        },

        get motoristaController() {
            return new app.controlador.motoristaController(this.motoristaRepository, this.validadorDeData, this.retornoDTO);
        },

        get licencaController() {
            return new app.controlador.licencaController(this.licencaService);
        },

        get infoController() {
            return new app.controlador.infoController();
        },

        get dispositivoService() {
            return new app.servico.dispositivoService(this.dispositivoRepository, this.clienteRepository);
        },

        get logService() {
            return new app.servico.logService(this.dateUtil);
        },

        get licencaService() {
            return new app.servico.licencaService(this.dispositivoRepository, this.clienteRepository);
        },

        get ssoService() {
            return new app.servico.ssoService();
        },

        get workerProcessamentoService(){
            return new app.servico.workerProcessamentoService(this.logService);
        },

        get servicoPersistenciaService(){
            return new app.servico.servicoPersistenciaService(this.logService,this.servicoPersistenciaDTO);
        }, 

        get retornoDTO() {
            return app.util.dto.retornoDTO;
        },

        get util() {
            return app.util.util;
        },

        get dateUtil() {
            return new app.util.dateUtil;
        },

        get servicoPersistenciaDTO() {
            return app.util.dto.servicoPersistenciaDTO;
        },

        get validadorDeData() {
            return new app.util.validadorDeData();
        },

        get apiTokenInterceptor() {
            return new app.middleware.apiTokenInterceptor(this.ssoService);
        },

        get webTokenInterceptor() {
            return new app.middleware.webTokenInterceptor(this.ssoService);
        },

        get basicAuthInterceptor() {
            return new app.middleware.basicAuthInterceptor();
        }
    }
};
const morgan = require('morgan');
const safira = require('safira');

const app = safira.bean('app')
const logger = safira.bean('logger')

app.use(morgan("common",{
    stream:{
        write(mensagem){
            logger.info(mensagem);
        }
    }
}));
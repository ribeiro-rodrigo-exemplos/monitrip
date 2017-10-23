const safira = require('safira');
const bodyParser = require('body-parser');

const app = safira.bean('app');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
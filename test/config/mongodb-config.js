let caminte = require('caminte');
let mongodbConfig = require('./m2m-config')()["mongodb"];

mongodbConfig.driver = 'mongodb';

let schema = new caminte.Schema(mongodbConfig.driver,mongodbConfig);

module.exports = () => schema
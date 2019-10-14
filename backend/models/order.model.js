var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema  = new Schema ({
    vnumber : {type: String, required: true },
    orderid : {type: String, required: true, unique : true},
    username : {type: String, required: true},
    duration : {type: String, required: true}
});

module.exports = mongoose.model('Order', schema );
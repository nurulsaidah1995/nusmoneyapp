var express = require('express'); 
var router = express.Router();

var banknames = ["Maybank","Standard Chartered","UOB","DBS","OCBC","UBS"];


/* GET my page. */
router.get('/', function(req, res, next) {
 res.send(banknames);
});

module.exports=router;
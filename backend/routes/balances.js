var express = require('express'); 
var router = express.Router();

var balances1 = [
    {bank:"Maybank", balance:500},
    {bank:"Standard Chartered", balance:1000},
    {bank:"UOB", balance:300},
    {bank:"DBS", balance:200},
    {bank:"OCBC", balance:450},
    {bank:"UBS", balance:100}
    ];

balances = JSON.stringify(balances1)

/* GET my page. */
router.get('/', function(req, res, next) {
 res.send(balances);
});

module.exports=router;
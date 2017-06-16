var express = require('express');
var router = express.Router();
var damage = require('./damage');
/* GET home page. */

router.get('/', function(req, res, next) {
    var _testcases=
        [[damage.damage('feeai'),2],
            [damage.damage('feaineain'),7],
            [damage.damage('jee'),0],
            [damage.damage('fefefefefeaiaiaiaiai'),0],
            [damage.damage('fdafafeajain'),1],
            [damage.damage('fexxxxxxxxxxai'),0]];

    res.render('index', {testcases:_testcases});
});

module.exports = router;

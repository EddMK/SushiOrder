var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/welcome', function(req, res, next) {
  const data = {'view':'here'}
  res.send(data)
});


module.exports = router;

var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
/*let signupControl = require('../controller/signupcontrol');*/
let adminControl = require('../../controllers/admin/adminController');

  router.get('/allusers',adminControl.allUsers);

module.exports = router;

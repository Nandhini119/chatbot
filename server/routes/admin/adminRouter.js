var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
/*let signupControl = require('../controller/signupcontrol');*/
let adminControl = require('../../controllers/admin/adminController');

  router.get('/allusers',adminControl.allUsers);
  router.get('/checkstatus',adminControl.checkstatus);
  router.post('/block',adminControl.blockUsers);
  router.post('/unblock',adminControl.unblockUsers);

module.exports = router;

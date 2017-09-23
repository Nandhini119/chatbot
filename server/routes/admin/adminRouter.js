var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let adminControl = require('../../controllers/admin/adminController');

var isAuthenticated = function(req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if(req.isAuthenticated()) return next();
  // if the user is not authenticated then send an error message
  res.status(500).json({status:'Invalid user'});
};

module.exports = function(passport) {
  router.get('/allusers', isAuthenticated, adminControl.allUsers);
  router.get('/checkstatus', isAuthenticated, adminControl.checkstatus);
  router.post('/block', isAuthenticated, adminControl.blockUsers);
  router.post('/unblock', isAuthenticated, adminControl.unblockUsers);
  return router;
}

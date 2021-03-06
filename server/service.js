const express = require('express');
const path = require('path');
let passport = require('passport');
let expressSession = require('express-session');


let createApp = function() {
    const app = express();
    return app;
};

let setupStaticRoutes = function(app) {
    app.use(express.static(path.join(__dirname, '../', 'client')));
    return app;
};

let setupAppRoutes = function(app) {
    let users = require('./user/user.route.js')(passport);
    let admin = require('./admin/admin.route.js');
    app.use('/users', users);
    app.use('/admin', admin);
    return app;
};

let setupRESTRoutes = function(app) {

    app.use(function(req, res) {
        let err = new Error('resource not found');
        err.status = 404;
        return res.status(err.status).json({
            error: err.message
        });
    });

    app.use(function(err, req, res) {
        console.error('internal error in watch processor: ', err);
        return res.status(err.status || 500).json({
            error: err.message
        });
    });

    return app;
};

let setupMiddlewares = function(app) {
    const bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    // initializing passport
    app.use(expressSession({
        secret: 'mySecretKey',
        saveUninitialized: true,
        resave: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    let initpassport = require('./passport/init');
    initpassport(passport);
    return app;
};

let setupWebpack = function(app) {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackConfig = require('../webpack.config.js');
    const webpackCompiler = webpack(webpackConfig);
    app.use(webpackHotMiddleware(webpackCompiler));
    app.use(webpackDevMiddleware(webpackCompiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true
        }
    }));
    return app;
};

let setupMongooseConnections = function() {
    const mongoose = require('mongoose');
    let mongoURL = 'mongodb://127.0.0.1:27017/chatbot';

    mongoose.connect(mongoURL, {
        useMongoClient: true
    });

    mongoose.connection.on('connected', function() {
        console.log('mongoose is now connected to ', mongoURL);


        mongoose.connection.on('error', function(err) {
            console.error('error in mongoose connection: ', err);
        });

        mongoose.connection.on('disconnected', function() {
            console.log('mongoose is now disconnected.');
        });

        process.on('SIGINT', function() {
            mongoose.connection.close(function() {
                console.log(
                    'mongoose disconnected on process termination'
                );
                process.exit(0);
            });
        });
    });
};

module.exports = {
    createApp,
    setupStaticRoutes,
    setupAppRoutes,
    setupRESTRoutes,
    setupMiddlewares,
    setupMongooseConnections,
    setupWebpack
};
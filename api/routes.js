'use strict';


var index = require('../api/controllers/index');
var docs = require('../api/controllers/documents');
var users = require('../api/controllers/users');
var rooms = require('../api/controllers/rooms');



module.exports = function(app, passport, auth) {
    

    app.get('/login', users.login );
    app.post('/register', users.create);
    app.get('/signup', users.signup );
	// USER
    app.get('/signout', users.signout);
    //Setting the facebook oauth routes
    /*
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email'],
        failureRedirect: '/'
    }), users.signin);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/'
    }), users.authCallback);
     */
   
    //Finish with setting up the username param
    //app.param('username', users.userByName);
    //app.param('userId', users.userById);


    app.get('/me/account', auth.requiresLogin, users.account);
    app.get('/api/v1/me/account', auth.requiresLogin, users.account_api);

  
    var fileupload = require('fileupload').createFileUpload('public/uploads').middleware;
    app.post('/api/v1/media/upload', fileupload, function(req, res) {
       res.send(req.body.image)
     })



      
    //Home 
   
    app.get('/',                            docs.index_doc);
    app.get('/doc',                         index.errors);
  	app.get('/doc/:slug',                   docs.index_doc);
    app.get('/partials/:name/:param?',      index.partial); // document, lists, etc..
    app.get('/fragments/:name/:param?',     index.fragments); // load sub-blocks 
    app.get('/doc/fragments/:name/:param?', index.fragments); // load sub-blocks ? express/angualar..?

  
    app.get('/doc/create',  auth.requiresLogin, docs.index_doc ); // load sub-blocks ? express/angualar..?

    app.get('/api/v1/docs', docs.list);

    // DOC
    // single doc record
    app.get('/api/v1/doc/:slug', docs.docByIdOrTitle);
    app.post('/api/v1/doc/:doc_id/edit',auth.requiresLogin_or_secret,  docs.doc_edit);
   

    // doc_options
    app.post('/api/v1/doc/:slug/edit_option', auth.requiresLogin, docs.doc_edit_option);
    app.post('/api/v1/doc/:slug/create_option', auth.requiresLogin, docs.doc_create_option);
    app.post('/api/v1/doc/:slug/delete_option', auth.requiresLogin, docs.doc_delete_option);
    

     // delete 
    app.post('/api/v1/doc/:slug/delete',  auth.requiresLogin_or_secret, docs.doc_delete);
    

    app.get ('/api/v1/doc/:slug/reset',    auth.requiresLogin,  docs.doc_reset);
    app.post('/api/v1/doc/:slug/sync',     auth.requiresLogin,  docs.doc_sync);


    app.get ('/api/v1/doc/:slug/markups/offset/:side/:start/:end/:qty', auth.requiresLogin, docs.markups_offset);
    app.post('/api/v1/doc/:slug/markup/:markup_id/offset', auth.requiresLogin, docs.markup_offset);
    app.post('/api/v1/doc/:slug/markup/:markup_id/edit',auth.requiresLogin_or_secret,  docs.markup_edit);
    app.post('/api/v1/doc/:slug/markup/push', auth.requiresLogin, docs.markup_create);
    app.get ('/api/v1/doc/:slug/markup/delete/:markup_id', auth.requiresLogin, docs.markup_delete);
    // app.post('/api/v1/doc/:doc_id_or_title/markup/delete/' , docs.markup_delete);

    // create a doc
    app.post('/api/v1/doc/create',  auth.requiresLogin, docs.doc_create);

    // clone a doc
    app.get('/api/v1/doc/:slug/clone/:clone_slug',  auth.requiresLogin, docs.doc_clone);

    // not used app.get('/sockets/list', index.sockets_list);

    //
    app.post('/api/v1/userlogin', passport.authenticate('local', {}), users.signin_login);

    
    // ROOM & ROOMS
    app.get('/api/v1/room/create/:slug?',  auth.requiresLogin, rooms.createroom);
    app.get('/api/v1/rooms/list', rooms.list);
    app.get('/api/v1/rooms/list/:filter?/:filter_value', rooms.list);
    app.get('/room/:slug', rooms.room_view);


};
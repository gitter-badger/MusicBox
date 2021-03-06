'use strict';

/**
 * Module dependencies.
 */
var nconf = require('nconf')
nconf.argv().env().file({file:'config.json'});


var mongoose = require('mongoose'),
Schema = mongoose.Schema,
meta_options = Schema.MetaoptionsSchema;

/**
 * Document Schema
 */

// generate _id
//http://stackoverflow.com/questions/11604928/is-there-a-way-to-auto-generate-objectid-when-a-mongoose-model-is-newed
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;


var MarkupSchema = new Schema({
    _id:  {type:ObjectIdSchema, default: function () { return new ObjectId()} },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: Schema.ObjectId,
         trim: true,
        ref: 'User'
    },
    username : {
        type: String,
        default: '-',
        trim: true
    },
    doc_id:{
          type: Schema.ObjectId,
           trim: true,
          ref: 'Document'
    },
    start: {
        type: Number,
        default: '',
        trim: true
    },
    end: {
        type: Number,
        default: '',
        trim: true
    },
    metadata: {
        type: String,
        default: '',
        trim: true
    },
    type: {
        type: String,
        default: '',
        trim: true
    },
    subtype: {
        type: String,
        default: '',
        trim: true
    },
    status: {
        type: String,
        default: 'pending',
        trim: true
    },
    position: {
        type: String,
        default: 'left',
        trim: true
    },
    depth: {
        type: Number,
        default: 1,
        trim: true
    },
    markup_options: [meta_options]
});

var DocumentSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        // default: 'Your title',
        unique: true,
        trim: true
    },
    slug: {
        type: String,
        // default: 'your-title',
        unique: true,
        trim: true
    },
    content: {
        type: String,
        default: 'Your content..',
        trim: true
    },
    excerpt: {
        type: String,
        default: '[&hellip;]',
        trim: true
    },
    markups: [MarkupSchema], 
    doc_options: [meta_options], 
    published:{
        type: String,
        default: 'draft'
    },
    secret: {type:ObjectIdSchema, default: function () { return new ObjectId()} },
    thumbnail: {
        type: String,
         default: 'http://hacktuel.fr/img/logos/loguy/hacktuel.png'
    },
    lang: {
        type: String,
        default: 'en'
    },
    lang_versions: [{
        type: Schema.ObjectId,
        ref: 'Document'
    }],
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    editors: [{
       type: Schema.ObjectId,
        ref: 'User'
    }],
    username: {
        type: String
    },
    room: {
        type: Schema.ObjectId,
        ref: 'Room'
    },
    parents: {
        type: Schema.ObjectId,
        ref: 'Document'
    },
    childs: [{
        type: Schema.ObjectId,
        ref: 'Document'
    }],
    clone_of: {
        type: Schema.ObjectId,
        ref: 'Document'
    },
    clones: [{
        type: Schema.ObjectId,
        ref: 'Document'
    }]
});
DocumentSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');



mongoose.model('Markup',MarkupSchema);
mongoose.model('Document', DocumentSchema);
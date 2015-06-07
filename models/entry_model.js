'use strict';

var mongoose = require('mongoose');

var entrySchema = mongoose.Schema({
    authorId: {type: String, required: true},
    title: {type: String, required: true},
    ideaBody: String,
    tag: {type:String, index:true}
});

module.exports = mongoose.model('Entry', entrySchema);

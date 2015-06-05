'use strict';

var mongoose = require('mongoose');

var EntrySchema = mongoose.Schema({
    title: {type: String, required: true},
    ideaBody: String,
    tag: {type:String, index:true}
});

module.exports = mongoose.model('Entry', EntrySchema);

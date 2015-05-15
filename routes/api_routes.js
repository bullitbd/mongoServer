'use strict'; // Notes

var Entry = require('../models/entry_model');

var bodyparser = require('body-parser');

module.exports = function(router) {

    router.use(bodyparser.json());

    // get
    router.get('/entries', function(req, res) {
        Entry.find({}, function(err, data)  {
            if (err) {
                res.status(500).send({msg: 'couldn\'t find data'});
                return;
            }
            res.json(data);
        });
        // find all
    });

    router.get('/entries/:id', function(req, res) {

        Entry.find({_id: req.params.id}, function(err, data)  {
            if (err) {
                res.status(500).send({msg: 'couldn\'t find data'});
                return;
            }
            res.json(data);
        });
    });

    // post
    // simple body post - writeFile...
    router.post('/entries', function(req, res) {
        var newEntry = new Entry(req.body);
        newEntry.save(function(err, data) {
            if (err) {res.status(500).send({msg: 'couldn\'t save post'});
            return;}
            res.json(data);
        });
    });

    // put
    // ideally, we need to get a resource to be edited;
    // GET then PUT
    router.put('/entries/:id', function(req, res) {
        var updated = req.body;
        delete updated._id;
        Entry.update({_id: req.params.id}, updated, function(err, data) {
            if (err) {
                res.status(500).send({msg: 'couldn\'t save post'});
                return;
            }
            res.json(data);
        });
    });

    // delete
    // in this case, delete file;
    router.delete('/entries/:id', function(req, res) {
        Entry.remove({_id:req.params.id}, function(err, data) {
            if (err) {
                res.status(500).send({msg: 'couldn\'t delete entry'});
                return;
            }
            res.json(data);
        });
    });
};

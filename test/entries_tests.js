'use strict';

process.env.MONGO_URI = 'mongodb://localhost/entries_testdb';
var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var Entry = require('../models/entry_model');

var servAddr = 'localhost:3001';

require('../lib/server.js');

var testObj = {
    tag: 'food',
    ideaBody: 'recipe for food',
    title: 'great food'
};

var id = '';

describe('entriesApi endpoint tests', function() {
    before(function(done) {
        var testEntry = new Entry({title: 'newIdea'});
        testEntry.save(function(err, data) {
            if (err) {
                console.log(err);
            }
            this.testEntry = data;
            id = this.testEntry._id;
            done();
        }.bind(this));
    });

    it('should have a functioning before hook', function(done) {
        expect(this.testEntry.title).to.eql('newIdea');
        expect(this.testEntry).to.have.property('_id');
        done();
    });

    it('get request should return all records', function(done) {
        chai.request(servAddr)
            .get('/api/entries')
            .end(function(err, res) {
                expect(err).to.eql(null);
                expect(res).to.have.status(200);
                expect(Array.isArray(res.body)).to.eql(true);
                done();
            });
    });

    it('get/id request should return associated record', function(done) {
        chai.request(servAddr)
            .get('/api/entries/' + id)
            .end(function(err, res) {
                expect(err).to.eql(null);
                expect(res).to.have.status(200);
                expect(Array.isArray(res.body)).to.eql(true);
                expect(res.body.length).to.equal(1);
                //expect(res.body._id).to.eql(id);
                done();
            });

    });

    it('post request should create new record', function(done) {
        chai.request(servAddr)
            .post('/api/entries')
            .send(testObj)
            .end(function(err, res) {
                expect(err).to.eql(null);
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('_id');
                done();
            });
    });

    it('put request should replace requested record', function(done) {
        chai.request(servAddr)
            .put('/api/entries/' + id)
            .send({tag:'testing'})
            .end(function(err, res) {
                expect(err).to.eql(null);
                expect(res).to.have.status(200);
                expect(res.body.ok).to.eql(1);
                done();
            });
    });

    after(function(done) {
        mongoose.connection.db.dropDatabase(function() {
            done();
        });
    });

});


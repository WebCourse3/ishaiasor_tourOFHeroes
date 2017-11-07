var heroesTest = [
	{id:1,name:'moses'},
	{id:2,name:'jody'},
	{id:3,name:'jany'},
	{id:4,name:'gon'},
	{id:5,name:'ishai'}
];
const chai = require('chai');
let assert = require('assert');
var should = chai.should();
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
sinon = require('sinon')
var server = require('../server.js');
let actions = require('../actions');
actions = new actions.action();

describe('server test', () => {

	describe('GET', function () {
		it('should get all heroes', function (done) {
			chai.request(server)
				.get('/heroes')
				.end(function (err, res) {
					res.body[0].should.have.property('id');
					done();
				});
		});
	});

	describe('GET by id', function () {
		it('should get hero by id', function (done) {
			chai.request(server)
				.get('/heroes/3')
				.end(function (err, res) {
					res.body.id.should.equal(3);
					done();
				});
		});
	});

	describe('post new hero', function () {
		it('should add hero ', function (done) {
			chai.request(server)
				.post('/heroes/7/script')
				.end(function (err, res) {
					res.should.have.status(200);
					done();
				});
		});
	});

    describe('update hero name by id',function () {
	   it('update hero name by id',function (done) {
		   const contStub = {};
		   contStub.findUserByIDStub= sinon.stub();
		   contStub.findUserByIDStub.withArgs(1,heroesTest).returns(heroesTest[0]);

		   actions.findUserByID = contStub.findUserByIDStub;
		   actions.updateUserByID(1,'dani',heroesTest);
		   assert.equal(heroesTest[0].name,"dani");
		   done();
	   });
    });

});

after('after all', () => {
	server.close();
});
const chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var server = require('../server.js');

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


});

after('after all', () => {
	server.close();
});
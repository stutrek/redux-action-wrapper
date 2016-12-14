/* global require: false, describe: false, it: false, chai: false */

var expect = chai.expect;
//mocha.allowUncaught();

var actionWrapper = module.exports;

function noop () {}

describe('redux action wrapper', function () {

	it('should have correct API.', function () {
		expect(actionWrapper).to.be.a('function');
	});

	it('should error without an object', function () {
		expect(function () {
			actionWrapper();
		}).to.throw();
	});

	it('should error without a dispatch function', function () {
		expect(function () {
			actionWrapper({});
		}).to.throw();
	});

	it('should ignore non-functions', function () {
		var toWrap = {
			dog: 'fart'
		};

		var result = actionWrapper(toWrap, noop);

		expect(result).to.eql({});
	});

	it('should wrap functions', function () {

		var dispatched = false;
		var methodArg = null;
		function dispatch () {
			dispatched = true;
		}
		function method (arg) {
			methodArg = arg;
		}
		var toWrap = {
			method: method
		};
		var result = actionWrapper(toWrap, dispatch);

		result.method('dogfart');
		expect(dispatched).to.equal(true);
		expect(methodArg).to.equal('dogfart');
	});

	it('should wrap recursively', function () {

		var dispatched = false;
		var methodArg = null;
		function dispatch () {
			dispatched = true;
		}
		function method (arg) {
			methodArg = arg;
		}
		var toWrap = {
			methods: {
				method: method
			}
		};

		var result = actionWrapper(toWrap, dispatch);

		result.methods.method('dogfart');
		expect(dispatched).to.equal(true);
		expect(methodArg).to.equal('dogfart');
	});

});

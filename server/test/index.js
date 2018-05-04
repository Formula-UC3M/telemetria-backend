/* global describe, it */
const chai = require('chai');
const expect = chai.expect;

// Plugins
require('mocha-sinon');
chai.use(require('chai-fs'));

describe('Test Server:', () => {
	it('Expect true to be true', () => {
		expect(true).to.be.true;
	});
});
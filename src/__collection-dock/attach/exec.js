/**
 * Defines an action runner.
 *
 * @module collection-dock
 * @submodule attach.exec
 */
define(function (require, exports, module) {
	'use strict';

	// external
	var _ = require('lodash'),
		Q = require('q');

	/**
	 * Calls a method with a given set of arguments.
	 * Always return
	 *
	 * @method exec
	 * @param name {String}
	 * @param args {Array}
	 */
	exports.qExec = function qExec(name, args) {

		// [1] retrieve the action.
		var action = this[name];

		// [2] exec it
		var exec = _.isFunction(action) ? action.apply(this, args) : true;

		// [3] wrap the result in a promise
		// if exec is undefined (thus the action has returned undefined), convert it to
		// true, so that
	//	exec = typeof exec !== 'undefined' ? exec : true;

		return Q(exec);
	};

	/**
	 * Runs a sequence of methods with given args.
	 *
	 * @method qExecSequence
	 * @param sequence {Array}
	 * @param args {Array}
	 */
	exports.qExecSequence = function qExecSequence(sequence, args) {

		// transform the metho name array
		// into a function array.
		sequence = _.map(sequence, _.bind(function (name) {

			return _.partial(this.qExec, name, args);

		}, this));

		// return a chained promise.
		return _.reduce(sequence, function (soFar, next) {

			return soFar.then(next);

		}, Q(true));
	};

});

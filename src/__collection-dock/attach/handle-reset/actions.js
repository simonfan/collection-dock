/**
 * Defines a series of actions (steps)
 * that deal with resetting models to the view.
 *
 * @module collection-dock
 * @submodule handle-reset:actions
 */
define(function (require, exports, module) {
	'use strict';

	// external
	var _ = require('lodash');

	// internal
	var handleAdd = require('../handle-add/index');

	exports.beforeReset = function beforeReset(collection, $container) {
	//	console.log('beforeReset');
		// no-op
	};

	exports.reset = function reset(collection, $container) {
		$container.html('');

		collection.each(_.bind(handleAdd, this));
	};

	exports.afterReset = function afterReset(collection, $container) {
	//	console.log('afterReset');
		// no-op
	};
});

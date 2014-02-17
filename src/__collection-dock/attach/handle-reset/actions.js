//     collection-dock
//     (c)
//     collection-dock is licensed under the MIT terms.

/**
 * AMD module.
 *
 * @module collection-dock
 */

define(function (require, exports, module) {
	'use strict';

	// external
	var _ = require('lodash');

	// internal
	var handleAdd = require('../handle-add/index');

	exports.beforeReset = function beforeReset(collection, $container) {
		console.log('beforeReset');
		// no-op
	};

	exports.reset = function reset(collection, $container) {
		$container.html('');

		collection.each(_.bind(handleAdd, this));
	};

	exports.afterReset = function afterReset(collection, $container) {
		console.log('afterReset');
		// no-op
	};
});

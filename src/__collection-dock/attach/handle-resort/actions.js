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
	var handleReset = require('../handle-reset/index');

	exports.beforeSort = function beforeSort(collection, $container) {
		console.log('beforeSort');
		// no-op
	};

	exports.sort = function sort(collection, $container) {
		handleReset.call(this, collection, $container);
	};

	exports.afterSort = function afterSort(collection, $container) {
		console.log('afterSort');
		// no-op
	};
});

/**
 * Defines a series of actions (steps)
 * that deal with resorting models of the view.
 *
 * @module collection-dock
 * @submodule handle-resort:actions
 */
define(function (require, exports, module) {
	'use strict';

	// external
	var _ = require('lodash');

	// internal
	var handleReset = require('../handle-reset/index');

	exports.beforeSort = function beforeSort(collection, $container) {
	//	console.log('beforeSort');
		// no-op
	};

	exports.sort = function sort(collection, $container) {
		handleReset.call(this, collection, $container);
	};

	exports.afterSort = function afterSort(collection, $container) {
	//	console.log('afterSort');
		// no-op
	};
});

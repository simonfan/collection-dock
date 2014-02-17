/**
 * Defines a series of actions (steps)
 * that deal with removing models from the view.
 *
 * @module collection-dock
 * @submodule handle-remove:actions
 */
define(function (require, exports, module) {
	'use strict';

	// external
	var _ = require('lodash');

	exports.beforeRemove = function beforeRemove(model, $item) {
	//	console.log('beforeRemove');

		return $item.animate({ opacity: 0 });
	};

	exports.remove = function remove(model, $item) {
	//	console.log('remove');

		$item.remove();
	};

	exports.afterRemove = function afterRemove(model) {
	//	console.log('afterRemove');
		// no-op
	};

});

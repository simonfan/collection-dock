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

	exports.beforeRemove = function beforeRemove(model, $item) {
		console.log('beforeRemove');

		return $item.animate({ opacity: 0 });
	};

	exports.remove = function remove(model, $item) {
		console.log('remove');

		$item.remove();
	};

	exports.afterRemove = function afterRemove(model) {
		console.log('afterRemove');
		// no-op
	};

});

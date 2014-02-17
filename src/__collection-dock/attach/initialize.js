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

	module.exports = function initializeAttach() {
		// bind methods
		_.bindAll(this, 'qExec', 'qExecSequence');
	};
});

/**
 * Initialization logic for attach.
 *
 * @module collection-dock
 * @submodule attach.initialize
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

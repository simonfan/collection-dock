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

		// bind event handlers
		_.bindAll(this, 'handleAdd', 'handleRemove', 'handleReset', 'handleResort');

		/**
		 * Hash on which itemView instances are stored.
		 *
		 * @property itemViews
		 * @type Object
		 */
		this.itemViews = {};
	};
});

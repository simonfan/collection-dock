/**
 * Defines the event handler for 'reset' events on the collection.
 *
 * @module collection-dock
 * @submodule handle-reset
 */
define(function (require, exports, module) {
	'use strict';

	/**
	 * Handles reset events on the collection.
	 *
	 * @method handleReset
	 * @private
	 * @param model {model Object}
	 */
	module.exports = function handleReset(collection, options) {
		this.qExecSequence(['beforeReset', 'reset', 'afterReset'], [collection, this.$container]);
	};

});

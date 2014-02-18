/**
 * Defines the event handler for 'resort' events on the collection.
 *
 * @module collection-dock
 * @submodule handle-resort
 */
define(function (require, exports, module) {
	'use strict';

	/**
	 * Handles resort events on the collection.
	 *
	 * @method handleResort
	 * @private
	 * @param model {model Object}
	 */
	module.exports = function handleResort(collection, options) {
		this.qExecSequence(['beforeSort', 'sort', 'afterSort'], [collection, this.$container]);
	};
});

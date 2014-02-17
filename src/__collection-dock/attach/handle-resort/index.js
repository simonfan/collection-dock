define(function (require, exports, module) {
	'use strict';

	/**
	 * Handles add events on the collection.
	 *
	 * @method handleResort
	 * @private
	 * @param model {model Object}
	 */
	module.exports = function handleResort(collection, options) {
		this.qExecSequence(['beforeSort', 'sort', 'afterSort'], [collection, this.$el]);
	};

});

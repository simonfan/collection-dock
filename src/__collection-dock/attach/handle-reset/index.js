define(function (require, exports, module) {
	'use strict';

	/**
	 * Handles add events on the collection.
	 *
	 * @method handleReset
	 * @private
	 * @param model {model Object}
	 */
	module.exports = function handleReset(collection, options) {
		this.qExecSequence(['beforeReset', 'reset', 'afterReset'], [collection, this.$el]);
	};

});

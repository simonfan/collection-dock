define(function (require, exports, module) {
	'use strict';

	/**
	 * Handles add events on the collection.
	 *
	 * @method handleRemove
	 * @private
	 * @param model {model Object}
	 */
	module.exports = function handleRemove(model) {
		// find the item to be removed
		var $item = this.retrieve$El(model);

		console.log($item);

		this.qExecSequence(['beforeRemove', 'remove', 'afterRemove'], [model, $item]);
	};

});

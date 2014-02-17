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
	var _ = require('lodash'),
		Q = require('q'),
		$ = require('jquery');

	/**
	 * Handles add events on the collection.
	 *
	 * @method handleAdd
	 * @private
	 * @param model {model Object}
	 */
	module.exports = function handleAdd(model) {

		// [1] placehold
		var $placeholder = $(this.itemPlaceholder(model)).attr(this.elementTypeAttribute, 'placeholder');

		this.place(model, $placeholder);

		// [2] get data and render html
		var _this = this;

		Q.when(this.itemData(model))			// [2.1] get data
			.then(this.itemTemplate)			// [2.2] render html
			.done(function (itemHtml) {			// [2.3] run action sequence.
					// wrap the item html in a jquery object
					// and add the item class
				var $item = $(itemHtml).attr(_this.elementTypeAttribute, 'item');

				_this.qExecSequence(
					['beforeAdd', 'add', 'afterAdd'],
					[model, $item, $placeholder]
				);
			});
	};

});

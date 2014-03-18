/**
 * Defines the event handler for 'add' events on the collection.
 *
 * @module collection-dock
 * @submodule event-hanlders
 */
define(function (require, exports, module) {
	'use strict';

	// external
	var _ = require('lodash'),
		$ = require('jquery');

	/**
	 * Handles add events on the collection.
	 *
	 * @method handleAdd
	 * @private
	 * @param model {model Object}
	 */
	exports.handleAdd = function handleAdd(model) {

		// [1] $item
		var itemHtml = _.isString(this.itemHtml) ? this.itemHtml : this.itemHtml(model.attributes),
			$item = $(itemHtml);

		// [2] placeItemHtml
		// [2.1] get index
		var at = this.collection.indexOf(model);
		this.placeItemHtml(at, $item);

		// [3] instantiate the itemView
		// [3.1] instantiate
		var view = this.itemView({
			model: model,
			$el: $item
		});

		// [3.2] store
		this.itemViewInstance(model, view);
	};

	/**
	 * Handles remove events on the collection.
	 *
	 * @method handleRemove
	 * @private
	 * @param model {model Object}
	 */
	exports.handleRemove = function handleRemove(model) {
		// retrieve the item view.
		var view = this.itemViewInstance(model);

		if (view) {
			view.remove();
		}
	};

	/**
	 * Handles reset events on the collection.
	 *
	 * @method handleReset
	 * @private
	 * @param model {model Object}
	 */
	exports.handleReset = function handleReset(collection, options) {

		// This is just to be faster: remove everything at once!
		this.$container.html('');

		this.collection.each(this.handleRemove);

		this.collection.each(this.handleAdd);
	};


	/**
	 * Handles resort events on the collection.
	 *
	 * @method handleResort
	 * @private
	 * @param model {model Object}
	 */
	exports.handleResort = function handleResort(collection, options) {
		this.handleReset(collection, this.$container);
	};

});

/**
 * Defines methods that generate item-related templates and data.
 * Methods here should be overwritten for custom behaviour.
 *
 * @module collection-dock
 * @submodule item
 */
define(function (require, exports, module) {
	'use strict';

	// external
	var _ = require('lodash');

	/**
	 * Places the $item at a given position within the container.
	 *
	 * @method placeItemHtml
	 * @param at {Number}
	 * @param $item {jq Object}
	 */
	exports.placeItemHtml = function placeItemHtml(at, $item) {

		var $beforeIndex = this.$container.children().eq(at - 1);

		if ($beforeIndex.length > 0) {
			$beforeIndex.after($item);
		} else {
			this.$container.append($item);
		}
	};

	/**
	 * Either method or property,
	 * is / returns the html string for the item.
	 *
	 * @method itemHtml
	 * @param model
	 */
	exports.itemHtml = '<div></div>';

	/**
	 * Must return an view object with a 'remove' method.
	 *
	 *
	 */
	exports.itemView = require('model-dock');

	/**
	 * Retrieves OR stores the view that represents a model instance.
	 *
	 * @method itemViewInstance
	 * @param model {Bakcobne Model Object}
	 * @param [view] {Bakcobne View Object}
	 */
	exports.itemViewInstance = function itemViewInstance(model, view) {

		if (arguments.length === 1) {
			// get
			return this.itemViews[model.cid];

		} else if (arguments.length === 2) {
			// store
			this.itemViews[model.cid] = view;
		}
	};
});

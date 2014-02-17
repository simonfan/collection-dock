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
	var _ = require('lodash');

	/**
	 * Returns a placeholder for the item.
	 *
	 * @method itemPlaceholder
	 * @param model
	 */
	exports.itemPlaceholder = function itemPlaceholder(model) {
		return '<li class="placeholder">placeholder for ' + model.get('id') + '</li>';
	};

	/**
	 * Returns the data from the model.
	 *
	 * @method itemData
	 * @param model
	 * @param [done] {Function}
	 */
	exports.itemData = function itemData(model) {
		return model.attributes;
	};

	/**
	 *
	 *
	 * @method itemTemplate
	 * @param data {Object}
	 */
	exports.itemTemplate = function itemTemplate(data) {
		return '<li id="' + data.id + '"> Item id: ' + data.id + '</li>';
	};

	/**
	 *
	 *
	 * @method itemSelector
	 * @param model
	 */
	exports.itemSelector = function itemSelector(model) {
		return '[' + this.elementTypeAttribute + '="item"]' + ':eq(' + this.collection.indexOf(model) + ')';
	};


	/**
	 *
	 *
	 * @property elementTypeAttribute
	 */
	exports.elementTypeAttribute = 'data-__collection-dock__-type';

	/**
	 * Method that retrieves the $el for a given backbone model.
	 * Uses the 'itemSelector' method.
	 *
	 * @method retrieve$El
	 * @param [model]
	 */
	exports.retrieve$El = function retrieve$El(model) {
		var selector;

		if (_.isArray(model)) {
			// array of models

			selector = _.map(model, _.bind(function (model, index) {
				return this.itemSelector(model);
			}, this)).join(',');

		} else {
			// single model
			selector = this.itemSelector(model);
		}

		return this.$el.find(selector);
	};
});

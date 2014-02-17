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
		$ = require('jquery');

	/**
	 * Step in which the placeholder is put into place.
	 *
	 * @method place
	 * @param model {model Object}
	 * @param $placeholder {jq Object}
	 */
	exports.place = function place(model, $placeholder) {
	//	console.log('place')
		var index = this.collection.indexOf(model),
			$beforeIndex = this.$el.children().eq(index - 1);

		if ($beforeIndex.length > 0) {
			$beforeIndex.after($placeholder);
		} else {
			this.$el.append($placeholder);
		}
	};

	/**
	 * Action run before the item is placed.
	 * Return promise if you need async functionality.
	 *
	 * @method beforeAdd
	 * @param model {model Object}
	 * @param $item {jq Object}
	 * @param $placeholder {jq Object}
	 */
	exports.beforeAdd = function beforeAdd(model, $item, $placeholder) {

	//	console.log('beforeAdd')
		$item.css('opacity', 0);

		return $placeholder.css({ opacity: 0 });
	};

	/**
	 *
	 *
	 * @method add
	 * @param model
	 * @param $item
	 * @param $placeholder
	 */
	exports.add = function add(model, $item, $placeholder) {
	//	console.log('add')
		$placeholder.replaceWith($item);
	};

	/**
	 *
	 *
	 * @method afterAdd
	 * @param model
	 * @param $item
	 */
	exports.afterAdd = function afterAdd(model, $item) {
	//	console.log('afterAdd')
		return $item.animate({ opacity: 1 });
	};

});

//     collection-dock
//     (c) simonfan
//     collection-dock is licensed under the MIT terms.

/**
 * Object that connects data to the html.
 *
 * @module collection-dock
 */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		backbone = require('lowercase-backbone');

	// sub
	var initAttach = require('./__collection-dock/attach/initialize');

	/**
	 * @class collectionDock
	 * @constructor
	 * @param extensions {Object}
	 */
	var dock = module.exports = backbone.view.extend(function collectionDock(extensions) {

		/**
		 * The extensions object will be incorporated to the new object.
		 *
		 * @param extensions
		 */
		_.extend(this, extensions);

		if (!this.$el) {
			throw new Error('No "$el" property found on dock.');
		}

		// get the container.
		var $container = this.$container;

		if ($container) {
			this.$container = _.isString($container) ? this.$el.find($container) : $container;
		} else {
			this.$container = this.$el;
		}

		// initialize attach
		initAttach.call(this);
	});

	dock.proto(require('./__collection-dock/attach/methods'));
});

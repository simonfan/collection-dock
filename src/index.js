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

	/**
	 * @class collectionDock
	 * @constructor
	 * @param extensions {Object}
	 */
	var dock = module.exports = backbone.view.extend({
		initialize: function (options) {

			// initialize basic view
			backbone.view.prototype.initialize.apply(this, arguments);

			// initialize collection-dock
			this.initializeCollectionDock.apply(this, arguments);
		},

		/**
		 * Initialization logic for collectionDock
		 *
		 * @method initializeCollectionDock
		 * @param options {Object}
		 */
		initializeCollectionDock: function initializeCollectionDock(options) {

			/**
			 * The extensions object will be incorporated to the new object.
			 *
			 * @param extensions
			 */
			this.collection = options.collection || this.collection;

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


			// bind event handlers
			_.bindAll(this, 'handleAdd', 'handleRemove', 'handleReset', 'handleResort');

			/**
			 * Hash on which itemView instances are stored, keyed by model CID
			 *
			 * @property itemViews
			 * @type Objects
			 */
			this.itemViews = {};
		},
	});

	dock.proto(require('./__collection-dock/attach'));
	dock.proto(require('./__collection-dock/views-proxy'));


	dock.proto(require('./__collection-dock/event-handlers'));
	dock.proto(require('./__collection-dock/item/methods'));
});

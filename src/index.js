//     CollectionDock
//     (c)
//     CollectionDock is licensed under the MIT terms.

/**
 * AMD module.
 *
 * @module CollectionDock
 */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		subject = require('subject');

	// sub
	var intiAttach = require('./__collection-dock/attach/initialize');

	var dock = module.exports = subject(function collectionDock($el) {
		/**
		 * The $container within which the items should be rendered.
		 */
		this.$el = $el || this.$el;

		// initialize attach
		intiAttach.call(this);
	});

	dock.proto(require('./__collection-dock/attach/index'));
});

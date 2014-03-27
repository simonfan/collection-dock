/**
 * Proxies methods to the collection, if it is present.
 *
 * @module collection-dock
 * @submodule proxy
 */
define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	// events
	exports.on = function onViews() {
		var args = Array.prototype.slice.call(arguments);

		_.each(this.itemViews, function (view) {
			view.on.apply(view, args);
		});

		return this;
	};
});

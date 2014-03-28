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
	exports.onViews = function onViews() {
		var args = Array.prototype.slice.call(arguments);

		_.each(this.itemViews, function (view) {
			view.on.apply(view, args);
		});

		return this;
	};






	function invokeLodashMethod(method, args) {
		return _[method].apply(_, args);
	}



	var _methods = ['each', 'rest', 'first'];

	_.each(_methods, function (method) {
		exports[method] = function () {

			var args = Array.prototype.slice.call(arguments);

			// add itemViews
			args.unshift(this.itemViews);

			return invokeLodashMethod(method, args);
		};
	});
});

/**
 * Proxies methods to the collection, if it is present.
 *
 * @module collection-dock
 * @submodule proxy
 */
define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	exports.proxyMethod = function proxyMethod(method, args) {
		var collection = this.collection;

		if (collection) {
			return collection[method].apply(collection, args);
		}
	};

	// collection methods.
	var methods = ['get', 'set', 'each'];

	_.each(methods, function (method) {
		exports[method] = function () {
			return this.proxyMethod(method, arguments);
		};
	});
});

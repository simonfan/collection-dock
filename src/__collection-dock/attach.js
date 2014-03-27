/**
 * Defines methods that will be available
 * on dock instances.
 *
 * @module collection-dock
 * @submodule attach
 */
define(function (require, exports, module) {
	'use strict';

	// external
	var _ = require('lodash');

	/**
	 * event that indicates that the collection was completely
	 * reordered.
	 */
	exports.resortEvent = 'resort';

	/**
	 * Attaches a given Backbone collection to the data dock.
	 * basically detaches the previous collection and sets new listeners.
	 *
	 * @method attach
	 * @param collection
	 */
	exports.attach = function attach(collection) {

		// [1] detach
		this.detach();

		// [2] change collection
		this.collection = collection;

		// [3] events
		collection
			.on('add', this.handleAdd)
			.on('remove', this.handleRemove)
			.on('reset', this.handleReset)
			.on(this.resortEvent, this.handleResort);

		// [4] start.
		this.handleReset(collection);
	};


	/**
	 * Detaches the collection from the dock.
	 * Basically removes listeners.
	 *
	 * @method detach
	 */
	exports.detach = function detach() {

		if (this.collection) {
			this.collection
				.off('add', void(0), this)
				.off('remove', void(0), this)
				.off('reset', void(0), this)
				.off(this.resortEvent, void(0), this);
		}

		this.$container.html('');
	};
});

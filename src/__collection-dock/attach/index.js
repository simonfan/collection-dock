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

	// sub
	var handleAdd = require('./handle-add/index'),
		handleRemove = require('./handle-remove/index'),
		handleReset = require('./handle-reset/index'),
		handleResort = require('./handle-resort/index');

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
			.on('add', _.bind(handleAdd, this))
			.on('remove', _.bind(handleRemove, this))
			.on('reset', _.bind(handleReset, this))
			.on(this.resortEvent, _.bind(handleResort));

		// [4] start.
		handleReset.call(this, collection);
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

	// item-related
	_.extend(exports, require('./item'));

	// action runner
	_.extend(exports, require('./exec'));

	// actions
	_.extend(exports, require('./handle-add/actions'));
	_.extend(exports, require('./handle-remove/actions'));
	_.extend(exports, require('./handle-reset/actions'));
	_.extend(exports, require('./handle-resort/actions'));
});

/**
 * Defines methods that generate item-related templates and data.
 * Methods here should be overwritten for custom behaviour.
 *
 * @module collection-dock
 * @submodule item
 */
define(function (require, exports, module) {
	'use strict';

	// external
	var _ = require('lodash'),
		q = require('q');

	/**
	 * Builds the itemvieW.
	 *
	 * @method buildItemView
	 * @param options {Object}
	 */
	exports.buildItemView = function buildItemView(options) {

		// reference to the collectionView
		options.collectionView = this;

		return this.itemView(options);
	};

	/**
	 * Must return an view object with a 'remove' method.
	 *
	 *
	 */
	exports.itemView = require('./view');



	// STORAGE

	// by index

	/**
	 * Retrieves the view object at a given index.
	 *
	 * @method at
	 * @param index {Number}
	 */
	exports.getViewAt = function getViewAt(index) {
		if (index >= 0) {
			var model = this.collection.at(index);

			return this.getView(model.cid);
		}
	};

	/**
	 * Stores the view at a given modelCid.
	 *
	 * @method store
	 * @param modelCid {Number|Backbone Model}
	 * @param view {Backbone View}
	 */
	exports.storeView = function storeView(modelCid, view) {
		// if modelCid is an object, it must be the model itself.
		modelCid = _.isObject(modelCid) ? modelCid.cid : modelCid;

		this.itemViews[modelCid] = view;

		return this;
	};

	/**
	 * Retrieves the view for a given model/modelCid
	 *
	 * @method getView
	 * @param modelCid {Number|Backbone Model}
	 */
	exports.getView = function getView(modelCid) {
		// if modelCid is an object, it must be the model itself.
		modelCid = _.isObject(modelCid) ? modelCid.cid : modelCid;

		return this.itemViews[modelCid];
	};
	/**
	 * Deletes the view for a given model/modelCid from the itemViews hash.
	 *
	 * @method getView
	 * @param modelCid {Number|Backbone Model}
	 */
	exports.removeView = function removeView(modelCid) {
		// if modelCid is an object, it must be the model itself.
		modelCid = _.isObject(modelCid) ? modelCid.cid : modelCid;
		delete this.itemViews[modelCid];

		return this;
	};

});

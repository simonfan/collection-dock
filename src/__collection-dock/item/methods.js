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
	var _ = require('lodash');

	/**
	 * Builds the itemvieW.
	 *
	 * @method buildItemView
	 * @param options {Object}
	 */
	exports.buildItemView = function buildItemView(model) {

		// build the view
		var view = this.itemView({
			model: model,
			collectionView: this,
		});

		// get index
		var index = this.collection.indexOf(view.model);

		// store
		this.itemViews.splice(index, 0, view);

		return view;
	};

	/**
	 * Must return an view object with a 'remove' method.
	 *
	 *
	 */
	exports.itemView = require('./view');



	// STORAGE

	/**
	 * Retrieves the view object at a given index.
	 *
	 * @method at
	 * @param index {Number}
	 */
	exports.getViewAt = function getViewAt(index) {
		return this.itemViews[index];
	};

	exports.eraseViewAt = function eraseViewAt(index) {
		this.itemViews.splice(index, 1);

		return this;
	};



	/**
	 * Retrieves the view for a given model/mcid
	 *
	 * @method getView
	 * @param mcid {Number}
	 */
	exports.getView = function getView(mcid) {
		return _.find(this.itemViews, function (view) {
			return view.model.cid === mcid;
		});
	};


	/**
	 * Deletes the view for a given model/mcid from the itemViews hash.
	 *
	 * @method getView
	 * @param mcid {Number}
	 */
	exports.eraseView = function eraseView(mcid) {

		var index = _.findIndex(this.itemViews, function (view) {
			return view.model.cid === mcid;
		});

		return this.eraseViewAt(index);
	};

});

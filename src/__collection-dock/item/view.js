define(function (require, exports, module) {
	'use strict';

	var $ = require('jquery'),
		backbone = require('lowercase-backbone');

	module.exports = backbone.view.extend({

		/**
		 *
		 *
		 * @method initialize
		 * @param options {Object}
		 */
		initialize: function (options) {

			backbone.view.prototype.initialize.apply(this, arguments);

			this.initializeItemView.apply(this, arguments);

			this.render();
		},

		/**
		 * Holds initialization logic exclusive to itemView.
		 *
		 * @method initializeItemView
		 * @param options {Object}
		 */
		initializeItemView: function initializeItemView(options) {
			this.collectionView = options.collectionView;
		},


		html: '<div></div>',

		/**
		 * This method is invoked by backbone.view.prototype.initialize,
		 * as the backbone.view requires the html to be ready before
		 * attachment intialization.
		 *
		 * @method render
		 */
		render: function render() {
			// get the position at which this model is.
			var index = this.collectionView.collection.indexOf(this.model);

			// build the $el.
			this.$el = $(this.html);

			// get the view that represents the model before this one.
			var viewBefore = this.collectionView.getViewAt(index - 1);

			if (viewBefore) {
				// if htere is a view before,
				// insert this.$el after that view's $el
				this.$el.insertAfter(viewBefore.$el);

			} else {
				// otherwise, the collectionView is still empty,
				// thus just append to the container
				this.$el.appendTo(this.collectionView.$container);

			}
		},

		/**
		 * Intercepts the default remove method, so
		 * that we can make sure the item is also removed from the collectionView's hash
		 *
		 * @method remove
		 */
		remove: function removeCollectionItemView() {

			// remove itself from collection view
			this.collectionView.eraseView(this.model.cid);

			backbone.view.prototype.remove.apply(this, arguments);
		},
	});
});

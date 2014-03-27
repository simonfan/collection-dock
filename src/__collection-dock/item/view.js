define(function (require, exports, module) {

	var modelDock = require('model-dock'),
		$ = require('jquery');

	module.exports = modelDock.extend({

		/**
		 * Saves reference to the collectionView
		 *
		 * @method initialize
		 * @param options {Object}
		 */
		initialize: function initializeCollectionItemView(options) {
			// save reference to collectionView
			// this must be done before modelDock.initialize,
			// as the render method requires the collectionView object.
			this.collectionView = options.collectionView;

			modelDock.prototype.initialize.apply(this, arguments);
		},


		html: '<div></div>',

		/**
		 * This method is invoked by modelDock.prototype.initialize,
		 * as the modelDock requires the html to be ready before
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
			this.collectionView.removeView(this.model.cid);

			modelDock.prototype.remove.apply(this, arguments);
		},
	});
});

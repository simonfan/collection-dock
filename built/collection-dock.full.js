
/**
 * Defines methods that will be available
 * on dock instances.
 *
 * @module collection-dock
 * @submodule attach
 */
define('__collection-dock/attach',['require','exports','module','lodash'],function (require, exports, module) {
	

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

/**
 * Proxies methods to the collection, if it is present.
 *
 * @module collection-dock
 * @submodule proxy
 */
define('__collection-dock/views-proxy',['require','exports','module','lodash'],function (require, exports, module) {
	

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

/**
 * Defines the event handler for 'add' events on the collection.
 *
 * @module collection-dock
 * @submodule event-hanlders
 */
define('__collection-dock/event-handlers',['require','exports','module','lodash','jquery'],function (require, exports, module) {
	

	// external
	var _ = require('lodash'),
		$ = require('jquery');

	/**
	 * Handles add events on the collection.
	 *
	 * @method handleAdd
	 * @private
	 * @param model {model Object}
	 */
	exports.handleAdd = function handleAdd(model) {
		// [1] instantiate the itemView
		var view = this.buildItemView({
			model: model,
		});

		// [2] store
		this.storeView(model, view);
	};

	/**
	 * Handles remove events on the collection.
	 *
	 * @method handleRemove
	 * @private
	 * @param model {model Object}
	 */
	exports.handleRemove = function handleRemove(model, index) {
		var view = this.getView(model);

		if (view) {
			view.remove();
		}
	};

	/**
	 * Handles reset events on the collection.
	 *
	 * @method handleReset
	 * @private
	 * @param model {model Object}
	 */
	exports.handleReset = function handleReset(collection, options) {

		// This is just to be faster: remove everything at once!
		this.$container.html('');

		this.collection.each(this.handleRemove);

		this.collection.each(this.handleAdd);
	};


	/**
	 * Handles resort events on the collection.
	 *
	 * @method handleResort
	 * @private
	 * @param model {model Object}
	 */
	exports.handleResort = function handleResort(collection, options) {
		this.handleReset(collection, this.$container);
	};

});

define('__collection-dock/item/view',['require','exports','module','jquery','lowercase-backbone'],function (require, exports, module) {
	

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
			this.collectionView.removeView(this.model.cid);

			backbone.view.prototype.remove.apply(this, arguments);
		},
	});
});

/**
 * Defines methods that generate item-related templates and data.
 * Methods here should be overwritten for custom behaviour.
 *
 * @module collection-dock
 * @submodule item
 */
define('__collection-dock/item/methods',['require','exports','module','lodash','./view'],function (require, exports, module) {
	

	// external
	var _ = require('lodash');

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

//     collection-dock
//     (c) simonfan
//     collection-dock is licensed under the MIT terms.

/**
 * Object that connects data to the html.
 *
 * @module collection-dock
 */

define('collection-dock',['require','exports','module','lodash','lowercase-backbone','./__collection-dock/attach','./__collection-dock/views-proxy','./__collection-dock/event-handlers','./__collection-dock/item/methods'],function (require, exports, module) {
	

	var _ = require('lodash'),
		backbone = require('lowercase-backbone');

	/**
	 * @class collectionDock
	 * @constructor
	 * @param extensions {Object}
	 */
	var dock = module.exports = backbone.view.extend({
		initialize: function (options) {

			// initialize basic view
			backbone.view.prototype.initialize.apply(this, arguments);

			// initialize collection-dock
			this.initializeCollectionDock.apply(this, arguments);
		},

		/**
		 * Initialization logic for collectionDock
		 *
		 * @method initializeCollectionDock
		 * @param options {Object}
		 */
		initializeCollectionDock: function initializeCollectionDock(options) {

			/**
			 * The extensions object will be incorporated to the new object.
			 *
			 * @param extensions
			 */
			this.collection = options.collection || this.collection;

			if (!this.$el) {
				throw new Error('No "$el" property found on dock.');
			}

			// get the container.
			var $container = this.$container;

			if ($container) {
				this.$container = _.isString($container) ? this.$el.find($container) : $container;
			} else {
				this.$container = this.$el;
			}


			// bind event handlers
			_.bindAll(this, 'handleAdd', 'handleRemove', 'handleReset', 'handleResort');

			/**
			 * Hash on which itemView instances are stored, keyed by model CID
			 *
			 * @property itemViews
			 * @type Objects
			 */
			this.itemViews = {};
		},
	});

	dock.proto(require('./__collection-dock/attach'));
	dock.proto(require('./__collection-dock/views-proxy'));


	dock.proto(require('./__collection-dock/event-handlers'));
	dock.proto(require('./__collection-dock/item/methods'));
});

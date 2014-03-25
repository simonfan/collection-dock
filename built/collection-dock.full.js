
/**
 * Initialization logic for attach.
 *
 * @module collection-dock
 * @submodule attach.initialize
 */
define('__collection-dock/attach/initialize',['require','exports','module','lodash'],function (require, exports, module) {
	

	// external
	var _ = require('lodash');

	module.exports = function initializeAttach() {

		// bind event handlers
		_.bindAll(this, 'handleAdd', 'handleRemove', 'handleReset', 'handleResort');

		/**
		 * Hash on which itemView instances are stored.
		 *
		 * @property itemViews
		 * @type Object
		 */
		this.itemViews = {};
	};
});

/**
 * Defines methods that generate item-related templates and data.
 * Methods here should be overwritten for custom behaviour.
 *
 * @module collection-dock
 * @submodule item
 */
define('__collection-dock/attach/item',['require','exports','module','lodash','model-dock'],function (require, exports, module) {
	

	// external
	var _ = require('lodash');

	/**
	 * Places the $item at a given position within the container.
	 *
	 * @method placeItemHtml
	 * @param at {Number}
	 * @param $item {jq Object}
	 */
	exports.placeItemHtml = function placeItemHtml(at, $item) {

		var $beforeIndex = this.$container.children().eq(at - 1);

		if ($beforeIndex.length > 0) {
			$beforeIndex.after($item);
		} else {
			this.$container.append($item);
		}
	};

	/**
	 * Either method or property,
	 * is / returns the html string for the item.
	 *
	 * @method itemHtml
	 * @param model
	 */
	exports.itemHtml = '<div></div>';

	/**
	 * Must return an view object with a 'remove' method.
	 *
	 *
	 */
	exports.itemView = require('model-dock');

	/**
	 * Retrieves OR stores the view that represents a model instance.
	 *
	 * @method itemViewInstance
	 * @param model {Bakcobne Model Object}
	 * @param [view] {Bakcobne View Object}
	 */
	exports.itemViewInstance = function itemViewInstance(model, view) {

		if (arguments.length === 1) {
			// get
			return this.itemViews[model.cid];

		} else if (arguments.length === 2) {
			// store
			this.itemViews[model.cid] = view;
		}
	};
});

/**
 * Defines the event handler for 'add' events on the collection.
 *
 * @module collection-dock
 * @submodule event-hanlders
 */
define('__collection-dock/attach/event-handlers',['require','exports','module','lodash','jquery'],function (require, exports, module) {
	

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

		// [1] $item
		var itemHtml = _.isString(this.itemHtml) ? this.itemHtml : this.itemHtml(model.attributes),
			$item = $(itemHtml);

		// [2] placeItemHtml
		// [2.1] get index
		var at = this.collection.indexOf(model);
		this.placeItemHtml(at, $item);

		// [3] instantiate the itemView
		// [3.1] instantiate
		var view = this.itemView({
			model: model,
			el: $item,
			$el: $item
		});

		// [3.2] store
		this.itemViewInstance(model, view);
	};

	/**
	 * Handles remove events on the collection.
	 *
	 * @method handleRemove
	 * @private
	 * @param model {model Object}
	 */
	exports.handleRemove = function handleRemove(model) {
		// retrieve the item view.
		var view = this.itemViewInstance(model);

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

/**
 * Defines methods that will be available
 * on dock instances.
 *
 * @module collection-dock
 * @submodule attach
 */
define('__collection-dock/attach/methods',['require','exports','module','lodash','./item','./event-handlers'],function (require, exports, module) {
	

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

	// item-related
	_.extend(exports, require('./item'));

	// event-handlers
	_.extend(exports, require('./event-handlers'));
});

/**
 * Proxies methods to the collection, if it is present.
 *
 * @module collection-dock
 * @submodule proxy
 */
define('__collection-dock/proxy',['require','exports','module','lodash'],function (require, exports, module) {
	

	var _ = require('lodash');

	exports.proxyMethod = function proxyMethod(method, args) {
		var collection = this.collection;

		if (collection) {
			return collection[method].apply(collection, args);
		}
	};

	// collection methods.
	var methods = ['get', 'set', 'each', 'add'];

	_.each(methods, function (method) {
		exports[method] = function () {
			return this.proxyMethod(method, arguments);
		};
	});
});

//     collection-dock
//     (c) simonfan
//     collection-dock is licensed under the MIT terms.

/**
 * Object that connects data to the html.
 *
 * @module collection-dock
 */

define('collection-dock',['require','exports','module','lodash','lowercase-backbone','./__collection-dock/attach/initialize','./__collection-dock/attach/methods','./__collection-dock/proxy'],function (require, exports, module) {
	

	var _ = require('lodash'),
		backbone = require('lowercase-backbone');

	// sub
	var initAttach = require('./__collection-dock/attach/initialize');

	/**
	 * @class collectionDock
	 * @constructor
	 * @param extensions {Object}
	 */
	var dock = module.exports = backbone.view.extend(function collectionDock(extensions) {

		// initialize basic view
		backbone.view.prototype.initialize.apply(this, arguments);

		/**
		 * The extensions object will be incorporated to the new object.
		 *
		 * @param extensions
		 */
		_.extend(this, extensions);

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

		// initialize attach
		initAttach.call(this);
	});

	dock.proto(require('./__collection-dock/attach/methods'));
	dock.proto(require('./__collection-dock/proxy'));
});

(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././src' :
		// browser
		'collection-dock',
		// dependencies for the test
		deps = [mod, 'should', 'jquery', 'backbone', 'q'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(collectionDock, should, $, Backbone, Q) {
	'use strict';

	describe('collectionDock', function () {
		beforeEach(function () {
			this.$fixture = $('<div id="fixture"></div>').appendTo($('body'));
		});

		afterEach(function () {
			this.$fixture.remove();
		})


		it('is fine (:', function () {

			var dock = collectionDock({ $el: this.$fixture });

			// dock instantiation
			dock.should.be.type('object');
		});

		it('presents attached collections on attachment', function (done) {

			var dock = collectionDock({ $el: this.$fixture });

			var fruits = new Backbone.Collection([
				{ name: 'Banana', id: 0 },
				{ name: 'Apple', id: 2 }
			]);

			dock.attach(fruits);

			setTimeout(_.bind(function () {
				this.$fixture.children().length.should.eql(2);
				done();
			}, this), 0);
		})


		/**
		 * ITEM
		 */
		describe('item', function () {
			beforeEach(function (done) {
				this.dock = collectionDock({ $el: this.$fixture });

				this.fruits = new Backbone.Collection();

				// attach
				this.dock.attach(this.fruits);

				// add
				this.fruits.add([
					{ id: 1, name: 'Banana' },
					{ id: 2, name: 'Apple' },
					{ id: 3, name: 'Watermelon' }
				]);

				// run at next tick.
				setTimeout(done, 10);
			});

			it('retrieve$El', function () {
				var $el = this.dock.retrieve$El(this.fruits.get(2));

				$el.should.be.type('object');
				$el.length.should.eql(1);
			});
		});




		/**
		 *
		 * Handle Add
		 *
		 *
		 */
		describe('handleAdd', function () {

			beforeEach(function () {
				this.dock = collectionDock({ $el: this.$fixture });
			})

			it('handles adding', function () {

				var d = this.dock;

				var fruits = new Backbone.Collection();

				d.attach(fruits);

				// add a model on the collection
				fruits.add({
					id: 1,
					name: 'Banana'
				});


				this.$fixture.children().length.should.eql(1);


				fruits.add([
					{ id: 2, name: 'Apple' },
					{ id: 3, name: 'Watermelon' }
				]);

				this.$fixture.children().length.should.eql(3);

			});
		});



		/**
		 *
		 * Handle remove
		 *
		 *
		 */
		describe('handleRemove', function () {
			beforeEach(function (done) {
				this.dock = collectionDock({ $el: this.$fixture });

				this.fruits = new Backbone.Collection();

				// attach
				this.dock.attach(this.fruits);

				// add
				this.fruits.add([
					{ id: 1, name: 'Banana' },
					{ id: 2, name: 'Apple' },
					{ id: 3, name: 'Watermelon' }
				]);


				// next tick
				setTimeout(done, 100);
			});

			it('handles removal', function (done) {

				this.fruits.remove(this.fruits.get(3));

				// test on next tick
				setTimeout(_.bind(function () {
					this.$fixture.children().length.should.eql(2);

					done();
				}, this), 0);

			})
		});
	});
});

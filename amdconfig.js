require.config({
	urlArgs: 'bust=0.3341490481980145',
	baseUrl: '/src',
	paths: {
		requirejs: '../bower_components/requirejs/require',
		text: '../bower_components/requirejs-text/text',
		mocha: '../node_modules/mocha/mocha',
		should: '../node_modules/should/should',
		'collection-dock': 'index',
		lodash: '../bower_components/lodash/dist/lodash.compat',
		qunit: '../bower_components/qunit/qunit/qunit',
		'requirejs-text': '../bower_components/requirejs-text/text',
		subject: '../bower_components/subject/built/subject',
		jquery: '../bower_components/jquery/dist/jquery',
		sizzle: '../bower_components/sizzle/dist/sizzle',
		underscore: '../bower_components/underscore/underscore',
		q: '../bower_components/q/q',
		backbone: '../bower_components/backbone/backbone',
		'lowercase-backbone': '../bower_components/lowercase-backbone/built/lowercase-backbone',
		'jquery.filler': '../bower_components/jquery.filler/built/jquery.filler',
		'model-dock': '../bower_components/model-dock/built/model-dock'
	},
	shim: {
		backbone: {
			exports: 'Backbone',
			deps: [
				'jquery',
				'underscore'
			]
		},
		underscore: {
			exports: '_'
		},
		mocha: {
			exports: 'mocha'
		},
		should: {
			exports: 'should'
		}
	}
});

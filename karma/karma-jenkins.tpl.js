module.exports = function (karma) {
    karma.set({
        /**
         * From where to look for files, starting with the location of this file.
         */
        basePath: '../',

        /**
         * This is the list of file patterns to load into the browser during testing.
         */
        files: [
            <% scripts.forEach( function ( file ) { %>'<%= file %>',
            <% }); %>
            'src/**/*.js',
            'src/**/*.coffee'
        ],
        exclude: [
            'src/assets/**/*.js',
            'src/**/*.e2e.js'
        ],
        frameworks: [ 'jasmine' ],
        plugins: [ 'karma-jasmine', 'karma-coverage', 'karma-firefox-launcher', 'karma-chrome-launcher', 'karma-phantomjs-launcher', 'karma-coffee-preprocessor', 'karma-junit-reporter', 'karma-ie-launcher' ],
        preprocessors: {
            '**/*.coffee': 'coffee',
	        'src/**/!(*spec).js': ['coverage']
        },

        /**
         * How to report, by default.
         */
        reporters: ['dots', 'coverage', 'junit'],

	    coverageReporter: {
            reporters:[
                {type: 'html', subdir: '/html'},
                {type: 'cobertura', subdir: '/jenkins', file: 'coverage.xml'}
            ],
            dir: './reports/coverage/'
	    },

        junitReporter: {
            outputDir: 'reports/junit' // results will be saved as $outputDir/$browserName.xml
            //outputFile: 'TEST-results.xml' // if included, results will be saved as
            // $outputDir/$browserName/$outputFile
            //suite: ''
        },

        /**
         * On which port should the browser connect, on which port is the test runner
         * operating, and what is the URL path for the browser to use.
         */
        port: 9018,
        runnerPort: 9100,
        urlRoot: '/',

        /**
         * Disable file watching by default.
         */
        autoWatch: false,

        /**
         *
         * Continuous Integration mode
         * if true, Karma captures browsers, runs the tests and exits
         *
        */
        singleRun: true,

        /**
         * The list of browsers to launch to test on. This includes only "Firefox" by
         * default, but other browser names include:
         * Chrome, ChromeCanary, Firefox, Opera, Safari, PhantomJS
         *
         * Note that you can also use the executable name of the browser, like "chromium"
         * or "firefox", but that these vary based on your operating system.
         *
         * You may also leave this blank and manually navigate your browser to
         * http://localhost:9018/ when you're running tests. The window/tab can be left
         * open and the tests will automatically occur there during the build. This has
         * the aesthetic advantage of not launching a browser every time you save.
         */
        browsers: [
            'Chrome', 'Firefox', 'PhantomJS'//, 'IE'
        ]
    });
};

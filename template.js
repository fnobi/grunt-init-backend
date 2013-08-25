exports.description = 'web app backend template (express + mongoose + socket.io)';

// Template-specific notes to be displayed before question prompts.
exports.notes = '';

// Template-specific notes to be displayed after question prompts.
exports.after = '';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function (grunt, init, done) {
    // custom methods
    require('./customMethods')(grunt, init);

    init.process( {}, [
        init.prompt('name'),
        init.prompt('description'),
        {
            name: 'port',
            message: 'port number used by express server.',
            default: 80,
            validator: new RegExp('^[0-9]+$')
        },
        {
            name: 'main_model',
            message: 'model used mainly',
            default: 'User',
            validator: new RegExp('^[A-Z][A-Za-z]*$')
        }
    ], function(err, props) {
        // Files to copy (and process).
        var files = init.filesToCopy(props);

        init.boolProps(props);

        var pkg = {
            name: props.name,
            description: props.description,
            version: '0.0.0',
            scripts: { },
            engines: {
                node: '>=0.8.0 <0.9.1'
            },
            dependencies: {
                "config": "~0.4.25",
                "mongoose": "~3.6.11",
                "async": "~0.2.8",
                'chai': '~1.6.1',
                "express": "~3.3.4",
                "socket.io": "~0.9.16"

            }
        };

        // if (!props.with_test) {
        //     init.escapeFiles('test/*.*', files);
        //     delete pkg.devDependencies['grunt-mocha-html'];
        //     delete pkg.devDependencies['grunt-mocha-phantomjs'];
        //     delete pkg.devDependencies['chai'];
        //     delete pkg.devDependencies['mocha'];
        // }
        // 
        // if (!props.with_ejs) {
        //     init.escapeFiles('src/ejs/**/*.*', files);
        //     delete pkg.devDependencies['grunt-simple-ejs'];
        // } else {
        //     init.escapeFiles('index.html', files);
        // }

        props.template_name = 'backend';
        props.project_path = process.cwd();
        props.pkg = pkg;

        // Actually copy (and process) files.
        init.copyAndProcess(files, props, {});

        // write package.json
        init.writePackageJSON('package.json', pkg);

        // All done!
        done();
    });
};


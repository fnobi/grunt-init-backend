var shellLines = require('shell_lines');

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
        init.prompt('version'),
        {
            name: 'port',
            message: 'port number used by express server.',
            default: 80,
            validator: new RegExp('^[0-9]+$')
        },
        {
            name: 'main_model',
            message: 'model used mainly',
            default: 'Item',
            validator: new RegExp('^[A-Z][a-z]+$')
        }
    ], function(err, props) {
        props.main_model_instance = props.main_model.toLowerCase();

        // Files to copy (and process).
        var files = init.filesToCopy(props);

        var pkg = {
            name: props.name,
            description: props.description,
            version: props.version,
            scripts: {
                test: 'NODE_ENV=test mocha',
                start: 'node server'
            },
            dependencies: {
                "config": "~0.4.25",
                "mongoose": "~3.6.11",
                "async": "~0.2.8",
                "ejs": "~0.8.4",
                'chai': '~1.6.1',
                "express": "~3.3.4",
                "socket.io": "~0.9.16"
            }
        };

        props.template_name = 'backend';
        props.project_path = process.cwd();
        props.pkg = pkg;

        // Actually copy (and process) files.
        init.copyAndProcess(files, props, {});

        // write package.json
        init.writePackageJSON('package.json', pkg);

        // npm install & bower install
        shellLines([{
            command: 'npm install',
            message: 'Installing npm dependencies'
        }], done);
    });
};

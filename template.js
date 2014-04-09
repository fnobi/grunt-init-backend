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
            validator: new RegExp('^[0-9]+$')
        },
        {
            name: 'use_model',
            message: 'use model (mongoose)? [Y|n]',
            default: 'Y',
            validator: /^(Y|n)$/
        },
        {
            name: 'use_socketio',
            message: 'use socket.io? [Y|n]',
            default: 'n',
            validator: /^(Y|n)$/
        },
        {
            name: 'host_name',
            message: 'host name for production',
            validator: /^[a-z0-9-_.]+$/
        },
        {
            name: 'main_model',
            message: 'model used mainly.',
            default: 'Item',
            validator: new RegExp('^[A-Z][a-z]+$')
        }
    ], function(err, props) {
        // custom props.
        props.use_model = (props.use_model == 'Y') ? true : false;
        props.use_socketio = (props.use_socketio == 'Y') ? true : false;
        props.main_model_instance = props.main_model.toLowerCase();
        props.template_name = 'backend';
        props.project_path = process.cwd();

        // files to copy (and process).
        var files = init.filesToCopy(props);

        // init package.json
        var pkg = {
            name: props.name,
            description: props.description,
            version: props.version,
            scripts: {
                test: 'NODE_ENV=test mocha',
                prestart: 'npm install',
                start: 'NODE_ENV=production forever start --sourceDir . --pidFile ' + props.host_name + '.pid -l ' + props.host_name + '.log --append server.js'
            },
            dependencies: {
                "config": "~0.4.25",
                "async": "~0.2.8",
                "ejs": "~0.8.4",
                'chai': '~1.6.1',
                "express": "~3.3.4",
                "mongoose": "~3.6.11",
                "socket.io": "~0.9.16"
            }
        };

        // process flag
        if (!props.use_model) {
            delete pkg.dependencies['mongoose'];
            init.escapeFiles('models/*', files);
            init.escapeFiles('routes/' + props.main_model_instance + '*', files);
            init.escapeFiles('test/model-*', files);
            init.escapeFiles('test/route-' + props.main_model_instance + '*', files);
            init.escapeFiles('views/' + props.main_model_instance + '*', files);
        }

        if (!props.use_socketio) {
            delete pkg.dependencies['socket.io'];
            init.escapeFiles('socket-app.js', files);
        }

        // set package.json
        props.pkg = pkg;

        // actually copy (and process) files.
        init.copyAndProcess(files, props, {});

        // write package.json
        init.writePackageJSON('package.json', pkg, function (pkg, props) {
            pkg.scripts = props.scripts;
            return pkg;
        });

        // npm install & bower install
        shellLines([{
            command: 'npm install',
            message: 'Installing npm dependencies'
        }], done);
    });
};

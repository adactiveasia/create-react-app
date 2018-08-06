const path = require('path');

module.exports = {
    scriptsToAdd: {
        start: "npm run build-css && run-p -ncr watch-css start-js",
        "start-js": "react-app-rewired start --scripts-version @adactive/kiosk-react-scripts",
        build: "run-s -n build-css build-js",
        "build-js": "react-app-rewired build --scripts-version @adactive/kiosk-react-scripts",
        test: "run-s -n build-css test-js",
        "test-js": "react-app-rewired test --env=jsdom --scripts-version @adactive/kiosk-react-scripts",
        "build-css": "node-less-chokidar src",
        "watch-css": "node-less-chokidar src --watch",
        serve: "cd build && ws --spa",
        "compile-server": "webpack --config ./build-conf/webpack.config.server.js",
        doc: "jsdoc -c ./build-conf/jsdoc_conf.app.json -t ./node_modules/ink-docstrap/template",
        "doc-server": "jsdoc -c ./build-conf/jsdoc_conf.server.json -t ./node_modules/ink-docstrap/template",
        "startServer": "node ./public/startServer --port 9001 --jsonConfigFile ./public/config.json --data_folder ./public/local"
    },
    dependenciesToAdd: {
        "@adactive/adactive-abstract-options": "^1.0.0",
        "@adactive/adactive-logger": "^1.0.0",
        "@adactive/adsum-client-analytics": "^3.0.0-rc.4",
        "@adactive/adsum-client-api": "^2.3.2",
        "@adactive/adsum-utils": "^0.0.2-y.44.46",
        "@adactive/adsum-web-map": "^5.4.0",
        "@adactive/arc-map": "^0.0.2-y.44.46",
        "body-parser": "^1.18.2",
        "check-types": "^7.3.0",
        "compression": "^1.7.2",
        "cors": "^2.8.4",
        "express": "^4.16.3",
        "flow-bin": "^0.72.0",
        "fs-extra": "6.0.1",
        "imports-loader": "^0.8.0",
        "lodash": "^4.17.10",
        "react": "^16.4.2",
        "react-dom": "^16.4.2",
        "react-responsive": "^4.1.0",
        "serve-static": "^1.13.2",
        "winston": "^3.0.0"
    },
    devDependenciesToAdd: {
        "babel-loader": "7.1.2",
        "babel-preset-airbnb": "^2.5.3",
        "eslint-config-airbnb": "^16.1.0",
        "uglifyjs-webpack-plugin": "^1.2.7",
        "webpack": "^3.12.0"
    },
    dependenciesToRemove: ['npm', 'prompt', 'chalk'],
    fileLocations: {
        packageJsonLocation: path.resolve(__dirname, '../package.json'),
        firebaseConfigLocation: path.resolve(__dirname, '../src/services/firebaseConfig.json'),
        firebaseServiceLocation: path.resolve(__dirname, '../src/services/FirebaseService.js'),
        adsumConfigLocation: path.resolve(__dirname, '../public', 'config.json')
    }
};

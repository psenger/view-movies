'use strict';

const errorOverlayMiddleware = require('react-error-overlay/middleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const config = require('./webpack.config.dev');
const bodyParser = require('body-parser');
const paths = require('./paths');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';

module.exports = function(proxy, allowedHost) {
  return {
    // WebpackDevServer 2.4.3 introduced a security fix that prevents remote
    // websites from potentially accessing local content through DNS rebinding:
    // https://github.com/webpack/webpack-dev-server/issues/887
    // https://medium.com/webpack/webpack-dev-server-middleware-security-issues-1489d950874a
    // However, it made several existing use cases such as development in cloud
    // environment or subdomains in development significantly more complicated:
    // https://github.com/facebookincubator/create-react-app/issues/2271
    // https://github.com/facebookincubator/create-react-app/issues/2233
    // While we're investigating better solutions, for now we will take a
    // compromise. Since our WDS configuration only serves files in the `public`
    // folder we won't consider accessing them a vulnerability. However, if you
    // use the `proxy` feature, it gets more dangerous because it can expose
    // remote code execution vulnerabilities in backends like Django and Rails.
    // So we will disable the host check normally, but enable it if you have
    // specified the `proxy` setting. Finally, we let you override it if you
    // really know what you're doing with a special environment variable.
    disableHostCheck: !proxy ||
      process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',
    // Enable gzip compression of generated files.
    compress: true,
    // Silence WebpackDevServer's own logs since they're generally not useful.
    // It will still show compile warnings and errors with this setting.
    clientLogLevel: 'none',
    // By default WebpackDevServer serves physical files from current directory
    // in addition to all the virtual build products that it serves from memory.
    // This is confusing because those files won’t automatically be available in
    // production build folder unless we copy them. However, copying the whole
    // project directory is dangerous because we may expose sensitive files.
    // Instead, we establish a convention that only files in `public` directory
    // get served. Our build script will copy `public` into the `build` folder.
    // In `index.html`, you can get URL of `public` folder with %PUBLIC_URL%:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In JavaScript code, you can access it with `process.env.PUBLIC_URL`.
    // Note that we only recommend to use `public` folder as an escape hatch
    // for files like `favicon.ico`, `manifest.json`, and libraries that are
    // for some reason broken when imported through Webpack. If you just want to
    // use an image, put it in `src` and `import` it from JavaScript instead.
    contentBase: paths.appPublic,
    // By default files from `contentBase` will not trigger a page reload.
    watchContentBase: true,
    // Enable hot reloading server. It will provide /sockjs-node/ endpoint
    // for the WebpackDevServer client so it can learn when the files were
    // updated. The WebpackDevServer client is included as an entry point
    // in the Webpack development configuration. Note that only changes
    // to CSS are currently hot reloaded. JS changes will refresh the browser.
    hot: true,
    // It is important to tell WebpackDevServer to use the same "root" path
    // as we specified in the config. In development, we always serve from /.
    publicPath: config.output.publicPath,
    // WebpackDevServer is noisy by default so we emit custom message instead
    // by listening to the compiler events with `compiler.plugin` calls above.
    quiet: true,
    // Reportedly, this avoids CPU overload on some systems.
    // https://github.com/facebookincubator/create-react-app/issues/293
    watchOptions: {
      ignored: /node_modules/,
    },
    // Enable HTTPS if the HTTPS environment variable is set to 'true'
    https: protocol === 'https',
    host: host,
    overlay: false,
    historyApiFallback: {
      // Paths with dots should still use the history fallback.
      // See https://github.com/facebookincubator/create-react-app/issues/387.
      disableDotRule: true,
    },
    public: allowedHost,
    proxy,
    setup(app) {

      // parse application/json
      app.use(bodyParser.json())

      app.post('/movies', function (req, res) {
        // console.log(req);
        if (!req.body || !req.body.password) {
          // res.writeHead(400, {"Content-Type": "application/json"});
          // return res.end(JSON.stringify({msg:''}));
          // return res.status(400).send('Missing Parameter').end();
          return res.status(400).end();
        }
        if (req.body.password === '1111') {
          res.writeHead(200, {"Content-Type": "application/json"});
          res.end(JSON.stringify([
            {
              title: 'Day One FC Class',
              videos: [
                { title: 'Open Up Our Eyes (Acoustic) - Elevation Worship', url: 'https://youtu.be/cJ2VkPr1tnw' },
                { title: 'Grace To Grace - Hillsong Worship', url: 'https://youtu.be/NS3OgXaHoyc' },
                { title: 'Holy Holy Holy Lord God Almighty .. [Agnus Dei]', url: 'https://youtu.be/UWndDW_271g' }
              ]
            }, {
              title: 'Day Two FC Class',
              videos: [
                { title: 'Fullness (Live) - Elevation Worship', url: 'https://youtu.be/LgQ7WM-O1no' },
                { title: 'Elevation Worship - Here As In Heaven (Acoustic)', url: 'https://youtu.be/IR-7O57IQUA' },
                { title: 'All Things New - Hillsong Worship', url: 'https://youtu.be/tYXTSybQA9M' }
              ]
            }, {
              title: 'Day Three FC Class',
              videos: [
                { title: 'Calvary - Hillsong Worship', url: 'https://youtu.be/qlW_ulQ_-QQ' },
                { title: 'Our Father - Hillsong Worship', url: 'https://youtu.be/QzTxvOWpr7M' },
                { title: 'Depths - Hillsong Worship', url: 'https://youtu.be/QyhEdIlbYTM' }
              ]
            }
          ]));
        } else {
          // res.writeHead(401, {"Content-Type": "application/json"});
          // res.end(JSON.stringify( {msg:'Unauthorized access'} ) );
          return res.status(401).end();
        }
      });
      // This lets us open files from the runtime error overlay.
      app.use(errorOverlayMiddleware());
      // This service worker file is effectively a 'no-op' that will reset any
      // previous service worker registered for the same host:port combination.
      // We do this in development to avoid hitting the production cache if
      // it used the same host and port.
      // https://github.com/facebookincubator/create-react-app/issues/2272#issuecomment-302832432
      app.use(noopServiceWorkerMiddleware());
    },
  };
};

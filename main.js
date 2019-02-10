const { app, BrowserWindow } = require('electron'),
      sass = require('sass'),
      fs = require('fs');

function initCss(pathToSass, pathToCss) {
  sass.render({file: pathToSass}, function(err, result) {
    if (!err) {
      fs.writeFile(pathToCss, result.css, (err) => {
        if (!err) {
          console.log('Compilation of ' + pathToSass + ' done successfully.')
        }
      });
    } else if (err) {
      console.log(err);
    }
  });
}

function createWindow () {
  win = new BrowserWindow({ width: 1280, height: 768 });
  win.loadFile('ressources/html/index.html');
}

initCss('ressources/sass/main.scss', 'ressources/css/style.css');
app.on('ready', createWindow);

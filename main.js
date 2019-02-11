const { app, BrowserWindow, ipcMain } = require('electron'),
      sass = require('sass'),
      fs = require('fs'),
      spawn = require('child_process').spawn;
const {PythonShell} = require('python-shell');

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
  win = new BrowserWindow({
    width: 1280,
    height: 768,
    title: 'Loulou Trainer'
  });
  win.loadFile('ressources/html/index.html');
}

ipcMain.on('computeIt', (event, data) => {
  data.push('-rr')
  let options = {
    mode: 'text',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: '../loulou/scripts/',
    args: data
  };
  let pyshell = new PythonShell('train.py', options);
  pyshell.on('message', function (message) {
    console.log(message);
  });
  pyshell.end(function (err,code,signal) {
    if (err) throw err;
    console.log('finished');
  });
})

initCss('ressources/sass/main.scss', 'ressources/css/style.css');
app.on('ready', createWindow);

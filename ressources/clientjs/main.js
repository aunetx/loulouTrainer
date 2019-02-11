const ipc = require('electron').ipcRenderer;

architecture = [
  { type: 'input', neurons: 784, activation: 'relu' },
  { type: 'hidden_1', neurons: 100, activation: 'relu' },
  { type: 'output', neurons: 10, activation: 'relu' }
]

layers_container = document.getElementById('layersContainer');

function initLayers() {
  for (var layer of architecture) {
    $(layers_container).append('<input type="number" value="'+ layer.neurons +'" name="layer_'+ layer.type +'" min="1" />');
  }
}

initLayers();

function addLayer(place) {
  if (place == 'hidden') {
    $("input[name='layer_output']").before('<input type="number" value="100" name="layer_hidden_'+ ($("#layersContainer > input").length - 1) +'" min="1" />');
  }
}

function removeLayer(place) {
  if (place == 'hidden') {
    if ($("#layersContainer > input").length > 2) {
      $("input[name='layer_output']").prev().remove();
    }
  }
}

function saveLayers() {
  architecture = [];
  hiddenLayersArch = [];
  $('#layersContainer > input').each(function(index) {
    architecture[index] = {
      type: this.name.replace('layer_',''),
      neurons: this.value,
      activation: 'relu'
    };
    if (this.name.includes('layer_hidden_')) {
      hiddenLayersArch[parseInt(this.name.replace('layer_hidden_','')) - 1] = parseInt(this.value);
    }
  });
  ipc.send('computeIt', hiddenLayersArch);
}

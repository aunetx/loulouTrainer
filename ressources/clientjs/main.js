architecture = {
  0: 5,
  1: 4
};

layersDiv = document.getElementById('layers');
layerNumbers = {
  0: addLayerDiv(),
  1: addLayerDiv()
};

//  Proceed for two first layers
for (var lid = 0; lid < Object.keys(layerNumbers).length; lid++) {
  var input = addInputLayers(lid);
  var before = layerNumbers[lid].appendChild(document.createElement("span"));
  layerNumbers[lid].appendChild(input);
  var after = layerNumbers[lid].appendChild(document.createElement("span"));
  before.className += "inputBefore";
  after.className += "inputAfter";
}

function addInputLayers(lid) {
  var input = document.createElement("input");
  if (architecture[lid] == null) {
    architecture[lid] = 4;
  }
  input.type = "number";
  input.value = architecture[lid];
  input.name = 'layer' + lid;
  input.min = "0";
  return input;
}

function addLayer() {
  var layerDiv = addLayerDiv();
  var nb = Object.keys(layerNumbers).length;
  var input = addInputLayers(nb);
  var before = layerDiv.appendChild(document.createElement("span"));
  layerDiv.appendChild(input);
  var after = layerDiv.appendChild(document.createElement("span"));
  layerNumbers[nb] = layerDiv;
  before.className += "inputBefore";
  before.id = "inputBefore" + nb;
  after.className += "inputAfter";
  after.id = "inputAfter" + nb;
  $("inputBefore" + nb).on('click', function() {
    $(this).parent().children('input').hide();
  })
}

function addLayerDiv() {
  return layersDiv.appendChild(document.createElement("div"));
}

function removeLayer() {
  if (Object.keys(layerNumbers).length > 2) {
    layersDiv.removeChild(layersDiv.lastChild);
    delete layerNumbers[Object.keys(layerNumbers).length - 1];
  }
}

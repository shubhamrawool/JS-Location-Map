export class Map{ 
    constructor(corrdinates){
        this.renderPlace(corrdinates);
    }

    renderPlace(coordinates){
        document.getElementById('map').innerHTML = '';
     
        const map = new ol.Map({
          target: 'map',
          layers: [
            new ol.layer.Tile({
              source: new ol.source.OSM()
            })
          ],
          view: new ol.View({
            center: ol.proj.fromLonLat([coordinates.lng, coordinates.lat]),
            zoom: 16
          })
        });
    }
}
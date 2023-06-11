import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { markup1, markup2, markup3, markup4, markup5, markup6 } from '../assets/svg-markup';
import { diccionarioClae } from '../../../../models/diccionario';

declare var H: any;

@Injectable({
  providedIn: 'root',
})
export class HereMapsService {

  private API_KEY = environment.hereMaps_API_KEY;
  private platform: any;
  private map: any;
  private ui: any;
  group: any[] = [];
    currentBubble: any = null;

  constructor() {
    this.initHereMapsService();
  }

  private initHereMapsService() {
    this.platform = new H.service.Platform({
      apikey: this.API_KEY,
    });
  }

  get search() {
    return this.platform.getSearchService();
  }

  get router() {
    return this.platform.getRoutingService(null, 8);
  }

  createMap(identifier: string) {
    // Get the default map types from the platform object:
    const defaultLayers = this.platform.createDefaultLayers();
    // Instantiate the map:
    this.map = new H.Map(
      document.getElementById(identifier),
      defaultLayers.vector.normal.map,
      {
        zoom: 11,
        center: { lat: -34.57028, lng: -59.105 },
      }
    );
    this.ui = H.ui.UI.createDefault(this.map, defaultLayers, 'es-ES');
    const mapSettings = this.ui.getControl('mapsettings');
    const zoom = this.ui.getControl('zoom');
    const scalebar = this.ui.getControl('scalebar');

    mapSettings.setAlignment('bottom-left');
    zoom.setAlignment('bottom-left');
    scalebar.setAlignment('bottom-left');

    // Enable the event system on the map instance:
    const mapEvents = new H.mapevents.MapEvents(this.map);

    // Instantiate the default behavior, providing the mapEvents object:
    const behavior = new H.mapevents.Behavior(mapEvents);
  }

  createMarker(location: any, bubble = false) {
    const coords = { lat: location.lat, lng: location.lon };
    let markup = markup1;
    if(diccionarioClae.listaAgroalimentario.includes(Number(location.clae2))){
        markup = markup2;
    }
    if(diccionarioClae.listaContruccion.includes(Number(location.clae2))){
        markup = markup3;
    }
    if(diccionarioClae.listaMetalmecanica.includes(Number(location.clae2))){
        markup = markup4;
    }
    if(diccionarioClae.listaTextilConfecciones.includes(Number(location.clae2))){
        markup = markup5;
    }
    if(diccionarioClae.listaTurismo.includes(Number(location.clae2))){
        markup = markup6;
    }
    const icon = new H.map.Icon(markup);
    const marker = new H.map.Marker(coords, { icon: icon });
    this.map.addObject(marker);
    this.group.push(marker);

    // efectos del cursor para indicar interactividad
    marker.addEventListener(
      'pointerenter',
      () => (document.body.style.cursor = 'pointer')
    );
    marker.addEventListener(
      'pointerleave',
      () => (document.body.style.cursor = 'default')
    );

    // bubble? onClick/onTap => se crea un bubble con información de la ubicacion
    if (bubble) {
      const locationInfo = `
        <p>${location.clae6_desc}</p>
      `;
      marker.addEventListener('tap', () =>
        this.createBubble(location, locationInfo)
      );
    }
  }

  removeMarkers() {
    if (this.currentBubble) {
        this.ui.removeBubble(this.currentBubble);
        this.currentBubble.close();
        this.currentBubble = null;
    }
    if (this.group.length === 0) return;
    this.map.removeObjects(this.group);
    this.group = [];
  }

  createBubble(location: any, Info: any) {
    if (this.currentBubble) {
        this.ui.removeBubble(this.currentBubble);
        this.currentBubble.close();
    }
    const coords = { lat: location.lat, lng: location.lon };
    const bubble = new H.ui.InfoBubble(coords, { content: Info });
    this.currentBubble = bubble;
    this.ui.addBubble(bubble);
  }
}

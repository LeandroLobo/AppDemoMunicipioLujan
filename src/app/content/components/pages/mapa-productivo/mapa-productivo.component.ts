import { Component } from '@angular/core';
import { HereMapsService } from './service/here-maps.service';
import { diccionarioClae } from '../crud/diccionario';

@Component({
  selector: 'app-mapa-productivo',
  templateUrl: './mapa-productivo.component.html',
  styleUrls: ['./mapa-productivo.component.scss']
})
export class MapaProductivoComponent {
    marcadores: any;
    marcadoresFiltered: any = [];

    opcionesSector: any[] = [
        { label: 'Todos', value: '' },
        { label: 'Agroalimentario', value: 'Agroalimentario' },
        { label: 'Contruccion', value: 'Contruccion' },
        { label: 'Metalmecánica', value: 'Metalmecánica' },
        { label: 'Turismo', value: 'Turismo' },
        { label: 'Textil Confecciones', value: 'Textil Confecciones' },
    ];
    valorSeleccionadoSector = '';

	constructor(
    private hereMaps: HereMapsService
    ) {}

	ngOnInit() {
		this.hereMaps.createMap('mapaT');
        this.loadMarcadores();
	}

    async loadMarcadores() {
        try {
            const response = await fetch('app/content/components/pages/mapa-productivo/data/marcadores.json');
            this.marcadores = await response.json();
            this.applyFilter();
        } catch (err) {
            console.error(`Error al cargar la distribución productiva desde marcadores.json.`);
            console.error(`Error: ${err}`);
        }
    }

    applyFilter() {
        if (this.valorSeleccionadoSector === '') {
            this.marcadoresFiltered = [...this.marcadores];
        }
        if (this.valorSeleccionadoSector === 'Agroalimentario') {
            this.marcadoresFiltered = this.marcadores.filter(
                (m: any) => diccionarioClae.listaAgroalimentario.includes(Number(m.clae2))
            );
        }
        if (this.valorSeleccionadoSector === 'Contruccion') {
            this.marcadoresFiltered = this.marcadores.filter(
                (m: any) => diccionarioClae.listaContruccion.includes(Number(m.clae2))
            );
        }
        if (this.valorSeleccionadoSector === 'Metalmecánica') {
            this.marcadoresFiltered = this.marcadores.filter(
                (m: any) => diccionarioClae.listaMetalmecanica.includes(Number(m.clae2))
            );
        }
        if (this.valorSeleccionadoSector === 'Textil Confecciones') {
            this.marcadoresFiltered = this.marcadores.filter(
                (m: any) => diccionarioClae.listaTextilConfecciones.includes(Number(m.clae2))
            );
        }
        if (this.valorSeleccionadoSector === 'Turismo') {
            this.marcadoresFiltered = this.marcadores.filter(
                (m: any) => diccionarioClae.listaTurismo.includes(Number(m.clae2))
            );
        }
        this.hereMaps.removeMarkers();
        this.marcadoresFiltered.map((m: any) => this.hereMaps.createMarker(m, true));
    }
}

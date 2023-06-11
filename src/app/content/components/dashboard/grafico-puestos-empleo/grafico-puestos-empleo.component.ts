import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { FirebaseDatabaseService } from '../../../service/firebase-database.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-grafico-puestos-empleo',
  templateUrl: './grafico-puestos-empleo.component.html',
  styleUrls: ['./grafico-puestos-empleo.component.scss']
})
export class GraficoPuestosEmpleo {
    fechaSubida!: string;
    muestraDatosFiltrados: any;
    loading: boolean;
    dataGraficoMensualContiguo!: any;
    lineContiguoOptions!: any;
    dataGraficoInteranualContiguo!: any;
    barContiguoOptions!: any;
    subscription: any;
    coleccion: string = 'PuestosTrabajoAsalariado';
    sectorGeografico: string = 'Luján';
    sectorProductivo: string = '';
    data: any = {};
    conteoMensualA: any[] = [];
    conteoMensualB: any[] = [];
    conteoMensualC: any[] = [];
    labelsInteranual: any[] = [];
    labelsConteo: any[] = [];
    interanualA: any[] = [];
    interanualB: any[] = [];

    opcionesRegion: any[] = [
        { label: 'Luján', value: 'TotalLujan' },
        { label: 'Buenos Aires', value: 'TotalBsAs' },
        { label: 'Argentina', value: 'TotalPais' }
    ];
      opcionesSector: any[] = [
        { label: 'Todos', value: 'Todos' },
        { label: 'Agroalimentario', value: 'Agroalimentario' },
        { label: 'Contruccion', value: 'Contruccion' },
        { label: 'Metalmecánica', value: 'Metalmecánica' },
        { label: 'Turismo', value: 'Turismo' },
        { label: 'Textil Confecciones', value: 'Textil Confecciones' },
    ];
    valorSeleccionadoRegion = 'TotalLujan';
    valorSeleccionadoSector = 'Todos';

    get getValorSeleccionadoRegion(){
        return this.opcionesRegion.find(r => r.value == this.valorSeleccionadoRegion).label;
    }

    get getValorSeleccionadoSector(){
        return this.opcionesSector.find(r => r.value == this.valorSeleccionadoSector).label;
    }

    constructor(private firebase: FirebaseDatabaseService, private layoutService: LayoutService) {
        this.loading = true;
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initCharts();
        });
        this.firebase.obtenerDocumento(this.coleccion).then(
            res => {
                if(res) {
                    const date = new Date(0);
                    date.setUTCSeconds(res['fechaSubida'].seconds);
                    this.fechaSubida = date.toLocaleDateString("es-ES");
                    this.data = res['data'] || {};
                    this.labelsConteo = this.data.labelsConteo;
                    this.labelsInteranual = this.data.labelsInteranual;
                    this.applyFilterRegion();
                }
                this.loading = false;
                this.initCharts();
            }
        ).catch(
            err => {
                console.error(err);
                this.loading = false;
            }
        );
    }

    applyFilterRegion() {
        this.valorSeleccionadoSector = 'Todos';
        this.applyFilterSectorProductivo();
    }

    applyFilterSectorProductivo() {
        if(this.valorSeleccionadoSector == 'Todos'){
            this.conteoMensualA = this.data[`conteoMensual${this.valorSeleccionadoRegion}A`];
            this.conteoMensualB = this.data[`conteoMensual${this.valorSeleccionadoRegion}B`];
            this.conteoMensualC = this.data[`conteoMensual${this.valorSeleccionadoRegion}C`];
            this.interanualA = this.data[`interanual${this.valorSeleccionadoRegion}A`];
            this.interanualB = this.data[`interanual${this.valorSeleccionadoRegion}B`];
        } else {
            this.conteoMensualA = this.contarMensual(this.data.dataTotalLujanA.filter((d: any) => d.sectorProductivo == this.valorSeleccionadoSector));
            this.conteoMensualB = this.contarMensual(this.data.dataTotalLujanB.filter((d: any) => d.sectorProductivo == this.valorSeleccionadoSector));
            this.conteoMensualC = this.contarMensual(this.data.dataTotalLujanC.filter((d: any) => d.sectorProductivo == this.valorSeleccionadoSector));
            this.interanualA = this.calcularInteranual(this.conteoMensualB, this.conteoMensualA);
            this.interanualB = this.calcularInteranual(this.conteoMensualC, this.conteoMensualB);
        }
        this.initCharts();
    }

    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.dataGraficoMensualContiguo = {
            labels: this.labelsConteo,
            datasets: [
                {
                    label: 'Miles de Puestos de rabajo',
                    data: [...this.conteoMensualC, ...this.conteoMensualB, ...this.conteoMensualA],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--primary-800'),
                    borderColor: documentStyle.getPropertyValue('--primary-800'),
                    tension: .4,
                },
            ]
        };

        this.lineContiguoOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                        title: {
                            display: true,
                            text: 'Puestos (miles)'
                        },
                        // callback: function(value: number) {
                        //     return value / 1000; // Divide el valor por 1000 para expresarlo en miles
                        // }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };
        this.dataGraficoInteranualContiguo = {
            labels: this.labelsInteranual,
            datasets: [
                {
                    label: 'Variación %',
                    backgroundColor: documentStyle.getPropertyValue('--primary-300'),
                    borderColor: documentStyle.getPropertyValue('--primary-300'),
                    data: [...this.interanualB, ...this.interanualA]
                },
            ]
        };

        this.barContiguoOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };
    }

    contarMensual(dataSet: any) {
        if(dataSet.length == 0) return [];
        let conteoMensual = [];
        let initMonth = new Date(Date.parse(dataSet[0].fecha)).getMonth();

        for (let i = 0; i < 12; i++) {
          const currentMonth = (initMonth + i) % 12;
          const total = dataSet.reduce((acc: any, data: any) => {
            if (new Date(Date.parse(data.fecha)).getMonth() === currentMonth) {
              return acc + data.puestos;
            }
            return acc;
          }, 0);
          conteoMensual.push(total);
        }

        return conteoMensual;
    }


    calcularInteranual(anterior: number[], actual: number[]) {
        let result: number[] = [];
        for (let i = 0; i < 12; i++) {
            let variacion = (actual[i] / anterior[i]) - 1;
            result.push(variacion);
        }
        return result;
    }
}

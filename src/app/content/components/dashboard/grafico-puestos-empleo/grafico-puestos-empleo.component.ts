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
    dataGraficoTotalMensual!: any;
    totalMensualDatasets: any[] = [];
    totalMensualOptions!: any;
    dataGraficoVariacionInteranual!: any;
    variacionInteranualDatasets: any[] = [];
    variacionInteranualOptions!: any;
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
        { label: 'Resto Buenos Aires', value: 'TotalRestoBsAs' },
        { label: 'Conurbano Buenos Aires', value: 'TotalConurbanoBsAs' },
        { label: 'Argentina', value: 'TotalPais' }
    ];
    opcionesSector: any[] = [
        { label: 'Todos', value: 'Todos' },
        { label: 'Sectorizado', value: 'Sectorizado' },
    ];
    sectoresInteres: any[] = [
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
        const documentStyle = getComputedStyle(document.documentElement);
        if(this.valorSeleccionadoSector == 'Todos'){
            this.totalMensualDatasets = [];
            this.variacionInteranualDatasets = [];
            const conteoMensualA = this.data[`conteoMensual${this.valorSeleccionadoRegion}A`];
            const conteoMensualB = this.data[`conteoMensual${this.valorSeleccionadoRegion}B`];
            const conteoMensualC = this.data[`conteoMensual${this.valorSeleccionadoRegion}C`];
            const interanualA = this.data[`interanual${this.valorSeleccionadoRegion}A`];
            const interanualB = this.data[`interanual${this.valorSeleccionadoRegion}B`];
            this.totalMensualDatasets = [
                {
                    label: 'Todos los sectores',
                    data: [...conteoMensualC, ...conteoMensualB, ...conteoMensualA],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--primary-400'),
                    borderColor: documentStyle.getPropertyValue('--primary-400'),
                    tension: .4,
                },
            ];
            this.variacionInteranualDatasets = [
                {
                    label: 'Todos los sectores',
                    backgroundColor: documentStyle.getPropertyValue('--primary-300'),
                    borderColor: documentStyle.getPropertyValue('--primary-300'),
                    data: [...interanualB, ...interanualA]
                },
            ];
        } else {
            this.totalMensualDatasets = [];
            this.variacionInteranualDatasets = [];
            this.sectoresInteres.forEach((sector, index) => {
                const conteoMensualA = this.contarMensual(this.data.dataTotalLujanA.filter((d: any) => d.sectorProductivo == sector.value));
                const conteoMensualB = this.contarMensual(this.data.dataTotalLujanB.filter((d: any) => d.sectorProductivo == sector.value));
                const conteoMensualC = this.contarMensual(this.data.dataTotalLujanC.filter((d: any) => d.sectorProductivo == sector.value));
                const interanualA = this.calcularInteranual(conteoMensualB, conteoMensualA);
                const interanualB = this.calcularInteranual(conteoMensualC, conteoMensualB);
                const colorLevel = ((index + 1)*200) - 100;
                this.totalMensualDatasets.push(
                    {
                        label: sector.label,
                        data: [...conteoMensualC, ...conteoMensualB, ...conteoMensualA],
                        fill: false,
                        backgroundColor: documentStyle.getPropertyValue('--primary-' + colorLevel),
                        borderColor: documentStyle.getPropertyValue('--primary-' + colorLevel),
                        tension: .4,
                    }
                );
                this.variacionInteranualDatasets .push(
                    {
                        label: sector.label,
                        backgroundColor: documentStyle.getPropertyValue('--primary-' + colorLevel),
                        borderColor: documentStyle.getPropertyValue('--primary-' + colorLevel),
                        data: [...interanualB, ...interanualA]
                    }
                )
            });
        }
        this.initCharts();
    }

    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.dataGraficoTotalMensual = {
            labels: this.labelsConteo,
            datasets: this.totalMensualDatasets
        };

        this.totalMensualOptions = {
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
                        minRotation: 90,
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
        this.dataGraficoVariacionInteranual = {
            labels: this.labelsInteranual,
            datasets: this.variacionInteranualDatasets
        };

        this.variacionInteranualOptions = {
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
                        minRotation: 90,
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

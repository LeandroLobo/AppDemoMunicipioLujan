import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { FirebaseDatabaseService } from '../../../service/firebase-database.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-grafico-salarios',
    templateUrl: './grafico-salarios.component.html',
    styleUrls: ['./grafico-salarios.component.scss']
  })
  export class GraficoSalariosComponent {
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
    coleccion: string = 'SalariosPromedio';
    sectorGeografico: string = 'Luján';
    sectorProductivo: string = '';
    data: any = {};
    promedioMensualA: any[] = [];
    promedioMensualB: any[] = [];
    promedioMensualC: any[] = [];
    labelsInteranual: any[] = [];
    labelsPromedio: any[] = [];
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
                    this.labelsPromedio = this.data.labelsPromedio;
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
            const promedioMensualA = this.data[`promedioMensual${this.valorSeleccionadoRegion}A`];
            const promedioMensualB = this.data[`promedioMensual${this.valorSeleccionadoRegion}B`];
            const promedioMensualC = this.data[`promedioMensual${this.valorSeleccionadoRegion}C`];
            const interanualA = this.data[`interanual${this.valorSeleccionadoRegion}A`];
            const interanualB = this.data[`interanual${this.valorSeleccionadoRegion}B`];
            this.totalMensualDatasets = [
                {
                    label: 'Todos los sectores',
                    data: [...promedioMensualC, ...promedioMensualB, ...promedioMensualA],
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
                    data: [...interanualB, ...interanualA],
                    fill: false,
                    tension: .4,
                },
            ];
        } else {
            this.totalMensualDatasets = [];
            this.variacionInteranualDatasets = [];
            this.sectoresInteres.forEach((sector, index) => {
                const promedioMensualA = this.promediarMensual(this.data.dataTotalLujanA.filter((d: any) => d.sectorProductivo == sector.value));
                const promedioMensualB = this.promediarMensual(this.data.dataTotalLujanB.filter((d: any) => d.sectorProductivo == sector.value));
                const promedioMensualC = this.promediarMensual(this.data.dataTotalLujanC.filter((d: any) => d.sectorProductivo == sector.value));
                const interanualA = this.calcularInteranual(promedioMensualB, promedioMensualA);
                const interanualB = this.calcularInteranual(promedioMensualC, promedioMensualB);
                const colorLevel = ((index + 1)*200) - 100;
                this.totalMensualDatasets.push(
                    {
                        label: sector.label,
                        data: [...promedioMensualC, ...promedioMensualB, ...promedioMensualA],
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
                        data: [...interanualB, ...interanualA],
                        fill: false,
                    tension: .4,
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
            labels: this.labelsPromedio,
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
                            text: 'Salario Promedio'
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

    promediarMensual(dataSet: any) {
        let promedioMensual = [];
        let initMonth = new Date(Date.parse(dataSet[0].fecha)).getMonth();

        for (let i = 0; i < 12; i++) {
            let contador = 0;
          const currentMonth = (initMonth + i) % 12;
          const total = dataSet.reduce((acc: any, data: any) => {
            if (new Date(Date.parse(data.fecha)).getMonth() === currentMonth) {
                contador++;
              return acc + data.salario_promedio;
            }
            return acc;
          }, 0);
          promedioMensual.push(total / contador);
        }

        return promedioMensual;
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

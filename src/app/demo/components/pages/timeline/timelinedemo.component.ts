import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeIcons } from 'primeng/api';
import { Subscription } from 'rxjs';
import { FirebaseDatabaseService } from 'src/app/demo/service/firebase-database.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './timelinedemo.component.html',
    styleUrls: ['./timelinedemo.scss'],
    providers: [MessageService]
})
export class TimelineDemoComponent implements OnInit {

    dataGraficoMensual: any;
    dataGraficoInteranual: any;
    lineOptions: any;
    barOptions: any;
    subscription: Subscription;
    loading: boolean = false;
    fechaSubida: any;
    muestraDatosFiltrados: any[] = [];

    constructor(private messageService: MessageService, private firebase: FirebaseDatabaseService, private layoutService: LayoutService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(config => {
            this.initCharts();
        });
    }

    ngOnInit() {
        this.loading = true;
        this.firebase.leerUltimoDocumento('PuestosTrabajoAsalariado').then(
            data => {
                const date = new Date(0);
                date.setUTCSeconds(data['fechaSubida'].seconds);
                this.fechaSubida = date.toLocaleDateString("es-ES");
                this.muestraDatosFiltrados = data['muestraDatosFiltrados'];
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

    initCharts() {
        const conteoMensualA = this.contarMensual('2020');
        const conteoMensualB = this.contarMensual('2021');
        const conteoMensualC = this.contarMensual('2022');
        const interanualB = this.calcularInteranual(conteoMensualA, conteoMensualB);
        const interanualC = this.calcularInteranual(conteoMensualB, conteoMensualC);
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.dataGraficoInteranual = {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            datasets: [
                {
                    label: '2022',
                    backgroundColor: documentStyle.getPropertyValue('--primary-700'),
                    borderColor: documentStyle.getPropertyValue('--primary-700'),
                    data: interanualC
                },
                {
                    label: '2021',
                    backgroundColor: documentStyle.getPropertyValue('--primary-300'),
                    borderColor: documentStyle.getPropertyValue('--primary-300'),
                    data: interanualB
                }
            ]
        };

        this.barOptions = {
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
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };

        this.dataGraficoMensual = {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            datasets: [
                {
                    label: '2022',
                    data: conteoMensualC,
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--primary-800'),
                    borderColor: documentStyle.getPropertyValue('--primary-800'),
                    tension: .4
                },
                {
                    label: '2021',
                    data: conteoMensualB,
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    tension: .4
                },
                {
                    label: '2020',
                    data: conteoMensualA,
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                    borderColor: documentStyle.getPropertyValue('--primary-200'),
                    tension: .4
                }
            ]
        };

        this.lineOptions = {
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
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };
    }

    contarMensual(year: string) {
        const datoAnual = this.muestraDatosFiltrados.filter(data => data.fecha.split('-').includes(year)).map(d => {return {fecha: d.fecha, puestos: d.puestos}});
        let conteoMensual = []
        for (let mes = 1; mes <= 12; mes++) {
            const total = datoAnual.reduce((acc: any, data) => {
                if(data.fecha > year + '-' + mes.toString().padStart(2, '0') && data.fecha < year + '-' + (mes+1).toString().padStart(2, '0')) {
                    return acc + data.puestos;
                } return acc;
            }, 0);
            conteoMensual.push(total);
        }
        return conteoMensual;
    }

    calcularInteranual(anterior: number[], actual: number[]) {
        let result: number[] = [];
        for (let i = 1; i <= 12; i++) {
            let variacion = (actual[i] / anterior[i]) - 1;
            result.push(variacion);
        }
        return result;
    }

}

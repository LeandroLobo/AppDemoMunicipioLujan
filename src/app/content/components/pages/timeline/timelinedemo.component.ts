import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeIcons } from 'primeng/api';
import { Subscription } from 'rxjs';
import { FirebaseDatabaseService } from 'src/app/content/service/firebase-database.service';
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
    dataGraficoMensualContiguo!: { labels: string[]; datasets: { label: string; data: any[]; fill: boolean; backgroundColor: string; borderColor: string; tension: number; }[]; };
    lineContiguoOptions!: { plugins: { legend: { labels: { fontColor: string; }; }; }; scales: { x: { ticks: { color: string; }; grid: { color: string; drawBorder: boolean; }; }; y: { ticks: { color: string; }; grid: { color: string; drawBorder: boolean; }; }; }; };
    dataGraficoInteranualContiguo!: { labels: string[]; datasets: { label: string; backgroundColor: string; borderColor: string; data: number[]; }[]; };
    barContiguoOptions!: { plugins: { legend: { labels: { fontColor: string; }; }; }; scales: { x: { ticks: { color: string; font: { weight: number; }; }; grid: { display: boolean; drawBorder: boolean; }; }; y: { ticks: { color: string; }; grid: { color: string; drawBorder: boolean; }; }; }; };

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

        this.dataGraficoMensualContiguo = {
            labels: ['Enero `20', 'Febrero `20', 'Marzo `20', 'Abril `20', 'Mayo `20', 'Junio `20', 'Julio `20', 'Agosto `20', 'Septiembre `20', 'Octubre `20', 'Noviembre `20', 'Diciembre `20', 'Enero `21', 'Febrero `21', 'Marzo `21', 'Abril `21', 'Mayo `21', 'Junio `21', 'Julio `21', 'Agosto `21', 'Septiembre `21', 'Octubre `21', 'Noviembre `21', 'Diciembre `21', 'Enero `22', 'Febrero `22', 'Marzo `22', 'Abril `22', 'Mayo `22', 'Junio `22', 'Julio `22', 'Agosto `22', 'Septiembre `22', 'Octubre `22', 'Noviembre `22', 'Diciembre `22'],
            datasets: [
                {
                    label: '20-21-22',
                    data: [...conteoMensualA, ...conteoMensualB, ...conteoMensualC],
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
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };
        this.dataGraficoInteranualContiguo = {
            labels: ['Enero `21', 'Febrero `21', 'Marzo `21', 'Abril `21', 'Mayo `21', 'Junio `21', 'Julio `21', 'Agosto `21', 'Septiembre `21', 'Octubre `21', 'Noviembre `21', 'Diciembre `21', 'Enero `22', 'Febrero `22', 'Marzo `22', 'Abril `22', 'Mayo `22', 'Junio `22', 'Julio `22', 'Agosto `22', 'Septiembre `22', 'Octubre `22', 'Noviembre `22', 'Diciembre `22'],
            datasets: [
                {
                    label: '21-22',
                    backgroundColor: documentStyle.getPropertyValue('--primary-300'),
                    borderColor: documentStyle.getPropertyValue('--primary-300'),
                    data: [...interanualB, ...interanualC]
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

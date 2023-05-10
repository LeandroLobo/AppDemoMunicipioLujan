import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ApiDolarsiService } from '../../service/api-dolarsi.service';
import { Casa, DolarsiResponse } from '../../models/dolarsi.model';
import { FirebaseDatabaseService } from '../../service/firebase-database.service';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];
    chartData: any;
    chartOptions: any;
    subscription!: Subscription;
    dolarOficial!: Casa;
    dolarBlue!: Casa;
    muestraDatosFiltrados: any[] = [];
    dataGraficoInteranualContiguo!: { labels: string[]; datasets: { label: string; backgroundColor: string; borderColor: string; data: any[]; }[]; };
    barContiguoOptions!: { plugins: { legend: { labels: { fontColor: string; }; }; }; scales: { x: { ticks: { color: string; font: { weight: number; }; }; grid: { display: boolean; drawBorder: boolean; }; }; y: { ticks: { color: string; }; grid: { color: string; drawBorder: boolean; }; }; }; };
    lineContiguoOptions!: { plugins: { legend: { labels: { fontColor: string; }; }; }; scales: { x: { ticks: { color: string; }; grid: { color: string; drawBorder: boolean; }; }; y: { ticks: { color: string; }; grid: { color: string; drawBorder: boolean; }; }; }; };
    dataGraficoMensualContiguo!: { labels: string[]; datasets: { label: string; data: any[]; fill: boolean; backgroundColor: string; borderColor: string; tension: number; }[]; };
    loading!: boolean;
    fechaSubida!: string;

    constructor( public layoutService: LayoutService, private dolarsi: ApiDolarsiService, private firebase: FirebaseDatabaseService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
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
        this.dolarsi.getValoresDolar().subscribe(
            (res: DolarsiResponse[]) => {
                res.map(casa => {
                    if(casa.casa.nombre == 'Oficial') this.dolarOficial = casa.casa;
                    if(casa.casa.nombre == 'Blue') this.dolarBlue = casa.casa;
                });
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

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

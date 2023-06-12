import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Papa } from 'ngx-papaparse';
import { FirebaseDatabaseService } from 'src/app/content/service/firebase-database.service';
import { diccionarioClae } from '../../../models/diccionario'
@Component({
    templateUrl: './carga-salarios.component.html',
    providers: [MessageService]
})
export class CargaSalariosComponent implements OnInit {
    muestraTotal: any[] = [];
    loadingData: boolean = false;
    uploadingData: boolean = false;
    activityValues: number[] = [0, 100];
    @ViewChild('dt1') dt: Table | undefined;
    uploadedFile: any;
    fechaSubida: any;
    visible!: boolean;

    constructor(private messageService: MessageService, private papa: Papa, private firebase: FirebaseDatabaseService) { }

    ngOnInit() {
        this.loadingData = true;
        this.firebase.obtenerDocumento('SalariosPromedio').then(
            res => {
                if(res) {
                    const date = new Date(0);
                date.setUTCSeconds(res['fechaSubida'].seconds);
                this.fechaSubida = date.toLocaleDateString("es-ES");
                const data = res['data'];
                this.muestraTotal = [...data.dataTotalLujanC, ...data.dataTotalLujanB, ...data.dataTotalLujanA];
                }
                this.loadingData = false;
            }
        ).catch(
            err => {
                console.error(err);
                this.loadingData = false;
            }
        );
    }

    showDialog() {
        this.visible = true;
    }

    applyFilterGlobal($event: Event, stringVal: any) {
        this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
    }

    onUpload(event: any) {
        this.loadingData = true;
        this.uploadedFile = event.files[0];
        const reader = new FileReader();
        reader.readAsText(this.uploadedFile);
        reader.onload = () => {
            if(reader.result != null) {
                this.papa.parse(reader.result.toString(), {
                    header: true,
                    complete: (results) => {
                        this.muestraTotal = results.data.filter( (x:any) =>
                            x.fecha > '2020'
                            && x.w_mean != '-99'
                            && diccionarioClae.listaClae2Interesan.includes(Number(x.clae2))
                        ).map((d:any) => {
                            d.salario_promedio = Number(d.w_mean);
                            if(diccionarioClae.listaTotalIndustria.includes(Number(d.clae2))) {
                                d.sectorProductivo = 'Otros Industria';
                            }
                            if(diccionarioClae.listaAgroalimentario.includes(Number(d.clae2))) {
                                d.sectorProductivo = 'Agroalimentario';
                            }
                            if(diccionarioClae.listaContruccion.includes(Number(d.clae2))) {
                                d.sectorProductivo = 'Contruccion';
                            }
                            if(diccionarioClae.listaMetalmecanica.includes(Number(d.clae2))) {
                                d.sectorProductivo = 'Metalmecánica';
                            }
                            if(diccionarioClae.listaTextilConfecciones.includes(Number(d.clae2))) {
                                d.sectorProductivo = 'Textil Confecciones';
                            }
                            if(diccionarioClae.listaTurismo.includes(Number(d.clae2))) {
                                d.sectorProductivo = 'Turismo';
                            }
                            return d;
                        });
                        this.guardarMuestras();
                        this.fechaSubida = new Date(Date.now()).toLocaleDateString("es-ES");
                        this.visible = false;
                        this.loadingData = false;
                    },
                    error: (err) => {
                        this.loadingData = false;
                        console.log(err);
                    }
                });
            }
        };

        this.messageService.add({severity: 'info', summary: 'Listo!', detail: 'Archivo correctamente cargado en la aplicación.'});
    }

    guardarMuestras() {
        const maxDate = this.formatearFecha(this.muestraTotal[this.muestraTotal.length - 1].fecha);
        const startA = new Date(maxDate);
        startA.setFullYear(startA.getFullYear() - 1, maxDate.getMonth() + 1, 1);
        const startB = new Date(maxDate);
        startB.setFullYear(startB.getFullYear() - 2, maxDate.getMonth() + 1, 1);
        const startC = new Date(maxDate);
        startC.setFullYear(startC.getFullYear() - 3, maxDate.getMonth() + 1, 1);

        const dataTotalPaisA = this.muestraTotal.filter(d => this.formatearFecha(d.fecha) >= startA && this.formatearFecha(d.fecha) <= maxDate);
        const dataTotalPaisB = this.muestraTotal.filter(d => this.formatearFecha(d.fecha) >= startB && this.formatearFecha(d.fecha) < startA);
        const dataTotalPaisC = this.muestraTotal.filter(d => this.formatearFecha(d.fecha) >= startC && this.formatearFecha(d.fecha) < startB);

        const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

        const labelsA = [];
        for (let i = 0; i < 12; i++) {
        const date = new Date(startA.getFullYear(), startA.getMonth() + i );
        labelsA.push(months[date.getMonth()] + ' ' + date.getFullYear().toString().slice(-2));
        }

        const labelsB = [];
        for (let i = 0; i < 12; i++) {
        const date = new Date(startB.getFullYear(), startB.getMonth() + i );
        labelsB.push(months[date.getMonth()] + ' ' + date.getFullYear().toString().slice(-2));
        }

        const labelsC = [];
        for (let i = 0; i < 12; i++) {
        const date = new Date(startC.getFullYear(), startC.getMonth() + i );
        labelsC.push(months[date.getMonth()] + ' ' + date.getFullYear().toString().slice(-2));
        }

        const dataTotalRestoBsAsA = dataTotalPaisA.filter(d => d.id_provincia_indec == '6' && !diccionarioClae.listaCodigosDptoConurbano.includes(d.codigo_departamento_indec));
        const dataTotalRestoBsAsB = dataTotalPaisB.filter(d => d.id_provincia_indec == '6' && !diccionarioClae.listaCodigosDptoConurbano.includes(d.codigo_departamento_indec));
        const dataTotalRestoBsAsC = dataTotalPaisC.filter(d => d.id_provincia_indec == '6' && !diccionarioClae.listaCodigosDptoConurbano.includes(d.codigo_departamento_indec));

        const dataTotalConurbanoBsAsA = dataTotalPaisA.filter(d => diccionarioClae.listaCodigosDptoConurbano.includes(d.codigo_departamento_indec));
        const dataTotalConurbanoBsAsB = dataTotalPaisB.filter(d => diccionarioClae.listaCodigosDptoConurbano.includes(d.codigo_departamento_indec));
        const dataTotalConurbanoBsAsC = dataTotalPaisC.filter(d => diccionarioClae.listaCodigosDptoConurbano.includes(d.codigo_departamento_indec));

        const dataTotalLujanA = dataTotalRestoBsAsA.filter(d => d.codigo_departamento_indec == diccionarioClae.codigoDptoLujan);
        const dataTotalLujanB = dataTotalRestoBsAsB.filter(d => d.codigo_departamento_indec == diccionarioClae.codigoDptoLujan);
        const dataTotalLujanC = dataTotalRestoBsAsC.filter(d => d.codigo_departamento_indec == diccionarioClae.codigoDptoLujan);

        const promedioMensualTotalPaisA = this.promediarMensual(dataTotalPaisA);
        const promedioMensualTotalPaisB = this.promediarMensual(dataTotalPaisB);
        const promedioMensualTotalPaisC = this.promediarMensual(dataTotalPaisC);
        const interanualTotalPaisA = this.calcularInteranual(promedioMensualTotalPaisB, promedioMensualTotalPaisA);
        const interanualTotalPaisB = this.calcularInteranual(promedioMensualTotalPaisC, promedioMensualTotalPaisB);

        const promedioMensualTotalRestoBsAsA = this.promediarMensual(dataTotalRestoBsAsA);
        const promedioMensualTotalRestoBsAsB = this.promediarMensual(dataTotalRestoBsAsB);
        const promedioMensualTotalRestoBsAsC = this.promediarMensual(dataTotalRestoBsAsC);
        const interanualTotalRestoBsAsA = this.calcularInteranual(promedioMensualTotalRestoBsAsB, promedioMensualTotalRestoBsAsA);
        const interanualTotalRestoBsAsB = this.calcularInteranual(promedioMensualTotalRestoBsAsC, promedioMensualTotalRestoBsAsB);

        const promedioMensualTotalConurbanoBsAsA = this.promediarMensual(dataTotalConurbanoBsAsA);
        const promedioMensualTotalConurbanoBsAsB = this.promediarMensual(dataTotalConurbanoBsAsB);
        const promedioMensualTotalConurbanoBsAsC = this.promediarMensual(dataTotalConurbanoBsAsC);
        const interanualTotalConurbanoBsAsA = this.calcularInteranual(promedioMensualTotalConurbanoBsAsB, promedioMensualTotalConurbanoBsAsA);
        const interanualTotalConurbanoBsAsB = this.calcularInteranual(promedioMensualTotalConurbanoBsAsC, promedioMensualTotalConurbanoBsAsB);

        const promedioMensualTotalLujanA = this.promediarMensual(dataTotalLujanA);
        const promedioMensualTotalLujanB = this.promediarMensual(dataTotalLujanB);
        const promedioMensualTotalLujanC = this.promediarMensual(dataTotalLujanC);
        const interanualTotalLujanA = this.calcularInteranual(promedioMensualTotalLujanB, promedioMensualTotalLujanA);
        const interanualTotalLujanB = this.calcularInteranual(promedioMensualTotalLujanC, promedioMensualTotalLujanB);

        const data = {
            labelsPromedio: [...labelsC, ...labelsB, ...labelsA],
            labelsInteranual: [...labelsB, ...labelsA],
            promedioMensualTotalPaisA,
            promedioMensualTotalPaisB,
            promedioMensualTotalPaisC,
            interanualTotalPaisA,
            interanualTotalPaisB,
            promedioMensualTotalRestoBsAsA,
            promedioMensualTotalRestoBsAsB,
            promedioMensualTotalRestoBsAsC,
            interanualTotalRestoBsAsA,
            interanualTotalRestoBsAsB,
            promedioMensualTotalConurbanoBsAsA,
            promedioMensualTotalConurbanoBsAsB,
            promedioMensualTotalConurbanoBsAsC,
            interanualTotalConurbanoBsAsA,
            interanualTotalConurbanoBsAsB,
            promedioMensualTotalLujanA,
            promedioMensualTotalLujanB,
            promedioMensualTotalLujanC,
            interanualTotalLujanA,
            interanualTotalLujanB,
            dataTotalLujanA,
            dataTotalLujanB,
            dataTotalLujanC
        };

        this.firebase.guardarDocumento('SalariosPromedio', {fechaSubida: new Date(Date.now()), data});
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
            result.push(variacion * 100); // valor porcentual
        }
        return result;
    }

    formatearFecha(fecha: string) {
        const fechaSplit = fecha.split('-');
        let fechaFormateada = new Date();
        fechaFormateada.setFullYear(Number(fechaSplit[0]), Number(fechaSplit[1]) -1, 1);
        fechaFormateada.setHours(0, 0, 0, 0);
        return fechaFormateada;
    }
}

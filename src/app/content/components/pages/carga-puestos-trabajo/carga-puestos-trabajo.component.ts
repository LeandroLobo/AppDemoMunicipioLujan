import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Papa } from 'ngx-papaparse';
import { FirebaseDatabaseService } from 'src/app/content/service/firebase-database.service';
import { diccionarioClae } from '../../../models/diccionario'
@Component({
    templateUrl: './carga-puestos-trabajo.component.html',
    providers: [MessageService]
})
export class CargaPuestosTrabajoComponent implements OnInit {
    muestraTotal: any[] = [];
    loading: boolean = false;
    activityValues: number[] = [0, 100];
    @ViewChild('dt1') dt: Table | undefined;
    uploadedFile: any;
    fechaSubida: any;
    visible!: boolean;

    constructor(private messageService: MessageService, private papa: Papa, private firebase: FirebaseDatabaseService) { }

    ngOnInit() {
        this.loading = true;
        this.firebase.obtenerDocumento('PuestosTrabajoAsalariado').then(
            res => {
                if(res) {
                    const date = new Date(0);
                date.setUTCSeconds(res['fechaSubida'].seconds);
                this.fechaSubida = date.toLocaleDateString("es-ES");
                const data = res['data'];
                this.muestraTotal = [...data.dataTotalLujanC, ...data.dataTotalLujanB, ...data.dataTotalLujanA];
                }
                this.loading = false;
            }
        ).catch(
            err => {
                console.error(err);
                this.loading = false;
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
        this.loading = true;
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
                            && x.puestos != '-99'
                            && diccionarioClae.listaClae2Interesan.includes(Number(x.clae2))
                        ).map((d:any) => {
                            d.puestos = Number(d.puestos);
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
                        this.loading = false;
                    },
                    error: (err) => {
                        this.loading = false;
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

        const conteoMensualTotalPaisA = this.contarMensual(dataTotalPaisA);
        const conteoMensualTotalPaisB = this.contarMensual(dataTotalPaisB);
        const conteoMensualTotalPaisC = this.contarMensual(dataTotalPaisC);
        const interanualTotalPaisA = this.calcularInteranual(conteoMensualTotalPaisB, conteoMensualTotalPaisA);
        const interanualTotalPaisB = this.calcularInteranual(conteoMensualTotalPaisC, conteoMensualTotalPaisB);

        const conteoMensualTotalRestoBsAsA = this.contarMensual(dataTotalRestoBsAsA);
        const conteoMensualTotalRestoBsAsB = this.contarMensual(dataTotalRestoBsAsB);
        const conteoMensualTotalRestoBsAsC = this.contarMensual(dataTotalRestoBsAsC);
        const interanualTotalRestoBsAsA = this.calcularInteranual(conteoMensualTotalRestoBsAsB, conteoMensualTotalRestoBsAsA);
        const interanualTotalRestoBsAsB = this.calcularInteranual(conteoMensualTotalRestoBsAsC, conteoMensualTotalRestoBsAsB);

        const conteoMensualTotalConurbanoBsAsA = this.contarMensual(dataTotalConurbanoBsAsA);
        const conteoMensualTotalConurbanoBsAsB = this.contarMensual(dataTotalConurbanoBsAsB);
        const conteoMensualTotalConurbanoBsAsC = this.contarMensual(dataTotalConurbanoBsAsC);
        const interanualTotalConurbanoBsAsA = this.calcularInteranual(conteoMensualTotalConurbanoBsAsB, conteoMensualTotalConurbanoBsAsA);
        const interanualTotalConurbanoBsAsB = this.calcularInteranual(conteoMensualTotalConurbanoBsAsC, conteoMensualTotalConurbanoBsAsB);

        const conteoMensualTotalLujanA = this.contarMensual(dataTotalLujanA);
        const conteoMensualTotalLujanB = this.contarMensual(dataTotalLujanB);
        const conteoMensualTotalLujanC = this.contarMensual(dataTotalLujanC);
        const interanualTotalLujanA = this.calcularInteranual(conteoMensualTotalLujanB, conteoMensualTotalLujanA);
        const interanualTotalLujanB = this.calcularInteranual(conteoMensualTotalLujanC, conteoMensualTotalLujanB);

        const data = {
            labelsConteo: [...labelsC, ...labelsB, ...labelsA],
            labelsInteranual: [...labelsB, ...labelsA],
            conteoMensualTotalPaisA,
            conteoMensualTotalPaisB,
            conteoMensualTotalPaisC,
            interanualTotalPaisA,
            interanualTotalPaisB,
            conteoMensualTotalRestoBsAsA,
            conteoMensualTotalRestoBsAsB,
            conteoMensualTotalRestoBsAsC,
            interanualTotalRestoBsAsA,
            interanualTotalRestoBsAsB,
            conteoMensualTotalConurbanoBsAsA,
            conteoMensualTotalConurbanoBsAsB,
            conteoMensualTotalConurbanoBsAsC,
            interanualTotalConurbanoBsAsA,
            interanualTotalConurbanoBsAsB,
            conteoMensualTotalLujanA,
            conteoMensualTotalLujanB,
            conteoMensualTotalLujanC,
            interanualTotalLujanA,
            interanualTotalLujanB,
            dataTotalLujanA,
            dataTotalLujanB,
            dataTotalLujanC
        };

        this.firebase.guardarDocumento('PuestosTrabajoAsalariado', {fechaSubida: new Date(Date.now()), data});
    }

    contarMensual(dataSet: any) {
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
          conteoMensual.push(total/1000); // miles de puestos
        }

        return conteoMensual;
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

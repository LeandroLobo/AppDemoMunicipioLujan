import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Papa } from 'ngx-papaparse';
import { FirebaseDatabaseService } from 'src/app/content/service/firebase-database.service';

@Component({
    templateUrl: './crud.component.html',
    providers: [MessageService]
})
export class CrudComponent implements OnInit {
    muestraDatosFiltrados: any[] = [];
    loading: boolean = false;
    activityValues: number[] = [0, 100];
    @ViewChild('dt1') dt: Table | undefined;
    uploadedFile: any;
    fechaSubida: any;
    listaClae2Interesan = [1,3,10,11,8,21,13,41,42,43,24,25,26,27,28,30,13,14,49,50,51,52,55,56,59,77,79,85,90];

    constructor(private messageService: MessageService, private papa: Papa, private firebase: FirebaseDatabaseService) { }

    ngOnInit() {
        this.loading = true;
        this.firebase.leerUltimoDocumento('PuestosTrabajoAsalariado').then(
            data => {
                const date = new Date(0);
                date.setUTCSeconds(data['fechaSubida'].seconds);
                this.fechaSubida = date.toLocaleDateString("es-ES");
                this.muestraDatosFiltrados = data['muestraDatosFiltrados'];
                this.loading = false;
            }
        ).catch(
            err => {
                console.error(err);
                this.loading = false;
            }
        );
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
                        this.muestraDatosFiltrados = results.data.filter( (x:any) =>
                            x.codigo_departamento_indec == '6497'
                            && x.fecha > '2020'
                            && x.puestos != '-99'
                            && this.listaClae2Interesan.includes(Number(x.clae2))
                        ).map((d:any) => {
                            d.codigo_departamento_indec = d.codigo_departamento_indec + ' - Luján';
                            d.id_provincia_indec= d.id_provincia_indec + ' - Bs. As.';
                            d.puestos = Number(d.puestos);
                            return d;
                        });
                        this.firebase.guardarDatos('PuestosTrabajoAsalariado', {fechaSubida: new Date(Date.now()), muestraDatosFiltrados: this.muestraDatosFiltrados});
                        this.fechaSubida = new Date(Date.now()).toLocaleDateString("es-ES");
                        this.loading = false;
                    },
                    error: (err) => {
                        this.loading = false;
                        console.log(err);
                    }
                });
            }
        };

        this.messageService.add({severity: 'info', summary: 'Archivo Cargado', detail: 'xxxxxxxxxxx'});
    }
}



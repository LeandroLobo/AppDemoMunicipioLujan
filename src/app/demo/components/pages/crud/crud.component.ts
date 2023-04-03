import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Papa } from 'ngx-papaparse';
import * as FileSaver from 'file-saver';

@Component({
    templateUrl: './crud.component.html',
    providers: [MessageService]
})
export class CrudComponent implements OnInit {
    customers: any[] = [];
    loading: boolean = true;
    activityValues: number[] = [0, 100];
    @ViewChild('dt1') dt: Table | undefined;

    constructor(private messageService: MessageService, private papa: Papa) { }

    ngOnInit() {
        const url = 'https://cdn.produccion.gob.ar/cdn-cep/datos-por-departamento/puestos/puestos_depto_priv_por_clae2.csv';
        this.papa.parse(url, {
            header: true,
            download: true,
            complete: (results) => {
                this.customers = results.data;
                this.loading = false;
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    clear(table: Table) {
        table.clear();
    }

    applyFilterGlobal($event: Event, stringVal: any) {
        this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
    }
}

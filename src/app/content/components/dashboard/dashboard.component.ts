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

    dolarOficial!: Casa;
    dolarBlue!: Casa;
    dolarMEP = 0;
    loading!: boolean;
    today!: string;
    dataSetSeleccionado = 'puestos-empleo';
    opcionesDataSet: any[] = [
        { label: 'Puestos de Empleo', value: 'puestos-empleo' },
        { label: 'DataSet2', value: 'dataset-2' },
        { label: 'DataSet3', value: 'dataset-3' },
    ];

    constructor( public layoutService: LayoutService, private dolarsi: ApiDolarsiService, private firebase: FirebaseDatabaseService) {

    }

    ngOnInit() {
        this.loading = true;
        this.dolarsi.getValoresDolar().subscribe(
            (res: DolarsiResponse[]) => {
                res.map(casa => {
                    if(casa.casa.nombre == 'Oficial') this.dolarOficial = casa.casa;
                    if(casa.casa.nombre == 'Blue') this.dolarBlue = casa.casa;
                    const date = new Date(Date.now());
                    this.today = date.toLocaleDateString("es-ES");
                });
                this.loading = false;
            },
            err => this.loading = false
        );
        this.dolarsi.getDolarMep().subscribe(
            res => {
                if(res.length > 1) this.dolarMEP = res[1][1];
                else {
                    this.dolarsi.getDolarMep(true).subscribe(
                        res => {
                            if(res.length > 1) this.dolarMEP = res[1][1];
                        },
                        err => {
                            this.loading = false;
                            console.log(err);
                        }
                    );
                }
            },
            err => {
                this.loading = false;
                console.log(err);
            }
        );
    }

    changeDataSet(value: any) {
        console.log(value)
    }

    ngOnDestroy() {
    }
}

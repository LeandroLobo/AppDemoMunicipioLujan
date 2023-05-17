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
    loading!: boolean;

    constructor( public layoutService: LayoutService, private dolarsi: ApiDolarsiService, private firebase: FirebaseDatabaseService) {

    }

    ngOnInit() {
        this.loading = true;
        this.dolarsi.getValoresDolar().subscribe(
            (res: DolarsiResponse[]) => {
                res.map(casa => {
                    if(casa.casa.nombre == 'Oficial') this.dolarOficial = casa.casa;
                    if(casa.casa.nombre == 'Blue') this.dolarBlue = casa.casa;
                });
                this.loading = false;
            },
            err => this.loading = false
        );
    }



    ngOnDestroy() {
    }
}

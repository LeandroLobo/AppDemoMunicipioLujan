import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Inicio',
                items: [
                    { label: 'Tablero', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'APIs públicas nacionales',
                icon: 'pi pi-fw pi-chart-line',
                items: [
                    {
                        label: 'Valor inflación - BCRA',
                        icon: 'pi pi-fw pi-wallet',
                        routerLink: ['/pages/inflacion-bcra']
                    },
                    {
                        label: 'Actividad Cultural',
                        icon: 'pi pi-fw pi-image',
                        items: [
                            {
                                label: 'Convocatorias',
                                icon: 'pi pi-fw pi-megaphone',
                                routerLink: ['/pages/cultura/convocatorias']
                            },
                            {
                                label: 'Analisis Estadístico',
                                icon: 'pi pi-fw pi-chart-line',
                                routerLink: ['/pages/cultura/estadisticas']
                            },
                        ],
                    },
                ],
            },
        ];
    }
}

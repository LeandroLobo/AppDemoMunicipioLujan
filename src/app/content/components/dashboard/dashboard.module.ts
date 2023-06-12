import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'primeng/api';
import { GraficoPuestosEmpleo } from './grafico-puestos-empleo/grafico-puestos-empleo.component';
import { DropdownModule } from 'primeng/dropdown';
import { GraficoSalariosComponent } from './grafico-salarios/grafico-salarios.component';

@NgModule({
    imports: [
        DropdownModule,
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        DashboardsRoutingModule,
        SharedModule
    ],
    declarations: [DashboardComponent, GraficoPuestosEmpleo, GraficoSalariosComponent]
})
export class DashboardModule { }

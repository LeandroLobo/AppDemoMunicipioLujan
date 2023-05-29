import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { MapaProductivoComponent } from './mapa-productivo/mapa-productivo.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
@NgModule({
    declarations: [
    MapaProductivoComponent
  ],
    imports: [
        CommonModule,
        DropdownModule,
        FormsModule,
        PagesRoutingModule
    ]
})
export class PagesModule { }

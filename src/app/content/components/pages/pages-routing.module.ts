import { CargaPuestosTrabajoComponent } from './carga-puestos-trabajo/carga-puestos-trabajo.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MapaProductivoComponent } from './mapa-productivo/mapa-productivo.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'carga-puestos-trabajo', loadChildren: () => import('./carga-puestos-trabajo/carga-puestos-trabajo.module').then(m => m.CargaPuestosTrabajoModule) },
        { path: 'carga-salarios', loadChildren: () => import('./carga-salarios/carga-salarios.module').then(m => m.CargaSalariosModule) },
        { path: 'profile-edit', loadChildren: () => import('./profile-edit/profile-edit.module').then(m => m.ProfileEditModule) },
        { path: 'inflacion-bcra', loadChildren: () => import('./inflacion-bcra/inflacion-bcra.module').then(m => m.InflacionBcraModule) },
        { path: 'cultura', loadChildren: () => import('./cultura/cultura.module').then(m => m.CulturaModule) },
        { path: 'mapa-productivo', component: MapaProductivoComponent },
        { path: '**', redirectTo: '/notfound' },

    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }

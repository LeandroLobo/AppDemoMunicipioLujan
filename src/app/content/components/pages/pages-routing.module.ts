import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'crud', loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule) },
        { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
        { path: 'profile-edit', loadChildren: () => import('./profile-edit/profile-edit.module').then(m => m.ProfileEditModule) },
        { path: 'inflacion-bcra', loadChildren: () => import('./inflacion-bcra/inflacion-bcra.module').then(m => m.InflacionBcraModule) },
        { path: 'cultura', loadChildren: () => import('./cultura/cultura.module').then(m => m.CulturaModule) },
        { path: '**', redirectTo: '/notfound' },

    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }

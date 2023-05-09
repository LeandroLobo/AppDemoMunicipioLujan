import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './content/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuardService } from './content/components/auth/services/auth-guard.service';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',canActivate: [AuthGuardService], component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./content/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'pages', loadChildren: () => import('./content/components/pages/pages.module').then(m => m.PagesModule) }
                ]
            },
            { path: 'auth', loadChildren: () => import('./content/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./content/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './content/components/notfound/notfound.component';
import { HttpClientModule } from '@angular/common/http';
import { AppConfigService } from './_config/app-config.service';
import { configInitializer } from './_config/config.initializer';

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        HttpClientModule
    ],
    providers: [
        {
			provide: APP_INITIALIZER,
			multi: true,
			deps: [AppConfigService],
			useFactory: configInitializer,
		},
        { provide: LocationStrategy, useClass: HashLocationStrategy },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

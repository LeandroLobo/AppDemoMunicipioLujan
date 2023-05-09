import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineDemoRoutingModule } from './timelinedemo-routing.module';
import { TimelineDemoComponent } from './timelinedemo.component';
import { TimelineModule } from 'primeng/timeline';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ToastModule } from 'primeng/toast';

@NgModule({
    imports: [
        CommonModule,
        TimelineModule,
        ButtonModule,
        CardModule,
        TimelineDemoRoutingModule,
        ToastModule,
        ChartModule
    ],
    declarations: [TimelineDemoComponent]
})
export class TimelineDemoModule { }

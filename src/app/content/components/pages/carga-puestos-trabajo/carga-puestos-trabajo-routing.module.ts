import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CargaPuestosTrabajoComponent } from './carga-puestos-trabajo.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CargaPuestosTrabajoComponent }
	])],
	exports: [RouterModule]
})
export class CargaPuestosTrabajoRoutingModule { }

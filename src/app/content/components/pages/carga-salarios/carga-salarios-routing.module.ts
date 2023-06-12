import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CargaSalariosComponent } from './carga-salarios.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CargaSalariosComponent }
	])],
	exports: [RouterModule]
})
export class CargaSalariosRoutingModule { }

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class AppConfigService {
	constructor() {}

	async load() {
		try {
			const response = await fetch('app.config.json');
			const configData = await response.json();
			for (const key in configData) {
				if (key) {
					environment[key] = configData[key];
				}
			}
		} catch (err) {
			console.error(`Error al cargar la configuración desde app.config.json.`);
			console.error(`Error: ${err}`);
		}
	}
}

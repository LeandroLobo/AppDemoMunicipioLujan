import { AppConfigService } from './app-config.service';
export function configInitializer(appConfigService: AppConfigService) {
	return () => {
		return appConfigService.load();
	};
}

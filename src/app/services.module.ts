import { remote } from 'electron';

import {
    APP_INITIALIZER,
    LOCALE_ID,
    NgModule,
} from '@angular/core';

import { ToasterModule } from 'angular2-toaster';

import { ElectronLogService } from 'jslib/electron/services/electronLog.service';
import { ElectronPlatformUtilsService } from 'jslib/electron/services/electronPlatformUtils.service';
import { ElectronRendererMessagingService } from 'jslib/electron/services/electronRendererMessaging.service';
import { ElectronRendererSecureStorageService } from 'jslib/electron/services/electronRendererSecureStorage.service';
import { ElectronStorageService } from 'jslib/electron/services/electronStorage.service';
import { isDev } from 'jslib/electron/utils';

import { DeviceType } from 'jslib/enums/deviceType';

import { I18nService } from '../services/i18n.service';
import { NativeMessagingService } from '../services/nativeMessaging.service';

import { AuthGuardService } from 'jslib/angular/services/auth-guard.service';
import { BroadcasterService } from 'jslib/angular/services/broadcaster.service';
import { ValidationService } from 'jslib/angular/services/validation.service';

import { Analytics } from 'jslib/misc/analytics';

import { ApiService } from 'jslib/services/api.service';
import { AppIdService } from 'jslib/services/appId.service';
import { AuditService } from 'jslib/services/audit.service';
import { AuthService } from 'jslib/services/auth.service';
import { CipherService } from 'jslib/services/cipher.service';
import { CollectionService } from 'jslib/services/collection.service';
import { ConstantsService } from 'jslib/services/constants.service';
import { ContainerService } from 'jslib/services/container.service';
import { CryptoService } from 'jslib/services/crypto.service';
import { EnvironmentService } from 'jslib/services/environment.service';
import { EventService } from 'jslib/services/event.service';
import { ExportService } from 'jslib/services/export.service';
import { FileUploadService } from 'jslib/services/fileUpload.service';
import { FolderService } from 'jslib/services/folder.service';
import { NotificationsService } from 'jslib/services/notifications.service';
import { PasswordGenerationService } from 'jslib/services/passwordGeneration.service';
import { PolicyService } from 'jslib/services/policy.service';
import { SearchService } from 'jslib/services/search.service';
import { SendService } from 'jslib/services/send.service';
import { SettingsService } from 'jslib/services/settings.service';
import { StateService } from 'jslib/services/state.service';
import { SyncService } from 'jslib/services/sync.service';
import { SystemService } from 'jslib/services/system.service';
import { TokenService } from 'jslib/services/token.service';
import { TotpService } from 'jslib/services/totp.service';
import { UserService } from 'jslib/services/user.service';
import { VaultTimeoutService } from 'jslib/services/vaultTimeout.service';
import { WebCryptoFunctionService } from 'jslib/services/webCryptoFunction.service';

import { ApiService as ApiServiceAbstraction } from 'jslib/abstractions/api.service';
import { AppIdService as AppIdServiceAbstraction } from 'jslib/abstractions/appId.service';
import { AuditService as AuditServiceAbstraction } from 'jslib/abstractions/audit.service';
import { AuthService as AuthServiceAbstraction } from 'jslib/abstractions/auth.service';
import { CipherService as CipherServiceAbstraction } from 'jslib/abstractions/cipher.service';
import { CollectionService as CollectionServiceAbstraction } from 'jslib/abstractions/collection.service';
import { CryptoService as CryptoServiceAbstraction } from 'jslib/abstractions/crypto.service';
import { CryptoFunctionService as CryptoFunctionServiceAbstraction } from 'jslib/abstractions/cryptoFunction.service';
import { EnvironmentService as EnvironmentServiceAbstraction } from 'jslib/abstractions/environment.service';
import { EventService as EventServiceAbstraction } from 'jslib/abstractions/event.service';
import { ExportService as ExportServiceAbstraction } from 'jslib/abstractions/export.service';
import { FileUploadService as FileUploadServiceAbstraction }  from 'jslib/abstractions/fileUpload.service';
import { FolderService as FolderServiceAbstraction } from 'jslib/abstractions/folder.service';
import { I18nService as I18nServiceAbstraction } from 'jslib/abstractions/i18n.service';
import { LogService as LogServiceAbstraction } from 'jslib/abstractions/log.service';
import { MessagingService as MessagingServiceAbstraction } from 'jslib/abstractions/messaging.service';
import { NotificationsService as NotificationsServiceAbstraction } from 'jslib/abstractions/notifications.service';
import {
    PasswordGenerationService as PasswordGenerationServiceAbstraction,
} from 'jslib/abstractions/passwordGeneration.service';
import { PlatformUtilsService as PlatformUtilsServiceAbstraction } from 'jslib/abstractions/platformUtils.service';
import { PolicyService as PolicyServiceAbstraction } from 'jslib/abstractions/policy.service';
import { SearchService as SearchServiceAbstraction } from 'jslib/abstractions/search.service';
import { SendService as SendServiceAbstraction } from 'jslib/abstractions/send.service';
import { SettingsService as SettingsServiceAbstraction } from 'jslib/abstractions/settings.service';
import { StateService as StateServiceAbstraction } from 'jslib/abstractions/state.service';
import { StorageService as StorageServiceAbstraction } from 'jslib/abstractions/storage.service';
import { SyncService as SyncServiceAbstraction } from 'jslib/abstractions/sync.service';
import { SystemService as SystemServiceAbstraction } from 'jslib/abstractions/system.service';
import { TokenService as TokenServiceAbstraction } from 'jslib/abstractions/token.service';
import { TotpService as TotpServiceAbstraction } from 'jslib/abstractions/totp.service';
import { UserService as UserServiceAbstraction } from 'jslib/abstractions/user.service';
import { VaultTimeoutService as VaultTimeoutServiceAbstraction } from 'jslib/abstractions/vaultTimeout.service';

const logService = new ElectronLogService();
const i18nService = new I18nService(window.navigator.language, './locales');
const stateService = new StateService();
const broadcasterService = new BroadcasterService();
const messagingService = new ElectronRendererMessagingService(broadcasterService);
const storageService: StorageServiceAbstraction = new ElectronStorageService(remote.app.getPath('userData'));
const platformUtilsService = new ElectronPlatformUtilsService(i18nService, messagingService, true, storageService);
const secureStorageService: StorageServiceAbstraction = new ElectronRendererSecureStorageService();
const cryptoFunctionService: CryptoFunctionServiceAbstraction = new WebCryptoFunctionService(window,
    platformUtilsService);
const cryptoService = new CryptoService(storageService, secureStorageService, cryptoFunctionService,
    platformUtilsService, logService);
const tokenService = new TokenService(storageService);
const appIdService = new AppIdService(storageService);
const apiService = new ApiService(tokenService, platformUtilsService,
    async (expired: boolean) => messagingService.send('logout', { expired: expired }));
const userService = new UserService(tokenService, storageService);
const settingsService = new SettingsService(userService, storageService);
export let searchService: SearchService = null;
const fileUploadService = new FileUploadService(logService, apiService);
const cipherService = new CipherService(cryptoService, userService, settingsService,
    apiService, fileUploadService, storageService, i18nService, () => searchService);
const folderService = new FolderService(cryptoService, userService, apiService, storageService,
    i18nService, cipherService);
const collectionService = new CollectionService(cryptoService, userService, storageService, i18nService);
searchService = new SearchService(cipherService, logService);
const sendService = new SendService(cryptoService, userService, apiService, fileUploadService, storageService,
    i18nService, cryptoFunctionService);
const policyService = new PolicyService(userService, storageService);
const vaultTimeoutService = new VaultTimeoutService(cipherService, folderService, collectionService,
    cryptoService, platformUtilsService, storageService, messagingService, searchService, userService, tokenService,
    null, async () => messagingService.send('logout', { expired: false }));
const syncService = new SyncService(userService, apiService, settingsService,
    folderService, cipherService, cryptoService, collectionService, storageService, messagingService, policyService,
    sendService, async (expired: boolean) => messagingService.send('logout', { expired: expired }));
const passwordGenerationService = new PasswordGenerationService(cryptoService, storageService, policyService);
const totpService = new TotpService(storageService, cryptoFunctionService);
const containerService = new ContainerService(cryptoService);
const authService = new AuthService(cryptoService, apiService, userService, tokenService, appIdService,
    i18nService, platformUtilsService, messagingService, vaultTimeoutService, logService);
const exportService = new ExportService(folderService, cipherService, apiService);
const auditService = new AuditService(cryptoFunctionService, apiService);
const notificationsService = new NotificationsService(userService, syncService, appIdService,
    apiService, vaultTimeoutService, async () => messagingService.send('logout', { expired: true }), logService);
const environmentService = new EnvironmentService(apiService, storageService, notificationsService);
const eventService = new EventService(storageService, apiService, userService, cipherService);
const systemService = new SystemService(storageService, vaultTimeoutService, messagingService, platformUtilsService,
    null);
const nativeMessagingService = new NativeMessagingService(cryptoFunctionService, cryptoService, platformUtilsService,
    logService, i18nService, userService, messagingService, vaultTimeoutService, storageService);

const analytics = new Analytics(window, () => isDev(), platformUtilsService, storageService, appIdService);
containerService.attachToGlobal(window);

export function initFactory(): Function {
    return async () => {
        await environmentService.setUrlsFromStorage();
        syncService.fullSync(true);
        vaultTimeoutService.init(true);
        const locale = await storageService.get<string>(ConstantsService.localeKey);
        await i18nService.init(locale);
        eventService.init(true);
        authService.init();
        setTimeout(() => notificationsService.init(environmentService), 3000);
        const htmlEl = window.document.documentElement;
        htmlEl.classList.add('os_' + platformUtilsService.getDeviceString());
        htmlEl.classList.add('locale_' + i18nService.translationLocale);
        let theme = await storageService.get<string>(ConstantsService.themeKey);
        if (theme == null) {
            theme = platformUtilsService.getDevice() === DeviceType.MacOsDesktop &&
                remote.nativeTheme.shouldUseDarkColors ? 'dark' : 'light';
        }
        htmlEl.classList.add('theme_' + theme);
        stateService.save(ConstantsService.disableFaviconKey,
            await storageService.get<boolean>(ConstantsService.disableFaviconKey));

        let installAction = null;
        const installedVersion = await storageService.get<string>(ConstantsService.installedVersionKey);
        const currentVersion = platformUtilsService.getApplicationVersion();
        if (installedVersion == null) {
            installAction = 'install';
        } else if (installedVersion !== currentVersion) {
            installAction = 'update';
        }

        if (installAction != null) {
            await storageService.save(ConstantsService.installedVersionKey, currentVersion);
            analytics.ga('send', {
                hitType: 'event',
                eventAction: installAction,
            });
        }
    };
}

@NgModule({
    imports: [
        ToasterModule,
    ],
    declarations: [],
    providers: [
        ValidationService,
        AuthGuardService,
        { provide: AuditServiceAbstraction, useValue: auditService },
        { provide: AuthServiceAbstraction, useValue: authService },
        { provide: CipherServiceAbstraction, useValue: cipherService },
        { provide: FolderServiceAbstraction, useValue: folderService },
        { provide: CollectionServiceAbstraction, useValue: collectionService },
        { provide: EnvironmentServiceAbstraction, useValue: environmentService },
        { provide: TotpServiceAbstraction, useValue: totpService },
        { provide: TokenServiceAbstraction, useValue: tokenService },
        { provide: I18nServiceAbstraction, useValue: i18nService },
        { provide: CryptoServiceAbstraction, useValue: cryptoService },
        { provide: CryptoFunctionServiceAbstraction, useValue: cryptoFunctionService },
        { provide: PlatformUtilsServiceAbstraction, useValue: platformUtilsService },
        { provide: PasswordGenerationServiceAbstraction, useValue: passwordGenerationService },
        { provide: ApiServiceAbstraction, useValue: apiService },
        { provide: SyncServiceAbstraction, useValue: syncService },
        { provide: UserServiceAbstraction, useValue: userService },
        { provide: MessagingServiceAbstraction, useValue: messagingService },
        { provide: BroadcasterService, useValue: broadcasterService },
        { provide: SettingsServiceAbstraction, useValue: settingsService },
        { provide: VaultTimeoutServiceAbstraction, useValue: vaultTimeoutService },
        { provide: StorageServiceAbstraction, useValue: storageService },
        { provide: StateServiceAbstraction, useValue: stateService },
        { provide: LogServiceAbstraction, useValue: logService },
        { provide: ExportServiceAbstraction, useValue: exportService },
        { provide: SearchServiceAbstraction, useValue: searchService },
        { provide: NotificationsServiceAbstraction, useValue: notificationsService },
        { provide: SystemServiceAbstraction, useValue: systemService },
        { provide: EventServiceAbstraction, useValue: eventService },
        { provide: PolicyServiceAbstraction, useValue: policyService },
        { provide: SendServiceAbstraction, useValue: sendService },
        { provide: CryptoFunctionServiceAbstraction, useValue: cryptoFunctionService },
        { provide: NativeMessagingService, useValue: nativeMessagingService },
        { provide: FileUploadServiceAbstraction, useValue: fileUploadService },
        {
            provide: APP_INITIALIZER,
            useFactory: initFactory,
            deps: [],
            multi: true,
        },
        {
            provide: LOCALE_ID,
            useFactory: () => i18nService.translationLocale,
            deps: [],
        },
    ],
})
export class ServicesModule {
}

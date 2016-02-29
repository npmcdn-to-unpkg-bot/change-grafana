/// <reference path="../../../../public/app/headers/common.d.ts" />
export declare class AppEditCtrl {
    private backendSrv;
    private $routeParams;
    appModel: any;
    appId: any;
    includedPanels: any;
    includedDatasources: any;
    /** @ngInject */
    constructor(backendSrv: any, $routeParams: any);
    update(): void;
    toggleEnabled(): void;
    togglePinned(): void;
}

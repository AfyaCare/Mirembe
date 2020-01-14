'use strict';

var billingApp=angular.module('bahmni.billing', ['ui.router', 'httpErrorInterceptor', 'bahmni.common.domain', 'bahmni.common.i18n', 'bahmni.common.uiHelper', 'bahmni.common.util',
    'bahmni.common.appFramework', 'bahmni.common.logging', 'bahmni.common.routeErrorHandler', 'pascalprecht.translate', 'ngCookies',
    'bahmni.common.models', 'bahmni.common.offline', 'ngFileUpload'])
    .config(['$urlRouterProvider', '$stateProvider', '$httpProvider', '$bahmniTranslateProvider', '$compileProvider',
        function ($urlRouterProvider, $stateProvider, $httpProvider, $bahmniTranslateProvider, $compileProvider) {

            $httpProvider.defaults.headers.common['Disable-WWW-Authenticate'] = true;
            $urlRouterProvider.otherwise('/dashboard');

            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|file):/);

            // @if DEBUG='production'
            $compileProvider.debugInfoEnabled(false);
            // @endif

            // @if DEBUG='development'
            $compileProvider.debugInfoEnabled(true);
            // @endif

            $stateProvider
                .state('dashboard',
                    {
                        url: '/dashboard',
                        templateUrl: 'views/dashboard.html',
                        controller: 'dashboardController',
                        data: {extensionPointId: 'org.bahmni.billing.dashboard'},
                        resolve: {
                            initialize: function (initialization) {
                                return initialization();
                            }
                        }
                    })
                .state('settings',
                    {
                        abstract:'true',
                        url:'/settings',
                        template:'<ui-view/>'
                    })
                .state('settings.types',
                    {
                        url: '/types',
                        templateUrl: 'views/settings/types.html',
                        controller: 'settingsController',
                        data: {extensionPointId: 'org.bahmni.billing.dashboard', appPage:'categories'},
                        resolve: {
                            initialize: function (initialization) {
                                return initialization();
                            }
                        }
                    })
                .state('settings.items',
                    {
                        url: '/items',
                        templateUrl: 'views/settings/items.html',
                        controller: 'settingsController',
                        data: {extensionPointId: 'org.bahmni.billing.dashboard', appPage:'items'},
                        resolve: {
                            initialize: function (initialization) {
                                return initialization();
                            }
                        }
                    })
                .state('settings.periods',
                    {
                        url: '/periods',
                        templateUrl: 'views/settings/financial-periods.html',
                        controller: 'settingsController',
                        data: {extensionPointId: 'org.bahmni.billing.dashboard', appPage:'periods'},
                        resolve: {
                            initialize: function (initialization) {
                                return initialization();
                            }
                        }
                    })
                .state('settings.versions',
                    {
                        url: '/versions',
                        templateUrl: 'views/settings/list-versions.html',
                        controller: 'settingsController',
                        data: {extensionPointId: 'org.bahmni.billing.dashboard', appPage:'versions'},
                        resolve: {
                            initialize: function (initialization) {
                                return initialization();
                            }
                        }
                    })
                .state('settings.lists',
                    {
                        url: '/lists',
                        templateUrl: 'views/settings/price-lists.html',
                        controller: 'settingsController',
                        data: {extensionPointId: 'org.bahmni.billing.dashboard', appPage:'lists'},
                        resolve: {
                            initialize: function (initialization) {
                                return initialization();
                            }
                        }
                    })
                .state('settings.templates',
                    {
                        url: '/templates',
                        templateUrl: 'views/settings/price-templates.html',
                        controller: 'settingsController',
                        data: {extensionPointId: 'org.bahmni.billing.dashboard', appPage:'templates'},
                        resolve: {
                            initialize: function (initialization) {
                                return initialization();
                            }
                        }
                    })
                .state('settings.criteria',
                    {
                        url: '/criteria',
                        templateUrl: 'views/settings/discounts-criteria.html',
                        controller: 'settingsController',
                        data: {extensionPointId: 'org.bahmni.billing.dashboard', appPage:'criteria'},
                        resolve: {
                            initialize: function (initialization) {
                                return initialization();
                            }
                        }
                    })
                .state('settings.features',
                    {
                        url: '/features',
                        templateUrl: 'views/settings/features-control.html',
                        controller: 'settingsController',
                        data: {extensionPointId: 'org.bahmni.billing.dashboard', appPage:'features'},
                        resolve: {
                            initialize: function (initialization) {
                                return initialization();
                            }
                        }
                    })
                .state('cashier',
                {
                    abstract:'true',
                    url:'/cashier',
                    template:'<ui-view/>'
                })
                .state('cashier.quotations',
                    {
                        url: '/quotations',
                        templateUrl: 'views/cashier/quotations.html',
                        controller: 'cashierController',
                        data: {extensionPointId: 'org.bahmni.billing.dashboard', appPage:'quotations'},
                        resolve: {
                            initialize: function (initialization) {
                                return initialization();
                            }
                        }
                    })
                .state('cashier.orders',
                    {
                        url: '/orders',
                        templateUrl: 'views/cashier/orders.html',
                        controller: 'cashierController',
                        data: {extensionPointId: 'org.bahmni.billing.dashboard', appPage:'orders'},
                        resolve: {
                            initialize: function (initialization) {
                                return initialization();
                            }
                        }
                    })
                .state('cashier.gepg',
                    {
                        url: '/gepg',
                        templateUrl: 'views/cashier/gepg.html',
                        controller: 'cashierController',
                        data: {extensionPointId: 'org.bahmni.billing.dashboard', appPage:'gepg'},
                        resolve: {
                            initialize: function (initialization) {
                                return initialization();
                            }
                        }
                    })
                .state('cashier.profile',
                    {
                        url: '/profile',
                        templateUrl: 'views/cashier/clients-profile.html',
                        controller: 'cashierController',
                        data: {extensionPointId: 'org.bahmni.billing.dashboard', appPage:'profile'},
                        resolve: {
                            initialize: function (initialization) {
                                return initialization();
                            }
                        }
                    });


            $bahmniTranslateProvider.init({app: 'billing', shouldMerge: true});
        }]).run(['$rootScope', '$templateCache', function ($rootScope, $templateCache) {
    // Disable caching view template partials
    $rootScope.$on('$viewContentLoaded', function () {
        $templateCache.removeAll();
    });
}]);

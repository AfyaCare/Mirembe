'use strict';

angular.module('store', ['ui.router', 'bahmni.store', 'bahmni.common.domain', 'bahmni.common.patient', 'authentication', 'bahmni.common.config', 'bahmni.common.appFramework',
    'httpErrorInterceptor', 'bahmni.common.routeErrorHandler', 'bahmni.common.uiHelper', 'bahmni.common.patientSearch', 'bahmni.common.util', 'bahmni.common.conceptSet',
    'RecursionHelper', 'infinite-scroll', 'bahmni.common.displaycontrol.patientprofile', 'bahmni.common.obs', 'bahmni.common.displaycontrol.orders', 'bahmni.common.i18n',
    'bahmni.common.displaycontrol.observation', 'bahmni.common.orders', 'pascalprecht.translate', 'ngCookies', 'bahmni.common.offline', 'bahmni.common.uicontrols'
])
    .config(['$urlRouterProvider', '$stateProvider', '$httpProvider', '$bahmniTranslateProvider', '$compileProvider',
        function ($urlRouterProvider, $stateProvider, $httpProvider, $bahmniTranslateProvider, $compileProvider) {
            $httpProvider.defaults.headers.common['Disable-WWW-Authenticate'] = true;
            $urlRouterProvider.otherwise('/overview');
            var homeBacklink = {
                label: 'home',
                url: '../home/',
                accessKey: 'h',
                icon: 'fa-home'
            };
            var previousBacklink = {
                label: 'back',
                url: '../pharmacy_requests',
                accessKey: 'h',
                icon: 'fa-chevron-left'
            };
            var settingsBackLink = {
                label: 'back',
                url: '../pharmacy_requests/#/settings',
                accessKey: 'h',
                icon: 'fa-chevron-left'
            };
            var searchBacklink = {
                label: 'Search',
                state: 'search',
                accessKey: 'p',
                icon: 'fa-users'
            };

            // @if DEBUG='production'
            $compileProvider.debugInfoEnabled(false);
            // @endif

            // @if DEBUG='development'
            $compileProvider.debugInfoEnabled(true);
            // @endif

            $stateProvider
                .state('overview', {
                    url: '/overview',
                    data: {
                        backLinks: [homeBacklink]
                    },
                    views: {
                        'content': {
                            templateUrl: 'views/overview.html'
                        }
                    }
                })
                .state('settings', {
                    url: '/settings',
                    data: {
                        backLinks: [previousBacklink]
                    },
                    views: {
                        'content': {
                            templateUrl: 'views/settings/settings.html',
                            controller: 'SettingsController'
                        }
                    }
                })
                .state('price', {
                    url: '/settings/price',
                    data: {
                        backLinks: [previousBacklink]
                    },
                    views: {
                        'content': {
                            templateUrl: 'views/settings/settings.html',
                            controller: 'SettingsController'
                        }
                    }
                })
                .state('categories', {
                    url: '/settings/categories',
                    data: {
                        backLinks: [previousBacklink]
                    },
                    views: {
                        'content': {
                            templateUrl: 'views/settings/categories.html',
                            controller: 'SettingsController'
                        }
                    }
                })
                .state('subcategories', {
                    url: '/settings/subcategories',
                    data: {
                        backLinks: [previousBacklink]
                    },
                    views: {
                        'content': {
                            templateUrl: 'views/settings/subcategories.html',
                            controller: 'SettingsController'
                        }
                    }
                })
                .state('ledger-type', {
                    url: '/ledger/type',
                    data: {
                        backLinks: [previousBacklink]
                    },
                    views: {
                        'content': {
                            templateUrl: 'views/ledger/ledger-type.html',
                            controller: 'LedgerController'
                        }
                    }
                })
                .state('ledger-management', {
                    url: '/ledger/management',
                    data: {
                        backLinks: [previousBacklink]
                    },
                    views: {
                        'content': {
                            templateUrl: 'views/ledger/ledger.html',
                            controller: 'LedgerController'
                        }
                    }
                })
                .state('manage-generic-products', {
                    url: '/settings/generic/products',
                    data: {
                        backLinks: [previousBacklink]
                    },
                    views: {
                        'content': {
                            templateUrl: 'views/settings/generic-products.html',
                            controller: 'SettingsController'
                        }
                    }
                })
                .state('manage-products', {
                    url: '/settings/products',
                    data: {
                        backLinks: [previousBacklink]
                    },
                    views: {
                        'content': {
                            templateUrl: 'views/settings/products.html',
                            controller: 'SettingsController'
                        }
                    }
                })
                .state('register-items', {
                    url: '/settings/items',
                    data: {
                        backLinks: [previousBacklink]
                    },
                    views: {
                        'content': {
                            templateUrl: 'views/settings/items.html',
                            controller: 'SettingsController'
                        }
                    }
                })
                .state('pricing', {
                    url: '/settings/pricing',
                    data: {
                        backLinks: [previousBacklink]
                    },
                    views: {
                        'content': {
                            templateUrl: 'views/settings/pricing.html',
                            controller: 'SettingsController'
                        }
                    }
                })
                .state('ledger', {
                    url: '/ledger',
                    data: {
                        backLinks: [previousBacklink]
                    },
                    views: {
                        'content': {
                            templateUrl: 'views/ledger/ledger.html',
                            controller: 'LedgerController'
                        }
                    }
                })
                .state('ledger-view', {
                    url: '/ledger/all',
                    data: {
                        backLinks: [previousBacklink]
                    },
                    views: {
                        'content': {
                            templateUrl: 'views/ledger/ledger.html',
                            controller: 'LedgerController'
                        }
                    }
                })
                .state('ledger-entry', {
                    url: '/ledger/entry',
                    data: {
                        backLinks: [previousBacklink]
                    },
                    views: {
                        'content': {
                            templateUrl: 'views/ledger/ledger-entry.html',
                            controller: 'LedgerController'
                        }
                    }
                })
                .state('stock', {
                    url: '/stock',
                    data: {
                        backLinks: [previousBacklink]
                    },
                    views: {
                        'content': {
                            templateUrl: 'views/stock/stock.html',
                            controller: 'ManageStockController'
                        }
                    }
                })
                .state('stock-management', {
                    url: '/stock/management',
                    data: {
                        backLinks: [previousBacklink]
                    },
                    views: {
                        'content': {
                            templateUrl: 'views/stock/stock-management.html',
                            controller: 'ManageStockController'
                        }
                    }
                })
                .state('stock-manage', {
                    url: '/manage/:id',
                    params: {
                        'item': {}
                    },
                    data: {
                        // extensionPointId: 'org.bahmni.nurse.search',
                        backLinks: [previousBacklink]
                    },
                    views: {
                        'content': {
                            templateUrl: 'views/stock/manage.html',
                            controller: 'ManageStockController'
                        }
                    }
                })
                .state('product-movement', {
                    url: '/products/movement',
                    data: {
                        // extensionPointId: 'org.bahmni.nurse.search',
                        backLinks: [previousBacklink]
                    },
                    views: {
                        'content': {
                            templateUrl: 'views/issues/issues.html',
                            controller: 'IssueController'
                        }
                    }
                })
                .state('product-issue', {
                    url: '/products/movement/:request_uuid',
                    params: {
                        'item': {}
                    },
                    data: {
                        // extensionPointId: 'org.bahmni.nurse.search',
                        backLinks: [previousBacklink]
                    },
                    views: {
                        'content': {
                            templateUrl: 'views/issues/possible-batches.html',
                            controller: 'IssueController'
                        }
                    }
                })
                .state('manage', {
                    url: '/manage',
                    data: {
                        backLinks: [previousBacklink]
                    },
                    views: {
                        'content': {
                            templateUrl: 'views/manage.html',
                            controller: 'ManageController'
                        }
                    }
                })
                .state('stores', {
                    url: '/stores',
                    data: {
                        // extensionPointId: 'org.bahmni.nurse.search',
                        backLinks: [previousBacklink]
                    },
                    views: {
                        'content': {
                            templateUrl: 'views/stores.html',
                            controller: 'StoreController'
                        }
                    }
                })
                .state('store', {
                    url: '/stores/{uuid}',
                    data: {
                        // extensionPointId: 'org.bahmni.nurse.search',
                        backLinks: [previousBacklink]
                    },
                    views: {
                        'content': {
                            templateUrl: 'views/store.html',
                            controller: 'StoreController'
                        }
                    }
                });
            $bahmniTranslateProvider.init({
                app: 'store',
                shouldMerge: true
            });
        }
    ]);
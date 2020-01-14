'use strict'

angular.module('store')
    .service('SettingsService', ['$http', function ($http) {
        return {

            getPriceList: function () {

                return $http.get(Bahmni.Common.Constants.selectPriceLists, {
                    method: "GET",
                    withCredentials: true
                });
            },

            createPriceList: function (name, defaultPrice) {
                var params = {
                    name: name,
                    defaulted: defaultPrice
                };
                return $http.get(Bahmni.Common.Constants.insertPriceList, {
                    method: "GET",
                    params: params,
                    withCredentials: true
                });
            },

            createPriceItem: function (item_id, price_list_id, buying_price, amount) {
                var params = {
                    item_id: item_id,
                    priceList: price_list_id,
                    buying_price: buying_price,
                    amount: amount

                };
                return $http.get(Bahmni.Common.Constants.insertPrice, {
                    method: "GET",
                    params: params,
                    withCredentials: true
                });
            },

            selectPriceItem: function (name) {
                var params = {
                    name: name

                };
                return $http.get(Bahmni.Common.Constants.selectPrice, {
                    method: "GET",
                    params: params,
                    withCredentials: true
                });
            },

            updatePriceItem: function (itemPriceId, itemId, price_list_id, buying_price, amount, dateRecorded) {
                var params = {
                    itemPriceId: itemPriceId,
                    itemId: itemId,
                    priceList: price_list_id,
                    buying_price: buying_price,
                    amount: amount,
                    dateRecorded: dateRecorded
                };
                return $http.get(Bahmni.Common.Constants.updatePriceItem, {
                    method: "GET",
                    params: params,
                    withCredentials: true
                });
            },

            getAllPriceItems: function () {
                return $http.get(Bahmni.Common.Constants.getAllPrices);
            },

            getAllCategories: function (IncludeRetired) {
                return $http.get(Bahmni.Common.Constants.getAllCategories, {
                    params: {
                        IncludeRetired: IncludeRetired
                    }
                });
            },

            createCategory: function (name) {
                return $http.get(Bahmni.Common.Constants.createCategory, {
                    params: {
                        CategoryName: name
                    }
                });
            },

            getCategory: function (uuid) {
                return $http.get(Bahmni.Common.Constants.getCategory + uuid + '/read');
            },

            updateCategory: function (uuid) {
                return $http.get(Bahmni.Common.Constants.updateCategory + uuid + '/update', {
                    params: {
                        CategoryName: name
                    }
                });
            },

            deleteCategory: function (uuid) {
                return $http.get(Bahmni.Common.Constants.updateCategory + uuid + '/delete');
            },

            createSubCategory: function (CategoryName, ParentCategoryUuid) {
                return $http.get(Bahmni.Common.Constants.createSubCategory, {
                    params: {
                        CategoryName: CategoryName,
                        ParentCategoryUuid: ParentCategoryUuid
                    }
                });
            },

            getCategorySubCats: function (uuid) {
                return $http.get(Bahmni.Common.Constants.getCategorySubCats + uuid + '/read/full');
            },

            getAllSubCategories: function (IncludeRetired) {
                return $http.get(Bahmni.Common.Constants.getAllSubCategories, {
                    params: {
                        IncludeRetired: IncludeRetired
                    }
                });
            },

            getSubCategoryByUUID: function (uuid) {
                return $http.get(Bahmni.Common.Constants.getSubCategoryByUUIDWithCategory + uuid + '/read');
            },

            updateSubCategory: function (uuid, ParentUuid, SubCategoryName, retired) {
                console.log(uuid, ParentUuid, SubCategoryName, retired)
                return $http.get(Bahmni.Common.Constants.getSubCategoryByUUIDWithCategory + uuid + '/update', {
                    params: {
                        ParentUuid: ParentUuid,
                        SubCategoryName: SubCategoryName,
                        retired: retired
                    }
                });
            },


            deleteSubCategory: function (uuid) {
                return $http.get(Bahmni.Common.Constants.getSubCategoryByUUIDWithCategory + uuid + '/delete');
            },

            getSubCategoryByUUIDWithCategory: function (uuid) {
                return $http.get(Bahmni.Common.Constants.getSubCategoryByUUIDWithCategory + uuid + '/read/full');
            },

            createGenericDrug: function (GenericDrugName) {
                return $http.get(Bahmni.Common.Constants.createGenericDrug, {
                    params: {
                        GenericDrugName: GenericDrugName
                    }
                });
            },

            getGenericDrugs: function (IncludeRetired) {
                return $http.get(Bahmni.Common.Constants.getGenericDrugs, {
                    params: {
                        IncludeRetired: IncludeRetired
                    }
                });
            },

            updateGenericDrug: function (uuid, GenericDrugName, retired) {
                return $http.get(Bahmni.Common.Constants.updateGenericDrug + uuid + '/update', {
                    params: {
                        Name: GenericDrugName,
                        retired: retired
                    }
                });
            },

            // deleteGenericDrug: function (uuid, GenericDrugName, retired) {
            //     return $http.get(Bahmni.Common.Constants.updateGenericDrug + uuid + '/update', {
            //         params: {
            //             Name: GenericDrugName,
            //             retired: retired
            //         }
            //     });
            // },

            createSubcategoryAttributeType: function (uuid, AttributeTypeName) {
                return $http.get(Bahmni.Common.Constants.createSubcategoryAttributeType + uuid + '/attributetypes/new', {
                    params: {
                        AttributeTypeNames: AttributeTypeName
                    }
                });
            },

            createSubcategoryAttributeTypes: function (uuid, AttributeTypeName) {
                return $http.get(Bahmni.Common.Constants.createSubcategoryAttributeTypes + uuid + '/attributetypes/new', {
                    params: {
                        AttributeTypeNames: AttributeTypeName
                    }
                });
            },

            getAllSubCategoriesWithTheirAttributeTypes: function (uuid, IncludeRetired) {
                return $http.get(Bahmni.Common.Constants.getAllSubCategoriesWithTheirAttributeTypes + uuid + '/subcategory/all/attributetypes', {
                    params: {
                        IncludeRetired: IncludeRetired
                    }
                });
            },

            getSubCategoryWithTheirAttributeTypes: function (uuid, IncludeRetired) {
                return $http.get(Bahmni.Common.Constants.getSubCategoryWithTheirAttributeTypes + uuid + '/attributetypes', {
                    params: {
                        IncludeRetired: IncludeRetired
                    }
                });
            },

            getDrugByName: function (name) {
                return $http.get(Bahmni.Common.Constants.searchItemsByName, {
                    params: {
                        DrugSubName: name
                    }
                })
            },

            getItemsByName: function (name) {
                return $http.get(Bahmni.Common.Constants.searchItemsByName, {
                    params: {
                        ItemSubName: name
                    }
                })
            },

            getDosageForm: function () {
                return $http.get(Bahmni.Common.Constants.getDosageForm)
            },

            saveActualDrug: function (GenericConceptId, GenericName, Strength, DosageConceptId, CategoryUuid) {
                return $http.get(Bahmni.Common.Constants.saveActualDrug, {
                    params: {
                        'GenericConceptId': GenericConceptId,
                        'GenericName': GenericName,
                        'Strength': Strength,
                        'DosageConceptId': DosageConceptId,
                        'CategoryUuid': CategoryUuid
                    }
                })
            },

            saveActualNonDrug: function (CategoryUuid, SubCategoryUuid, Attributes) {
                return $http.get(Bahmni.Common.Constants.saveActualNonDrug, {
                    params: {
                        'CategoryUuid': CategoryUuid,
                        'SubCategoryUuid': SubCategoryUuid,
                        'Attributes': Attributes,
                    }
                })
            },

            getAllItems: function (IncludeRetired) {
                return $http.get(Bahmni.Common.Constants.getAllItems, {
                    params: {
                        IncludeRetired: IncludeRetired
                    }
                });
            },

            getItemDetails: function (uuid, IncludeRetired) {
                return $http.get(Bahmni.Common.Constants.getItemDetails + uuid + '/read', {
                    params: {
                        IncludeRetired: IncludeRetired
                    }
                });
            },

            updateItemDetails: function (uuid, IncludeRetired, Attributes) {
                return $http.get(Bahmni.Common.Constants.getItemDetails + uuid + '/update', {
                    params: {
                        'retired': IncludeRetired,
                        'Attributes': Attributes,
                    }
                })
            },

            updateNonDrugItemDetails: function (uuid, IncludeRetired, Attributes) {
                return $http.get(Bahmni.Common.Constants.getItemDetails + '/nondrug/' + uuid + '/update', {
                    params: {
                        'retired': IncludeRetired,
                        'Attributes': Attributes,
                    }
                })
            },

            createPriceCategory: function (CategoryName) {
                return $http.get(Bahmni.Common.Constants.createPriceCategory, {
                    params: {
                        'CategoryName': CategoryName
                    }
                })
            },

            getPriceCategories: function (IncludeRetired) {
                return $http.get(Bahmni.Common.Constants.getPriceCategories, {
                    params: {
                        'IncludeRetired': IncludeRetired
                    }
                })
            },

            getPriceCategory: function (uuid) {
                return $http.get(Bahmni.Common.Constants.getPriceCategory + uuid + '/read');
            },

            updatePriceCategory: function (uuid, CategoryName, retired) {
                return $http.get(Bahmni.Common.Constants.getPriceCategory + uuid + '/update', {
                    params: {
                        'CategoryName': CategoryName,
                        'retired': retired
                    }
                });
            },
            
            createLedgerType: function (LedgerTypeName, Operation) {
                return $http.get(Bahmni.Common.Constants.createLedgerType, {
                    params: {
                        LedgerTypeName: LedgerTypeName,
                        Operation: Operation
                    }
                })
            },

            getLedgerType: function (uuid) {
                return $http.get(Bahmni.Common.Constants.getLedgerType + uuid + '/read')
            },

            updateLedgerType: function (uuid, LedgerTypeName, Operation, retired) {
                return $http.get(Bahmni.Common.Constants.getLedgerType + uuid + '/update', {
                    params: {
                        'LedgerTypeName': LedgerTypeName,
                        'Operation': Operation,
                        'retired': retired
                    }
                })
            },

            getAllLedgers: function () {
                return $http.get(Bahmni.Common.Constants.getAllLedgers)
            },

            getAllLedgerType: function (IncludeRetired) {
                return $http.get(Bahmni.Common.Constants.getAllLedgerTypes, {
                    params: {
                        'IncludeRetired': IncludeRetired
                    }
                })
            },

            searchItemsByName: function (DrugSubName, IncludeRetired) {
                return $http.get(Bahmni.Common.Constants.searchItemsByName, {
                    params: {
                        ItemSubName: DrugSubName,
                        IncludeRetired: IncludeRetired
                    }
                });
            },

            createSellingPricing: function (uuid, PriceCategoryId, SellingPrice) {
                return $http.get(Bahmni.Common.Constants.createSellingPricing + uuid + '/price/new', {
                    params: {
                        PriceCategoryId: PriceCategoryId,
                        SellingPrice: SellingPrice
                    }
                });
            },

            updateSellingPricing: function (uuid, PriceCategoryId, SellingPrice) {
                return $http.get(Bahmni.Common.Constants.createSellingPricing + uuid + '/price/update', {
                    params: {
                        PriceCategoryId: PriceCategoryId,
                        SellingPrice: SellingPrice
                    }
                });
            },

            getAllSellingPrices: function () {
                return $http.get(Bahmni.Common.Constants.getAllSellingPrices);
            },

            createLedger: function (LedgerTypeId, ItemId, PriceCategoryId, BatchNo, InvoiceNo, BuyingPrice, quantity, DateMoved, ExpiryDate, DosageFormId, Remarks) {
                return $http.get(Bahmni.Common.Constants.createLedger, {
                    params: {
                        LedgerTypeId: LedgerTypeId,
                        ItemId: ItemId,
                        PriceCategoryId: PriceCategoryId,
                        BatchNo: BatchNo,
                        InvoiceNo: InvoiceNo,
                        BuyingPrice: BuyingPrice,
                        quantity: quantity,
                        DateMoved: DateMoved,
                        ExpiryDate: ExpiryDate,
                        DosageFormId: DosageFormId,
                        Remarks: Remarks
                    }
                })
            },

            getLedger: function (uuid) {
                return $http.get(Bahmni.Common.Constants.getLedger + uuid + '/read');
            }


        };
    }]);
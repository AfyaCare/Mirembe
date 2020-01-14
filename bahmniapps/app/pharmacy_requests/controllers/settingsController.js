'use strict'

var app = angular.module('store');
app.controller('SettingsController', ['$scope', 'ngDialog', 'SettingsService', 'spinner', 'messagingService', function ($scope, ngDialog, SettingsService, spinner, messagingService) {

    $scope.attrs = [];
    $scope.edit = false;

    function init() {
        $scope.hideNonDrugs = false;
        getAllSubCategories();
        getAllCategories();
        getGenericProducts();
        getDosageForm();
        getAllItems();
        getPriceCategories();
        getAllSellingPrice();

        while ($scope.allCategories > 0 && $scope.nonDrugUuid != null) {
            getProducts();
        }
    }

    let getAllCategories = function () {
        SettingsService.getAllCategories(true)
            .then(function (response) {
                $scope.allCategories = response.data;
                nonDrugUuid();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    let getAllSubCategories = function () {
        SettingsService.getAllSubCategories(1)
            .then(function (response) {
                $scope.allSubCategories = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    let getCategory = function (uuid) {
        SettingsService.getCategory(uuid)
            .then(response => $scope.cat = response.data)
            .catch(error => console.log(error))
    };

    let getDosageForm = function () {
        SettingsService.getDosageForm()
            .then(response => $scope.dosageForms = response.data)
            .catch(error => console.log(error));
    };

    let getAllItems = function () {
        SettingsService.getAllItems(1)
            .then(response => {
                $scope.allItems = response.data;
                // console.log($scope.allItems);
            })
            .catch(error => console.log(error));
    };

    let getPriceCategories = function () {
        SettingsService.getPriceCategories(1)
            .then(response => {
                $scope.priceCategories = response.data
            })
            .catch(error => console.log(error));
    };

    let getAllSellingPrice = function () {
        SettingsService.getAllSellingPrices()
            .then(response => {
                $scope.sellingPrices = response.data
            })
            .catch(error => console.log(error));
    };

    let getPriceCategory = function (uuid) {
        SettingsService.getPriceCategory(uuid)
            .then(response => {
                $scope.pricelist = response.data;
                console.log(response.data);

            })
            .catch(error => console.log(error));
    };


    $scope.getCategorySubCats = function (category) {
        getCategory(category);
        SettingsService.getCategorySubCats(category)
            .then(response => $scope.allSubCategories = response.data.subCategories)
            .catch(error => console.log(error));
    };

    $scope.getSubcategoryAttributes = function (uuid) {
        SettingsService.getSubCategoryWithTheirAttributeTypes(uuid)
            .then(response => {
                $scope.attributes = response.data;
                console.log($scope.attributes);
            })
            .catch(error => console.log(error));
    };

    // open pricelist modal
    $scope.createPriceList = function () {
        ngDialog.open({
            scope: $scope,
            templateUrl: 'views/settings/create-pricelist.html'
        });
    };

    //save pricelist
    $scope.savePriceList = function (data) {
        spinner.forPromise(SettingsService.createPriceCategory(data.name)
            .then(function (response) {
                if (response.data.toUpperCase() === 'success'.toUpperCase()) {
                    messagingService.showMessage('info', 'Price Category Created');
                } else {
                    messagingService.showMessage('error', response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        );

        console.log(data);
        ngDialog.close();
    };

    // edit pricelist modal
    $scope.editPriceList = function (data) {
        $scope.pricelist = data;
        getPriceCategory(data.uuid);
        ngDialog.open({
            scope: $scope,
            templateUrl: 'views/settings/edit-pricelist.html'
        });
    };

    //update pricelist
    $scope.updatePriceList = function (data) {
        spinner.forPromise(SettingsService.updatePriceCategory(data.uuid, data.name, data.retired)
            .then(function (response) {
                if (response.data.toUpperCase() === 'success'.toUpperCase()) {
                    messagingService.showMessage('info', 'Price Category updated');
                } else {
                    messagingService.showMessage('info', response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        );

        console.log(data);
        ngDialog.close();
    };

    //delete pricelist
    $scope.deletePriceList = function (data, retired) {
        console.log(data);
        var confirrm = window.confirm('Are you sure?');
        if (confirrm) {
            spinner.forPromise(SettingsService.updatePriceCategory(data.uuid, data.name, retired)
                .then(function (response) {
                    if (response.data.toUpperCase() === 'success'.toUpperCase()) {
                        messagingService.showMessage('info', 'Price Category Retired');
                    } else {
                        messagingService.showMessage('info', response.data);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
            );

        }
        ngDialog.close();
    };

    // open category modal
    $scope.createCategory = function () {
        ngDialog.open({
            scope: $scope,
            templateUrl: 'views/settings/create-category.html'
        });
    };

    //save category
    $scope.saveCategory = function (data) {
        spinner.forPromise(SettingsService.createCategory(data.name)
            .then(function (response) {
                if (response.data === 'success') {
                    messagingService.showMessage('info', 'Category created');
                } else {
                    messagingService.showMessage('error', response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        );

        console.log(data);
        ngDialog.close();
    };

    // edit category modal
    $scope.editCategory = function (data) {
        $scope.category = data;
        ngDialog.open({
            scope: $scope,
            templateUrl: 'views/settings/edit-category.html'
        });
    };

    //update category
    $scope.updateCategory = function (data) {
        spinner.forPromise(SettingsService.updateCategory(data.uuid)
            .then(function (response) {
                if (response.data === 'success') {
                    messagingService.showMessage('info', 'Category updated');
                } else {
                    messagingService.showMessage('error', response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        );
        ngDialog.close();
    };

    //delete category
    $scope.deleteCategory = function (data) {
        var confirrm = window.confirm('Are you sure?');
        if (confirrm) {
            spinner.forPromise(SettingsService.deleteCategory(data.uuid)
                .then(function (response) {
                    if (response.data === 'success') {
                        messagingService.showMessage('info', 'Category deleted');
                    } else {
                        messagingService.showMessage('error', response.data);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
            );
        }
        ngDialog.close();
    };

    // open subcategory modal
    $scope.createSubCategory = function () {
        ngDialog.open({
            scope: $scope,
            templateUrl: 'views/settings/create-subcategory.html'
        });
    };

    //save subcategory
    $scope.saveSubCategory = function (data) {
        console.log(data);
        spinner.forPromise(SettingsService.createSubCategory(data.name, data.category)
            .then(function (response) {
                if (response.data === 'success') {
                    messagingService.showMessage('info', 'Category deleted');
                } else {
                    messagingService.showMessage('error', response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        );
        ngDialog.close();
    };

    // edit subcategory modal
    $scope.editSubCategory = function (data) {
        $scope.subcategory = data;
        console.log($scope.subcategory);
        ngDialog.open({
            scope: $scope,
            templateUrl: 'views/settings/edit-subcategory.html'
        });
    };

    //update subcategory
    $scope.updateSubCategory = function (data) {
        spinner.forPromise(SettingsService.updateSubCategory(data.uuid, data.parentuiid, data.name, data.retired)
            .then(function (response) {
                if (response.data === 'success') {
                    messagingService.showMessage('info', 'Category updated');
                } else {
                    messagingService.showMessage('error', response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        );
        ngDialog.close();
    };

    //delete subcategory
    $scope.deleteSubCategory = function (data, retired) {
        console.log(data, retired);
        var confirrm = window.confirm('Are you sure?');
        if (confirrm) {
            spinner.forPromise(SettingsService.updateSubCategory(data.uuid, data.parentCategory.uuid, data.name, retired)
                .then(function (response) {
                    if (response.data === 'success') {
                        messagingService.showMessage('info', 'success');
                    } else {
                        messagingService.showMessage('error', response.data);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
            );
            ngDialog.close();
        }
        ngDialog.close();
    };

    var getGenericProducts = function () {
        SettingsService.getGenericDrugs(1)
            .then(response => {
                $scope.allGenericProducts = response.data;
            })
            .catch(error => console.log(error));
    };

    var getProducts = function () {
        SettingsService.getAllSubCategoriesWithTheirAttributeTypes($scope.nonDrugUuid, 1)
            .then(response => $scope.allProducts = response.data)
            .catch(error => console.log(error));
    };

    // open generic product modal
    $scope.createGenericProduct = function () {
        ngDialog.open({
            scope: $scope,
            templateUrl: 'views/settings/create-generic-product.html'
        });
    };

    //save generic product
    $scope.saveGenericProduct = function (data) {
        spinner.forPromise(SettingsService.createGenericDrug(data.name)
            .then(function (response) {
                if (response.data === 'success') {
                    messagingService.showMessage('info', 'success');
                } else {
                    messagingService.showMessage('error', response.data);
                }
                // console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
        );
        console.log(data);
        ngDialog.close();
    };

    // edit product modal
    $scope.editGenericProduct = function (data) {
        $scope.product = data;
        console.log($scope.product);
        ngDialog.open({
            scope: $scope,
            templateUrl: 'views/settings/edit-generic-product.html'
        });
    };

    //update generic product
    $scope.updateGenericProduct = function (data) {
        spinner.forPromise(SettingsService.updateGenericDrug(data.uuid, data.name, 0)
            .then(function (response) {
                if (response.data === 'success') {
                    messagingService.showMessage('info', 'success');
                } else {
                    messagingService.showMessage('error', response.data);
                }
                // console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
        );
        console.log(data);
        ngDialog.close();
    };

    //delete generic product
    $scope.deleteGenericProduct = function (data) {
        console.log(data);
        var confirrm = window.confirm('Are you sure?');
        if (confirrm) {
            spinner.forPromise(SettingsService.updateGenericDrug(data.uuid, data.name, 1)
                .then(function (response) {
                    if (response.data === 'success') {
                        messagingService.showMessage('info', 'success');
                    } else {
                        messagingService.showMessage('error', response.data);
                    }
                    // console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
            );
            console.log(data);
            ngDialog.close();
        }
        ngDialog.close();
    };

    // open product modal
    $scope.createProduct = function () {
        ngDialog.open({
            scope: $scope,
            templateUrl: 'views/settings/create-product.html'
        });
    };

    //save product
    $scope.saveProduct = function (data) {
        let attr = [];
        data.attributes = data.attributes.split(';');
        data.attributes.forEach(function (x) {
            attr.push({
                "name": x
            });
        });
        let toBeSent = {
            'attributeTypeNames': attr
        };
        console.log(data, toBeSent);
        spinner.forPromise(SettingsService.createSubcategoryAttributeType(data.subcategoryuiid, JSON.stringify(toBeSent))
            .then(function (response) {
                if (response.data === 'success') {
                    messagingService.showMessage('info', 'success');
                } else {
                    messagingService.showMessage('error', response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        );
        ngDialog.close();
    };

    // edit product modal
    $scope.editProduct = function (data) {
        $scope.product = data;
        $scope.product.productAttributes = '';

        if (data.attributes) {
            let items = [];
            for (let i = 0; i < data.attributes.length; i++) {
                items.push(data.attributes[i].name);
            }
            $scope.product.productAttributes = items.join(';');
        }

        ngDialog.open({
            scope: $scope,
            templateUrl: 'views/settings/edit-product.html'
        });
        // console.log(items.join(';'));
    };

    //update generic product
    $scope.updateProduct = function (data) {
        console.log(data);
        let attr = [];
        data.productAttributes = data.productAttributes.split(';');
        data.productAttributes.forEach(function (x) {
            attr.push({
                "name": x
            });
        });
        let toBeSent = {
            'attributes': attr
        };
        console.log(toBeSent);
        spinner.forPromise(SettingsService.updateNonDrugItemDetails(data.subcategoryuiid, data.retired, JSON.stringify(toBeSent))
            .then(function (response) {
                if (response.data === 'success') {
                    messagingService.showMessage('info', 'success');
                } else {
                    messagingService.showMessage('error', response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        );
        console.log(data, toBeSent);
        ngDialog.close();
    };

    //delete generic product
    $scope.deleteProduct = function (data) {
        var confirrm = window.confirm('Are you sure?');
        if (confirrm) {
            console.log(data);
        }
        ngDialog.close();
    };

    // open item modal
    $scope.saveItem = function (data) {
        let toBeSent = {
            'attributes': $scope.attrs
        };
        if ($scope.attrs.length > 0) {
            spinner.forPromise(SettingsService.saveActualNonDrug(data.categoryUiid, data.subcategoryUiid, JSON.stringify(toBeSent))
                .then(response => {
                    if (response.data.toUpperCase() === 'success'.toUpperCase()) {
                        messagingService.showMessage('info', 'Saved');
                    } else {
                        messagingService.showMessage('error', response.data);
                    }
                    console.log(response)
                })
                .catch(err => {
                    messagingService.showMessage('error', err.data);
                    console.log(err);
                }));
        } else {
            spinner.forPromise(SettingsService.saveActualDrug(data.generic.conceptId, data.generic.name, data.strength, data.dosage, data.categoryUiid)
                .then(response => {
                    if (response.data.toUpperCase() === 'success'.toUpperCase()) {
                        messagingService.showMessage('info', 'Saved');
                    } else {
                        messagingService.showMessage('error', response.data);
                    }
                    console.log(response)
                })
                .catch(err => {
                    messagingService.showMessage('error', err.data);
                    console.log(err);
                }));
        }
    };

    var getItemDetails = function (uuid, retired) {
        SettingsService.getItemDetails(uuid, retired)
            .then(response => {
                $scope.dg = response.data;
                console.log($scope.dg);
            })
            .catch(error => console.log(error));
    };

    $scope.editItem = function (data) {
        $scope.edit = true;
        getItemDetails(data.itemUuid, 1);
    };

    $scope.updateItem = function (data) {
        $scope.edit = true;
        let toBeSent = {
            'attributes': $scope.attrs
        };

        if ($scope.attrs.length > 0) {
            spinner.forPromise(SettingsService.updateNonDrugItemDetails(data.itemUuid, data.retired, JSON.stringify(toBeSent))
                .then(response => {
                    if (response.data.toUpperCase() === 'success'.toUpperCase()) {
                        messagingService.showMessage('info', 'Updated');
                    } else {
                        messagingService.showMessage('error', response.data);
                    }
                    console.log(response)
                })
                .catch(err => {
                    messagingService.showMessage('error', err.data);
                    console.log(err);
                }));
        } else {
            //this is not working
            // spinner.forPromise(SettingsService.saveActualDrug(data.generic.conceptId, data.generic.name, data.strength, data.dosage, data.categoryUiid)
            //     .then(response => {
            //         if (response.data.toUpperCase() === 'success'.toUpperCase()) {
            //             messagingService.showMessage('info', 'Saved');
            //         } else {
            //             messagingService.showMessage('error', response.data);
            //         }
            //         console.log(response)
            //     })
            //     .catch(err => {
            //         messagingService.showMessage('error', err.data);
            //         console.log(err);
            //     }));
        }
        console.log(data, $scope.attrs);
    };

    $scope.savePricing = function (data) {
        console.log(data);
        spinner.forPromise(SettingsService.createSellingPricing(data.item.uuid, data.categoryId, data.selling)
            .then(response => {
                if (response.data.toUpperCase() === 'success'.toUpperCase()) {
                    messagingService.showMessage('info', response.data);
                    $scope.price = "";
                } else {
                    messagingService.showMessage('error', response.data);
                }
            })
            .catch(error => console.log(error)));
    };

    $scope.editPricing = function (data) {
        $scope.edit = true;
        $scope.price = {
            item: {
                name: data.itemName
            },
            'selling': data.sellingPrice,
            'categoryId': data.priceCategory.categoryId
        };
        console.log(data);
    };

    $scope.updatePricing = function (data) {
        console.log(data);
        spinner.forPromise(SettingsService.createSellingPricing(data.item.uuid, data.categoryId, data.selling)
            .then(response => {
                if (response.data.toUpperCase() === 'success') {
                    messagingService.showMessage('info', response.data);
                } else {
                    messagingService.showMessage('error', response.data);
                }
            })
            .catch(error => console.log(error)));
    };

    $scope.getParentCategory = function (uuid) {
        var output = '';
        SettingsService.getSubCategoryByUUIDWithCategory(uuid)
            .then(function (response) {
                return response.data.parentCategory.name;
            })
            .catch(function (error) {
                console.log(error);
            });
        return output;
    };


    $scope.attributesToString = function (data) {
        let attr = [];
        for (let x = 0; x <= data.length; x++) {
            attr.push(data[x].name);
        }
        console.log(attr);
        return attr.toString();
    };

    $scope.arrayToString = function (data) {
        // console.log(data);
        return ['yes', 'no'].toString();
    };

    $scope.getDrugByName = function (data) {
        if (data.length >= 3) {
            SettingsService.getGenericDrugs(0)
                .then(response => {
                    $scope.items = response.data;
                    console.log(response.data);
                })
                .catch(error => console.log(error));
        }
    };

    $scope.getItemByName = function (data) {
        if (data.length >= 3) {
            SettingsService.searchItemsByName(data, 0)
                .then(response => {
                    $scope.items = response.data;
                    console.log(response.data);
                })
                .catch(error => console.log(error));
        }
    };

    $scope.getDrugByName = function (data) {
        if (data.length >= 3) {
            SettingsService.getGenericDrugs(0)
                .then(response => {
                    $scope.items = response.data;
                    console.log(response.data);
                })
                .catch(error => console.log(error));
        }
    };

    $scope.fillTextBox = function (data) {
        $scope.dg.generic = {
            'name': data.name,
            'conceptId': data.conceptId,
        };
        //this is stupid, it serves the purpose for now <editing>
        $scope.dg.drug = {
            'name': data.name,
            'conceptId': data.conceptId,
        };
        $scope.items = null;
        console.log($scope.dg.generic.name);
    };

    $scope.fillItemTextBox = function (data) {
        $scope.price.item = {
            'name': data.itemName,
            'uuid': data.itemUuid,
        };
        $scope.items = null;
    };


    $scope.setAttrs = function (data, index) {
        console.log(data);
        $scope.attrs.push(data);
        for (let x = 0; x < $scope.attrs.length; x++) {
            if (data.uuid === $scope.attrs[x].uuid) {
                $scope.attrs.splice(x, 1);
                $scope.attrs.push({
                    "attributeTypename": data.name ? data.name : data.attributeName,
                    "attributeTypeUuid": data.uuid,
                    "value": index
                });
            }
        }
    };


    let nonDrugUuid = function () {
        $scope.nonDrugUuid = null;
        if ($scope.allCategories !== undefined && $scope.allCategories.length > 0) {
            for (let i = 0; i < $scope.allCategories.length; i++) {
                if ($scope.allCategories[i].name.toUpperCase() === 'non drugs'.toUpperCase()) {
                    $scope.nonDrugUuid = $scope.allCategories[i].uuid;
                }
            }
        }
        console.log($scope.nonDrugUuid);
    };


    $scope.$watch('nonDrugUuid', function () {
        var check = '';
        if ($scope.nonDrugUuid !== check) {
            getProducts();
        } else {
            if ($scope.allCategories !== undefined && $scope.allCategories.length > 0) {
                for (let i = 0; i < $scope.allCategories.length; i++) {
                    if ($scope.allCategories[i].name.toUpperCase() === 'non drugs'.toUpperCase()) {
                        check = $scope.allCategories[i].uuid;
                    }
                }
            }
        }
    });

    init();
}]);
app.filter('join', function () {
    // var attr = [];
    return function join(data) {
        console.log(data);
        data.forEach(function (x) {
            console.log(data[x]);
        });
    };
});
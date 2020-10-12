sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/Device",
	"sap/ui/model/Sorter"
], function (Controller, Formatter, Filter, FilterOperator, Device, Sorter) {
	"use strict";

	return Controller.extend("com.cpro.jhr.training.Training1.controller.View1", {

		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		formatter: Formatter,

		onInit: function () {
			this.byId("searchField").addStyleClass("sampleClass");
			this._mViewSettingsDialogs = {};
		},

		onSearch: function (oEvent) {
			var sQuery = oEvent.getParameter("query"),
				oTable = this.byId("flightTable"),
				oItemBinding = oTable.getBinding("items"),
				aFilter = [];

			aFilter.push(new Filter({
				path: 'Fluggesellschaft',
				operator: FilterOperator.Contains,
				value1: sQuery
			}));

			oItemBinding.filter(aFilter);
		},

		createViewSettingsDialog: function (sDialogFragmentName) {
			var oDialog = this._mViewSettingsDialogs[sDialogFragmentName];

			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(sDialogFragmentName, this);
				this._mViewSettingsDialogs[sDialogFragmentName] = oDialog;

				if (Device.system.desktop) {
					oDialog.addStyleClass("sapUiSizeCompact");
				}
			}
			this.getView().addDependent(oDialog);
			return oDialog;
		},

		handleSortButtonPressed: function () {
			var sNamespace = this.getOwnerComponent().getMetadata().getManifestEntry("sap.app").id;

			this.createViewSettingsDialog(sNamespace + ".fragments.SortDialog").open();
		},

		handleFilterButtonPressed: function () {
			var sNamespace = this.getOwnerComponent().getMetadata().getManifestEntry("sap.app").id;

			this.createViewSettingsDialog(sNamespace + ".fragments.FilterDialog").open();
		},

		handleGroupButtonPressed: function () {
			var sNamespace = this.getOwnerComponent().getMetadata().getManifestEntry("sap.app").id;

			this.createViewSettingsDialog(sNamespace + ".fragments.GroupDialog").open();
		},

		handleSortDialogConfirm: function (oEvent) {
			var oTable = this.byId("flightTable"),
				mParams = oEvent.getParameters(),
				oBinding = oTable.getBinding("items"),
				sPath,
				bDescending,
				aSorters = [];

			sPath = mParams.sortItem.getKey();
			bDescending = mParams.sortDescending;
			aSorters.push(new Sorter(sPath, bDescending));

			// apply the selected sort and group settings
			oBinding.sort(aSorters);

			delete this._mViewSettingsDialogs["com.cpro.jhr.training.Training1.fragments.GroupDialog"]

		},

		handleFilterDialogConfirm: function (oEvent) {
			var oTable = this.byId("flightTable"),
				oParameters = oEvent.getParameters(),
				oBinding = oTable.getBinding("items"),
				aFilter = [];

			oParameters.filterItems.forEach(function (oItem) {
				var aSplit = oItem.getKey().split("___"),
					sPath = oItem.getParent().getKey(),
					sOperator = aSplit[0],
					sValue1 = aSplit[1],
					sValue2 = aSplit[2],
					oFilter = new Filter(sPath, sOperator, sValue1, sValue2);
				aFilter.push(oFilter);
			});

			oBinding.filter(aFilter);

			var oInfoToolbar = this.byId("infoToolbar"),
				oText = this.byId("infoText");

			oInfoToolbar.setVisible(aFilter.length > 0);
			oText.setText(oParameters.filterString);

		},

		handleGroupDialogConfirm: function (oEvent) {
			var oTable = this.byId("flightTable"),
				oParameters = oEvent.getParameters(),
				oBinding = oTable.getBinding("items"),
				aSorters = [];

			if (!oParameters.groupItem) {
				oBinding.sort([]);
			} else {
				var sPath = oParameters.groupItem.getKey(),
					bDescending = oParameters.groupDescending,
					bGroup = true;

				aSorters.push(new Sorter(sPath, bDescending, bGroup));
				oBinding.sort(aSorters);
			}

			delete this._mViewSettingsDialogs["com.cpro.jhr.training.Training1.fragments.SortDialog"];
		},

		onButtonPress: function (oEvent) {
			this.getRouter().navTo("View2");
		},
		
		onListItemPress: function(oEvent){
			var oItem = oEvent.getSource(),
				oBindingContext = oItem.getBindingContext(),
				sID = oBindingContext.getProperty("FluggesellschaftID");
			
			this.getRouter().navTo("View2Query", {
				fluggesellschaftID: sID,
				query: {key:"value"},
				warehouseNumber: "someInformation"
			});
			
		}
	});
});
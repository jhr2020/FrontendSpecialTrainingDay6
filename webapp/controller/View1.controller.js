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
			
			this.createViewSettingsDialog(sNamespace+".fragments.SortDialog").open();
		},

		handleFilterButtonPressed: function () {
			var sNamespace = this.getOwnerComponent().getMetadata().getManifestEntry("sap.app").id;
			
			this.createViewSettingsDialog(sNamespace+".fragments.FilterDialog").open();
		},

		handleGroupButtonPressed: function () {
			var sNamespace = this.getOwnerComponent().getMetadata().getManifestEntry("sap.app").id;
			
			this.createViewSettingsDialog(sNamespace+".fragments.GroupDialog").open();
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
		},

		onButtonPress: function (oEvent) {
			this.getRouter().navTo("View2");
		}
	});
});
sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		
		createViewModel: function () {
			var oModel = new JSONModel({test:"Data"});
			oModel.setDefaultBindingMode("TwoWay");
			return oModel;
		}

	};
});
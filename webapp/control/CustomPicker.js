sap.ui.define([
	"sap/ui/core/Control",
	"sap/m/DatePicker",
	"sap/m/Label",
	"sap/m/Button",
	"../libraries/Moment.min"

], function (Control, DatePicker, Label, Button) {
	"use strict";
	return Control.extend("com.cpro.jhr.training.Training1.control.CustomPicker", {
		metadata: {
			properties: {
				dateValue: {
					type: "string"
				},
				width: {
					type : "sap.ui.core.CSSSize", 
					defaultValue : "200px"
				}
			},
			aggregations: {
				_picker: {
					type: "sap.m.DateTimeField",
					multiple: false,
					visibility: "hidden"
				},
				_label: {
					type: "sap.m.Label",
					multiple: false,
					visibility: "hidden"
				}
			},
			events: {
				change: {
					parameters: {
						dateValue: {
							type: "string"
						}
					}
				}
			}
		},
		init: function () {
			this.setAggregation("_picker", new DatePicker({
				valueFormat:"yyyy-MM-dd",
				displayFormat:"MM-y",
				change:this._onChange.bind(this),
				class:"sapUiSmallMarginBottom"
			}));
			this.setAggregation("_label", new Label({
				text: "{i18n>View2.selectADate}"
			}).addStyleClass("sapUiTinyMargin"));
		},

		setDateValue: function (sValue) {
			this.setProperty("dateValue", sValue, true);
			this.getAggregation("_picker").setValue(sValue);
		},
		
		_onChange: function (oEvent){
			var oRessourceBundle = this.getModel("i18n").getResourceBundle(),
				sValue = oEvent.getParameter("value"),
				sDaysInMonth = moment(sValue).daysInMonth(),
				sText=oRessourceBundle.getText("View2.dayinMonth", [sDaysInMonth]);
			
			this.setDateValue(sValue);
			
			this.getAggregation("_label").setText(sText);
			
			this.fireEvent("change", {
				dateValue: this.getDateValue()
			});
		},
		renderer: function (oRM, oControl) {
			oRM.write("<div");
			oRM.writeControlData(oControl);
			
			oRM.addClass("customPicker");
			oRM.writeClasses();
			
			oRM.addStyle("width", oControl.getWidth());
			oRM.writeStyles();
			
			oRM.write(">");
			
			oRM.renderControl(oControl.getAggregation("_picker"));
			oRM.renderControl(oControl.getAggregation("_label"));
			
			oRM.write("</div>");
		}
	});
});
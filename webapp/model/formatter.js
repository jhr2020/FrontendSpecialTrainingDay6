sap.ui.define([], function() {
	"use strict";

	return {
		
		dateFormatter: function(sValue, sSecoundValue) {
			if (!sValue) {
				return "n. a.";
			} else {
				var d = new Date(sValue);

				return d.toLocaleDateString(undefined, {
					year: "numeric",
					month: "2-digit",
					day: "2-digit"
				});
			}
		}
		
	};
});

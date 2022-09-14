sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("adminbusbooking.controller.controller.App", {
        onInit() {

        },
        onLoginPress: function(){
          
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			    oRouter.navTo("RouteAdminPage", {} );     
        }
      });
    }
  );
  
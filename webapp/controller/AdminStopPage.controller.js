sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("adminbusbooking.controller.AdminStopPage", {
        onInit() {

        },
        onAdd: function(){
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			    alert("Implementation left");
        },
        onDelete: function(){
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			    alert("Implementation left");
        },
        onUpdate: function(){
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			    alert("Implementation left");
        },
        onView: function(){
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			    alert("Implementation left");
        },
        GoToAdminHomePage: function(){
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
          oRouter.navTo("RouteAdminPage", {} );   
        }

      });
    }
  );
  
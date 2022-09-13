sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("adminbusbooking.controller.AdminMainPage", {
            onInit: function () {
                
            },
            onTapStop: function(){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			    oRouter.navTo("RouteAdminStopPage", {} );
            },
            onTapRoutes: function(){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			    oRouter.navTo("RouteAdminRoutePage", {} );
            },
            onTapConnections: function(){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			    oRouter.navTo("RouteAdminConnectionPage", {} );
            },
            onTapBuses: function(){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			    oRouter.navTo("RouteAdminBusPage", {} );
            },
            GoToLogin: function(){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			    oRouter.navTo("RouteLoginPage", {} );
            }
        });
    });

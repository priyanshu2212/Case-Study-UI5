sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "adminbusbooking/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("adminbusbooking.Component", {
            metadata: {
                manifest: "json"
            },

            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
                
                var s=this.getModel();

                console.log(s);

                console.log(document.body);

                s.read("/Bus",{

                    success: function(data){

                        console.log(data);

                        // let str="<ul>"

                        // for(let i=0;i<10;i++){

                        //     str+=`<li>${data.results[i].TravelUUID}</li>`

                        // }

                        // str+="</ul>"

                        // document.getElementById("application-firstapp-display-content-uiarea").innerHTML=str

                    }
                })
            }
        });
    }
);
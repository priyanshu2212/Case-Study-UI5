sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Text",
    "sap/m/DialogType",
    "sap/m/MessageBox"
],
    /*
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Dialog, Button, Text, DialogType, MessageBox) {
        "use strict";
        var oStopId = "";
        var intent = "create";
        return Controller.extend("adminbusbooking.controller.AdminStopHome", {
            onInit: function () {
                var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZUI_C_ZBTBCS_ADMIN/");
                sap.ui.getCore().setModel(oModel);
            },
            resetJsonModel: function () {
                //set null data
                var jsonModel = this.getView().getModel();
                var oData = {
                    StopId: "",
                    Name: "",
                    City: "",
                    ValidTill: ""
                }
                jsonModel.setData(oData)
            },
            onTabChanged: function (oEvent) {
                console.log("tab changed")
                var key = oEvent.getParameters().key;

                if (key == 'tab2') {

                }
                else if (key == 'tab1') {
                    //reset json model
                    this.resetJsonModel()
                    //reset oStopCode
                    oStopId = ""

                    //reset intent
                    intent = "create"
                };
                // var src = oEvent.getSource();
                // var self = this;

                // MessageBox.confirm(
                //     "You have unsaved changes. Do you want to switch the tab?", {
                //     onClose: function (action) {
                //         if (action === "OK") {
                //             self._selectedKey = key;
                //         }
                //         else {
                //             src.setSelectedKey(self._selectedKey);
                //         }
                //         key = oEvent.getParameters().key;
                       
                //     }
                // }
                // );
            },

            saveStopData: function () {
                var jsonModel = this.getView().getModel();
                var stopId = jsonModel.getProperty("/StopId");
                var stopName = jsonModel.getProperty("/StopName");
                var city = jsonModel.getProperty("/City");
                // var district = jsonModel.getProperty("/District");
                // var address = jsonModel.getProperty("/Address");
                // var geoLat = jsonModel.getProperty("/GeoLat");
                // var geoLon = jsonModel.getProperty("/GeoLon");
                var validTill = jsonModel.getProperty("/ValidTill");
                //validTill = validTill.replaceAll('-', '')

                var oModel = sap.ui.getCore().getModel()
                var oData = {
                    StopId: stopId,
                    StopName: stopName,
                    City: city,
                    // District: district,
                    // Address: address,
                    // GeoLat: geoLat,
                    // GeoLon: geoLon,
                    ValidTill: validTill
                }

                var oTable = this.getView().byId('smartStopTable')    ////doubt here

                //if intent is to edit
                if (intent == 'edit') {
                    //if stop code has been changed while editing
                    //delete old record and insert a new one
                    if (stopId != oStopId) {
                        console.log("deleting current record!")
                        oModel.remove(`/Stop('${oStopId}')`, {
                            success: function (data) {
                                console.log("data deleted successfully!")
                                console.log("creating new record!")
                                oModel.create("/Stop", oData, null, function () {
                                    console.log("entry saved sucessfulyy!")
                                    oTable.rebindTable()
                                    resetJsonModel()
                                    this.getView().byId('tabBar').setSelectedKey('tab1')
                                }.bind(this),
                                    function (err) {
                                        console.log(err)
                                    }
                                );
                            }.bind(this)
                            , error: function (err) {
                                console.log("Some error occurred while deleting data!")
                            }
                        })
                    } else {
                        //modify the current record
                        console.log("modifying current record!")
                        oModel.update(`/Stop('${oStopCode}')`, oData, null, function () {
                            console.log("entry updated sucessfulyy!")
                            oTable.rebindTable()
                            resetJsonModel()
                            this.getView().byId('tabBar').setSelectedKey('tab1')
                        }.bind(this),
                            function (err) {
                                console.log(err)
                            }
                        );
                    }
                } else if (intent == 'create') {
                    console.log("creating new record!")
                    //create the new record
                    oModel.create("/Stop", oData, null, function () {
                        console.log("entry saved sucessfulyy!")
                        oTable.rebindTable()
                        resetJsonModel()
                        this.getView().byId('tabBar').setSelectedKey('tab1')
                    }.bind(this),
                        function (err) {
                            console.log(err)
                        }
                    );
                }
            },

            onDeleteClick: function () {
                var dialog = new Dialog({
                    type: DialogType.Message,
                    title: "Confirm",
                    content: new Text({ text: 'Are you sure you want to delete this record?' }),
                    beginButton: new Button({
                        text: 'Delete',
                        press: function () {
                            console.log("deleted record...")
                            console.log(this)
                            dialog.close();
                        }
                    }),
                    endButton: new Button({
                        text: 'Cancel',
                        press: function () {
                            console.log("Cancelled deletion...")
                            dialog.close();
                        }
                    }),
                    afterClose: function () {
                        dialog.destroy();
                    }
                });
                dialog.open();
            },

            onEditClick: function (evt) {
                intent = "edit"
                var jsonModel = this.getOwnerComponent().getModel()   ///doubt here
                var row = evt.oSource.getParent()
                var stopId = row.data("StopId")
                oStopId = stopId
                var oModel = sap.ui.getCore().getModel()
                this.getView().byId('tabBar').setSelectedKey('tab2')

                oModel.read(`/Stop('${stopId}')`, {  
                    success: function (data) {
                        jsonModel.setData(data)
                    }.bind(this)
                    , error: function (err) {
                        console.log("no data found!")
                    }
                })
            }

        })
    })
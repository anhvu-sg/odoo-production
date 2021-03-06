'use strict';


angular.module('starter').factory('ResPartnerModel', ['$q', 'jsonRpc', function ($q, jsonRpc) {

    return {
        GetByBarcode: function(barcode) {
            return jsonRpc.searchRead('res.partner', [['barcode', '=', barcode]], ['id']).then(function (partner_res) {
                var partner_ids = [];
                partner_res.records.forEach(function(partner) {
                    partner_ids.push(partner.id);
                });
                return partner_ids;
            });
        },

        GetByBarcodeBase: function(barcode_base) {
            return jsonRpc.searchRead('res.partner', [['barcode_base', '=', barcode_base]], ['id']).then(function (partner_res) {
                var partner_ids = [];
                partner_res.records.forEach(function(partner) {
                    partner_ids.push(partner.id);
                });
                return partner_ids;
            });
        },

        GetByName: function(name) {
            return jsonRpc.call('res.partner', 'name_search', [name]).then(function (partner_res) {
                var partner_ids = [];
                partner_res.forEach(function(partner) {
                    partner_ids.push(partner[0]);
                });
                return partner_ids;
            });
        },

        LogMove: function(partner_id, action) {
            return jsonRpc.call('res.partner', 'log_move', [partner_id, action]).then(function (res) {
                return res;
            });
        },

        GetById: function(partner_id) {
            return jsonRpc.searchRead('res.partner', [['id', '=', partner_id]], [
                'id', 'name', 'street', 'street2', 'zip', 'city', 'customer', 'country_id', 'phone', 'mobile', 'bootstrap_cooperative_state', 'cooperative_state', 'display_name']).then(function (partner_res) {
                if (partner_res.records.length == 1){
                    var res = partner_res.records[0];
                    res.image_url = "../../../web/image?model=res.partner&id=" + partner_id + "&field=image";
                    return res;
                }else{
                    return false;
                }
            });
        },

        GetByIds: function(partner_ids) {
            return jsonRpc.searchRead('res.partner', [['id', 'in', partner_ids]], [
                'id', 'name', 'street', 'street2', 'zip', 'city', 'customer', 'country_id', 'phone', 'mobile', 'bootstrap_cooperative_state', 'cooperative_state', 'display_name']).then(function (partner_res) {
                partner_res.records.forEach(function(partner) {
                    partner.image_url = "../../../web/image?model=res.partner&id=" + partner.id + "&field=image";
                });
                return partner_res.records;
            });
        },

    };
}]);

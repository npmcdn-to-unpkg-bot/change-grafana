/*! grafana - v3.0.0-pre1 - 2016-02-22
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","../core_module"],function(a,b){"use strict";b["default"].service("utilSrv",["$rootScope","$modal","$q",function(a,b,c){this.init=function(){a.onAppEvent("show-modal",this.showModal,a)},this.showModal=function(a,d){var e=b({modalClass:d.modalClass,template:d.src,persist:!1,show:!1,scope:d.scope,keyboard:!1});c.when(e).then(function(a){a.modal("show")})}}])});
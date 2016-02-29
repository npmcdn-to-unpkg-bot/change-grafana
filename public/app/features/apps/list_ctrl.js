/*! grafana - v3.0.0-pre1 - 2016-02-22
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

System.register(["angular"],function(a){var b,c;return{setters:[function(a){b=a}],execute:function(){c=function(){function a(a){var b=this;this.backendSrv=a,this.backendSrv.get("api/org/apps").then(function(a){b.apps=a})}return a.$inject=["backendSrv"],a}(),a("AppListCtrl",c),b["default"].module("grafana.controllers").controller("AppListCtrl",c)}}});
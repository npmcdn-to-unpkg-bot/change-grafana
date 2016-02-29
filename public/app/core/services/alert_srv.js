/*! grafana - v3.0.0-pre1 - 2016-02-22
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","lodash","../core_module"],function(a,b,c){"use strict";c["default"].service("alertSrv",["$timeout","$sce","$rootScope","$modal","$q",function(c,d,e,f,g){var h=this;this.init=function(){e.onAppEvent("alert-error",function(a,b){h.set(b[0],b[1],"error")},e),e.onAppEvent("alert-warning",function(a,b){h.set(b[0],b[1],"warning",5e3)},e),e.onAppEvent("alert-success",function(a,b){h.set(b[0],b[1],"success",3e3)},e),e.onAppEvent("confirm-modal",this.showConfirmModal,e)},this.list=[],this.set=function(d,f,g,i){var j={title:d||"",text:f||"",severity:g||"info"},k=a.toJson(j);return b.remove(h.list,function(b){return a.toJson(b)===k}),h.list.push(j),i>0&&c(function(){h.list=b.without(h.list,j)},i),e.$$phase||e.$digest(),j},this.clear=function(a){h.list=b.without(h.list,a)},this.clearAll=function(){h.list=[]},this.showConfirmModal=function(a,b){var c=e.$new();c.title=b.title,c.text=b.text,c.onConfirm=b.onConfirm,c.icon=b.icon||"fa-check",c.yesText=b.yesText||"Yes",c.noText=b.noText||"Cancel";var d=f({template:"public/app/partials/confirm_modal.html",persist:!1,modalClass:"modal-no-header confirm-modal",show:!1,scope:c,keyboard:!1});g.when(d).then(function(a){a.modal("show")})}}])});
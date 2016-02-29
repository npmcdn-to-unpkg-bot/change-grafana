/*! grafana - v3.0.0-pre1 - 2016-02-22
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular"],function(a){"use strict";var b=a.module("grafana.controllers");b.controller("AdminListOrgsCtrl",["$scope","backendSrv",function(a,b){a.init=function(){a.getOrgs()},a.getOrgs=function(){b.get("/api/orgs").then(function(b){a.orgs=b})},a.deleteOrg=function(c){a.appEvent("confirm-modal",{title:"Do you want to delete organization "+c.name+"?",text:"All dashboards for this organization will be removed!",icon:"fa-trash",yesText:"Delete",onConfirm:function(){b["delete"]("/api/orgs/"+c.id).then(function(){a.getOrgs()})}})},a.init()}])});
/*! grafana - v3.0.0-pre1 - 2016-02-22
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular"],function(a){"use strict";var b=a.module("grafana.controllers");b.controller("AdminListUsersCtrl",["$scope","backendSrv",function(a,b){a.init=function(){a.getUsers()},a.getUsers=function(){b.get("/api/users").then(function(b){a.users=b})},a.deleteUser=function(c){a.appEvent("confirm-modal",{title:"Do you want to delete "+c.login+"?",icon:"fa-trash",yesText:"Delete",onConfirm:function(){b["delete"]("/api/admin/users/"+c.id).then(function(){a.getUsers()})}})},a.init()}])});
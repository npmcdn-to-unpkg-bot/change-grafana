/*! grafana - v3.0.0-pre1 - 2016-02-22
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","app/core/config"],function(a){"use strict";var b=a.module("grafana.controllers");b.controller("ChangePasswordCtrl",["$scope","backendSrv","$location",function(a,b,c){a.command={},a.changePassword=function(){return a.userForm.$valid?a.command.newPassword!==a.command.confirmNew?void a.appEvent("alert-warning",["New passwords do not match",""]):void b.put("/api/user/password",a.command).then(function(){c.path("profile")}):void 0}}])});
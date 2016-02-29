/*! grafana - v3.0.0-pre1 - 2016-02-22
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

define(["../core_module"],function(a){"use strict";a["default"].controller("LoadDashboardCtrl",["$scope","$routeParams","dashboardLoaderSrv","backendSrv",function(a,b,c,d){return b.slug?void c.loadDashboard(b.type,b.slug).then(function(b){a.initDashboard(b,a)}):void d.get("/api/dashboards/home").then(function(b){var c=b.meta;c.canSave=c.canShare=c.canStar=!1,a.initDashboard(b,a)})}]),a["default"].controller("DashFromImportCtrl",["$scope","$location","alertSrv",function(a,b,c){return window.grafanaImportDashboard?void a.initDashboard({meta:{canShare:!1,canStar:!1},dashboard:window.grafanaImportDashboard},a):(c.set("Not found","Cannot reload page with unsaved imported dashboard","warning",7e3),void b.path(""))}]),a["default"].controller("NewDashboardCtrl",["$scope",function(a){a.initDashboard({meta:{canStar:!1,canShare:!1},dashboard:{title:"New dashboard",rows:[{height:"250px",panels:[]}]}},a)}])});
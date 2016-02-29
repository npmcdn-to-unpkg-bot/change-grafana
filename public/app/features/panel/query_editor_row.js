/*! grafana - v3.0.0-pre1 - 2016-02-22
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

System.register(["angular"],function(a){function b(){return{restrict:"E",templateUrl:"public/app/features/panel/partials/query_editor_row.html",transclude:!0,scope:{ctrl:"="}}}var c,d;return{setters:[function(a){c=a}],execute:function(){d=c["default"].module("grafana.directives"),d.directive("queryEditorRow",b)}}});
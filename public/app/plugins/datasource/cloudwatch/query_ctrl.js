/*! grafana - v3.0.0-pre1 - 2016-02-22
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

System.register(["./query_parameter_ctrl","app/plugins/sdk"],function(a){var b,c,d=this&&this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)};return{setters:[function(a){},function(a){b=a}],execute:function(){c=function(a){function b(b,c){a.call(this,b,c),this.aliasSyntax="{{metric}} {{stat}} {{namespace}} {{region}} {{<dimension name>}}"}return d(b,a),b.$inject=["$scope","$injector"],b.templateUrl="partials/query.editor.html",b}(b.QueryCtrl),a("CloudWatchQueryCtrl",c)}}});
/*! grafana - v3.0.0-pre1 - 2016-02-22
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","lodash","../core_module"],function(a,b,c){"use strict";c["default"].service("timer",["$timeout",function(a){var c=[];this.register=function(a){return c.push(a),a},this.cancel=function(d){c=b.without(c,d),a.cancel(d)},this.cancel_all=function(){b.each(c,function(b){a.cancel(b)}),c=[]}}])});
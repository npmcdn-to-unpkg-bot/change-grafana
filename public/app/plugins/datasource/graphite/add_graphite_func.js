/*! grafana - v3.0.0-pre1 - 2016-02-22
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","lodash","jquery","./gfunc"],function(a,b,c,d){"use strict";function e(a){return b.reduce(a,function(a,c){return b.each(c,function(b){a.push(b.name)}),a},[])}function f(a){return b.map(a,function(a,c){return{text:c,submenu:b.map(a,function(a){return{text:a.name,click:"ctrl.addFunction('"+a.name+"')"}})}})}a.module("grafana.directives").directive("graphiteAddFunc",["$compile",function(a){var g='<input type="text" class="tight-form-input input-medium tight-form-input" spellcheck="false" style="display:none"></input>',h='<a  class="tight-form-item tight-form-func dropdown-toggle" tabindex="1" gf-dropdown="functionMenu" data-toggle="dropdown"><i class="fa fa-plus"></i></a>';return{link:function(i,j){var k=d.getCategories(),l=e(k),m=i.ctrl;i.functionMenu=f(k);var n=c(g),o=c(h);n.appendTo(j),o.appendTo(j),n.attr("data-provide","typeahead"),n.typeahead({source:l,minLength:1,items:10,updater:function(a){var c=d.getFuncDef(a);if(c||(a=a.toLowerCase(),c=b.find(l,function(b){return 0===b.toLowerCase().indexOf(a)})))return i.$apply(function(){m.addFunction(c)}),n.trigger("blur"),""}}),o.click(function(){o.hide(),n.show(),n.focus()}),n.keyup(function(){j.toggleClass("open",""===n.val())}),n.blur(function(){setTimeout(function(){n.val(""),n.hide(),o.show(),j.removeClass("open")},200)}),a(j.contents())(i)}}}])});
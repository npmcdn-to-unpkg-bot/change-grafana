/*! grafana - v3.0.0-pre1 - 2016-02-22
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

define(["lodash","jquery","../core_module"],function(a,b,c){"use strict";c["default"].directive("dropdownTypeahead",["$compile",function(c){var d='<input type="text" class="tight-form-input input-medium tight-form-input" spellcheck="false" style="display:none"></input>',e='<a  class="tight-form-item tight-form-func dropdown-toggle" tabindex="1" gf-dropdown="menuItems" data-toggle="dropdown" data-placement="top"><i class="fa fa-plus"></i></a>';return{scope:{menuItems:"=dropdownTypeahead",dropdownTypeaheadOnSelect:"&dropdownTypeaheadOnSelect",model:"=ngModel"},link:function(f,g,h){var i=b(d),j=b(e);i.appendTo(g),j.appendTo(g),h.linkText&&j.html(h.linkText),h.ngModel&&f.$watch("model",function(b){a.each(f.menuItems,function(c){a.each(c.submenu,function(a){a.value===b&&j.html(a.text)})})});var k=a.reduce(f.menuItems,function(b,c,d){return c.submenu?a.each(c.submenu,function(a,e){a.click="menuItemSelected("+d+","+e+")",b.push(c.text+" "+a.text)}):(c.click="menuItemSelected("+d+")",b.push(c.text)),b},[]);f.menuItemSelected=function(a,b){var c=f.menuItems[a],d={$item:c};c.submenu&&void 0!==b&&(d.$subItem=c.submenu[b]),f.dropdownTypeaheadOnSelect(d)},i.attr("data-provide","typeahead"),i.typeahead({source:k,minLength:1,items:10,updater:function(b){var c={};return a.each(f.menuItems,function(d){a.each(d.submenu,function(a){b===d.text+" "+a.text&&(c.$subItem=a,c.$item=d)})}),c.$item&&f.$apply(function(){f.dropdownTypeaheadOnSelect(c)}),i.trigger("blur"),""}}),j.click(function(){j.hide(),i.show(),i.focus()}),i.keyup(function(){g.toggleClass("open",""===i.val())}),i.blur(function(){i.hide(),i.val(""),j.show(),j.focus(),setTimeout(function(){g.removeClass("open")},200)}),c(g.contents())(f)}}}])});
/*! grafana - v3.0.0-pre1 - 2016-02-22
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

define([],function(){"use strict";return{get:function(a){return window.localStorage[a]},set:function(a,b){window.localStorage[a]=b},getBool:function(a,b){return void 0===b||this.exists(a)?"true"===window.localStorage[a]:b},exists:function(a){return void 0!==window.localStorage[a]},"delete":function(a){window.localStorage.removeItem(a)}}});
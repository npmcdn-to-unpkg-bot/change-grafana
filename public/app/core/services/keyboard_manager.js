/*! grafana - v3.0.0-pre1 - 2016-02-22
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","lodash","../core_module"],function(a,b,c){"use strict";c["default"].factory("keyboardManager",["$window","$timeout",function(c,d){var e={},f={type:"keydown",propagate:!1,inputDisabled:!1,target:c.document,keyCode:!1};return e.keyboardEvent={},e.bind=function(b,g,h){var i,j,k,l;h=a.extend({},f,h),b=b.toLowerCase(),j=h.target,"string"==typeof h.target&&(j=document.getElementById(h.target)),i=function(a){if(a=a||c.event,h.inputDisabled){var e;if(a.target?e=a.target:a.srcElement&&(e=a.srcElement),3===e.nodeType&&(e=e.parentNode),"INPUT"===e.tagName||"TEXTAREA"===e.tagName)return}a.keyCode?k=a.keyCode:a.which&&(k=a.which);var f=String.fromCharCode(k).toLowerCase();188===k&&(f=","),190===k&&(f=".");for(var i=b.split("+"),j=0,m={"`":"~",1:"!",2:"@",3:"#",4:"$",5:"%",6:"^",7:"&",8:"*",9:"(",0:")","-":"_","=":"+",";":":","'":'"',",":"<",".":">","/":"?","»":"?","«":"?","¿":"?","\\":"|"},n={esc:27,escape:27,tab:9,space:32,"return":13,enter:13,backspace:8,scrolllock:145,scroll_lock:145,scroll:145,capslock:20,caps_lock:20,caps:20,numlock:144,num_lock:144,num:144,pause:19,"break":19,insert:45,home:36,"delete":46,end:35,pageup:33,page_up:33,pu:33,pagedown:34,page_down:34,pd:34,left:37,up:38,right:39,down:40,f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123},o={shift:{wanted:!1,pressed:a.shiftKey?!0:!1},ctrl:{wanted:!1,pressed:a.ctrlKey?!0:!1},alt:{wanted:!1,pressed:a.altKey?!0:!1},meta:{wanted:!1,pressed:a.metaKey?!0:!1}},p=0,q=i.length;l=i[p],q>p;p++){switch(l){case"ctrl":case"control":j++,o.ctrl.wanted=!0;break;case"shift":case"alt":case"meta":j++,o[l].wanted=!0}l.length>1?n[l]===k&&j++:h.keyCode?h.keyCode===k&&j++:f===l?j++:m[f]&&a.shiftKey&&(f=m[f],f===l&&j++)}return j!==i.length||o.ctrl.pressed!==o.ctrl.wanted||o.shift.pressed!==o.shift.wanted||o.alt.pressed!==o.alt.wanted||o.meta.pressed!==o.meta.wanted||(d(function(){g(a)},1),h.propagate)?void 0:(a.cancelBubble=!0,a.returnValue=!1,a.stopPropagation&&(a.stopPropagation(),a.preventDefault()),!1)},e.keyboardEvent[b]={callback:i,target:j,event:h.type},j.addEventListener?j.addEventListener(h.type,i,!1):j.attachEvent?j.attachEvent("on"+h.type,i):j["on"+h.type]=i},e.unbindAll=function(){b.each(e.keyboardEvent,function(a,b){e.unbind(b)})},e.unbind=function(a){a=a.toLowerCase();var b=e.keyboardEvent[a];if(delete e.keyboardEvent[a],b){var c=b.event,d=b.target,f=b.callback;d.detachEvent?d.detachEvent("on"+c,f):d.removeEventListener?d.removeEventListener(c,f,!1):d["on"+c]=!1}},e}])});
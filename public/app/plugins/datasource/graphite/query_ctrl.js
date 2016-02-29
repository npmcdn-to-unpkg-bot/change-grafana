/*! grafana - v3.0.0-pre1 - 2016-02-22
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

System.register(["./add_graphite_func","./func_editor","lodash","./gfunc","./parser","app/plugins/sdk"],function(a){var b,c,d,e,f,g=this&&this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)};return{setters:[function(a){},function(a){},function(a){b=a},function(a){c=a},function(a){d=a},function(a){e=a}],execute:function(){f=function(a){function e(b,c,d,e){a.call(this,b,c),this.uiSegmentSrv=d,this.templateSrv=e,this.target&&(this.target.target=this.target.target||"",this.parseTarget())}return g(e,a),e.$inject=["$scope","$injector","uiSegmentSrv","templateSrv"],e.prototype.toggleEditorMode=function(){this.target.textEditor=!this.target.textEditor,this.parseTarget()},e.prototype.parseTarget=function(){if(this.functions=[],this.segments=[],this.error=null,!this.target.textEditor){var a=new d.Parser(this.target.target),b=a.getAst();if(null===b)return void this.checkOtherSegments(0);if("error"===b.type)return this.error=b.message+" at position: "+b.pos,void(this.target.textEditor=!0);try{this.parseTargeRecursive(b,null,0)}catch(c){console.log("error parsing target:",c.message),this.error=c.message,this.target.textEditor=!0}this.checkOtherSegments(this.segments.length-1)}},e.prototype.addFunctionParameter=function(a,b,c,d){d&&(c=Math.max(c-1,0)),a.params[c]=b},e.prototype.parseTargeRecursive=function(a,d,e){var f=this;if(null===a)return null;switch(a.type){case"function":var g=c["default"].createFuncInstance(a.name,{withDefaultParams:!1});b["default"].each(a.params,function(a,b){f.parseTargeRecursive(a,g,b)}),g.updateText(),this.functions.push(g);break;case"series-ref":this.addFunctionParameter(d,a.value,e,this.segments.length>0);break;case"bool":case"string":case"number":if(e-1>=d.def.params.length)throw{message:"invalid number of parameters to method "+d.def.name};this.addFunctionParameter(d,a.value,e,!0);break;case"metric":if(this.segments.length>0){if(1!==a.segments.length)throw{message:"Multiple metric params not supported, use text editor."};this.addFunctionParameter(d,a.segments[0].value,e,!0);break}this.segments=b["default"].map(a.segments,function(a){return f.uiSegmentSrv.newSegment(a)})}},e.prototype.getSegmentPathUpTo=function(a){var c=this.segments.slice(0,a);return b["default"].reduce(c,function(a,b){return a?a+"."+b.value:b.value},"")},e.prototype.checkOtherSegments=function(a){var b=this;if(0===a)return void this.segments.push(this.uiSegmentSrv.newSelectMetric());var c=this.getSegmentPathUpTo(a+1);return this.datasource.metricFindQuery(c).then(function(d){if(0===d.length)""!==c&&(b.segments=b.segments.splice(0,a),b.segments.push(b.uiSegmentSrv.newSelectMetric()));else if(d[0].expandable){if(b.segments.length!==a)return b.checkOtherSegments(a+1);b.segments.push(b.uiSegmentSrv.newSelectMetric())}})["catch"](function(a){b.error=a.message||"Failed to issue metric query"})},e.prototype.setSegmentFocus=function(a){b["default"].each(this.segments,function(b,c){b.focus=a===c})},e.prototype.wrapFunction=function(a,b){return b.render(a)},e.prototype.getAltSegments=function(a){var c=this,d=0===a?"*":this.getSegmentPathUpTo(a)+".*";return this.datasource.metricFindQuery(d).then(function(a){var d=b["default"].map(a,function(a){return c.uiSegmentSrv.newSegment({value:a.text,expandable:a.expandable})});return 0===d.length?d:(b["default"].each(c.templateSrv.variables,function(a){d.unshift(c.uiSegmentSrv.newSegment({type:"template",value:"$"+a.name,expandable:!0}))}),d.unshift(c.uiSegmentSrv.newSegment("*")),d)})["catch"](function(a){return c.error=a.message||"Failed to issue metric query",[]})},e.prototype.segmentValueChanged=function(a,b){var c=this;return this.error=null,this.functions.length>0&&this.functions[0].def.fake&&(this.functions=[]),a.expandable?this.checkOtherSegments(b+1).then(function(){c.setSegmentFocus(b+1),c.targetChanged()}):(this.segments=this.segments.splice(0,b+1),this.setSegmentFocus(b+1),void this.targetChanged())},e.prototype.targetTextChanged=function(){this.parseTarget(),this.panelCtrl.refresh()},e.prototype.targetChanged=function(){if(!this.error){var a=this.target.target,c=this.getSegmentPathUpTo(this.segments.length);this.target.target=b["default"].reduce(this.functions,this.wrapFunction,c),this.target.target!==a&&"select metric"!==this.segments[this.segments.length-1].value&&this.panelCtrl.refresh()}},e.prototype.removeFunction=function(a){this.functions=b["default"].without(this.functions,a),this.targetChanged()},e.prototype.addFunction=function(a){var b=c["default"].createFuncInstance(a,{withDefaultParams:!0});b.added=!0,this.functions.push(b),this.moveAliasFuncLast(),this.smartlyHandleNewAliasByNode(b),1===this.segments.length&&this.segments[0].fake&&(this.segments=[]),!b.params.length&&b.added&&this.targetChanged()},e.prototype.moveAliasFuncLast=function(){var a=b["default"].find(this.functions,function(a){return"alias"===a.def.name||"aliasByNode"===a.def.name||"aliasByMetric"===a.def.name});a&&(this.functions=b["default"].without(this.functions,a),this.functions.push(a))},e.prototype.smartlyHandleNewAliasByNode=function(a){if("aliasByNode"===a.def.name)for(var b=0;b<this.segments.length;b++)if(this.segments[b].value.indexOf("*")>=0)return a.params[0]=b,a.added=!1,void this.targetChanged()},e.templateUrl="partials/query.editor.html",e}(e.QueryCtrl),a("GraphiteQueryCtrl",f)}}});
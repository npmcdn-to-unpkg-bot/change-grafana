/*! grafana - v3.0.0-pre1 - 2016-02-22
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","jquery","lodash","moment"],function(a,b,c,d){"use strict";var e=a.module("grafana.services");e.factory("dashboardSrv",function(){function b(a,b){a||(a={}),!a.id&&a.version&&(a.schemaVersion=a.version),this.id=a.id||null,this.title=a.title||"No Title",this.originalTitle=this.title,this.tags=a.tags||[],this.style=a.style||"dark",this.timezone=a.timezone||"browser",this.editable=a.editable!==!1,this.hideControls=a.hideControls||!1,this.sharedCrosshair=a.sharedCrosshair||!1,this.rows=a.rows||[],this.time=a.time||{from:"now-6h",to:"now"},this.timepicker=a.timepicker||{},this.templating=this._ensureListExist(a.templating),this.annotations=this._ensureListExist(a.annotations),this.refresh=a.refresh,this.snapshot=a.snapshot,this.schemaVersion=a.schemaVersion||0,this.version=a.version||0,this.links=a.links||[],this._updateSchema(a),this._initMeta(b)}var e=b.prototype;return e._initMeta=function(a){a=a||{},a.canShare=a.canShare!==!1,a.canSave=a.canSave!==!1,a.canStar=a.canStar!==!1,a.canEdit=a.canEdit!==!1,this.editable||(a.canEdit=!1,a.canDelete=!1,a.canSave=!1,this.hideControls=!0),this.meta=a},e.getSaveModelClone=function(){var b=a.copy(this);return delete b.meta,b},e._ensureListExist=function(a){return a||(a={}),a.list||(a.list=[]),a},e.getNextPanelId=function(){var a,b,c,d,e=0;for(a=0;a<this.rows.length;a++)for(c=this.rows[a],b=0;b<c.panels.length;b++)d=c.panels[b],d.id>e&&(e=d.id);return e+1},e.forEachPanel=function(a){var b,c,d;for(b=0;b<this.rows.length;b++)for(d=this.rows[b],c=0;c<d.panels.length;c++)a(d.panels[c],c,d,b)},e.getPanelById=function(a){for(var b=0;b<this.rows.length;b++)for(var c=this.rows[b],d=0;d<c.panels.length;d++){var e=c.panels[d];if(e.id===a)return e}return null},e.rowSpan=function(a){return c.reduce(a.panels,function(a,b){return a+b.span},0)},e.addPanel=function(a,b){var c=this.rowSpan(b),d=b.panels.length,e=12-c-a.span;a.id=this.getNextPanelId(),0>=e&&(1===d?(b.panels[0].span=6,a.span=6):2===d&&(b.panels[0].span=4,b.panels[1].span=4,a.span=4)),b.panels.push(a)},e.isSubmenuFeaturesEnabled=function(){return this.templating.list.length>0||this.annotations.list.length>0||this.links.length>0},e.getPanelInfoById=function(a){var b={};return c.each(this.rows,function(d){c.each(d.panels,function(c,e){c.id===a&&(b.panel=c,b.row=d,b.index=e)})}),b.panel?b:null},e.duplicatePanel=function(b,d){var e=c.indexOf(this.rows,d),f=a.copy(b);f.id=this.getNextPanelId(),delete f.repeat,delete f.repeatIteration,delete f.repeatPanelId,delete f.scopedVars;var g=this.rows[e];return g.panels.push(f),f},e.formatDate=function(a,b){return a=d.isMoment(a)?a:d(a),b=b||"YYYY-MM-DD HH:mm:ss","browser"===this.timezone?d(a).format(b):d.utc(a).format(b)},e.getRelativeTime=function(a){return a=d.isMoment(a)?a:d(a),"browser"===this.timezone?d(a).fromNow():d.utc(a).fromNow()},e.getNextQueryLetter=function(a){var b="ABCDEFGHIJKLMNOPQRSTUVWXYZ";return c.find(b,function(b){return c.every(a.targets,function(a){return a.refId!==b})})},e._updateSchema=function(a){var b,d,e,f=this.schemaVersion,g=[];if(this.schemaVersion=10,f!==this.schemaVersion){if(2>f&&(a.services&&(a.services.filter&&(this.time=a.services.filter.time,this.templating.list=a.services.filter.list||[]),delete this.services),g.push(function(a){"graphite"===a.type&&(a.type="graph"),"graph"===a.type&&(c.isBoolean(a.legend)&&(a.legend={show:a.legend}),a.grid&&(a.grid.min&&(a.grid.leftMin=a.grid.min,delete a.grid.min),a.grid.max&&(a.grid.leftMax=a.grid.max,delete a.grid.max)),a.y_format&&(a.y_formats[0]=a.y_format,delete a.y_format),a.y2_format&&(a.y_formats[1]=a.y2_format,delete a.y2_format))})),3>f){var h=this.getNextPanelId();g.push(function(a){a.id||(a.id=h,h+=1)})}if(4>f&&g.push(function(a){"graph"===a.type&&(c.each(a.aliasYAxis,function(b,c){a.seriesOverrides=[{alias:c,yaxis:b}]}),delete a.aliasYAxis)}),6>f){var i=c.findWhere(a.pulldowns,{type:"annotations"});for(i&&(this.annotations={list:i.annotations||[]}),b=0;b<this.templating.list.length;b++){var j=this.templating.list[b];void 0===j.datasource&&(j.datasource=null),"filter"===j.type&&(j.type="query"),void 0===j.type&&(j.type="query"),void 0===j.allFormat&&(j.allFormat="glob")}}if(7>f&&(a.nav&&a.nav.length&&(this.timepicker=a.nav[0],delete this.nav),g.push(function(a){c.each(a.targets,function(b){b.refId||(b.refId=this.getNextQueryLetter(a))},this)})),8>f&&g.push(function(a){c.each(a.targets,function(a){a.fields&&a.tags&&a.groupBy&&(a.rawQuery?(delete a.fields,delete a.fill):(a.select=c.map(a.fields,function(a){var b=[];return b.push({type:"field",params:[a.name]}),b.push({type:a.func,params:[]}),a.mathExpr&&b.push({type:"math",params:[a.mathExpr]}),a.asExpr&&b.push({type:"alias",params:[a.asExpr]}),b}),delete a.fields,c.each(a.groupBy,function(a){"time"===a.type&&a.interval&&(a.params=[a.interval],delete a.interval),"tag"===a.type&&a.key&&(a.params=[a.key],delete a.key)}),a.fill&&(a.groupBy.push({type:"fill",params:[a.fill]}),delete a.fill)))})}),9>f&&g.push(function(a){if(("singlestat"===a.type||""===a.thresholds)&&a.thresholds){var b=a.thresholds.split(",");b.length>=3&&(b.shift(),a.thresholds=b.join(","))}}),10>f&&g.push(function(a){"table"===a.type&&c.each(a.styles,function(a){if(a.thresholds&&a.thresholds.length>=3){var b=a.thresholds;b.shift(),a.thresholds=b}})}),0!==g.length)for(b=0;b<this.rows.length;b++){var k=this.rows[b];for(d=0;d<k.panels.length;d++)for(e=0;e<g.length;e++)g[e].call(this,k.panels[d])}}},{create:function(a,c){return new b(a,c)},setCurrent:function(a){this.currentDashboard=a},getCurrent:function(){return this.currentDashboard}}})});
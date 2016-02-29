/*! grafana - v3.0.0-pre1 - 2016-02-22
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","jquery","moment","lodash","app/core/utils/kbn","./graph_tooltip","jquery.flot","jquery.flot.events","jquery.flot.selection","jquery.flot.time","jquery.flot.stack","jquery.flot.stackpercent","jquery.flot.fillbelow","jquery.flot.crosshair"],function(a,b,c,d,e,f){"use strict";var g=a.module("grafana.directives");g.directive("grafanaGraph",["$rootScope","timeSrv",function(a,g){return{restrict:"A",template:"<div> </div>",link:function(a,h){function i(a){if(!E.legend.show||E.legend.rightSide)return 0;if(E.legend.alignAsTable){var b=30+25*y.length;return Math.min(b,Math.floor(a/2))}return 26}function j(){try{return B=C.height||E.height||C.row.height,d.isString(B)&&(B=parseInt(B.replace("px",""),10)),B-=5,B-=E.title?24:9,B-=i(B),h.css("height",B+"px"),!0}catch(a){return!1}}function k(){return y?C.otherPanelInFullscreenMode()?!0:j()?d.isString(y)?(x(y),!0):0===h.width()?!0:void 0:!0:!0}function l(c){for(var f=c.getYAxes(),g=0;g<y.length;g++){var i=y[g],j=f[i.yaxis-1],k=e.valueFormats[E.y_formats[i.yaxis-1]];if(d.isNumber(E.decimals))i.updateLegendValues(k,E.decimals,null);else{var l=(j.tickDecimals||-1)+1;i.updateLegendValues(k,l,j.scaledDecimals+2)}G.$$phase||a.$digest()}if(E.leftYAxisLabel){var m=b("<div class='axisLabel left-yaxis-label'></div>").text(E.leftYAxisLabel).appendTo(h);m.css("margin-top",m.width()/2)}if(E.rightYAxisLabel){var n=b("<div class='axisLabel right-yaxis-label'></div>").text(E.rightYAxisLabel).appendTo(h);n.css("margin-top",n.width()/2)}}function m(a,b){E.leftYAxisLabel&&(b.left=20),E.rightYAxisLabel&&(b.right=20)}function n(){function a(a){try{b.plot(h,A,e)}catch(c){console.log("flotcharts error",c)}a&&C.renderingCompleted()}if(!k()){for(var c=E.stack?!0:null,e={hooks:{draw:[l],processOffset:[m]},legend:{show:!1},series:{stackpercent:E.stack?E.percentage:!1,stack:E.percentage?null:c,lines:{show:E.lines,zero:!1,fill:o(E.fill),lineWidth:E.linewidth,steps:E.steppedLine},bars:{show:E.bars,fill:1,barWidth:1,zero:!1,lineWidth:0},points:{show:E.points,fill:1,fillColor:!1,radius:E.points?E.pointradius:2},shadowSize:1},yaxes:[],xaxis:{},grid:{minBorderMargin:0,markings:[],backgroundColor:null,borderWidth:0,hoverable:!0,color:"#c8c8c8",margin:{left:0,right:0}},selection:{mode:"x",color:"#666"},crosshair:{mode:E.tooltip.shared||D.sharedCrosshair?"x":null}},f=0;f<y.length;f++){var g=y[f];g.applySeriesOverrides(E.seriesOverrides),g.data=g.getFlotPairs(g.nullPointMode||E.nullPointMode,E.y_formats),C.hiddenSeries[g.alias]&&(g.data=[],g.stack=!1)}y.length&&y[0].stats.timeStep&&(e.series.bars.barWidth=y[0].stats.timeStep/1.5),q(e),r(e,E),s(e),t(y,e),A=d.sortBy(y,function(a){return a.zindex}),p(E)?(a(!1),setTimeout(function(){a(!0)},50),F=E.legend.rightSide):a(!0)}}function o(a){return 0===a?.001:a/10}function p(a){return a.legend.rightSide?!0:null!==F&&a.legend.rightSide!==F?!0:void 0}function q(a){var b=h.width()/100,c=d.isUndefined(C.range.from)?null:C.range.from.valueOf(),e=d.isUndefined(C.range.to)?null:C.range.to.valueOf();a.xaxis={timezone:D.timezone,show:E["x-axis"],mode:"time",min:c,max:e,label:"Datetime",ticks:b,timeformat:w(b,c,e)}}function r(a,b){if(d.isNumber(b.grid.threshold1)){var c=b.grid.thresholdLine?b.grid.threshold1:b.grid.threshold2||null;if(a.grid.markings.push({yaxis:{from:b.grid.threshold1,to:c},color:b.grid.threshold1Color}),d.isNumber(b.grid.threshold2)){var e;e=b.grid.thresholdLine?b.grid.threshold2:b.grid.threshold1>b.grid.threshold2?-(1/0):+(1/0),a.grid.markings.push({yaxis:{from:b.grid.threshold2,to:e},color:b.grid.threshold2Color})}}}function s(a){if(z&&0!==z.length){var b={};d.each(z,function(c){b[c.annotation.name]||(b[c.annotation.name]={level:d.keys(b).length+1,icon:{icon:"fa fa-chevron-down",size:c.annotation.iconSize,color:c.annotation.iconColor}}),c.annotation.showLine&&a.grid.markings.push({color:c.annotation.lineColor,lineWidth:1,xaxis:{from:c.min,to:c.max}})}),a.events={levels:d.keys(b).length+1,data:z,types:b}}}function t(a,b){var c={position:"left",show:E["y-axis"],min:E.grid.leftMin,index:1,logBase:E.grid.leftLogBase||1,max:E.percentage&&E.stack?100:E.grid.leftMax};if(b.yaxes.push(c),d.findWhere(a,{yaxis:2})){var e=d.clone(c);e.index=2,e.logBase=E.grid.rightLogBase||1,e.position="right",e.min=E.grid.rightMin,e.max=E.percentage&&E.stack?100:E.grid.rightMax,b.yaxes.push(e),u(b.yaxes[1],a),v(b.yaxes[1],E.percentage&&E.stack?"percent":E.y_formats[1])}u(b.yaxes[0],a),v(b.yaxes[0],E.percentage&&E.stack?"percent":E.y_formats[0])}function u(a,b){if(1!==a.logBase){var c,d,e=a.max;if(null===e){for(d=0;d<b.length;d++)c=b[d],c.yaxis===a.index&&e<c.stats.max&&(e=c.stats.max);void 0===e&&(e=Number.MAX_VALUE)}a.min=null!==a.min?a.min:0,a.ticks=[0,1];for(var f=1;;)if(f*=a.logBase,a.ticks.push(f),f>e)break;10===a.logBase?(a.transform=function(a){return Math.log(a+.1)},a.inverseTransform=function(a){return Math.pow(10,a)}):(a.transform=function(b){return Math.log(b+.1)/Math.log(a.logBase)},a.inverseTransform=function(b){return Math.pow(a.logBase,b)})}}function v(a,b){a.tickFormatter=function(a,c){return e.valueFormats[b](a,c.tickDecimals,c.scaledDecimals)}}function w(a,b,c){if(b&&c&&a){var d=c-b,e=d/a/1e3,f=864e5,g=31536e6;return 45>=e?"%H:%M:%S":7200>=e||f>=d?"%H:%M":8e4>=e?"%m/%d %H:%M":2419200>=e||g>=d?"%m/%d":"%Y-%m"}return"%H:%M"}function x(a){switch(a+="&width="+h.width(),a+="&height="+h.css("height").replace("px",""),a+="&bgcolor=1f1f1f",a+="&fgcolor=BBBFC2",a+=E.stack?"&areaMode=stacked":"",a+=0!==E.fill?"&areaAlpha="+(E.fill/10).toFixed(1):"",a+=0!==E.linewidth?"&lineWidth="+E.linewidth:"",a+=E.legend.show?"&hideLegend=false":"&hideLegend=true",a+=null!==E.grid.leftMin?"&yMin="+E.grid.leftMin:"",a+=null!==E.grid.leftMax?"&yMax="+E.grid.leftMax:"",a+=null!==E.grid.rightMin?"&yMin="+E.grid.rightMin:"",a+=null!==E.grid.rightMax?"&yMax="+E.grid.rightMax:"",a+=E["x-axis"]?"":"&hideAxes=true",a+=E["y-axis"]?"":"&hideYAxis=true",E.y_formats[0]){case"bytes":a+="&yUnitSystem=binary";break;case"bits":a+="&yUnitSystem=binary";break;case"bps":a+="&yUnitSystem=si";break;case"pps":a+="&yUnitSystem=si";break;case"Bps":a+="&yUnitSystem=si";break;case"short":a+="&yUnitSystem=si";break;case"joule":a+="&yUnitSystem=si";break;case"watt":a+="&yUnitSystem=si";break;case"ev":a+="&yUnitSystem=si";break;case"none":a+="&yUnitSystem=none"}switch(E.nullPointMode){case"connected":a+="&lineMode=connected";break;case"null":break;case"null as zero":a+="&drawNullAsZero=true"}a+=E.steppedLine?"&lineMode=staircase":"",h.html('<img src="'+a+'"></img>')}var y,z,A,B,C=a.ctrl,D=C.dashboard,E=C.panel,F=null,G=a.$root;G.onAppEvent("setCrosshair",function(b,c){if(c.scope!==a&&D.sharedCrosshair){var d=h.data().plot;d&&d.setCrosshair({x:c.pos.x,y:c.pos.y})}},a),G.onAppEvent("clearCrosshair",function(){var a=h.data().plot;a&&a.clearCrosshair()},a),a.$on("render",function(a,b){return(y=b||y)?(z=y.annotations||z,void n()):void C.refresh()}),new f(h,D,a,function(){return A}),h.bind("plotselected",function(b,d){a.$apply(function(){g.setTime({from:c.utc(d.xaxis.from),to:c.utc(d.xaxis.to)})})})}}}])});
/*! grafana - v3.0.0-pre1 - 2016-02-22
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","lodash","jquery","app/core/utils/kbn","app/core/utils/datemath","app/core/utils/rangeutil"],function(a,b,c,d,e,f){"use strict";var g=a.module("grafana.services");g.service("panelHelper",["timeSrv","$rootScope","$q",function(a,g,h){var i=this;this.setTimeQueryStart=function(a){a.timing={},a.timing.queryStart=(new Date).getTime()},this.setTimeQueryEnd=function(a){a.timing.queryEnd=(new Date).getTime()},this.setTimeRenderStart=function(a){a.timing=a.timing||{},a.timing.renderStart=(new Date).getTime()},this.setTimeRenderEnd=function(a){a.timing.renderEnd=(new Date).getTime()},this.broadcastRender=function(a,b,c){this.setTimeRenderStart(a),a.$broadcast("render",b,c),this.setTimeRenderEnd(a),g.profilingEnabled&&g.performance.panels.push({panelId:a.panel.id,query:a.timing.queryEnd-a.timing.queryStart,render:a.timing.renderEnd-a.timing.renderStart})},this.updateTimeRange=function(b){b.range=a.timeRange(),b.rangeRaw=a.timeRange(!1),this.applyPanelTimeOverrides(b),b.panel.maxDataPoints?b.resolution=b.panel.maxDataPoints:b.resolution=Math.ceil(c(window).width()*(b.panel.span/12));var e=b.panel.interval,f=(b.datasource||{}).interval;b.interval=d.calculateInterval(b.range,b.resolution,e||f)},this.applyPanelTimeOverrides=function(a){if(a.panelMeta.timeInfo="",a.panel.timeFrom){var c=f.describeTextRange(a.panel.timeFrom);if(c.invalid)return void(a.panelMeta.timeFromInfo="invalid time override");if(b.isString(a.rangeRaw.from)){var d=e.parse(c.from);a.panelMeta.timeInfo=c.display,a.rangeRaw.from=c.from,a.rangeRaw.to=c.to,a.range.from=d}}if(a.panel.timeShift){var g=f.describeTextRange(a.panel.timeShift);if(g.invalid)return void(a.panelMeta.timeInfo="invalid timeshift");var h="-"+a.panel.timeShift;a.panelMeta.timeInfo+=" timeshift "+h,a.range.from=e.parseDateMath(h,a.range.from,!1),a.range.to=e.parseDateMath(h,a.range.to,!0),a.rangeRaw=a.range}a.panel.hideTimeOverride&&(a.panelMeta.timeInfo="")},this.issueMetricQuery=function(a,b){if(!a.panel.targets||0===a.panel.targets.length)return h.when([]);var c={range:a.range,rangeRaw:a.rangeRaw,interval:a.interval,targets:a.panel.targets,format:"png"===a.panel.renderer?"png":"json",maxDataPoints:a.resolution,scopedVars:a.panel.scopedVars,cacheTimeout:a.panel.cacheTimeout};return this.setTimeQueryStart(a),b.query(c).then(function(b){return i.setTimeQueryEnd(a),a.dashboard.snapshot&&(a.panel.snapshotData=b),b})}}])});
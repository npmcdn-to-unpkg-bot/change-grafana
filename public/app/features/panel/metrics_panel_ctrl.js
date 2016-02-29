/*! grafana - v3.0.0-pre1 - 2016-02-22
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

System.register(["app/core/config","jquery","lodash","app/core/utils/kbn","./panel_ctrl","app/core/utils/rangeutil","app/core/utils/datemath"],function(a){var b,c,d,e,f,g,h,i,j=this&&this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)};return{setters:[function(a){b=a},function(a){c=a},function(a){d=a},function(a){e=a},function(a){f=a},function(a){g=a},function(a){h=a}],execute:function(){i=function(a){function f(b,c){a.call(this,b,c),this.editorTabIndex=1,this.$q=c.get("$q"),this.datasourceSrv=c.get("datasourceSrv"),this.timeSrv=c.get("timeSrv"),this.panel.targets||(this.panel.targets=[{}])}return j(f,a),f.prototype.initEditMode=function(){a.prototype.initEditMode.call(this),this.addEditorTab("Metrics","public/app/partials/metrics.html"),this.addEditorTab("Time range","public/app/features/panel/partials/panelTime.html"),this.datasources=this.datasourceSrv.getMetricSources()},f.prototype.refreshData=function(a){return this.$q.when(a)},f.prototype.loadSnapshot=function(a){return a},f.prototype.refresh=function(){var a=this;if(!this.otherPanelInFullscreenMode()){if(this.panel.snapshotData)return void(this.loadSnapshot&&(this.updateTimeRange(),this.loadSnapshot(this.panel.snapshotData)));delete this.error,this.loading=!0,this.datasourceSrv.get(this.panel.datasource).then(function(b){return a.datasource=b,a.refreshData(a.datasource)}).then(function(){a.loading=!1})["catch"](function(b){console.log("Panel data error:",b),a.loading=!1,a.error=b.message||"Timeseries data request error",a.inspector={error:b}})}},f.prototype.setTimeQueryStart=function(){this.timing={},this.timing.queryStart=(new Date).getTime()},f.prototype.setTimeQueryEnd=function(){this.timing.queryEnd=(new Date).getTime()},f.prototype.updateTimeRange=function(){this.range=this.timeSrv.timeRange(),this.rangeRaw=this.timeSrv.timeRange(!1),this.applyPanelTimeOverrides(),this.panel.maxDataPoints?this.resolution=this.panel.maxDataPoints:this.resolution=Math.ceil(c["default"](window).width()*(this.panel.span/12));var a=this.panel.interval,b=(this.datasource||{}).interval;this.interval=e["default"].calculateInterval(this.range,this.resolution,a||b)},f.prototype.applyPanelTimeOverrides=function(){if(this.timeInfo="",this.panel.timeFrom){var a=g.describeTextRange(this.panel.timeFrom);if(a.invalid)return void(this.timeInfo="invalid time override");if(d["default"].isString(this.rangeRaw.from)){var b=h.parse(a.from);this.timeInfo=a.display,this.rangeRaw.from=a.from,this.rangeRaw.to=a.to,this.range.from=b,this.range.to=h.parse(a.to)}}if(this.panel.timeShift){var c=g.describeTextRange(this.panel.timeShift);if(c.invalid)return void(this.timeInfo="invalid timeshift");var e="-"+this.panel.timeShift;this.timeInfo+=" timeshift "+e,this.range.from=h.parseDateMath(e,this.range.from,!1),this.range.to=h.parseDateMath(e,this.range.to,!0),this.rangeRaw=this.range}this.panel.hideTimeOverride&&(this.timeInfo="")},f.prototype.issueQueries=function(a){var b=this;if(this.updateTimeRange(),!this.panel.targets||0===this.panel.targets.length)return this.$q.when([]);var c={range:this.range,rangeRaw:this.rangeRaw,interval:this.interval,targets:this.panel.targets,format:"png"===this.panel.renderer?"png":"json",maxDataPoints:this.resolution,scopedVars:this.panel.scopedVars,cacheTimeout:this.panel.cacheTimeout};this.setTimeQueryStart();try{return a.query(c).then(function(a){return b.setTimeQueryEnd(),b.dashboard.snapshot&&(b.panel.snapshotData=a),a})}catch(d){return this.$q.reject(d)}},f.prototype.setDatasource=function(a){var c=this;a.meta.mixed?d["default"].each(this.panel.targets,function(a){a.datasource=c.panel.datasource,null===a.datasource&&(a.datasource=b["default"].defaultDatasource)}):this.datasource&&this.datasource.meta.mixed&&d["default"].each(this.panel.targets,function(a){delete a.datasource}),this.panel.datasource=a.value,this.datasource=null,this.refresh()},f.prototype.addDataQuery=function(a){var b={datasource:a?a.name:void 0};this.panel.targets.push(b)},f}(f.PanelCtrl),a("MetricsPanelCtrl",i)}}});
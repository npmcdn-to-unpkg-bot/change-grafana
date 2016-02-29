/*! grafana - v3.0.0-pre1 - 2016-02-22
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","lodash","./query_def"],function(a,b,c){"use strict";var d=a.module("grafana.directives");d.directive("elasticBucketAgg",function(){return{templateUrl:"public/app/plugins/datasource/elasticsearch/partials/bucket_agg.html",controller:"ElasticBucketAggCtrl",restrict:"E",scope:{target:"=",index:"=",onChange:"&",getFields:"&"}}}),d.controller("ElasticBucketAggCtrl",["$scope","uiSegmentSrv","$q","$rootScope",function(a,d,e,f){var g=a.target.bucketAggs;a.orderByOptions=[],a.bucketAggTypes=c.bucketAggTypes,a.orderOptions=c.orderOptions,a.sizeOptions=c.sizeOptions,f.onAppEvent("elastic-query-updated",function(){a.validateModel(),a.updateOrderByOptions()},a),a.init=function(){a.agg=g[a.index],a.validateModel()},a.onChangeInternal=function(){a.onChange()},a.onTypeChanged=function(){switch(a.agg.settings={},a.showOptions=!1,a.agg.type){case"date_histogram":case"terms":delete a.agg.query,a.agg.field="select field";break;case"filters":delete a.agg.field,a.agg.query="*"}a.validateModel(),a.onChange()},a.validateModel=function(){a.index=b.indexOf(g,a.agg),a.isFirst=0===a.index,a.isLast=a.index===g.length-1;var d="",e=a.agg.settings||{};switch(a.agg.type){case"terms":e.order=e.order||"asc",e.size=e.size||"0",e.orderBy=e.orderBy||"_term","0"!==e.size&&(d=c.describeOrder(e.order)+" "+e.size+", "),d+="Order by: "+c.describeOrderBy(e.orderBy,a.target),"0"===e.size&&(d+=" ("+e.order+")");break;case"filters":e.filters=e.filters||[{query:"*"}],d=b.reduce(e.filters,function(a,b,c){return a+="Q"+(c+1)+"  = "+b.query+" "},""),d.length>50&&(d=d.substr(0,50)+"..."),d="Filter Queries ("+e.filters.length+")";break;case"date_histogram":e.interval=e.interval||"auto",e.min_doc_count=e.min_doc_count||0,a.agg.field=a.target.timeField,d="Interval: "+e.interval,e.min_doc_count>0&&(d+=", Min Doc Count: "+e.min_doc_count),(void 0===e.trimEdges||e.trimEdges<0)&&(e.trimEdges=0),e.trimEdges&&e.trimEdges>0&&(d+=", Trim edges: "+e.trimEdges)}return a.settingsLinkText=d,a.agg.settings=e,!0},a.addFiltersQuery=function(){a.agg.settings.filters.push({query:"*"})},a.removeFiltersQuery=function(c){a.agg.settings.filters=b.without(a.agg.settings.filters,c)},a.toggleOptions=function(){a.showOptions=!a.showOptions,a.updateOrderByOptions()},a.updateOrderByOptions=function(){a.orderByOptions=c.getOrderByOptions(a.target)},a.getFieldsInternal=function(){return"date_histogram"===a.agg.type?a.getFields({$fieldType:"date"}):a.getFields()},a.getIntervalOptions=function(){return e.when(d.transformToSegments(!0,"interval")(c.intervalOptions))},a.addBucketAgg=function(){var c=g[g.length-1],d=g.length-1;c&&"date_histogram"===c.type;var e=b.reduce(a.target.bucketAggs.concat(a.target.metrics),function(a,b){return parseInt(b.id)>a?parseInt(b.id):a},0);g.splice(d,0,{type:"terms",field:"select field",id:(e+1).toString(),fake:!0}),a.onChange()},a.removeBucketAgg=function(){g.splice(a.index,1),a.onChange()},a.init()}])});
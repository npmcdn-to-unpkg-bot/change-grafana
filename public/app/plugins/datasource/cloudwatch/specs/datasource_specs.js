/*! grafana - v3.0.0-pre1 - 2016-02-22
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

System.register(["../datasource","test/lib/common","moment","test/specs/helpers"],function(a){var b,c,d,e;return{setters:[function(a){e=a},function(a){b=a},function(a){c=a},function(a){d=a}],execute:function(){b.describe("CloudWatchDatasource",function(){function a(a,c){b.describe("metricFindQuery "+a,function(){var d={};d.setup=function(c){b.beforeEach(function(){c(),f.backendSrv.datasourceRequest=function(a){return d.request=a,f.$q.when({data:d.requestResponse})},f.ds.metricFindQuery(a).then(function(a){d.result=a}),f.$rootScope.$apply()})},c(d)})}var f=new d["default"].ServiceTestContext,g={jsonData:{defaultRegion:"us-east-1",access:"proxy"}};b.beforeEach(b.angularMocks.module("grafana.core")),b.beforeEach(b.angularMocks.module("grafana.services")),b.beforeEach(b.angularMocks.module("grafana.controllers")),b.beforeEach(f.providePhase(["templateSrv","backendSrv"])),b.beforeEach(b.angularMocks.inject(function(a,b,c,d){f.$q=a,f.$httpBackend=c,f.$rootScope=b,f.ds=d.instantiate(e.CloudWatchDatasource,{instanceSettings:g})})),b.describe("When performing CloudWatch query",function(){var a,c={range:{from:"now-1h",to:"now"},targets:[{region:"us-east-1",namespace:"AWS/EC2",metricName:"CPUUtilization",dimensions:{InstanceId:"i-12345678"},statistics:["Average"],period:300}]},d={Datapoints:[{Average:1,Timestamp:"Wed Dec 31 1969 16:00:00 GMT-0800 (PST)"},{Average:2,Timestamp:"Wed Dec 31 1969 16:05:00 GMT-0800 (PST)"},{Average:5,Timestamp:"Wed Dec 31 1969 16:15:00 GMT-0800 (PST)"}],Label:"CPUUtilization"};b.beforeEach(function(){f.backendSrv.datasourceRequest=function(b){return a=b,f.$q.when({data:d})}}),b.it("should generate the correct query",function(d){f.ds.query(c).then(function(){var e=a.data.parameters;b.expect(e.namespace).to.be(c.targets[0].namespace),b.expect(e.metricName).to.be(c.targets[0].metricName),b.expect(e.dimensions[0].Name).to.be(Object.keys(c.targets[0].dimensions)[0]),b.expect(e.dimensions[0].Value).to.be(c.targets[0].dimensions[Object.keys(c.targets[0].dimensions)[0]]),b.expect(e.statistics).to.eql(c.targets[0].statistics),b.expect(e.period).to.be(c.targets[0].period),d()}),f.$rootScope.$apply()}),b.it("should return series list",function(a){f.ds.query(c).then(function(c){b.expect(c.data[0].target).to.be("CPUUtilization_Average"),b.expect(c.data[0].datapoints[0][0]).to.be(d.Datapoints[0].Average),a()}),f.$rootScope.$apply()}),b.it("should return null for missing data point",function(a){f.ds.query(c).then(function(c){b.expect(c.data[0].datapoints[2][0]).to.be(null),a()}),f.$rootScope.$apply()})}),a("regions()",function(a){a.setup(function(){a.requestResponse=[{text:"us-east-1"}]}),b.it("should call __GetRegions and return result",function(){b.expect(a.result[0].text).to.contain("us-east-1"),b.expect(a.request.data.action).to.be("__GetRegions")})}),a("namespaces()",function(a){a.setup(function(){a.requestResponse=[{text:"AWS/EC2"}]}),b.it("should call __GetNamespaces and return result",function(){b.expect(a.result[0].text).to.contain("AWS/EC2"),b.expect(a.request.data.action).to.be("__GetNamespaces")})}),a("metrics(AWS/EC2)",function(a){a.setup(function(){a.requestResponse=[{text:"CPUUtilization"}]}),b.it("should call __GetMetrics and return result",function(){b.expect(a.result[0].text).to.be("CPUUtilization"),b.expect(a.request.data.action).to.be("__GetMetrics")})}),a("dimension_keys(AWS/EC2)",function(a){a.setup(function(){a.requestResponse=[{text:"InstanceId"}]}),b.it("should call __GetDimensions and return result",function(){b.expect(a.result[0].text).to.be("InstanceId"),b.expect(a.request.data.action).to.be("__GetDimensions")})}),a("dimension_values(us-east-1,AWS/EC2,CPUUtilization,InstanceId)",function(a){a.setup(function(){a.requestResponse={Metrics:[{Namespace:"AWS/EC2",MetricName:"CPUUtilization",Dimensions:[{Name:"InstanceId",Value:"i-12345678"}]}]}}),b.it("should call __ListMetrics and return result",function(){b.expect(a.result[0].text).to.be("i-12345678"),b.expect(a.request.data.action).to.be("ListMetrics")})}),b.describe("When performing annotationQuery",function(){var a={annotation:{region:"us-east-1",namespace:"AWS/EC2",metricName:"CPUUtilization",dimensions:{InstanceId:"i-12345678"},statistics:["Average"],period:300},range:{from:c["default"](1443438674760),to:c["default"](1443460274760)}},d={MetricAlarms:[{AlarmName:"test_alarm_name"}]},e={AlarmHistoryItems:[{Timestamp:"2015-01-01T00:00:00.000Z",HistoryItemType:"StateUpdate",AlarmName:"test_alarm_name",HistoryData:"{}",HistorySummary:"test_history_summary"}]};b.beforeEach(function(){f.backendSrv.datasourceRequest=function(a){switch(a.data.action){case"DescribeAlarmsForMetric":return f.$q.when({data:d});case"DescribeAlarmHistory":return f.$q.when({data:e})}}}),b.it("should return annotation list",function(c){f.ds.annotationQuery(a).then(function(a){b.expect(a[0].title).to.be("test_alarm_name"),b.expect(a[0].text).to.be("test_history_summary"),c()}),f.$rootScope.$apply()})})})}}});
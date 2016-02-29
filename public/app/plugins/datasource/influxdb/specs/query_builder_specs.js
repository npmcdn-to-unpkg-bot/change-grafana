/*! grafana - v3.0.0-pre1 - 2016-02-22
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

System.register(["test/lib/common","../query_builder"],function(a){var b,c;return{setters:[function(a){b=a},function(a){c=a}],execute:function(){b.describe("InfluxQueryBuilder",function(){b.describe("when building explore queries",function(){b.it("should only have measurement condition in tag keys query given query with measurement",function(){var a=new c["default"]({measurement:"cpu",tags:[]}),d=a.buildExploreQuery("TAG_KEYS");b.expect(d).to.be('SHOW TAG KEYS FROM "cpu"')}),b.it("should handle regex measurement in tag keys query",function(){var a=new c["default"]({measurement:"/.*/",tags:[]}),d=a.buildExploreQuery("TAG_KEYS");b.expect(d).to.be("SHOW TAG KEYS FROM /.*/")}),b.it("should have no conditions in tags keys query given query with no measurement or tag",function(){var a=new c["default"]({measurement:"",tags:[]}),d=a.buildExploreQuery("TAG_KEYS");b.expect(d).to.be("SHOW TAG KEYS")}),b.it("should have where condition in tag keys query with tags",function(){var a=new c["default"]({measurement:"",tags:[{key:"host",value:"se1"}]}),d=a.buildExploreQuery("TAG_KEYS");b.expect(d).to.be("SHOW TAG KEYS WHERE \"host\" = 'se1'")}),b.it("should have no conditions in measurement query for query with no tags",function(){var a=new c["default"]({measurement:"",tags:[]}),d=a.buildExploreQuery("MEASUREMENTS");b.expect(d).to.be("SHOW MEASUREMENTS")}),b.it("should have where condition in measurement query for query with tags",function(){var a=new c["default"]({measurement:"",tags:[{key:"app",value:"email"}]}),d=a.buildExploreQuery("MEASUREMENTS");b.expect(d).to.be("SHOW MEASUREMENTS WHERE \"app\" = 'email'")}),b.it("should have where tag name IN filter in tag values query for query with one tag",function(){var a=new c["default"]({measurement:"",tags:[{key:"app",value:"asdsadsad"}]}),d=a.buildExploreQuery("TAG_VALUES","app");b.expect(d).to.be('SHOW TAG VALUES WITH KEY = "app"')}),b.it("should have measurement tag condition and tag name IN filter in tag values query",function(){var a=new c["default"]({measurement:"cpu",tags:[{key:"app",value:"email"},{key:"host",value:"server1"}]}),d=a.buildExploreQuery("TAG_VALUES","app");b.expect(d).to.be('SHOW TAG VALUES FROM "cpu" WITH KEY = "app" WHERE "host" = \'server1\'')}),b.it("should switch to regex operator in tag condition",function(){var a=new c["default"]({measurement:"cpu",tags:[{key:"host",value:"/server.*/"}]}),d=a.buildExploreQuery("TAG_VALUES","app");b.expect(d).to.be('SHOW TAG VALUES FROM "cpu" WITH KEY = "app" WHERE "host" =~ /server.*/')}),b.it("should build show field query",function(){var a=new c["default"]({measurement:"cpu",tags:[{key:"app",value:"email"}]}),d=a.buildExploreQuery("FIELDS");b.expect(d).to.be('SHOW FIELD KEYS FROM "cpu"')}),b.it("should build show retention policies query",function(){var a=new c["default"]({measurement:"cpu",tags:[]},"site"),d=a.buildExploreQuery("RETENTION POLICIES");b.expect(d).to.be('SHOW RETENTION POLICIES on "site"')})})})}}});
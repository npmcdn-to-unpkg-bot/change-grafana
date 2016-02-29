/*! grafana - v3.0.0-pre1 - 2016-02-22
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

System.register(["test/lib/common","app/core/utils/datemath","moment","lodash"],function(a){var b,c,d,e;return{setters:[function(a){b=a},function(a){c=a},function(a){d=a},function(a){e=a}],execute:function(){b.describe("DateMath",function(){var a,f=["s","m","h","d","w","M","y"],g="2014-01-01T06:06:06.666Z",h=d["default"](g).valueOf(),i="YYYY-MM-DDTHH:mm:ss.SSSZ";b.describe("errors",function(){b.it("should return undefined if passed something falsy",function(){b.expect(c.parse(!1)).to.be(void 0)}),b.it("should return undefined if I pass an operator besides [+-/]",function(){b.expect(c.parse("now&1d")).to.be(void 0)}),b.it("should return undefined if I pass a unit besides"+f.toString(),function(){b.expect(c.parse("now+5f")).to.be(void 0)}),b.it("should return undefined if rounding unit is not 1",function(){b.expect(c.parse("now/2y")).to.be(void 0),b.expect(c.parse("now/0.5y")).to.be(void 0)}),b.it("should not go into an infinite loop when missing a unit",function(){b.expect(c.parse("now-0")).to.be(void 0),b.expect(c.parse("now-00")).to.be(void 0)})}),b.it("now/d should set to start of current day",function(){var a=new Date;a.setHours(0),a.setMinutes(0),a.setSeconds(0),a.setMilliseconds(0);var d=c.parse("now/d",!1).valueOf();b.expect(d).to.be(a.getTime())}),b.describe("subtraction",function(){var j,k;b.beforeEach(function(){a=b.sinon.useFakeTimers(h),j=d["default"](),k=d["default"](g)}),e["default"].each(f,function(a){var d="now-5"+a,e=g+"||-5"+a;b.it("should return 5"+a+" ago",function(){b.expect(c.parse(d).format(i)).to.eql(j.subtract(5,a).format(i))}),b.it("should return 5"+a+" before "+g,function(){b.expect(c.parse(e).format(i)).to.eql(k.subtract(5,a).format(i))})})}),b.describe("rounding",function(){var j,k;b.beforeEach(function(){a=b.sinon.useFakeTimers(h),j=d["default"](),k=d["default"](g)}),e["default"].each(f,function(a){b.it("should round now to the beginning of the "+a,function(){b.expect(c.parse("now/"+a).format(i)).to.eql(j.startOf(a).format(i))}),b.it("should round now to the end of the "+a,function(){b.expect(c.parse("now/"+a,!0).format(i)).to.eql(j.endOf(a).format(i))})})}),b.describe("isValid",function(){b.it("should return false when invalid date text",function(){b.expect(c.isValid("asd")).to.be(!1)}),b.it("should return true when valid date text",function(){b.expect(c.isValid("now-1h")).to.be(!0)})}),b.describe("relative time to date parsing",function(){b.it("should handle negative time",function(){var a=c.parseDateMath("-2d",d["default"]([2014,1,5]));b.expect(a.valueOf()).to.equal(d["default"]([2014,1,3]).valueOf())}),b.it("should handle multiple math expressions",function(){var a=c.parseDateMath("-2d-6h",d["default"]([2014,1,5]));b.expect(a.valueOf()).to.equal(d["default"]([2014,1,2,18]).valueOf())}),b.it("should return false when invalid expression",function(){var a=c.parseDateMath("2",d["default"]([2014,1,5]));b.expect(a).to.equal(void 0)})})})}}});
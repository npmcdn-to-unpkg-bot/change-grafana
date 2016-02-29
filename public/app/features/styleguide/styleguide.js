/*! grafana - v3.0.0-pre1 - 2016-02-22
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

System.register(["app/core/core_module","app/core/config","lodash"],function(a){var b,c,d,e;return{setters:[function(a){b=a},function(a){c=a},function(a){d=a}],execute:function(){e=function(){function a(a,b){this.$http=a,this.colors=[],this.buttonNames=["primary","secondary","inverse","success","warning","danger"],this.buttonSizes=["btn-small","","btn-large"],this.buttonVariants=["-","-outline-"],this.pages=["colors","buttons","forms","dashboard","query-editors"],this.theme=c["default"].bootData.user.lightTheme?"light":"dark",this.page={},b.page?this.page[b.page]=1:this.page.colors=!0,this.page.colors&&this.loadColors()}return a.$inject=["$http","$routeParams"],a.prototype.loadColors=function(){var a=this;this.$http.get("public/sass/styleguide.json").then(function(b){a.colors=d["default"].map(b.data[a.theme],function(a,b){return{name:b,value:a}})})},a.prototype.switchTheme=function(){var a="dark"===this.theme?"light":"dark";window.location.href=window.location.href+"?theme="+a},a}(),b["default"].controller("StyleGuideCtrl",e)}}});
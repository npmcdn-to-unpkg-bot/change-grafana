/*! grafana - v3.0.0-pre1 - 2016-02-22
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

System.register([],function(a){var b;return{setters:[],execute:function(){b=function(){function a(){this.columns=[],this.rows=[],this.type="table"}return a.prototype.sort=function(a){null===a.col||this.columns.length<=a.col||(this.rows.sort(function(b,c){return b=b[a.col],c=c[a.col],c>b?-1:b>c?1:0}),this.columns[a.col].sort=!0,a.desc&&(this.rows.reverse(),this.columns[a.col].desc=!0))},a}(),a("default",b)}}});
/*! grafana - v3.0.0-pre1 - 2016-02-22
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

define([],function(){"use strict";return{create:function(){return{title:"",tags:[],style:"dark",timezone:"browser",editable:!0,failover:!1,panel_hints:!0,rows:[],pulldowns:[{type:"templating"},{type:"annotations"}],nav:[{type:"timepicker"}],time:{from:"now-6h",to:"now"},templating:{list:[]},refresh:"10s"}}}});
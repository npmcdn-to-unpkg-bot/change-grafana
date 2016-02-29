/*! grafana - v3.0.0-pre1 - 2016-02-22
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

define(["jquery"],function(a){"use strict";function b(b,c,d,e){var f=this,g=d.ctrl,h=g.panel,i=a('<div id="tooltip">');this.findHoverIndexFromDataPoints=function(a,b,c){for(var d=b.datapoints.pointsize,e=c*d,f=b.datapoints.points.length,g=e;f>g;g+=d)if(b.datapoints.points[g]>a)return Math.max(g-d,0)/d;return g/d-1},this.findHoverIndexFromData=function(a,b){for(var c=b.data.length,d=0;c>d;d++)if(b.data[d][0]>a)return Math.max(d-1,0);return d-1},this.showTooltip=function(a,b,c,d){var e='<div class="graph-tooltip small"><div class="graph-tooltip-time">'+a+' <span class="tone-down">('+b+")</span></div> ";e+=c+"</div>",i.html(e).place_tt(d.pageX+20,d.pageY)},this.getMultiSeriesPlotHoverInfo=function(a,b){var c,d,e,f,g=[],i=0;for(d=0;d<a.length;d++)if(e=a[d],!e.data.length||h.legend.hideEmpty&&e.allIsNull)g.push({hidden:!0});else if(!e.data.length||h.legend.hideZero&&e.allIsZero)g.push({hidden:!0});else if(f=this.findHoverIndexFromData(b.x,e),g.time=e.data[f][0],e.stack?"individual"===h.tooltip.value_type?c=e.data[f][1]:e.stack?(i+=e.data[f][1],c=i):c=e.data[f][1]:c=e.data[f][1],e.lines.steps||e.stack){var j=this.findHoverIndexFromDataPoints(b.x,e,f);g.push({value:c,hoverIndex:j})}else g.push({value:c,hoverIndex:f});return g},b.mouseleave(function(){if(h.tooltip.shared){var a=b.data().plot;a&&(i.detach(),a.unhighlight())}c.sharedCrosshair&&g.publishAppEvent("clearCrosshair")}),b.bind("plothover",function(a,j,k){var l,m,n,o,p,q,r,s,t=b.data().plot,u=t.getData(),v=e();if(c.sharedCrosshair&&g.publishAppEvent("setCrosshair",{pos:j,scope:d}),0!==v.length)if(h.tooltip.shared){t.unhighlight();var w=f.getMultiSeriesPlotHoverInfo(u,j);for(s="",o=c.getRelativeTime(w.time),n=c.formatDate(w.time),q=0;q<w.length;q++)p=w[q],p.hidden||(r=v[q],m=r.formatValue(p.value),s+='<div class="graph-tooltip-list-item"><div class="graph-tooltip-series-name">',s+='<i class="fa fa-minus" style="color:'+r.color+';"></i> '+r.label+":</div>",s+='<div class="graph-tooltip-value">'+m+"</div></div>",t.highlight(q,p.hoverIndex));f.showTooltip(n,o,s,j)}else k?(r=v[k.seriesIndex],l='<div class="graph-tooltip-list-item"><div class="graph-tooltip-series-name">',l+='<i class="fa fa-minus" style="color:'+k.series.color+';"></i> '+r.label+":</div>",m=h.stack&&"individual"===h.tooltip.value_type?k.datapoint[1]-k.datapoint[2]:k.datapoint[1],m=r.formatValue(m),o=c.getRelativeTime(k.datapoint[0]),n=c.formatDate(k.datapoint[0]),l+='<div class="graph-tooltip-value">'+m+"</div>",f.showTooltip(n,o,l,j)):i.detach()})}return b});
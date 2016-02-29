/*! grafana - v3.0.0-pre1 - 2016-02-22
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

define(["app/features/dashboard/unsavedChangesSrv","app/features/dashboard/dashboardSrv"],function(){"use strict";describe("unsavedChangesSrv",function(){var a,b,c,d,e,f,g,h={isEditor:!0};beforeEach(module("grafana.services")),beforeEach(module(function(a){a.value("contextSrv",h),a.value("$window",{})})),beforeEach(inject(function(e,f,g,h){a=e,b=h,c=f,d=g})),beforeEach(function(){f=b.create({rows:[{panels:[{test:"asd",legend:{}}]}]}),g=d.$new(),g.appEvent=sinon.spy(),g.onAppEvent=sinon.spy(),e=new a.Tracker(f,g)}),it("No changes should not have changes",function(){expect(e.hasChanges()).to.be(!1)}),it("Simple change should be registered",function(){f.property="google",expect(e.hasChanges()).to.be(!0)}),it("Should ignore a lot of changes",function(){f.time={from:"1h"},f.refresh=!0,f.schemaVersion=10,expect(e.hasChanges()).to.be(!1)}),it("Should ignore row collapse change",function(){f.rows[0].collapse=!0,expect(e.hasChanges()).to.be(!1)}),it("Should ignore panel legend changes",function(){f.rows[0].panels[0].legend.sortDesc=!0,f.rows[0].panels[0].legend.sort="avg",expect(e.hasChanges()).to.be(!1)}),it("Should ignore panel repeats",function(){f.rows[0].panels.push({repeatPanelId:10}),expect(e.hasChanges()).to.be(!1)}),it("Should ignore row repeats",function(){f.rows.push({repeatRowId:10}),expect(e.hasChanges()).to.be(!1)})})});
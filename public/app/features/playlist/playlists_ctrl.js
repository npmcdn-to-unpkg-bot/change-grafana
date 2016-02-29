/*! grafana - v3.0.0-pre1 - 2016-02-22
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

System.register(["lodash","../../core/core_module"],function(a){var b,c,d;return{setters:[function(a){b=a},function(a){c=a}],execute:function(){d=function(){function a(a,b,c){var d=this;this.$scope=a,this.$location=b,this.backendSrv=c,c.get("/api/playlists").then(function(a){d.playlists=a})}return a.$inject=["$scope","$location","backendSrv"],a.prototype.removePlaylistConfirmed=function(a){var c=this;b["default"].remove(this.playlists,{id:a.id}),this.backendSrv["delete"]("/api/playlists/"+a.id).then(function(){c.$scope.appEvent("alert-success",["Playlist deleted",""])},function(){c.$scope.appEvent("alert-error",["Unable to delete playlist",""]),c.playlists.push(a)})},a.prototype.removePlaylist=function(a){var b=this;this.$scope.appEvent("confirm-modal",{title:"Confirm delete playlist",text:"Are you sure you want to delete playlist "+a.name+"?",yesText:"Delete",icon:"fa-warning",onConfirm:function(){b.removePlaylistConfirmed(a)}})},a}(),a("PlaylistsCtrl",d),c["default"].controller("PlaylistsCtrl",d)}}});
"use strict";(self.webpackChunkapp_demo_muni_lujan=self.webpackChunkapp_demo_muni_lujan||[]).push([[712],{712:(v,d,e)=>{e.r(d),e.d(d,{PagesModule:()=>E});var m=e(6895),p=e(6773),M=e(5861),s=e(7873),o=e(8256),C=e(2340);let w=(()=>{class a{constructor(){this.API_KEY=C.N.hereMaps_API_KEY,this.group=[],this.currentBubble=null,this.initHereMapsService()}initHereMapsService(){this.platform=new H.service.Platform({apikey:this.API_KEY})}get search(){return this.platform.getSearchService()}get router(){return this.platform.getRoutingService(null,8)}createMap(t){const i=this.platform.createDefaultLayers();this.map=new H.Map(document.getElementById(t),i.vector.normal.map,{zoom:11,center:{lat:-34.57028,lng:-59.105}}),this.ui=H.ui.UI.createDefault(this.map,i,"es-ES");const l=this.ui.getControl("mapsettings"),r=this.ui.getControl("zoom"),h=this.ui.getControl("scalebar");l.setAlignment("bottom-left"),r.setAlignment("bottom-left"),h.setAlignment("bottom-left");const c=new H.mapevents.MapEvents(this.map);new H.mapevents.Behavior(c)}createMarker(t,i=!1){const l={lat:t.lat,lng:t.lon};let r='<svg width="20" height="20" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="map-marker-alt" class="svg-inline--fa fa-map-marker-alt fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="red" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path></svg>';s.$.listaAgroalimentario.includes(Number(t.clae2))&&(r='<svg width="20" height="20" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="map-marker-alt" class="svg-inline--fa fa-map-marker-alt fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="blue" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path></svg>'),s.$.listaContruccion.includes(Number(t.clae2))&&(r='<svg width="20" height="20" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="map-marker-alt" class="svg-inline--fa fa-map-marker-alt fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="yellow" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path></svg>'),s.$.listaMetalmecanica.includes(Number(t.clae2))&&(r='<svg width="20" height="20" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="map-marker-alt" class="svg-inline--fa fa-map-marker-alt fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="orange" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path></svg>'),s.$.listaTextilConfecciones.includes(Number(t.clae2))&&(r='<svg width="20" height="20" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="map-marker-alt" class="svg-inline--fa fa-map-marker-alt fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="green" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path></svg>'),s.$.listaTurismo.includes(Number(t.clae2))&&(r='<svg width="20" height="20" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="map-marker-alt" class="svg-inline--fa fa-map-marker-alt fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="brown" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path></svg>');const h=new H.map.Icon(r),c=new H.map.Marker(l,{icon:h});if(this.map.addObject(c),this.group.push(c),c.addEventListener("pointerenter",()=>document.body.style.cursor="pointer"),c.addEventListener("pointerleave",()=>document.body.style.cursor="default"),i){const g=`\n        <p>${t.clae6_desc}</p>\n      `;c.addEventListener("tap",()=>this.createBubble(t,g))}}removeMarkers(){this.currentBubble&&(this.ui.removeBubble(this.currentBubble),this.currentBubble.close(),this.currentBubble=null),0!==this.group.length&&(this.map.removeObjects(this.group),this.group=[])}createBubble(t,i){this.currentBubble&&(this.ui.removeBubble(this.currentBubble),this.currentBubble.close());const r=new H.ui.InfoBubble({lat:t.lat,lng:t.lon},{content:i});this.currentBubble=r,this.ui.addBubble(r)}}return a.\u0275fac=function(t){return new(t||a)},a.\u0275prov=o.Yz7({token:a,factory:a.\u0275fac,providedIn:"root"}),a})();var f=e(666),u=e(433);const x=function(){return{width:"160px","margin-right":"1rem"}};let z=(()=>{class a{constructor(t){this.hereMaps=t,this.marcadoresFiltered=[],this.opcionesSector=[{label:"Todos",value:""},{label:"Agroalimentario",value:"Agroalimentario"},{label:"Contruccion",value:"Contruccion"},{label:"Metalmec\xe1nica",value:"Metalmec\xe1nica"},{label:"Turismo",value:"Turismo"},{label:"Textil Confecciones",value:"Textil Confecciones"}],this.valorSeleccionadoSector=""}ngOnInit(){this.hereMaps.createMap("mapaT"),this.loadMarcadores()}loadMarcadores(){var t=this;return(0,M.Z)(function*(){try{const i=yield fetch("app/content/components/pages/mapa-productivo/data/marcadores.json");t.marcadores=yield i.json(),t.applyFilter()}catch(i){console.error("Error al cargar la distribuci\xf3n productiva desde marcadores.json."),console.error(`Error: ${i}`)}})()}applyFilter(){""===this.valorSeleccionadoSector&&(this.marcadoresFiltered=[...this.marcadores]),"Agroalimentario"===this.valorSeleccionadoSector&&(this.marcadoresFiltered=this.marcadores.filter(t=>s.$.listaAgroalimentario.includes(Number(t.clae2)))),"Contruccion"===this.valorSeleccionadoSector&&(this.marcadoresFiltered=this.marcadores.filter(t=>s.$.listaContruccion.includes(Number(t.clae2)))),"Metalmec\xe1nica"===this.valorSeleccionadoSector&&(this.marcadoresFiltered=this.marcadores.filter(t=>s.$.listaMetalmecanica.includes(Number(t.clae2)))),"Textil Confecciones"===this.valorSeleccionadoSector&&(this.marcadoresFiltered=this.marcadores.filter(t=>s.$.listaTextilConfecciones.includes(Number(t.clae2)))),"Turismo"===this.valorSeleccionadoSector&&(this.marcadoresFiltered=this.marcadores.filter(t=>s.$.listaTurismo.includes(Number(t.clae2)))),this.hereMaps.removeMarkers(),this.marcadoresFiltered.map(t=>this.hereMaps.createMarker(t,!0))}ngOnDestroy(){this.hereMaps.removeMarkers()}}return a.\u0275fac=function(t){return new(t||a)(o.Y36(w))},a.\u0275cmp=o.Xpm({type:a,selectors:[["app-mapa-productivo"]],decls:9,vars:5,consts:[[1,"info-fuente-informacion"],["id","mapaT"],[1,"floating-options"],[3,"options","ngModel","ngModelChange","onChange"]],template:function(t,i){1&t&&(o.TgZ(0,"div",0)(1,"p"),o._uU(2,"Fuente de informaci\xf3n: CEP XXI y Subsecretar\xeda de Planificaci\xf3n, Estudios y Estad\xedsticas del Ministerio de Trabajo, Empleo y Seguridad Social de la Naci\xf3n"),o.qZA()(),o.TgZ(3,"div",1)(4,"div",2)(5,"span")(6,"b"),o._uU(7,"Sector Productivo: "),o.qZA()(),o.TgZ(8,"p-dropdown",3),o.NdJ("ngModelChange",function(r){return i.valorSeleccionadoSector=r})("onChange",function(){return i.applyFilter()}),o.qZA()()()),2&t&&(o.xp6(8),o.Akn(o.DdM(4,x)),o.Q6J("options",i.opcionesSector)("ngModel",i.valorSeleccionadoSector))},dependencies:[f.Lt,u.JJ,u.On],styles:["#mapaT[_ngcontent-%COMP%]{height:80vh;width:100%;position:relative;border:1px solid}.floating-options[_ngcontent-%COMP%]{position:absolute;right:0;top:1rem;z-index:9}.floating-options[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#000;background-color:#00000026;padding:.5rem}.info-fuente-informacion[_ngcontent-%COMP%]{margin-bottom:.2rem}"]}),a})(),A=(()=>{class a{}return a.\u0275fac=function(t){return new(t||a)},a.\u0275mod=o.oAB({type:a}),a.\u0275inj=o.cJS({imports:[p.Bz.forChild([{path:"carga-puestos-trabajo",loadChildren:()=>Promise.all([e.e(94),e.e(997),e.e(318),e.e(528),e.e(845)]).then(e.bind(e,9845)).then(n=>n.CargaPuestosTrabajoModule)},{path:"carga-salarios",loadChildren:()=>Promise.all([e.e(94),e.e(997),e.e(318),e.e(528),e.e(592),e.e(709)]).then(e.bind(e,5709)).then(n=>n.CargaSalariosModule)},{path:"profile-edit",loadChildren:()=>Promise.all([e.e(364),e.e(511),e.e(47)]).then(e.bind(e,8047)).then(n=>n.ProfileEditModule)},{path:"inflacion-bcra",loadChildren:()=>Promise.all([e.e(364),e.e(302)]).then(e.bind(e,7302)).then(n=>n.InflacionBcraModule)},{path:"cultura",loadChildren:()=>Promise.all([e.e(364),e.e(997),e.e(592),e.e(567)]).then(e.bind(e,2567)).then(n=>n.CulturaModule)},{path:"mapa-productivo",component:z},{path:"**",redirectTo:"/notfound"}]),p.Bz]}),a})(),E=(()=>{class a{}return a.\u0275fac=function(t){return new(t||a)},a.\u0275mod=o.oAB({type:a}),a.\u0275inj=o.cJS({imports:[m.ez,f.kW,u.u5,A]}),a})()},7873:(v,d,e)=>{e.d(d,{$:()=>m});const m={listaClae2Interesan:[1,3,10,11,8,21,13,41,42,43,24,25,26,27,28,30,13,14,49,50,51,52,55,56,59,77,79,85,90],listaAgroalimentario:[1,3,10,11],listaContruccion:[8,13,21,41,42,43],listaMetalmecanica:[24,25,26,27,28,30],listaTextilConfecciones:[13,14],listaTurismo:[49,50,51,52,55,56,59,77,79,85,90,91,92,93],listaTotalIndustria:[10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32],listaCodigosDptoConurbano:["6028","6035","6091","6260","6270","6274","6371","6408","6410","6412","6427","6434","6490","6515","6539","6560","6568","6658","6749","6756","6760","6805","6840","6861"],codigoDptoLujan:"6497",codigoProvinciaBsAs:"6"}}}]);
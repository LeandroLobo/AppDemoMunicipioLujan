"use strict";(self.webpackChunkapp_demo_muni_lujan=self.webpackChunkapp_demo_muni_lujan||[]).push([[9346],{9346:(z,g,s)=>{s.r(g),s.d(g,{TimelineDemoModule:()=>I});var v=s(6895),h=s(9624),d=s(805),e=s(1571),T=s(7590),b=s(8568),y=s(2453),x=s(9364);let C=(()=>{class t{constructor(i,n,r){this.messageService=i,this.firebase=n,this.layoutService=r,this.loading=!1,this.muestraDatosFiltrados=[],this.subscription=this.layoutService.configUpdate$.subscribe(l=>{this.initCharts()})}ngOnInit(){this.loading=!0,this.firebase.leerUltimoDocumento("PuestosTrabajoAsalariado").then(i=>{const n=new Date(0);n.setUTCSeconds(i.fechaSubida.seconds),this.fechaSubida=n.toLocaleDateString("es-ES"),this.muestraDatosFiltrados=i.muestraDatosFiltrados,this.loading=!1,this.initCharts()}).catch(i=>{console.error(i),this.loading=!1})}initCharts(){const i=this.contarMensual("2020"),n=this.contarMensual("2021"),r=this.contarMensual("2022"),l=this.calcularInteranual(i,n),m=this.calcularInteranual(n,r),a=getComputedStyle(document.documentElement),c=a.getPropertyValue("--text-color"),p=a.getPropertyValue("--text-color-secondary"),f=a.getPropertyValue("--surface-border");this.dataGraficoInteranual={labels:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],datasets:[{label:"2022",backgroundColor:a.getPropertyValue("--primary-700"),borderColor:a.getPropertyValue("--primary-700"),data:m},{label:"2021",backgroundColor:a.getPropertyValue("--primary-300"),borderColor:a.getPropertyValue("--primary-300"),data:l}]},this.barOptions={plugins:{legend:{labels:{fontColor:c}}},scales:{x:{ticks:{color:p,font:{weight:500}},grid:{display:!1,drawBorder:!1}},y:{ticks:{color:p},grid:{color:f,drawBorder:!1}}}},this.dataGraficoMensual={labels:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],datasets:[{label:"2022",data:r,fill:!1,backgroundColor:a.getPropertyValue("--primary-800"),borderColor:a.getPropertyValue("--primary-800"),tension:.4},{label:"2021",data:n,fill:!1,backgroundColor:a.getPropertyValue("--primary-500"),borderColor:a.getPropertyValue("--primary-500"),tension:.4},{label:"2020",data:i,fill:!1,backgroundColor:a.getPropertyValue("--primary-200"),borderColor:a.getPropertyValue("--primary-200"),tension:.4}]},this.lineOptions={plugins:{legend:{labels:{fontColor:c}}},scales:{x:{ticks:{color:p},grid:{color:f,drawBorder:!1}},y:{ticks:{color:p},grid:{color:f,drawBorder:!1}}}}}contarMensual(i){const n=this.muestraDatosFiltrados.filter(l=>l.fecha.split("-").includes(i)).map(l=>({fecha:l.fecha,puestos:l.puestos}));let r=[];for(let l=1;l<=12;l++){const m=n.reduce((a,c)=>c.fecha>i+"-"+l.toString().padStart(2,"0")&&c.fecha<i+"-"+(l+1).toString().padStart(2,"0")?a+c.puestos:a,0);r.push(m)}return r}calcularInteranual(i,n){let r=[];for(let l=1;l<=12;l++)r.push(n[l]/i[l]-1);return r}}return t.\u0275fac=function(i){return new(i||t)(e.Y36(d.ez),e.Y36(T.P),e.Y36(b.P))},t.\u0275cmp=e.Xpm({type:t,selectors:[["ng-component"]],features:[e._Bn([d.ez])],decls:31,vars:4,consts:[[1,"grid"],[1,"col-12"],[1,"card"],[1,"p-0","mx-0","mt-0","mb-4","list-none"],[1,"flex","align-items-center","py-2","border-bottom-1","surface-border"],[1,"mr-3"],[1,"pi","pi-file-import","text-xl","text-blue-500"],[1,"text-900","line-height-3"],[1,"flex","align-items-center","py-2"],[1,"pi","pi-server","text-xl","text-orange-500"],[1,"text-700","line-height-3","overflow-wrap-break-word"],[1,"col-12","lg:col-6"],[1,"block","text-600","font-medium","mb-3"],["type","line",3,"data","options"],["type","bar",3,"data","options"]],template:function(i,n){1&i&&(e._UZ(0,"p-toast"),e.TgZ(1,"div",0)(2,"div",1)(3,"div",2)(4,"h5"),e._uU(5,"Puestos de trabajo asalariados registrados"),e.qZA(),e.TgZ(6,"ul",3)(7,"li",4)(8,"div",5),e._UZ(9,"i",6),e.qZA(),e.TgZ(10,"span",7),e._uU(11,'Datos obtenidos del dataset "Datos Abiertos de Desarrollo Productivo".'),e.qZA()(),e.TgZ(12,"li",8)(13,"div",5),e._UZ(14,"i",9),e.qZA(),e.TgZ(15,"span",10),e._uU(16,"Url: https://datos.produccion.gob.ar/dataset/puestos-de-trabajo-por-departamento-partido-y-sector-de-actividad/archivo/169245ff-f050-4601-9cea-aa36ef2d7f20"),e.qZA()()()()(),e.TgZ(17,"div",11)(18,"div",2)(19,"h5"),e._uU(20,"Total mensual"),e.qZA(),e.TgZ(21,"span",12),e._uU(22,"A\xf1os 2020, 2021 y 2022"),e.qZA(),e._UZ(23,"p-chart",13),e.qZA()(),e.TgZ(24,"div",11)(25,"div",2)(26,"h5"),e._uU(27,"Variaci\xf3n interanual"),e.qZA(),e.TgZ(28,"span",12),e._uU(29,"Comparaci\xf3n a\xf1os 2021 y 2022"),e.qZA(),e._UZ(30,"p-chart",14),e.qZA()()()),2&i&&(e.xp6(23),e.Q6J("data",n.dataGraficoMensual)("options",n.lineOptions),e.xp6(7),e.Q6J("data",n.dataGraficoInteranual)("options",n.barOptions))},dependencies:[y.FN,x.C]}),t})(),_=(()=>{class t{}return t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[h.Bz.forChild([{path:"",component:C}]),h.Bz]}),t})(),O=(()=>{class t{}return t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[v.ez,d.m8]}),t})();var P=s(5593),E=s(4247);let I=(()=>{class t{}return t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[v.ez,O,P.hJ,E.d,_,y.EV,x.S]}),t})()}}]);
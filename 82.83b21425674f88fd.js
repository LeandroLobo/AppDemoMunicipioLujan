"use strict";(self.webpackChunkapp_demo_muni_lujan=self.webpackChunkapp_demo_muni_lujan||[]).push([[82],{2082:(me,f,o)=>{o.r(f),o.d(f,{DashboardModule:()=>de});var _=o(6895),M=o(433),x=o(9364),S=o(1327),P=o(7318),k=o(5593),I=o(5132),n=o(8256),u=o(6773),v=o(3608);let le=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[_.ez,u.Bz,v.z,u.Bz,v.z]}),t})();var re=o(8568),oe=o(529);let se=(()=>{class t{constructor(e){this.http=e,this.dolarApiUrl="https://www.dolarsi.com/api/api.php?type=dolar"}getValoresDolar(){return this.http.get(this.dolarApiUrl)}}return t.\u0275fac=function(e){return new(e||t)(n.LFG(oe.eN))},t.\u0275prov=n.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var pe=o(5922);const d=function(){return{width:"2.5rem",height:"2.5rem"}};let ce=(()=>{class t{constructor(e,i,l){this.layoutService=e,this.dolarsi=i,this.firebase=l,this.muestraDatosFiltrados=[],this.subscription=this.layoutService.configUpdate$.subscribe(()=>{this.initCharts()})}ngOnInit(){this.loading=!0,this.firebase.leerUltimoDocumento("PuestosTrabajoAsalariado").then(e=>{const i=new Date(0);i.setUTCSeconds(e.fechaSubida.seconds),this.fechaSubida=i.toLocaleDateString("es-ES"),this.muestraDatosFiltrados=e.muestraDatosFiltrados,this.loading=!1,this.initCharts()}).catch(e=>{console.error(e),this.loading=!1}),this.dolarsi.getValoresDolar().subscribe(e=>{e.map(i=>{"Oficial"==i.casa.nombre&&(this.dolarOficial=i.casa),"Blue"==i.casa.nombre&&(this.dolarBlue=i.casa)})})}initCharts(){const e=this.contarMensual("2020"),i=this.contarMensual("2021"),l=this.contarMensual("2022"),r=this.calcularInteranual(e,i),s=this.calcularInteranual(i,l),p=getComputedStyle(document.documentElement),c=p.getPropertyValue("--text-color"),m=p.getPropertyValue("--text-color-secondary"),g=p.getPropertyValue("--surface-border");this.dataGraficoMensualContiguo={labels:["Enero `20","Febrero `20","Marzo `20","Abril `20","Mayo `20","Junio `20","Julio `20","Agosto `20","Septiembre `20","Octubre `20","Noviembre `20","Diciembre `20","Enero `21","Febrero `21","Marzo `21","Abril `21","Mayo `21","Junio `21","Julio `21","Agosto `21","Septiembre `21","Octubre `21","Noviembre `21","Diciembre `21","Enero `22","Febrero `22","Marzo `22","Abril `22","Mayo `22","Junio `22","Julio `22","Agosto `22","Septiembre `22","Octubre `22","Noviembre `22","Diciembre `22"],datasets:[{label:"20-21-22",data:[...e,...i,...l],fill:!1,backgroundColor:p.getPropertyValue("--primary-800"),borderColor:p.getPropertyValue("--primary-800"),tension:.4}]},this.lineContiguoOptions={plugins:{legend:{labels:{fontColor:c}}},scales:{x:{ticks:{color:m},grid:{color:g,drawBorder:!1}},y:{ticks:{color:m},grid:{color:g,drawBorder:!1}}}},this.dataGraficoInteranualContiguo={labels:["Enero `21","Febrero `21","Marzo `21","Abril `21","Mayo `21","Junio `21","Julio `21","Agosto `21","Septiembre `21","Octubre `21","Noviembre `21","Diciembre `21","Enero `22","Febrero `22","Marzo `22","Abril `22","Mayo `22","Junio `22","Julio `22","Agosto `22","Septiembre `22","Octubre `22","Noviembre `22","Diciembre `22"],datasets:[{label:"21-22",backgroundColor:p.getPropertyValue("--primary-300"),borderColor:p.getPropertyValue("--primary-300"),data:[...r,...s]}]},this.barContiguoOptions={plugins:{legend:{labels:{fontColor:c}}},scales:{x:{ticks:{color:m,font:{weight:500}},grid:{display:!1,drawBorder:!1}},y:{ticks:{color:m},grid:{color:g,drawBorder:!1}}}}}contarMensual(e){const i=this.muestraDatosFiltrados.filter(r=>r.fecha.split("-").includes(e)).map(r=>({fecha:r.fecha,puestos:r.puestos}));let l=[];for(let r=1;r<=12;r++){const s=i.reduce((p,c)=>c.fecha>e+"-"+r.toString().padStart(2,"0")&&c.fecha<e+"-"+(r+1).toString().padStart(2,"0")?p+c.puestos:p,0);l.push(s)}return l}calcularInteranual(e,i){let l=[];for(let r=1;r<=12;r++)l.push(i[r]/e[r]-1);return l}ngOnDestroy(){this.subscription&&this.subscription.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(n.Y36(re.P),n.Y36(se),n.Y36(pe.P))},t.\u0275cmp=n.Xpm({type:t,selectors:[["ng-component"]],decls:91,vars:16,consts:[[1,"grid"],[1,"col-12","lg:col-6","xl:col-3"],[1,"card","mb-0"],[1,"flex","justify-content-between"],[1,"block","text-500","font-medium"],[1,"flex","align-items-center","justify-content-center","bg-green-100","border-round",3,"ngStyle"],[1,"pi","pi-dollar","text-green-500","text-xl"],[1,"col-6","pb-0"],[1,"text-900","font-medium","text-xl"],[1,"text-green-500","font-medium"],[1,"flex","align-items-center","justify-content-center","bg-blue-100","border-round",3,"ngStyle"],[1,"pi","pi-dollar","text-blue-500","text-xl"],[1,"text-blue-500","font-medium"],[1,"flex","align-items-center","justify-content-center","bg-purple-100","border-round",3,"ngStyle"],[1,"pi","pi-chart-line","text-purple-500","text-xl"],[1,"text-purple-500","font-medium"],[1,"flex","align-items-center","justify-content-center","bg-orange-100","border-round",3,"ngStyle"],[1,"pi","pi-wallet","text-orange-500","text-xl"],[1,"text-orange-500","font-medium"],[1,"col-12","lg:col-6"],[1,"card"],[1,"block","text-600","font-medium","mb-3"],["type","line",3,"data","options"],["type","bar",3,"data","options"]],template:function(e,i){1&e&&(n.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"span",4),n._uU(5,"Dolar oficial"),n.qZA(),n.TgZ(6,"div",5),n._UZ(7,"i",6),n.qZA()(),n.TgZ(8,"div",0)(9,"div",7)(10,"div",8),n._uU(11),n.qZA(),n.TgZ(12,"span",9),n._uU(13,"Compra"),n.qZA()(),n.TgZ(14,"div",7)(15,"div",8),n._uU(16),n.qZA(),n.TgZ(17,"span",9),n._uU(18,"Venta"),n.qZA()()()()(),n.TgZ(19,"div",1)(20,"div",2)(21,"div",3)(22,"span",4),n._uU(23,"Dolar 'Blue'"),n.qZA(),n.TgZ(24,"div",10),n._UZ(25,"i",11),n.qZA()(),n.TgZ(26,"div",0)(27,"div",7)(28,"div",8),n._uU(29),n.qZA(),n.TgZ(30,"span",12),n._uU(31,"Compra"),n.qZA()(),n.TgZ(32,"div",7)(33,"div",8),n._uU(34),n.qZA(),n.TgZ(35,"span",12),n._uU(36,"Venta"),n.qZA()()()()(),n.TgZ(37,"div",1)(38,"div",2)(39,"div",3)(40,"span",4),n._uU(41,"EMAE (febrero 2023)"),n.qZA(),n.TgZ(42,"div",13),n._UZ(43,"i",14),n.qZA()(),n.TgZ(44,"div",0)(45,"div",7)(46,"div",8),n._uU(47,"0,2%"),n.qZA(),n.TgZ(48,"span",15),n._uU(49,"Var. interanual"),n.qZA()(),n.TgZ(50,"div",7)(51,"div",8),n._uU(52,"0,0%"),n.qZA(),n.TgZ(53,"span",15),n._uU(54,"Var. mensual"),n.qZA()()()()(),n.TgZ(55,"div",1)(56,"div",2)(57,"div",3)(58,"span",4),n._uU(59,"PBI (Cuarto trimestre 2022)"),n.qZA(),n.TgZ(60,"div",16),n._UZ(61,"i",17),n.qZA()(),n.TgZ(62,"div",0)(63,"div",7)(64,"div",8),n._uU(65,"1,9%"),n.qZA(),n.TgZ(66,"span",18),n._uU(67,"Var. interanual"),n.qZA()(),n.TgZ(68,"div",7)(69,"div",8),n._uU(70,"-1,5%"),n.qZA(),n.TgZ(71,"span",18),n._uU(72,"Var. trimestral"),n.qZA()()()()(),n.TgZ(73,"div",19)(74,"div",20)(75,"h5"),n._uU(76,"Total mensual - "),n.TgZ(77,"b"),n._uU(78,"Puestos de empleo en Luj\xe1n"),n.qZA()(),n.TgZ(79,"span",21),n._uU(80,"Per\xedodo 2020 - 2021 - 2022"),n.qZA(),n._UZ(81,"p-chart",22),n.qZA()(),n.TgZ(82,"div",19)(83,"div",20)(84,"h5"),n._uU(85,"Variaci\xf3n interanual - "),n.TgZ(86,"b"),n._uU(87,"Puestos de empleo en Luj\xe1n"),n.qZA()(),n.TgZ(88,"span",21),n._uU(89,"Per\xedodo 2021 - 2022"),n.qZA(),n._UZ(90,"p-chart",23),n.qZA()()()),2&e&&(n.xp6(6),n.Q6J("ngStyle",n.DdM(12,d)),n.xp6(5),n.hij("$",i.dolarOficial?i.dolarOficial.compra:"---",""),n.xp6(5),n.hij("$",i.dolarOficial?i.dolarOficial.venta:"---",""),n.xp6(8),n.Q6J("ngStyle",n.DdM(13,d)),n.xp6(5),n.hij("$",i.dolarBlue?i.dolarBlue.compra:"---",""),n.xp6(5),n.hij("$",i.dolarBlue?i.dolarBlue.venta:"---",""),n.xp6(8),n.Q6J("ngStyle",n.DdM(14,d)),n.xp6(18),n.Q6J("ngStyle",n.DdM(15,d)),n.xp6(21),n.Q6J("data",i.dataGraficoMensualContiguo)("options",i.lineContiguoOptions),n.xp6(9),n.Q6J("data",i.dataGraficoInteranualContiguo)("options",i.barContiguoOptions))},dependencies:[_.PC,x.C]}),t})(),ue=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[u.Bz.forChild([{path:"",component:ce}]),u.Bz]}),t})(),de=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[_.ez,M.u5,x.S,S.$9,P.U$,I.l,le,k.hJ,ue]}),t})()}}]);
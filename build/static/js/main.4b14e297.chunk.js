(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{18:function(e,t,n){e.exports=n(42)},23:function(e,t,n){},41:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(16),o=n.n(c),u=(n(23),n(2)),l=function(e){var t=e.filter,n=e.setFilter;return r.a.createElement("div",null,"filter shown with"," ",r.a.createElement("input",{type:"text",value:t,onChange:function(e){return n(e.target.value)}}))},s=n(6),i=n(17),m=n(4),f=n.n(m),d=function(){return f.a.get("/api/persons")},p=function(e){return f.a.post("/api/persons",e)},b=function(e){return f.a.put("".concat("/api/persons","/").concat(e.id),e)},v=function(e){return f.a.delete("".concat("/api/persons","/").concat(e))},E=function(e){var t=e.newName,n=e.setNewName,a=e.newNumber,c=e.setNewNumber,o=e.persons,u=e.setPersons,l=e.setSuccessMessage,m=e.setErrorMessage;return r.a.createElement("form",null,r.a.createElement("div",null,"name:"," ",r.a.createElement("input",{type:"text",value:t,onChange:function(e){return n(e.target.value)}})),r.a.createElement("div",null,"number:"," ",r.a.createElement("input",{type:"text",value:a,onChange:function(e){return c(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit",onClick:function(e){e.preventDefault();var r=o.map((function(e){return e.name.toLowerCase()})).includes(t.toLowerCase()),f="".concat(t," is already added to phonebook, replace the old number with a new one?");if(r){if(window.confirm(f)){var d=o.map((function(e){return e.name.toLowerCase()})).indexOf(t.toLowerCase()),v=o[d],E=Object(i.a)({},v,{number:a}),w=Object(s.a)(o);w[d]=E,b(E).then((function(e){n(""),c(""),u(w)})).catch((function(e){return m("Person '".concat(t,"' was already removed from server")),void setTimeout((function(){m(null)}),3e3)}))}}else{var h={name:t,number:a,id:o.length+1};p(h).then((function(e){u([].concat(Object(s.a)(o),[h])),n(""),c(""),l("".concat(t," added")),setTimeout((function(){l(null)}),3e3)}))}}},"add")))},w=function(e){var t=e.persons,n=e.filter,a=e.setPersons;return r.a.createElement("div",null,t.filter((function(e){return""===n||e.name.toLowerCase().includes(n.toLowerCase())})).map((function(e,n){return r.a.createElement("div",{key:"".concat(e.name," ").concat(n)},r.a.createElement("p",null,"".concat(e.name," ").concat(e.number," ")," ",r.a.createElement("button",{onClick:function(){return n=e,void(window.confirm("Delete ".concat(n.name,"?"))&&(a.apply(void 0,[t.filter((function(e){return e.id!==n.id}))]),v(n.id)));var n}},"delete")))})))},h=(n(41),function(){var e=Object(a.useState)([]),t=Object(u.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)(""),s=Object(u.a)(o,2),i=s[0],m=s[1],f=Object(a.useState)(""),p=Object(u.a)(f,2),b=p[0],v=p[1],h=Object(a.useState)(""),O=Object(u.a)(h,2),j=O[0],g=O[1],N=Object(a.useState)(null),C=Object(u.a)(N,2),k=C[0],y=C[1],S=Object(a.useState)(null),L=Object(u.a)(S,2),P=L[0],x=L[1];return Object(a.useEffect)((function(){console.log("effect"),d().then((function(e){console.log("promise fulfilled"),c(e.data)}))}),[]),r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),k&&r.a.createElement("div",{className:"success"},r.a.createElement("p",null,k)),P&&r.a.createElement("div",{className:"error"},r.a.createElement("p",null,P)),r.a.createElement(l,{filter:i,setFilter:m}),r.a.createElement("h2",null,"Add a new"),r.a.createElement(E,{newName:b,setNewName:v,newNumber:j,setNewNumber:g,persons:n,setPersons:c,setSuccessMessage:y,setErrorMessage:x}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(w,{persons:n,filter:i,setPersons:c}))});o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(h,null)),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.4b14e297.chunk.js.map
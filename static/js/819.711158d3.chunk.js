"use strict";(self.webpackChunkmarvel_characters_and_comics_app=self.webpackChunkmarvel_characters_and_comics_app||[]).push([[819],{4354:(e,s,c)=>{c.d(s,{A:()=>r});const t=c.p+"static/media/Avengers.4065c8f9c94e3d8b039a.png",a=c.p+"static/media/Avengers_logo.9eaf219344d83362e830.png";var i=c(579);const r=()=>(0,i.jsxs)("div",{className:"app__banner",children:[(0,i.jsx)("img",{src:t,alt:"Avengers"}),(0,i.jsxs)("div",{className:"app__banner-text",children:["New comics every week!",(0,i.jsx)("br",{}),"Stay tuned!"]}),(0,i.jsx)("img",{src:a,alt:"Avengers logo"})]})},1425:(e,s,c)=>{c.d(s,{A:()=>i});const t=c.p+"static/media/error.42292aa12b6bc303ce99.gif";var a=c(579);const i=()=>(0,a.jsx)("img",{src:t,style:{display:"block",width:"250px",height:"250px",objectFit:"contain",margin:"0 auto"},alt:"Error"})},7299:(e,s,c)=>{c.r(s),c.d(s,{default:()=>p});var t=c(1591),a=c(4354),i=c(897),r=c(8502),n=c(1425);c.p,c.p;var l=c(5043),o=c(2134),m=c(579);const d=(e,s,c)=>{switch(e){case"waiting":return(0,m.jsx)(r.A,{});case"loading":return c?(0,m.jsx)(s,{}):(0,m.jsx)(r.A,{});case"confirmed":return(0,m.jsx)(s,{});case"error":return(0,m.jsx)(n.A,{});default:throw new Error("Unexpected process state")}},x=e=>{let{item:s}=e;const{id:c,name:t,thumbnail:a,price:i}=s;return(0,m.jsx)("li",{className:"comics__item",tabIndex:0,children:(0,m.jsxs)(o.N_,{to:`/comics/${c}`,children:[(0,m.jsx)("img",{src:a,alt:"ultimate war",className:"comics__item-img"}),(0,m.jsx)("div",{className:"comics__item-name",children:t}),(0,m.jsx)("div",{className:"comics__item-price",children:i})]})})},_=e=>{const[s,c]=(0,l.useState)([]),[t,a]=(0,l.useState)(!1),[r,n]=(0,l.useState)(0),[o,_]=(0,l.useState)(!1),{loading:p,error:h,getAllComics:j,process:u,setProcess:g}=(0,i.A)();(0,l.useEffect)((()=>{b(r,!0)}),[]);const b=(e,s)=>{a(!s),j(e).then(v).then((()=>g("confirmed")))},v=e=>{let s=!1;e.length<8&&(s=!0),c((s=>[...s,...e])),a(!1),n((e=>e+8)),_(s)};return(0,m.jsxs)("div",{className:"comics__list",children:[d(u,(()=>(e=>{const s=e.map(((e,s)=>(0,m.jsx)(x,{item:e},s)));return(0,m.jsx)("ul",{className:"comics__grid",children:s})})(s)),t),(0,m.jsx)("button",{className:"button button__main button__long",onClick:()=>b(r),disabled:t,style:{display:o?"none":"block"},children:(0,m.jsx)("div",{className:"inner",children:"load more"})})]})},p=()=>(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(t.m,{children:[(0,m.jsx)("meta",{name:"description",content:"Page with list of all comics"}),(0,m.jsx)("title",{children:"Comics"})]}),(0,m.jsx)(a.A,{}),(0,m.jsx)(_,{})]})}}]);
//# sourceMappingURL=819.711158d3.chunk.js.map